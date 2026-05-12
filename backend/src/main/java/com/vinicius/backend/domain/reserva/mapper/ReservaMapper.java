package com.vinicius.backend.domain.reserva.mapper;

import com.vinicius.backend.domain.reserva.dto.ReservaResponse;
import com.vinicius.backend.domain.reserva.model.Reserva;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ReservaMapper {

    public ReservaResponse toResponse(Reserva reserva) {
        BigDecimal valorRestante = reserva.getValorTotal() != null && reserva.getValorSinal() != null
                ? reserva.getValorTotal().subtract(reserva.getValorSinal())
                : BigDecimal.ZERO;

        return new ReservaResponse(
                reserva.getId(),
                reserva.getUsuario().getId(),
                reserva.getUsuario().getNome(),
                reserva.getCao().getId(),
                reserva.getCao().getNome(),
                reserva.getStatus(),
                reserva.getValorSinal(),
                reserva.getValorTotal(),
                valorRestante,
                reserva.getObservacoes(),
                reserva.getCriadoEm(),
                reserva.getAtualizadoEm()
        );
    }
}