package com.vinicius.backend.domain.visita.controller;

import com.vinicius.backend.domain.visita.dto.CriarVisitaRequest;
import com.vinicius.backend.domain.visita.dto.ReagendarVisitaRequest;
import com.vinicius.backend.domain.visita.dto.SlotsDiaResponse;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.domain.visita.service.VisitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/public/visitas")
@RequiredArgsConstructor
public class VisitaPublicController {

    private final VisitaService visitaService;

    @GetMapping("/slots")
    public ResponseEntity<SlotsDiaResponse> listarSlots(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
            @RequestParam(required = false) String token
    ) {
        return ResponseEntity.ok(visitaService.listarSlots(data, token));
    }

    @PostMapping
    public ResponseEntity<VisitaResponse> criar(@RequestBody @Valid CriarVisitaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(visitaService.criar(request));
    }

    @GetMapping("/{token}")
    public ResponseEntity<VisitaResponse> buscarPorToken(@PathVariable String token) {
        return ResponseEntity.ok(visitaService.buscarPorToken(token));
    }

    @PatchMapping("/{token}/reagendar")
    public ResponseEntity<VisitaResponse> reagendar(
            @PathVariable String token,
            @RequestBody @Valid ReagendarVisitaRequest request
    ) {
        return ResponseEntity.ok(visitaService.reagendar(token, request));
    }

    @PatchMapping("/{token}/cancelar")
    public ResponseEntity<VisitaResponse> cancelar(@PathVariable String token) {
        return ResponseEntity.ok(visitaService.cancelar(token));
    }
}
