package com.vinicius.backend.domain.cliente.dto;

import jakarta.validation.constraints.Pattern;

public record ClienteRequest(
        @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos")
        String cpf,

        String endereco,
        String cidade,
        String estado,

        @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 dígitos")
        String cep,

        String fotoPerfil
) {}