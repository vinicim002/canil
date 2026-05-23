package com.vinicius.backend.domain.pagamento.controller;

import com.vinicius.backend.domain.pagamento.dto.PagamentoRequest;
import com.vinicius.backend.domain.pagamento.dto.PagamentoResponse;
import com.vinicius.backend.domain.pagamento.enums.StatusPagamento;
import com.vinicius.backend.domain.pagamento.service.PagamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.vinicius.backend.domain.usuario.service.UsuarioService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pagamentos")
@RequiredArgsConstructor
public class PagamentoController {

    private final PagamentoService pagamentoService;
    private final UsuarioService usuarioService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagamentoResponse> criar(
            @RequestBody @Valid PagamentoRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pagamentoService.criar(request));
    }

    @GetMapping("/reserva/{reservaId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<PagamentoResponse>> listarPorReserva(
            @PathVariable UUID reservaId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UUID usuarioId = usuarioService.buscarEntidadePorEmail(userDetails.getUsername()).getId();
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        return ResponseEntity.ok(pagamentoService.listarPorReserva(reservaId, usuarioId, isAdmin));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PagamentoResponse>> listarPorStatus(
            @PathVariable StatusPagamento status
    ) {
        return ResponseEntity.ok(pagamentoService.listarPorStatus(status));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PagamentoResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(pagamentoService.buscarPorId(id));
    }

    @PatchMapping("/{id}/aprovar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagamentoResponse> aprovar(@PathVariable UUID id) {
        return ResponseEntity.ok(pagamentoService.aprovar(id));
    }

    @PatchMapping("/{id}/recusar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagamentoResponse> recusar(@PathVariable UUID id) {
        return ResponseEntity.ok(pagamentoService.recusar(id));
    }

    @PatchMapping("/{id}/estornar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagamentoResponse> estornar(@PathVariable UUID id) {
        return ResponseEntity.ok(pagamentoService.estornar(id));
    }
}