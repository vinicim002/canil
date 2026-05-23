import { WHATSAPP_CANIL_NUMERO } from "../../../../constants/whatsapp";
import type { ClientePortalData } from "../../ClienteSectionContent";
import { formatarData, formatarMoeda, labelStatusPagamento } from "../../../../utils/format";

interface Props {
  portal: ClientePortalData;
}

export function ClienteSecaoPagamentos({ portal }: Props) {
  const reserva = portal.reserva;
  const pagamentos = portal.pagamentos;
  const total = pagamentos.reduce((s, p) => s + p.valor, 0);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Pagamentos</h2>

      {pagamentos.length === 0 ? (
        <p className="text-body/60 text-sm">
          Nenhum pagamento registrado ainda. O canil irá registrar após confirmação.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-brown/10 flex flex-row justify-between items-center">
            <h3 className="font-cmas-play text-brown text-xl">Histórico</h3>
            <span className="text-body/50 text-sm font-medium">
              Total registrado: {formatarMoeda(total)}
            </span>
          </div>
          <div className="flex flex-col">
            {pagamentos.map((p) => (
              <div
                key={p.id}
                className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-brown font-medium text-sm">
                    {p.tipo === "SINAL" ? "Sinal de reserva" : "Pagamento complementar"}
                  </span>
                  <span className="text-body/50 text-xs">
                    {formatarData(p.pagoEm ?? p.criadoEm)} · {p.metodo}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <span className="font-cmas-play text-brown text-lg">
                    {formatarMoeda(p.valor)}
                  </span>
                  <span
                    className={`text-xs font-medium py-1 px-3 rounded-full ${
                      p.status === "APROVADO"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {labelStatusPagamento(p.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reserva && reserva.valorRestante > 0 && reserva.status !== "PAGA" && (
        <div className="glass-brown rounded-2xl p-6 flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-cmas-play text-brown text-xl">Saldo restante</span>
            <span className="text-body/60 text-sm font-medium">
              {formatarMoeda(reserva.valorRestante)} — entre em contato para pagar
            </span>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_CANIL_NUMERO}`}
            target="_blank"
            rel="noreferrer"
            className="bg-brown text-white font-medium py-3 px-6 rounded-full hover:bg-orange transition-colors"
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
