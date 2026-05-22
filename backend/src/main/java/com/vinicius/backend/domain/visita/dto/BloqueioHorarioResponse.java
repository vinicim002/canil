package com.vinicius.backend.domain.visita.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public record BloqueioHorarioResponse(
        UUID id,
        LocalDate data,
        LocalTime hora,
        boolean diaInteiro,
        String motivo,
        LocalDateTime criadoEm
) {}
