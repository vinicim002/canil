package com.vinicius.backend.domain.vacinacao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;
import java.util.UUID;

public record VacinacaoRequest(
        @NotNull(message = "Cão é obrigatório")
        UUID caoId,

        @NotBlank(message = "Nome da vacina é obrigatório")
        String nomeVacina,

        @NotNull(message = "Data de aplicação é obrigatória")
        @PastOrPresent(message = "Data de aplicação não pode ser futura")
        LocalDate dataAplicacao,

        LocalDate proximaDose,
        String lote,
        String veterinario,
        String observacoes
) {}