package com.vinicius.backend.domain.cliente.controller;

import com.vinicius.backend.domain.cliente.dto.ClienteRequest;
import com.vinicius.backend.domain.cliente.dto.ClienteResponse;
import com.vinicius.backend.domain.cliente.service.ClienteService;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;
    private final UsuarioService usuarioService;

    @PostMapping("/perfil")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ClienteResponse> criarPerfil(
            @RequestBody @Valid ClienteRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clienteService.criarPerfil(usuarioId, request));
    }

    @GetMapping("/perfil")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ClienteResponse> buscarMeuPerfil(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.ok(clienteService.buscarMeuPerfil(usuarioId));
    }

    @PutMapping("/perfil")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ClienteResponse> atualizar(
            @RequestBody @Valid ClienteRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.ok(clienteService.atualizar(usuarioId, request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClienteResponse>> listarTodos() {
        return ResponseEntity.ok(clienteService.listarTodos());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(clienteService.buscarPorId(id));
    }
}