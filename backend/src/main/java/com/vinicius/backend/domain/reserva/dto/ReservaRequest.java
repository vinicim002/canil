package com.vinicius.backend.domain.reserva.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.UUID;

public record ReservaRequest(
        @NotNull(message = "Cão é obrigatório")
        UUID caoId,

        @NotNull(message = "Valor do sinal é obrigatório")
        @Positive(message = "Valor do sinal deve ser positivo")
        BigDecimal valorSinal,

        @NotNull(message = "Valor total é obrigatório")
        @Positive(message = "Valor total deve ser positivo")
        BigDecimal valorTotal,

        String observacoes
) {}