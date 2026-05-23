package com.vinicius.backend.integration;

import com.vinicius.backend.support.IntegrationTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class N8nWebhookAuthIntegrationTest extends IntegrationTestBase {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void deveRejeitarWebhookSemSecret() {
        ResponseEntity<String> response = restTemplate.exchange(
                "/api/webhooks/n8n/visitas/lembretes?horas=24",
                HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders()),
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void deveAceitarWebhookComSecretValido() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Webhook-Secret", "test-n8n-webhook-secret");

        ResponseEntity<String> response = restTemplate.exchange(
                "/api/webhooks/n8n/visitas/lembretes?horas=24",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
