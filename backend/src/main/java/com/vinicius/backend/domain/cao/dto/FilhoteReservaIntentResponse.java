package com.vinicius.backend.domain.cao.dto;

public record FilhoteReservaIntentResponse(
        boolean disponivel,
        int quantidadeDisponiveis,
        String mensagemWhatsApp,
        String telefoneWhatsApp,
        String pdfUrl,
        String pdfFileName
) {}
