import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface AgendamentoResponse {
  id: string;
  nomeUsuario: string;
  nomeCao: string | null;
  dataHora: string;
  status: string;
  observacoes: string;
}

const statusColor: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-700",
  REALIZADO: "bg-blue-100 text-blue-700",
};

export function AdminAgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get<AgendamentoResponse[]>("/agendamentos")
      .then(setAgendamentos)
      .finally(() => setCarregando(false));
  }, []);

  async function handleAcao(
    id: string,
    acao: "confirmar" | "realizado" | "cancelar",
  ) {
    await api.patch(`/agendamentos/${id}/${acao}`);
    const data = await api.get<AgendamentoResponse[]>("/agendamentos");
    setAgendamentos(data);
  }

  function formatarData(dataHora: string) {
    return new Date(dataHora).toLocaleString("pt-BR");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-cmas-play text-brown text-3xl">Agendamentos</h1>
        <p className="text-body/50 text-sm font-medium">
          {agendamentos.length} agendamentos
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="grid grid-cols-5 px-6 py-3 border-b border-brown/10 bg-cream/50">
          <span className="text-body/50 text-xs font-medium">Cliente</span>
          <span className="text-body/50 text-xs font-medium">Cão</span>
          <span className="text-body/50 text-xs font-medium">Data e Hora</span>
          <span className="text-body/50 text-xs font-medium">Status</span>
          <span className="text-body/50 text-xs font-medium">Ações</span>
        </div>

        {carregando ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-body/50 font-medium">Carregando...</span>
          </div>
        ) : agendamentos.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-body/50 font-medium">
              Nenhum agendamento.
            </span>
          </div>
        ) : (
          agendamentos.map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-5 px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/30 transition-colors items-center"
            >
              <span className="text-brown font-medium text-sm">
                {a.nomeUsuario}
              </span>
              <span className="text-body font-medium text-sm">
                {a.nomeCao || "—"}
              </span>
              <span className="text-body font-medium text-sm">
                {formatarData(a.dataHora)}
              </span>
              <span
                className={`text-xs font-medium py-1 px-2 rounded-full w-fit ${statusColor[a.status] || "bg-gray-100 text-gray-700"}`}
              >
                {a.status}
              </span>
              <div className="flex flex-row gap-2">
                {a.status === "PENDENTE" && (
                  <button
                    onClick={() => handleAcao(a.id, "confirmar")}
                    className="text-green-600 text-xs font-medium hover:underline cursor-pointer"
                  >
                    Confirmar
                  </button>
                )}
                {a.status === "CONFIRMADO" && (
                  <button
                    onClick={() => handleAcao(a.id, "realizado")}
                    className="text-blue-600 text-xs font-medium hover:underline cursor-pointer"
                  >
                    Realizado
                  </button>
                )}
                {a.status !== "CANCELADO" && a.status !== "REALIZADO" && (
                  <button
                    onClick={() => handleAcao(a.id, "cancelar")}
                    className="text-red-500 text-xs font-medium hover:underline cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
