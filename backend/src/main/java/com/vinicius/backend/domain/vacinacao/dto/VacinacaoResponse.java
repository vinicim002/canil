package com.vinicius.backend.domain.vacinacao.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record VacinacaoResponse(
        UUID id,
        UUID caoId,
        String nomeCao,
        String nomeVacina,
        LocalDate dataAplicacao,
        LocalDate proximaDose,
        String lote,
        String veterinario,
        String observacoes,
        LocalDateTime criadoEm
) {}