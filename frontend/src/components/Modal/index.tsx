import { AnimatePresence, motion } from "motion/react";
import type { CaoRequest } from "../../services/caoService/caoRequest";

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
    <AnimatePresence>
      {(modalTipo === "adicionar" || modalTipo === "editar") && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop Animado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Card do Modal Animado */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex flex-row items-center justify-between px-8 py-6 border-b border-brown/5">
              <h2 className="font-cmas-play text-brown text-2xl font-bold">
                {modalTipo === "adicionar" ? "Novo Cão" : "Editar Cão"}
              </h2>
              <button
                onClick={fecharModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-brown/5 text-brown hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form com Scroll Customizado */}
            <form
              onSubmit={handleSalvar}
              className="p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar"
            >
              {erro && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm font-bold bg-red-50 px-5 py-4 rounded-2xl border border-red-100"
                >
                  ⚠️ {erro}
                </motion.p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nome - Full width no mobile/desktop */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Nome do Cão
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Max, Bella..."
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange focus:ring-4 focus:ring-orange/5 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Tipo de Pelo
                  </label>
                  <select
                    value={form.tipoPelo}
                    onChange={(e) =>
                      setForm({ ...form, tipoPelo: e.target.value })
                    }
                    required
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange cursor-pointer"
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
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Tamanho
                  </label>
                  <select
                    value={form.tamanho}
                    onChange={(e) =>
                      setForm({ ...form, tamanho: e.target.value })
                    }
                    required
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange cursor-pointer"
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
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Gênero
                  </label>
                  <select
                    value={form.genero}
                    onChange={(e) =>
                      setForm({ ...form, genero: e.target.value })
                    }
                    required
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange cursor-pointer"
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
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange cursor-pointer"
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Cor
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Black & Tan, Chocolate..."
                    value={form.cor}
                    onChange={(e) => setForm({ ...form, cor: e.target.value })}
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-brown font-bold text-xs uppercase tracking-wider ml-1">
                    Descrição
                  </label>
                  <textarea
                    placeholder="Conte um pouco sobre o temperamento e história do cão..."
                    value={form.descricao}
                    onChange={(e) =>
                      setForm({ ...form, descricao: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-5 text-body text-sm font-medium outline-none focus:border-orange resize-none"
                  />
                </div>

                {/* Switch de Destaque */}
                <div className="flex items-center gap-3 md:col-span-2 bg-cream/30 p-4 rounded-2xl border border-brown/5">
                  <input
                    type="checkbox"
                    id="destaque"
                    checked={form.destaque}
                    onChange={(e) =>
                      setForm({ ...form, destaque: e.target.checked })
                    }
                    className="w-5 h-5 accent-orange cursor-pointer"
                  />
                  <label
                    htmlFor="destaque"
                    className="text-brown font-bold text-sm cursor-pointer"
                  >
                    Exibir este cão em destaque na página inicial
                  </label>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-2">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 bg-cream text-brown font-bold py-4 rounded-2xl hover:bg-brown/10 transition-all cursor-pointer order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="flex-1 bg-brown text-white font-bold py-4 rounded-2xl hover:bg-orange transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brown/10 order-1 sm:order-2"
                >
                  {salvando ? "Processando..." : "Confirmar e Salvar"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
