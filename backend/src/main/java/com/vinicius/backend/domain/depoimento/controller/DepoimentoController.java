package com.vinicius.backend.domain.depoimento.controller;

import com.vinicius.backend.domain.depoimento.dto.DepoimentoRequest;
import com.vinicius.backend.domain.depoimento.dto.DepoimentoResponse;
import com.vinicius.backend.domain.depoimento.service.DepoimentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/depoimentos")
@RequiredArgsConstructor
public class DepoimentoController {

    private final DepoimentoService depoimentoService;

    @PostMapping
    public ResponseEntity<DepoimentoResponse> criar(@RequestBody @Valid DepoimentoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(depoimentoService.criar(request));
    }

    @GetMapping
    public ResponseEntity<List<DepoimentoResponse>> listarAprovados() {
        return ResponseEntity.ok(depoimentoService.listarAprovados());
    }

    @GetMapping("/pendentes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DepoimentoResponse>> listarPendentes() {
        return ResponseEntity.ok(depoimentoService.listarPendentes());
    }

    @GetMapping("/destaques")
    public ResponseEntity<List<DepoimentoResponse>> listarDestaques() {
        return ResponseEntity.ok(depoimentoService.listarDestaques());
    }

    @PatchMapping("/{id}/aprovar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepoimentoResponse> aprovar(@PathVariable UUID id) {
        return ResponseEntity.ok(depoimentoService.aprovar(id));
    }

    @PatchMapping("/{id}/destacar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DepoimentoResponse> destacar(@PathVariable UUID id) {
        return ResponseEntity.ok(depoimentoService.destacar(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        depoimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}