import { Link } from "react-router-dom";
import type { ReservaResponse } from "../../../../services/reservaService";
import { getStatusColor, statusReservaColor } from "../../../../utils/statusColors";

interface DashboardRecentReservasProps {
  reservas: ReservaResponse[];
}

export function DashboardRecentReservas({ reservas }: DashboardRecentReservasProps) {
  return (
    <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden">
      <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
        <h3 className="font-cmas-play text-brown text-xl">Reservas Recentes</h3>
        <Link
          to="/admin/reservas"
          className="text-orange text-sm font-medium hover:underline"
        >
          Ver todas
        </Link>
      </div>
      <div className="admin-tabela-body">
        {reservas.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-body/50 text-sm font-medium">
              Nenhuma reserva ainda.
            </span>
          </div>
        ) : (
          reservas.map((r) => (
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
                  className={`text-xs font-medium py-1 px-2 rounded-full ${getStatusColor(statusReservaColor, r.status)}`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
