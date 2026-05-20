package com.vinicius.backend.domain.contato.controller;

import com.vinicius.backend.domain.contato.dto.ContatoRequest;
import com.vinicius.backend.domain.contato.service.ContatoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/contato")
@RequiredArgsConstructor
public class ContatoController {

    private final ContatoService contatoService;

    @PostMapping
    public ResponseEntity<Map<String, String>> enviar(@RequestBody @Valid ContatoRequest request) {
        contatoService.enviarMensagem(request);
        return ResponseEntity.ok(Map.of("mensagem", "Mensagem enviada com sucesso!"));
    }
}
