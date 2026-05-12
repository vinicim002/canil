package com.vinicius.backend.domain.cliente.mapper;

import com.vinicius.backend.domain.cliente.dto.ClienteResponse;
import com.vinicius.backend.domain.cliente.model.PerfilCliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public ClienteResponse toResponse(PerfilCliente perfil) {
        return new ClienteResponse(
                perfil.getId(),
                perfil.getUsuario().getId(),
                perfil.getUsuario().getNome(),
                perfil.getUsuario().getEmail(),
                perfil.getUsuario().getTelefone(),
                perfil.getCpf(),
                perfil.getEndereco(),
                perfil.getCidade(),
                perfil.getEstado(),
                perfil.getCep(),
                perfil.getFotoPerfil()
        );
    }
}