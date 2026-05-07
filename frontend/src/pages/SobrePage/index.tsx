import dachshundImg from "../../assets/dachshund-sobre.png";

export function SobrePage() {
  return (
    <main className="sobre-page pt-32 pb-20">
      <div className="sobre-page-inner mx-36 flex flex-col gap-24">
        {/* Header com imagem */}
        <div className="sobre-header relative flex flex-col items-center gap-4 text-center">
          <h3 className="font-cmas-play text-orange text-2xl">
            CONHECA A RACA
          </h3>
          <h1 className="font-cmas-play text-brown text-5xl leading-tight">
            UM POUCO SOBRE A RACA <br /> QUE CRIAMOS
          </h1>
          <p className="text-body font-medium text-base max-w-xl">
            O Dachshund, também chamado de Teckel ou Salsicha, é uma raça única
            — corajosa, curiosa e cheia de personalidade.
          </p>

          {/* Imagem do cachorro espiando */}
          <div className="sobre-hero-imagem relative w-full flex justify-center mt-60">
            <div className="sobre-hero-card bg-orange rounded-3xl w-full h-48 flex items-end justify-center overflow-visible">
              <img
                src={dachshundImg}
                className="absolute -top-[165%] w-[50%] object-contain"
                alt="Dachshund espiando"
              />
            </div>
          </div>
        </div>

        {/* Origem */}
        <div className="sobre-secao flex flex-col gap-6">
          <div className="sobre-secao-header flex flex-row items-center gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-cmas-play text-brown text-4xl">
                Origem e Historia da Raca
              </h2>
            </div>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>
          <p className="text-body font-medium text-base leading-relaxed">
            Evidências sobre o Dachshund como uma raça só foram encontradas no
            século 16, quando foram feitas referências a um cachorro "baixo de
            pernas tortas", chamado de cão escavador, Dacksel ou cão texugo. O
            nome moderno, Dachshund, quer dizer simplesmente cão texugo (dachs
            hund) em alemão. Esses caçadores determinados perseguem sua presa,
            entram na toca, tiram a presa e a matam.
          </p>
          <p className="text-body font-medium text-base leading-relaxed">
            O Dachshund existe em três variedades de pelo e em dois tamanhos. Os
            Dachshunds originais tinham o pelo liso e surgiram do cruzamento do
            bracke, um pointer miniatura francês, com o Pinscher. Em 1910, foi
            adotado um critério rigoroso, e cada tipo de pelo foi cruzado com
            diferentes raças para alcançar os melhores resultados. Depois disso,
            o Dachshund encontrou seu verdadeiro lugar como animal de estimação,
            tornando-se um dos cães mais populares do mundo.
          </p>
        </div>

        {/* Temperamento + Cuidados */}
        <div className="sobre-grid grid grid-cols-2 gap-8">
          <div className="sobre-card bg-brown rounded-2xl p-8 flex flex-col gap-4">
            <div className="sobre-card-icone w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-xl">🐾</span>
            </div>
            <h3 className="font-cmas-play text-white text-2xl">Temperamento</h3>
            <p className="text-white/80 font-medium text-sm leading-relaxed">
              O Dachshund é corajoso, curioso e está sempre em busca de
              aventuras. Ele gosta de caçar e cavar, seguir pistas com o faro. É
              independente, mas quer participar das atividades da família sempre
              que pode. Se dá muito bem com crianças. A variedade de pelo longo
              pode ser mais quieta, os de pelo curto são mais ativos, e os do
              tipo miniatura tendem a ser mais tímidos.
            </p>
          </div>

          <div className="sobre-card bg-brown rounded-2xl p-8 flex flex-col gap-4">
            <div className="sobre-card-icone w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
              <span className="text-xl">✂️</span>
            </div>
            <h3 className="font-cmas-play text-white text-2xl">Cuidados</h3>
            <p className="text-white/80 font-medium text-sm leading-relaxed">
              Apesar de ativo, sua necessidade de exercícios se satisfaz com
              passeios moderados e caçadas no jardim. Adapta-se bem à vida em
              apartamentos. O pelo curto requer higiene básica. O pelo longo
              precisa ser escovado uma ou duas vezes por semana. O pelo duro
              precisa ser escovado semanalmente e passa por retirada de pelos
              mortos duas vezes por ano.
            </p>
          </div>
        </div>

        {/* Tamanhos */}
        <div className="sobre-secao flex flex-col gap-8">
          <div className="sobre-secao-header flex flex-row items-center gap-6">
            <h2 className="font-cmas-play text-brown text-4xl">Tamanhos</h2>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>
          <p className="text-body font-medium text-sm">
            O padrão da FCI/CBKC divide o Dachshund em três variedades de
            tamanho, definidas pela circunferência torácica:
          </p>
          <div className="sobre-tamanhos grid grid-cols-3 gap-6">
            <div className="sobre-tamanho-card glass-brown rounded-2xl p-6 flex flex-col gap-3">
              <span className="font-cmas-play text-orange text-xl">
                Kaninchenteckel
              </span>
              <span className="text-brown font-semibold text-sm">Coelho</span>
              <div className="border-t border-brown/20 pt-3">
                <p className="text-body font-medium text-sm">
                  Até 30 cm de perímetro torácico.
                </p>
              </div>
            </div>

            <div className="sobre-tamanho-card glass-brown rounded-2xl p-6 flex flex-col gap-3">
              <span className="font-cmas-play text-orange text-xl">
                Zwergteckel
              </span>
              <span className="text-brown font-semibold text-sm">
                Miniatura
              </span>
              <div className="border-t border-brown/20 pt-3">
                <p className="text-body font-medium text-sm">
                  30 a 35 cm de perímetro torácico.
                </p>
              </div>
            </div>

            <div className="sobre-tamanho-card glass-brown rounded-2xl p-6 flex flex-col gap-3">
              <span className="font-cmas-play text-orange text-xl">
                Standard
              </span>
              <span className="text-brown font-semibold text-sm">Padrão</span>
              <div className="border-t border-brown/20 pt-3">
                <p className="text-body font-medium text-sm">
                  Acima de 35 cm de perímetro torácico.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pelagens */}
        <div className="sobre-secao flex flex-col gap-8">
          <div className="sobre-secao-header flex flex-row items-center gap-6">
            <h2 className="font-cmas-play text-brown text-4xl">Pelagens</h2>
            <div className="flex-1 h-px bg-brown/20"></div>
          </div>
          <p className="text-body font-medium text-sm">
            A raça possui três variedades de pelagem, cada uma com
            características distintas:
          </p>
          <div className="sobre-pelagens grid grid-cols-3 gap-6">
            <div className="sobre-pelagem-card bg-cream rounded-2xl p-6 flex flex-col gap-3 border border-brown/10">
              <div className="w-10 h-10 rounded-full bg-brown flex items-center justify-center shrink-0">
                <span className="text-lg">🐕</span>
              </div>
              <h4 className="font-cmas-play text-brown text-xl">Pelo Liso</h4>
              <p className="text-body font-medium text-sm leading-relaxed">
                Bem assentado, curto, brilhante e denso. Pele firme.
              </p>
            </div>

            <div className="sobre-pelagem-card bg-cream rounded-2xl p-6 flex flex-col gap-3 border border-brown/10">
              <div className="w-10 h-10 rounded-full bg-brown flex items-center justify-center shrink-0">
                <span className="text-lg">🐕</span>
              </div>
              <h4 className="font-cmas-play text-brown text-xl">Pelo Longo</h4>
              <p className="text-body font-medium text-sm leading-relaxed">
                Sedoso, com franjas nas orelhas, peito, parte inferior do corpo
                e cauda.
              </p>
            </div>

            <div className="sobre-pelagem-card bg-cream rounded-2xl p-6 flex flex-col gap-3 border border-brown/10">
              <div className="w-10 h-10 rounded-full bg-brown flex items-center justify-center shrink-0">
                <span className="text-lg">🐕</span>
              </div>
              <h4 className="font-cmas-play text-brown text-xl">Pelo Duro</h4>
              <p className="text-body font-medium text-sm leading-relaxed">
                Subpelo denso e textura áspera. Apresenta barba e sobrancelhas
                bem marcadas.
              </p>
            </div>
          </div>
          <p className="text-body/60 font-medium text-sm text-center">
            Cada combinação de tamanho e pelagem é considerada uma variedade
            distinta dentro do padrão oficial da FCI/CBKC.
          </p>
        </div>
      </div>
    </main>
  );
}
