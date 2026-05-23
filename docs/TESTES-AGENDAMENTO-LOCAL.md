# Testes locais — Agendamento de visitas (Canil)

Guia para validar o fluxo de agendamento no ambiente de desenvolvimento.  
Cada comando do terminal está explicado; copie e cole na raiz do projeto (`/home/vinicim/Documentos/Projetos/canil`) salvo indicação contrária.

---

## Portas e URLs locais

| Serviço | URL |
|---------|-----|
| Frontend (Vite) | http://localhost:5173 |
| Backend (Spring) | http://localhost:8080 |
| Agendar visita (tela) | http://localhost:5173/agendar-visita |
| Gestão pelo link | http://localhost:5173/agendamento/{token} |
| n8n | http://localhost:5678 |
| Evolution API | http://localhost:8081 |
| Postgres | localhost:5433 |
| Admin agendamentos | http://localhost:5173/admin/agendamentos |

**Segredo n8n (dev):** `canil-n8n-dev-secret`  
**API Key Evolution (dev):** `canil-evolution-dev-key`  
**Instância Evolution:** `canil`

---

## 0. Subir o ambiente (ordem sugerida)

### 0.1 Docker — banco, Redis, Evolution, n8n

```bash
cd /home/vinicim/Documentos/Projetos/canil
docker compose up -d postgres redis evolution-api evolution-postgres n8n
```

**O que faz:** Sobe PostgreSQL (porta 5433), Redis, Evolution API (8081), Postgres da Evolution e n8n (5678) na rede Docker `canil_net`.

**Conferir se estão rodando:**

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "canil_|NAMES"
```

**O que faz:** Lista containers do projeto com nome e portas expostas.

---

### 0.2 Evolution — WhatsApp conectado

```bash
./scripts/evolution-conectar-whatsapp.sh 5521982521511
```

**O que faz:** Recria/conecta a instância `canil` com pareamento por código (substitua pelo seu número, só dígitos com DDI 55). Alternativa: QR nos logs.

**Verificar conexão:**

```bash
curl -s "http://localhost:8081/instance/connectionState/canil" \
  -H "apikey: canil-evolution-dev-key" | jq .
```

**O que faz:** Deve retornar `"state": "open"`. Se não estiver `open`, o WhatsApp não envia mensagens.

---

### 0.3 Webhook Evolution → n8n (mensagens recebidas)

```bash
./scripts/evolution-webhook-whatsapp.sh
```

**O que faz:** Registra na Evolution que mensagens novas devem ser enviadas para `http://n8n:5678/webhook/canil-whatsapp-mensagens` (intents: alterar/cancelar/reservar filhote).

---

### 0.4 n8n — ativar workflows (interface)

Abra http://localhost:5678 e ative (toggle verde) **estes 3**:

1. **Canil — Eventos de visita (WhatsApp)** — confirmação ao criar/reagendar/cancelar pelo site  
2. **Canil — Lembretes de visita (cron)** — lembrete ~24h antes  
3. **Canil — WhatsApp entrada (intents)** — “alterar agendamento”, etc.

Importar (se ainda não importou): menu → Import from File → arquivos em `n8n/*.example.json`.

---

### 0.5 Backend

```bash
cd /home/vinicim/Documentos/Projetos/canil/backend
./mvnw spring-boot:run
```

**O que faz:** Sobe a API na porta 8080 com perfil dev (`application-dev.properties`).

---

### 0.6 Frontend

```bash
cd /home/vinicim/Documentos/Projetos/canil/frontend
npm run dev
```

**O que faz:** Sobe o site em http://localhost:5173.

---

## 1. Testes só da API (terminal)

Use uma data **pelo menos 25 horas no futuro** (regra `antecedencia-minima-horas=24`).  
Ajuste `DATA` e `DATA_HORA` nos exemplos.

```bash
# Exemplo: amanhã (Linux)
DATA=$(date -d "+2 days" +%Y-%m-%d)
echo "Data dos testes: $DATA"
```

**O que faz:** Define variável `DATA` com uma data válida para slots (mínimo ~24h à frente).

---

### 1.1 Listar horários disponíveis

```bash
curl -s "http://localhost:8080/api/public/visitas/slots?data=$DATA" | jq .
```

**O que faz:** `GET` público sem login. Retorna lista de slots livres/ocupados do dia. Use um `horario` da lista no passo seguinte (ex.: `"10:00"`).

---

### 1.2 Criar agendamento

```bash
DATA_HORA="${DATA}T10:00:00"

curl -s -X POST "http://localhost:8080/api/public/visitas" \
  -H "Content-Type: application/json" \
  -d "{
    \"nome\": \"Teste Local\",
    \"telefone\": \"21982521511\",
    \"email\": \"seu-email@exemplo.com\",
    \"dataHora\": \"$DATA_HORA\",
    \"observacoes\": \"Teste via curl\"
  }" | jq .
```

