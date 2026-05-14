import { motion } from "framer-motion";
import { Plane, Heart, ShieldCheck, Box } from "lucide-react";
import mapaBrasilImg from "../../assets/mapaBrasilImg.png";

const diferenciaisEntrega = [
  {
    title: "Transporte Aéreo Exclusivo",
    desc: "Trabalhamos apenas com transporte aéreo especializado, garantindo rapidez e menor estresse.",
    icon: <Plane size={24} className="text-cream" />,
  },
  {
    title: "Preparado com Amor",
    desc: "Cada filhote vai com manta com cheirinho da mãe e kit de boas-vindas.",
    icon: <Heart size={24} className="text-cream" />,
  },
  {
    title: "Segurança Total",
    desc: "Sem compartilhamento de carga. O transporte é focado exclusivamente no bem-estar animal.",
    icon: <ShieldCheck size={24} className="text-cream" />,
  },
  {
    title: "Logística Completa",
    desc: "Cuidamos de toda a burocracia e documentação necessária para o embarque imediato.",
    icon: <Box size={24} className="text-cream" />,
  },
];

export function Entrega() {
  return (
    <section className="px-6 md:px-12 lg:px-36 py-12 md:py-24 mb-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20">
        {/* MAPA DESKTOP - Apenas a imagem cinza */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-square flex items-center justify-center"
          >
            <img
              src={mapaBrasilImg}
              className="w-full h-auto grayscale opacity-40 brightness-75 contrast-125"
              alt="Ilustração Mapa Logística"
            />
          </motion.div>
        </div>

        {/* COLUNA DE CONTEÚDO */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <motion.h3
              className="text-sm font-black tracking-[0.3em] text-orange uppercase"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              LOGÍSTICA DE ENTREGA
            </motion.h3>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl text-brown font-cmas-play font-bold"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Entregas em <br /> Todo o Brasil
            </motion.h2>
            <p className="text-body/70 text-base md:text-lg font-medium max-w-xl mx-auto lg:mx-0">
              Cuidamos de cada detalhe do transporte aéreo especializado para
              que seu filhote chegue com total conforto e segurança ao novo lar.
            </p>
          </div>

          {/* MAPA MOBILE - Inserido no fluxo */}
          <div className="lg:hidden w-full relative py-8 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <img
                src={mapaBrasilImg}
                className="w-full h-auto grayscale opacity-40 brightness-90"
                alt="Ilustração Mapa Logística Mobile"
              />
            </div>
          </div>

          {/* Lista de Diferenciais */}
          <div className="flex flex-col">
            {diferenciaisEntrega.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-b border-orange/10 last:border-0"
              >
                <div className="flex flex-row items-start gap-5 py-6 transition-all">
                  <div className="w-12 h-12 bg-brown rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:bg-orange transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-bold text-brown font-cmas-play">
                      {item.title}
                    </h4>
                    <p className="text-body/60 text-sm md:text-base font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
