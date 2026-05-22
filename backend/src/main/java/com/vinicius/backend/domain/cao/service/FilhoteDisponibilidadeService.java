package com.vinicius.backend.domain.cao.service;

import com.vinicius.backend.config.CanilPublicProperties;
import com.vinicius.backend.domain.cao.dto.FilhoteReservaIntentResponse;
import com.vinicius.backend.domain.cao.enums.StatusCao;
import com.vinicius.backend.domain.cao.enums.TipoCao;
import com.vinicius.backend.domain.cao.repository.CaoRepository;
import com.vinicius.backend.config.N8nProperties;
import com.vinicius.backend.infrastructure.evolution.EvolutionMessagingService;
import com.vinicius.backend.infrastructure.n8n.N8nWebhookClient;
import com.vinicius.backend.infrastructure.n8n.VisitaNotificacaoService;
import com.vinicius.backend.shared.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FilhoteDisponibilidadeService {

    private static final String PDF_PATH = "/docs/instrucoes-canil.pdf";
    private static final String PDF_FILE_NAME = "instrucoes-canil.pdf";

    private final CaoRepository caoRepository;
    private final CanilPublicProperties canilPublicProperties;
    private final N8nWebhookClient n8nWebhookClient;
    private final EvolutionMessagingService evolutionMessagingService;
    private final N8nProperties n8nProperties;

    @Transactional(readOnly = true)
    public FilhoteReservaIntentResponse responderIntentReserva(String telefone) {
        long quantidade = caoRepository.countByTipoAndStatus(TipoCao.FILHOTE, StatusCao.DISPONIVEL);
        boolean disponivel = quantidade > 0;
        String mensagem = disponivel
                ? "Temos filhotes disponíveis 🐶"
                : "No momento não temos filhotes disponíveis 😢";

        String baseUrl = canilPublicProperties.getDocsBaseUrl().replaceAll("/$", "");
        String telefoneWhatsApp = telefone != null && !telefone.isBlank()
                ? VisitaNotificacaoService.formatarTelefoneWhatsApp(telefone)
                : "";

        return new FilhoteReservaIntentResponse(
                disponivel,
                (int) quantidade,
                mensagem,
                telefoneWhatsApp,
                baseUrl + PDF_PATH,
                PDF_FILE_NAME
        );
    }

    /**
     * Disparado pelo site no clique em "Reservar filhote" — não depende de mensagem recebida no WhatsApp.
     */
    @Transactional(readOnly = true)
    public FilhoteReservaIntentResponse solicitarReserva(String telefone) {
        String digits = telefone.replaceAll("\\D", "");
        if (digits.length() < 10) {
            throw new BusinessException("Informe um WhatsApp válido com DDD.");
        }
        FilhoteReservaIntentResponse resposta = responderIntentReserva(telefone);
        dispararRespostaWhatsApp(resposta);
        return resposta;
    }

    @Async
    public void dispararRespostaWhatsApp(FilhoteReservaIntentResponse resposta) {
        if (n8nProperties.isFilhoteRespostaViaN8n()) {
            n8nWebhookClient.enviarFilhoteResposta(resposta);
        } else {
            evolutionMessagingService.enviarRespostaFilhote(resposta);
        }
    }
}
