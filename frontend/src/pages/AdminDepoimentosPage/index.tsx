import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface DepoimentoResponse {
  id: string;
  nomeCliente: string;
  texto: string;
  nota: number;
  aprovado: boolean;
  destaque: boolean;
  criadoEm: string;
}

export function AdminDepoimentosPage() {
  const [depoimentos, setDepoimentos] = useState<DepoimentoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<"todos" | "pendentes" | "aprovados">(
    "todos",
  );

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setCarregando(true);
      const pendentes = await api.get<DepoimentoResponse[]>(
        "/depoimentos/pendentes",
      );
      const aprovados = await api.get<DepoimentoResponse[]>("/depoimentos");
      setDepoimentos([...pendentes, ...aprovados]);
    } finally {
      setCarregando(false);
    }
  }

  async function handleAprovar(id: string) {
    await api.patch(`/depoimentos/${id}/aprovar`);
    await carregar();
  }

  async function handleDestacar(id: string) {
    await api.patch(`/depoimentos/${id}/destacar`);
    await carregar();
  }

  async function handleDeletar(id: string) {
    if (!confirm("Deletar este depoimento?")) return;
    await api.delete(`/depoimentos/${id}`);
    await carregar();
  }

  const filtrados = depoimentos.filter((d) => {
    if (filtro === "pendentes") return !d.aprovado;
    if (filtro === "aprovados") return d.aprovado;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-cmas-play text-brown text-3xl">Depoimentos</h1>
        <p className="text-body/50 text-sm font-medium">
          {depoimentos.length} depoimentos
        </p>
      </div>

      <div className="flex flex-row gap-2">
        {(["todos", "pendentes", "aprovados"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer capitalize ${filtro === f ? "bg-brown text-white" : "bg-white border border-brown/20 text-body hover:bg-brown/5"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {carregando ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-body/50 font-medium">Carregando...</span>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-body/50 font-medium">Nenhum depoimento.</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtrados.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl border border-brown/10 p-5 flex flex-col gap-3"
            >
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-3">
                    <span className="font-cmas-play text-brown text-lg">
                      {d.nomeCliente}
                    </span>
                    {!d.aprovado && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-medium py-0.5 px-2 rounded-full">
                        Pendente
                      </span>
                    )}
                    {d.destaque && (
                      <span className="bg-orange text-white text-xs font-medium py-0.5 px-2 rounded-full">
                        ⭐ Destaque
                      </span>
                    )}
                  </div>
                  <span className="text-orange text-sm">
                    {"★".repeat(d.nota)}
                    {"☆".repeat(5 - d.nota)}
                  </span>
                </div>
                <div className="flex flex-row gap-2">
                  {!d.aprovado && (
                    <button
                      onClick={() => handleAprovar(d.id)}
                      className="bg-green-50 text-green-600 text-xs font-medium py-1.5 px-3 rounded-full hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      Aprovar
                    </button>
                  )}
                  {d.aprovado && !d.destaque && (
                    <button
                      onClick={() => handleDestacar(d.id)}
                      className="bg-orange/10 text-orange text-xs font-medium py-1.5 px-3 rounded-full hover:bg-orange/20 transition-colors cursor-pointer"
                    >
                      Destacar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletar(d.id)}
                    className="bg-red-50 text-red-500 text-xs font-medium py-1.5 px-3 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    Deletar
                  </button>
                </div>
              </div>
              <p className="text-body font-medium text-sm leading-relaxed">
                {d.texto}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
