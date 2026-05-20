package com.vinicius.backend.domain.usuario.dto;

import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.enums.StatusUsuario;
import java.time.LocalDateTime;
import java.util.UUID;

public record UsuarioResponse(
        UUID id,
        String nome,
        String email,
        String telefone,
        Role role,
        Boolean ativo,
        StatusUsuario status,
        LocalDateTime criadoEm
) {}