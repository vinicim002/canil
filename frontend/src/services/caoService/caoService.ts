import type { CaoRequest } from "./caoRequest";
import type { CaoResponse } from "./caoResponse";

const BASE_URL = "http://localhost:8080/api"; // Substitua pela sua URL base

async function handleRequest<T>(
  url: string,
  options: RequestInit = {}, // Definimos um valor padrão vazio
): Promise<T> {
  const token = localStorage.getItem("accessToken");

  // 1. Criamos um objeto de Headers combinando os existentes com os novos
  const headers = new Headers(options.headers);

  // 2. Injetamos o Token JWT se ele existir
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 3. Definimos Content-Type como JSON apenas se não for um upload de arquivo (FormData)
  // O FormData precisa que o navegador defina o boundary automaticamente
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // 4. Tratamento de erro robusto
  if (!response.ok) {
    if (response.status === 403) {
      console.error(
        "Acesso Negado: Você não tem permissão ou seu token expirou.",
      );
    }
    // Tenta capturar a mensagem de erro do backend se existir
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro na requisição: ${response.status}`,
    );
  }

  if (response.status === 204) return {} as T;

  return await response.json();
}

export const caoService = {
  listarTodos: () => handleRequest<CaoResponse[]>("/caes"),

  listarDisponiveis: () => handleRequest<CaoResponse[]>("/caes/disponiveis"),

  listarDestaques: () => handleRequest<CaoResponse[]>("/caes/destaques"),

  buscarPorId: (id: string) => handleRequest<CaoResponse>(`/caes/${id}`),

  criar: (data: CaoRequest) =>
    handleRequest<CaoResponse>("/caes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  atualizar: (id: string, data: CaoRequest) =>
    handleRequest<CaoResponse>(`/caes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
