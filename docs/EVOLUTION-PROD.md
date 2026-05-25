# Evolution API em produção (Railway)

WhatsApp fora do `localhost`: Evolution com URL pública + backend Railway + n8n Cloud.

```
┌─────────────┐     HTTPS      ┌──────────────────┐
│ Backend     │───────────────►│ Evolution API    │
│ (Railway)   │  sendText      │ (Railway/VPS)    │
└──────┬──────┘                └────────┬─────────┘
       │ webhook                       │ MESSAGES_UPSERT
       ▼                               ▼
┌─────────────┐                ┌──────────────────┐
│ n8n Cloud   │◄───────────────│ webhook público  │
└─────────────┘                └──────────────────┘
```

**Bancos separados:** `canil_app` (backend) ≠ `evolution` (Evolution) ≠ n8n DB.

---

## 1. Novo serviço no Railway — Evolution API

Crie um **projeto ou serviços** dedicados (não misture com o Postgres do canil).

### 1.1 PostgreSQL da Evolution

1. **Add PostgreSQL** → nome ex.: `evolution-db`
2. Anote `DATABASE_URL` (uso interno)

### 1.2 Serviço Evolution API

1. **New Service** → **Deploy from Docker Image**
2. Image: `evoapicloud/evolution-api:v2.3.7`
3. **Volume** (obrigatório para não perder sessão WhatsApp):
   - Mount path: `/evolution/instances`
4. **Networking:** gere domínio público → ex. `https://canil-evolution.up.railway.app`
5. Porta do container: **8080** (Evolution escuta 8080)

### 1.3 Variáveis do serviço Evolution

Gere API key: `openssl rand -hex 32`

Substitua `https://SUA-EVOLUTION.up.railway.app` pela URL real.

```env
SERVER_TYPE=http
SERVER_PORT=8080
SERVER_URL=https://SUA-EVOLUTION.up.railway.app

AUTHENTICATION_API_KEY=<sua-api-key-forte>
AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true

LANGUAGE=pt-BR

DATABASE_ENABLED=true
DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=${{ evolution-db.DATABASE_URL }}
DATABASE_CONNECTION_CLIENT_NAME=canil_evolution

CACHE_LOCAL_ENABLED=true
CACHE_REDIS_ENABLED=false

DEL_INSTANCE=false
QRCODE_LIMIT=30
CONFIG_SESSION_PHONE_CLIENT=Chrome
CONFIG_SESSION_PHONE_NAME=Chrome
```

> Se `DATABASE_URL` do Railway vier como `postgresql://`, a Evolution v2 aceita direto. Se falhar, converta para URI completa com `?schema=public`.

### 1.4 Health

Abra no navegador (ou curl):

```bash
curl -s https://SUA-EVOLUTION.up.railway.app
```

Deve responder JSON da API (não 502).

---

## 2. Conectar WhatsApp (produção)

No seu PC (apontando para a URL pública):

```bash
cd /caminho/do/canil

export EVOLUTION_API_URL=https://SUA-EVOLUTION.up.railway.app
export EVOLUTION_API_KEY=<mesma-key-do-passo-1.3>
export EVOLUTION_INSTANCE=canil

# Recomendado: código de pareamento (DDI+DDD+número, só dígitos)
./scripts/evolution-conectar-whatsapp.sh 5521XXXXXXXXX
```

Alternativa: acesse o **Evolution Manager** se expuser porta 3000 em outro host — em Railway costuma ser só API na 8080; o script acima é o mais simples.

Confirme `state=open`:

```bash
curl -s "$EVOLUTION_API_URL/instance/connectionState/canil" \
  -H "apikey: $EVOLUTION_API_KEY" | jq .
```

Teste envio:

```bash
curl -X POST "$EVOLUTION_API_URL/message/sendText/canil" \
  -H "apikey: $EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"number":"5521XXXXXXXXX","text":"Teste Canil produção"}'
```

---

## 3. Webhook Evolution → n8n Cloud

Mensagens recebidas no WhatsApp devem ir para o n8n:

```bash
export EVOLUTION_API_URL=https://SUA-EVOLUTION.up.railway.app
export EVOLUTION_API_KEY=<sua-api-key>
export N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens

./scripts/evolution-webhook-whatsapp.sh
```

