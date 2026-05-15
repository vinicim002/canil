package com.vinicius.backend.domain.cao.dto;

import com.vinicius.backend.domain.cao.enums.*;

public record CaoFiltroRequest(
        TipoCao tipo,
        StatusCao status,
        TipoPelo tipoPelo,
        Tamanho tamanho,
        Genero genero,
        Boolean destaque
) {}