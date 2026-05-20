package com.vinicius.backend.domain.auth.dto;

import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.enums.StatusUsuario;

import java.util.UUID;

public record LoginResponse(
        String accessToken,
        String refreshToken,
        UUID usuarioId,
        String nome,
        String email,
        Role role,
        StatusUsuario status
) {}