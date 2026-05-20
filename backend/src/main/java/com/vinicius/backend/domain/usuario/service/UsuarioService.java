package com.vinicius.backend.domain.usuario.service;

import com.vinicius.backend.domain.usuario.dto.AtualizarStatusRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioResponse;
import com.vinicius.backend.domain.usuario.dto.UsuarioUpdateRequest;
import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.enums.StatusUsuario;
import com.vinicius.backend.domain.usuario.mapper.UsuarioMapper;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.repository.UsuarioRepository;
import com.vinicius.backend.infrastructure.email.EmailService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Transactional
    public UsuarioResponse criar(UsuarioRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new BusinessException("Email já cadastrado.");
        }

        String senhaCriptografada = passwordEncoder.encode(request.senha());
        Usuario usuario = usuarioMapper.toEntity(request, senhaCriptografada);
        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarClientes() {
        return usuarioRepository.findByRoleOrderByCriadoEmDesc(Role.CLIENTE)
                .stream()
                .map(usuarioMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse buscarPorId(UUID id) {
        return usuarioMapper.toResponse(buscarEntidadePorId(id));
    }

    @Transactional(readOnly = true)
    public UsuarioResponse buscarPorEmail(String email) {
        return usuarioMapper.toResponse(buscarEntidadePorEmail(email));
    }

    @Transactional
    public UsuarioResponse atualizar(UUID id, UsuarioUpdateRequest request) {
        Usuario usuario = buscarEntidadePorId(id);
        usuario.setNome(request.nome());
        usuario.setTelefone(request.telefone());
        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Transactional
    public void desativar(UUID id) {
        Usuario usuario = buscarEntidadePorId(id);
        usuario.setAtivo(false);
        usuario.setStatus(StatusUsuario.REJEITADO);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public UsuarioResponse aprovar(UUID id) {
        Usuario usuario = buscarEntidadePorId(id);
        validarCliente(usuario);
        usuario.setStatus(StatusUsuario.APROVADO);
        usuario.setAtivo(true);
        Usuario salvo = usuarioRepository.save(usuario);
        emailService.enviarAprovacaoCliente(salvo.getNome(), salvo.getEmail());
        return usuarioMapper.toResponse(salvo);
    }

    @Transactional
    public UsuarioResponse atualizarStatus(UUID id, AtualizarStatusRequest request) {
        Usuario usuario = buscarEntidadePorId(id);
        validarCliente(usuario);
        usuario.setStatus(request.status());
        usuario.setAtivo(request.status() == StatusUsuario.APROVADO);
        Usuario salvo = usuarioRepository.save(usuario);
        if (request.status() == StatusUsuario.APROVADO) {
            emailService.enviarAprovacaoCliente(salvo.getNome(), salvo.getEmail());
        }
        return usuarioMapper.toResponse(salvo);
    }

    public void verificarClienteAprovado(Usuario usuario) {
        if (usuario.getRole() != Role.CLIENTE) {
            return;
        }
        if (usuario.getStatus() != StatusUsuario.APROVADO) {
            throw new BusinessException("Sua conta ainda não foi aprovada. Aguarde a liberação do administrador.");
        }
    }

    private void validarCliente(Usuario usuario) {
        if (usuario.getRole() != Role.CLIENTE) {
            throw new BusinessException("Esta operação é válida apenas para clientes.");
        }
    }

    public Usuario buscarEntidadePorId(UUID id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));
    }

    public Usuario buscarEntidadePorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));
    }
}