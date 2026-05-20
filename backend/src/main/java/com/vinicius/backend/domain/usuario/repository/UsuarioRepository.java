package com.vinicius.backend.domain.usuario.repository;

import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
     Optional<Usuario> findByEmail(String email);
     boolean existsByEmail(String email);
     List<Usuario> findByRoleOrderByCriadoEmDesc(Role role);
}
