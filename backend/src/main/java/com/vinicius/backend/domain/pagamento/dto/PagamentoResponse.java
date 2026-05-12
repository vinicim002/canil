package com.vinicius.backend.domain.pagamento.dto;

import com.vinicius.backend.domain.pagamento.enums.MetodoPagamento;
import com.vinicius.backend.domain.pagamento.enums.StatusPagamento;
import com.vinicius.backend.domain.pagamento.enums.TipoPagamento;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record PagamentoResponse(
        UUID id,
        UUID reservaId,
        BigDecimal valor,
        StatusPagamento status,
        TipoPagamento tipo,
        MetodoPagamento metodo,
        String transacaoId,
        String gateway,
        LocalDateTime pagoEm,
        LocalDateTime criadoEm
) {}