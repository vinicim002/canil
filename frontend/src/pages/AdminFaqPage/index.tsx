import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface FaqResponse {
  id: string;
  pergunta: string;
  resposta: string;
  ordem: number;
  ativo: boolean;
}

interface FaqRequest {
  pergunta: string;
  resposta: string;
  ordem: number;
}

const formInicial: FaqRequest = { pergunta: "", resposta: "", ordem: 0 };

export function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modal, setModal] = useState<"adicionar" | "editar" | null>(null);
  const [faqSelecionado, setFaqSelecionado] = useState<FaqResponse | null>(
    null,
  );
  const [form, setForm] = useState<FaqRequest>(formInicial);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setCarregando(true);
      const data = await api.get<FaqResponse[]>("/faq/todos");
      setFaqs(data);
    } finally {
      setCarregando(false);
    }
  }

  function abrirAdicionar() {
    setForm(formInicial);
    setModal("adicionar");
  }

  function abrirEditar(faq: FaqResponse) {
    setFaqSelecionado(faq);
    setForm({
      pergunta: faq.pergunta,
      resposta: faq.resposta,
      ordem: faq.ordem,
    });
    setModal("editar");
  }

  function fechar() {
    setModal(null);
    setFaqSelecionado(null);
    setForm(formInicial);
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    try {
      if (modal === "adicionar") {
        await api.post("/faq", form);
      } else if (modal === "editar" && faqSelecionado) {
        await api.put(`/faq/${faqSelecionado.id}`, form);
      }
      await carregar();
      fechar();
    } finally {
      setSalvando(false);
    }
  }

  async function handleDesativar(id: string) {
    await api.patch(`/faq/${id}/desativar`);
    await carregar();
  }

  async function handleDeletar(id: string) {
    if (!confirm("Deletar esta pergunta?")) return;
    await api.delete(`/faq/${id}`);
    await carregar();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-cmas-play text-brown text-3xl">FAQ</h1>
          <p className="text-body/50 text-sm font-medium">
            {faqs.length} perguntas cadastradas
          </p>
        </div>
        <button
          onClick={abrirAdicionar}
          className="bg-brown text-white font-medium py-2.5 px-6 rounded-full hover:bg-orange transition-colors cursor-pointer text-sm"
        >
          + Adicionar pergunta
        </button>
      </div>

      {carregando ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-body/50 font-medium">Carregando...</span>
        </div>
      ) : faqs.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-body/50 font-medium">
            Nenhuma pergunta cadastrada.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <div
              key={f.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col gap-3 ${f.ativo ? "border-brown/10" : "border-red-100 opacity-60"}`}
            >
              <div className="flex flex-row items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-row items-center gap-2">
                    <span className="bg-brown/10 text-brown text-xs font-medium py-0.5 px-2 rounded-full">
                      #{f.ordem}
                    </span>
                    {!f.ativo && (
                      <span className="bg-red-100 text-red-500 text-xs font-medium py-0.5 px-2 rounded-full">
                        Inativo
                      </span>
                    )}
                  </div>
                  <h3 className="font-cmas-play text-brown text-lg">
                    {f.pergunta}
                  </h3>
                  <p className="text-body font-medium text-sm leading-relaxed">
                    {f.resposta}
                  </p>
                </div>
                <div className="flex flex-row gap-2 shrink-0">
                  <button
                    onClick={() => abrirEditar(f)}
                    className="bg-brown text-white text-xs font-medium py-1.5 px-3 rounded-full hover:bg-orange transition-colors cursor-pointer"
                  >
                    Editar
                  </button>
                  {f.ativo && (
                    <button
                      onClick={() => handleDesativar(f.id)}
                      className="bg-yellow-50 text-yellow-600 text-xs font-medium py-1.5 px-3 rounded-full hover:bg-yellow-100 transition-colors cursor-pointer"
                    >
                      Desativar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletar(f.id)}
                    className="bg-red-50 text-red-500 text-xs font-medium py-1.5 px-3 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
              <h2 className="font-cmas-play text-brown text-2xl">
                {modal === "adicionar"
                  ? "Adicionar pergunta"
                  : "Editar pergunta"}
              </h2>
              <button
                onClick={fechar}
                className="text-body/40 hover:text-brown text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSalvar} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-brown font-medium text-sm">
                  Pergunta
                </label>
                <input
                  type="text"
                  placeholder="Digite a pergunta..."
                  value={form.pergunta}
                  onChange={(e) =>
                    setForm({ ...form, pergunta: e.target.value })
                  }
                  required
                  className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-brown font-medium text-sm">
                  Resposta
                </label>
                <textarea
                  placeholder="Digite a resposta..."
                  value={form.resposta}
                  onChange={(e) =>
                    setForm({ ...form, resposta: e.target.value })
                  }
                  rows={4}
                  required
                  className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors resize-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-brown font-medium text-sm">Ordem</label>
                <input
                  type="number"
                  min={0}
                  value={form.ordem}
                  onChange={(e) =>
                    setForm({ ...form, ordem: Number(e.target.value) })
                  }
                  className="w-32 bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                />
              </div>
              <div className="flex flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={fechar}
                  className="flex-1 bg-cream text-brown font-medium py-3 rounded-full hover:bg-brown/10 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="flex-1 bg-brown text-white font-medium py-3 rounded-full hover:bg-orange transition-colors cursor-pointer disabled:opacity-50"
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
