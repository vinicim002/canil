package com.vinicius.backend.domain.visita.service;

import com.vinicius.backend.config.VisitaProperties;
import com.vinicius.backend.domain.visita.dto.BloqueioHorarioResponse;
import com.vinicius.backend.domain.visita.dto.CriarBloqueioRequest;
import com.vinicius.backend.domain.visita.mapper.BloqueioHorarioMapper;
import com.vinicius.backend.domain.visita.model.BloqueioHorario;
import com.vinicius.backend.domain.visita.repository.BloqueioHorarioRepository;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BloqueioHorarioService {

    private final BloqueioHorarioRepository bloqueioRepository;
    private final BloqueioHorarioMapper bloqueioMapper;
    private final VisitaProperties visitaProperties;

    @Transactional(readOnly = true)
    public List<BloqueioHorarioResponse> listarProximos() {
        return bloqueioRepository
                .findByDataGreaterThanEqualOrderByDataAscHoraAsc(LocalDate.now())
                .stream()
                .map(bloqueioMapper::toResponse)
                .toList();
    }

    @Transactional
    public BloqueioHorarioResponse criar(CriarBloqueioRequest request) {
        if (request.data().isBefore(LocalDate.now())) {
            throw new BusinessException("Não é possível bloquear datas passadas.");
        }

        if (request.hora() == null) {
            if (bloqueioRepository.existsByDataAndHoraIsNull(request.data())) {
                throw new BusinessException("Este dia já está bloqueado por completo.");
            }
        } else {
            validarHoraNaGrade(request.hora());
            if (bloqueioRepository.existsByDataAndHoraIsNull(request.data())) {
                throw new BusinessException("O dia inteiro já está bloqueado.");
            }
            if (bloqueioRepository.existsByDataAndHora(request.data(), request.hora())) {
                throw new BusinessException("Este horário já está bloqueado.");
            }
        }

        BloqueioHorario bloqueio = BloqueioHorario.builder()
                .data(request.data())
                .hora(request.hora())
                .motivo(request.motivo() != null ? request.motivo().trim() : null)
                .build();

        return bloqueioMapper.toResponse(bloqueioRepository.save(bloqueio));
    }

    @Transactional
    public void remover(UUID id) {
        if (!bloqueioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Bloqueio não encontrado.");
        }
        bloqueioRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public boolean diaInteiroBloqueado(LocalDate data) {
        return bloqueioRepository.existsByDataAndHoraIsNull(data);
    }

    @Transactional(readOnly = true)
    public List<LocalTime> horariosBloqueadosNoDia(LocalDate data) {
        return bloqueioRepository.findByData(data).stream()
                .map(BloqueioHorario::getHora)
                .filter(h -> h != null)
                .toList();
    }

    private void validarHoraNaGrade(LocalTime hora) {
        if (hora.isBefore(visitaProperties.getHoraInicio())
                || hora.isAfter(visitaProperties.getHoraFim())) {
            throw new BusinessException("Horário fora do expediente de visitas.");
        }
        long minutos = java.time.Duration.between(visitaProperties.getHoraInicio(), hora).toMinutes();
        if (minutos % visitaProperties.getDuracaoMinutos() != 0) {
            throw new BusinessException("Horário deve seguir a grade de "
                    + visitaProperties.getDuracaoMinutos() + " minutos.");
        }
    }
}
