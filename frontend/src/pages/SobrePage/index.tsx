import { motion } from "framer-motion";
import { History, Scissors, Ruler, Dog, Quote } from "lucide-react";
import dachshundImg from "../../assets/dachshund-sobre.png";

export function SobrePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" },
  } as const;

  return (
    <main className="sobre-page pt-32 pb-20 bg-cream/10">
      <div className="sobre-page-inner px-6 md:px-12 lg:px-24 xl:px-36 flex flex-col gap-24">
        {/* Header com imagem - Estrutura hero preservada conforme solicitado */}
        <motion.div
          className="sobre-header relative flex flex-col items-center gap-6 text-center"
          {...fadeInUp}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-black tracking-[0.3em] text-orange text-sm uppercase opacity-90">
              Conheça a Raça
            </h3>
            <h1 className="font-cmas-play text-brown text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              A Essencia da Raca <br /> que Criamos
            </h1>
          </div>

          <p className="text-body/80 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            O Dachshund, também chamado de Teckel ou Salsicha, é uma raça única
            — corajosa, curiosa e cheia de personalidade.
          </p>

          <div className="sobre-hero-imagem relative w-full">
            <div className="relative w-full" style={{ paddingBottom: "30%" }}>
              {/* Card laranja */}
              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-orange rounded-[3rem] shadow-2xl shadow-orange/20" />

              {/* Imagem — Posição absoluta preservada */}
              <motion.img
                src={dachshundImg}
                className="absolute left-1/2 -translate-x-1/2 w-[70%] md:w-[70%] lg:w-[70%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{ bottom: "-34%" }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                alt="Dachshund espiando"
              />
            </div>
          </div>
        </motion.div>

        {/* Origem - Layout Refinado */}
        <motion.div className="sobre-secao flex flex-col gap-8" {...fadeInUp}>
          <div className="sobre-secao-header flex flex-row items-center gap-8">
            <div className="flex items-center gap-4 shrink-0">
              <div className="p-3 bg-brown/5 rounded-2xl">
                <History className="text-brown" size={32} />
              </div>
              <h2 className="font-cmas-play text-brown text-4xl font-bold">
                Origem e Historia
              </h2>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-brown/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-body/70 font-medium text-base md:text-lg leading-relaxed">
            <p>
              Evidências sobre o Dachshund como uma raça só foram encontradas no
              século 16, com referências a um cachorro "baixo de pernas tortas",
              chamado de cão escavador ou cão texugo. O nome moderno,
              **Dachshund**, quer dizer exatamente cão texugo (*dachs hund*) em
              alemão.
            </p>
            <p>
              Os Dachshunds originais tinham o pelo liso e surgiram do
              cruzamento do bracke com o Pinscher. Em 1910, critérios rigorosos
              definiram as variedades de pelo que conhecemos hoje, tornando-o um
              dos cães mais populares do mundo.
            </p>
          </div>
        </motion.div>

        {/* Temperamento + Cuidados - Cards com Glassmorphism sutil */}
        <div className="sobre-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="sobre-card bg-brown rounded-[2.5rem] p-10 flex flex-col gap-6 shadow-2xl relative overflow-hidden group"
            {...fadeInUp}
          >
            <Quote className="absolute -top-4 -right-4 text-white/5 w-32 h-32 rotate-12" />
            <div className="w-14 h-14 rounded-2xl bg-orange flex items-center justify-center shadow-lg shadow-orange/20">
              <Dog className="text-white" size={28} />
            </div>
            <h3 className="font-cmas-play text-white text-3xl font-bold">
              Temperamento
            </h3>
            <p className="text-white/80 font-medium text-base md:text-lg leading-relaxed italic">
              "Corajoso, curioso e sempre em busca de aventuras. É independente,
              mas quer participar de tudo com a família. Se dá muito bem com
              crianças e é extremamente leal."
            </p>
          </motion.div>

          <motion.div
            className="sobre-card bg-orange rounded-[2.5rem] p-10 flex flex-col gap-6 shadow-2xl relative overflow-hidden group"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Quote className="absolute -top-4 -right-4 text-white/10 w-32 h-32 rotate-12" />
            <div className="w-14 h-14 rounded-2xl bg-brown flex items-center justify-center shadow-lg shadow-brown/20">
              <Scissors className="text-white" size={28} />
            </div>
            <h3 className="font-cmas-play text-white text-3xl font-bold">
              Cuidados
            </h3>
            <p className="text-white/90 font-medium text-base md:text-lg leading-relaxed italic">
              "Adapta-se bem a apartamentos. Pelo curto requer higiene básica; o
              longo precisa de escovação semanal. Exercícios moderados são
              ideais para sua saúde física e mental."
            </p>
          </motion.div>
        </div>

        {/* Tamanhos - Cards de Informação Técnica */}
        <motion.div className="sobre-secao flex flex-col gap-10" {...fadeInUp}>
          <div className="flex items-center gap-6">
            <h2 className="font-cmas-play text-brown text-4xl font-bold">
              Variedades de Tamanho
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-brown/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Kaninchenteckel",
                label: "Coelho",
                desc: "Até 30 cm de perímetro torácico.",
                icon: <Ruler size={18} />,
              },
              {
                title: "Zwergteckel",
                label: "Miniatura",
                desc: "30 a 35 cm de perímetro torácico.",
                icon: <Ruler size={18} />,
              },
              {
                title: "Standard",
                label: "Padrão",
                desc: "Acima de 35 cm de perímetro torácico.",
                icon: <Ruler size={18} />,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white border border-brown/5 rounded-[2rem] p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <span className="font-black text-[10px] tracking-[0.3em] text-orange uppercase">
                  {t.label}
                </span>
                <h4 className="font-cmas-play text-brown text-2xl font-bold group-hover:text-orange transition-colors">
                  {t.title}
                </h4>
                <div className="flex items-center gap-3 text-body/60 font-medium border-t border-brown/5 pt-4">
                  {t.icon}
                  <p className="text-sm">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pelagens - Visual Cards */}
        <motion.div className="sobre-secao flex flex-col gap-10" {...fadeInUp}>
          <div className="flex items-center gap-6">
            <h2 className="font-cmas-play text-brown text-4xl font-bold">
              Tipos de Pelagem
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-brown/20 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pelo Liso",
                desc: "Bem assentado, curto, brilhante e denso. Pele firme e elástica.",
              },
              {
                title: "Pelo Longo",
                desc: "Sedoso, com franjas nas orelhas, peito, parte inferior do corpo e cauda.",
              },
              {
                title: "Pelo Duro",
                desc: "Subpelo denso e textura áspera. Apresenta barba e sobrancelhas marcadas.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-cream/40 backdrop-blur-sm rounded-[2rem] p-8 flex flex-col gap-5 border border-brown/10 hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-brown flex items-center justify-center shrink-0 shadow-lg shadow-brown/10">
                  <Dog className="text-white" size={24} />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-cmas-play text-brown text-2xl font-bold">
                    {p.title}
                  </h4>
                  <p className="text-body/70 font-medium text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-body/40 font-black text-[10px] tracking-widest text-center uppercase border-t border-brown/5 pt-8">
            Padrão Oficial Reconhecido pela FCI / CBKC
          </p>
        </motion.div>
      </div>
    </main>
  );
}
