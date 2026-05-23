import type { ClientePortalData } from "../../ClienteSectionContent";
import { formatarData, formatarMoeda, labelStatusReserva } from "../../../../utils/format";

interface Props {
  portal: ClientePortalData;
}

export function ClienteSecaoReserva({ portal }: Props) {
  const reserva = portal.reserva;
  if (!reserva) {
    return (
      <p className="text-body/60 text-sm">Nenhuma reserva ativa no momento.</p>
    );
  }

  const linhaTempo = [
    {
      label: "Reserva realizada",
      data: formatarData(reserva.criadoEm),
      feito: true,
    },
    {
      label: "Sinal pago",
      data: portal.pagamentos.some((p) => p.tipo === "SINAL" && p.status === "APROVADO")
        ? formatarData(
            portal.pagamentos.find((p) => p.tipo === "SINAL")?.pagoEm ??
              portal.pagamentos.find((p) => p.tipo === "SINAL")?.criadoEm,
          )
        : "—",
      feito: portal.pagamentos.some((p) => p.tipo === "SINAL" && p.status === "APROVADO"),
    },
    {
      label: "Reserva aprovada",
      data: reserva.status === "APROVADA" || reserva.status === "PAGA" ? "Concluído" : "—",
      feito: reserva.status === "APROVADA" || reserva.status === "PAGA",
    },
    {
      label: "Pagamento final",
      data:
        reserva.status === "PAGA"
          ? "Concluído"
          : formatarMoeda(reserva.valorRestante) + " pendente",
      feito: reserva.status === "PAGA",
    },
    {
      label: "Entrega do filhote",
      data: reserva.status === "PAGA" ? "A combinar" : "—",
      feito: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Minha Reserva</h2>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-2">
          <span className="text-body/50 text-sm font-medium">Status</span>
          <span className="font-cmas-play text-brown text-2xl">
            {labelStatusReserva(reserva.status)}
          </span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-2">
          <span className="text-body/50 text-sm font-medium">Valor do sinal</span>
          <span className="font-cmas-play text-brown text-2xl">
            {formatarMoeda(reserva.valorSinal)}
          </span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-2">
          <span className="text-body/50 text-sm font-medium">Valor restante</span>
          <span className="font-cmas-play text-brown text-2xl">
            {formatarMoeda(reserva.valorRestante)}
          </span>
        </div>
      </div>

      {reserva.observacoes && (
        <p className="text-body/70 text-sm bg-cream rounded-xl p-4 border border-brown/10">
          {reserva.observacoes}
        </p>
      )}

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-brown/10">
          <h3 className="font-cmas-play text-brown text-xl">Linha do Tempo</h3>
        </div>
        <div className="px-6 py-4 flex flex-col gap-4">
          {linhaTempo.map((item, i) => (
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
                <span className="text-body/40 text-xs font-medium">{item.data}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
