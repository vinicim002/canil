import type { ClientePortalData } from "../../ClienteSectionContent";

interface Props {
  portal: ClientePortalData;
}

const DOCUMENTOS = [
  { nome: "Contrato de compra", icon: "📄" },
  { nome: "Pedigree", icon: "🏅" },
  { nome: "Carteira de vacinação", icon: "💉" },
  { nome: "Termo de garantia", icon: "✅" },
  { nome: "Orientações pós-venda", icon: "📘" },
];

function statusDocumento(
  nome: string,
  statusReserva: string | undefined,
): string {
  if (!statusReserva) return "Indisponível";
  if (statusReserva === "PAGA") return "Disponível";
  if (nome === "Carteira de vacinação" && (statusReserva === "APROVADA" || statusReserva === "PAGA")) {
    return "Disponível";
  }
  if (statusReserva === "APROVADA") return "Disponível após pagamento";
  return "Disponível após aprovação da reserva";
}

export function ClienteSecaoDocumentos({ portal }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Documentos</h2>
      <p className="text-body/60 text-sm">
        Download digital será disponibilizado em breve. Enquanto isso, solicite
        pelo WhatsApp.
      </p>

      <div className="grid grid-cols-3 gap-5">
        {DOCUMENTOS.map((doc) => {
          const status = statusDocumento(doc.nome, portal.reserva?.status);
          const disponivel = status === "Disponível";
          return (
            <div
              key={doc.nome}
              className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-4"
            >
              <div className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">{doc.icon}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-brown font-medium text-sm">{doc.nome}</span>
                  <span className="text-body/50 text-xs">{status}</span>
                </div>
              </div>
              <button
                disabled={!disponivel}
                className={`w-full py-2 rounded-full text-sm font-medium transition-colors ${
                  disponivel
                    ? "bg-brown text-white hover:bg-orange cursor-pointer"
                    : "bg-brown/10 text-brown/30 cursor-not-allowed"
                }`}
              >
                {disponivel ? "Solicitar no WhatsApp" : "Indisponível"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
