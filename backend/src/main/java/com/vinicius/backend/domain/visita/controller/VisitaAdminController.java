package com.vinicius.backend.domain.visita.controller;

import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.service.VisitaAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/visitas")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class VisitaAdminController {

    private final VisitaAdminService visitaAdminService;

    @GetMapping
    public ResponseEntity<List<VisitaResponse>> listar(
            @RequestParam(required = false) StatusAgendamento status
    ) {
        return ResponseEntity.ok(visitaAdminService.listar(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitaResponse> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(visitaAdminService.buscarPorId(id));
    }

    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<VisitaResponse> confirmar(@PathVariable UUID id) {
        return ResponseEntity.ok(visitaAdminService.confirmar(id));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<VisitaResponse> cancelar(@PathVariable UUID id) {
        return ResponseEntity.ok(visitaAdminService.cancelar(id));
    }

    @PatchMapping("/{id}/realizado")
    public ResponseEntity<VisitaResponse> marcarRealizado(@PathVariable UUID id) {
        return ResponseEntity.ok(visitaAdminService.marcarRealizado(id));
    }

    @PatchMapping("/{id}/ausente")
    public ResponseEntity<VisitaResponse> marcarAusente(@PathVariable UUID id) {
        return ResponseEntity.ok(visitaAdminService.marcarAusente(id));
    }
}
