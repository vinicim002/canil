package com.vinicius.backend.domain.faq.dto;

import jakarta.validation.constraints.NotBlank;

public record FaqRequest(
        @NotBlank(message = "Pergunta é obrigatória")
        String pergunta,

        @NotBlank(message = "Resposta é obrigatória")
        String resposta,

        Integer ordem
) {}