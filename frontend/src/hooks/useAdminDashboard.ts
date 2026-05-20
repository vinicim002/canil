import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ReservaResponse } from "../services/reservaService";
import type { CaoResponse } from "../services/caoService/caoResponse";

export interface DashboardMetricas {
  filhotesDisponiveis: number;
  reservasAtivas: number;
  clientesCadastrados: number;
  agendamentosPendentes: number;
}

export interface DashboardMetricaCard {
  label: string;
  valor: number;
  icon: string;
  variacao: string;
  link: string;
}

const METRICAS_INICIAIS: DashboardMetricas = {
  filhotesDisponiveis: 0,
  reservasAtivas: 0,
  clientesCadastrados: 0,
  agendamentosPendentes: 0,
};

function ordenarPorDataRecente<T extends { criadoEm: string }>(items: T[]) {
  return [...items].sort(
    (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
  );
}

export function useAdminDashboard() {
  const [metricas, setMetricas] = useState<DashboardMetricas>(METRICAS_INICIAIS);
  const [reservasRecentes, setReservasRecentes] = useState<ReservaResponse[]>([]);
  const [filhotesRecentes, setFilhotesRecentes] = useState<CaoResponse[]>([]);
  const [caesRecentes, setCaesRecentes] = useState<CaoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setCarregando(true);

      const [
        filhotes,
        matrizes,
        reprodutores,
        reservas,
        clientes,
        agendamentos,
      ] = await Promise.all([
        api.get<CaoResponse[]>("/caes?tipo=FILHOTE"),
        api.get<CaoResponse[]>("/caes?tipo=MATRIZ"),
        api.get<CaoResponse[]>("/caes?tipo=REPRODUTOR"),
        api.get<ReservaResponse[]>("/reservas"),
        api.get<unknown[]>("/clientes"),
        api.get<unknown[]>("/agendamentos"),
      ]);

      const caes = [...matrizes, ...reprodutores];

      setMetricas({
        filhotesDisponiveis: filhotes.filter((c) => c.status === "DISPONIVEL")
          .length,
        reservasAtivas: reservas.filter(
          (r) =>
            r.status === "SOLICITADA" ||
            r.status === "EM_ANALISE" ||
            r.status === "APROVADA",
        ).length,
        clientesCadastrados: clientes.length,
        agendamentosPendentes: (
          agendamentos as Array<{ status: string }>
        ).filter((a) => a.status === "PENDENTE").length,
      });

      setReservasRecentes(ordenarPorDataRecente(reservas).slice(0, 5));
      setFilhotesRecentes(ordenarPorDataRecente(filhotes).slice(0, 5));
      setCaesRecentes(ordenarPorDataRecente(caes).slice(0, 5));
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    } finally {
      setCarregando(false);
    }
  }

  const cards: DashboardMetricaCard[] = [
    {
      label: "Filhotes disponíveis",
      valor: metricas.filhotesDisponiveis,
      icon: "🐾",
      variacao: "prontos para reserva",
      link: "/admin/filhotes",
    },
    {
      label: "Reservas ativas",
      valor: metricas.reservasAtivas,
      icon: "📋",
      variacao: "solicitadas ou aprovadas",
      link: "/admin/reservas",
    },
    {
      label: "Clientes cadastrados",
      valor: metricas.clientesCadastrados,
      icon: "👤",
      variacao: "no total",
      link: "/admin/clientes",
    },
    {
      label: "Agendamentos pendentes",
      valor: metricas.agendamentosPendentes,
      icon: "📅",
      variacao: "aguardando confirmação",
      link: "/admin/agendamentos",
    },
  ];

  return {
    cards,
    reservasRecentes,
    filhotesRecentes,
    caesRecentes,
    carregando,
  };
}
