package com.vinicius.backend.domain.agendamento.dto;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;

import java.time.LocalDateTime;
import java.util.UUID;

public record AgendamentoResponse(
        UUID id,
        UUID usuarioId,
        String nomeUsuario,
        UUID caoId,
        String nomeCao,
        LocalDateTime dataHora,
        StatusAgendamento status,
        String observacoes,
        LocalDateTime criadoEm
) {}