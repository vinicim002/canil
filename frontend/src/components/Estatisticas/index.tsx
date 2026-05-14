import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

const stats = [
  { value: 247, suffix: "+", label: "FILHOTES ENTREGUES" },
  { value: 247, suffix: "+", label: "FAIÍLIAS FELIZES" },
  { value: 15, suffix: "+", label: "ANOS DE CRIACAO" },
];

// Sub-componente para a animação do número
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);

  // Configura a "mola" da animação
  const springValue = useSpring(count, {
    stiffness: 40, // Um pouco mais lento para ser mais elegante
    damping: 20,
  });

  // O rounded agora observa o springValue, garantindo que a animação seja fluida
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="font-black">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Estatisticas() {
  return (
    <section className="section-estatisticas bg-cream py-12 md:py-20 mb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-36">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-20">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-20 w-full md:w-auto"
            >
              {/* Item de Estatística */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="estatistica-item flex flex-col items-center gap-3 text-center"
              >
                <span className="font-cmas-play text-orange text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter">
                  <Counter value={item.value} suffix={item.suffix} />
                </span>
                <span className="font-cmas-play text-brown/60 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
                  {item.label}
                </span>
              </motion.div>

              {/* Divisor Vertical - Desktop */}
              {index < stats.length - 1 && (
                <div
                  className="hidden md:block estatistica-divisor w-px h-16 bg-brown/10"
                  style={{ boxShadow: "1px 0 0 0 rgba(255,255,255,0.8)" }}
                />
              )}

              {/* Divisor Horizontal - Mobile */}
              {index < stats.length - 1 && (
                <div className="md:hidden w-12 h-px bg-orange/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
