package com.vinicius.backend.domain.auth.service;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.domain.auth.model.PasswordResetToken;
import com.vinicius.backend.domain.auth.repository.PasswordResetTokenRepository;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.repository.UsuarioRepository;
import com.vinicius.backend.infrastructure.email.EmailService;
import com.vinicius.backend.shared.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final int EXPIRACAO_HORAS = 1;

    private final UsuarioRepository usuarioRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final MailProperties mailProperties;

    /**
     * Não revela se o e-mail existe (segurança).
     */
    @Transactional
    public void solicitarRecuperacao(String email) {
        usuarioRepository.findByEmail(email.trim().toLowerCase()).ifPresent(usuario -> {
            tokenRepository.revogarAtivosPorUsuario(usuario.getId());

            String token = gerarToken();
            PasswordResetToken reset = PasswordResetToken.builder()
                    .usuario(usuario)
                    .token(token)
                    .expiracao(LocalDateTime.now().plusHours(EXPIRACAO_HORAS))
                    .usado(false)
                    .build();
            tokenRepository.save(reset);

            String link = mailProperties.getSiteUrl().replaceAll("/$", "")
                    + "/redefinir-senha?token=" + token;
            emailService.enviarRecuperacaoSenha(usuario.getNome(), usuario.getEmail(), link);
            log.info("[PasswordReset] Solicitação registrada para usuário {}", usuario.getId());
        });
    }

    @Transactional
    public void redefinirSenha(String token, String novaSenha) {
        PasswordResetToken reset = tokenRepository.findByTokenAndUsadoFalse(token)
                .orElseThrow(() -> new BusinessException("Link inválido ou expirado. Solicite uma nova recuperação."));

        if (reset.getExpiracao().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Link expirado. Solicite uma nova recuperação.");
        }

        Usuario usuario = reset.getUsuario();
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);

        reset.setUsado(true);
        tokenRepository.save(reset);
        tokenRepository.revogarAtivosPorUsuario(usuario.getId());
    }

    private String gerarToken() {
        byte[] bytes = new byte[32];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
