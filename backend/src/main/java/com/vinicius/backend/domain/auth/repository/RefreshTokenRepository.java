package com.vinicius.backend.domain.auth.repository;

import com.vinicius.backend.domain.auth.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("UPDATE RefreshToken r SET r.revogado = true WHERE r.usuario.id = :usuarioId")
    void revogarTodosPorUsuario(UUID usuarioId);
}