**O que faz:** Cria visita no Postgres, gera `token` e `linkGerenciamento`, dispara **e-mail** e **WhatsApp** (Evolution direto, se `app.n8n.visita-whatsapp-via-evolution-direto=true`).

**Guarde o token** da resposta (campo usado no link):

```bash
# Depois de criar, salve manualmente ou:
TOKEN="cole_o_token_aqui"
```

---

### 1.3 Consultar agendamento pelo token

```bash
curl -s "http://localhost:8080/api/public/visitas/$TOKEN" | jq .
```

**O que faz:** Simula abrir o link `/agendamento/{token}` — retorna dados da visita sem login.

---

### 1.4 Reagendar

```bash
# Outro horário no mesmo dia (deve estar em /slots)
DATA_HORA_NOVA="${DATA}T11:00:00"

curl -s -X PATCH "http://localhost:8080/api/public/visitas/$aSJeOupic_F5RT0fpMkVsCrgPAoXLE7XEwZm3zEBaOQ/reagendar" \
  -H "Content-Type: application/json" \
  -d "{\"dataHora\": \"$DATA_HORA_NOVA\", \"observacoes\": \"Reagendado no teste\"}" | jq .
```

**O que faz:** Altera data/hora, status REAGENDADO, envia novo e-mail e WhatsApp com o link.

---

### 1.5 Cancelar

```bash
curl -s -X PATCH "http://localhost:8080/api/public/visitas/$TOKEN/cancelar" | jq .
```

**O que faz:** Cancela a visita, envia notificação de cancelamento (e-mail + WhatsApp).

> Para testar criar de novo, use outro horário ou outro dia.

---

## 2. Testes no navegador (fluxo completo)

| # | Ação | URL | Resultado esperado |
|---|------|-----|-------------------|
| 1 | Agendar | http://localhost:5173/agendar-visita | Formulário, escolher data ≥24h, slot, confirmar |
| 2 | Confirmação na tela | — | Mostra link de gestão |
| 3 | Abrir link | Link exibido (`/agendamento/...`) | Ver dados, opções reagendar/cancelar |
| 4 | Reagendar na UI | Mesma página | Nova data/hora + WhatsApp/e-mail |
| 5 | Cancelar na UI | Mesma página | Status cancelado + notificações |
| 6 | Admin | http://localhost:5173/admin/agendamentos | Lista visitas e bloqueios (login admin) |

**Telefone no formulário:** use um número real que você consiga ler no WhatsApp (ex.: `21982521511`).

---

## 3. WhatsApp e e-mail após agendar

### 3.1 E-mail

- Deve chegar em `email` informado no cadastro.
- Se não chegar: veja log do Spring (`[Email visita]` ou erro SMTP).

### 3.2 WhatsApp

- Mensagem com texto de confirmação + link.
- **No celular:** link `http://localhost:5173/...` **não fica clicável** (limitação do WhatsApp).
- **No PC:** WhatsApp Web às vezes abre localhost.
- **Para link clicável no celular:** use ngrok no front e configure:

```properties
# application-dev.properties
app.visita.whatsapp-site-url=https://SEU-TUNNEL.ngrok-free.app
```

Reinicie o Spring após alterar.

### 3.3 Teste direto Evolution (isolado)

```bash
curl -s -X POST "http://localhost:8081/message/sendText/canil" \
  -H "apikey: canil-evolution-dev-key" \
  -H "Content-Type: application/json" \
  -d '{"number":"5521982521511","text":"Teste Evolution isolado"}' | jq .
```

**O que faz:** Envia mensagem sem passar pelo Spring/n8n — valida só a Evolution.

---

## 4. Lembrete 24h (Fase 5)

A visita precisa estar na janela **~24 horas antes** (entre 23h e 25h a partir de agora).

### 4.1 Criar visita na janela certa

Agende pelo site ou API com `dataHora` ≈ agora + 24 horas.

### 4.2 Disparar lembretes manualmente (sem esperar o cron)

```bash
curl -s -X POST "http://localhost:8080/api/webhooks/n8n/visitas/lembretes/processar?horas=24" \
  -H "X-Webhook-Secret: canil-n8n-dev-secret" | jq .
```

**O que faz:** Spring busca visitas elegíveis, envia WhatsApp de lembrete, grava `lembrete_enviado_em` (não envia duplicado na próxima execução).

**Resposta esperada (exemplo):**

```json
{ "enviados": 1, "elegiveis": 1, "horasAntes": 24 }
```

