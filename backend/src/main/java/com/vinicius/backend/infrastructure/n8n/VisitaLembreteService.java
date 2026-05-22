package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.config.N8nProperties;
import com.vinicius.backend.config.VisitaProperties;
import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import com.vinicius.backend.infrastructure.evolution.EvolutionMessagingService;
import com.vinicius.backend.infrastructure.n8n.dto.LembreteProcessamentoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitaLembreteService {

    private static final List<StatusAgendamento> STATUS_ATIVOS = List.of(
            StatusAgendamento.PENDENTE,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.REAGENDADO
    );

    private final VisitaAgendamentoRepository visitaRepository;
    private final VisitaMapper visitaMapper;
    private final MailProperties mailProperties;
    private final VisitaProperties visitaProperties;
    private final EvolutionMessagingService evolutionMessagingService;
    private final N8nProperties n8nProperties;
    private final N8nWebhookClient n8nWebhookClient;

    @Transactional(readOnly = true)
    public List<VisitaNotificacaoPayload> listarParaLembrete(int horasAntes) {
        return buscarElegiveis(horasAntes).stream()
                .map(this::paraPayloadLembrete)
                .toList();
    }

    /**
     * Processa lembretes: envia WhatsApp e marca como enviado (evita duplicata no cron).
     */
    @Transactional
    public LembreteProcessamentoResponse processar(int horasAntes) {
        if (horasAntes < 1 || horasAntes > 168) {
            horasAntes = visitaProperties.getLembreteHorasAntes();
        }

        List<VisitaAgendamento> elegiveis = buscarElegiveis(horasAntes);
        int enviados = 0;

        for (VisitaAgendamento visita : elegiveis) {
            try {
                VisitaNotificacaoPayload payload = paraPayloadLembrete(visita);
                String linkWhatsApp = visitaMapper.montarLinkWhatsApp(visita.getTokenAcesso());
                enviarLembreteWhatsApp(payload, linkWhatsApp);
                visita.setLembreteEnviadoEm(LocalDateTime.now());
                visitaRepository.save(visita);
                enviados++;
                log.info("[Lembrete] Enviado para visita {} ({})", visita.getId(), visita.getNome());
            } catch (Exception e) {
                log.error("[Lembrete] Falha visita {}: {}", visita.getId(), e.getMessage());
            }
        }

        return new LembreteProcessamentoResponse(enviados, elegiveis.size(), horasAntes);
    }

    private List<VisitaAgendamento> buscarElegiveis(int horasAntes) {
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime janelaInicio = agora.plusHours(horasAntes).minusHours(1);
        LocalDateTime janelaFim = agora.plusHours(horasAntes).plusHours(1);
        return visitaRepository.findVisitasParaLembrete(janelaInicio, janelaFim, STATUS_ATIVOS);
    }

    private void enviarLembreteWhatsApp(VisitaNotificacaoPayload payload, String linkWhatsApp) {
        if (n8nProperties.isVisitaWhatsappViaEvolutionDireto()) {
            String texto = VisitaWhatsAppMensagemBuilder.montarTexto(payload, linkWhatsApp);
            evolutionMessagingService.enviarTextoSync(payload.telefoneWhatsApp(), texto, true);
        } else {
            n8nWebhookClient.enviar(payload);
        }
    }

    private VisitaNotificacaoPayload paraPayloadLembrete(VisitaAgendamento visita) {
        var response = visitaMapper.toResponse(visita);
        return new VisitaNotificacaoPayload(
                TipoEventoVisita.VISITA_LEMBRETE,
                response.id(),
                response.nome(),
                response.telefone(),
                VisitaNotificacaoService.formatarTelefoneWhatsApp(response.telefone()),
                response.email(),
                response.dataHora(),
                response.status().name(),
                response.linkGerenciamento(),
                mailProperties.getSiteName()
        );
    }
}
