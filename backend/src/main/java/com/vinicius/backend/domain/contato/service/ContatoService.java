package com.vinicius.backend.domain.contato.service;

import com.vinicius.backend.domain.contato.dto.ContatoRequest;
import com.vinicius.backend.infrastructure.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContatoService {

    private final EmailService emailService;

    public void enviarMensagem(ContatoRequest request) {
        emailService.enviarContato(request);
    }
}
