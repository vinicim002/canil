package com.vinicius.backend.domain.visita.dto;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;

import java.time.LocalDateTime;
import java.util.UUID;

public record VisitaResponse(
        UUID id,
        String nome,
        String telefone,
        String email,
        LocalDateTime dataHora,
        StatusAgendamento status,
        String observacoes,
        String linkGerenciamento,
        LocalDateTime criadoEm
) {}
