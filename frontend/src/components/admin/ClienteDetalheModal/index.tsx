import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, X } from "lucide-react";
import type { StatusUsuario, UsuarioResponse } from "../../../types/usuario";
import {
  getStatusColor,
  statusUsuarioColor,
  statusUsuarioLabel,
} from "../../../utils/statusColors";

interface ClienteDetalheModalProps {
  cliente: UsuarioResponse | null;
  aberto: boolean;
  processando: boolean;
  onFechar: () => void;
  onAprovar: () => void;
  onExcluir: () => void;
  onAlterarStatus: (status: StatusUsuario) => void;
}

export function ClienteDetalheModal({
  cliente,
  aberto,
  processando,
  onFechar,
  onAprovar,
  onExcluir,
  onAlterarStatus,
}: ClienteDetalheModalProps) {
  if (!cliente) return null;

  const dataCadastro = cliente.criadoEm
    ? new Date(cliente.criadoEm).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brown/40 backdrop-blur-sm z-50"
            onClick={onFechar}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-2xl border border-brown/10 shadow-2xl w-full max-w-lg pointer-events-auto flex flex-col gap-6 p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="font-cmas-play text-brown text-2xl">
                    {cliente.nome}
                  </h2>
                  <span
                    className={`inline-flex w-fit text-xs font-medium py-0.5 px-2.5 rounded-full ${getStatusColor(statusUsuarioColor, cliente.status)}`}
                  >
                    {statusUsuarioLabel[cliente.status] ?? cliente.status}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onFechar}
                  className="text-body/40 hover:text-brown transition-colors cursor-pointer p-1"
                  aria-label="Fechar"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <InfoRow label="E-mail" value={cliente.email} />
                <InfoRow label="Telefone" value={cliente.telefone || "—"} />
                <InfoRow label="Cadastro" value={dataCadastro} />
                <InfoRow
                  label="Conta ativa"
                  value={cliente.ativo ? "Sim" : "Não"}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-body/50 text-xs font-medium">
                  Alterar status
                </label>
                <select
                  value={cliente.status}
                  disabled={processando}
                  onChange={(e) =>
                    onAlterarStatus(e.target.value as StatusUsuario)
                  }
                  className="bg-cream/50 border border-brown/20 rounded-xl py-2.5 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors cursor-pointer"
                >
                  <option value="PENDENTE">Pendente</option>
                  <option value="APROVADO">Aprovado</option>
                  <option value="REJEITADO">Rejeitado</option>
                </select>
              </div>

              <div className="flex flex-row gap-3 pt-2">
                {cliente.status !== "APROVADO" && (
                  <button
                    type="button"
                    disabled={processando}
                    onClick={onAprovar}
                    className="flex-1 flex items-center justify-center gap-2 bg-brown text-white font-medium py-2.5 px-4 rounded-full hover:bg-orange transition-colors text-sm cursor-pointer disabled:opacity-50"
                  >
                    <Check size={16} />
                    Aprovar
                  </button>
                )}
                <button
                  type="button"
                  disabled={processando}
                  onClick={onExcluir}
                  className="flex items-center justify-center gap-2 border border-red-200 text-red-600 font-medium py-2.5 px-4 rounded-full hover:bg-red-50 transition-colors text-sm cursor-pointer disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row justify-between border-b border-brown/5 pb-2 last:border-0">
      <span className="text-body/50 font-medium">{label}</span>
      <span className="text-brown font-medium">{value}</span>
    </div>
  );
}
