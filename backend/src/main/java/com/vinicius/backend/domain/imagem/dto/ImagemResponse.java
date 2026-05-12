package com.vinicius.backend.domain.imagem.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ImagemResponse(
        UUID id,
        UUID caoId,
        String url,
        String publicId,
        Boolean capa,
        Integer ordem,
        LocalDateTime criadoEm
) {}