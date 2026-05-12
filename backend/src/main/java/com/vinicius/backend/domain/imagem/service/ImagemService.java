package com.vinicius.backend.domain.imagem.service;

import com.vinicius.backend.domain.cao.model.Cao;
import com.vinicius.backend.domain.cao.service.CaoService;
import com.vinicius.backend.domain.imagem.dto.ImagemResponse;
import com.vinicius.backend.domain.imagem.mapper.ImagemMapper;
import com.vinicius.backend.domain.imagem.model.Imagem;
import com.vinicius.backend.domain.imagem.repository.ImagemRepository;
import com.vinicius.backend.infrastructure.cloudinary.CloudinaryService;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImagemService {

    private final ImagemRepository imagemRepository;
    private final ImagemMapper imagemMapper;
    private final CloudinaryService cloudinaryService;
    private final CaoService caoService;

    @Transactional
    public ImagemResponse upload(UUID caoId, MultipartFile file, Boolean capa) {
        Cao cao = caoService.buscarEntidadePorId(caoId);

        Map resultado = cloudinaryService.upload(file, "caes");

        if (Boolean.TRUE.equals(capa)) {
            imagemRepository.removerCapaPorCaoId(caoId);
        }

        boolean ehCapa = Boolean.TRUE.equals(capa) ||
                imagemRepository.findByCaoIdOrderByOrdemAsc(caoId).isEmpty();

        int proximaOrdem = imagemRepository.findByCaoIdOrderByOrdemAsc(caoId).size();

        Imagem imagem = Imagem.builder()
                .cao(cao)
                .url((String) resultado.get("secure_url"))
                .publicId((String) resultado.get("public_id"))
                .capa(ehCapa)
                .ordem(proximaOrdem)
                .build();

        return imagemMapper.toResponse(imagemRepository.save(imagem));
    }

    @Transactional(readOnly = true)
    public List<ImagemResponse> listarPorCao(UUID caoId) {
        return imagemRepository.findByCaoIdOrderByOrdemAsc(caoId)
                .stream()
                .map(imagemMapper::toResponse)
                .toList();
    }

    @Transactional
    public ImagemResponse definirCapa(UUID caoId, UUID imagemId) {
        imagemRepository.removerCapaPorCaoId(caoId);

        Imagem imagem = imagemRepository.findById(imagemId)
                .orElseThrow(() -> new ResourceNotFoundException("Imagem não encontrada."));

        imagem.setCapa(true);
        return imagemMapper.toResponse(imagemRepository.save(imagem));
    }

    @Transactional
    public void deletar(UUID imagemId) {
        Imagem imagem = imagemRepository.findById(imagemId)
                .orElseThrow(() -> new ResourceNotFoundException("Imagem não encontrada."));

        cloudinaryService.deletar(imagem.getPublicId());
        imagemRepository.delete(imagem);
    }
}