import type { CaoRequest } from "./caoRequest";
import type { CaoResponse } from "./caoResponse";

const BASE_URL = "http://localhost:8080/api";

// Definindo os tipos possíveis para facilitar o uso no Service
export type TipoCao = "FILHOTE" | "MATRIZ" | "REPRODUTOR";

async function handleRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("accessToken");
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 403) {
      console.error("Acesso Negado ou Token Expirado.");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro: ${response.status}`);
  }

  if (response.status === 204) return {} as T;
  return await response.json();
}

export const caoService = {
  // Agora suporta a busca geral ou filtrada por tipo na mesma rota base
  listarTodos: (tipo?: TipoCao) => {
    const query = tipo ? `?tipo=${tipo}` : "";
    return handleRequest<CaoResponse[]>(`/caes${query}`);
  },

  // Atalho semântico para carregar por tipo (opcional, mas ajuda na legibilidade)
  listarPorTipo: (tipo: TipoCao) =>
    handleRequest<CaoResponse[]>(`/caes?tipo=${tipo}`),

  listarDisponiveis: () => handleRequest<CaoResponse[]>("/caes/disponiveis"),

  listarDestaques: () => handleRequest<CaoResponse[]>("/caes/destaques"),

  buscarPorId: (id: string) => handleRequest<CaoResponse>(`/caes/${id}`),

  criar: (data: CaoRequest) =>
    handleRequest<CaoResponse>("/caes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  atualizar: (id: string, data: CaoRequest) =>
    handleRequest<CaoResponse>(`/caes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  atualizarStatus: (id: string, status: string) =>
    handleRequest<CaoResponse>(`/caes/${id}/status?status=${status}`, {
      method: "PATCH",
    }),

  deletar: (id: string) =>
    handleRequest<void>(`/caes/${id}`, {
      method: "DELETE",
    }),
};
