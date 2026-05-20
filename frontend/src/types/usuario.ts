export type StatusUsuario = "PENDENTE" | "APROVADO" | "REJEITADO";

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: "ADMIN" | "CLIENTE";
  ativo: boolean;
  status: StatusUsuario;
  criadoEm: string;
}
