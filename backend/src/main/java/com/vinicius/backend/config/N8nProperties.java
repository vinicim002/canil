package com.vinicius.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.n8n")
public class N8nProperties {

    private boolean enabled = false;
    private String webhookSecret = "change-me";
    /** Webhook único do n8n (POST) para eventos de visita. */
    private String webhookUrlVisita = "";
    private int connectTimeoutMs = 5000;
    private int readTimeoutMs = 10000;
}
