package com.vinicius.backend.domain.cao.dto;

import com.vinicius.backend.domain.cao.enums.Genero;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.enums.Tamanho;
import com.vinicius.backend.domain.cao.enums.TipoPelo;

public record CaoFiltroRequest(
        StatusCao status,
        TipoPelo tipoPelo,
        Tamanho tamanho,
        Genero genero,
        Boolean destaque
) {}