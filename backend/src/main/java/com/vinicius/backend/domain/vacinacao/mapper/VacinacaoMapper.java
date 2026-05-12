package com.vinicius.backend.domain.vacinacao.mapper;

import com.vinicius.backend.domain.vacinacao.dto.VacinacaoResponse;
import com.vinicius.backend.domain.vacinacao.model.HistoricoVacinacao;
import org.springframework.stereotype.Component;

@Component
public class VacinacaoMapper {

    public VacinacaoResponse toResponse(HistoricoVacinacao vacinacao) {
        return new VacinacaoResponse(
                vacinacao.getId(),
                vacinacao.getCao().getId(),
                vacinacao.getCao().getNome(),
                vacinacao.getNomeVacina(),
                vacinacao.getDataAplicacao(),
                vacinacao.getProximaDose(),
                vacinacao.getLote(),
                vacinacao.getVeterinario(),
                vacinacao.getObservacoes(),
                vacinacao.getCriadoEm()
        );
    }
}