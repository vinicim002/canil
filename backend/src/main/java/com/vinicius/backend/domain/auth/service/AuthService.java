package com.vinicius.backend.domain.auth.service;

import com.vinicius.backend.domain.auth.dto.LoginRequest;
import com.vinicius.backend.domain.auth.dto.LoginResponse;
import com.vinicius.backend.domain.auth.dto.RefreshTokenRequest;
import com.vinicius.backend.domain.auth.model.RefreshToken;
import com.vinicius.backend.domain.auth.repository.RefreshTokenRepository;
import com.vinicius.backend.domain.usuario.dto.UsuarioRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioResponse;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import com.vinicius.backend.security.JwtService;
import com.vinicius.backend.shared.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    @Transactional
    public UsuarioResponse register(UsuarioRequest request) {
        return usuarioService.criar(request);
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );

        Usuario usuario = usuarioService.buscarEntidadePorEmail(request.email());

        refreshTokenRepository.revogarTodosPorUsuario(usuario.getId());

        String accessToken = jwtService.gerarToken(usuario);
        String refreshToken = gerarRefreshToken(usuario);

        return new LoginResponse(
                accessToken,
                refreshToken,
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole(),
                usuario.getStatus()
        );
    }

    @Transactional
    public LoginResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.refreshToken())
                .orElseThrow(() -> new BusinessException("Refresh token inválido."));

        if (refreshToken.getRevogado()) {
            throw new BusinessException("Refresh token revogado.");
        }

        if (refreshToken.getExpiracao().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Refresh token expirado.");
        }

        Usuario usuario = refreshToken.getUsuario();

        refreshTokenRepository.revogarTodosPorUsuario(usuario.getId());

        String novoAccessToken = jwtService.gerarToken(usuario);
        String novoRefreshToken = gerarRefreshToken(usuario);

        return new LoginResponse(
                novoAccessToken,
                novoRefreshToken,
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole(),
                usuario.getStatus()
        );
    }

    private String gerarRefreshToken(Usuario usuario) {
        RefreshToken refreshToken = RefreshToken.builder()
                .usuario(usuario)
                .token(UUID.randomUUID().toString())
                .expiracao(LocalDateTime.now().plusNanos(refreshExpiration * 1_000_000))
                .revogado(false)
                .build();

        return refreshTokenRepository.save(refreshToken).getToken();
    }
}