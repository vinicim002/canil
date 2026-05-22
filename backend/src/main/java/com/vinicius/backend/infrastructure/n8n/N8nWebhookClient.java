package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.N8nProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Slf4j
@Component
@RequiredArgsConstructor
public class N8nWebhookClient {

    private final N8nProperties n8nProperties;

    public void enviar(VisitaNotificacaoPayload payload) {
        if (!n8nProperties.isEnabled()) {
            log.debug("[n8n desabilitado] Evento {} ignorado", payload.evento());
            return;
        }

        String url = n8nProperties.getWebhookUrlVisita();
        if (url == null || url.isBlank()) {
            log.warn("[n8n] URL do webhook de visita não configurada.");
            return;
        }

        try {
            RestClient client = RestClient.builder()
                    .requestFactory(requestFactory())
                    .build();

            client.post()
                    .uri(url)
                    .header("X-Webhook-Secret", n8nProperties.getWebhookSecret())
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();

            log.info("[n8n] Evento {} enviado para visita {}", payload.evento(), payload.visitaId());
        } catch (RestClientException e) {
            log.error("[n8n] Falha ao enviar evento {}: {}", payload.evento(), e.getMessage());
        }
    }

    private SimpleClientHttpRequestFactory requestFactory() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(n8nProperties.getConnectTimeoutMs());
        factory.setReadTimeout(n8nProperties.getReadTimeoutMs());
        return factory;
    }
}
