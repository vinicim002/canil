package com.vinicius.backend.domain.cao.dto;

import com.vinicius.backend.domain.cao.enums.TipoCao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

public record CaoRequest(
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @NotNull(message = "O tipo (Filhote, Matriz ou Reprodutor) é obrigatório")
        TipoCao tipo,

        @NotBlank(message = "Tipo de pelo é obrigatório")
        String tipoPelo,

        @NotBlank(message = "Tamanho é obrigatório")
        String tamanho,

        @NotBlank(message = "Gênero é obrigatório")
        String genero,

        @NotBlank(message = "Status é obrigatório")
        String status,

        LocalDate dataNascimento,
        String cor,
        String pedigree,
        String descricao,
        Boolean destaque,
        UUID paiId,
        UUID maeId
) {}