package com.vinicius.backend.integration;

import com.vinicius.backend.domain.visita.dto.CriarVisitaRequest;
import com.vinicius.backend.domain.visita.service.VisitaService;
import com.vinicius.backend.shared.exception.BusinessException;
import com.vinicius.backend.support.IntegrationTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.DayOfWeek;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class VisitaConcurrencyIntegrationTest extends IntegrationTestBase {

    @Autowired
    private VisitaService visitaService;

    @Test
    void segundoAgendamentoNoMesmoHorarioDeveFalhar() {
        LocalDateTime slot = proximoSlotValido();

        CriarVisitaRequest primeiro = new CriarVisitaRequest(
                "Cliente A",
                "21999990001",
                "a@test.com",
                slot,
                null
        );

        CriarVisitaRequest segundo = new CriarVisitaRequest(
                "Cliente B",
                "21999990002",
                "b@test.com",
                slot,
                null
        );

        assertThat(visitaService.criar(primeiro).id()).isNotNull();

        assertThrows(BusinessException.class, () -> visitaService.criar(segundo));
    }

    private LocalDateTime proximoSlotValido() {
        LocalDateTime slot = LocalDateTime.now()
                .plusDays(2)
                .withHour(10)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);
        while (slot.getDayOfWeek() == DayOfWeek.SUNDAY) {
            slot = slot.plusDays(1);
        }
        return slot;
    }
}
