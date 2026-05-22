package com.vinicius.backend.domain.visita.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record CriarVisitaRequest(
        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 150, message = "Nome muito longo")
        String nome,

        @NotBlank(message = "Telefone é obrigatório")
        @Size(max = 20, message = "Telefone inválido")
        String telefone,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotNull(message = "Data e hora são obrigatórias")
        @Future(message = "O agendamento deve ser para uma data futura")
        LocalDateTime dataHora,

        @Size(max = 2000, message = "Observações muito longas")
        String observacoes
) {}
