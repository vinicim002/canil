package com.vinicius.backend.domain.visita.mapper;

import com.vinicius.backend.domain.visita.dto.BloqueioHorarioResponse;
import com.vinicius.backend.domain.visita.model.BloqueioHorario;
import org.springframework.stereotype.Component;

@Component
public class BloqueioHorarioMapper {

    public BloqueioHorarioResponse toResponse(BloqueioHorario bloqueio) {
        return new BloqueioHorarioResponse(
                bloqueio.getId(),
                bloqueio.getData(),
                bloqueio.getHora(),
                bloqueio.getHora() == null,
                bloqueio.getMotivo(),
                bloqueio.getCriadoEm()
        );
    }
}
