package com.vinicius.backend.domain.faq.dto;

import java.util.UUID;

public record FaqResponse(
        UUID id,
        String pergunta,
        String resposta,
        Integer ordem,
        Boolean ativo
) {}