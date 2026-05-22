package com.vinicius.backend.domain.visita.service;

import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class VisitaTokenService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final int TENTATIVAS_MAX = 5;

    private final VisitaAgendamentoRepository visitaRepository;

    public String gerarTokenUnico() {
        for (int i = 0; i < TENTATIVAS_MAX; i++) {
            String token = gerarToken();
            if (visitaRepository.findByTokenAcesso(token).isEmpty()) {
                return token;
            }
        }
        throw new IllegalStateException("Não foi possível gerar token de acesso.");
    }

    private String gerarToken() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
