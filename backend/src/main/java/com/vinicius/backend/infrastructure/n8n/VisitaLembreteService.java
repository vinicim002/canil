package com.vinicius.backend.infrastructure.n8n;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.domain.agendamento.enums.StatusAgendamento;
import com.vinicius.backend.domain.visita.mapper.VisitaMapper;
import com.vinicius.backend.domain.visita.model.VisitaAgendamento;
import com.vinicius.backend.domain.visita.repository.VisitaAgendamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitaLembreteService {

    private static final List<StatusAgendamento> STATUS_ATIVOS = List.of(
            StatusAgendamento.PENDENTE,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.REAGENDADO
    );

    private final VisitaAgendamentoRepository visitaRepository;
    private final VisitaMapper visitaMapper;
    private final MailProperties mailProperties;

    @Transactional(readOnly = true)
    public List<VisitaNotificacaoPayload> listarParaLembrete(int horasAntes) {
        if (horasAntes < 1 || horasAntes > 168) {
            horasAntes = 24;
        }

        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime janelaInicio = agora.plusHours(horasAntes).minusHours(1);
        LocalDateTime janelaFim = agora.plusHours(horasAntes).plusHours(1);

        return visitaRepository
                .findVisitasParaLembrete(janelaInicio, janelaFim, STATUS_ATIVOS)
                .stream()
                .map(this::paraPayloadLembrete)
                .toList();
    }

    private VisitaNotificacaoPayload paraPayloadLembrete(VisitaAgendamento visita) {
        var response = visitaMapper.toResponse(visita);
        return new VisitaNotificacaoPayload(
                TipoEventoVisita.VISITA_LEMBRETE,
                response.id(),
                response.nome(),
                response.telefone(),
                VisitaNotificacaoService.formatarTelefoneWhatsApp(response.telefone()),
                response.email(),
                response.dataHora(),
                response.status().name(),
                response.linkGerenciamento(),
                mailProperties.getSiteName()
        );
    }
}
