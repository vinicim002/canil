package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.VisitaProperties;
import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.cao.service.FilhoteDisponibilidadeService;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import com.vinicius.backend.infrastructure.evolution.EvolutionMessagingService;
import com.vinicius.backend.infrastructure.n8n.dto.WhatsappIntentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitaWhatsappIntentService {

    private static final List<StatusAgendamento> STATUS_ATIVOS = List.of(
            StatusAgendamento.PENDENTE,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.REAGENDADO
    );

    private static final DateTimeFormatter DATA_HORA_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm", Locale.forLanguageTag("pt-BR"));

    private final VisitaAgendamentoRepository visitaRepository;
    private final VisitaMapper visitaMapper;
    private final VisitaProperties visitaProperties;
    private final EvolutionMessagingService evolutionMessagingService;
    private final FilhoteDisponibilidadeService filhoteDisponibilidadeService;

    @Transactional(readOnly = true)
    public WhatsappIntentResponse processar(String telefone, String texto) {
        VisitaWhatsappIntent intent = detectarIntent(texto);
        String telefoneWhatsApp = VisitaNotificacaoService.formatarTelefoneWhatsApp(telefone);

        if (intent == VisitaWhatsappIntent.RESERVAR_FILHOTE) {
            var resposta = filhoteDisponibilidadeService.responderIntentReserva(telefone);
            filhoteDisponibilidadeService.dispararRespostaWhatsApp(resposta);
            return new WhatsappIntentResponse(
                    true,
                    intent.name(),
                    0,
                    telefoneWhatsApp,
                    resposta.mensagemWhatsApp()
            );
        }

        if (intent == VisitaWhatsappIntent.DESCONHECIDO) {
            return new WhatsappIntentResponse(false, intent.name(), 0, telefoneWhatsApp, null);
        }

        List<VisitaAgendamento> visitas = buscarVisitasAtivasPorTelefone(telefone);
        String mensagem = montarMensagemIntent(intent, visitas);

        evolutionMessagingService.enviarTextoSync(telefoneWhatsApp, mensagem, mensagem.contains("http"));

        log.info("[WhatsApp intent] {} — {} visita(s) para {}", intent, visitas.size(), telefoneWhatsApp);

        return new WhatsappIntentResponse(
                true,
                intent.name(),
                visitas.size(),
                telefoneWhatsApp,
                mensagem
        );
    }

    static VisitaWhatsappIntent detectarIntent(String texto) {
        if (texto == null || texto.isBlank()) {
            return VisitaWhatsappIntent.DESCONHECIDO;
        }
        String t = texto.toLowerCase(Locale.ROOT);

        if (contemAlgum(t, "reservar filhote", "reserva filhote", "quero um filhote", "gostaria de reservar")) {
            return VisitaWhatsappIntent.RESERVAR_FILHOTE;
        }
        if (contemAlgum(t, "cancelar agendamento", "cancelar visita", "cancelar minha visita", "quero cancelar")) {
            return VisitaWhatsappIntent.CANCELAR;
        }
        if (contemAlgum(t, "alterar agendamento", "alterar visita", "reagendar", "mudar agendamento", "mudar visita",
                "trocar horario", "trocar horário")) {
            return VisitaWhatsappIntent.ALTERAR;
        }
        return VisitaWhatsappIntent.DESCONHECIDO;
    }

    private static boolean contemAlgum(String texto, String... termos) {
        for (String termo : termos) {
            if (texto.contains(termo)) {
                return true;
            }
        }
        return false;
    }

    private List<VisitaAgendamento> buscarVisitasAtivasPorTelefone(String telefone) {
        LocalDateTime agora = LocalDateTime.now();
        return visitaRepository.findAgendamentosFuturosAtivos(agora, STATUS_ATIVOS).stream()
                .filter(v -> TelefoneMatcher.correspondem(v.getTelefone(), telefone))
                .toList();
    }

    private String montarMensagemIntent(VisitaWhatsappIntent intent, List<VisitaAgendamento> visitas) {
        String baseUrl = visitaProperties.getSiteUrl().replaceAll("/$", "");
        String agendarUrl = baseUrl + "/agendar-visita";

        if (visitas.isEmpty()) {
            return """
                    Olá! Não encontramos agendamento ativo para este número.

                    Para marcar uma nova visita:
                    %s""".formatted(agendarUrl);
        }

        String acao = intent == VisitaWhatsappIntent.CANCELAR
                ? "Para cancelar, use o link do seu agendamento"
                : "Para alterar ou reagendar, use o link abaixo";

        if (visitas.size() == 1) {
            VisitaAgendamento v = visitas.get(0);
            String link = visitaMapper.montarLinkWhatsApp(v.getTokenAcesso());
            return """
                    Olá, %s! 👋

                    %s:

                    %s""".formatted(v.getNome(), acao, link);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("Olá! Encontramos ").append(visitas.size()).append(" visitas agendadas:\n\n");
        int i = 1;
        for (VisitaAgendamento v : visitas) {
            String link = visitaMapper.montarLinkWhatsApp(v.getTokenAcesso());
            sb.append(i++).append(") ")
                    .append(v.getDataHora().format(DATA_HORA_FMT))
                    .append("\n")
                    .append(link)
                    .append("\n\n");
        }
        sb.append(acao).append(" pelo link correspondente.");
        return sb.toString().trim();
    }
}
