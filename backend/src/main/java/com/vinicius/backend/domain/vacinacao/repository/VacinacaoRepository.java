package com.vinicius.backend.domain.vacinacao.repository;

import com.vinicius.backend.domain.vacinacao.model.HistoricoVacinacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VacinacaoRepository extends JpaRepository<HistoricoVacinacao, UUID> {
    List<HistoricoVacinacao> findByCaoIdOrderByDataAplicacaoDesc(UUID caoId);
}