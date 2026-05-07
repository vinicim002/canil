export function Estatisticas() {
  return (
    <section className="section-estatisticas bg-cream py-16 mb-20">
      <div className="estatisticas-inner mx-36 flex flex-row items-center justify-center gap-20">
        <div className="estatistica-item flex flex-col items-center gap-2">
          <span className="font-cmas-play text-orange text-5xl font-bold">
            247+
          </span>
          <span className="font-cmas-play text-brown text-sm tracking-widest">
            FILHOTES ENTREGUES
          </span>
        </div>

        <div className="estatistica-divisor w-px h-12 bg-brown/20"></div>

        <div className="estatistica-item flex flex-col items-center gap-2">
          <span className="font-cmas-play text-orange text-5xl font-bold">
            247+
          </span>
          <span className="font-cmas-play text-brown text-sm tracking-widest">
            FAMILIAS FELIZES
          </span>
        </div>

        <div className="estatistica-divisor w-px h-12 bg-brown/20"></div>

        <div className="estatistica-item flex flex-col items-center gap-2">
          <span className="font-cmas-play text-orange text-5xl font-bold">
            13+
          </span>
          <span className="font-cmas-play text-brown text-sm tracking-widest">
            ANOS DE CRIACAO
          </span>
        </div>
      </div>
    </section>
  );
}
