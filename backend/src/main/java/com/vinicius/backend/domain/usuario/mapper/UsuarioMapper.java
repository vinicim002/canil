package com.vinicius.backend.domain.usuario.mapper;

import com.vinicius.backend.domain.usuario.dto.UsuarioRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioResponse;
import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

    public Usuario toEntity(UsuarioRequest request, String senhaCriptografada) {
        return Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .senha(senhaCriptografada)
                .telefone(request.telefone())
                .role(Role.CLIENTE)
                .ativo(true)
                .build();
    }

    public UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.getRole(),
                usuario.getAtivo(),
                usuario.getCriadoEm()
        );
    }
}