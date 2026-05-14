import { motion } from "framer-motion";

// Configurações de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Sub-componente para os cards de cães
const DogCard = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8 }}
    className="nossos-caes-card flex flex-col gap-3 group cursor-pointer"
  >
    <div className="nossos-caes-card-foto w-full aspect-square bg-cream rounded-2xl overflow-hidden relative shadow-sm border border-brown/5">
      <div className="w-full h-full bg-brown/10 flex items-center justify-center transition-colors group-hover:bg-orange/10">
        <span className="text-5xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
          🐾
        </span>
      </div>
    </div>
    <div className="nossos-caes-card-info flex flex-col gap-1">
      <span className="font-cmas-play text-brown text-xl lg:text-2xl group-hover:text-orange transition-colors">
        {name}
      </span>
      <span className="text-orange text-sm font-medium">{description}</span>
    </div>
  </motion.div>
);

export function NossosCaesPage() {
  return (
    <main className="nossos-caes-page pt-24 md:pt-32 pb-20 mb-10 overflow-hidden">
      <div className="nossos-caes-page-inner px-6 md:px-12 lg:px-36 flex flex-col gap-16 md:gap-24">
        {/* Header - Fade in simples */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="nossos-caes-page-header flex flex-col items-center gap-4 text-center"
        >
          <h3 className="font-cmas-play text-orange text-xl md:text-2xl tracking-wider">
            CONHEÇA NOSSOS CÃES
          </h3>
          <h1 className="font-cmas-play text-brown text-4xl md:text-6xl uppercase">
            Nossos Cães
          </h1>
          <p className="text-body font-medium text-base md:text-lg w-full md:w-2/3 lg:w-1/2 leading-relaxed">
            Conheça os reprodutores e matrizes que fazem parte da nossa família
            e são responsáveis pelos filhotes mais lindos do Brasil.
          </p>
        </motion.div>

        {/* Reprodutores Section */}
        <section className="nossos-caes-categoria flex flex-col gap-10">
          <div className="nossos-caes-categoria-header flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-cmas-play text-brown text-3xl md:text-4xl">
                Reprodutores
              </h2>
              <p className="text-body font-medium text-sm md:text-base">
                Machos selecionados geneticamente para garantir padrão e saúde.
              </p>
            </div>
            <div className="hidden md:block flex-1 h-px bg-brown/20"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="nossos-caes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <DogCard name="Nome do Cão" description="Pelo curto • Miniatura" />
            <DogCard name="Nome do Cão" description="Pelo longo • Kaninchen" />
            <DogCard name="Nome do Cão" description="Pelo curto • Padrão" />
            <DogCard name="Nome do Cão" description="Pelo longo • Miniatura" />
          </motion.div>
        </section>

        {/* Matrizes Section */}
        <section className="nossos-caes-categoria flex flex-col gap-10">
          <div className="nossos-caes-categoria-header flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-cmas-play text-brown text-3xl md:text-4xl">
                Matrizes
              </h2>
              <p className="text-body font-medium text-sm md:text-base">
                Fêmeas com excelente temperamento e histórico de saúde
                comprovado.
              </p>
            </div>
            <div className="hidden md:block flex-1 h-px bg-brown/20"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="nossos-caes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <DogCard
              name="Nome da Cadela"
              description="Pelo curto • Miniatura"
            />
            <DogCard
              name="Nome da Cadela"
              description="Pelo longo • Kaninchen"
            />
            <DogCard name="Nome da Cadela" description="Pelo curto • Padrão" />
            <DogCard
              name="Nome da Cadela"
              description="Pelo longo • Miniatura"
            />
          </motion.div>
        </section>
      </div>
    </main>
  );
}
