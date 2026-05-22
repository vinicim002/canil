package com.vinicius.backend.domain.visita.dto;

import java.time.LocalDate;
import java.util.List;

public record SlotsDiaResponse(
        LocalDate data,
        List<SlotDisponivelResponse> slots
) {}
