package com.vinicius.backend.config;

import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.enums.StatusUsuario;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@Order(100)
@RequiredArgsConstructor
public class UsuarioStatusMigration implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        try {
            usuarioRepository.findAll().stream()
                    .filter(u -> u.getRole() == Role.CLIENTE)
                    .filter(u -> u.getStatus() == StatusUsuario.PENDENTE)
                    .filter(u -> Boolean.TRUE.equals(u.getAtivo()))
                    .forEach(this::migrarStatusLegado);
        } catch (Exception e) {
            log.warn("Migração de status ignorada (schema pode estar em atualização): {}", e.getMessage());
        }
    }

    /** Clientes antigos com ativo=true permanecem aprovados após introdução do campo status. */
    private void migrarStatusLegado(Usuario usuario) {
        usuario.setStatus(StatusUsuario.APROVADO);
        usuarioRepository.save(usuario);
    }
}
