package com.vinicius.backend.domain.cao.controller;

import com.vinicius.backend.domain.cao.dto.CaoFiltroRequest;
import com.vinicius.backend.domain.cao.dto.CaoRequest;
import com.vinicius.backend.domain.cao.dto.CaoResponse;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.enums.TipoCao; // Importado
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

    // LISTAR: Agora suporta listar todos ou filtrar por TIPO (Filhote/Matriz/Reprodutor)
    @GetMapping
    public ResponseEntity<List<CaoResponse>> listar(@RequestParam(required = false) TipoCao tipo) {
        if (tipo != null) {
            return ResponseEntity.ok(caoService.listarPorTipo(tipo));
        }
        return ResponseEntity.ok(caoService.listarTodos());
    }

    // FILTROS AVANÇADOS: O Spring mapeia automaticamente os parâmetros da URL para o Record
    @GetMapping("/filtros")
    public ResponseEntity<List<CaoResponse>> listarComFiltros(CaoFiltroRequest filtro) {
        return ResponseEntity.ok(caoService.listarComFiltros(filtro));
    }

    @GetMapping("/reprodutores")
    public ResponseEntity<List<CaoResponse>> listarReprodutores() {
        return ResponseEntity.ok(caoService.listarPorTipo(TipoCao.REPRODUTOR));
    }

    @GetMapping("/matrizes")
    public ResponseEntity<List<CaoResponse>> listarMatrizes() {
        return ResponseEntity.ok(caoService.listarPorTipo(TipoCao.MATRIZ));
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
    public ResponseEntity<CaoResponse> atualizar(@PathVariable UUID id, @RequestBody @Valid CaoRequest request) {
        return ResponseEntity.ok(caoService.atualizar(id, request));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CaoResponse> atualizarStatus(@PathVariable UUID id, @RequestParam StatusCao status) {
        return ResponseEntity.ok(caoService.atualizarStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        caoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}