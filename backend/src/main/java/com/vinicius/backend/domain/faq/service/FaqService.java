package com.vinicius.backend.domain.faq.service;

import com.vinicius.backend.domain.faq.dto.FaqRequest;
import com.vinicius.backend.domain.faq.dto.FaqResponse;
import com.vinicius.backend.domain.faq.mapper.FaqMapper;
import com.vinicius.backend.domain.faq.model.Faq;
import com.vinicius.backend.domain.faq.repository.FaqRepository;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;
    private final FaqMapper faqMapper;

    @Transactional
    public FaqResponse criar(FaqRequest request) {
        Faq faq = Faq.builder()
                .pergunta(request.pergunta())
                .resposta(request.resposta())
                .ordem(request.ordem() != null ? request.ordem() : 0)
                .ativo(true)
                .build();

        return faqMapper.toResponse(faqRepository.save(faq));
    }

    @Transactional(readOnly = true)
    public List<FaqResponse> listarAtivos() {
        return faqRepository.findByAtivoTrueOrderByOrdemAsc()
                .stream()
                .map(faqMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FaqResponse> listarTodos() {
        return faqRepository.findAll()
                .stream()
                .map(faqMapper::toResponse)
                .toList();
    }

    @Transactional
    public FaqResponse atualizar(UUID id, FaqRequest request) {
        Faq faq = buscarEntidadePorId(id);
        faq.setPergunta(request.pergunta());
        faq.setResposta(request.resposta());
        if (request.ordem() != null) faq.setOrdem(request.ordem());
        return faqMapper.toResponse(faqRepository.save(faq));
    }

    @Transactional
    public void desativar(UUID id) {
        Faq faq = buscarEntidadePorId(id);
        faq.setAtivo(false);
        faqRepository.save(faq);
    }

    @Transactional
    public void deletar(UUID id) {
        faqRepository.delete(buscarEntidadePorId(id));
    }

    private Faq buscarEntidadePorId(UUID id) {
        return faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ não encontrado."));
    }
}