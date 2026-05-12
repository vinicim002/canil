package com.vinicius.backend.domain.vacinacao.controller;

import com.vinicius.backend.domain.vacinacao.dto.VacinacaoRequest;
import com.vinicius.backend.domain.vacinacao.dto.VacinacaoResponse;
import com.vinicius.backend.domain.vacinacao.service.VacinacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/vacinacoes")
@RequiredArgsConstructor
public class VacinacaoController {

    private final VacinacaoService vacinacaoService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VacinacaoResponse> registrar(@RequestBody @Valid VacinacaoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vacinacaoService.registrar(request));
    }

    @GetMapping("/caes/{caoId}")
    public ResponseEntity<List<VacinacaoResponse>> listarPorCao(@PathVariable UUID caoId) {
        return ResponseEntity.ok(vacinacaoService.listarPorCao(caoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VacinacaoResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(vacinacaoService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        vacinacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}