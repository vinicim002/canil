package com.vinicius.backend.domain.pagamento.dto;

import com.vinicius.backend.domain.pagamento.enums.MetodoPagamento;
import com.vinicius.backend.domain.pagamento.enums.TipoPagamento;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.UUID;

public record PagamentoRequest(
        @NotNull(message = "Reserva é obrigatória")
        UUID reservaId,

        @NotNull(message = "Valor é obrigatório")
        @Positive(message = "Valor deve ser positivo")
        BigDecimal valor,

        @NotNull(message = "Tipo é obrigatório")
        TipoPagamento tipo,

        @NotNull(message = "Método é obrigatório")
        MetodoPagamento metodo
) {}