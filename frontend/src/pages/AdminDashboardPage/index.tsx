import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import type { ReservaResponse } from "../../services/reservaService";
import type { CaoResponse } from "../../services/caoService/caoResponse";

interface DashboardMetricas {
  filhotesDisponiveis: number;
  reservasAtivas: number;
  clientesCadastrados: number;
  agendamentosPendentes: number;
}

const statusReservaColor: Record<string, string> = {
  APROVADA: "bg-green-100 text-green-700",
  SOLICITADA: "bg-yellow-100 text-yellow-700",
  EM_ANALISE: "bg-blue-100 text-blue-700",
  PAGA: "bg-purple-100 text-purple-700",
  REJEITADA: "bg-red-100 text-red-700",
  CANCELADA: "bg-red-100 text-red-700",
};

const statusFilhoteColor: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-700",
  RESERVADO: "bg-yellow-100 text-yellow-700",
  VENDIDO: "bg-brown/10 text-brown",
};

const tipoCaoLabel: Record<string, string> = {
  FILHOTE: "Filhote",
  MATRIZ: "Matriz",
  REPRODUTOR: "Reprodutor",
};

export function AdminDashboardPage() {
  const [metricas, setMetricas] = useState<DashboardMetricas>({
    filhotesDisponiveis: 0,
    reservasAtivas: 0,
    clientesCadastrados: 0,
    agendamentosPendentes: 0,
  });
  const [reservasRecentes, setReservasRecentes] = useState<ReservaResponse[]>(
    [],
  );
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

      setReservasRecentes(
        [...reservas]
          .sort(
            (a, b) =>
              new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
          )
          .slice(0, 5),
      );

      setFilhotesRecentes(
        [...filhotes]
          .sort(
            (a, b) =>
              new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
          )
          .slice(0, 5),
      );

      setCaesRecentes(
        [...caes]
          .sort(
            (a, b) =>
              new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
          )
          .slice(0, 5),
      );
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
    } finally {
      setCarregando(false);
    }
  }

  const cards = [
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

  if (carregando) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange/20 border-t-orange rounded-full animate-spin" />
          <span className="text-body/50 font-medium text-sm">
            Carregando dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard flex flex-col gap-8">
      {/* Métricas */}
      <div className="admin-metricas grid grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((m) => (
          <Link
            key={m.label}
            to={m.link}
            className="admin-metrica-card bg-white rounded-2xl p-5 flex flex-col gap-3 border border-brown/10 hover:border-orange/30 hover:shadow-sm transition-all"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="text-body/50 text-sm font-medium">
                {m.label}
              </span>
              <span className="text-2xl">{m.icon}</span>
            </div>
            <span className="font-cmas-play text-brown text-4xl">
              {m.valor}
            </span>
            <span className="text-orange text-xs font-medium">
              {m.variacao}
            </span>
          </Link>
        ))}
      </div>

      {/* Tabelas */}
      <div className="admin-tabelas grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reservas recentes */}
        <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden">
          <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
            <h3 className="font-cmas-play text-brown text-xl">
              Reservas Recentes
            </h3>
            <Link
              to="/admin/reservas"
              className="text-orange text-sm font-medium hover:underline"
            >
              Ver todas
            </Link>
          </div>
          <div className="admin-tabela-body">
            {reservasRecentes.length === 0 ? (
              <div className="flex items-center justify-center py-10">
                <span className="text-body/50 text-sm font-medium">
                  Nenhuma reserva ainda.
                </span>
              </div>
            ) : (
              reservasRecentes.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-brown font-medium text-sm">
                      {r.nomeUsuario}
                    </span>
                    <span className="text-body/50 text-xs">
                      🐾 {r.nomeCao} ·{" "}
                      {new Date(r.criadoEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-brown font-semibold text-sm">
                      R$ {r.valorSinal?.toFixed(2)}
                    </span>
                    <span
                      className={`text-xs font-medium py-1 px-2 rounded-full ${statusReservaColor[r.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Filhotes recentes */}
        <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden">
          <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
            <h3 className="font-cmas-play text-brown text-xl">
              Filhotes Recentes
            </h3>
            <Link
              to="/admin/filhotes"
              className="text-orange text-sm font-medium hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="admin-tabela-body">
            {filhotesRecentes.length === 0 ? (
              <div className="flex items-center justify-center py-10">
                <span className="text-body/50 text-sm font-medium">
                  Nenhum filhote cadastrado.
                </span>
              </div>
            ) : (
              filhotesRecentes.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
                      <span className="text-sm">🐾</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brown font-medium text-sm">
                        {c.nome}
                      </span>
                      <span className="text-body/50 text-xs">
                        {c.tipoPelo} · {c.tamanho} · {c.genero}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium py-1 px-2 rounded-full ${statusFilhoteColor[c.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {c.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cães recentes (Matrizes + Reprodutores) */}
        <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden lg:col-span-2">
          <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
            <h3 className="font-cmas-play text-brown text-xl">Cães Recentes</h3>
            <Link
              to="/admin/caes"
              className="text-orange text-sm font-medium hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="admin-tabela-body grid grid-cols-1 lg:grid-cols-2">
            {caesRecentes.length === 0 ? (
              <div className="flex items-center justify-center py-10 lg:col-span-2">
                <span className="text-body/50 text-sm font-medium">
                  Nenhum cão cadastrado.
                </span>
              </div>
            ) : (
              caesRecentes.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                      <span className="text-sm">🐕</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brown font-medium text-sm">
                        {c.nome}
                      </span>
                      <span className="text-body/50 text-xs">
                        {c.tipoPelo} · {c.tamanho} · {c.genero}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium py-1 px-2 rounded-full bg-orange/10 text-orange">
                    {tipoCaoLabel[c.tipo] ?? c.tipo}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
