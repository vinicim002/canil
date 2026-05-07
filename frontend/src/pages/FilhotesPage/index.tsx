export function FilhotesPage() {
  return (
    <main className="filhotes-page pt-32 pb-20">
      <div className="filhotes-page-inner mx-36 flex flex-col gap-20">
        {/* Header */}
        <div className="filhotes-header flex flex-col items-center justify-center gap-10 text-center">
          <div className="filhotes-header-texto flex flex-col gap-3">
            <h3 className="font-cmas-play text-orange text-2xl">
              DISPONIVEIS AGORA
            </h3>
            <h1 className="font-cmas-play text-brown text-5xl">FILHOTES</h1>
            <p className="text-body font-medium text-base max-w-lg">
              Todos os filhotes são criados com amor, vacinados e acompanhados
              por veterinário. Reservas sujeitas à disponibilidade.
            </p>
          </div>

          <button className="filhotes-header-cta bg-brown text-white font-medium py-4 px-8 rounded-full cursor-pointer hover:bg-orange transition-colors">
            Reservar filhote
          </button>
        </div>

        {/* Machos */}
        <div className="filhotes-categoria flex flex-col gap-10">
          <div className="filhotes-categoria-header flex flex-row items-center gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-cmas-play text-brown text-4xl">Machos</h2>
                <span className="bg-brown text-white text-xs font-medium py-1 px-3 rounded-full">
                  4 disponíveis
                </span>
              </div>
              <p className="text-body/60 text-sm font-medium">
                Atualizado em{" "}
                <span className="text-orange font-semibold">
                  15 de maio de 2026
                </span>
              </p>
            </div>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>

          <div className="filhotes-grid grid grid-cols-4 gap-8">
            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                  Disponível
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Miniatura
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 01/03/2026
                </span>
              </div>
            </div>

            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                  Disponível
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Kaninchen
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 01/03/2026
                </span>
              </div>
            </div>

            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-orange text-white text-xs font-medium py-1 px-3 rounded-full">
                  Reservado
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Padrão
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 01/03/2026
                </span>
              </div>
            </div>

            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                  Disponível
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Miniatura
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 01/03/2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fêmeas */}
        <div className="filhotes-categoria flex flex-col gap-10">
          <div className="filhotes-categoria-header flex flex-row items-center gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-cmas-play text-brown text-4xl">Femeas</h2>
                <span className="bg-brown text-white text-xs font-medium py-1 px-3 rounded-full">
                  3 disponíveis
                </span>
              </div>
              <p className="text-body/60 text-sm font-medium">
                Atualizado em{" "}
                <span className="text-orange font-semibold">
                  15 de maio de 2026
                </span>
              </p>
            </div>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>

          <div className="filhotes-grid grid grid-cols-4 gap-8">
            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                  Disponível
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Miniatura
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 10/03/2026
                </span>
              </div>
            </div>

            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                  Disponível
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Kaninchen
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 10/03/2026
                </span>
              </div>
            </div>

            <div className="filhote-card flex flex-col gap-3">
              <div className="filhote-card-foto relative w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐶</span>
                </div>
                <span className="absolute top-3 right-3 bg-brown text-white text-xs font-medium py-1 px-3 rounded-full">
                  Vendido
                </span>
              </div>
              <div className="filhote-card-info flex flex-col gap-1">
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Padrão
                </span>
                <span className="text-body/50 text-xs font-medium">
                  Nascido em 10/03/2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
