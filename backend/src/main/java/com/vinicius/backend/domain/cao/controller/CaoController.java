package com.vinicius.backend.domain.cao.controller;

import com.vinicius.backend.domain.cao.dto.CaoFiltroRequest;
import com.vinicius.backend.domain.cao.dto.CaoRequest;
import com.vinicius.backend.domain.cao.dto.CaoResponse;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.service.CaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/caes")
@RequiredArgsConstructor
public class CaoController {

    private final CaoService caoService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CaoResponse> criar(@RequestBody @Valid CaoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(caoService.criar(request));
    }

    @GetMapping
    public ResponseEntity<List<CaoResponse>> listarTodos() {
        return ResponseEntity.ok(caoService.listarTodos());
    }

    @GetMapping("/filtros")
    public ResponseEntity<List<CaoResponse>> listarComFiltros(
            @RequestParam(required = false) StatusCao status,
            @RequestParam(required = false) String tipoPelo,
            @RequestParam(required = false) String tamanho,
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) Boolean destaque
    ) {
        CaoFiltroRequest filtro = new CaoFiltroRequest(
                status,
                tipoPelo != null ? com.vinicius.backend.domain.cao.enums.TipoPelo.valueOf(tipoPelo) : null,
                tamanho != null ? com.vinicius.backend.domain.cao.enums.Tamanho.valueOf(tamanho) : null,
                genero != null ? com.vinicius.backend.domain.cao.enums.Genero.valueOf(genero) : null,
                destaque
        );
        return ResponseEntity.ok(caoService.listarComFiltros(filtro));
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<CaoResponse>> listarDisponiveis() {
        return ResponseEntity.ok(caoService.listarDisponiveis());
    }

    @GetMapping("/destaques")
    public ResponseEntity<List<CaoResponse>> listarDestaques() {
        return ResponseEntity.ok(caoService.listarDestaques());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaoResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(caoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CaoResponse> atualizar(
            @PathVariable UUID id,
            @RequestBody @Valid CaoRequest request
    ) {
        return ResponseEntity.ok(caoService.atualizar(id, request));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CaoResponse> atualizarStatus(
            @PathVariable UUID id,
            @RequestParam StatusCao status
    ) {
        return ResponseEntity.ok(caoService.atualizarStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        caoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}