import type { CaoResponse } from "../../services/caoService/caoService";
import type { ImagemResponse } from "../../services/imageService/imagemService";

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
    <>
      {modalTipo === "fotos" && caoSelecionado && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
              <h2 className="font-cmas-play text-brown text-2xl">
                Fotos — {caoSelecionado.nome}
              </h2>
              <button
                onClick={fecharModal}
                className="text-body/40 hover:text-brown text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {erro && (
                <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">
                  {erro}
                </p>
              )}

              {/* Upload */}
              <div className="flex flex-col gap-3 p-4 bg-cream rounded-2xl border border-brown/10">
                <h3 className="font-cmas-play text-brown text-lg">
                  Adicionar foto
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="text-body text-sm font-medium"
                />
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="checkbox"
                    id="upload-capa"
                    checked={uploadCapa}
                    onChange={(e) => setUploadCapa(e.target.checked)}
                    className="w-4 h-4 accent-orange"
                  />
                  <label
                    htmlFor="upload-capa"
                    className="text-brown font-medium text-sm cursor-pointer"
                  >
                    Definir como foto de capa
                  </label>
                </div>
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || uploadCarregando}
                  className="bg-brown text-white font-medium py-2.5 px-6 rounded-full hover:bg-orange transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed self-start text-sm"
                >
                  {uploadCarregando ? "Enviando..." : "Enviar foto"}
                </button>
              </div>

              {/* Galeria */}
              {imagens.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <span className="text-4xl">📷</span>
                  <span className="text-body/50 font-medium text-sm">
                    Nenhuma foto cadastrada.
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {imagens.map((img) => (
                    <div
                      key={img.id}
                      className="relative rounded-xl overflow-hidden border border-brown/10 group"
                    >
                      <img
                        src={img.url}
                        alt="Foto do cão"
                        className="w-full aspect-square object-cover"
                      />
                      {img.capa && (
                        <span className="absolute top-2 left-2 bg-orange text-white text-xs font-medium py-1 px-2 rounded-full">
                          Capa
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {!img.capa && (
                          <button
                            onClick={() => handleDefinirCapa(img.id)}
                            className="bg-white text-brown text-xs font-medium py-1.5 px-4 rounded-full hover:bg-orange hover:text-white transition-colors cursor-pointer"
                          >
                            Definir como capa
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletarImagem(img.id)}
                          className="bg-red-500 text-white text-xs font-medium py-1.5 px-4 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
