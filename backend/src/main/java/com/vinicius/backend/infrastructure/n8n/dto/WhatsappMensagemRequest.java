package com.vinicius.backend.infrastructure.n8n.dto;

import jakarta.validation.constraints.NotBlank;

public record WhatsappMensagemRequest(
        @NotBlank(message = "Telefone é obrigatório.")
        String telefone,
        @NotBlank(message = "Texto da mensagem é obrigatório.")
        String texto
) {}
