import { api } from "./api";

export interface CaoResponse {
  id: string;
  nome: string;
  tipoPelo: string;
  tamanho: string;
  genero: string;
  status: string;
  dataNascimento: string;
  cor: string;
  pedigree: string;
  descricao: string;
  destaque: boolean;
  pai: { id: string; nome: string } | null;
  mae: { id: string; nome: string } | null;
  criadoEm: string;
}

export interface CaoRequest {
  nome: string;
  tipoPelo: string;
  tamanho: string;
  genero: string;
  status: string;
  dataNascimento?: string;
  cor?: string;
  pedigree?: string;
  descricao?: string;
  destaque?: boolean;
  paiId?: string;
  maeId?: string;
}

export const caoService = {
  listarTodos: () => api.get<CaoResponse[]>("/caes"),
  listarDisponiveis: () => api.get<CaoResponse[]>("/caes/disponiveis"),
  listarDestaques: () => api.get<CaoResponse[]>("/caes/destaques"),
  buscarPorId: (id: string) => api.get<CaoResponse>(`/caes/${id}`),
  criar: (data: CaoRequest) => api.post<CaoResponse>("/caes", data),
  atualizar: (id: string, data: CaoRequest) => api.put<CaoResponse>(`/caes/${id}`, data),
  atualizarStatus: (id: string, status: string) =>
    api.patch<CaoResponse>(`/caes/${id}/status?status=${status}`),
  deletar: (id: string) => api.delete<void>(`/caes/${id}`),
};