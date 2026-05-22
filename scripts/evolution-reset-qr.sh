#!/usr/bin/env bash
# Remove instância travada e recria para gerar QR de novo.
set -euo pipefail

API_URL="${EVOLUTION_API_URL:-http://localhost:8081}"
API_KEY="${EVOLUTION_API_KEY:-canil-evolution-dev-key}"
INSTANCE="${EVOLUTION_INSTANCE:-canil}"

echo "=== Reset QR Evolution ($INSTANCE) ==="

echo "1) Desconectando..."
curl -s -X DELETE "$API_URL/instance/logout/$INSTANCE" -H "apikey: $API_KEY" | jq . 2>/dev/null || true

echo "2) Removendo instância..."
curl -s -X DELETE "$API_URL/instance/delete/$INSTANCE" -H "apikey: $API_KEY" | jq . 2>/dev/null || true

sleep 2

echo "3) Recriando instância..."
curl -s -X POST "$API_URL/instance/create" \
  -H "apikey: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"instanceName\":\"$INSTANCE\",\"integration\":\"WHATSAPP-BAILEYS\",\"qrcode\":true}" | jq . 2>/dev/null || cat

sleep 3

echo ""
echo "4) Solicitando QR (aguarde base64 ou pairingCode)..."
RESP=$(curl -s "$API_URL/instance/connect/$INSTANCE" -H "apikey: $API_KEY")
echo "$RESP" | jq . 2>/dev/null || echo "$RESP"

if echo "$RESP" | grep -q base64; then
  echo ""
  echo "✓ QR gerado na API. Abra http://localhost:3000 e clique Get QR Code de novo."
elif echo "$RESP" | grep -q pairingCode; then
  echo ""
  echo "✓ Código de pareamento gerado. Use no WhatsApp: Aparelhos conectados → Conectar com número."
else
  echo ""
  echo "⚠ Ainda sem QR. Confira:"
  echo "   - docker compose up -d evolution-api --force-recreate"
  echo "   - Pareamento por código (mais confiável):"
  echo "     ./scripts/evolution-conectar-whatsapp.sh 5511SEUNUMERO"
fi
