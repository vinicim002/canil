package com.vinicius.backend.domain.usuario.dto;

import com.vinicius.backend.domain.usuario.enums.StatusUsuario;
import jakarta.validation.constraints.NotNull;

public record AtualizarStatusRequest(
        @NotNull StatusUsuario status
) {}
