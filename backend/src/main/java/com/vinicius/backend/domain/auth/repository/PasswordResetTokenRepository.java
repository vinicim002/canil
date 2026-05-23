package com.vinicius.backend.domain.auth.repository;

import com.vinicius.backend.domain.auth.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

    Optional<PasswordResetToken> findByTokenAndUsadoFalse(String token);

    @Modifying
    @Transactional
    @Query("UPDATE PasswordResetToken p SET p.usado = true WHERE p.usuario.id = :usuarioId AND p.usado = false")
    void revogarAtivosPorUsuario(UUID usuarioId);
}
