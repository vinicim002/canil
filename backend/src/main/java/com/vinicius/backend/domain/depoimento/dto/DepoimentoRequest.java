package com.vinicius.backend.domain.depoimento.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DepoimentoRequest(
        @NotBlank(message = "Nome é obrigatório")
        String nomeCliente,

        @NotBlank(message = "Texto é obrigatório")
        String texto,

        @NotNull(message = "Nota é obrigatória")
        @Min(value = 1, message = "Nota mínima é 1")
        @Max(value = 5, message = "Nota máxima é 5")
        Integer nota,

        String fotoUrl
) {}