### 4.3 Listar elegíveis (só consulta, não envia)

```bash
curl -s "http://localhost:8080/api/webhooks/n8n/visitas/lembretes?horas=24" \
  -H "X-Webhook-Secret: canil-n8n-dev-secret" | jq .
```

**O que faz:** Retorna JSON com visitas na janela, sem enviar mensagens.

---

## 5. Intent WhatsApp — alterar / cancelar (Fase 7)

**Pré-requisitos:** Evolution `open`, workflow **WhatsApp entrada** ativo, `./scripts/evolution-webhook-whatsapp.sh` executado.

Deve existir visita **futura e ativa** com o mesmo telefone usado na mensagem.

### 5.1 Teste via API (terminal)

```bash
curl -s -X POST "http://localhost:8080/api/webhooks/n8n/whatsapp/processar" \
  -H "X-Webhook-Secret: canil-n8n-dev-secret" \
  -H "Content-Type: application/json" \
  -d '{"telefone":"5521982521511","texto":"alterar agendamento"}' | jq .
```

**O que faz:** Detecta intent, busca visitas pelo telefone, envia resposta no WhatsApp com link(s).

**Cancelar:**

```bash
curl -s -X POST "http://localhost:8080/api/webhooks/n8n/whatsapp/processar" \
  -H "X-Webhook-Secret: canil-n8n-dev-secret" \
  -H "Content-Type: application/json" \
  -d '{"telefone":"5521982521511","texto":"cancelar agendamento"}' | jq .
```

**O que faz:** Mesmo fluxo; mensagem orienta a usar o link para cancelar (não cancela automaticamente).

### 5.2 Teste pelo app WhatsApp

Envie para o número do canil (conectado na Evolution):

- `alterar agendamento`
- `cancelar agendamento`

**Dica:** mensagem de **outro celular** para o número do canil costuma ser mais confiável que “conversa consigo mesmo”.

---

## 6. Reservar filhote (relacionado, Fase 6)

### Site

http://localhost:5173/filhotes → botão **Reservar filhote**

### API

```bash
curl -s -X POST "http://localhost:8080/api/public/filhotes/solicitar-reserva" \
  -H "Content-Type: application/json" \
  -d '{"telefone":"5521982521511"}' | jq .
```

**O que faz:** Verifica filhotes disponíveis no banco, envia texto + PDF via Evolution.

---

## 7. Logs úteis (quando algo falhar)

### Spring — WhatsApp / n8n

Procure no terminal do `./mvnw spring-boot:run`:

- `[Evolution] Texto enviado para` — OK  
- `[n8n] Falha ao enviar` — webhook inativo ou URL errada  
- `[Email visita]` — e-mail  

### Evolution

```bash
docker logs -f canil_evolution 2>&1 | grep -iE "error|send|Validate"
```

**O que faz:** Mostra erros de envio (ex.: `number` ausente) em tempo real.

### n8n

```bash
docker logs canil_n8n 2>&1 | tail -30
```

**O que faz:** Erros de workflow, webhook não registrado, conflito de webhooks.

---

## 8. Checklist rápido “está tudo certo?”

- [ ] `docker ps` — postgres, n8n, evolution-api  
- [ ] Evolution `state: open`  
- [ ] Spring rodando :8080  
- [ ] Front rodando :5173  
- [ ] 3 workflows n8n **ativos**  
- [ ] `GET /api/public/visitas/slots?data=...` retorna slots  
- [ ] Criar visita → e-mail + WhatsApp  
- [ ] Link `/agendamento/{token}` abre e reagenda/cancela  
- [ ] `lembretes/processar` com visita em ~24h → 1 enviado  
- [ ] `whatsapp/processar` com “alterar agendamento” → link no Zap  

---

## 9. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---------|----------------|-------------|
| 404 no webhook n8n | Workflow inativo | Ativar toggle verde no n8n |
| E-mail OK, Zap não | Evolution desconectada | `connectionState` → `open` |
| Zap sem `number` nos logs | Bug antigo n8n | Usar `visita-whatsapp-via-evolution-direto=true` (já no dev) |
| Link não clicável no celular | `localhost` no link | `app.visita.whatsapp-site-url` com ngrok |
| Nenhum slot no dia | Domingo bloqueado ou <24h | Outro dia da semana, +2 dias |
| Lembrete `enviados: 0` | Visita fora da janela 24h±1h | Reagendar para daqui ~24h |
| Intent não responde | Webhook Evolution não apontou pro n8n | `./scripts/evolution-webhook-whatsapp.sh` |

---

*Última atualização: alinhado ao fluxo Spring + Evolution direto (visitas) e n8n (cron lembretes + entrada WhatsApp).*
