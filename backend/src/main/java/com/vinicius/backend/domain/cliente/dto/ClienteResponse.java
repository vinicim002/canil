package com.vinicius.backend.domain.cliente.dto;

import java.util.UUID;

public record ClienteResponse(
        UUID id,
        UUID usuarioId,
        String nomeUsuario,
        String emailUsuario,
        String telefoneUsuario,
        String cpf,
        String endereco,
        String cidade,
        String estado,
        String cep,
        String fotoPerfil
) {}