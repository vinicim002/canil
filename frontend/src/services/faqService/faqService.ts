import type { FaqResponse } from "./faqResponse"; // Certifique-se de ajustar os caminhos dos tipos
import type { FaqRequest } from "./faqRequest";

const BASE_URL = "http://localhost:8080/api"; // Ajuste para a sua URL base do backend

async function handleRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("accessToken");
  const headers = new Headers(options.headers);

  // Injeta o token se ele existir
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Define Content-Type como JSON automaticamente se não for FormData
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

  // Se o servidor responder No Content (204), evita tentar dar o .json() que quebra o front
  if (response.status === 204) return {} as T;
  return await response.json();
}

export const faqService = {
  listarAtivos: () => handleRequest<FaqResponse[]>("/faq"),

  listarTodos: () => handleRequest<FaqResponse[]>("/faq/todos"),

  criar: (data: FaqRequest) =>
    handleRequest<FaqResponse>("/faq", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  atualizar: (id: string, data: FaqRequest) =>
    handleRequest<FaqResponse>(`/faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  desativar: (id: string) =>
    handleRequest<void>(`/faq/${id}/desativar`, {
      method: "PATCH",
    }),

  deletar: (id: string) =>
    handleRequest<void>(`/faq/${id}`, {
      method: "DELETE",
    }),
};
