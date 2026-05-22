import { publicApi } from "./publicApi";
import type {
  CriarVisitaRequest,
  ReagendarVisitaRequest,
  SlotsDiaResponse,
  VisitaResponse,
} from "../types/visita";

export const visitaService = {
  listarSlots: (data: string, token?: string) => {
    const params = new URLSearchParams({ data });
    if (token) params.set("token", token);
    return publicApi.get<SlotsDiaResponse>(`/public/visitas/slots?${params}`);
  },

  criar: (payload: CriarVisitaRequest) =>
    publicApi.post<VisitaResponse>("/public/visitas", payload),

  buscarPorToken: (token: string) =>
    publicApi.get<VisitaResponse>(`/public/visitas/${encodeURIComponent(token)}`),

  reagendar: (token: string, payload: ReagendarVisitaRequest) =>
    publicApi.patch<VisitaResponse>(
      `/public/visitas/${encodeURIComponent(token)}/reagendar`,
      payload,
    ),

  cancelar: (token: string) =>
    publicApi.patch<VisitaResponse>(
      `/public/visitas/${encodeURIComponent(token)}/cancelar`,
    ),
};
