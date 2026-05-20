import { useEffect, useState, type ReactNode } from "react";
import {
  authService,
  type LoginRequest,
  type LoginResponse,
} from "../services/authService";
import type { StatusUsuario } from "../types/usuario";
import { AuthContext } from "./AuthContext";

function resolveStatus(stored: string | null): StatusUsuario {
  if (stored === "APROVADO" || stored === "PENDENTE" || stored === "REJEITADO") {
    return stored;
  }
  return "APROVADO";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<LoginResponse | null>(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    return {
      accessToken: token,
      refreshToken: localStorage.getItem("refreshToken") || "",
      usuarioId: localStorage.getItem("usuarioId") || "",
      nome: localStorage.getItem("nome") || "",
      email: localStorage.getItem("email") || "",
      role: (localStorage.getItem("role") as "ADMIN" | "CLIENTE") || "CLIENTE",
      status: resolveStatus(localStorage.getItem("status")),
    };
  });

  const [loading] = useState(false);

  function persistSession(response: LoginResponse) {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("usuarioId", response.usuarioId);
    localStorage.setItem("nome", response.nome);
    localStorage.setItem("email", response.email);
    localStorage.setItem("role", response.role);
    localStorage.setItem("status", response.status);
    setUsuario(response);
  }

  function atualizarStatus(status: StatusUsuario) {
    localStorage.setItem("status", status);
    setUsuario((prev) => (prev ? { ...prev, status } : prev));
  }

  useEffect(() => {
    if (!usuario) return;

    const refreshInterval = setInterval(async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      try {
        const response = await authService.refresh(refreshToken);
        persistSession(response);
      } catch {
        logout();
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [usuario?.usuarioId]);

  async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await authService.login(data);
    persistSession(response);
    return response;
  }

  function logout() {
    localStorage.clear();
    setUsuario(null);
    window.location.href = "/login";
  }

  const isClienteAprovado =
    usuario?.role === "ADMIN" || usuario?.status === "APROVADO";

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        isAdmin: usuario?.role === "ADMIN",
        isClienteAprovado,
        loading,
        login,
        logout,
        atualizarStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
