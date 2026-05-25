package com.vinicius.backend.domain.visita.service;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.visita.dto.CriarVisitaRequest;
import com.vinicius.backend.domain.visita.dto.ReagendarVisitaRequest;
import com.vinicius.backend.domain.visita.dto.SlotsDiaResponse;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import com.vinicius.backend.infrastructure.n8n.TipoEventoVisita;
import com.vinicius.backend.infrastructure.n8n.VisitaNotificacaoService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitaService {

    private final VisitaAgendamentoRepository visitaRepository;
    private final VisitaMapper visitaMapper;
    private final VisitaTokenService tokenService;
    private final DisponibilidadeService disponibilidadeService;
    private final VisitaNotificacaoService visitaNotificacaoService;

    @Transactional(readOnly = true)
    public SlotsDiaResponse listarSlots(LocalDate data) {
        return disponibilidadeService.listarSlots(data);
    }

    @Transactional(readOnly = true)
    public SlotsDiaResponse listarSlots(LocalDate data, String token) {
        UUID excluirId = token != null && !token.isBlank()
                ? buscarEntidadePorToken(token).getId()
                : null;
        return disponibilidadeService.listarSlots(data, excluirId);
    }

    @Transactional
    public VisitaResponse criar(CriarVisitaRequest request) {
        disponibilidadeService.validarSlotDisponivel(request.dataHora());

        if (visitaRepository.existsByDataHoraAndStatusNotIn(
                request.dataHora(),
                List.of(StatusAgendamento.CANCELADO, StatusAgendamento.AUSENTE, StatusAgendamento.REALIZADO)
        )) {
            throw new BusinessException("Este horário acabou de ser reservado. Escolha outro.");
        }

        VisitaAgendamento visita = VisitaAgendamento.builder()
                .nome(request.nome().trim())
                .telefone(normalizarTelefone(request.telefone()))
                .email(request.email().trim().toLowerCase())
                .dataHora(request.dataHora())
                .observacoes(request.observacoes() != null ? request.observacoes().trim() : null)
                .status(StatusAgendamento.PENDENTE)
                .tokenAcesso(tokenService.gerarTokenUnico())
                .build();

        VisitaAgendamento salva = visitaRepository.save(visita);
        log.info("[Visita] Agendada id={} email={} dataHora={}", salva.getId(), salva.getEmail(), salva.getDataHora());
        visitaNotificacaoService.disparar(TipoEventoVisita.VISITA_CRIADA, salva);
        return visitaMapper.toResponse(salva);
    }

    @Transactional(readOnly = true)
    public VisitaResponse buscarPorToken(String token) {
        return visitaMapper.toResponse(buscarEntidadePorToken(token));
    }

    @Transactional
    public VisitaResponse reagendar(String token, ReagendarVisitaRequest request) {
        VisitaAgendamento visita = buscarEntidadePorToken(token);
        validarPodeAlterar(visita);

        if (visita.getDataHora().equals(request.dataHora())) {
            if (request.observacoes() != null) {
                visita.setObservacoes(request.observacoes().trim().isEmpty() ? null : request.observacoes().trim());
            }
            VisitaAgendamento salva = visitaRepository.save(visita);
            return visitaMapper.toResponse(salva);
        }

        disponibilidadeService.validarSlotDisponivel(request.dataHora(), visita.getId());

        if (visitaRepository.existsByDataHoraAndStatusNotIn(
                request.dataHora(),
                List.of(StatusAgendamento.CANCELADO, StatusAgendamento.AUSENTE, StatusAgendamento.REALIZADO)
        )) {
            throw new BusinessException("Este horário acabou de ser reservado. Escolha outro.");
        }

        visita.setDataHora(request.dataHora());
        visita.setStatus(StatusAgendamento.REAGENDADO);
        visita.setLembreteEnviadoEm(null);
        if (request.observacoes() != null) {
            visita.setObservacoes(request.observacoes().trim().isEmpty() ? null : request.observacoes().trim());
        }

        VisitaAgendamento salva = visitaRepository.save(visita);
        visitaNotificacaoService.disparar(TipoEventoVisita.VISITA_REAGENDADA, salva);
        return visitaMapper.toResponse(salva);
    }

    @Transactional
    public VisitaResponse cancelar(String token) {
        VisitaAgendamento visita = buscarEntidadePorToken(token);

        if (visita.getStatus() == StatusAgendamento.CANCELADO) {
            throw new BusinessException("Este agendamento já está cancelado.");
        }
        if (visita.getStatus() == StatusAgendamento.REALIZADO) {
            throw new BusinessException("Visitas já realizadas não podem ser canceladas.");
        }

        visita.setStatus(StatusAgendamento.CANCELADO);
        VisitaAgendamento salva = visitaRepository.save(visita);
        visitaNotificacaoService.disparar(TipoEventoVisita.VISITA_CANCELADA, salva);
        return visitaMapper.toResponse(salva);
    }

    private void validarPodeAlterar(VisitaAgendamento visita) {
        if (visita.getStatus() == StatusAgendamento.CANCELADO) {
            throw new BusinessException("Agendamentos cancelados não podem ser alterados.");
        }
        if (visita.getStatus() == StatusAgendamento.REALIZADO) {
            throw new BusinessException("Visitas já realizadas não podem ser alteradas.");
        }
        if (visita.getStatus() == StatusAgendamento.AUSENTE) {
            throw new BusinessException("Este agendamento não pode ser alterado.");
        }
        if (visita.getDataHora().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Não é possível reagendar visitas em data passada.");
        }
    }

    public VisitaAgendamento buscarEntidadePorToken(String token) {
        return visitaRepository.findByTokenAcesso(token)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado ou link inválido."));
    }

    private String normalizarTelefone(String telefone) {
        String digits = telefone.replaceAll("\\D", "");
        if (digits.length() < 10 || digits.length() > 13) {
            throw new BusinessException("Telefone inválido. Informe DDD e número.");
        }
        return digits;
    }
}
