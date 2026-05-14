import { motion } from "framer-motion";
import salsichasNossoCanilImg from "../../assets/salsichasNossoCanil.png";

export function NossoCanil() {
  return (
    <section className="section-nosso-canil px-6 md:px-12 lg:px-36 py-12 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 mb-10 md:mb-20 overflow-hidden">
      
      {/* Informações - Esquerda */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="nosso-canil-info w-full lg:w-1/2 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-cmas-play text-4xl md:text-5xl text-brown font-bold tracking-tight">
            NOSSO CANIL
          </h2>
          <h3 className="font-cmas-play text-2xl md:text-3xl text-orange font-medium">
            CANIL ALTO DA BELA VISTA
          </h3>
        </div>

        <div className="space-y-4 text-body/80 leading-relaxed text-sm md:text-base font-medium max-w-xl">
          <p>
            Desde 2011, o Canil Alto da Bela Vista tem levado alegria e
            companheirismo a inúmeras famílias, oferecendo filhotes lindos,
            saudáveis e com temperamento excepcional.
          </p>
          <p>
            Nosso compromisso é com a saúde, o bem-estar, o aperfeiçoamento
            genético e a seleção comportamental de cada exemplar.
          </p>
          <p className="italic text-brown font-semibold">
            Criamos cães pelo longo, pelo curto, miniatura e kaninchen.
          </p>
        </div>

        {/* Tags Responsivas */}
        <div className="nosso-canil-tags flex flex-wrap gap-2 md:gap-3 mt-4">
          {["Pelo curto", "Pelo longo", "Miniatura", "Kaninchen"].map((tag) => (
            <span 
              key={tag}
              className="bg-brown/5 border border-brown/10 text-brown text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full py-2 px-5 hover:bg-orange hover:text-white hover:border-orange transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Imagem - Direita */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="nosso-canil-imagem w-full lg:w-1/2 relative group"
      >
        {/* Elemento Decorativo atrás da imagem */}
        <div className="absolute -inset-4 bg-orange/5 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
        
        <img
          src={salsichasNossoCanilImg}
          className="relative w-full rounded-[2.5rem] shadow-2xl shadow-brown/10 object-cover z-10 transition-transform duration-500 group-hover:scale-[1.02]"
          alt="Dachshunds do Canil Alto da Bela Vista"
        />

        {/* Badge Flutuante */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-3 border border-brown/5">
          <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-bold">
            15+
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-brown/40 uppercase leading-none">Anos de</span>
            <span className="text-sm font-bold text-brown">Experiência</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}