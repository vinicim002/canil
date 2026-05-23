import { useEffect, useState } from "react";
import { reservaService, type ReservaResponse } from "../services/reservaService";
import { pagamentoService, type PagamentoResponse } from "../services/pagamentoService";
import { vacinacaoService, type VacinacaoResponse } from "../services/vacinacaoService";

const STATUS_RESERVA_ATIVA = new Set([
  "SOLICITADA",
  "EM_ANALISE",
  "APROVADA",
  "PAGA",
]);

export function useClientePortal() {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [reserva, setReserva] = useState<ReservaResponse | null>(null);
  const [pagamentos, setPagamentos] = useState<PagamentoResponse[]>([]);
  const [vacinas, setVacinas] = useState<VacinacaoResponse[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function carregar() {
      setLoading(true);
      setErro("");
      try {
        const reservas = await reservaService.listarMinhas();
        const ativa =
          reservas.find((r) => STATUS_RESERVA_ATIVA.has(r.status)) ??
          reservas[0] ??
          null;

        if (cancelled) return;
        setReserva(ativa);

        if (!ativa) {
          setPagamentos([]);
          setVacinas([]);
          return;
        }

        const [pags, vacs] = await Promise.all([
          pagamentoService.listarPorReserva(ativa.id),
          vacinacaoService.listarPorCao(ativa.caoId),
        ]);

        if (!cancelled) {
          setPagamentos(pags);
          setVacinas(vacs);
        }
      } catch {
        if (!cancelled) {
          setErro("Não foi possível carregar seus dados. Tente novamente.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    carregar();
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, erro, reserva, pagamentos, vacinas };
}
