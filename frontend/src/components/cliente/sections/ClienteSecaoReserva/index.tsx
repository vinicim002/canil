import {
  CLIENTE_LINHA_TEMPO,
  CLIENTE_RESUMO_RESERVA,
} from "../../../../constants/cliente";

export function ClienteSecaoReserva() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Minha Reserva</h2>

      <div className="grid grid-cols-3 gap-5">
        {CLIENTE_RESUMO_RESERVA.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-2"
          >
            <span className="text-body/50 text-sm font-medium">{item.label}</span>
            <div className="flex flex-row items-center gap-2">
              <span className="text-xl">{item.icon}</span>
              <span className="font-cmas-play text-brown text-2xl">
                {item.valor}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-brown/10">
          <h3 className="font-cmas-play text-brown text-xl">Linha do Tempo</h3>
        </div>
        <div className="px-6 py-4 flex flex-col gap-4">
          {CLIENTE_LINHA_TEMPO.map((item, i) => (
            <div key={i} className="flex flex-row items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.feito ? "bg-green-500" : "bg-brown/10"}`}
              >
                <span className="text-xs">{item.feito ? "✓" : "○"}</span>
              </div>
              <div className="flex flex-row items-center justify-between flex-1">
                <span
                  className={`text-sm font-medium ${item.feito ? "text-brown" : "text-body/50"}`}
                >
                  {item.label}
                </span>
                <span className="text-body/40 text-xs font-medium">
                  {item.data}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
