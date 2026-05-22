package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.N8nProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class N8nWebhookAuthService {

    private final N8nProperties n8nProperties;

    public void validarSecret(String secretRecebido) {
        if (!n8nProperties.isEnabled()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Integração n8n desabilitada.");
        }
        String esperado = n8nProperties.getWebhookSecret();
        if (secretRecebido == null || !esperado.equals(secretRecebido)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Webhook não autorizado.");
        }
    }
}
