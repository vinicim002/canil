package com.vinicius.backend.domain.pagamento.repository;

import com.vinicius.backend.domain.pagamento.model.Pagamento;
import com.vinicius.backend.domain.pagamento.enums.StatusPagamento;
import com.vinicius.backend.domain.pagamento.enums.TipoPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, UUID> {
    List<Pagamento> findByReservaId(UUID reservaId);
    List<Pagamento> findByStatus(StatusPagamento status);
    boolean existsByReservaIdAndTipo(UUID reservaId, TipoPagamento tipo);
}