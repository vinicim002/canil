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

O n8n Cloud **não** alcança `localhost`. Deploy da Evolution: **[EVOLUTION-PROD.md](./EVOLUTION-PROD.md)**.

Resumo no backend:

```env
EVOLUTION_ENABLED=true
EVOLUTION_BASE_URL=https://sua-evolution.railway.app
EVOLUTION_API_KEY=<api key>
EVOLUTION_INSTANCE=canil
N8N_VISITA_VIA_EVOLUTION=true
CANIL_DOCS_BASE_URL=https://canil-production.up.railway.app
```

Webhook mensagens recebidas (no seu PC, após Evolution no ar):

```bash
EVOLUTION_API_URL=https://sua-evolution.railway.app \
N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens \
./scripts/evolution-webhook-prod.sh
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

### WhatsApp recebido (Evolution → n8n → Spring)

Fluxo:

```
Celular → Evolution (MESSAGES_UPSERT) → n8n webhook → Spring /whatsapp/processar → Evolution (resposta)
```

1. **Workflow «WhatsApp entrada»** ativo no n8n; nó HTTP com:
   - URL: `https://canil-production.up.railway.app/api/webhooks/n8n/whatsapp/processar`
   - Header `X-Webhook-Secret` = `N8N_WEBHOOK_SECRET` do Railway
2. Configure o webhook na Evolution:

```bash
export EVOLUTION_API_URL=https://evolution-api-production-6e8f.up.railway.app
export EVOLUTION_API_KEY=<sua-key>
export N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens
CONFIGURAR_WEBHOOK=1 ./scripts/test-webhook-whatsapp.sh
```

3. Teste automático (Spring sem passar pelo Zap):

```bash
export N8N_WEBHOOK_SECRET=<mesmo-do-railway>
export TELEFONE_TESTE=5521XXXXXXXXX   # número que tem visita ativa no banco
export INTENT_TEXTO="alterar agendamento"
./scripts/test-webhook-whatsapp.sh
```

4. Teste real: envie **do seu celular** para o WhatsApp do canil uma das frases:
   - `alterar agendamento` / `reagendar`
   - `cancelar agendamento`
   - `reservar filhote`

   | Onde olhar | Esperado |
   |------------|----------|
   | n8n Executions | Workflow «WhatsApp entrada» com sucesso |
   | Railway logs | `[WhatsApp intent] ALTERAR` (ou CANCELAR / RESERVAR_FILHOTE) |
   | WhatsApp | Resposta automática com link(s) |

> Mensagens **enviadas pelo próprio canil** (`fromMe`) são ignoradas no n8n — teste sempre **recebendo** do cliente.

### Só tenho um celular (o mesmo do WhatsApp do canil)

Isso é comum: o número **pareado na Evolution** é o WhatsApp do negócio. Você **não** consegue “fingir cliente” mandando mensagem desse mesmo aparelho — o WhatsApp trata como enviada por você (`fromMe`) e o workflow **não processa**.

**Opções:**

| Opção | O que testa |
|--------|-------------|
| **A) Simular no n8n** | Evolution → n8n → Spring → resposta no Zap do número da visita |
| **B) curl no Spring** | Só Spring → Evolution (sem n8n) |
| **C) Outro celular** | Fluxo real ponta a ponta |

**A — Simular mensagem recebida** (telefone = o que está na visita no banco):

```bash
export N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens
export TELEFONE_REMETENTE=5521XXXXXXXXX
export TEXTO_MENSAGEM="cancelar agendamento"
./scripts/simular-mensagem-whatsapp-n8n.sh
```

**B — Direto no backend** (mais rápido):

```bash
export N8N_WEBHOOK_SECRET=<railway>
export TELEFONE_TESTE=5521XXXXXXXXX
export INTENT_TEXTO="cancelar agendamento"
./scripts/test-webhook-whatsapp.sh
```

**C — Visita com número de familiar:** agende no site com o WhatsApp de outra pessoa; essa pessoa manda `cancelar agendamento` para o número do canil.

> Se você agendou visita usando o **número do canil** (5521…), o cancelamento por intent só acha essa visita para **esse** telefone — mas esse número não pode “receber” mensagem de si mesmo no Zap. Agende de novo com outro número ou use A/B com `TELEFONE_REMETENTE` igual ao da visita.

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
