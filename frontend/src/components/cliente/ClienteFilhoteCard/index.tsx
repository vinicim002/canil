import { WHATSAPP_CANIL_NUMERO } from "../../../constants/whatsapp";
import type { ReservaResponse } from "../../../services/reservaService";
import { formatarData, formatarMoeda, labelStatusReserva } from "../../../utils/format";

interface ClienteFilhoteCardProps {
  reserva: ReservaResponse;
}

export function ClienteFilhoteCard({ reserva }: ClienteFilhoteCardProps) {
  const statusLabel = labelStatusReserva(reserva.status);

  return (
    <div className="cliente-filhote-card bg-brown rounded-2xl p-8 flex flex-row items-center gap-8">
      <div className="w-24 h-24 rounded-2xl bg-orange/30 flex items-center justify-center shrink-0">
        <span className="text-5xl">🐾</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-row items-center gap-3">
          <h2 className="font-cmas-play text-white text-3xl">{reserva.nomeCao}</h2>
          <span className="bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
            {statusLabel}
          </span>
        </div>
        <p className="text-white/60 font-medium text-sm">
          Valor total: {formatarMoeda(reserva.valorTotal)} · Sinal:{" "}
          {formatarMoeda(reserva.valorSinal)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-white/40 text-xs font-medium">
          Reserva #{reserva.id.slice(0, 8).toUpperCase()}
        </span>
        <span className="text-white/40 text-xs font-medium">
          desde {formatarData(reserva.criadoEm)}
        </span>
        <a
          href={`https://wa.me/${WHATSAPP_CANIL_NUMERO}`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 text-white font-medium text-sm py-2 px-5 rounded-full hover:bg-green-600 transition-colors mt-1"
        >
          📱 WhatsApp
        </a>
      </div>
    </div>
  );
}
