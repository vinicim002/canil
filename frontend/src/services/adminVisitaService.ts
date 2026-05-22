import { api } from "./api";
import type { StatusVisita, VisitaResponse } from "../types/visita";

export interface BloqueioHorarioResponse {
  id: string;
  data: string;
  hora: string | null;
  diaInteiro: boolean;
  motivo?: string;
  criadoEm: string;
}

export interface CriarBloqueioRequest {
  data: string;
  hora?: string | null;
  motivo?: string;
}

export const adminVisitaService = {
  listarVisitas: (status?: StatusVisita) => {
    const q = status ? `?status=${status}` : "";
    return api.get<VisitaResponse[]>(`/admin/visitas${q}`);
  },

  confirmar: (id: string) =>
    api.patch<VisitaResponse>(`/admin/visitas/${id}/confirmar`),

  cancelar: (id: string) =>
    api.patch<VisitaResponse>(`/admin/visitas/${id}/cancelar`),

  marcarRealizado: (id: string) =>
    api.patch<VisitaResponse>(`/admin/visitas/${id}/realizado`),

  marcarAusente: (id: string) =>
    api.patch<VisitaResponse>(`/admin/visitas/${id}/ausente`),

  listarBloqueios: () =>
    api.get<BloqueioHorarioResponse[]>("/admin/bloqueios"),

  criarBloqueio: (payload: CriarBloqueioRequest) =>
    api.post<BloqueioHorarioResponse>("/admin/bloqueios", payload),

  removerBloqueio: (id: string) =>
    api.delete<void>(`/admin/bloqueios/${id}`),
};

/** Grade alinhada ao backend (09h–17h, 60 min). */
export const HORARIOS_BLOQUEIO = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];
