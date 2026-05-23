package com.vinicius.backend.infrastructure.email;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.domain.contato.dto.ContatoRequest;
import com.vinicius.backend.domain.visita.dto.VisitaResponse;
import com.vinicius.backend.infrastructure.n8n.TipoEventoVisita;
import com.vinicius.backend.shared.exception.BusinessException;

import java.time.format.DateTimeFormatter;
import java.util.Locale;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class EmailService {

    private final Optional<JavaMailSender> mailSender;
    private final MailProperties mailProperties;
    private final EmailTemplateRenderer templateRenderer;
    private final ResendEmailClient resendEmailClient;

    @Autowired
    public EmailService(
            Optional<JavaMailSender> mailSender,
            MailProperties mailProperties,
            EmailTemplateRenderer templateRenderer,
            ResendEmailClient resendEmailClient
    ) {
        this.mailSender = mailSender;
        this.mailProperties = mailProperties;
        this.templateRenderer = templateRenderer;
        this.resendEmailClient = resendEmailClient;
    }

    public void enviarAprovacaoCliente(String nome, String emailDestino) {
        String html = templateRenderer.renderAprovacao(
                nome,
                mailProperties.getSiteName(),
                mailProperties.getSiteUrl()
        );
        enviar(emailDestino, "Sua conta foi aprovada — " + mailProperties.getSiteName(), html);
    }

    public void enviarConfirmacaoVisita(VisitaResponse visita, TipoEventoVisita evento) {
        String titulo = switch (evento) {
            case VISITA_CRIADA -> "Visita agendada";
            case VISITA_REAGENDADA -> "Visita reagendada";
            case VISITA_CONFIRMADA -> "Visita confirmada";
            default -> "Atualização da sua visita";
        };
        String dataFormatada = visita.dataHora()
                .format(DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm", new Locale("pt", "BR")));
        String html = templateRenderer.renderVisitaConfirmacao(
                visita.nome(),
                dataFormatada,
                visita.linkGerenciamento(),
                titulo,
                mailProperties.getSiteName(),
                mailProperties.getSiteUrl()
        );
        enviarSilencioso(visita.email(), titulo + " — " + mailProperties.getSiteName(), html);
    }

    public void enviarCancelamentoVisita(VisitaResponse visita) {
        String dataFormatada = visita.dataHora()
                .format(DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm", new Locale("pt", "BR")));
        String html = templateRenderer.renderVisitaCancelamento(
                visita.nome(),
                dataFormatada,
                mailProperties.getSiteName(),
                mailProperties.getSiteUrl()
        );
        enviarSilencioso(visita.email(), "Visita cancelada — " + mailProperties.getSiteName(), html);
    }

    public void enviarRecuperacaoSenha(String nome, String emailDestino, String linkRedefinicao) {
        String html = templateRenderer.renderRecuperacaoSenha(
                nome,
                linkRedefinicao,
                mailProperties.getSiteName(),
                mailProperties.getSiteUrl()
        );
        enviarSilencioso(emailDestino, "Recuperação de senha — " + mailProperties.getSiteName(), html);
    }

    public void enviarContato(ContatoRequest request) {
        Map<String, String> dados = Map.of(
                "nome", request.nome(),
                "email", request.email(),
                "telefone", request.telefone() != null ? request.telefone() : "—",
                "assunto", request.assunto(),
                "mensagem", request.mensagem()
        );
        String html = templateRenderer.renderContato(
                dados,
                mailProperties.getSiteName(),
                mailProperties.getSiteUrl()
        );
        enviar(mailProperties.getAdmin(), "Contato: " + request.assunto(), html);
    }

    private void enviar(String para, String assunto, String html) {
        if (!enviarSilencioso(para, assunto, html)) {
            throw new BusinessException("Não foi possível enviar o e-mail. Tente novamente mais tarde.");
        }
    }

    /** @return true se enviou ou estava desabilitado; false se falhou */
    private boolean enviarSilencioso(String para, String assunto, String html) {
        if (!mailProperties.isEnabled()) {
            log.info("[Email desabilitado] Assunto: {}", assunto);
            return true;
        }

        if (mailProperties.isResend()) {
            return resendEmailClient.enviar(para, assunto, html);
        }

        if (mailSender.isEmpty()) {
            log.warn("[Email SMTP] JavaMailSender não configurado");
            return false;
        }

        try {
            MimeMessage message = mailSender.get().createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(mailProperties.getFrom());
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(html, true);
            mailSender.get().send(message);
            log.info("[SMTP] E-mail enviado");
            return true;
        } catch (MessagingException e) {
            log.error("[SMTP] Falha ao enviar e-mail: {}", e.getMessage());
            return false;
        }
    }
}
