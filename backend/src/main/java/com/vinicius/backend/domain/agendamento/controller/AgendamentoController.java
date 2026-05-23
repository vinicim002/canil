package com.vinicius.backend.domain.agendamento.controller;

import com.vinicius.backend.domain.agendamento.dto.AgendamentoRequest;
import com.vinicius.backend.domain.agendamento.dto.AgendamentoResponse;
import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.agendamento.service.AgendamentoService;
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
@RequestMapping("/api/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService agendamentoService;
    private final UsuarioService usuarioService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AgendamentoResponse> criar(
            @RequestBody @Valid AgendamentoRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(agendamentoService.criar(usuarioId, request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AgendamentoResponse>> listarTodos() {
        return ResponseEntity.ok(agendamentoService.listarTodos());
    }

    @GetMapping("/meus")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AgendamentoResponse>> listarMeus(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.ok(agendamentoService.listarPorUsuario(usuarioId));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AgendamentoResponse>> listarPorStatus(
            @PathVariable StatusAgendamento status
    ) {
        return ResponseEntity.ok(agendamentoService.listarPorStatus(status));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AgendamentoResponse> buscarPorId(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.ok(agendamentoService.buscarPorId(id, usuarioId, isAdmin(userDetails)));
    }

    @PatchMapping("/{id}/confirmar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AgendamentoResponse> confirmar(@PathVariable UUID id) {
        return ResponseEntity.ok(agendamentoService.confirmar(id));
    }

    @PatchMapping("/{id}/cancelar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AgendamentoResponse> cancelar(
            @PathVariable UUID id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        return ResponseEntity.ok(agendamentoService.cancelar(id, usuarioId, isAdmin(userDetails)));
    }

    @PatchMapping("/{id}/realizado")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AgendamentoResponse> marcarComoRealizado(@PathVariable UUID id) {
        return ResponseEntity.ok(agendamentoService.marcarComoRealizado(id));
    }

    private boolean isAdmin(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
    }
}