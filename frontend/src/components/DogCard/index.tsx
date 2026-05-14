import { motion } from "framer-motion";

// Definindo as variantes fora para evitar recriação em cada render
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface DogCardProps {
  name: string;
  description: string;
}

export function DogCard({ name, description }: DogCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="nossos-caes-card flex flex-col gap-3 group cursor-pointer"
    >
      {/* Foto do Cão */}
      <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden relative shadow-sm border border-brown/5">
        <div className="w-full h-full bg-brown/10 flex items-center justify-center transition-colors group-hover:bg-orange/10">
          <span className="text-5xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
            🐾
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="nossos-caes-card-info flex flex-col gap-1">
        <span className="font-cmas-play text-brown text-xl lg:text-2xl group-hover:text-orange transition-colors">
          {name}
        </span>
        <span className="text-orange text-sm font-medium">{description}</span>
      </div>
    </motion.div>
  );
}