No n8n, workflow **WhatsApp entrada** ativo e nó HTTP apontando para:

`https://canil-production.up.railway.app/api/webhooks/n8n/whatsapp/processar`

(com header `X-Webhook-Secret` = `N8N_WEBHOOK_SECRET` do Railway)

---

## 4. Variáveis no backend (Railway — serviço canil)

```env
EVOLUTION_ENABLED=true
EVOLUTION_BASE_URL=https://SUA-EVOLUTION.up.railway.app
EVOLUTION_API_KEY=<mesma-api-key-da-evolution>
EVOLUTION_INSTANCE=canil

# PDF no WhatsApp (filhotes) — URL pública da API Spring
CANIL_DOCS_BASE_URL=https://canil-production.up.railway.app

# Modo recomendado (igual dev): Spring envia WhatsApp direto na Evolution
N8N_VISITA_VIA_EVOLUTION=true
N8N_FILHOTE_VIA_N8N=false

# n8n continua para outros fluxos / lembrete cron se N8N_VISITA_VIA_EVOLUTION=false no lembrete
N8N_ENABLED=true
N8N_WEBHOOK_SECRET=<secret>
N8N_WEBHOOK_URL_VISITA=https://vinicim003.app.n8n.cloud/webhook/canil-visita-eventos
```

**Redeploy** do backend.

| Flag | Efeito |
|------|--------|
| `N8N_VISITA_VIA_EVOLUTION=true` | Visita criada/reagendada → Spring → Evolution (não depende do nó HTTP no n8n) |
| `N8N_VISITA_VIA_EVOLUTION=false` | Spring → n8n → nó **Evolution WhatsApp** no workflow (URL pública da Evolution no n8n) |

Respostas a intents (`alterar visita`, `cancelar`, `reservar filhote`) **sempre** usam Evolution no Spring → `EVOLUTION_ENABLED=true` é obrigatório.

---

## 5. Ajustar workflow n8n (se usar `N8N_VISITA_VIA_EVOLUTION=false`)

No workflow **Eventos de visita**, nó **Evolution WhatsApp**:

| Campo | Valor |
|-------|--------|
| URL | `https://SUA-EVOLUTION.up.railway.app/message/sendText/canil` |
| Header `apikey` | mesma `EVOLUTION_API_KEY` |

Body (já no JSON): `{ "number": "...", "text": "..." }`

---

## 6. Testes ponta a ponta

| Teste | Esperado |
|-------|----------|
| Agendar visita no site | E-mail Resend + WhatsApp (se número válido) |
| Logs backend `[Evolution] Texto enviado` | OK |
| WhatsApp: "cancelar agendamento" | Resposta automática com link |
| Site: reservar filhote | Mensagem + PDF no Zap |
| n8n Executions | Webhooks com sucesso |

---

## 7. Problemas comuns

| Sintoma | Solução |
|---------|---------|
| `Connection refused` / timeout do backend | `EVOLUTION_BASE_URL` errada ou Evolution offline |
| QR não conecta | Use pareamento por código; volume `/evolution/instances` montado |
| Evolution reinicia e perde Zap | Falta volume persistente |
| n8n não recebe mensagens | Rode `evolution-webhook-whatsapp.sh` com URL n8n **cloud** |
| PDF não abre no Zap | `CANIL_DOCS_BASE_URL` = URL pública do backend |
| Duas mensagens iguais | `N8N_VISITA_VIA_EVOLUTION=true` **e** nó Evolution no n8n ativos — use só um caminho |

---

## 8. Checklist

- [ ] Postgres `evolution` separado
- [ ] Evolution API com domínio público HTTPS
- [ ] Volume `/evolution/instances`
- [ ] WhatsApp `state=open`
- [ ] Webhook → n8n cloud configurado
- [ ] Backend: `EVOLUTION_*` + `CANIL_DOCS_BASE_URL`
- [ ] `N8N_VISITA_VIA_EVOLUTION=true` (recomendado) ou n8n HTTP atualizado
- [ ] Teste `sendText` via curl

Guia n8n: [N8N-CLOUD.md](./N8N-CLOUD.md)
