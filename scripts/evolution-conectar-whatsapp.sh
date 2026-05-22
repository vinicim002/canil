#!/usr/bin/env bash
# Conecta WhatsApp: pareamento por código (recomendado) ou QR único.
set -euo pipefail

API_URL="${EVOLUTION_API_URL:-http://localhost:8081}"
API_KEY="${EVOLUTION_API_KEY:-canil-evolution-dev-key}"
INSTANCE="${EVOLUTION_INSTANCE:-canil}"
PHONE="${1:-}"

echo "=== Conectar WhatsApp — instância $INSTANCE ==="
echo ""

if [ -n "$PHONE" ]; then
  # Só dígitos (DDI + DDD + número, ex: 5511987654321)
  PHONE=$(echo "$PHONE" | tr -cd '0-9')
  echo "Modo: CÓDIGO DE PAREAMENTO (mais estável que QR)"
  echo ""
  echo "1) Recriando instância com número $PHONE ..."
  curl -s -X DELETE "$API_URL/instance/logout/$INSTANCE" -H "apikey: $API_KEY" >/dev/null 2>&1 || true
  curl -s -X DELETE "$API_URL/instance/delete/$INSTANCE" -H "apikey: $API_KEY" >/dev/null 2>&1 || true
  sleep 2

  RESP=$(curl -s -X POST "$API_URL/instance/create" \
    -H "apikey: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"instanceName\":\"$INSTANCE\",\"integration\":\"WHATSAPP-BAILEYS\",\"qrcode\":true,\"number\":\"$PHONE\"}")

  PAIRING=$(echo "$RESP" | jq -r '.qrcode.pairingCode // .pairingCode // empty' 2>/dev/null)
  if [ -z "$PAIRING" ] || [ "$PAIRING" = "null" ]; then
    echo "Código não veio na criação. Resposta:"
    echo "$RESP" | jq . 2>/dev/null || echo "$RESP" | head -c 400
    exit 1
  fi

  echo "══════════════════════════════════════"
  echo "  CÓDIGO DE PAREAMENTO: $PAIRING"
  echo "══════════════════════════════════════"
  echo ""
  echo "No celular:"
  echo "  WhatsApp → ⋮ → Aparelhos conectados →"
  echo "  Conectar com número de telefone → digite: $PAIRING"
  echo ""
else
  echo "Modo: QR (escaneie em até 20s — o QR renova sozinho)"
  echo ""
  echo "1) Uma única solicitação de QR (não clique várias vezes no Manager)..."
  curl -s -X DELETE "$API_URL/instance/logout/$INSTANCE" -H "apikey: $API_KEY" >/dev/null 2>&1 || true
  sleep 1

  EXISTS=$(curl -s "$API_URL/instance/fetchInstances" -H "apikey: $API_KEY" | jq -r --arg n "$INSTANCE" '[.[] | select(.name==$n)] | length' 2>/dev/null || echo "0")
  if [ "$EXISTS" = "0" ]; then
    curl -s -X POST "$API_URL/instance/create" \
      -H "apikey: $API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"instanceName\":\"$INSTANCE\",\"integration\":\"WHATSAPP-BAILEYS\",\"qrcode\":true}" >/dev/null
    sleep 2
  fi

  RESP=$(curl -s "$API_URL/instance/connect/$INSTANCE" -H "apikey: $API_KEY")
  COUNT=$(echo "$RESP" | jq -r '.count // 0' 2>/dev/null)

  if [ "$COUNT" = "0" ] || [ "$COUNT" = "null" ]; then
    echo "QR não gerou. Tente com número:"
    echo "  ./scripts/evolution-conectar-whatsapp.sh 5511SEUNUMERO"
    exit 1
  fi

  echo "QR ativo (count=$COUNT)."
  echo ""
  echo "► ESCANEIE AGORA (QR ao vivo no terminal):"
  echo "  docker logs -f canil_evolution"
  echo ""
  echo "No celular: WhatsApp → ⋮ → Aparelhos conectados →"
  echo "  Conectar um aparelho → Escanear QR code"
  echo ""
  echo "DICA: use pareamento por código (evita QR expirado):"
  echo "  ./scripts/evolution-conectar-whatsapp.sh 5511SEUNUMERO"
  echo ""
fi

echo "2) Acompanhe status (Ctrl+C para sair):"
for i in 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20; do
  STATE=$(curl -s "$API_URL/instance/connectionState/$INSTANCE" -H "apikey: $API_KEY" | jq -r '.instance.state // .state // "?"' 2>/dev/null)
  echo "   [$i] state=$STATE"
  if [ "$STATE" = "open" ]; then
    echo ""
    echo "✓ CONECTADO! Teste:"
    echo "curl -X POST \"$API_URL/message/sendText/$INSTANCE\" \\"
    echo "  -H \"apikey: $API_KEY\" -H \"Content-Type: application/json\" \\"
    echo "  -d '{\"number\":\"5511999999999\",\"text\":\"Teste Canil\"}'"
    exit 0
  fi
  sleep 3
done

echo ""
echo "Ainda não conectou."
echo "  • QR: não reabra o Manager; escaneie o QR dos logs na hora."
echo "  • Celular mostrando 'Conectando...': feche o WhatsApp e abra de novo."
echo "  • Preferível: ./scripts/evolution-conectar-whatsapp.sh 5511SEUNUMERO"
