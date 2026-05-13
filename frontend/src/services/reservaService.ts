import { api } from "./api";

export interface ReservaResponse {
  id: string;
  usuarioId: string;
  nomeUsuario: string;
  caoId: string;
  nomeCao: string;
  status: string;
  valorSinal: number;
  valorTotal: number;
  valorRestante: number;
  observacoes: string;
  criadoEm: string;
}

export interface ReservaRequest {
  caoId: string;
  valorSinal: number;
  valorTotal: number;
  observacoes?: string;
}

export const reservaService = {
  criar: (data: ReservaRequest) => api.post<ReservaResponse>("/reservas", data),
  listarTodas: () => api.get<ReservaResponse[]>("/reservas"),
  listarMinhas: () => api.get<ReservaResponse[]>("/reservas/minhas"),
  buscarPorId: (id: string) => api.get<ReservaResponse>(`/reservas/${id}`),
  aprovar: (id: string) => api.patch<ReservaResponse>(`/reservas/${id}/aprovar`),
  cancelar: (id: string) => api.patch<ReservaResponse>(`/reservas/${id}/cancelar`),
  pagar: (id: string) => api.patch<ReservaResponse>(`/reservas/${id}/pagar`),
};