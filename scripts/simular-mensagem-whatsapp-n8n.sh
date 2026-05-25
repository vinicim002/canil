#!/usr/bin/env bash
# Simula uma mensagem RECEBIDA no WhatsApp (payload Evolution → n8n).
# Use quando você só tem um celular (o mesmo pareado na Evolution):
#   - Mensagens reais do seu aparelho costumam ser fromMe=true e o n8n ignora.
#   - Este script envia fromMe=false para o webhook do n8n, como se outro número tivesse escrito.
#
# Uso:
#   export N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens
#   export TELEFONE_REMETENTE=5521999999999   # mesmo telefone da visita no site
#   export TEXTO_MENSAGEM="cancelar agendamento"
#   ./scripts/simular-mensagem-whatsapp-n8n.sh
set -euo pipefail

N8N_WEBHOOK_URL="${N8N_WEBHOOK_URL:-https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens}"
TELEFONE_REMETENTE="${TELEFONE_REMETENTE:-}"
TEXTO_MENSAGEM="${TEXTO_MENSAGEM:-cancelar agendamento}"
INSTANCE="${EVOLUTION_INSTANCE:-canil}"

if [ -z "$TELEFONE_REMETENTE" ]; then
  echo "Defina TELEFONE_REMETENTE (DDI+DDD+número, só dígitos)."
  echo "Deve ser o MESMO telefone usado ao agendar a visita no site."
  exit 1
fi

TELEFONE_REMETENTE=$(echo "$TELEFONE_REMETENTE" | tr -cd '0-9')
JID="${TELEFONE_REMETENTE}@s.whatsapp.net"

PAYLOAD=$(jq -n \
  --arg inst "$INSTANCE" \
  --arg jid "$JID" \
  --arg texto "$TEXTO_MENSAGEM" \
  '{
    event: "messages.upsert",
    instance: $inst,
    data: {
      key: { remoteJid: $jid, fromMe: false },
      message: { conversation: $texto }
    }
  }')

echo "=== Simular mensagem → n8n ==="
echo "Webhook: $N8N_WEBHOOK_URL"
echo "De:      $TELEFONE_REMETENTE"
echo "Texto:   $TEXTO_MENSAGEM"
echo ""

HTTP=$(curl -sS -o /tmp/n8n-sim-resp.txt -w "%{http_code}" --max-time 30 \
  -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

echo "n8n HTTP: $HTTP"
cat /tmp/n8n-sim-resp.txt 2>/dev/null | head -c 500
echo ""
echo ""
echo "Confira no n8n → Executions (workflow WhatsApp entrada)."
echo "Se o telefone bate com uma visita ativa, o Spring responde no Zap desse número."
rm -f /tmp/n8n-sim-resp.txt
