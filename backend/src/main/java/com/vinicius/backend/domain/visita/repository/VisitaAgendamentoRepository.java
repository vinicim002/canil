package com.vinicius.backend.domain.visita.repository;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VisitaAgendamentoRepository extends JpaRepository<VisitaAgendamento, UUID> {

    Optional<VisitaAgendamento> findByTokenAcesso(String tokenAcesso);

    @Query("""
            SELECT v FROM VisitaAgendamento v
            WHERE v.dataHora >= :inicio AND v.dataHora < :fim
            AND v.status NOT IN :statusesExcluidos
            """)
    List<VisitaAgendamento> findOcupadosNoPeriodo(
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim,
            @Param("statusesExcluidos") List<StatusAgendamento> statusesExcluidos
    );

    boolean existsByDataHoraAndStatusNotIn(
            LocalDateTime dataHora,
            List<StatusAgendamento> statusesExcluidos
    );

    List<VisitaAgendamento> findAllByOrderByDataHoraDesc();

    List<VisitaAgendamento> findByStatusOrderByDataHoraDesc(StatusAgendamento status);

    @Query("""
            SELECT v FROM VisitaAgendamento v
            WHERE v.dataHora > :janelaInicio
            AND v.dataHora <= :janelaFim
            AND v.status IN :statuses
            AND v.lembreteEnviadoEm IS NULL
            ORDER BY v.dataHora ASC
            """)
    List<VisitaAgendamento> findVisitasParaLembrete(
            @Param("janelaInicio") LocalDateTime janelaInicio,
            @Param("janelaFim") LocalDateTime janelaFim,
            @Param("statuses") List<StatusAgendamento> statuses
    );

    @Query("""
            SELECT v FROM VisitaAgendamento v
            WHERE v.dataHora > :agora
            AND v.status IN :statuses
            ORDER BY v.dataHora ASC
            """)
    List<VisitaAgendamento> findAgendamentosFuturosAtivos(
            @Param("agora") LocalDateTime agora,
            @Param("statuses") List<StatusAgendamento> statuses
    );
}
