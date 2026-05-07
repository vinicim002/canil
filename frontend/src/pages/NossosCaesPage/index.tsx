export function NossosCaesPage() {
  return (
    <main className="nossos-caes-page pt-32 pb-20 mb-20">
      <div className="nossos-caes-page-inner mx-36 flex flex-col gap-20">
        {/* Header */}
        <div className="nossos-caes-page-header flex flex-col items-center gap-4 text-center">
          <h3 className="font-cmas-play text-orange text-2xl">
            CONHECA NOSSOS CAES
          </h3>
          <h1 className="font-cmas-play text-brown text-5xl">NOSSOS CAES</h1>
          <p className="text-body font-medium text-base w-1/2">
            Conheca os reprodutores e matrizes que fazem parte da nossa familia
            e sao responsaveis pelos filhotes mais lindos do Brasil.
          </p>
        </div>

        {/* Reprodutores */}
        <div className="nossos-caes-categoria flex flex-col gap-10">
          <div className="nossos-caes-categoria-header flex flex-row items-center gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-cmas-play text-brown text-4xl">
                Reprodutores
              </h2>
              <p className="text-body font-medium text-sm">
                Machos selecionados geneticamente para garantir padrao e saude.
              </p>
            </div>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>

          <div className="nossos-caes-grid grid grid-cols-4 gap-8">
            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome do Cao
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Miniatura
                </span>
              </div>
            </div>

            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome do Cao
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Kaninchen
                </span>
              </div>
            </div>

            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome do Cao
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Padrão
                </span>
              </div>
            </div>

            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome do Cao
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Miniatura
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Matrizes */}
        <div className="nossos-caes-categoria flex flex-col gap-10">
          <div className="nossos-caes-categoria-header flex flex-row items-center gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-cmas-play text-brown text-4xl">Matrizes</h2>
              <p className="text-body font-medium text-sm">
                Femeas com excelente temperamento e historico de saude
                comprovado.
              </p>
            </div>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>

          <div className="nossos-caes-grid grid grid-cols-4 gap-8">
            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome da Cadela
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Miniatura
                </span>
              </div>
            </div>

            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome da Cadela
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Kaninchen
                </span>
              </div>
            </div>

            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome da Cadela
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo curto • Padrao
                </span>
              </div>
            </div>

            <div className="nossos-caes-card flex flex-col gap-3">
              <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden">
                <div className="w-full h-full bg-brown/10 flex items-center justify-center">
                  <span className="text-5xl">🐾</span>
                </div>
              </div>
              <div className="nossos-caes-card-info flex flex-col gap-1">
                <span className="font-cmas-play text-brown text-xl">
                  Nome da Cadela
                </span>
                <span className="text-orange text-sm font-medium">
                  Pelo longo • Miniatura
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
