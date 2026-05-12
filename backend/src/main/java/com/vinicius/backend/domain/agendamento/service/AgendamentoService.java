package com.vinicius.backend.domain.agendamento.service;

import com.vinicius.backend.domain.agendamento.dto.AgendamentoRequest;
import com.vinicius.backend.domain.agendamento.dto.AgendamentoResponse;
import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.agendamento.mapper.AgendamentoMapper;
import com.vinicius.backend.domain.agendamento.model.Agendamento;
import com.vinicius.backend.domain.agendamento.repository.AgendamentoRepository;
import com.vinicius.backend.domain.cao.service.CaoService;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final AgendamentoMapper agendamentoMapper;
    private final UsuarioService usuarioService;
    private final CaoService caoService;

    @Transactional
    public AgendamentoResponse criar(UUID usuarioId, AgendamentoRequest request) {
        Usuario usuario = usuarioService.buscarEntidadePorId(usuarioId);

        if (agendamentoRepository.existsByDataHoraBetween(
                request.dataHora().minusMinutes(30),
                request.dataHora().plusMinutes(30))) {
            throw new BusinessException("Já existe um agendamento neste horário.");
        }

        Agendamento agendamento = Agendamento.builder()
                .usuario(usuario)
                .dataHora(request.dataHora())
                .status(StatusAgendamento.PENDENTE)
                .observacoes(request.observacoes())
                .build();

        if (request.caoId() != null) {
            agendamento.setCao(caoService.buscarEntidadePorId(request.caoId()));
        }

        return agendamentoMapper.toResponse(agendamentoRepository.save(agendamento));
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> listarTodos() {
        return agendamentoRepository.findAll()
                .stream()
                .map(agendamentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> listarPorUsuario(UUID usuarioId) {
        return agendamentoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(agendamentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AgendamentoResponse> listarPorStatus(StatusAgendamento status) {
        return agendamentoRepository.findByStatus(status)
                .stream()
                .map(agendamentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AgendamentoResponse buscarPorId(UUID id) {
        return agendamentoMapper.toResponse(buscarEntidadePorId(id));
    }

    @Transactional
    public AgendamentoResponse confirmar(UUID id) {
        Agendamento agendamento = buscarEntidadePorId(id);
        if (agendamento.getStatus() != StatusAgendamento.PENDENTE) {
            throw new BusinessException("Apenas agendamentos pendentes podem ser confirmados.");
        }
        agendamento.setStatus(StatusAgendamento.CONFIRMADO);
        return agendamentoMapper.toResponse(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public AgendamentoResponse cancelar(UUID id) {
        Agendamento agendamento = buscarEntidadePorId(id);
        if (agendamento.getStatus() == StatusAgendamento.REALIZADO) {
            throw new BusinessException("Agendamentos realizados não podem ser cancelados.");
        }
        agendamento.setStatus(StatusAgendamento.CANCELADO);
        return agendamentoMapper.toResponse(agendamentoRepository.save(agendamento));
    }

    @Transactional
    public AgendamentoResponse marcarComoRealizado(UUID id) {
        Agendamento agendamento = buscarEntidadePorId(id);
        if (agendamento.getStatus() != StatusAgendamento.CONFIRMADO) {
            throw new BusinessException("Apenas agendamentos confirmados podem ser marcados como realizados.");
        }
        agendamento.setStatus(StatusAgendamento.REALIZADO);
        return agendamentoMapper.toResponse(agendamentoRepository.save(agendamento));
    }

    public Agendamento buscarEntidadePorId(UUID id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado."));
    }
}