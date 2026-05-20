import { api } from "./api";

export interface ContatoRequest {
  nome: string;
  email: string;
  telefone?: string;
  assunto: string;
  mensagem: string;
}

export const contatoService = {
  enviar: (data: ContatoRequest) =>
    api.post<{ mensagem: string }>("/contato", data),
};
