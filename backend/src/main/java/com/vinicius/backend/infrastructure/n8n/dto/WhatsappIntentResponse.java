package com.vinicius.backend.infrastructure.n8n.dto;

public record WhatsappIntentResponse(
        boolean processado,
        String intentDetectado,
        int visitasEncontradas,
        String telefoneWhatsApp,
        String mensagemEnviada
) {}
