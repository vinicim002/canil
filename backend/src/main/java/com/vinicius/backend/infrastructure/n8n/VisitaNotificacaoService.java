package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.infrastructure.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitaNotificacaoService {

    private final N8nWebhookClient n8nWebhookClient;
    private final VisitaMapper visitaMapper;
    private final MailProperties mailProperties;
    private final EmailService emailService;

    @Value("${app.visita.notificar-email:true}")
    private boolean notificarEmail;

    @Async
    public void disparar(TipoEventoVisita evento, VisitaAgendamento visita) {
        VisitaResponse response = visitaMapper.toResponse(visita);
        VisitaNotificacaoPayload payload = montarPayload(evento, response);
        n8nWebhookClient.enviar(payload);
        enviarEmailSeAplicavel(evento, response);
    }

    @Async
    public void disparar(TipoEventoVisita evento, VisitaResponse response) {
        VisitaNotificacaoPayload payload = montarPayload(evento, response);
        n8nWebhookClient.enviar(payload);
        enviarEmailSeAplicavel(evento, response);
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
        if (!notificarEmail) {
            return;
        }
        try {
            switch (evento) {
                case VISITA_CRIADA, VISITA_REAGENDADA, VISITA_CONFIRMADA ->
                        emailService.enviarConfirmacaoVisita(response, evento);
                case VISITA_CANCELADA ->
                        emailService.enviarCancelamentoVisita(response);
                default -> { }
            }
        } catch (Exception e) {
            log.warn("[Email visita] Falha ao notificar {}: {}", evento, e.getMessage());
        }
    }

    static String formatarTelefoneWhatsApp(String telefone) {
        String digits = telefone.replaceAll("\\D", "");
        if (digits.startsWith("55") && digits.length() >= 12) {
            return digits;
        }
        return "55" + digits;
    }
}
