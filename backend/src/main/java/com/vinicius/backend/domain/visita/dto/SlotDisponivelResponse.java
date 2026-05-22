package com.vinicius.backend.domain.visita.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

public record SlotDisponivelResponse(
        LocalTime horario,
        LocalDateTime dataHora
) {}
