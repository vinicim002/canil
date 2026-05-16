package com.vinicius.backend.domain.cao.service;

import com.vinicius.backend.domain.cao.dto.CaoFiltroRequest;
import com.vinicius.backend.domain.cao.dto.CaoRequest;
import com.vinicius.backend.domain.cao.dto.CaoResponse;
import com.vinicius.backend.domain.cao.enums.*;
import com.vinicius.backend.domain.cao.mapper.CaoMapper;
import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.cao.repository.CaoRepository;
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
        vincularPais(cao, request.paiId(), request.maeId());
        return caoMapper.toResponse(caoRepository.save(cao));
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarTodos() {
        return caoRepository.findAll().stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarPorTipo(TipoCao tipo) {
        return caoRepository.findByTipo(tipo).stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarDisponiveis() {
        return caoRepository.findByStatus(StatusCao.DISPONIVEL).stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarDestaques() {
        return caoRepository.findByDestaqueTrue().stream()
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CaoResponse buscarPorId(UUID id) {
        return caoMapper.toResponse(buscarEntidadePorId(id));
    }

    @Transactional(readOnly = true)
    public List<CaoResponse> listarComFiltros(CaoFiltroRequest filtro) {
        return caoRepository.findAll().stream()
                .filter(c -> filtro.tipo() == null || c.getTipo() == filtro.tipo())
                .filter(c -> filtro.status() == null || c.getStatus() == filtro.status())
                .filter(c -> filtro.tipoPelo() == null || c.getTipoPelo() == filtro.tipoPelo())
                .filter(c -> filtro.tamanho() == null || c.getTamanho() == filtro.tamanho())
                .filter(c -> filtro.genero() == null || c.getGenero() == filtro.genero())
                .filter(c -> filtro.destaque() == null || c.getDestaque().equals(filtro.destaque()))
                .map(caoMapper::toResponse)
                .toList();
    }

    @Transactional
    public CaoResponse atualizar(UUID id, CaoRequest request) {
        Cao cao = buscarEntidadePorId(id);

        cao.setNome(request.nome());
        cao.setTipo(request.tipo());
        cao.setTipoPelo(caoMapper.parseEnum(TipoPelo.class, request.tipoPelo(), "tipoPelo"));
        cao.setTamanho(caoMapper.parseEnum(Tamanho.class, request.tamanho(), "tamanho"));
        cao.setGenero(caoMapper.parseGenero(request.genero()));
        cao.setStatus(caoMapper.parseEnum(StatusCao.class, request.status(), "status"));
        cao.setDataNascimento(request.dataNascimento());
        cao.setPedigree(request.pedigree());
        cao.setDescricao(request.descricao());
        cao.setDestaque(request.destaque() != null ? request.destaque() : false);
        cao.setCor(request.cor() != null && !request.cor().isBlank()
                ? caoMapper.parseEnum(Cor.class, request.cor(), "cor")
                : null);

        vincularPais(cao, request.paiId(), request.maeId());

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

    private void vincularPais(Cao cao, UUID paiId, UUID maeId) {
        cao.setPai(paiId != null ? buscarEntidadePorId(paiId) : null);
        cao.setMae(maeId != null ? buscarEntidadePorId(maeId) : null);
    }

    public Cao buscarEntidadePorId(UUID id) {
        return caoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cão não encontrado."));
    }
}