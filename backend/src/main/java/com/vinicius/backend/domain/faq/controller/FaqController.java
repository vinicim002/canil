package com.vinicius.backend.domain.faq.controller;

import com.vinicius.backend.domain.faq.dto.FaqRequest;
import com.vinicius.backend.domain.faq.dto.FaqResponse;
import com.vinicius.backend.domain.faq.service.FaqService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FaqResponse> criar(@RequestBody @Valid FaqRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(faqService.criar(request));
    }

    @GetMapping
    public ResponseEntity<List<FaqResponse>> listarAtivos() {
        return ResponseEntity.ok(faqService.listarAtivos());
    }

    @GetMapping("/todos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FaqResponse>> listarTodos() {
        return ResponseEntity.ok(faqService.listarTodos());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FaqResponse> atualizar(
            @PathVariable UUID id,
            @RequestBody @Valid FaqRequest request
    ) {
        return ResponseEntity.ok(faqService.atualizar(id, request));
    }

    @PatchMapping("/{id}/desativar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> desativar(@PathVariable UUID id) {
        faqService.desativar(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        faqService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}