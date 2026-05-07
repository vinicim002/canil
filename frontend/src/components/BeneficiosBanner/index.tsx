import { useRef } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="beneficios-banner overflow-hidden bg-cream border-y border-brown/20 py-4 mb-20">
      <div
        ref={trackRef}
        className="beneficios-track flex flex-row gap-12"
        style={{
          animation: "scroll-banner 20s linear infinite",
          width: "max-content",
        }}
      >
        {[...beneficios, ...beneficios].map((item, index) => (
          <div
            key={index}
            className="beneficio-item flex flex-row items-center gap-3 shrink-0"
          >
            <span className="text-orange text-lg">✦</span>
            <span className="font-cmas-play text-orange text-sm font-bold tracking-widest uppercase">
              {item}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-banner {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
