interface GridAdminCaesProps {
  handleDeletar: (id: string) => void;
  abrirFotos: (cao: any) => void; //Arruma depois
  abrirEditar: (cao: any) => void; //Arruma depois
  caesFiltrados: any[]; //Arruma depois
  carregando: boolean;
}

export function GridAdminCaes({
  handleDeletar,
  abrirFotos,
  abrirEditar,
  caesFiltrados,
  carregando,
}: GridAdminCaesProps) {
  return (
    <>
      {carregando ? (
        <div className="flex items-center justify-center py-20">
          <span className="text-body/50 font-medium">Carregando...</span>
        </div>
      ) : caesFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-5xl">🐾</span>
          <span className="text-body/50 font-medium">
            Nenhum cão encontrado.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {caesFiltrados.map((cao) => (
            <div
              key={cao.id}
              className="cao-card bg-white rounded-2xl border border-brown/10 overflow-hidden flex flex-col"
            >
              <div className="cao-card-foto w-full aspect-square bg-cream relative overflow-hidden">
                {cao.urlCapa ? (
                  <img
                    src={cao.urlCapa}
                    alt={cao.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                    <span className="text-5xl">🐾</span>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="font-cmas-play text-brown text-lg">
                    {cao.nome}
                  </span>
                  <span className="text-orange text-xs font-medium">
                    {cao.tipoPelo} • {cao.tamanho} • {cao.genero}
                  </span>
                  {cao.cor && (
                    <span className="text-body/50 text-xs">{cao.cor}</span>
                  )}
                </div>

                <div className="flex flex-row gap-2 mt-auto">
                  <button
                    onClick={() => abrirFotos(cao)}
                    className="flex-1 bg-cream text-brown text-xs font-medium py-2 rounded-xl hover:bg-brown/10 transition-colors cursor-pointer"
                  >
                    📷 Fotos
                  </button>
                  <button
                    onClick={() => abrirEditar(cao)}
                    className="flex-1 bg-brown text-white text-xs font-medium py-2 rounded-xl hover:bg-orange transition-colors cursor-pointer"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDeletar(cao.id)}
                    className="bg-red-50 text-red-500 text-xs font-medium py-2 px-3 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
