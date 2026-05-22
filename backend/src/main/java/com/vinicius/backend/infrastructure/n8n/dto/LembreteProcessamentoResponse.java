package com.vinicius.backend.infrastructure.n8n.dto;

public record LembreteProcessamentoResponse(
        int enviados,
        int elegiveis,
        int horasAntes
) {}
