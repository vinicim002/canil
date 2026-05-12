package com.vinicius.backend.domain.reserva.dto;

import com.vinicius.backend.domain.reserva.enums.StatusReserva;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ReservaResponse(
        UUID id,
        UUID usuarioId,
        String nomeUsuario,
        UUID caoId,
        String nomeCao,
        StatusReserva status,
        BigDecimal valorSinal,
        BigDecimal valorTotal,
        BigDecimal valorRestante,
        String observacoes,
        LocalDateTime criadoEm,
        LocalDateTime atualizadoEm
) {}