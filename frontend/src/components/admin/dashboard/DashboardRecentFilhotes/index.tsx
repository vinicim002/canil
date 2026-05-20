import { Link } from "react-router-dom";
import type { CaoResponse } from "../../../../services/caoService/caoResponse";
import { getStatusColor, statusFilhoteColor } from "../../../../utils/statusColors";

interface DashboardRecentFilhotesProps {
  filhotes: CaoResponse[];
}

export function DashboardRecentFilhotes({ filhotes }: DashboardRecentFilhotesProps) {
  return (
    <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden">
      <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
        <h3 className="font-cmas-play text-brown text-xl">Filhotes Recentes</h3>
        <Link
          to="/admin/filhotes"
          className="text-orange text-sm font-medium hover:underline"
        >
          Ver todos
        </Link>
      </div>
      <div className="admin-tabela-body">
        {filhotes.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <span className="text-body/50 text-sm font-medium">
              Nenhum filhote cadastrado.
            </span>
          </div>
        ) : (
          filhotes.map((c) => (
            <div
              key={c.id}
              className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
            >
              <div className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
                  <span className="text-sm">🐾</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brown font-medium text-sm">{c.nome}</span>
                  <span className="text-body/50 text-xs">
                    {c.tipoPelo} · {c.tamanho} · {c.genero}
                  </span>
                </div>
              </div>
              <span
                className={`text-xs font-medium py-1 px-2 rounded-full ${getStatusColor(statusFilhoteColor, c.status)}`}
              >
                {c.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
