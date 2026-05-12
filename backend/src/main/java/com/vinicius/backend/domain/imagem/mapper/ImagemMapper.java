package com.vinicius.backend.domain.imagem.mapper;

import com.vinicius.backend.domain.imagem.dto.ImagemResponse;
import com.vinicius.backend.domain.imagem.model.Imagem;
import org.springframework.stereotype.Component;

@Component
public class ImagemMapper {

    public ImagemResponse toResponse(Imagem imagem) {
        return new ImagemResponse(
                imagem.getId(),
                imagem.getCao().getId(),
                imagem.getUrl(),
                imagem.getPublicId(),
                imagem.getCapa(),
                imagem.getOrdem(),
                imagem.getCriadoEm()
        );
    }
}