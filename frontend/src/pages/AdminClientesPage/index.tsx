import { useState, useEffect, useCallback } from "react";
import { Eye } from "lucide-react";
import { ClienteDetalheModal } from "../../components/admin/ClienteDetalheModal";
import { usuarioService } from "../../services/usuarioService";
import type { StatusUsuario, UsuarioResponse } from "../../types/usuario";
import {
  getStatusColor,
  statusUsuarioColor,
  statusUsuarioLabel,
} from "../../utils/statusColors";

export function AdminClientesPage() {
  const [clientes, setClientes] = useState<UsuarioResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<UsuarioResponse | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      const lista = await usuarioService.listarClientes();
      setClientes(lista);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const clientesFiltrados = clientes.filter(
    (c) =>
      busca === "" ||
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()),
  );

  function abrirDetalhes(cliente: UsuarioResponse) {
    setSelecionado(cliente);
    setModalAberto(true);
    setErro("");
  }

  function fecharModal() {
    setModalAberto(false);
    setSelecionado(null);
  }

  async function handleAprovar() {
    if (!selecionado) return;
    setProcessando(true);
    setErro("");
    try {
      const atualizado = await usuarioService.aprovar(selecionado.id);
      setSelecionado(atualizado);
      await carregar();
    } catch {
      setErro("Erro ao aprovar cliente.");
    } finally {
      setProcessando(false);
    }
  }

  async function handleAlterarStatus(status: StatusUsuario) {
    if (!selecionado) return;
    setProcessando(true);
    setErro("");
    try {
      const atualizado = await usuarioService.atualizarStatus(
        selecionado.id,
        status,
      );
      setSelecionado(atualizado);
      await carregar();
    } catch {
      setErro("Erro ao atualizar status.");
    } finally {
      setProcessando(false);
    }
  }

  async function handleExcluir() {
    if (!selecionado) return;
    if (!confirm(`Desativar a conta de ${selecionado.nome}?`)) return;
    setProcessando(true);
    setErro("");
    try {
      await usuarioService.excluir(selecionado.id);
      fecharModal();
      await carregar();
    } catch {
      setErro("Erro ao excluir cliente.");
    } finally {
      setProcessando(false);
    }
  }

  function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-cmas-play text-brown text-3xl">Clientes</h1>
          <p className="text-body/50 text-sm font-medium">
            {clientes.length} clientes cadastrados
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome ou email..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="bg-white border border-brown/20 rounded-xl py-2.5 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors w-80"
      />

      {erro && (
        <p className="text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-xl">
          {erro}
        </p>
      )}

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="grid grid-cols-6 px-6 py-3 border-b border-brown/10 bg-cream/50">
          <span className="text-body/50 text-xs font-medium col-span-2">
            Nome / E-mail
          </span>
          <span className="text-body/50 text-xs font-medium">Status</span>
          <span className="text-body/50 text-xs font-medium">Cadastro</span>
          <span className="text-body/50 text-xs font-medium">Telefone</span>
          <span className="text-body/50 text-xs font-medium text-right">
            Ações
          </span>
        </div>
        {carregando ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-body/50 font-medium">Carregando...</span>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-body/50 font-medium">
              Nenhum cliente encontrado.
            </span>
          </div>
        ) : (
          clientesFiltrados.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-6 px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/30 transition-colors items-center"
            >
              <div className="flex flex-col gap-0.5 col-span-2">
                <span className="text-brown font-medium text-sm">{c.nome}</span>
                <span className="text-body/50 text-xs">{c.email}</span>
              </div>
              <span
                className={`inline-flex w-fit text-xs font-medium py-0.5 px-2.5 rounded-full ${getStatusColor(statusUsuarioColor, c.status)}`}
              >
                {statusUsuarioLabel[c.status] ?? c.status}
              </span>
              <span className="text-body font-medium text-sm">
                {c.criadoEm ? formatarData(c.criadoEm) : "—"}
              </span>
              <span className="text-body font-medium text-sm">
                {c.telefone || "—"}
              </span>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => abrirDetalhes(c)}
                  className="flex items-center gap-1.5 text-brown text-sm font-medium hover:text-orange transition-colors cursor-pointer"
                >
                  <Eye size={16} />
                  Ver detalhes
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ClienteDetalheModal
        cliente={selecionado}
        aberto={modalAberto}
        processando={processando}
        onFechar={fecharModal}
        onAprovar={handleAprovar}
        onExcluir={handleExcluir}
        onAlterarStatus={handleAlterarStatus}
      />
    </div>
  );
}
