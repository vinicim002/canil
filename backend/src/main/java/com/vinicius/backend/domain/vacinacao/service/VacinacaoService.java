package com.vinicius.backend.domain.vacinacao.service;

import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.cao.service.CaoService;
import com.vinicius.backend.domain.vacinacao.dto.VacinacaoRequest;
import com.vinicius.backend.domain.vacinacao.dto.VacinacaoResponse;
import com.vinicius.backend.domain.vacinacao.mapper.VacinacaoMapper;
import com.vinicius.backend.domain.vacinacao.model.HistoricoVacinacao;
import com.vinicius.backend.domain.vacinacao.repository.VacinacaoRepository;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VacinacaoService {

    private final VacinacaoRepository vacinacaoRepository;
    private final VacinacaoMapper vacinacaoMapper;
    private final CaoService caoService;

    @Transactional
    public VacinacaoResponse registrar(VacinacaoRequest request) {
        Cao cao = caoService.buscarEntidadePorId(request.caoId());

        HistoricoVacinacao vacinacao = HistoricoVacinacao.builder()
                .cao(cao)
                .nomeVacina(request.nomeVacina())
                .dataAplicacao(request.dataAplicacao())
                .proximaDose(request.proximaDose())
                .lote(request.lote())
                .veterinario(request.veterinario())
                .observacoes(request.observacoes())
                .build();

        return vacinacaoMapper.toResponse(vacinacaoRepository.save(vacinacao));
    }

    @Transactional(readOnly = true)
    public List<VacinacaoResponse> listarPorCao(UUID caoId) {
        return vacinacaoRepository.findByCaoIdOrderByDataAplicacaoDesc(caoId)
                .stream()
                .map(vacinacaoMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VacinacaoResponse buscarPorId(UUID id) {
        return vacinacaoMapper.toResponse(buscarEntidadePorId(id));
    }

    @Transactional
    public void deletar(UUID id) {
        vacinacaoRepository.delete(buscarEntidadePorId(id));
    }

    private HistoricoVacinacao buscarEntidadePorId(UUID id) {
        return vacinacaoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacinação não encontrada."));
    }
}