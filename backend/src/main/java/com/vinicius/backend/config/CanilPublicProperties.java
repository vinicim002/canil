package com.vinicius.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.canil")
public class CanilPublicProperties {

    /** Número WhatsApp do canil (DDI+DDD+número, só dígitos). */
    private String whatsappNumero = "5521982521511";

    /**
     * URL base acessível pelo n8n/Evolution no Docker (PDF, etc.).
     * Dev: http://host.docker.internal:8080
     */
    private String docsBaseUrl = "http://host.docker.internal:8080";
}
