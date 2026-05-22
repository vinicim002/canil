package com.vinicius.backend.domain.visita.mapper;

import com.vinicius.backend.config.VisitaProperties;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VisitaMapper {

    private final VisitaProperties visitaProperties;

    public VisitaResponse toResponse(VisitaAgendamento visita) {
        return new VisitaResponse(
                visita.getId(),
                visita.getNome(),
                visita.getTelefone(),
                visita.getEmail(),
                visita.getDataHora(),
                visita.getStatus(),
                visita.getObservacoes(),
                montarLink(visita.getTokenAcesso()),
                visita.getCriadoEm()
        );
    }

    public String montarLink(String token) {
        String base = visitaProperties.getSiteUrl().replaceAll("/$", "");
        String path = visitaProperties.getManagementPath();
        if (!path.startsWith("/")) {
            path = "/" + path;
        }
        return base + path + "/" + token;
    }
}
