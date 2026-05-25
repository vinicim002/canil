# Resend — e-mail em produção

Guia para ativar e-mail no Canil via [Resend](https://resend.com) + Railway.

**O que envia e-mail hoje:**

| Evento | Destinatário |
|--------|----------------|
| Aprovação de conta cliente | Cliente |
| Recuperação de senha | Usuário |
| Formulário de contato | `MAIL_ADMIN` |
| Confirmação/cancelamento de visita | Cliente (se `VISITA_NOTIFICAR_EMAIL=true`) |

---

## 1. Conta e API Key

1. Acesse [resend.com](https://resend.com) → **Sign up**
2. **API Keys** → **Create API Key**
   - Nome: `canil-production`
   - Permissão: **Sending access** (ou Full access)
3. Copie a key (`re_...`) — aparece **só uma vez**

---

## 2. Domínio de envio

O `MAIL_FROM` **precisa** usar um domínio verificado no Resend.

### Opção A — Domínio próprio (recomendado)

Ex.: você tem `canilaltodabelavista.com.br`

1. Resend → **Domains** → **Add Domain**
2. Informe o domínio (ex.: `canilaltodabelavista.com.br` ou subdomínio `mail.canil...`)
3. Resend mostra registros DNS — adicione no provedor do domínio:

| Tipo | Uso |
|------|-----|
| **TXT** (SPF) | Autorizar Resend a enviar |
| **CNAME** (DKIM) | Assinatura do e-mail |
| **TXT** (DMARC) | Opcional, recomendado |

4. Aguarde status **Verified** (pode levar minutos ou até 48h)

**MAIL_FROM sugerido:**

```env
MAIL_FROM=Canil Alto da Bela Vista <noreply@seudominio.com>
```

### Opção B — Sem domínio próprio (teste / MVP)

Resend permite enviar de `onboarding@resend.dev` **somente para o e-mail da conta Resend** (sandbox).

```env
MAIL_FROM=onboarding@resend.dev
MAIL_ADMIN=seu-email@gmail.com
```

- Serve para **testar** contato, forgot-password, aprovação — desde que o destinatário seja **o mesmo e-mail** cadastrado no Resend.
- **Não envia** para clientes com outro e-mail (@gmail de visitante, etc.).

**Alternativa sem domínio e enviando para qualquer pessoa:** Gmail SMTP no Railway (seção abaixo).

### Opção C — Gmail SMTP no Railway (sem domínio, e-mails reais)

Igual ao dev, mas no Railway. Limite ~500/dia do Gmail; ok para canil pequeno.

```env
MAIL_ENABLED=true
MAIL_PROVIDER=smtp
MAIL_FROM=seu@gmail.com
MAIL_ADMIN=seu@gmail.com
MAIL_SITE_URL=https://canil-sooty.vercel.app

SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=seu@gmail.com
SPRING_MAIL_PASSWORD=<senha de app do Google>
```

Senha de app: Google Account → Segurança → Verificação em 2 etapas → Senhas de app.

**Não** use `MAIL_PROVIDER=resend` neste modo.

### Opção D — Comprar domínio barato (recomendado depois)

~R$ 40/ano (Registro.br, Cloudflare, etc.) + verificar no Resend → envia para **qualquer** e-mail com cara profissional (`noreply@seudominio.com`).

---

## 3. Variáveis no Railway (backend)

Cole no serviço **backend** → **Variables**:

```env
MAIL_ENABLED=true
MAIL_PROVIDER=resend
RESEND_API_KEY=re_SUA_KEY_AQUI

MAIL_FROM=Canil Alto da Bela Vista <noreply@seudominio.com>
MAIL_ADMIN=seu-email@gmail.com

MAIL_SITE_NAME=Canil Alto da Bela Vista
MAIL_SITE_URL=https://canil-sooty.vercel.app

VISITA_NOTIFICAR_EMAIL=true
VISITA_SITE_URL=https://canil-sooty.vercel.app
```

**Redeploy** do backend após salvar.

### Mapeamento properties ↔ env

| Variável Railway | Property |
|------------------|----------|
| `MAIL_ENABLED` | `app.mail.enabled` |
| `MAIL_PROVIDER` | `app.mail.provider` (`resend`) |
| `RESEND_API_KEY` | `app.mail.resend-api-key` |
| `MAIL_FROM` | `app.mail.from` |
| `MAIL_ADMIN` | `app.mail.admin` |
| `MAIL_SITE_URL` | `app.mail.site-url` |
| `MAIL_SITE_NAME` | `app.mail.site-name` |
| `VISITA_NOTIFICAR_EMAIL` | `app.visita.notificar-email` |

---

## 4. Testar

### A) Formulário de contato (site → admin)

1. Abra https://canil-sooty.vercel.app
2. Envie mensagem pelo formulário de contato
3. Verifique a caixa de `MAIL_ADMIN`
4. Logs Railway: `[Resend] E-mail enviado`

### B) Recuperação de senha

1. https://canil-sooty.vercel.app/login → **Esqueci a senha**
2. Use e-mail de usuário **cadastrado e aprovado** no banco
3. Link deve apontar para `https://canil-sooty.vercel.app/redefinir-senha?token=...`

### C) Aprovação de cliente

1. Admin aprova usuário pendente no painel
2. Cliente recebe e-mail de aprovação

### D) Visita agendada

1. Agende visita no site (e-mail real seu)
2. Com `VISITA_NOTIFICAR_EMAIL=true`, recebe confirmação

---

## 5. Logs e erros comuns

| Log / sintoma | Causa | Solução |
|---------------|--------|---------|
| `[Resend] RESEND_API_KEY não configurada` | Key ausente | `RESEND_API_KEY` no Railway |
| `[Resend] Falha ao enviar` + 403 | Domínio não verificado | Verificar domínio no Resend |
| `[Resend] Falha` + 422 invalid from | `MAIL_FROM` fora do domínio | Usar `@seudominio.com` verificado |
| E-mail não chega | Sandbox / spam | Domínio verificado; checar spam |
| `[Email desabilitado]` | `MAIL_ENABLED=false` | `MAIL_ENABLED=true` |
| Link de senha errado | `MAIL_SITE_URL` antigo | `https://canil-sooty.vercel.app` |

Resend → **Emails** → lista de envios e status (delivered, bounced, etc.).

---

## 6. Checklist

- [ ] API Key `re_...` criada
- [ ] Domínio **Verified** no Resend (ou teste com `onboarding@resend.dev`)
- [ ] Railway: `MAIL_ENABLED=true`, `MAIL_PROVIDER=resend`, `RESEND_API_KEY`
- [ ] `MAIL_FROM` com domínio verificado
- [ ] `MAIL_ADMIN` = e-mail que você lê
- [ ] `MAIL_SITE_URL` = https://canil-sooty.vercel.app
- [ ] `VISITA_NOTIFICAR_EMAIL=true` (se quiser e-mail de visita)
- [ ] Redeploy backend
- [ ] Teste contato ou forgot-password

---

## 7. Segurança

- Nunca commite `RESEND_API_KEY` no Git
- Rotacione a key se vazar
- `MAIL_ADMIN` recebe dados do formulário de contato — use e-mail profissional
