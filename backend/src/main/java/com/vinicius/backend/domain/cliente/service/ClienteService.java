package com.vinicius.backend.domain.cliente.service;

import com.vinicius.backend.domain.cliente.dto.ClienteRequest;
import com.vinicius.backend.domain.cliente.dto.ClienteResponse;
import com.vinicius.backend.domain.cliente.mapper.ClienteMapper;
import com.vinicius.backend.domain.cliente.model.PerfilCliente;
import com.vinicius.backend.domain.cliente.repository.ClienteRepository;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;
    private final UsuarioService usuarioService;

    @Transactional
    public ClienteResponse criarPerfil(UUID usuarioId, ClienteRequest request) {
        if (clienteRepository.existsByUsuarioId(usuarioId)) {
            throw new BusinessException("Este usuário já possui um perfil de cliente.");
        }

        if (request.cpf() != null && clienteRepository.existsByCpf(request.cpf())) {
            throw new BusinessException("CPF já cadastrado.");
        }

        Usuario usuario = usuarioService.buscarEntidadePorId(usuarioId);

        PerfilCliente perfil = PerfilCliente.builder()
                .usuario(usuario)
                .cpf(request.cpf())
                .endereco(request.endereco())
                .cidade(request.cidade())
                .estado(request.estado())
                .cep(request.cep())
                .fotoPerfil(request.fotoPerfil())
                .build();

        return clienteMapper.toResponse(clienteRepository.save(perfil));
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscarMeuPerfil(UUID usuarioId) {
        return clienteMapper.toResponse(buscarEntidadePorUsuarioId(usuarioId));
    }

    @Transactional(readOnly = true)
    public ClienteResponse buscarPorId(UUID id) {
        return clienteMapper.toResponse(
                clienteRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Perfil não encontrado."))
        );
    }

    @Transactional(readOnly = true)
    public List<ClienteResponse> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(clienteMapper::toResponse)
                .toList();
    }

    @Transactional
    public ClienteResponse atualizar(UUID usuarioId, ClienteRequest request) {
        PerfilCliente perfil = buscarEntidadePorUsuarioId(usuarioId);

        if (request.cpf() != null &&
                !request.cpf().equals(perfil.getCpf()) &&
                clienteRepository.existsByCpf(request.cpf())) {
            throw new BusinessException("CPF já cadastrado.");
        }

        perfil.setCpf(request.cpf());
        perfil.setEndereco(request.endereco());
        perfil.setCidade(request.cidade());
        perfil.setEstado(request.estado());
        perfil.setCep(request.cep());
        perfil.setFotoPerfil(request.fotoPerfil());

        return clienteMapper.toResponse(clienteRepository.save(perfil));
    }

    private PerfilCliente buscarEntidadePorUsuarioId(UUID usuarioId) {
        return clienteRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Perfil de cliente não encontrado."));
    }
}