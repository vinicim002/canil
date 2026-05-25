# n8n Cloud — Canil (vinicim003.app.n8n.cloud)

Guia para conectar [n8n Cloud](https://vinicim003.app.n8n.cloud/) ao backend Railway e (opcional) Evolution API.

---

## 1. Gerar o secret compartilhado

No terminal:

```bash
openssl rand -hex 32
```

Use o **mesmo valor** em:

- Railway → `N8N_WEBHOOK_SECRET`
- Cada nó HTTP no n8n → header `X-Webhook-Secret`

---

## 2. Variáveis no Railway (backend)

```env
N8N_ENABLED=true
N8N_WEBHOOK_SECRET=<o valor gerado acima>

N8N_WEBHOOK_URL_VISITA=https://vinicim003.app.n8n.cloud/webhook/canil-visita-eventos
N8N_WEBHOOK_URL_FILHOTE=https://vinicim003.app.n8n.cloud/webhook/canil-filhote-resposta

MAIL_SITE_URL=https://canil-sooty.vercel.app
VISITA_SITE_URL=https://canil-sooty.vercel.app
VISITA_WHATSAPP_SITE_URL=https://canil-sooty.vercel.app
CANIL_DOCS_BASE_URL=https://canil-production.up.railway.app
```

Redeploy do backend após salvar.

---

## 3. Importar workflows no n8n

1. Abra https://vinicim003.app.n8n.cloud/
2. **Workflows** → **Import from File**
3. Importe (pasta `n8n/` do repositório):
   - `workflow-visita-eventos.example.json`
   - `workflow-visita-lembretes.example.json`
   - `workflow-whatsapp-entrada.example.json`

---

## 4. Ajustar URLs nos workflows (produção)

Substitua `host.docker.internal` e `http://evolution-api:8080` pelos hosts reais.

### Workflow «Eventos de visita»

| Nó | Campo | Valor produção |
|----|--------|----------------|
| Webhook Spring | Path | `canil-visita-eventos` (já no JSON) |
| Evolution WhatsApp | URL | URL pública da **Evolution API** + instance |

URL do webhook (copie em Railway `N8N_WEBHOOK_URL_VISITA`):

```
https://vinicim003.app.n8n.cloud/webhook/canil-visita-eventos
```

> Ative o workflow (toggle verde) para a URL de produção funcionar.

### Workflow «Lembretes de visita» (cron)

| Nó | Campo | Valor |
|----|--------|--------|
| Spring processar lembretes | URL | `https://canil-production.up.railway.app/api/webhooks/n8n/visitas/lembretes/processar?horas=24` |
| Spring processar lembretes | Header | `X-Webhook-Secret` = mesmo do Railway |

### Workflow «WhatsApp entrada»

| Nó | Campo | Valor |
|----|--------|--------|
| Webhook Evolution | Path | `canil-whatsapp-mensagens` |
| Spring processar intent | URL | `https://canil-production.up.railway.app/api/webhooks/n8n/whatsapp/processar` |
| Spring processar intent | Header | `X-Webhook-Secret` |

URL para configurar na Evolution (webhook de mensagens):

```
https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens
```

---

## 5. Evolution API (WhatsApp)

O n8n Cloud **não** alcança `localhost` nem `evolution-api` do Docker.

Você precisa de Evolution em URL pública, por exemplo:

- Outro serviço no Railway, ou
- VPS / Docker com domínio HTTPS

No Railway (quando tiver Evolution):

```env
EVOLUTION_ENABLED=true
EVOLUTION_BASE_URL=https://sua-evolution.railway.app
EVOLUTION_API_KEY=<api key da instância>
EVOLUTION_INSTANCE=canil
```

No n8n, nó **Evolution WhatsApp** do workflow de eventos:

```
POST https://sua-evolution.railway.app/message/sendText/canil
Header: apikey: <EVOLUTION_API_KEY>
Body: { "number": "...", "text": "..." }
```

---

## 6. Testar integração

### Spring → n8n (evento de visita)

1. Agende uma visita no site [canil-sooty.vercel.app](https://canil-sooty.vercel.app/)
2. No n8n → **Executions** — deve aparecer execução no workflow de eventos
3. Se Evolution estiver OK, mensagem no WhatsApp

### n8n → Spring (lembretes)

1. Ative workflow de lembretes
2. Execute manualmente o nó HTTP ou aguarde o cron
3. Logs Railway: processamento de lembretes

### Secret inválido

Resposta `401` ou `403` no webhook Spring → confira `N8N_WEBHOOK_SECRET` igual nos dois lados.

---

## 7. Checklist

- [ ] `N8N_ENABLED=true` no Railway
- [ ] `N8N_WEBHOOK_SECRET` igual no n8n e Railway
- [ ] URLs dos webhooks com domínio `vinicim003.app.n8n.cloud`
- [ ] Workflows **ativos** (toggle verde)
- [ ] HTTP nodes apontam para `canil-production.up.railway.app`
- [ ] Evolution público (se quiser WhatsApp de verdade)
- [ ] `MAIL_SITE_URL` / `VISITA_SITE_URL` = Vercel
