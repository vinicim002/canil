package com.vinicius.backend.infrastructure.evolution;

import com.vinicius.backend.config.EvolutionProperties;
import com.vinicius.backend.domain.cao.dto.FilhoteReservaIntentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EvolutionMessagingService {

    private final EvolutionProperties evolutionProperties;

    @Async
    public void enviarTexto(String telefoneWhatsApp, String texto) {
        enviarTextoSync(telefoneWhatsApp, texto, false);
    }

    @Async
    public void enviarTexto(String telefoneWhatsApp, String texto, boolean linkPreview) {
        enviarTextoSync(telefoneWhatsApp, texto, linkPreview);
    }

    public void enviarTextoSync(String telefoneWhatsApp, String texto, boolean linkPreview) {
        if (!evolutionProperties.isEnabled()) {
            log.warn("[Evolution] Desabilitado — mensagem não enviada.");
            return;
        }
        if (telefoneWhatsApp == null || telefoneWhatsApp.isBlank()) {
            log.warn("[Evolution] Telefone vazio — mensagem não enviada.");
            return;
        }
        if (texto == null || texto.isBlank()) {
            log.warn("[Evolution] Texto vazio — mensagem não enviada.");
            return;
        }

        String base = evolutionProperties.getBaseUrl().replaceAll("/$", "");
        String instance = evolutionProperties.getInstanceName();

        try {
            var body = new java.util.LinkedHashMap<String, Object>();
            body.put("number", telefoneWhatsApp);
            body.put("text", texto);
            if (linkPreview && texto.contains("http")) {
                body.put("linkPreview", true);
            }

            restClient()
                    .post()
                    .uri(base + "/message/sendText/" + instance)
                    .header("apikey", evolutionProperties.getApiKey())
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();

            log.info("[Evolution] Texto enviado para {}", telefoneWhatsApp);
        } catch (RestClientException e) {
            log.error("[Evolution] Falha ao enviar para {}: {}", telefoneWhatsApp, e.getMessage());
        }
    }

    @Async
    public void enviarRespostaFilhote(FilhoteReservaIntentResponse resposta) {
        if (!evolutionProperties.isEnabled()) {
            log.warn("[Evolution] Desabilitado — mensagem filhote não enviada.");
            return;
        }
        if (resposta.telefoneWhatsApp() == null || resposta.telefoneWhatsApp().isBlank()) {
            log.warn("[Evolution] Telefone vazio — mensagem filhote não enviada.");
            return;
        }

        String base = evolutionProperties.getBaseUrl().replaceAll("/$", "");
        String instance = evolutionProperties.getInstanceName();

        try {
            RestClient client = restClient();

            enviarTextoSync(resposta.telefoneWhatsApp(), resposta.mensagemWhatsApp(), true);

            client.post()
                    .uri(base + "/message/sendMedia/" + instance)
                    .header("apikey", evolutionProperties.getApiKey())
                    .body(Map.of(
                            "number", resposta.telefoneWhatsApp(),
                            "mediatype", "document",
                            "mimetype", "application/pdf",
                            "caption", "Instruções do canil 🐶",
                            "media", resposta.pdfUrl(),
                            "fileName", resposta.pdfFileName()
                    ))
                    .retrieve()
                    .toBodilessEntity();

            log.info("[Evolution] PDF filhote enviado para {}", resposta.telefoneWhatsApp());
        } catch (RestClientException e) {
            log.error("[Evolution] Falha ao enviar filhote para {}: {}", resposta.telefoneWhatsApp(), e.getMessage());
        }
    }

    private RestClient restClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(evolutionProperties.getConnectTimeoutMs());
        factory.setReadTimeout(evolutionProperties.getReadTimeoutMs());
        return RestClient.builder().requestFactory(factory).build();
    }
}
