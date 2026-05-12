package com.vinicius.backend.domain.cao.dto;

import com.vinicius.backend.domain.cao.enums.Genero;
import com.vinicius.backend.domain.cao.enums.TipoPelo;

import java.util.UUID;

public record CaoPaisResponse(
        UUID id,
        String nome,
        TipoPelo tipoPelo,
        Genero genero
) {}