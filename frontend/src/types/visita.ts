export type StatusVisita =
  | "PENDENTE"
  | "CONFIRMADO"
  | "REAGENDADO"
  | "CANCELADO"
  | "REALIZADO"
  | "AUSENTE";

export interface SlotDisponivel {
  horario: string;
  dataHora: string;
}

export interface SlotsDiaResponse {
  data: string;
  slots: SlotDisponivel[];
}

export interface CriarVisitaRequest {
  nome: string;
  telefone: string;
  email: string;
  dataHora: string;
  observacoes?: string;
}

export interface VisitaResponse {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  dataHora: string;
  status: StatusVisita;
  observacoes?: string;
  linkGerenciamento: string;
  criadoEm: string;
}

export interface ReagendarVisitaRequest {
  dataHora: string;
  observacoes?: string;
}
