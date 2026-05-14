import { motion } from "framer-motion";

const beneficios = [
  "Filhotes saudaveis",
  "Pedigree garantido",
  "Transporte aereo",
  "Vacinacao em dia",
  "Selecao genetica",
  "Criados com amor",
  "Desde 2011",
  "Pelo curto e longo",
];

export function BeneficiosBanner() {
  return (
    <section className="beneficios-banner relative overflow-hidden bg-cream border-y border-brown/10 py-6 mb-20">
      {/* Container da animação */}
      <div className="flex flex-row whitespace-nowrap">
        <motion.div
          className="flex flex-row gap-12 pr-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30, // Aumentei para 30s para ficar mais suave a leitura
            repeat: Infinity,
          }}
          // Pausa a animação quando o usuário passa o mouse
          whileHover={{ animationPlayState: "paused" }}
        >
          {/* Duplicamos a lista para criar o efeito infinito sem saltos */}
          {[...beneficios, ...beneficios].map((item, index) => (
            <div
              key={index}
              className="beneficio-item flex flex-row items-center gap-4 shrink-0"
            >
              <span className="text-orange text-xl select-none">✦</span>
              <span className="font-cmas-play text-orange text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradientes nas pontas para efeito de "fade" (opcional, mas fica lindo) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />
    </section>
  );
}