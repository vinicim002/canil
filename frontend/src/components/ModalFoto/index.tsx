import { AnimatePresence, motion } from "motion/react";
import type { CaoResponse } from "../../services/caoService/caoResponse";
import type { ImagemResponse } from "../../services/imageService/ImagemResponse";
import { ImageIcon, Star, Trash2, Upload, X } from "lucide-react";

interface ModalFotoProps {
  modalTipo: "fotos" | null;
  caoSelecionado: CaoResponse | null;
  fecharModal: () => void;
  erro: string | null;
  imagens: ImagemResponse[];
  setUploadFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadFile: File | null;
  uploadCapa: boolean;
  setUploadCapa: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpload: () => void;
  uploadCarregando: boolean;
  handleDefinirCapa: (imagemId: string) => void;
  handleDeletarImagem: (imagemId: string) => void;
}

export function ModalFoto({
  modalTipo,
  caoSelecionado,
  fecharModal,
  erro,
  imagens,
  setUploadFile,
  uploadFile,
  uploadCapa,
  setUploadCapa,
  handleUpload,
  uploadCarregando,
  handleDefinirCapa,
  handleDeletarImagem,
}: ModalFotoProps) {
  return (
    <AnimatePresence>
      {modalTipo === "fotos" && caoSelecionado && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-brown/5 bg-white">
              <div className="flex flex-col">
                <h2 className="font-cmas-play text-brown text-2xl font-bold">
                  Galeria de Fotos
                </h2>
                <p className="text-orange text-xs font-bold uppercase tracking-widest">
                  {caoSelecionado.nome}
                </p>
              </div>
              <button
                onClick={fecharModal}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-brown/5 text-brown hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
              {erro && (
                <div className="text-red-500 text-sm font-bold bg-red-50 px-5 py-4 rounded-2xl border border-red-100 animate-shake">
                  ⚠️ {erro}
                </div>
              )}

              {/* Seção de Upload */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-2 flex flex-col gap-4 p-6 bg-cream/40 rounded-[2rem] border-2 border-dashed border-brown/10 hover:border-orange/30 transition-colors group">
                  <div className="flex flex-col items-center justify-center py-4 gap-2">
                    <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <p className="text-brown font-bold text-sm">
                      Selecione uma nova foto
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-brown/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brown file:text-white hover:file:bg-orange file:cursor-pointer"
                  />

                  <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
                    <input
                      type="checkbox"
                      id="upload-capa"
                      checked={uploadCapa}
                      onChange={(e) => setUploadCapa(e.target.checked)}
                      className="w-5 h-5 accent-orange cursor-pointer"
                    />
                    <label
                      htmlFor="upload-capa"
                      className="text-brown font-bold text-xs cursor-pointer uppercase"
                    >
                      Definir como foto de capa principal
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || uploadCarregando}
                  className="h-full bg-brown text-white font-bold py-6 px-8 rounded-[2rem] hover:bg-orange transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2 shadow-lg shadow-brown/10"
                >
                  {uploadCarregando ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <ImageIcon size={28} />
                      <span>Fazer Upload</span>
                    </>
                  )}
                </button>
              </div>

              {/* Grid de Galeria */}
              <div className="flex flex-col gap-4">
                <h3 className="text-brown font-bold text-xs uppercase tracking-widest ml-1">
                  Fotos Salvas ({imagens.length})
                </h3>

                {imagens.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4 bg-cream/20 rounded-[2rem] border border-brown/5">
                    <div className="text-6xl opacity-20">📸</div>
                    <span className="text-brown/40 font-bold text-sm">
                      Nenhuma foto neste álbum ainda.
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagens.map((img) => (
                      <motion.div
                        layout
                        key={img.id}
                        className="relative aspect-square rounded-[1.5rem] overflow-hidden border-2 border-brown/5 group shadow-sm"
                      >
                        <img
                          src={img.url}
                          alt="Foto do cão"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {img.capa && (
                          <div className="absolute top-3 left-3 bg-orange text-white text-[10px] font-black py-1 px-3 rounded-full shadow-lg flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> CAPA
                          </div>
                        )}

                        <div className="absolute inset-0 bg-brown/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                          {!img.capa && (
                            <button
                              onClick={() => handleDefinirCapa(img.id)}
                              className="w-full bg-white text-brown text-[10px] font-black py-2 rounded-xl hover:bg-orange hover:text-white transition-all cursor-pointer shadow-sm"
                            >
                              MARCAR CAPA
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletarImagem(img.id)}
                            className="w-full bg-red-500/20 text-red-100 text-[10px] font-black py-2 rounded-xl hover:bg-red-500 hover:text-white border border-red-500/50 transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Trash2 size={12} /> DELETAR
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
