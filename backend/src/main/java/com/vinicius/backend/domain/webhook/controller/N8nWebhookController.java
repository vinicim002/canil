package com.vinicius.backend.domain.webhook.controller;

import com.vinicius.backend.infrastructure.n8n.N8nWebhookAuthService;
import com.vinicius.backend.infrastructure.n8n.VisitaLembreteService;
import com.vinicius.backend.infrastructure.n8n.VisitaNotificacaoPayload;
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
}
