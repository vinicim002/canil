package com.vinicius.backend.domain.visita.service;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import com.vinicius.backend.infrastructure.n8n.TipoEventoVisita;
import com.vinicius.backend.infrastructure.n8n.VisitaNotificacaoService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VisitaAdminService {

    private final VisitaAgendamentoRepository visitaRepository;
    private final VisitaMapper visitaMapper;
    private final VisitaNotificacaoService visitaNotificacaoService;

    @Transactional(readOnly = true)
    public List<VisitaResponse> listar(StatusAgendamento status) {
        List<VisitaAgendamento> visitas = status != null
                ? visitaRepository.findByStatusOrderByDataHoraDesc(status)
                : visitaRepository.findAllByOrderByDataHoraDesc();
        return visitas.stream().map(visitaMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public VisitaResponse buscarPorId(UUID id) {
        return visitaMapper.toResponse(buscarEntidadePorId(id));
    }

    @Transactional
    public VisitaResponse confirmar(UUID id) {
        VisitaAgendamento visita = buscarEntidadePorId(id);
        if (visita.getStatus() != StatusAgendamento.PENDENTE
                && visita.getStatus() != StatusAgendamento.REAGENDADO) {
            throw new BusinessException("Apenas visitas pendentes ou reagendadas podem ser confirmadas.");
        }
        visita.setStatus(StatusAgendamento.CONFIRMADO);
        VisitaAgendamento salva = visitaRepository.save(visita);
        visitaNotificacaoService.disparar(TipoEventoVisita.VISITA_CONFIRMADA, salva);
        return visitaMapper.toResponse(salva);
    }

    @Transactional
    public VisitaResponse cancelar(UUID id) {
        VisitaAgendamento visita = buscarEntidadePorId(id);
        if (visita.getStatus() == StatusAgendamento.REALIZADO) {
            throw new BusinessException("Visitas realizadas não podem ser canceladas.");
        }
        if (visita.getStatus() == StatusAgendamento.CANCELADO) {
            throw new BusinessException("Esta visita já está cancelada.");
        }
        visita.setStatus(StatusAgendamento.CANCELADO);
        return visitaMapper.toResponse(visitaRepository.save(visita));
    }

    @Transactional
    public VisitaResponse marcarRealizado(UUID id) {
        VisitaAgendamento visita = buscarEntidadePorId(id);
        if (visita.getStatus() != StatusAgendamento.CONFIRMADO) {
            throw new BusinessException("Apenas visitas confirmadas podem ser marcadas como realizadas.");
        }
        visita.setStatus(StatusAgendamento.REALIZADO);
        return visitaMapper.toResponse(visitaRepository.save(visita));
    }

    @Transactional
    public VisitaResponse marcarAusente(UUID id) {
        VisitaAgendamento visita = buscarEntidadePorId(id);
        if (visita.getStatus() != StatusAgendamento.CONFIRMADO
                && visita.getStatus() != StatusAgendamento.PENDENTE
                && visita.getStatus() != StatusAgendamento.REAGENDADO) {
            throw new BusinessException("Esta visita não pode ser marcada como ausente.");
        }
        visita.setStatus(StatusAgendamento.AUSENTE);
        return visitaMapper.toResponse(visitaRepository.save(visita));
    }

    private VisitaAgendamento buscarEntidadePorId(UUID id) {
        return visitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visita não encontrada."));
    }
}
