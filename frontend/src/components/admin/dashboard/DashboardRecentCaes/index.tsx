import { Link } from "react-router-dom";
import type { CaoResponse } from "../../../../services/caoService/caoResponse";
import { tipoCaoLabel } from "../../../../utils/statusColors";

interface DashboardRecentCaesProps {
  caes: CaoResponse[];
}

export function DashboardRecentCaes({ caes }: DashboardRecentCaesProps) {
  return (
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
        {caes.length === 0 ? (
          <div className="flex items-center justify-center py-10 lg:col-span-2">
            <span className="text-body/50 text-sm font-medium">
              Nenhum cão cadastrado.
            </span>
          </div>
        ) : (
          caes.map((c) => (
            <div
              key={c.id}
              className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
            >
              <div className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                  <span className="text-sm">🐕</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brown font-medium text-sm">{c.nome}</span>
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
  );
}
