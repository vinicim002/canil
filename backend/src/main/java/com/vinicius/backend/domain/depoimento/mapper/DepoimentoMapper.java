package com.vinicius.backend.domain.depoimento.mapper;

import com.vinicius.backend.domain.depoimento.dto.DepoimentoResponse;
import com.vinicius.backend.domain.depoimento.model.Depoimento;
import org.springframework.stereotype.Component;

@Component
public class DepoimentoMapper {

    public DepoimentoResponse toResponse(Depoimento depoimento) {
        return new DepoimentoResponse(
                depoimento.getId(),
                depoimento.getNomeCliente(),
                depoimento.getTexto(),
                depoimento.getNota(),
                depoimento.getFotoUrl(),
                depoimento.getAprovado(),
                depoimento.getDestaque(),
                depoimento.getCriadoEm()
        );
    }
}