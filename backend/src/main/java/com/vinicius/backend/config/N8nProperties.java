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
    /** Webhook n8n (POST) — resposta automática reserva de filhote (texto + PDF). */
    private String webhookUrlFilhoteResposta = "";
    /** Se false, Spring envia direto pela Evolution (recomendado em dev). */
    private boolean filhoteRespostaViaN8n = false;
    /** Se true, visitas usam Evolution direto (evita bug do n8n sem number/text). */
    private boolean visitaWhatsappViaEvolutionDireto = true;
    private int connectTimeoutMs = 5000;
    private int readTimeoutMs = 10000;
}
