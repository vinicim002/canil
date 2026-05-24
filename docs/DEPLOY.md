# Deploy — Canil Alto da Bela Vista

Guia de deploy em produção: **Vercel** (front) + **Railway** (API + PostgreSQL).

---

## Ordem recomendada

```
1. PostgreSQL (Railway) — banco canil_app
2. Backend (Railway)     — Flyway roda no boot
3. Resend                — verificar domínio + DNS
4. Evolution API         — banco próprio + parear WhatsApp
5. n8n Cloud             — importar workflows, configurar secrets
6. Front-end (Vercel)    — VITE_API_URL apontando para API
7. Smoke test            — /api/health + login + agendamento
```

Deploy **backend antes do front** se mudar contratos de API. Só mudou UI? Front pode ir primeiro.

---

## 1. PostgreSQL (Railway)

1. New Project → **Add PostgreSQL**
2. Nome sugerido: `canil-app-db`
3. Copie `DATABASE_URL` ou monte JDBC:
   ```
   DB_URL=jdbc:postgresql://HOST:PORT/railway
   DB_USERNAME=postgres
   DB_PASSWORD=...
   ```

**Importante:** n8n e Evolution usam **bancos separados** (não compartilhar com `canil_app`).

---

## 2. Backend (Railway)

### Configuração do serviço

| Campo | Valor |
|-------|--------|
| Root Directory | `backend` |
| Builder | Dockerfile (`backend/Dockerfile`) |
| Health Check | `/api/health` |
| Port | `8080` |

O arquivo `backend/railway.toml` já define health check e Dockerfile.

O `application-prod.properties` **fica no repositório** (só placeholders `${VAR}` — sem segredos). O Railway precisa de **commit + redeploy** para incluí-lo no JAR.

### Variáveis obrigatórias

Use `backend/.env.example` como referência. Mínimo para subir:

```env
SPRING_PROFILES_ACTIVE=prod

JWT_SECRET=          # openssl rand -base64 32 — SEM ISSO A APP NÃO SOBE
CORS_ALLOWED_ORIGINS=https://seu-app.vercel.app
```

**Banco:** no serviço backend, use **Variables → Add Reference** e linke o Postgres (`DATABASE_URL`, `PGUSER`, `PGPASSWORD`). O app converte `DATABASE_URL` automaticamente.

Integrações opcionais no início:

```env
MAIL_ENABLED=false
N8N_ENABLED=false
EVOLUTION_ENABLED=false
```

Variáveis completas (Resend, Cloudinary, n8n, Evolution):

```env
MAIL_PROVIDER=resend
RESEND_API_KEY=re_...
MAIL_FROM=Canil <noreply@seudominio.com>
MAIL_ADMIN=admin@seudominio.com
MAIL_SITE_URL=https://seu-app.vercel.app
VISITA_SITE_URL=https://seu-app.vercel.app
VISITA_WHATSAPP_SITE_URL=https://seu-app.vercel.app

N8N_WEBHOOK_SECRET=...
N8N_WEBHOOK_URL_VISITA=...
EVOLUTION_BASE_URL=...
EVOLUTION_API_KEY=...
CANIL_WHATSAPP_NUMERO=...
CANIL_DOCS_BASE_URL=https://sua-api.railway.app

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Verificar deploy

```bash
curl https://sua-api.railway.app/api/health
# {"status":"UP","db":"UP",...}
```

---

## 3. Front-end (Vercel)

### Configuração

| Campo | Valor |
|-------|--------|
| Root Directory | `frontend` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### Variável de ambiente (Production)

```env
VITE_API_URL=https://sua-api.railway.app/api
```

**Build-time:** alterar `VITE_API_URL` exige **novo deploy** na Vercel.

O `frontend/vercel.json` configura SPA fallback (`/*` → `index.html`).

### Domínio custom (opcional)

1. Vercel → Domains → adicionar domínio
2. Atualizar no Railway:
   - `CORS_ALLOWED_ORIGINS`
   - `MAIL_SITE_URL`, `VISITA_SITE_URL`, etc.

---

## 4. n8n (cloud)

1. Importar workflows de `n8n/workflow-*.example.json`
2. Configurar variáveis:
   - URL da API Railway
   - `X-Webhook-Secret` = mesmo valor de `N8N_WEBHOOK_SECRET`
3. Ativar workflows (toggle verde)
4. Banco do n8n: **usar o PostgreSQL incluso do n8n cloud** (não o `canil_app`)

---

## 5. Evolution API

- Banco PostgreSQL **dedicado** (Railway ou Docker)
- `CANIL_DOCS_BASE_URL` = URL pública da API (PDFs no WhatsApp)
- Webhook Evolution → n8n → backend

---

## 6. Resend (e-mail)

1. Criar conta em [resend.com](https://resend.com)
2. Verificar domínio (SPF, DKIM, DMARC)
3. `MAIL_FROM` deve usar domínio verificado
4. `RESEND_API_KEY` no Railway

---

## 7. CI (GitHub Actions)

Workflow em `.github/workflows/ci.yml`:

- **Backend:** `./mvnw test` (Testcontainers + Docker)
- **Frontend:** `npm run build`
- **E2E:** Playwright smoke (páginas públicas)

Roda em push/PR para `main`.

---

## 8. Testes locais antes do deploy

```bash
# Backend
cd backend && ./mvnw test

# Front build
cd frontend && npm run build

# E2E smoke (instala Chromium na 1ª vez)
cd frontend && npm run test:e2e
```

---

## 9. Rollback

| Serviço | Como |
|---------|------|
| Railway | Deployments → redeploy versão anterior |
| Vercel | Deployments → Promote to Production |
| Migrations | Sempre backward-compatible; evitar DROP em prod |

---

## 10. Checklist pós-deploy

- [ ] `GET /api/health` → UP
- [ ] Login admin e cliente
- [ ] Agendar visita (público)
- [ ] E-mail de confirmação (Resend)
- [ ] WhatsApp lembrete (n8n cron)
- [ ] Upload imagem (Cloudinary)
- [ ] CORS: front chama API sem erro
- [ ] HTTPS em todas as URLs públicas

---

## Troubleshooting

| Problema | Causa comum |
|----------|-------------|
| Front 404 ao recarregar rota | Falta `vercel.json` rewrites |
| CORS error | `CORS_ALLOWED_ORIGINS` sem URL exata da Vercel |
| API 503 no health | DB_URL errado ou Flyway falhou |
| E-mail não envia | Domínio Resend não verificado |
| WhatsApp 404 | Workflow n8n inativo ou secret errado |
| JWT inválido após deploy | `JWT_SECRET` mudou (invalida tokens antigos) |
