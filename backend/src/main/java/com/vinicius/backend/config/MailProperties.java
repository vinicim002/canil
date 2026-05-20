package com.vinicius.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.mail")
public class MailProperties {
    private boolean enabled = false;
    private String from = "noreply@canilaltabelavista.com";
    private String admin = "contato@canilaltabelavista.com";
    private String siteName = "Canil Alto da Bela Vista";
    private String siteUrl = "http://localhost:5173";
}
