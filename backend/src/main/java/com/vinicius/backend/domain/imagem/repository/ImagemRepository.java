package com.vinicius.backend.domain.imagem.repository;

import com.vinicius.backend.domain.imagem.model.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImagemRepository extends JpaRepository<Imagem, UUID> {
    List<Imagem> findByCaoIdOrderByOrdemAsc(UUID caoId);
    Optional<Imagem> findByCaoIdAndCapaTrue(UUID caoId);

    @Modifying
    @Query("UPDATE Imagem i SET i.capa = false WHERE i.cao.id = :caoId")
    void removerCapaPorCaoId(UUID caoId);
}