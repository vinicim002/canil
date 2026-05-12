package com.vinicius.backend.domain.agendamento.mapper;

import com.vinicius.backend.domain.agendamento.dto.AgendamentoResponse;
import com.vinicius.backend.domain.agendamento.model.Agendamento;
import org.springframework.stereotype.Component;

@Component
public class AgendamentoMapper {

    public AgendamentoResponse toResponse(Agendamento agendamento) {
        return new AgendamentoResponse(
                agendamento.getId(),
                agendamento.getUsuario().getId(),
                agendamento.getUsuario().getNome(),
                agendamento.getCao() != null ? agendamento.getCao().getId() : null,
                agendamento.getCao() != null ? agendamento.getCao().getNome() : null,
                agendamento.getDataHora(),
                agendamento.getStatus(),
                agendamento.getObservacoes(),
                agendamento.getCriadoEm()
        );
    }
}