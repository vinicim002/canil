package com.vinicius.backend.infrastructure.n8n;

import java.time.LocalDateTime;
import java.util.UUID;

public record VisitaNotificacaoPayload(
        TipoEventoVisita evento,
        UUID visitaId,
        String nome,
        String telefone,
        String telefoneWhatsApp,
        String email,
        LocalDateTime dataHora,
        String status,
        String linkGerenciamento,
        String siteName
) {}
