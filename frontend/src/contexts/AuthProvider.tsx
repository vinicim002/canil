import { useState, type ReactNode } from "react";
import { authService, type LoginRequest, type LoginResponse } from "../services/authService";
import { AuthContext } from "./AuthContext";

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
    };
  });

  const [loading] = useState(false);

  async function login(data: LoginRequest) {
    const response = await authService.login(data);

    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("usuarioId", response.usuarioId);
    localStorage.setItem("nome", response.nome);
    localStorage.setItem("email", response.email);
    localStorage.setItem("role", response.role);

    setUsuario(response);
  }

  function logout() {
    localStorage.clear();
    setUsuario(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        isAdmin: usuario?.role === "ADMIN",
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}