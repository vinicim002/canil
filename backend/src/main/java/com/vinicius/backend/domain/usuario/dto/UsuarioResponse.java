package com.vinicius.backend.domain.usuario.dto;

import com.vinicius.backend.domain.usuario.enums.Role;
import java.time.LocalDateTime;
import java.util.UUID;

public record UsuarioResponse(
        UUID id,
        String nome,
        String email,
        String telefone,
        Role role,
        Boolean ativo,
        LocalDateTime criadoEm
) {}