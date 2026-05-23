export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarData(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR");
}

export function labelStatusReserva(status: string): string {
  const map: Record<string, string> = {
    SOLICITADA: "Solicitada",
    EM_ANALISE: "Em análise",
    APROVADA: "Aprovada",
    REJEITADA: "Rejeitada",
    PAGA: "Paga",
    CANCELADA: "Cancelada",
  };
  return map[status] ?? status;
}

export function labelStatusPagamento(status: string): string {
  const map: Record<string, string> = {
    PENDENTE: "Pendente",
    APROVADO: "Pago",
    RECUSADO: "Recusado",
    ESTORNADO: "Estornado",
  };
  return map[status] ?? status;
}
