package com.vinicius.backend.domain.cao.mapper;

import com.vinicius.backend.domain.cao.dto.CaoPaisResponse;
import com.vinicius.backend.domain.cao.dto.CaoRequest;
import com.vinicius.backend.domain.cao.dto.CaoResponse;
import com.vinicius.backend.domain.cao.enums.Cor;
import com.vinicius.backend.domain.cao.model.Cao;
import org.springframework.stereotype.Component;

@Component
public class CaoMapper {

    public Cao toEntity(CaoRequest request) {
        return Cao.builder()
                .nome(request.nome())
                .tipoPelo(request.tipoPelo())
                .tamanho(request.tamanho())
                .genero(request.genero())
                .status(request.status())
                .dataNascimento(request.dataNascimento())
                .cor(request.cor() != null ? Cor.valueOf(request.cor().toUpperCase()) : null)
                .pedigree(request.pedigree())
                .descricao(request.descricao())
                .destaque(request.destaque() != null ? request.destaque() : false)
                .build();
    }

    public CaoResponse toResponse(Cao cao) {
        return new CaoResponse(
                cao.getId(),
                cao.getNome(),
                cao.getTipoPelo(),
                cao.getTamanho(),
                cao.getGenero(),
                cao.getStatus(),
                cao.getDataNascimento(),
                cao.getCor() != null ? cao.getCor().name() : null, // <--- ADICIONE .name() AQUI
                cao.getPedigree(),
                cao.getDescricao(),
                cao.getDestaque(),
                cao.getPai() != null ? toPaisResponse(cao.getPai()) : null,
                cao.getMae() != null ? toPaisResponse(cao.getMae()) : null,
                cao.getCriadoEm()
        );
    }

    private CaoPaisResponse toPaisResponse(Cao cao) {
        return new CaoPaisResponse(
                cao.getId(),
                cao.getNome(),
                cao.getTipoPelo(),
                cao.getGenero()
        );
    }
}