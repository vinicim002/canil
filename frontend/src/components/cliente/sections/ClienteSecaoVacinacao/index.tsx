import type { ClientePortalData } from "../../ClienteSectionContent";
import { formatarData } from "../../../../utils/format";

interface Props {
  portal: ClientePortalData;
}

export function ClienteSecaoVacinacao({ portal }: Props) {
  const nomeCao = portal.reserva?.nomeCao ?? "seu filhote";

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Carteira de Vacinação</h2>

      {portal.vacinas.length === 0 ? (
        <p className="text-body/60 text-sm">
          Nenhuma vacina registrada ainda para {nomeCao}.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-brown/10">
            <h3 className="font-cmas-play text-brown text-xl">
              Vacinas de {nomeCao}
            </h3>
          </div>
          <div className="flex flex-col">
            {portal.vacinas.map((v) => {
              const ok = v.dataAplicacao && v.dataAplicacao !== "—";
              return (
                <div
                  key={v.id}
                  className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0"
                >
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ok ? "bg-green-100" : "bg-yellow-100"}`}
                    >
                      <span className="text-sm">{ok ? "✓" : "!"}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-brown font-medium text-sm">
                        {v.nomeVacina}
                      </span>
                      <span className="text-body/50 text-xs">
                        Lote: {v.lote ?? "—"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-8">
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-body/50 text-xs">Aplicada em</span>
                      <span className="text-brown font-medium text-sm">
                        {formatarData(v.dataAplicacao)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-body/50 text-xs">Próxima dose</span>
                      <span className="text-orange font-medium text-sm">
                        {formatarData(v.proximaDose)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
