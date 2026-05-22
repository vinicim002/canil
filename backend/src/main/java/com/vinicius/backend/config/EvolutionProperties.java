package com.vinicius.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.evolution")
public class EvolutionProperties {

    private boolean enabled = true;
    private String baseUrl = "http://localhost:8081";
    private String apiKey = "canil-evolution-dev-key";
    private String instanceName = "canil";
    private int connectTimeoutMs = 5000;
    private int readTimeoutMs = 15000;
}
