#!/usr/bin/env bash
# Configura instância WhatsApp na Evolution API (QR Code no terminal).
set -euo pipefail

API_URL="${EVOLUTION_API_URL:-http://localhost:8081}"
API_KEY="${EVOLUTION_API_KEY:-canil-evolution-dev-key}"
INSTANCE="${EVOLUTION_INSTANCE:-canil}"

echo "=== Evolution API setup ==="
echo "URL: $API_URL"
echo "Instância: $INSTANCE"
echo ""

health=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL" || echo "000")
if [ "$health" = "000" ]; then
  echo "Erro: Evolution não responde em $API_URL"
  echo "Suba os containers: docker compose up -d evolution-api redis evolution-postgres"
  exit 1
fi

echo "1) Criando instância (se não existir)..."
curl -s -X POST "$API_URL/instance/create" \
  -H "apikey: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"$INSTANCE\",
    \"integration\": \"WHATSAPP-BAILEYS\",
    \"qrcode\": true
  }" | jq . 2>/dev/null || cat

echo ""
echo "2) QR Code — escaneie com o WhatsApp do canil:"
echo "   → Painel: http://localhost:3000 (Evolution Manager)"
echo "   → API Key: $API_KEY"
echo "   → Instância: $INSTANCE"
echo ""
echo "   Ou abra no navegador (JSON com base64 do QR):"
echo "   $API_URL/instance/connect/$INSTANCE"
echo ""
curl -s -X GET "$API_URL/instance/connect/$INSTANCE" \
  -H "apikey: $API_KEY" | jq -r '.base64 // .qrcode.base64 // empty' 2>/dev/null | head -c 20 >/dev/null \
  && echo "(resposta recebida — se tiver base64, cole em https://base64.guru/converter/decode/image)" \
  || curl -s -X GET "$API_URL/instance/connect/$INSTANCE" -H "apikey: $API_KEY" | head -c 400

echo ""
echo "3) Status da conexão:"
curl -s -X GET "$API_URL/instance/connectionState/$INSTANCE" \
  -H "apikey: $API_KEY" | jq . 2>/dev/null || cat

echo ""
echo "=== Teste de envio (opcional) ==="
echo "Exemplo:"
echo "curl -X POST \"$API_URL/message/sendText/$INSTANCE\" \\"
echo "  -H \"apikey: $API_KEY\" -H \"Content-Type: application/json\" \\"
echo "  -d '{\"number\":\"5511999999999\",\"text\":\"Teste Canil\"}'"
