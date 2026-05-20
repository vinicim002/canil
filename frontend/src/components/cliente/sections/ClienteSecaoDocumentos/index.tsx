import { CLIENTE_DOCUMENTOS } from "../../../../constants/cliente";

export function ClienteSecaoDocumentos() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Documentos</h2>

      <div className="grid grid-cols-3 gap-5">
        {CLIENTE_DOCUMENTOS.map((doc) => (
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
                <span className="text-body/50 text-xs">{doc.status}</span>
              </div>
            </div>
            <button
              disabled={doc.status !== "Disponível"}
              className={`w-full py-2 rounded-full text-sm font-medium transition-colors ${
                doc.status === "Disponível"
                  ? "bg-brown text-white hover:bg-orange cursor-pointer"
                  : "bg-brown/10 text-brown/30 cursor-not-allowed"
              }`}
            >
              {doc.status === "Disponível" ? "Baixar" : "Indisponível"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
