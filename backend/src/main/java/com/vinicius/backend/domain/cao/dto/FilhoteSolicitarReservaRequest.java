package com.vinicius.backend.domain.cao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record FilhoteSolicitarReservaRequest(
        @NotBlank(message = "Informe seu WhatsApp.")
        @Size(min = 10, max = 20, message = "Telefone inválido.")
        String telefone
) {}
