import mapaBrasilImg from "../../assets/mapaBrasilImg.png";

export function Entrega() {
  return (
    <section className="section-entrega mx-36 py-20 mb-20 flex items-start justify-between gap-20">
      <div className="entrega-mapa w-1/2">
        <img
          src={mapaBrasilImg}
          className="w-full object-cover"
          alt="Mapa do Brasil"
        />
      </div>

      <div className="entrega-info w-1/2 flex flex-col gap-8">
        <div className="entrega-header flex flex-col gap-3">
          <h3 className="text-3xl text-brown font-cmas-play">
            Entrega e Logistica
          </h3>
          <h2 className="font-cmas-play text-orange text-4xl">
            Entregas em <br /> Todo Brasil
          </h2>
          <p className="text-base font-medium">
            Cuidamos de cada detalhe do transporte para que seu filhote chegue
            com saúde, conforto e segurança. Trabalhamos apenas com transporte
            aéreo, sem compartilhamento de carga.
          </p>
        </div>

        <div className="entrega-diferenciais flex flex-col gap-4">
          {/* Item */}
          <div className="entrega-diferencial-item flex flex-row items-start gap-5">
            <div className="entrega-diferencial-icone w-12 h-12 bg-brown rounded-xl shrink-0"></div>
            <div className="entrega-diferencial-texto flex flex-col gap-1">
              <h4 className="text-2xl font-semibold">Preparado com amor</h4>
              <p className="text-base font-medium">
                Cada filhote é preparado com todo cuidado antes de ir para o
                novo lar, com manta de cheiro e kit de boas-vindas.
              </p>
            </div>
          </div>

          <div className="entrega-divisor border-b-2 border-orange"></div>

          <div className="entrega-diferencial-item flex flex-row items-start gap-5">
            <div className="entrega-diferencial-icone w-12 h-12 bg-brown rounded-xl shrink-0"></div>
            <div className="entrega-diferencial-texto flex flex-col gap-1">
              <h4 className="text-2xl font-semibold">Preparado com amor</h4>
              <p className="text-base font-medium">
                Cada filhote é preparado com todo cuidado antes de ir para o
                novo lar, com manta de cheiro e kit de boas-vindas.
              </p>
            </div>
          </div>

          <div className="entrega-divisor border-b-2 border-orange"></div>

          <div className="entrega-diferencial-item flex flex-row items-start gap-5">
            <div className="entrega-diferencial-icone w-12 h-12 bg-brown rounded-xl shrink-0"></div>
            <div className="entrega-diferencial-texto flex flex-col gap-1">
              <h4 className="text-2xl font-semibold">Preparado com amor</h4>
              <p className="text-base font-medium">
                Cada filhote é preparado com todo cuidado antes de ir para o
                novo lar, com manta de cheiro e kit de boas-vindas.
              </p>
            </div>
          </div>

          <div className="entrega-divisor border-b-2 border-orange"></div>

          <div className="entrega-diferencial-item flex flex-row items-start gap-5">
            <div className="entrega-diferencial-icone w-12 h-12 bg-brown rounded-xl shrink-0"></div>
            <div className="entrega-diferencial-texto flex flex-col gap-1">
              <h4 className="text-2xl font-semibold">Preparado com amor</h4>
              <p className="text-base font-medium">
                Cada filhote é preparado com todo cuidado antes de ir para o
                novo lar, com manta de cheiro e kit de boas-vindas.
              </p>
            </div>
          </div>

          <div className="entrega-divisor border-b-2 border-orange"></div>

          <div className="entrega-diferencial-item flex flex-row items-start gap-5">
            <div className="entrega-diferencial-icone w-12 h-12 bg-brown rounded-xl shrink-0"></div>
            <div className="entrega-diferencial-texto flex flex-col gap-1">
              <h4 className="text-2xl font-semibold">Preparado com amor</h4>
              <p className="text-base font-medium">
                Cada filhote é preparado com todo cuidado antes de ir para o
                novo lar, com manta de cheiro e kit de boas-vindas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
