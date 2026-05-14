import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const depoimentosData = [
  {
    id: 1,
    text: "Adotar um filhote do Canil Salsicha foi a melhor decisão que já tomei! O processo foi super fácil e o filhote chegou em perfeitas condições. Ele é saudável, feliz e cheio de energia. Recomendo muito!",
    autor: "Maria Silva",
    rating: 5,
  },
  {
    id: 2,
    text: "Adotar um filhote do Canil Salsicha foi a melhor decisão que já tomei! O processo foi super fácil e o filhote chegou em perfeitas condições. Ele é saudável, feliz e cheio de energia. Recomendo muito!",
    autor: "João Santos",
    rating: 5,
  },
  {
    id: 3,
    text: "Adotar um filhote do Canil Salsicha foi a melhor decisão que já tomei! O processo foi super fácil e o filhote chegou em perfeitas condições. Ele é saudável, feliz e cheio de energia. Recomendo muito!",
    autor: "Ana Costa",
    rating: 5,
  },
  {
    id: 4,
    text: "Adotar um filhote do Canil Salsicha foi a melhor decisão que já tomei! O processo foi super fácil e o filhote chegou em perfeitas condições. Ele é saudável, feliz e cheio de energia. Recomendo muito!",
    autor: "Pedro Oliveira",
    rating: 5,
  },
];

export function Depoimentos() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      skipSnaps: false,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: true,
      }),
    ],
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", handleSelect);
    handleSelect();

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section-depoimentos bg-gradient-brown py-20 mb-20">
      <div className="depoimentos-inner px-6 md:px-12 lg:px-36 flex flex-col items-center justify-center gap-20">
        {/* Header */}
        <div className="depoimentos-header flex flex-col items-center gap-4">
          <h3 className="font-bold font-cmas-play text-3xl text-orange">
            DEPOIMENTOS
          </h3>
          <h2 className="font-bold font-cmas-play text-4xl text-white text-center">
            Familias que <span className="text-orange">confiam</span> em nos
          </h2>
        </div>

        {/* Carrossel Container */}
        <div className="w-full">
          <div className="relative">
            {/* Carrossel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8 backface-hidden">
                {depoimentosData.map((depoimento) => (
                  <div
                    key={depoimento.id}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-21px)] min-w-0"
                  >
                    <div className="depoimento-card glass rounded-xl p-6 flex flex-col gap-4 h-full transform transition-transform duration-300 hover:scale-105">
                      {/* Stars */}
                      <div className="depoimento-estrelas flex flex-row gap-1">
                        {[...Array(depoimento.rating)].map((_, i) => (
                          <span key={i} className="text-orange text-xl">
                            ★
                          </span>
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-base font-medium text-white flex-grow">
                        "{depoimento.text}"
                      </p>

                      {/* Author */}
                      <div className="depoimento-autor flex flex-row items-center gap-4">
                        <div className="avatar w-12 h-12 rounded-full bg-orange shrink-0" />
                        <span className="text-base font-semibold text-white">
                          {depoimento.autor}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões de Navegação */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 md:-left-6 lg:-left-8 bg-orange hover:bg-orange/80 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 md:-right-6 lg:-right-8 bg-orange hover:bg-orange/80 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95"
              aria-label="Próximo slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicadores de Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {depoimentosData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (emblaApi) {
                    emblaApi.scrollTo(index);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-orange w-8"
                    : "bg-white/30 w-2 hover:bg-white/50"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
