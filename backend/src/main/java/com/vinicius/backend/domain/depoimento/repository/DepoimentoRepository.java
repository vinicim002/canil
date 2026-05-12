package com.vinicius.backend.domain.depoimento.repository;

import com.vinicius.backend.domain.depoimento.model.Depoimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DepoimentoRepository extends JpaRepository<Depoimento, UUID> {
    List<Depoimento> findByAprovadoTrue();
    List<Depoimento> findByDestaqueTrue();
    List<Depoimento> findByAprovadoFalse();
}