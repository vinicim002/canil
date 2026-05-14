import type { CaoRequest } from "../../services/caoService";

interface ModalProps {
  handleSalvar: (e: React.FormEvent) => void;
  fecharModal: () => void;
  form: CaoRequest;
  setForm: React.Dispatch<React.SetStateAction<CaoRequest>>;
  salvando: boolean;
  erro: string | null;
  modalTipo: "adicionar" | "editar" | null;
  TIPOS_PELO: string[];
  TAMANHOS: string[];
  GENEROS: string[];
  STATUS: string[];
}

export function Modal({
  modalTipo,
  handleSalvar,
  fecharModal,
  form,
  setForm,
  salvando,
  erro,
  TIPOS_PELO,
  TAMANHOS,
  GENEROS,
  STATUS,
}: ModalProps) {
  return (
    <>
      {(modalTipo === "adicionar" || modalTipo === "editar") && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
              <h2 className="font-cmas-play text-brown text-2xl">
                {modalTipo === "adicionar" ? "Adicionar cao" : "Editar cao"}
              </h2>
              <button
                onClick={fecharModal}
                className="text-body/40 hover:text-brown text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvar} className="p-6 flex flex-col gap-5">
              {erro && (
                <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">
                  {erro}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-brown font-medium text-sm">Nome</label>
                  <input
                    type="text"
                    placeholder="Nome do cão"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-brown font-medium text-sm">
                    Tipo de pelo
                  </label>
                  <select
                    value={form.tipoPelo}
                    onChange={(e) =>
                      setForm({ ...form, tipoPelo: e.target.value })
                    }
                    required
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                  >
                    <option value="">Selecione</option>
                    {TIPOS_PELO.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-brown font-medium text-sm">
                    Tamanho
                  </label>
                  <select
                    value={form.tamanho}
                    onChange={(e) =>
                      setForm({ ...form, tamanho: e.target.value })
                    }
                    required
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                  >
                    <option value="">Selecione</option>
                    {TAMANHOS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-brown font-medium text-sm">
                    Gênero
                  </label>
                  <select
                    value={form.genero}
                    onChange={(e) =>
                      setForm({ ...form, genero: e.target.value })
                    }
                    required
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                  >
                    <option value="">Selecione</option>
                    {GENEROS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-brown font-medium text-sm">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-brown font-medium text-sm">Cor</label>
                  <input
                    type="text"
                    placeholder="Ex: Caramelo, Preto e Caramelo..."
                    value={form.cor}
                    onChange={(e) => setForm({ ...form, cor: e.target.value })}
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-brown font-medium text-sm">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Descreva o cão..."
                    value={form.descricao}
                    onChange={(e) =>
                      setForm({ ...form, descricao: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={fecharModal}
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
    </>
  );
}
