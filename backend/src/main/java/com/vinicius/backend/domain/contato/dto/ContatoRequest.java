package com.vinicius.backend.domain.contato.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContatoRequest(
        @NotBlank @Size(max = 120) String nome,
        @NotBlank @Email String email,
        @Size(max = 20) String telefone,
        @NotBlank @Size(max = 100) String assunto,
        @NotBlank @Size(max = 2000) String mensagem
) {}
