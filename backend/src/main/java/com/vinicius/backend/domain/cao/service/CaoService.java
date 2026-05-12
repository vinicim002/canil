package com.vinicius.backend.domain.cao.service;

import com.vinicius.backend.domain.cao.dto.CaoFiltroRequest;
import com.vinicius.backend.domain.cao.dto.CaoRequest;
import com.vinicius.backend.domain.cao.dto.CaoResponse;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.mapper.CaoMapper;
import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.cao.repository.CaoRepository;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CaoService {

    private final CaoRepository caoRepository;
    private final CaoMapper caoMapper;

    @Transactional
    public CaoResponse criar(CaoRequest request) {
        Cao cao = caoMapper.toEntity(request);

        if (request.paiId() != null) {
            Cao pai = buscarEntidadePorId(request.paiId());
            cao.setPai(pai);
        }

        if (request.maeId() != null) {
            Cao mae = buscarEntidadePorId(request.maeId());
            cao.setMae(mae);
        }

        return caoMapper.toResponse(caoRepository.save(cao));
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarTodos() {
        return caoRepository.findAll()
                .stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarComFiltros(CaoFiltroRequest filtro) {
        return caoRepository.findAll()
                .stream()
                .filter(c -> filtro.status() == null || c.getStatus() == filtro.status())
                .filter(c -> filtro.tipoPelo() == null || c.getTipoPelo() == filtro.tipoPelo())
                .filter(c -> filtro.tamanho() == null || c.getTamanho() == filtro.tamanho())
                .filter(c -> filtro.genero() == null || c.getGenero() == filtro.genero())
                .filter(c -> filtro.destaque() == null || c.getDestaque().equals(filtro.destaque()))
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarDisponiveis() {
        return caoRepository.findByStatus(StatusCao.DISPONIVEL)
                .stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarDestaques() {
        return caoRepository.findByDestaqueTrue()
                .stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CaoResponse buscarPorId(UUID id) {
        return caoMapper.toResponse(buscarEntidadePorId(id));
    }

    @Transactional
    public CaoResponse atualizar(UUID id, CaoRequest request) {
        Cao cao = buscarEntidadePorId(id);

        cao.setNome(request.nome());
        cao.setTipoPelo(request.tipoPelo());
        cao.setTamanho(request.tamanho());
        cao.setGenero(request.genero());
        cao.setStatus(request.status());
        cao.setDataNascimento(request.dataNascimento());

        // CONVERSÃO DE STRING PARA ENUM (Se Cor for Enum na Entidade e String no Request)
        if (request.cor() != null) {
            cao.setCor(com.vinicius.backend.domain.cao.enums.Cor.valueOf(request.cor().toUpperCase()));
        }

        cao.setPedigree(request.pedigree());
        cao.setDescricao(request.descricao());
        cao.setDestaque(request.destaque() != null ? request.destaque() : false);

        // Genealogia
        cao.setPai(request.paiId() != null ? buscarEntidadePorId(request.paiId()) : null);
        cao.setMae(request.maeId() != null ? buscarEntidadePorId(request.maeId()) : null);

        return caoMapper.toResponse(caoRepository.save(cao));
    }

    @Transactional
    public CaoResponse atualizarStatus(UUID id, StatusCao status) {
        Cao cao = buscarEntidadePorId(id);
        cao.setStatus(status);
        return caoMapper.toResponse(caoRepository.save(cao));
    }

    @Transactional
    public void deletar(UUID id) {
        Cao cao = buscarEntidadePorId(id);
        caoRepository.delete(cao);
    }

    public Cao buscarEntidadePorId(UUID id) {
        return caoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cão não encontrado."));
    }
}