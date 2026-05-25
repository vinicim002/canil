#!/usr/bin/env bash
# Configura webhook da Evolution em produção (URL pública → n8n Cloud).
# Uso:
#   export EVOLUTION_API_URL=https://canil-evolution.up.railway.app
#   export EVOLUTION_API_KEY=sua-key
#   export N8N_WEBHOOK_URL=https://vinicim003.app.n8n.cloud/webhook/canil-whatsapp-mensagens
#   ./scripts/evolution-webhook-prod.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec "$ROOT/scripts/evolution-webhook-whatsapp.sh"
