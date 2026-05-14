interface FiltroAdminCaesProps {
    busca: string;
    setBusca: (busca: string) => void;
    filtroStatus: string;
    setFiltroStatus: (status: string) => void;
    filtroGenero: string;
    setFiltroGenero: (genero: string) => void;
    STATUS: string[];
    GENEROS: string[];
}

export function FiltroAdminCaes({busca, setBusca, filtroStatus, setFiltroStatus, filtroGenero, setFiltroGenero, STATUS, GENEROS}: FiltroAdminCaesProps) {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="bg-white border border-brown/20 rounded-xl py-2.5 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors w-64"
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="bg-white border border-brown/20 rounded-xl py-2.5 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
        >
          <option value="">Todos os status</option>
          {STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
          className="bg-white border border-brown/20 rounded-xl py-2.5 px-4 text-body text-sm font-medium outline-none focus:border-orange transition-colors"
        >
          <option value="">Todos os gêneros</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {(filtroStatus || filtroGenero || busca) && (
          <button
            onClick={() => {
              setFiltroStatus("");
              setFiltroGenero("");
              setBusca("");
            }}
            className="text-orange text-sm font-medium hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </>
  );
}
