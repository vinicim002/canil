package com.vinicius.backend.domain.pagamento.mapper;

import com.vinicius.backend.domain.pagamento.dto.PagamentoResponse;
import com.vinicius.backend.domain.pagamento.model.Pagamento;
import org.springframework.stereotype.Component;

@Component
public class PagamentoMapper {

    public PagamentoResponse toResponse(Pagamento pagamento) {
        return new PagamentoResponse(
                pagamento.getId(),
                pagamento.getReserva().getId(),
                pagamento.getValor(),
                pagamento.getStatus(),
                pagamento.getTipo(),
                pagamento.getMetodo(),
                pagamento.getTransacaoId(),
                pagamento.getGateway(),
                pagamento.getPagoEm(),
                pagamento.getCriadoEm()
        );
    }
}