const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

async function publicRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const erros = error.erros as Record<string, string> | undefined;
    const primeira =
      erros && Object.values(erros)[0];
    throw new Error(
      (error.mensagem as string) || primeira || "Erro na requisição",
    );
  }

  if (response.status === 204) return null as T;
  return response.json();
}

export const publicApi = {
  get: <T>(endpoint: string) => publicRequest<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    publicRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  patch: <T>(endpoint: string, body?: unknown) =>
    publicRequest<T>(endpoint, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
};
