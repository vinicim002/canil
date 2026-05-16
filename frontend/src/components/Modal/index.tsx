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
  TIPOS: string[];
  TIPOS_PELO: string[];
  TAMANHOS: string[];
  GENEROS: string[];
  STATUS?: string[];
}

const inputClass =
  "w-full bg-cream/50 border border-brown/10 rounded-2xl py-3.5 px-5 text-body text-sm font-medium outline-none focus:border-orange focus:ring-4 focus:ring-orange/5 transition-all placeholder:text-brown/30";

const labelClass =
  "text-brown font-bold text-[11px] uppercase tracking-widest ml-1";

export function Modal({
  modalTipo,
  handleSalvar,
  fecharModal,
  form,
  setForm,
  salvando,
  erro,
  TIPOS_PELO,
  TIPOS,
  TAMANHOS,
  GENEROS,
  STATUS,
}: ModalProps) {
  return (
    <AnimatePresence>
      {(modalTipo === "adicionar" || modalTipo === "editar") && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
          >
            {/* Header com gradiente sutil */}
            <div className="flex flex-row items-center justify-between px-8 py-5 border-b border-brown/5 bg-cream/30">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-cmas-play text-brown text-2xl">
                  {modalTipo === "adicionar" ? "Novo Cão" : "Editar Cão"}
                </h2>
                <p className="text-body/40 text-xs font-medium">
                  {modalTipo === "adicionar"
                    ? "Preencha os dados para cadastrar"
                    : "Atualize as informações do cão"}
                </p>
              </div>
              <button
                onClick={fecharModal}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brown/5 text-brown/40 hover:bg-red-50 hover:text-red-400 transition-all cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSalvar}
              className="p-8 flex flex-col gap-5 overflow-y-auto"
            >
              {erro && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-sm font-bold bg-red-50 px-5 py-4 rounded-2xl border border-red-100 flex items-center gap-2"
                >
                  ⚠️ {erro}
                </motion.p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className={labelClass}>Nome do Cão</label>
                  <input
                    type="text"
                    placeholder="Ex: Max, Bella..."
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Tipo */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className={labelClass}>Tipo</label>
                  <div className="flex flex-row gap-3">
                    {TIPOS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            tipo: t as "FILHOTE" | "MATRIZ" | "REPRODUTOR",
                          })
                        }
                        className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer border ${
                          form.tipo === t
                            ? "bg-brown text-white border-brown shadow-lg shadow-brown/10"
                            : "bg-cream/50 text-brown/50 border-brown/10 hover:border-brown/30"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pelo */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Tipo de Pelo</label>
                  <select
                    value={form.tipoPelo}
                    onChange={(e) =>
                      setForm({ ...form, tipoPelo: e.target.value })
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Selecione</option>
                    {TIPOS_PELO.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tamanho */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Tamanho</label>
                  <select
                    value={form.tamanho}
                    onChange={(e) =>
                      setForm({ ...form, tamanho: e.target.value })
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Selecione</option>
                    {TAMANHOS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gênero */}
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Gênero</label>
                  <div className="flex flex-row gap-3">
                    {GENEROS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setForm({ ...form, genero: g })}
                        className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer border ${
                          form.genero === g
                            ? "bg-orange text-white border-orange shadow-lg shadow-orange/10"
                            : "bg-cream/50 text-brown/50 border-brown/10 hover:border-brown/30"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status — só se passar */}
                {STATUS && STATUS.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Status</label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className={inputClass}
                    >
                      {STATUS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Cor */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className={labelClass}>Cor</label>
                  <input
                    type="text"
                    placeholder="Ex: Black & Tan, Chocolate..."
                    value={form.cor}
                    onChange={(e) => setForm({ ...form, cor: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Descrição */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className={labelClass}>Descrição</label>
                  <textarea
                    placeholder="Conte um pouco sobre o temperamento e história do cão..."
                    value={form.descricao}
                    onChange={(e) =>
                      setForm({ ...form, descricao: e.target.value })
                    }
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Destaque */}
                <div
                  onClick={() => setForm({ ...form, destaque: !form.destaque })}
                  className={`flex items-center gap-4 md:col-span-2 p-4 rounded-2xl border cursor-pointer transition-all ${
                    form.destaque
                      ? "bg-orange/5 border-orange/30"
                      : "bg-cream/30 border-brown/5 hover:border-brown/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      form.destaque
                        ? "bg-orange border-orange"
                        : "border-brown/20"
                    }`}
                  >
                    {form.destaque && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-brown font-bold text-sm">
                      Marcar como destaque
                    </span>
                    <span className="text-body/40 text-xs font-medium">
                      Aparece em destaque na página inicial
                    </span>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 bg-cream text-brown font-bold py-4 rounded-2xl hover:bg-brown/10 transition-all cursor-pointer order-2 sm:order-1 text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="flex-1 bg-brown text-white font-bold py-4 rounded-2xl hover:bg-orange transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brown/10 order-1 sm:order-2 text-sm"
                >
                  {salvando
                    ? "Salvando..."
                    : modalTipo === "adicionar"
                      ? "Cadastrar cão"
                      : "Salvar alterações"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
