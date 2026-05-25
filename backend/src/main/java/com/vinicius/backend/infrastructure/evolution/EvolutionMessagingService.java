package com.vinicius.backend.infrastructure.evolution;

import com.vinicius.backend.config.EvolutionProperties;
import com.vinicius.backend.domain.cao.dto.FilhoteReservaIntentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.core.ParameterizedTypeReference;
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

        String base = resolveBaseUrl();
        if (base == null) {
            return;
        }
        String instance = evolutionProperties.getInstanceName();
        if (!instanciaProntaParaEnviar(base, instance)) {
            return;
        }

        String uri = base + "/message/sendText/" + instance;
        try {
            var body = new java.util.LinkedHashMap<String, Object>();
            body.put("number", telefoneWhatsApp);
            body.put("text", texto);
            if (linkPreview && texto.contains("http")) {
                body.put("linkPreview", true);
            }

            log.info("[Evolution] Enviando texto para {} (timeout leitura {}ms)", telefoneWhatsApp,
                    evolutionProperties.getReadTimeoutMs());
            restClient()
                    .post()
                    .uri(uri)
                    .header("apikey", evolutionProperties.getApiKey())
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();

            log.info("[Evolution] Texto enviado para {}", telefoneWhatsApp);
        } catch (IllegalArgumentException e) {
            log.error("[Evolution] URL inválida (EVOLUTION_BASE_URL): {}", evolutionProperties.getBaseUrl());
        } catch (RestClientException e) {
            log.error(
                    "[Evolution] Falha ao enviar para {} em {}: {} — confira instância {} (connectionState=open) e ./scripts/evolution-conectar-whatsapp.sh",
                    telefoneWhatsApp, uri, e.getMessage(), instance
            );
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

        String base = resolveBaseUrl();
        if (base == null) {
            return;
        }
        String instance = evolutionProperties.getInstanceName();
        if (!instanciaProntaParaEnviar(base, instance)) {
            return;
        }

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
        } catch (IllegalArgumentException e) {
            log.error("[Evolution] URL inválida (EVOLUTION_BASE_URL): {}", evolutionProperties.getBaseUrl());
        } catch (RestClientException e) {
            log.error("[Evolution] Falha ao enviar filhote para {}: {}", resposta.telefoneWhatsApp(), e.getMessage());
        }
    }

    private boolean instanciaProntaParaEnviar(String base, String instance) {
        String state = obterEstadoConexao(base, instance);
        if ("open".equalsIgnoreCase(state)) {
            return true;
        }
        if ("unknown".equals(state)) {
            log.warn("[Evolution] connectionState indisponível — tentando enviar mesmo assim (instância {})", instance);
            return true;
        }
        log.error(
                "[Evolution] WhatsApp não conectado (state={}). Pareie a instância {}: ./scripts/evolution-conectar-whatsapp.sh",
                state, instance
        );
        return false;
    }

    private String obterEstadoConexao(String base, String instance) {
        try {
            Map<String, Object> json = restClient()
                    .get()
                    .uri(base + "/instance/connectionState/" + instance)
                    .header("apikey", evolutionProperties.getApiKey())
                    .retrieve()
                    .body(new ParameterizedTypeReference<Map<String, Object>>() {});
            if (json == null) {
                return "unknown";
            }
            Object instanceObj = json.get("instance");
            if (instanceObj instanceof Map<?, ?> inst) {
                Object state = inst.get("state");
                if (state != null) {
                    return state.toString();
                }
            }
            Object state = json.get("state");
            return state != null ? state.toString() : "unknown";
        } catch (RestClientException e) {
            log.warn("[Evolution] Erro ao consultar connectionState/{}: {}", instance, e.getMessage());
            return "unknown";
        }
    }

    private String resolveBaseUrl() {
        String raw = evolutionProperties.getBaseUrl();
        if (raw == null || raw.isBlank()) {
            log.error(
                    "[Evolution] EVOLUTION_BASE_URL não configurada. Ex.: https://evolution-api-production-6e8f.up.railway.app"
            );
            return null;
        }
        String trimmed = raw.trim();
        if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
            trimmed = "https://" + trimmed;
        }
        return trimmed.replaceAll("/$", "");
    }

    private RestClient restClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(evolutionProperties.getConnectTimeoutMs());
        factory.setReadTimeout(evolutionProperties.getReadTimeoutMs());
        return RestClient.builder().requestFactory(factory).build();
    }
}
