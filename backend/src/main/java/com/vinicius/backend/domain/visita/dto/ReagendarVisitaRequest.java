package com.vinicius.backend.domain.visita.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ReagendarVisitaRequest(
        @NotNull(message = "Nova data e hora são obrigatórias")
        @Future(message = "O reagendamento deve ser para uma data futura")
        LocalDateTime dataHora,

        @Size(max = 2000, message = "Observações muito longas")
        String observacoes
) {}
