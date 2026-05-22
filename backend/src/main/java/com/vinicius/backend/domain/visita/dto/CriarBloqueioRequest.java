package com.vinicius.backend.domain.visita.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record CriarBloqueioRequest(
        @NotNull(message = "Data é obrigatória")
        LocalDate data,

        /** Null bloqueia o dia inteiro. */
        LocalTime hora,

        @Size(max = 500, message = "Motivo muito longo")
        String motivo
) {}
