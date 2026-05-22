package com.vinicius.backend.domain.visita.repository;

import com.vinicius.backend.domain.visita.model.BloqueioHorario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BloqueioHorarioRepository extends JpaRepository<BloqueioHorario, UUID> {

    List<BloqueioHorario> findByDataGreaterThanEqualOrderByDataAscHoraAsc(LocalDate data);

    List<BloqueioHorario> findByData(LocalDate data);

    boolean existsByDataAndHoraIsNull(LocalDate data);

    boolean existsByDataAndHora(LocalDate data, LocalTime hora);
}
