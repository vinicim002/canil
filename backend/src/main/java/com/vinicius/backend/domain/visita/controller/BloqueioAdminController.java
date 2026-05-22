package com.vinicius.backend.domain.visita.controller;

import com.vinicius.backend.domain.visita.dto.BloqueioHorarioResponse;
import com.vinicius.backend.domain.visita.dto.CriarBloqueioRequest;
import com.vinicius.backend.domain.visita.service.BloqueioHorarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/bloqueios")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class BloqueioAdminController {

    private final BloqueioHorarioService bloqueioHorarioService;

    @GetMapping
    public ResponseEntity<List<BloqueioHorarioResponse>> listar() {
        return ResponseEntity.ok(bloqueioHorarioService.listarProximos());
    }

    @PostMapping
    public ResponseEntity<BloqueioHorarioResponse> criar(
            @RequestBody @Valid CriarBloqueioRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bloqueioHorarioService.criar(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable UUID id) {
        bloqueioHorarioService.remover(id);
        return ResponseEntity.noContent().build();
    }
}
