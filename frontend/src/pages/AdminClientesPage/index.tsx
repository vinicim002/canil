import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface ClienteResponse {
  id: string;
  usuarioId: string;
  nomeUsuario: string;
  emailUsuario: string;
  telefoneUsuario: string;
  cpf: string;
  cidade: string;
  estado: string;
}

export function AdminClientesPage() {
  const [clientes, setClientes] = useState<ClienteResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api
      .get<ClienteResponse[]>("/clientes")
      .then(setClientes)
      .finally(() => setCarregando(false));
  }, []);

  const clientesFiltrados = clientes.filter(
    (c) =>
      busca === "" ||
      c.nomeUsuario.toLowerCase().includes(busca.toLowerCase()) ||
      c.emailUsuario.toLowerCase().includes(busca.toLowerCase()),
  );

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

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="grid grid-cols-5 px-6 py-3 border-b border-brown/10 bg-cream/50">
          <span className="text-body/50 text-xs font-medium col-span-2">
            Nome / Email
          </span>
          <span className="text-body/50 text-xs font-medium">Telefone</span>
          <span className="text-body/50 text-xs font-medium">Cidade</span>
          <span className="text-body/50 text-xs font-medium">CPF</span>
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
              className="grid grid-cols-5 px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/30 transition-colors items-center"
            >
              <div className="flex flex-col gap-0.5 col-span-2">
                <span className="text-brown font-medium text-sm">
                  {c.nomeUsuario}
                </span>
                <span className="text-body/50 text-xs">{c.emailUsuario}</span>
              </div>
              <span className="text-body font-medium text-sm">
                {c.telefoneUsuario || "—"}
              </span>
              <span className="text-body font-medium text-sm">
                {c.cidade ? `${c.cidade}/${c.estado}` : "—"}
              </span>
              <span className="text-body font-medium text-sm">
                {c.cpf || "—"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
