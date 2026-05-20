import { createContext } from "react";
import type { LoginRequest, LoginResponse } from "../services/authService";

export interface AuthContextData {
  usuario: LoginResponse | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isClienteAprovado: boolean;
  loading: boolean;
  login: (data: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  atualizarStatus: (status: LoginResponse["status"]) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);