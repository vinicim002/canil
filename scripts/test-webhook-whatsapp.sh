#!/usr/bin/env bash
# Testa o fluxo WhatsApp recebido: Evolution → n8n → Spring → Evolution (resposta).
#
# Uso (produção):
#   export EVOLUTION_API_URL=https://evolution-api-production-6e8f.up.railway.app
#   export EVOLUTION_API_KEY=sua-key-evolution
#   export EVOLUTION_INSTANCE=canil
#   export N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens
#   export CANIL_API_URL=https://canil-production.up.railway.app
#   export N8N_WEBHOOK_SECRET=mesmo-secret-do-railway
#   export TELEFONE_TESTE=5521999999999
#   ./scripts/test-webhook-whatsapp.sh
#
# Opções:
#   CONFIGURAR_WEBHOOK=1  — roda evolution-webhook-whatsapp.sh antes dos testes
#   PULAR_SPRING=1        — só verifica Evolution webhook + n8n (não chama backend)
set -euo pipefail

EVOLUTION_API_URL="${EVOLUTION_API_URL:-}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-}"
EVOLUTION_INSTANCE="${EVOLUTION_INSTANCE:-canil}"
N8N_WEBHOOK_URL="${N8N_WEBHOOK_URL:-https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens}"
CANIL_API_URL="${CANIL_API_URL:-https://canil-production.up.railway.app}"
N8N_WEBHOOK_SECRET="${N8N_WEBHOOK_SECRET:-}"
TELEFONE_TESTE="${TELEFONE_TESTE:-5521982521511}"
INTENT_TEXTO="${INTENT_TEXTO:-alterar agendamento}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OK=0
FAIL=0

pass() { echo "  ✓ $1"; OK=$((OK + 1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL + 1)); }

echo "=== Teste webhook WhatsApp (Evolution → n8n → Spring) ==="
echo ""

if [ "${CONFIGURAR_WEBHOOK:-0}" = "1" ]; then
  if [ -z "$EVOLUTION_API_URL" ] || [ -z "$EVOLUTION_API_KEY" ]; then
    fail "CONFIGURAR_WEBHOOK=1 exige EVOLUTION_API_URL e EVOLUTION_API_KEY"
    exit 1
  fi
  echo "1) Configurando webhook na Evolution..."
  EVOLUTION_API_URL="$EVOLUTION_API_URL" EVOLUTION_API_KEY="$EVOLUTION_API_KEY" \
    EVOLUTION_INSTANCE="$EVOLUTION_INSTANCE" N8N_WEBHOOK_URL="$N8N_WEBHOOK_URL" \
    "$ROOT/scripts/evolution-webhook-whatsapp.sh"
  echo ""
fi

echo "2) Evolution — connectionState"
if [ -n "$EVOLUTION_API_URL" ] && [ -n "$EVOLUTION_API_KEY" ]; then
  STATE=$(curl -sS --max-time 15 "$EVOLUTION_API_URL/instance/connectionState/$EVOLUTION_INSTANCE" \
    -H "apikey: $EVOLUTION_API_KEY" | jq -r '.instance.state // .state // "?"' 2>/dev/null || echo "?")
  if [ "$STATE" = "open" ]; then
    pass "WhatsApp conectado (state=open)"
  else
    fail "WhatsApp state=$STATE — pareie antes: ./scripts/evolution-conectar-whatsapp.sh"
  fi
else
  echo "  (pulado — defina EVOLUTION_API_URL e EVOLUTION_API_KEY)"
fi
echo ""

echo "3) Evolution — webhook/find"
if [ -n "$EVOLUTION_API_URL" ] && [ -n "$EVOLUTION_API_KEY" ]; then
  WH=$(curl -sS --max-time 15 "$EVOLUTION_API_URL/webhook/find/$EVOLUTION_INSTANCE" \
    -H "apikey: $EVOLUTION_API_KEY")
  echo "$WH" | jq . 2>/dev/null || echo "$WH"
  ENABLED=$(echo "$WH" | jq -r '.enabled // .webhook?.enabled // false' 2>/dev/null)
  URL=$(echo "$WH" | jq -r '.url // .webhook?.url // ""' 2>/dev/null)
  if [ "$ENABLED" = "true" ] && [ -n "$URL" ]; then
    if echo "$URL" | grep -q "n8n"; then
      pass "Webhook ativo → $URL"
    else
      fail "Webhook ativo mas URL não parece n8n: $URL"
    fi
  else
    fail "Webhook não configurado. Rode: CONFIGURAR_WEBHOOK=1 ./scripts/test-webhook-whatsapp.sh"
  fi
else
  echo "  (pulado — sem credenciais Evolution)"
fi
echo ""

echo "4) Spring — intent direto (simula o que o n8n envia)"
if [ "${PULAR_SPRING:-0}" = "1" ]; then
  echo "  (pulado — PULAR_SPRING=1)"
elif [ -z "$N8N_WEBHOOK_SECRET" ]; then
  fail "Defina N8N_WEBHOOK_SECRET (mesmo valor do Railway)"
else
  RESP=$(curl -sS -w "\n%{http_code}" --max-time 60 -X POST \
    "$CANIL_API_URL/api/webhooks/n8n/whatsapp/processar" \
    -H "X-Webhook-Secret: $N8N_WEBHOOK_SECRET" \
    -H "Content-Type: application/json" \
    -d "{\"telefone\":\"$TELEFONE_TESTE\",\"texto\":\"$INTENT_TEXTO\"}")
  HTTP=$(echo "$RESP" | tail -n1)
  BODY=$(echo "$RESP" | sed '$d')
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  if [ "$HTTP" = "200" ]; then
    PROCESSADO=$(echo "$BODY" | jq -r '.processado // false' 2>/dev/null)
    INTENT=$(echo "$BODY" | jq -r '.intentDetectado // "?"' 2>/dev/null)
    if [ "$PROCESSADO" = "true" ]; then
      pass "Backend HTTP 200 — intent=$INTENT (deve chegar resposta no Zap)"
    else
      pass "Backend HTTP 200 — intent=$INTENT (texto não reconhecido ou sem visita ativa)"
    fi
  else
    fail "Backend HTTP $HTTP — confira N8N_WEBHOOK_SECRET e deploy"
  fi
fi
echo ""

echo "5) Teste real no celular"
echo "   Envie para o WhatsApp do canil (número conectado na Evolution):"
echo "     • alterar agendamento"
echo "     • cancelar agendamento"
echo "     • reservar filhote"
echo ""
echo "   Confira:"
echo "     • n8n → Executions → workflow «WhatsApp entrada» (deve executar)"
echo "     • Railway logs → [WhatsApp intent] ..."
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "Resultado: $OK ok, $FAIL falha(s)"
  exit 1
fi
echo "Resultado: $OK verificação(ões) ok. Faça o passo 5 no celular."
exit 0
