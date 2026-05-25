package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.config.N8nProperties;
import com.vinicius.backend.config.VisitaProperties;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.infrastructure.email.EmailService;
import com.vinicius.backend.infrastructure.evolution.EvolutionMessagingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitaNotificacaoService {

    private final N8nWebhookClient n8nWebhookClient;
    private final EvolutionMessagingService evolutionMessagingService;
    private final N8nProperties n8nProperties;
    private final VisitaMapper visitaMapper;
    private final MailProperties mailProperties;
    private final VisitaProperties visitaProperties;
    private final EmailService emailService;

    @Async
    public void disparar(TipoEventoVisita evento, VisitaAgendamento visita) {
        VisitaResponse response = visitaMapper.toResponse(visita);
        VisitaNotificacaoPayload payload = montarPayload(evento, response);
        enviarWhatsApp(payload, visitaMapper.montarLinkWhatsApp(visita.getTokenAcesso()));
        enviarEmailSeAplicavel(evento, response);
    }

    @Async
    public void disparar(TipoEventoVisita evento, VisitaResponse response) {
        VisitaNotificacaoPayload payload = montarPayload(evento, response);
        enviarWhatsApp(payload, payload.linkGerenciamento());
        enviarEmailSeAplicavel(evento, response);
    }

    private void enviarWhatsApp(VisitaNotificacaoPayload payload, String linkWhatsApp) {
        if (n8nProperties.isVisitaWhatsappViaEvolutionDireto()) {
            String texto = VisitaWhatsAppMensagemBuilder.montarTexto(payload, linkWhatsApp);
            evolutionMessagingService.enviarTexto(payload.telefoneWhatsApp(), texto, true);
        } else {
            n8nWebhookClient.enviar(payload);
        }
    }

    private VisitaNotificacaoPayload montarPayload(TipoEventoVisita evento, VisitaResponse response) {
        return new VisitaNotificacaoPayload(
                evento,
                response.id(),
                response.nome(),
                response.telefone(),
                formatarTelefoneWhatsApp(response.telefone()),
                response.email(),
                response.dataHora(),
                response.status().name(),
                response.linkGerenciamento(),
                mailProperties.getSiteName()
        );
    }

    private void enviarEmailSeAplicavel(TipoEventoVisita evento, VisitaResponse response) {
        if (!visitaProperties.isNotificarEmail()) {
            log.info("[Email visita] Desabilitado (app.visita.notificar-email=false) — evento {}", evento);
            return;
        }
        try {
            boolean enviado = switch (evento) {
                case VISITA_CRIADA, VISITA_REAGENDADA, VISITA_CONFIRMADA ->
                        emailService.enviarConfirmacaoVisita(response, evento);
                case VISITA_CANCELADA ->
                        emailService.enviarCancelamentoVisita(response);
                default -> true;
            };
            if (!enviado) {
                log.warn("[Email visita] Não enviado para {} — evento {} (veja logs [SMTP] ou [Resend])",
                        response.email(), evento);
            }
        } catch (Exception e) {
            log.warn("[Email visita] Falha ao notificar {} para {}: {}", evento, response.email(), e.getMessage());
        }
    }

    public static String formatarTelefoneWhatsApp(String telefone) {
        String digits = telefone.replaceAll("\\D", "");
        if (digits.startsWith("55") && digits.length() >= 12) {
            return digits;
        }
        return "55" + digits;
    }
}
