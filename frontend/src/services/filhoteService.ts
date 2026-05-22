import { publicApi } from "./publicApi";

export interface FilhoteReservaResposta {
  disponivel: boolean;
  quantidadeDisponiveis: number;
  mensagemWhatsApp: string;
  telefoneWhatsApp: string;
  pdfUrl: string;
  pdfFileName: string;
}

export const filhoteService = {
  solicitarReserva: (telefone: string) =>
    publicApi.post<FilhoteReservaResposta>("/public/filhotes/solicitar-reserva", {
      telefone,
    }),
};
