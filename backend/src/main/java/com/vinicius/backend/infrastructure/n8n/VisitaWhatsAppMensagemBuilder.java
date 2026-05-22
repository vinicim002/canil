package com.vinicius.backend.infrastructure.n8n;

public final class VisitaWhatsAppMensagemBuilder {

    private VisitaWhatsAppMensagemBuilder() {}

    public static String montarTexto(VisitaNotificacaoPayload payload, String linkWhatsApp) {
        String link = normalizarLink(linkWhatsApp != null ? linkWhatsApp : payload.linkGerenciamento());
        return switch (payload.evento()) {
            case VISITA_CRIADA -> """
                    Olá, %s! 🐶

                    Sua visita ao %s foi agendada.

                    %s

                    Toque no link acima para reagendar ou cancelar.""".formatted(payload.nome(), payload.siteName(), link);
            case VISITA_REAGENDADA -> """
                    Olá, %s! Sua visita foi reagendada.

                    %s""".formatted(payload.nome(), link);
            case VISITA_CANCELADA -> """
                    Olá, %s. Sua visita foi cancelada. Para marcar de novo, fale conosco no WhatsApp.""".formatted(payload.nome());
            case VISITA_CONFIRMADA -> """
                    Olá, %s! ✅ Visita confirmada.

                    %s""".formatted(payload.nome(), link);
            case VISITA_LEMBRETE -> """
                    Olá, %s! Lembrete: você tem visita agendada em breve.

                    %s""".formatted(payload.nome(), link);
        };
    }

    private static String normalizarLink(String url) {
        if (url == null || url.isBlank()) {
            return "";
        }
        String trimmed = url.trim();
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            return trimmed;
        }
        return "https://" + trimmed;
    }
}
