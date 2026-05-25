# Gmail SMTP no Railway

Envio de e-mail **sem domínio próprio**, usando sua conta Google.

> **Atenção:** o Railway costuma **bloquear saída SMTP** (`smtp.gmail.com:587` / `:465`).
> Erro típico: `ConnectException: Operation timed out` ou `MailConnectException`.
> Nesse caso **Gmail SMTP não funciona** no backend em produção — use **[Resend](./RESEND.md)** (`MAIL_PROVIDER=resend`), que usa HTTPS e não é bloqueado.

---

## 1. Senha de app do Google

1. [Google Account](https://myaccount.google.com) → **Segurança**
2. Ative **Verificação em duas etapas** (obrigatório)
3. **Senhas de app** → app **Mail** → dispositivo **Other** → nome `Canil Railway`
4. Copie a senha de 16 caracteres (ex.: `abcd efgh ijkl mnop`)

Não use a senha normal do Gmail.

---

## 2. Variáveis no Railway (backend)

```env
MAIL_ENABLED=true
MAIL_PROVIDER=smtp

MAIL_FROM=seu@gmail.com
MAIL_ADMIN=seu@gmail.com

MAIL_SITE_NAME=Canil Alto da Bela Vista
MAIL_SITE_URL=https://canil-sooty.vercel.app
VISITA_SITE_URL=https://canil-sooty.vercel.app
VISITA_NOTIFICAR_EMAIL=true

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu@gmail.com
MAIL_PASSWORD=abcdefghijklmnop
```

> Se `VISITA_NOTIFICAR_EMAIL` estiver ausente, o backend usa o mesmo valor de `MAIL_ENABLED` (após redeploy com a property atualizada).

- `MAIL_PASSWORD`: senha de app **sem espaços** (ou com espaços — o Spring aceita os dois formatos na maioria dos casos; se falhar, remova espaços)
- `MAIL_FROM` e `MAIL_USERNAME`: **mesmo** e-mail Gmail
- **Não** defina `RESEND_API_KEY` nem `MAIL_PROVIDER=resend`

**Redeploy** do backend.

---

## 3. Testar

| Teste | Como |
|-------|------|
| Contato | Formulário no site → chega em `MAIL_ADMIN` |
| Senha | Login → Esqueci a senha → e-mail do usuário cadastrado |
| Visita | Agendar visita com seu e-mail |

Logs Railway: `[SMTP] E-mail enviado`

---

## 4. E-mail de agendamento de visita

O site salva em `visita_agendamentos`, mas o e-mail só sai se **todas** estiverem true/configuradas:

```env
MAIL_ENABLED=true
VISITA_NOTIFICAR_EMAIL=true
MAIL_PROVIDER=smtp
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM=mesmo@gmail.com
```

Nos logs Railway após agendar:

| Log | Significado |
|-----|-------------|
| `[Email visita] Desabilitado` | Falta `VISITA_NOTIFICAR_EMAIL=true` |
| `[Email desabilitado]` | Falta `MAIL_ENABLED=true` |
| `[Email SMTP] JavaMailSender ausente` | Falta `MAIL_USERNAME` / `MAIL_PASSWORD` |
| `[SMTP] E-mail enviado para` | OK |
| `[SMTP] Falha para` | Senha de app ou `MAIL_FROM` errado |
| Stack trace enorme no POST | Gmail rejeitou envio — veja linha `[SMTP] Falha` acima |

**Gmail:** `MAIL_FROM` deve ser o **mesmo** e-mail de `MAIL_USERNAME`.

---

## 5. Problemas comuns

| Erro | Solução |
|------|---------|
| `Authentication failed` | Senha de app errada ou 2FA desligado |
| `JavaMailSender não configurado` | Faltam `MAIL_USERNAME` / `MAIL_PASSWORD` |
| `[Email desabilitado]` | `MAIL_ENABLED=false` |
| E-mail na spam | Normal com Gmail; peça para marcar como não spam |
| `535-5.7.8` | Conta Google bloqueou — gere nova senha de app |
| `Operation timed out` em `smtp.gmail.com:587` | **Railway bloqueia SMTP** → migre para Resend |

---

## 6. Depois (opcional)

Quando tiver domínio, migre para Resend: [RESEND.md](./RESEND.md) (`MAIL_PROVIDER=resend`).
