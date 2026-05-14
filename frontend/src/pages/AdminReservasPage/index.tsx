import { useState, useEffect } from "react";
import {
  reservaService,
  type ReservaResponse,
} from "../../services/reservaService";

const statusColor: Record<string, string> = {
  SOLICITADA: "bg-yellow-100 text-yellow-700",
  EM_ANALISE: "bg-blue-100 text-blue-700",
  APROVADA: "bg-green-100 text-green-700",
  REJEITADA: "bg-red-100 text-red-700",
  PAGA: "bg-purple-100 text-purple-700",
  CANCELADA: "bg-red-100 text-red-700",
};

export function AdminReservasPage() {
  const [reservas, setReservas] = useState<ReservaResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [reservaSelecionada, setReservaSelecionada] =
    useState<ReservaResponse | null>(null);

  useEffect(() => {
    carregarReservas();
  }, []);

  async function carregarReservas() {
    try {
      setCarregando(true);
      const data = await reservaService.listarTodas();
      setReservas(data);
    } finally {
      setCarregando(false);
    }
  }

  async function handleAprovar(id: string) {
    await reservaService.aprovar(id);
    await carregarReservas();
    setReservaSelecionada(null);
  }

  async function handleCancelar(id: string) {
    if (!confirm("Cancelar esta reserva?")) return;
    await reservaService.cancelar(id);
    await carregarReservas();
    setReservaSelecionada(null);
  }

  async function handlePagar(id: string) {
    await reservaService.pagar(id);
    await carregarReservas();
    setReservaSelecionada(null);
  }

  const reservasFiltradas = reservas.filter(
    (r) => filtroStatus === "" || r.status === filtroStatus,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-cmas-play text-brown text-3xl">Reservas</h1>
          <p className="text-body/50 text-sm font-medium">
            {reservas.length} reservas no total
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="bg-white border border-brown/20 rounded-xl py-2.5 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
        >
          <option value="">Todos os status</option>
          {Object.keys(statusColor).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {filtroStatus && (
          <button
            onClick={() => setFiltroStatus("")}
            className="text-orange text-sm font-medium hover:underline"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="grid grid-cols-6 px-6 py-3 border-b border-brown/10 bg-cream/50">
          <span className="text-body/50 text-xs font-medium col-span-2">
            Cliente / Cão
          </span>
          <span className="text-body/50 text-xs font-medium">Valor Sinal</span>
          <span className="text-body/50 text-xs font-medium">Valor Total</span>
          <span className="text-body/50 text-xs font-medium">Status</span>
          <span className="text-body/50 text-xs font-medium">Ações</span>
        </div>

        {carregando ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-body/50 font-medium">Carregando...</span>
          </div>
        ) : reservasFiltradas.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-body/50 font-medium">
              Nenhuma reserva encontrada.
            </span>
          </div>
        ) : (
          reservasFiltradas.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-6 px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/30 transition-colors items-center"
            >
              <div className="flex flex-col gap-0.5 col-span-2">
                <span className="text-brown font-medium text-sm">
                  {r.nomeUsuario}
                </span>
                <span className="text-body/50 text-xs">🐾 {r.nomeCao}</span>
              </div>
              <span className="text-brown font-medium text-sm">
                R$ {r.valorSinal?.toFixed(2)}
              </span>
              <span className="text-brown font-medium text-sm">
                R$ {r.valorTotal?.toFixed(2)}
              </span>
              <span
                className={`text-xs font-medium py-1 px-2 rounded-full w-fit ${statusColor[r.status] || "bg-gray-100 text-gray-700"}`}
              >
                {r.status}
              </span>
              <button
                onClick={() => setReservaSelecionada(r)}
                className="text-orange text-xs font-medium hover:underline w-fit"
              >
                Ver detalhes
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal detalhe */}
      {reservaSelecionada && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
              <h2 className="font-cmas-play text-brown text-2xl">
                Detalhes da Reserva
              </h2>
              <button
                onClick={() => setReservaSelecionada(null)}
                className="text-body/40 hover:text-brown text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Cliente", valor: reservaSelecionada.nomeUsuario },
                  { label: "Cão", valor: reservaSelecionada.nomeCao },
                  {
                    label: "Valor do sinal",
                    valor: `R$ ${reservaSelecionada.valorSinal?.toFixed(2)}`,
                  },
                  {
                    label: "Valor total",
                    valor: `R$ ${reservaSelecionada.valorTotal?.toFixed(2)}`,
                  },
                  {
                    label: "Valor restante",
                    valor: `R$ ${reservaSelecionada.valorRestante?.toFixed(2)}`,
                  },
                  { label: "Status", valor: reservaSelecionada.status },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-body/50 text-xs font-medium">
                      {item.label}
                    </span>
                    <span className="text-brown font-medium text-sm">
                      {item.valor}
                    </span>
                  </div>
                ))}
              </div>
              {reservaSelecionada.observacoes && (
                <div className="flex flex-col gap-1">
                  <span className="text-body/50 text-xs font-medium">
                    Observações
                  </span>
                  <span className="text-brown font-medium text-sm">
                    {reservaSelecionada.observacoes}
                  </span>
                </div>
              )}
              <div className="flex flex-row gap-3 pt-2">
                {reservaSelecionada.status === "SOLICITADA" ||
                reservaSelecionada.status === "EM_ANALISE" ? (
                  <button
                    onClick={() => handleAprovar(reservaSelecionada.id)}
                    className="flex-1 bg-green-500 text-white font-medium py-2.5 rounded-full hover:bg-green-600 transition-colors cursor-pointer text-sm"
                  >
                    Aprovar
                  </button>
                ) : null}
                {reservaSelecionada.status === "APROVADA" ? (
                  <button
                    onClick={() => handlePagar(reservaSelecionada.id)}
                    className="flex-1 bg-purple-500 text-white font-medium py-2.5 rounded-full hover:bg-purple-600 transition-colors cursor-pointer text-sm"
                  >
                    Marcar como paga
                  </button>
                ) : null}
                {reservaSelecionada.status !== "PAGA" &&
                reservaSelecionada.status !== "CANCELADA" ? (
                  <button
                    onClick={() => handleCancelar(reservaSelecionada.id)}
                    className="flex-1 bg-red-50 text-red-500 font-medium py-2.5 rounded-full hover:bg-red-100 transition-colors cursor-pointer text-sm"
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
