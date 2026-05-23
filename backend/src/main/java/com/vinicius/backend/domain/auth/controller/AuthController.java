package com.vinicius.backend.domain.auth.controller;

import com.vinicius.backend.domain.auth.dto.ForgotPasswordRequest;
import com.vinicius.backend.domain.auth.dto.LoginRequest;
import com.vinicius.backend.domain.auth.dto.LoginResponse;
import com.vinicius.backend.domain.auth.dto.RefreshTokenRequest;
import com.vinicius.backend.domain.auth.dto.ResetPasswordRequest;
import com.vinicius.backend.domain.auth.service.AuthService;
import com.vinicius.backend.domain.auth.service.PasswordResetService;
import com.vinicius.backend.domain.usuario.dto.UsuarioRequest;
import com.vinicius.backend.domain.usuario.dto.UsuarioResponse;
import com.vinicius.backend.domain.usuario.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;
    private final UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@RequestBody @Valid RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> register(@RequestBody @Valid UsuarioRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> me(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                usuarioService.buscarPorEmail(userDetails.getUsername())
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @RequestBody @Valid ForgotPasswordRequest request
    ) {
        passwordResetService.solicitarRecuperacao(request.email());
        return ResponseEntity.ok(Map.of(
                "mensagem",
                "Se este email estiver cadastrado, você receberá as instruções em breve."
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @RequestBody @Valid ResetPasswordRequest request
    ) {
        passwordResetService.redefinirSenha(request.token(), request.novaSenha());
        return ResponseEntity.ok(Map.of("mensagem", "Senha redefinida com sucesso. Faça login."));
    }
}