import type { ImagemResponse } from "./ImagemResponse";

const BASE_URL = "http://localhost:8080/api";

async function handleRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  if (response.status === 204) return {} as T;

  return await response.json();
}

export const imagemService = {
  listarPorCao: (caoId: string) =>
    handleRequest<ImagemResponse[]>(`/imagens/caes/${caoId}`),

  upload: (caoId: string, file: File, capa: boolean = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("capa", String(capa));

    return handleRequest<ImagemResponse>(`/imagens/caes/${caoId}`, {
      method: "POST",
      // IMPORTANTE: Não passamos headers de Content-Type aqui.
      // O fetch identifica o FormData e configura o boundary sozinho.
      body: formData,
    });
  },

  definirCapa: (caoId: string, imagemId: string) =>
    handleRequest<ImagemResponse>(`/imagens/caes/${caoId}/capa/${imagemId}`, {
      method: "PATCH",
    }),

  deletar: (imagemId: string) =>
    handleRequest<void>(`/imagens/${imagemId}`, {
      method: "DELETE",
    }),
};
