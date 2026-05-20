import { api } from "./api";
import type { StatusUsuario, UsuarioResponse } from "../types/usuario";

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
  status: StatusUsuario;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export const authService = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", data),

  register: (data: RegisterRequest) =>
    api.post<UsuarioResponse>("/auth/register", data),

  refresh: (refreshToken: string) =>
    api.post<LoginResponse>("/auth/refresh", { refreshToken }),

  me: () => api.get<UsuarioResponse>("/auth/me"),

  logout: () => {
    localStorage.clear();
    window.location.href = "/login";
  },

  isAuthenticated: () => !!localStorage.getItem("accessToken"),

  getRole: () => localStorage.getItem("role") as "ADMIN" | "CLIENTE" | null,

  isAdmin: () => localStorage.getItem("role") === "ADMIN",
};