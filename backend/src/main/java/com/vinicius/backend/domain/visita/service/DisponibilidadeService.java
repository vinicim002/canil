package com.vinicius.backend.domain.visita.service;

import com.vinicius.backend.config.VisitaProperties;
import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.agendamento.repository.AgendamentoRepository;
import com.vinicius.backend.domain.visita.dto.SlotDisponivelResponse;
import com.vinicius.backend.domain.visita.dto.SlotsDiaResponse;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import com.vinicius.backend.shared.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DisponibilidadeService {

    private static final List<StatusAgendamento> STATUS_OCUPAM_HORARIO = List.of(
            StatusAgendamento.PENDENTE,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.REAGENDADO
    );

    private final VisitaProperties visitaProperties;
    private final VisitaAgendamentoRepository visitaRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final BloqueioHorarioService bloqueioHorarioService;

    @Transactional(readOnly = true)
    public SlotsDiaResponse listarSlots(LocalDate data) {
        return listarSlots(data, null);
    }

    @Transactional(readOnly = true)
    public SlotsDiaResponse listarSlots(LocalDate data, UUID excluirVisitaId) {
        validarDataConsulta(data);

        if (bloqueioHorarioService.diaInteiroBloqueado(data)) {
            return new SlotsDiaResponse(data, List.of());
        }

        Set<LocalTime> horariosBloqueados = bloqueioHorarioService
                .horariosBloqueadosNoDia(data)
                .stream()
                .collect(Collectors.toSet());

        LocalDateTime inicioDia = data.atStartOfDay();
        LocalDateTime fimDia = data.plusDays(1).atStartOfDay();

        Set<LocalDateTime> ocupados = visitaRepository
                .findOcupadosNoPeriodo(inicioDia, fimDia, List.of(StatusAgendamento.CANCELADO, StatusAgendamento.AUSENTE))
                .stream()
                .filter(v -> excluirVisitaId == null || !v.getId().equals(excluirVisitaId))
                .map(VisitaAgendamento::getDataHora)
                .collect(Collectors.toSet());

        LocalDateTime limiteMinimo = LocalDateTime.now()
                .plusHours(visitaProperties.getAntecedenciaMinimaHoras());

        List<SlotDisponivelResponse> slots = new ArrayList<>();
        LocalTime cursor = visitaProperties.getHoraInicio();
        LocalTime horaFim = visitaProperties.getHoraFim();
        int duracao = visitaProperties.getDuracaoMinutos();

        while (!cursor.plusMinutes(duracao).isAfter(horaFim)) {
            LocalDateTime slot = LocalDateTime.of(data, cursor);

            if (slot.isAfter(limiteMinimo)
                    && !ocupados.contains(slot)
                    && !horariosBloqueados.contains(cursor)
                    && !horarioOcupadoPorAgendamentoInterno(slot, duracao)) {
                slots.add(new SlotDisponivelResponse(cursor, slot));
            }

            cursor = cursor.plusMinutes(duracao);
        }

        return new SlotsDiaResponse(data, slots);
    }

    public void validarSlotDisponivel(LocalDateTime dataHora) {
        validarSlotDisponivel(dataHora, null);
    }

    public void validarSlotDisponivel(LocalDateTime dataHora, UUID excluirVisitaId) {
        LocalDate data = dataHora.toLocalDate();
        validarDataConsulta(data);

        if (!diaPermitido(data)) {
            throw new BusinessException("Não há atendimento neste dia da semana.");
        }

        LocalTime hora = dataHora.toLocalTime();
        if (hora.isBefore(visitaProperties.getHoraInicio())
                || hora.plusMinutes(visitaProperties.getDuracaoMinutos()).isAfter(visitaProperties.getHoraFim())) {
            throw new BusinessException("Horário fora do expediente de visitas.");
        }

        if (!dataHora.isAfter(LocalDateTime.now().plusHours(visitaProperties.getAntecedenciaMinimaHoras()))) {
            throw new BusinessException("Agende com pelo menos "
                    + visitaProperties.getAntecedenciaMinimaHoras() + " horas de antecedência.");
        }

        SlotsDiaResponse dia = listarSlots(data, excluirVisitaId);
        boolean disponivel = dia.slots().stream()
                .anyMatch(s -> s.dataHora().equals(dataHora));

        if (!disponivel) {
            throw new BusinessException("Este horário não está mais disponível.");
        }
    }

    private void validarDataConsulta(LocalDate data) {
        LocalDate hoje = LocalDate.now();
        if (data.isBefore(hoje)) {
            throw new BusinessException("Não é possível consultar datas passadas.");
        }
        if (data.isAfter(hoje.plusDays(visitaProperties.getDiasAntecedenciaMaxima()))) {
            throw new BusinessException("Agendamentos permitidos até "
                    + visitaProperties.getDiasAntecedenciaMaxima() + " dias à frente.");
        }
        if (!diaPermitido(data)) {
            throw new BusinessException("Não há atendimento neste dia da semana.");
        }
    }

    private boolean diaPermitido(LocalDate data) {
        Set<Integer> permitidos = Arrays.stream(visitaProperties.getDiasPermitidos().split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Integer::parseInt)
                .collect(Collectors.toSet());
        return permitidos.contains(data.getDayOfWeek().getValue());
    }

    private boolean horarioOcupadoPorAgendamentoInterno(LocalDateTime slot, int duracaoMinutos) {
        LocalDateTime inicio = slot.minusMinutes(duracaoMinutos - 1);
        LocalDateTime fim = slot.plusMinutes(duracaoMinutos - 1);
        return agendamentoRepository.existsByDataHoraBetween(inicio, fim);
    }
}
