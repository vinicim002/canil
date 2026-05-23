package com.vinicius.backend.infrastructure.email;

import com.vinicius.backend.config.MailProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResendEmailClient {

    private static final String RESEND_URL = "https://api.resend.com/emails";

    private final MailProperties mailProperties;
    private final RestClient restClient = RestClient.builder().build();

    public boolean enviar(String para, String assunto, String html) {
        String apiKey = mailProperties.getResendApiKey();
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("[Resend] RESEND_API_KEY não configurada");
            return false;
        }

        try {
            restClient.post()
                    .uri(RESEND_URL)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "from", mailProperties.getFrom(),
                            "to", List.of(para),
                            "subject", assunto,
                            "html", html
                    ))
                    .retrieve()
                    .toBodilessEntity();
            log.info("[Resend] E-mail enviado");
            return true;
        } catch (Exception e) {
            log.error("[Resend] Falha ao enviar e-mail: {}", e.getMessage());
            return false;
        }
    }
}
