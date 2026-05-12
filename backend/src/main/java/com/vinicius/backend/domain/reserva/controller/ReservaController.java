package com.vinicius.backend.domain.reserva.controller;

import com.vinicius.backend.domain.reserva.dto.ReservaRequest;
import com.vinicius.backend.domain.reserva.dto.ReservaResponse;
import com.vinicius.backend.domain.reserva.enums.StatusReserva;
import com.vinicius.backend.domain.reserva.service.ReservaService;
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
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;
    private final UsuarioService usuarioService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservaResponse> criar(
            @RequestBody @Valid ReservaRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = resolverUsuarioId(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reservaService.criar(usuarioId, request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservaResponse>> listarTodas() {
        return ResponseEntity.ok(reservaService.listarTodas());
    }

    @GetMapping("/minhas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ReservaResponse>> listarMinhas(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = resolverUsuarioId(userDetails);
        return ResponseEntity.ok(reservaService.listarPorUsuario(usuarioId));
    }

    // --- MÉTODOS DE FLUXO ATUALIZADOS ---

    @PatchMapping("/{id}/analisar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservaResponse> colocarEmAnalise(@PathVariable UUID id) {
        return ResponseEntity.ok(reservaService.colocarEmAnalise(id));
    }

    @PatchMapping("/{id}/aprovar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservaResponse> aprovar(@PathVariable UUID id) {
        return ResponseEntity.ok(reservaService.aprovar(id));
    }

    @PatchMapping("/{id}/rejeitar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservaResponse> rejeitar(@PathVariable UUID id) {
        return ResponseEntity.ok(reservaService.rejeitar(id));
    }

    @PatchMapping("/{id}/pagar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservaResponse> pagar(@PathVariable UUID id) {
        return ResponseEntity.ok(reservaService.pagar(id));
    }

    @PatchMapping("/{id}/cancelar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservaResponse> cancelar(@PathVariable UUID id) {
        // Aqui o service já valida se o usuário pode cancelar
        return ResponseEntity.ok(reservaService.cancelar(id));
    }

    // --- BUSCA E AUXILIARES ---

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservaResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(reservaService.buscarPorId(id));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservaResponse>> listarPorStatus(
            @PathVariable StatusReserva status
    ) {
        return ResponseEntity.ok(reservaService.listarPorStatus(status));
    }

    private UUID resolverUsuarioId(UserDetails userDetails) {
        return usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
    }
}