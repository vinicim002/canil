package com.vinicius.backend.integration;

import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.enums.TipoCao;
import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.cao.repository.CaoRepository;
import com.vinicius.backend.domain.reserva.dto.ReservaRequest;
import com.vinicius.backend.domain.reserva.service.ReservaService;
import com.vinicius.backend.domain.usuario.enums.Role;
import com.vinicius.backend.domain.usuario.enums.StatusUsuario;
import com.vinicius.backend.domain.usuario.model.Usuario;
import com.vinicius.backend.domain.usuario.repository.UsuarioRepository;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.support.IntegrationTestBase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ReservaConcurrencyIntegrationTest extends IntegrationTestBase {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CaoRepository caoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UUID usuarioAId;
    private UUID usuarioBId;
    private UUID caoId;

    @BeforeEach
    void setUp() {
        usuarioAId = usuarioRepository.save(Usuario.builder()
                .nome("Cliente A")
                .email("clientea-" + UUID.randomUUID() + "@test.com")
                .senha(passwordEncoder.encode("senha123"))
                .role(Role.CLIENTE)
                .ativo(true)
                .status(StatusUsuario.APROVADO)
                .build()).getId();

        usuarioBId = usuarioRepository.save(Usuario.builder()
                .nome("Cliente B")
                .email("clienteb-" + UUID.randomUUID() + "@test.com")
                .senha(passwordEncoder.encode("senha123"))
                .role(Role.CLIENTE)
                .ativo(true)
                .status(StatusUsuario.APROVADO)
                .build()).getId();

        caoId = caoRepository.save(Cao.builder()
                .nome("Filhote Teste")
                .tipo(TipoCao.FILHOTE)
                .status(StatusCao.DISPONIVEL)
                .build()).getId();
    }

    @Test
    void segundaReservaNoMesmoFilhoteDeveFalhar() {
        ReservaRequest request = new ReservaRequest(
                caoId,
                BigDecimal.valueOf(500),
                BigDecimal.valueOf(3000),
                "Teste"
        );

        assertThat(reservaService.criar(usuarioAId, request).id()).isNotNull();
        assertThrows(BusinessException.class, () -> reservaService.criar(usuarioBId, request));
    }
}
