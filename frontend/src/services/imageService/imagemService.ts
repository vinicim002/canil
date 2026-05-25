import type { ImagemResponse } from "./ImagemResponse";

import { api } from "../api";

export const imagemService = {
  listarPorCao: (caoId: string) =>
    api.get<ImagemResponse[]>(`/imagens/caes/${caoId}`),

  upload: (caoId: string, file: File, capa: boolean = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("capa", String(capa));

    return api.upload<ImagemResponse>(`/imagens/caes/${caoId}`, formData);
  },

  definirCapa: (caoId: string, imagemId: string) =>
    api.patch<ImagemResponse>(`/imagens/caes/${caoId}/capa/${imagemId}`),

  deletar: (imagemId: string) =>
    api.delete<void>(`/imagens/${imagemId}`),
};
