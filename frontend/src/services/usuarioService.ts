import { api } from "./api";
import type { StatusUsuario, UsuarioResponse } from "../types/usuario";

export const usuarioService = {
  listarClientes: () => api.get<UsuarioResponse[]>("/usuarios/clientes"),

  buscarPorId: (id: string) => api.get<UsuarioResponse>(`/usuarios/${id}`),

  aprovar: (id: string) => api.patch<UsuarioResponse>(`/usuarios/${id}/aprovar`),

  atualizarStatus: (id: string, status: StatusUsuario) =>
    api.patch<UsuarioResponse>(`/usuarios/${id}/status`, { status }),

  excluir: (id: string) => api.delete(`/usuarios/${id}`),
};
