import { CLIENTE_VACINAS } from "../../../../constants/cliente";

export function ClienteSecaoVacinacao() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Carteira de Vacinação</h2>

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-brown/10">
          <h3 className="font-cmas-play text-brown text-xl">Vacinas de Thor</h3>
        </div>
        <div className="flex flex-col">
          {CLIENTE_VACINAS.map((v, i) => (
            <div
              key={i}
              className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
            >
              <div className="flex flex-row items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${v.status === "OK" ? "bg-green-100" : "bg-yellow-100"}`}
                >
                  <span className="text-sm">{v.status === "OK" ? "✓" : "!"}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brown font-medium text-sm">{v.vacina}</span>
                  <span className="text-body/50 text-xs">Lote: {v.lote}</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-body/50 text-xs">Aplicada em</span>
                  <span className="text-brown font-medium text-sm">{v.data}</span>
                </div>
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-body/50 text-xs">Próxima dose</span>
                  <span className="text-orange font-medium text-sm">
                    {v.proxima}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
