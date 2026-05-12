package com.vinicius.backend.domain.depoimento.service;

import com.vinicius.backend.domain.depoimento.dto.DepoimentoRequest;
import com.vinicius.backend.domain.depoimento.dto.DepoimentoResponse;
import com.vinicius.backend.domain.depoimento.mapper.DepoimentoMapper;
import com.vinicius.backend.domain.depoimento.model.Depoimento;
import com.vinicius.backend.domain.depoimento.repository.DepoimentoRepository;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DepoimentoService {

    private final DepoimentoRepository depoimentoRepository;
    private final DepoimentoMapper depoimentoMapper;

    @Transactional
    public DepoimentoResponse criar(DepoimentoRequest request) {
        Depoimento depoimento = Depoimento.builder()
                .nomeCliente(request.nomeCliente())
                .texto(request.texto())
                .nota(request.nota())
                .fotoUrl(request.fotoUrl())
                .aprovado(false)
                .destaque(false)
                .build();

        return depoimentoMapper.toResponse(depoimentoRepository.save(depoimento));
    }

    @Transactional(readOnly = true)
    public List<DepoimentoResponse> listarAprovados() {
        return depoimentoRepository.findByAprovadoTrue()
                .stream()
                .map(depoimentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DepoimentoResponse> listarPendentes() {
        return depoimentoRepository.findByAprovadoFalse()
                .stream()
                .map(depoimentoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DepoimentoResponse> listarDestaques() {
        return depoimentoRepository.findByDestaqueTrue()
                .stream()
                .map(depoimentoMapper::toResponse)
                .toList();
    }

    @Transactional
    public DepoimentoResponse aprovar(UUID id) {
        Depoimento depoimento = buscarEntidadePorId(id);
        depoimento.setAprovado(true);
        return depoimentoMapper.toResponse(depoimentoRepository.save(depoimento));
    }

    @Transactional
    public DepoimentoResponse destacar(UUID id) {
        Depoimento depoimento = buscarEntidadePorId(id);
        depoimento.setDestaque(true);
        return depoimentoMapper.toResponse(depoimentoRepository.save(depoimento));
    }

    @Transactional
    public void deletar(UUID id) {
        depoimentoRepository.delete(buscarEntidadePorId(id));
    }

    private Depoimento buscarEntidadePorId(UUID id) {
        return depoimentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Depoimento não encontrado."));
    }
}