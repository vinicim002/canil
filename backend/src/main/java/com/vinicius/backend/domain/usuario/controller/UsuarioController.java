package com.vinicius.backend.domain.usuario.controller;

import com.vinicius.backend.domain.usuario.dto.AtualizarStatusRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioResponse;
import com.vinicius.backend.domain.usuario.dto.UsuarioUpdateRequest;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioResponse> criar(@RequestBody @Valid UsuarioRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.criar(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/clientes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> listarClientes() {
        return ResponseEntity.ok(usuarioService.listarClientes());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> atualizar(
            @PathVariable UUID id,
            @RequestBody @Valid UsuarioUpdateRequest request
    ) {
        return ResponseEntity.ok(usuarioService.atualizar(id, request));
    }

    @PatchMapping("/{id}/aprovar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> aprovar(@PathVariable UUID id) {
        return ResponseEntity.ok(usuarioService.aprovar(id));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> atualizarStatus(
            @PathVariable UUID id,
            @RequestBody @Valid AtualizarStatusRequest request
    ) {
        return ResponseEntity.ok(usuarioService.atualizarStatus(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> desativar(@PathVariable UUID id) {
        usuarioService.desativar(id);
        return ResponseEntity.noContent().build();
    }
}