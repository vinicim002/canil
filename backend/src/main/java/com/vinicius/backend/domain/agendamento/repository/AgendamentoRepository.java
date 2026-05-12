package com.vinicius.backend.domain.agendamento.repository;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.agendamento.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {
    List<Agendamento> findByUsuarioId(UUID usuarioId);
    List<Agendamento> findByStatus(StatusAgendamento status);
    List<Agendamento> findByCaoId(UUID caoId);
    boolean existsByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
}