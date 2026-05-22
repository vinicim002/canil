package com.vinicius.backend.domain.cao.repository;

import com.vinicius.backend.domain.cao.enums.*;
import com.vinicius.backend.domain.cao.model.Cao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CaoRepository extends JpaRepository<Cao, UUID>, JpaSpecificationExecutor<Cao> {
    List<Cao> findByStatus(StatusCao status);
    List<Cao> findByTipoPelo(TipoPelo tipoPelo);
    List<Cao> findByTamanho(Tamanho tamanho);
    List<Cao> findByGenero(Genero genero);
    List<Cao> findByDestaqueTrue();
    List<Cao> findByStatusAndTipoPeloAndTamanho(StatusCao status, TipoPelo tipoPelo, Tamanho tamanho);
    List<Cao> findByTipo(TipoCao tipo);

    long countByTipoAndStatus(TipoCao tipo, StatusCao status);
}