package com.vinicius.backend.domain.cao.dto;

import com.vinicius.backend.domain.cao.enums.Genero;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.enums.Tamanho;
import com.vinicius.backend.domain.cao.enums.TipoPelo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CaoRequest(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotNull(message = "Tipo de pelo é obrigatório")
        TipoPelo tipoPelo,

        @NotNull(message = "Tamanho é obrigatório")
        Tamanho tamanho,

        @NotNull(message = "Gênero é obrigatório")
        Genero genero,

        @NotNull(message = "Status é obrigatório")
        StatusCao status,

        LocalDate dataNascimento,
        String cor,
        String pedigree,
        String descricao,
        Boolean destaque,
        UUID paiId,
        UUID maeId
) {}