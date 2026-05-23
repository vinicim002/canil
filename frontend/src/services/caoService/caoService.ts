import type { CaoRequest } from "./caoRequest";
import type { CaoResponse } from "./caoResponse";

import { API_BASE_URL } from "../../config/api";

const BASE_URL = API_BASE_URL;

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

  // Log do que está sendo enviado
  if (options.body && !(options.body instanceof FormData)) {
    console.log("📤 Enviando para", url, JSON.parse(options.body as string));
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("❌ Status:", response.status);
    console.error("❌ URL:", url);
    console.error("❌ Erro do servidor:", errorData);
    throw new Error(
      errorData.message ||
        JSON.stringify(errorData) ||
        `Erro: ${response.status}`,
    );
  }

  if (response.status === 204) return {} as T;
  return await response.json();
}

export const caoService = {
  listarTodos: (tipo?: TipoCao) => {
    const query = tipo ? `?tipo=${tipo}` : "";
    return handleRequest<CaoResponse[]>(`/caes${query}`);
  },

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
