export function NossosCaes() {
  return (
    <section className="section-nossos-caes py-20 mb-20">
      <div className="nossos-caes-inner mx-36 flex flex-col items-center gap-12">
        <div className="nossos-caes-header flex flex-col items-center gap-4 text-center">
          <h2 className="text-4xl text-brown font-cmas-play">NOSSOS CAES</h2>
          <h3 className="text-3xl font-cmas-play text-orange">
            Trabalhamos com total responsabilidade e cuidado
          </h3>
        </div>

        <div className="nossos-caes-grid grid grid-cols-3 gap-6 w-full">
          <div className="nossos-caes-card bg-brown rounded-2xl p-6 flex flex-col gap-4">
            <div className="nossos-caes-card-icone w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-white text-lg">🍖</span>
            </div>
            <div className="nossos-caes-card-texto flex flex-col gap-2">
              <h4 className="font-cmas-play text-white text-xl">
                Alimentacao Premium
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Alimentação com ração Super Premium (Premier) para garantir
                saúde e vitalidade.
              </p>
            </div>
          </div>

          <div className="nossos-caes-card bg-brown rounded-2xl p-6 flex flex-col gap-4">
            <div className="nossos-caes-card-icone w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-white text-lg">💉</span>
            </div>
            <div className="nossos-caes-card-texto flex flex-col gap-2">
              <h4 className="font-cmas-play text-white text-xl">
                Vacinacao em dia
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Todos os filhotes saem com carteira de vacinacao completa e
                atualizada.
              </p>
            </div>
          </div>

          <div className="nossos-caes-card bg-brown rounded-2xl p-6 flex flex-col gap-4">
            <div className="nossos-caes-card-icone w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-white text-lg">🏥</span>
            </div>
            <div className="nossos-caes-card-texto flex flex-col gap-2">
              <h4 className="font-cmas-play text-white text-xl">
                Acompanhamento veterinario
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Consultas regulares com veterinario especializado em pequenas
                racas.
              </p>
            </div>
          </div>

          <div className="nossos-caes-card bg-brown rounded-2xl p-6 flex flex-col gap-4">
            <div className="nossos-caes-card-icone w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-white text-lg">🧬</span>
            </div>
            <div className="nossos-caes-card-texto flex flex-col gap-2">
              <h4 className="font-cmas-play text-white text-xl">
                Seleção genetica
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Aperfeicoamento genético rigoroso para garantir padrao de raca e
                saude.
              </p>
            </div>
          </div>

          <div className="nossos-caes-card bg-brown rounded-2xl p-6 flex flex-col gap-4">
            <div className="nossos-caes-card-icone w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-white text-lg">❤️</span>
            </div>
            <div className="nossos-caes-card-texto flex flex-col gap-2">
              <h4 className="font-cmas-play text-white text-xl">
                Socializacao
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Criados em ambiente familiar para garantir temperamento dócil e
                equilibrado.
              </p>
            </div>
          </div>

          <div className="nossos-caes-card bg-brown rounded-2xl p-6 flex flex-col gap-4">
            <div className="nossos-caes-card-icone w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-white text-lg">📋</span>
            </div>
            <div className="nossos-caes-card-texto flex flex-col gap-2">
              <h4 className="font-cmas-play text-white text-xl">
                Documentacao completa
              </h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Pedigree, contrato de compra e garantia de saude para total
                seguranca.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
