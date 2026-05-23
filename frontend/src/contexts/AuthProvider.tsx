import { useEffect, useState, type ReactNode } from "react";
import {
  authService,
  type LoginRequest,
  type LoginResponse,
} from "../services/authService";
import type { StatusUsuario } from "../types/usuario";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const hasStoredToken = !!localStorage.getItem("accessToken");

  const [usuario, setUsuario] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(hasStoredToken);

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
    if (!hasStoredToken) return;

    let cancelled = false;

    authService
      .me()
      .then((me) => {
        if (cancelled) return;
        persistSession({
          accessToken: localStorage.getItem("accessToken") || "",
          refreshToken: localStorage.getItem("refreshToken") || "",
          usuarioId: me.id,
          nome: me.nome,
          email: me.email,
          role: me.role,
          status: me.status,
        });
      })
      .catch(() => {
        if (!cancelled) {
          localStorage.clear();
          setUsuario(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hasStoredToken]);

  useEffect(() => {
    if (!usuario) return;

    const refreshInterval = setInterval(async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return;

      try {
        const response = await authService.refresh(refreshToken);
        persistSession(response);
      } catch {
        localStorage.clear();
        setUsuario(null);
        window.location.href = "/login";
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [usuario?.usuarioId]);

  async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await authService.login(data);
    persistSession(response);
    setLoading(false);
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
