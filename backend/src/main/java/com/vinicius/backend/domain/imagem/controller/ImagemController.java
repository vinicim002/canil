package com.vinicius.backend.domain.imagem.controller;

import com.vinicius.backend.domain.imagem.dto.ImagemResponse;
import com.vinicius.backend.domain.imagem.service.ImagemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/imagens")
@RequiredArgsConstructor
public class ImagemController {

    private final ImagemService imagemService;

    @PostMapping(value = "/caes/{caoId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ImagemResponse> upload(
            @PathVariable UUID caoId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "capa", defaultValue = "false") Boolean capa
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(imagemService.upload(caoId, file, capa));
    }

    @GetMapping("/caes/{caoId}")
    public ResponseEntity<List<ImagemResponse>> listarPorCao(@PathVariable UUID caoId) {
        return ResponseEntity.ok(imagemService.listarPorCao(caoId));
    }

    @PatchMapping("/caes/{caoId}/capa/{imagemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ImagemResponse> definirCapa(
            @PathVariable UUID caoId,
            @PathVariable UUID imagemId
    ) {
        return ResponseEntity.ok(imagemService.definirCapa(caoId, imagemId));
    }

    @DeleteMapping("/{imagemId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable UUID imagemId) {
        imagemService.deletar(imagemId);
        return ResponseEntity.noContent().build();
    }
}