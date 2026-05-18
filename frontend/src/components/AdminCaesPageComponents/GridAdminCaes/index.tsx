import { motion } from "framer-motion";
import type { CaoResponse } from "../../../services/caoService/caoResponse";
import type { ImagemResponse } from "../../../services/imageService/ImagemResponse";

interface GridAdminCaesProps {
  handleDeletar: (id: string) => void;
  abrirFotos: (cao: CaoResponse) => void;
  abrirEditar: (cao: CaoResponse) => void;
  caesFiltrados: CaoResponse[];
  carregando: boolean;
  showStatus?: boolean; // Nova prop opcional
}

// Mapeamento de cores para os status
const statusStyles: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-700 border-green-200",
  RESERVADO: "bg-yellow-100 text-yellow-700 border-yellow-200",
  VENDIDO: "bg-red-100 text-red-700 border-red-200",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export function GridAdminCaes({
  handleDeletar,
  abrirFotos,
  abrirEditar,
  caesFiltrados,
  carregando,
  showStatus = true, // Padrão é falso para não quebrar Matrizes/Reprodutores
}: GridAdminCaesProps) {
  return (
    <>
      {carregando ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-orange/20 border-t-orange rounded-full animate-spin" />
          <span className="text-brown/50 font-bold animate-pulse">
            Carregando cães...
          </span>
        </div>
      ) : caesFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-3xl border border-dashed border-brown/20">
          <span className="text-5xl">🐾</span>
          <span className="text-brown/50 font-semibold text-center px-4">
            Nenhum cão encontrado com esses filtros.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {caesFiltrados.map((cao) => {
            const imagemCapa = cao.imagens?.find(
              (img: ImagemResponse) => img.capa,
            );

            return (
              <motion.div
                key={cao.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="cao-card bg-white rounded-[2rem] border border-brown/10 overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="cao-card-foto w-full aspect-square bg-cream relative overflow-hidden">
                  {imagemCapa ? (
                    <img
                      src={imagemCapa.url}
                      alt={cao.nome}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-brown/5 flex items-center justify-center">
                      <span className="text-6xl opacity-10">🐾</span>
                    </div>
                  )}

                  {/* Badge de Destaque (Esquerda) */}
                  {cao.destaque && (
                    <div className="absolute top-4 left-4 bg-orange text-white text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-lg z-10">
                      ★ Destaque
                    </div>
                  )}

                  {/* Badge de Status (Direita) - Só aparece se showStatus for true */}
                  {showStatus && (
                    <div
                      className={`absolute top-4 right-4 text-[9px] font-black px-3 py-1 rounded-full uppercase border shadow-sm z-10 ${statusStyles[cao.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {cao.status}
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-cmas-play text-brown text-xl font-bold leading-tight">
                        {cao.nome}
                      </span>
                      {/* Ícone de gênero opcional para facilitar visualização rápida */}
                      <span className="text-xs opacity-30">
                        {cao.genero === "MACHO" ? "♂" : "♀"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-orange/10 text-orange text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {cao.tipoPelo}
                      </span>
                      <span className="bg-brown/5 text-brown/60 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        {cao.tamanho}
                      </span>
                      {cao.cor && (
                        <span className="bg-brown/5 text-brown/60 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                          {cao.cor}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 mt-auto">
                    <button
                      onClick={() => abrirFotos(cao)}
                      className="flex-1 bg-cream text-brown text-xs font-bold py-3 rounded-2xl hover:bg-brown/10 transition-colors cursor-pointer"
                    >
                      📷 Fotos
                    </button>
                    <button
                      onClick={() => abrirEditar(cao)}
                      className="flex-1 bg-brown text-white text-xs font-bold py-3 rounded-2xl hover:bg-orange transition-colors cursor-pointer"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeletar(cao.id)}
                      className="bg-red-50 text-red-500 text-xs font-bold py-3 px-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}
