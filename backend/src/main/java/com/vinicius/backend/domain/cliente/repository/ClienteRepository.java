package com.vinicius.backend.domain.cliente.repository;

import com.vinicius.backend.domain.cliente.model.PerfilCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<PerfilCliente, UUID> {
    Optional<PerfilCliente> findByUsuarioId(UUID usuarioId);
    boolean existsByUsuarioId(UUID usuarioId);
    boolean existsByCpf(String cpf);
}