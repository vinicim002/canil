package com.vinicius.backend.domain.cao.mapper;

import com.vinicius.backend.domain.cao.dto.CaoPaisResponse;
import com.vinicius.backend.domain.cao.dto.CaoRequest;
import com.vinicius.backend.domain.cao.dto.CaoResponse;
import com.vinicius.backend.domain.cao.enums.*;
import com.vinicius.backend.domain.cao.model.Cao;
import org.springframework.stereotype.Component;

@Component
public class CaoMapper {

    public Cao toEntity(CaoRequest request) {
        return Cao.builder()
                .nome(request.nome())
                .tipo(request.tipo())
                .tipoPelo(parseEnum(TipoPelo.class, request.tipoPelo(), "tipoPelo"))
                .tamanho(parseEnum(Tamanho.class, request.tamanho(), "tamanho"))
                .genero(parseGenero(request.genero()))
                .status(parseEnum(StatusCao.class, request.status(), "status"))
                .dataNascimento(request.dataNascimento())
                .cor(request.cor() != null && !request.cor().isBlank()
                        ? parseEnum(Cor.class, request.cor(), "cor")
                        : null)
                .pedigree(request.pedigree())
                .descricao(request.descricao())
                .destaque(request.destaque() != null ? request.destaque() : false)
                .build();
    }

    public CaoResponse toResponse(Cao cao) {
        return new CaoResponse(
                cao.getId(),
                cao.getNome(),
                cao.getTipo(),
                cao.getTipoPelo(),
                cao.getTamanho(),
                cao.getGenero(),
                cao.getStatus(),
                cao.getDataNascimento(),
                cao.getCor() != null ? cao.getCor().name() : null,
                cao.getPedigree(),
                cao.getDescricao(),
                cao.getDestaque(),
                cao.getPai() != null ? toPaisResponse(cao.getPai()) : null,
                cao.getMae() != null ? toPaisResponse(cao.getMae()) : null,
                cao.getImagens() != null
                        ? cao.getImagens().stream().map(this::toImagemResponse).toList()
                        : null,
                cao.getCriadoEm()
        );
    }

    // Genérico: converte String → qualquer Enum com mensagem de erro clara
    public <E extends Enum<E>> E parseEnum(Class<E> enumClass, String value, String campo) {
        if (value == null || value.isBlank()) return null;
        try {
            return Enum.valueOf(enumClass, value.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                    "Valor inválido para " + campo + ": '" + value + "'. " +
                            "Valores aceitos: " + java.util.Arrays.toString(enumClass.getEnumConstants())
            );
        }
    }

    // Trata FÊMEA com e sem acento
    public Genero parseGenero(String value) {
        if (value == null || value.isBlank()) return null;
        return switch (value.toUpperCase().trim()) {
            case "FÊMEA", "FEMEA", "FEMIA" -> Genero.FÊMEA;
            case "MACHO" -> Genero.MACHO;
            default -> throw new IllegalArgumentException("Gênero inválido: '" + value + "'");
        };
    }

    private CaoPaisResponse toPaisResponse(Cao cao) {
        return new CaoPaisResponse(
                cao.getId(),
                cao.getNome(),
                cao.getTipoPelo(),
                cao.getGenero()
        );
    }

    private com.vinicius.backend.domain.imagem.dto.ImagemResponse toImagemResponse(
            com.vinicius.backend.domain.imagem.model.Imagem imagem) {
        return new com.vinicius.backend.domain.imagem.dto.ImagemResponse(
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