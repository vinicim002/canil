import { motion } from "framer-motion";
import { Calendar, Info, MessageCircle } from "lucide-react";

export function FilhotesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  } as const;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <main className="filhotes-page pt-32 pb-20 bg-cream/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-20">
        {/* Header de Impacto */}
        <header className="filhotes-header flex flex-col items-center justify-center gap-10 text-center">
          <motion.div
            {...fadeInUp}
            className="filhotes-header-texto flex flex-col gap-4"
          >
            <h3 className="font-black tracking-[0.4em] text-orange text-sm md:text-base uppercase">
              Disponíveis Agora
            </h3>
            <h1 className="font-cmas-play text-brown text-5xl md:text-7xl font-bold uppercase">
              Filhotes
            </h1>
            <p className="text-body/80 font-medium text-base md:text-xl max-w-2xl mx-auto">
              Todos os filhotes são criados com amor, vacinados e acompanhados
              por veterinário. Reservas sujeitas à disponibilidade.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="filhotes-header-cta flex items-center gap-3 bg-brown text-white font-black py-5 px-10 rounded-full cursor-pointer hover:bg-orange transition-all shadow-xl shadow-brown/20 uppercase tracking-widest text-sm"
          >
            <MessageCircle size={20} />
            Reservar filhote
          </motion.button>
        </header>

        {/* Machos */}
        <section className="filhotes-categoria flex flex-col gap-10">
          <motion.div
            {...fadeInUp}
            className="filhotes-categoria-header flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-cmas-play text-brown text-4xl font-bold uppercase">
                  Machos
                </h2>
                <span className="bg-brown text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-tighter">
                  4 disponíveis
                </span>
              </div>
              <div className="flex items-center gap-2 text-body/60 text-xs font-bold uppercase tracking-widest">
                <Calendar size={14} />
                <span>Atualizado em 15 de maio de 2026</span>
              </div>
            </div>
            <div className="flex-1 h-px bg-brown/10"></div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="filhotes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Exemplo de Card - Repetir para os outros */}
            <motion.div
              variants={item}
              className="filhote-card group flex flex-col gap-4"
            >
              <div className="filhote-card-foto relative w-full aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                <div className="w-full h-full bg-brown/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 text-6xl">
                  🐶
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <span className="bg-green-500 text-white text-[10px] font-black py-1.5 px-4 rounded-full shadow-lg uppercase tracking-widest">
                    Disponível
                  </span>
                </div>
              </div>

              <div className="filhote-card-info flex flex-col gap-2 px-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-orange text-sm font-black uppercase tracking-widest">
                    Pelo curto • Miniatura
                  </span>
                  <span className="text-brown/40 text-xs font-bold uppercase">
                    Nascido em 01/03/2026
                  </span>
                </div>
                <button className="mt-2 text-brown font-bold text-xs uppercase flex items-center gap-2 group-hover:text-orange transition-colors">
                  <Info size={14} /> Detalhes do filhote
                </button>
              </div>
            </motion.div>

            {/* Renderizar os outros 3 machos aqui com o mesmo padrão */}
          </motion.div>
        </section>

        {/* Fêmeas */}
        <section className="filhotes-categoria flex flex-col gap-10">
          <motion.div
            {...fadeInUp}
            className="filhotes-categoria-header flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4">
                <h2 className="font-cmas-play text-brown text-4xl font-bold uppercase">
                  Femeas
                </h2>
                <span className="bg-brown text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-tighter">
                  3 disponíveis
                </span>
              </div>
              <div className="flex items-center gap-2 text-body/60 text-xs font-bold uppercase tracking-widest">
                <Calendar size={14} />
                <span>Atualizado em 15 de maio de 2026</span>
              </div>
            </div>
            <div className="flex-1 h-px bg-brown/10"></div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="filhotes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Exemplo de Card Fêmea */}
            <motion.div
              variants={item}
              className="filhote-card group flex flex-col gap-4"
            >
              <div className="filhote-card-foto relative w-full aspect-square bg-white rounded-[2.5rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                <div className="w-full h-full bg-brown/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 text-6xl">
                  🐶
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <span className="bg-brown text-white text-[10px] font-black py-1.5 px-4 rounded-full shadow-lg uppercase tracking-widest">
                    Vendido
                  </span>
                </div>
              </div>

              <div className="filhote-card-info flex flex-col gap-2 px-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-orange text-sm font-black uppercase tracking-widest opacity-40">
                    Pelo longo • Kaninchen
                  </span>
                  <span className="text-brown/40 text-xs font-bold uppercase">
                    Nascido em 10/03/2026
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
