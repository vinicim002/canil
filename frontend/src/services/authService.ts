import { api } from "./api";

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  usuarioId: string;
  nome: string;
  email: string;
  role: "ADMIN" | "CLIENTE";
}

export const authService = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", data),

  logout: () => {
    localStorage.clear();
    window.location.href = "/login";
  },

  isAuthenticated: () => !!localStorage.getItem("accessToken"),

  getRole: () => localStorage.getItem("role") as "ADMIN" | "CLIENTE" | null,

  isAdmin: () => localStorage.getItem("role") === "ADMIN",
};