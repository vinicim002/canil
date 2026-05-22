#!/usr/bin/env bash
# Aponta webhook da instância Evolution para o n8n (mensagens recebidas).
set -euo pipefail

API_URL="${EVOLUTION_API_URL:-http://localhost:8081}"
API_KEY="${EVOLUTION_API_KEY:-canil-evolution-dev-key}"
INSTANCE="${EVOLUTION_INSTANCE:-canil}"
# URL interna na rede Docker (n8n escuta POST /webhook/canil-whatsapp-mensagens)
N8N_WEBHOOK_URL="${N8N_WEBHOOK_URL:-http://n8n:5678/webhook/canil-whatsapp-mensagens}"

echo "=== Evolution → n8n (mensagens WhatsApp) ==="
echo "Instância: $INSTANCE"
echo "Webhook:   $N8N_WEBHOOK_URL"
echo ""

RESP=$(curl -s -X POST "$API_URL/webhook/set/$INSTANCE" \
  -H "apikey: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"webhook\": {
      \"enabled\": true,
      \"url\": \"$N8N_WEBHOOK_URL\",
      \"webhookByEvents\": false,
      \"webhookBase64\": false,
      \"events\": [\"MESSAGES_UPSERT\"]
    }
  }")

echo "$RESP" | jq . 2>/dev/null || echo "$RESP"
echo ""
echo "Próximo: importe e ATIVE n8n/workflow-filhote-reserva.example.json"
echo "Teste: clique em Reservar filhote no site e envie a mensagem no WhatsApp."
