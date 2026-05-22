package com.vinicius.backend.domain.webhook.controller;

import com.vinicius.backend.domain.cao.dto.FilhoteReservaIntentResponse;
import com.vinicius.backend.domain.cao.service.FilhoteDisponibilidadeService;
import com.vinicius.backend.infrastructure.n8n.N8nWebhookAuthService;
import com.vinicius.backend.infrastructure.n8n.VisitaLembreteService;
import com.vinicius.backend.infrastructure.n8n.VisitaNotificacaoPayload;
import com.vinicius.backend.infrastructure.n8n.VisitaWhatsappIntentService;
import com.vinicius.backend.infrastructure.n8n.dto.LembreteProcessamentoResponse;
import com.vinicius.backend.infrastructure.n8n.dto.WhatsappIntentResponse;
import com.vinicius.backend.infrastructure.n8n.dto.WhatsappMensagemRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/webhooks/n8n")
@RequiredArgsConstructor
public class N8nWebhookController {

    private final N8nWebhookAuthService webhookAuthService;
    private final VisitaLembreteService visitaLembreteService;
    private final FilhoteDisponibilidadeService filhoteDisponibilidadeService;
    private final VisitaWhatsappIntentService visitaWhatsappIntentService;

    /**
     * Chamado pelo cron do n8n para enviar lembretes (ex.: 24h antes da visita).
     */
    @GetMapping("/visitas/lembretes")
    public ResponseEntity<List<VisitaNotificacaoPayload>> lembretes(
            @RequestHeader(value = "X-Webhook-Secret", required = false) String secret,
            @RequestParam(defaultValue = "24") int horas
    ) {
        webhookAuthService.validarSecret(secret);
        return ResponseEntity.ok(visitaLembreteService.listarParaLembrete(horas));
    }

    /**
     * Cron n8n: busca visitas na janela (ex. 24h antes), envia WhatsApp e marca lembrete enviado.
     */
    @PostMapping("/visitas/lembretes/processar")
    public ResponseEntity<LembreteProcessamentoResponse> processarLembretes(
            @RequestHeader(value = "X-Webhook-Secret", required = false) String secret,
            @RequestParam(defaultValue = "24") int horas
    ) {
        webhookAuthService.validarSecret(secret);
        return ResponseEntity.ok(visitaLembreteService.processar(horas));
    }

    /**
     * Chamado pelo n8n quando o cliente envia mensagem de reserva de filhote no WhatsApp.
     * Regra de negócio: contagem de filhotes DISPONIVEL no banco.
     */
    @GetMapping("/filhotes/reserva-intent")
    public ResponseEntity<FilhoteReservaIntentResponse> reservaFilhoteIntent(
            @RequestHeader(value = "X-Webhook-Secret", required = false) String secret,
            @RequestParam String telefone
    ) {
        webhookAuthService.validarSecret(secret);
        return ResponseEntity.ok(filhoteDisponibilidadeService.responderIntentReserva(telefone));
    }

    /**
     * Mensagens recebidas no WhatsApp (Evolution → n8n → Spring).
     * Detecta intent (alterar/cancelar visita, reservar filhote) e responde no Zap.
     */
    @PostMapping("/whatsapp/processar")
    public ResponseEntity<WhatsappIntentResponse> processarWhatsapp(
            @RequestHeader(value = "X-Webhook-Secret", required = false) String secret,
            @RequestBody @Valid WhatsappMensagemRequest request
    ) {
        webhookAuthService.validarSecret(secret);
        return ResponseEntity.ok(
                visitaWhatsappIntentService.processar(request.telefone(), request.texto())
        );
    }
}
