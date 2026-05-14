import { motion } from "framer-motion";

interface HeaderAdminCaesProps {
  abrirAdicionar: () => void;
  quantidadeCaes: number;
}

export function HeaderAdminCaes({
  abrirAdicionar,
  quantidadeCaes,
}: HeaderAdminCaesProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Título e Contador */}
      <div className="flex flex-col gap-0.5">
        <h1 className="font-cmas-play text-brown text-2xl md:text-3xl font-bold">
          Cães
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-body/60 text-xs md:text-sm font-medium">
            {quantidadeCaes}{" "}
            {quantidadeCaes === 1 ? "cão cadastrado" : "cães cadastrados"}
          </p>
        </div>
      </div>

      {/* Botão com animação de escala e responsividade */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={abrirAdicionar}
        className="bg-brown text-white font-bold py-3 px-6 md:py-2.5 md:px-8 rounded-2xl md:rounded-full hover:bg-orange transition-all duration-300 cursor-pointer text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
      >
        <span className="text-lg">+</span>
        Adicionar cão
      </motion.button>
    </div>
  );
}
