package com.vinicius.backend.infrastructure.email;

import com.vinicius.backend.config.MailProperties;
import com.vinicius.backend.domain.contato.dto.ContatoRequest;
import com.vinicius.backend.shared.exception.BusinessException;
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

    @Autowired
    public EmailService(
            Optional<JavaMailSender> mailSender,
            MailProperties mailProperties,
            EmailTemplateRenderer templateRenderer
    ) {
        this.mailSender = mailSender;
        this.mailProperties = mailProperties;
        this.templateRenderer = templateRenderer;
    }

    public void enviarAprovacaoCliente(String nome, String emailDestino) {
        String html = templateRenderer.renderAprovacao(
                nome,
                mailProperties.getSiteName(),
                mailProperties.getSiteUrl()
        );
        enviar(emailDestino, "Sua conta foi aprovada — " + mailProperties.getSiteName(), html);
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
        if (!mailProperties.isEnabled() || mailSender.isEmpty()) {
            log.info("[Email desabilitado] Para: {} | Assunto: {}", para, assunto);
            return;
        }

        try {
            MimeMessage message = mailSender.get().createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(mailProperties.getFrom());
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(html, true);
            mailSender.get().send(message);
            log.info("E-mail enviado para {}", para);
        } catch (MessagingException e) {
            log.error("Falha ao enviar e-mail para {}: {}", para, e.getMessage());
            throw new BusinessException("Não foi possível enviar o e-mail. Tente novamente mais tarde.");
        }
    }
}
