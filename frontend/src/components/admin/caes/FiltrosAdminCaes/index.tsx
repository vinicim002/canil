import { Search, X } from "lucide-react";

interface FiltroAdminCaesProps {
  busca: string;
  setBusca: (busca: string) => void;
  filtroStatus: string;
  setFiltroStatus: (status: string) => void;
  filtroGenero: string;
  setFiltroGenero: (genero: string) => void;
  STATUS?: string[]; // Opcional para quando for a página de adultos
  GENEROS: string[];
}

export function FiltroAdminCaes({
  busca,
  setBusca,
  filtroStatus,
  setFiltroStatus,
  filtroGenero,
  setFiltroGenero,
  STATUS,
  GENEROS,
}: FiltroAdminCaesProps) {
  const temFiltroAtivo = filtroStatus || filtroGenero || busca;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
      {/* Campo de Busca */}
      <div className="relative flex-1 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/30 group-focus-within:text-orange transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="bg-white border border-brown/10 rounded-2xl py-3 pl-11 pr-4 text-body text-sm font-medium outline-none focus:border-orange focus:ring-4 focus:ring-orange/5 transition-all w-full shadow-sm"
        />
      </div>

      {/* Selects com layout flexível */}
      <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
        {/* Filtros de Gênero (Aparece em ambos) */}
        <select
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
          className="flex-1 lg:flex-none bg-white border border-brown/10 rounded-2xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-all shadow-sm cursor-pointer hover:bg-brown/[0.02]"
        >
          <option value="">Todos os gêneros</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Filtro de Status - SÓ RENDERIZA SE O ARRAY "STATUS" FOR PASSADO (Página de Filhotes) */}
        {STATUS && STATUS.length > 0 && (
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="flex-1 lg:flex-none bg-white border border-brown/10 rounded-2xl py-3 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-all shadow-sm cursor-pointer hover:bg-brown/[0.02]"
          >
            <option value="">Todos os status</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        {/* Botão Limpar (Desktop) */}
        {temFiltroAtivo && (
          <button
            onClick={() => {
              setFiltroStatus("");
              setFiltroGenero("");
              setBusca("");
            }}
            className="hidden md:flex items-center gap-1.5 text-orange text-sm font-bold hover:text-orange/80 transition-colors px-2 cursor-pointer whitespace-nowrap"
          >
            <X size={16} />
            Limpar
          </button>
        )}
      </div>

      {/* Botão Limpar (Mobile) */}
      {temFiltroAtivo && (
        <button
          onClick={() => {
            setFiltroStatus("");
            setFiltroGenero("");
            setBusca("");
          }}
          className="md:hidden w-full py-2 text-center text-orange text-xs font-bold border border-orange/20 rounded-xl bg-orange/5"
        >
          Limpar todos os filtros
        </button>
      )}
    </div>
  );
}
