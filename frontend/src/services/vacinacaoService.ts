import { api } from "./api";

export interface VacinacaoResponse {
  id: string;
  caoId: string;
  nomeCao: string;
  nomeVacina: string;
  dataAplicacao: string;
  proximaDose?: string;
  lote?: string;
  veterinario?: string;
  observacoes?: string;
  criadoEm: string;
}

export const vacinacaoService = {
  listarPorCao: (caoId: string) =>
    api.get<VacinacaoResponse[]>(`/vacinacoes/caes/${caoId}`),
};
