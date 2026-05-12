package com.vinicius.backend.domain.depoimento.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record DepoimentoResponse(
        UUID id,
        String nomeCliente,
        String texto,
        Integer nota,
        String fotoUrl,
        Boolean aprovado,
        Boolean destaque,
        LocalDateTime criadoEm
) {}