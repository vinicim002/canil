import type { ImagemResponse } from "./ImagemResponse";

const BASE_URL = "http://localhost:8080/api";

async function handleRequest<T>(
  url: string,
  options: RequestInit = {}, // Definido valor padrão para evitar erros de undefined
): Promise<T> {
  // 1. Pegar o token correto (accessToken)
  const token = localStorage.getItem("accessToken");

  const headers = new Headers(options.headers);

  // 2. Injetar o Token se existir
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 3. Configurar Content-Type apenas se NÃO for upload de arquivo
  // O FormData precisa que o navegador defina o boundary automaticamente
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Log para ajudar no debug
    if (response.status === 403) {
      console.error(
        "403 Forbidden no imagemService: Token inválido ou rota bloqueada no backend.",
      );
    }
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
      body: formData,
      // Note: Não passamos headers aqui, o handleRequest cuida disso agora
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
