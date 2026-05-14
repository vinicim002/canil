package com.vinicius.backend.domain.cao.dto;

import com.vinicius.backend.domain.cao.enums.Genero;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.enums.Tamanho;
import com.vinicius.backend.domain.cao.enums.TipoPelo;
import com.vinicius.backend.domain.imagem.dto.ImagemResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record CaoResponse(
        UUID id,
        String nome,
        TipoPelo tipoPelo,
        Tamanho tamanho,
        Genero genero,
        StatusCao status,
        LocalDate dataNascimento,
        String cor,
        String pedigree,
        String descricao,
        Boolean destaque,
        CaoPaisResponse pai,
        CaoPaisResponse mae,
        List<ImagemResponse> imagens,
        LocalDateTime criadoEm
) {}