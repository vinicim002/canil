import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface DogCardProps {
  name: string;
  description: string;
  imageUrl?: string;
}

export function DogCard({ name, description, imageUrl }: DogCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className="flex flex-col gap-5 group cursor-pointer"
    >
      {/* Moldura da Foto */}
      <div className="relative w-full aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-brown/10 transition-all duration-500 border border-brown/5">
        <div className="w-full h-full bg-brown/5 flex items-center justify-center relative overflow-hidden">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay suave para dar profundidade no hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl filter grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                🐾
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-brown/20">
                Foto em breve
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Informações */}
      <div className="flex flex-col gap-2 px-2">
        <div className="flex flex-col">
          <span className="font-cmas-play text-brown text-2xl lg:text-3xl font-bold leading-none group-hover:text-orange transition-colors duration-300">
            {name}
          </span>
          <div className="h-1 w-0 group-hover:w-12 bg-orange mt-2 transition-all duration-500 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-orange text-[11px] font-black uppercase tracking-[0.2em]">
            {description}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
