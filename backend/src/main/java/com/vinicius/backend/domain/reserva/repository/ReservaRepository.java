package com.vinicius.backend.domain.reserva.repository;

import com.vinicius.backend.domain.reserva.model.Reserva;
import com.vinicius.backend.domain.reserva.enums.StatusReserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, UUID> {
    List<Reserva> findByUsuarioId(UUID usuarioId);
    List<Reserva> findByStatus(StatusReserva status);
    List<Reserva> findByCaoId(UUID caoId);

    boolean existsByCaoIdAndStatusNotIn(UUID caoId, List<StatusReserva> status);
}