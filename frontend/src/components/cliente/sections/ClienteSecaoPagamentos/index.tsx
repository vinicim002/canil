import { CLIENTE_PAGAMENTOS } from "../../../../constants/cliente";

export function ClienteSecaoPagamentos() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Pagamentos</h2>

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-brown/10 flex flex-row justify-between items-center">
          <h3 className="font-cmas-play text-brown text-xl">Histórico</h3>
          <span className="text-body/50 text-sm font-medium">
            Total: R$ 2.800,00
          </span>
        </div>
        <div className="flex flex-col">
          {CLIENTE_PAGAMENTOS.map((p, i) => (
            <div
              key={i}
              className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-brown font-medium text-sm">
                  {p.descricao}
                </span>
                <span className="text-body/50 text-xs">
                  {p.data} · {p.tipo}
                </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <span className="font-cmas-play text-brown text-lg">
                  {p.valor}
                </span>
                <span
                  className={`text-xs font-medium py-1 px-3 rounded-full ${p.status === "PAGO" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-brown rounded-2xl p-6 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-cmas-play text-brown text-xl">
            Pagar saldo restante
          </span>
          <span className="text-body/60 text-sm font-medium">
            R$ 2.300,00 — vencimento 20/05/2026
          </span>
        </div>
        <button className="bg-brown text-white font-medium py-3 px-6 rounded-full hover:bg-orange transition-colors cursor-pointer">
          Pagar agora
        </button>
      </div>
    </div>
  );
}
