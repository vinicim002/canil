package com.vinicius.backend.infrastructure.email;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class EmailTemplateRenderer {

    private static final String BRAND_BROWN = "#6a3515";
    private static final String BRAND_ORANGE = "#e0712e";
    private static final String BRAND_CREAM = "#ffede2";

    public String render(String titulo, String conteudoHtml, String siteName, String siteUrl) {
        return """
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>%s</title>
                </head>
                <body style="margin:0;padding:0;background-color:%s;font-family:'Segoe UI',Arial,sans-serif;">
                  <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="background-color:%s;padding:32px 16px;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(106,53,21,0.12);">
                          <tr>
                            <td style="background:linear-gradient(135deg,%s 0%%,%s 100%%);padding:32px 40px;text-align:center;">
                              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:0.05em;">%s</h1>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:40px;color:#3d3d3d;font-size:16px;line-height:1.7;">
                              %s
                            </td>
                          </tr>
                          <tr>
                            <td style="background-color:%s;padding:24px 40px;text-align:center;border-top:1px solid rgba(106,53,21,0.08);">
                              <p style="margin:0 0 8px;color:%s;font-size:13px;font-weight:600;">%s</p>
                              <a href="%s" style="color:%s;font-size:13px;text-decoration:none;">%s</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(
                titulo,
                BRAND_CREAM,
                BRAND_CREAM,
                BRAND_BROWN,
                BRAND_ORANGE,
                siteName,
                conteudoHtml,
                BRAND_CREAM,
                BRAND_BROWN,
                siteName,
                siteUrl,
                BRAND_ORANGE,
                siteUrl
        );
    }

    public String renderAprovacao(String nome, String siteName, String siteUrl) {
        String conteudo = """
                <h2 style="margin:0 0 16px;color:%s;font-size:22px;">Olá, %s!</h2>
                <p style="margin:0 0 16px;">Temos uma ótima notícia: sua conta foi <strong style="color:%s;">aprovada</strong> e você já pode acessar a área do cliente.</p>
                <p style="margin:0 0 24px;">Agora você pode acompanhar reservas, agendamentos e todas as funcionalidades exclusivas do nosso canil.</p>
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius:999px;background:%s;">
                      <a href="%s/login" style="display:inline-block;padding:14px 32px;color:#ffffff;font-weight:700;text-decoration:none;font-size:14px;letter-spacing:0.05em;">ACESSAR MINHA CONTA</a>
                    </td>
                  </tr>
                </table>
                """.formatted(BRAND_BROWN, nome, BRAND_ORANGE, BRAND_BROWN, siteUrl);
        return render("Conta aprovada", conteudo, siteName, siteUrl);
    }

    public String renderContato(Map<String, String> dados, String siteName, String siteUrl) {
        String conteudo = """
                <h2 style="margin:0 0 16px;color:%s;font-size:22px;">Nova mensagem de contato</h2>
                <table role="presentation" width="100%%" cellspacing="0" cellpadding="0" style="font-size:15px;">
                  <tr><td style="padding:8px 0;color:#888;width:120px;">Nome</td><td style="padding:8px 0;font-weight:600;">%s</td></tr>
                  <tr><td style="padding:8px 0;color:#888;">E-mail</td><td style="padding:8px 0;font-weight:600;">%s</td></tr>
                  <tr><td style="padding:8px 0;color:#888;">Telefone</td><td style="padding:8px 0;font-weight:600;">%s</td></tr>
                  <tr><td style="padding:8px 0;color:#888;">Assunto</td><td style="padding:8px 0;font-weight:600;">%s</td></tr>
                </table>
                <div style="margin-top:24px;padding:20px;background:%s;border-radius:16px;">
                  <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Mensagem</p>
                  <p style="margin:0;white-space:pre-wrap;">%s</p>
                </div>
                """.formatted(
                BRAND_BROWN,
                dados.get("nome"),
                dados.get("email"),
                dados.getOrDefault("telefone", "—"),
                dados.get("assunto"),
                BRAND_CREAM,
                dados.get("mensagem")
        );
        return render("Contato — " + dados.get("assunto"), conteudo, siteName, siteUrl);
    }

    public String renderVisitaConfirmacao(
            String nome,
            String dataHoraFormatada,
            String linkGerenciamento,
            String tituloEvento,
            String siteName,
            String siteUrl
    ) {
        String conteudo = """
                <h2 style="margin:0 0 16px;color:%s;font-size:22px;">%s</h2>
                <p style="margin:0 0 16px;">Olá, <strong>%s</strong>!</p>
                <p style="margin:0 0 8px;">Sua visita ao canil está prevista para:</p>
                <p style="margin:0 0 24px;font-size:18px;font-weight:700;color:%s;">%s</p>
                <p style="margin:0 0 24px;">Use o link abaixo para ver, reagendar ou cancelar seu agendamento:</p>
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="border-radius:999px;background:%s;">
                      <a href="%s" style="display:inline-block;padding:14px 32px;color:#ffffff;font-weight:700;text-decoration:none;font-size:14px;">GERENCIAR AGENDAMENTO</a>
                    </td>
                  </tr>
                </table>
                """.formatted(
                BRAND_BROWN,
                tituloEvento,
                nome,
                BRAND_ORANGE,
                dataHoraFormatada,
                BRAND_BROWN,
                linkGerenciamento
        );
        return render(tituloEvento, conteudo, siteName, siteUrl);
    }

    public String renderVisitaCancelamento(
            String nome,
            String dataHoraFormatada,
            String siteName,
            String siteUrl
    ) {
        String conteudo = """
                <h2 style="margin:0 0 16px;color:%s;font-size:22px;">Visita cancelada</h2>
                <p style="margin:0 0 16px;">Olá, <strong>%s</strong>.</p>
                <p style="margin:0 0 8px;">Confirmamos o cancelamento da visita prevista para <strong>%s</strong>.</p>
                <p style="margin:0;">Para agendar novamente, entre em contato conosco pelo WhatsApp.</p>
                """.formatted(BRAND_BROWN, nome, dataHoraFormatada);
        return render("Visita cancelada", conteudo, siteName, siteUrl);
    }
}
