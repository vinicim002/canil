export function Depoimentos() {
  return (
    <section className="section-depoimentos bg-gradient-brown py-20 mb-20">
      <div className="depoimentos-inner mx-36 flex flex-col items-center justify-center gap-20">
        <div className="depoimentos-header flex flex-col items-center gap-4">
          <h3 className="font-bold font-cmas-play text-3xl text-orange">
            DEPOIMENTOS
          </h3>
          <h2 className="font-bold font-cmas-play text-4xl text-white">
            Familias que <span className="text-orange">confiam</span> em nos
          </h2>
        </div>

        <div className="depoimentos-cards flex flex-row gap-8">
          <div className="depoimento-card glass rounded-xl p-6 flex flex-col gap-4">
            <div className="depoimento-estrelas flex flex-row gap-1">
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
            </div>
            <p className="text-base font-medium text-white">
              "Adotar um filhote do Canil Salsicha foi a melhor decisão que já
              tomei! O processo foi super fácil e o filhote chegou em perfeitas
              condições. Ele é saudável, feliz e cheio de energia. Recomendo
              muito!"
            </p>
            <div className="depoimento-autor flex flex-row items-center gap-4">
              <div className="avatar w-12 h-12 rounded-full bg-orange shrink-0"></div>
              <span className="text-base font-semibold text-white">
                Maria Silva
              </span>
            </div>
          </div>

          <div className="depoimento-card glass rounded-xl p-6 flex flex-col gap-4">
            <div className="depoimento-estrelas flex flex-row gap-1">
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
            </div>
            <p className="text-base font-medium text-white">
              "Adotar um filhote do Canil Salsicha foi a melhor decisão que já
              tomei! O processo foi super fácil e o filhote chegou em perfeitas
              condições. Ele é saudável, feliz e cheio de energia. Recomendo
              muito!"
            </p>
            <div className="depoimento-autor flex flex-row items-center gap-4">
              <div className="avatar w-12 h-12 rounded-full bg-orange shrink-0"></div>
              <span className="text-base font-semibold text-white">
                Maria Silva
              </span>
            </div>
          </div>

          <div className="depoimento-card glass rounded-xl p-6 flex flex-col gap-4">
            <div className="depoimento-estrelas flex flex-row gap-1">
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
              <span className="text-orange text-xl">★</span>
            </div>
            <p className="text-base font-medium text-white">
              "Adotar um filhote do Canil Salsicha foi a melhor decisão que já
              tomei! O processo foi super fácil e o filhote chegou em perfeitas
              condições. Ele é saudável, feliz e cheio de energia. Recomendo
              muito!"
            </p>
            <div className="depoimento-autor flex flex-row items-center gap-4">
              <div className="avatar w-12 h-12 rounded-full bg-orange shrink-0"></div>
              <span className="text-base font-semibold text-white">
                Maria Silva
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
