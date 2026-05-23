import { api } from "./api";

export interface PagamentoResponse {
  id: string;
  reservaId: string;
  valor: number;
  status: string;
  tipo: string;
  metodo: string;
  transacaoId?: string;
  gateway?: string;
  pagoEm?: string;
  criadoEm: string;
}

export const pagamentoService = {
  listarPorReserva: (reservaId: string) =>
    api.get<PagamentoResponse[]>(`/pagamentos/reserva/${reservaId}`),
};
