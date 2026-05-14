import type { ImagemResponse } from "../imageService/ImagemResponse";

export interface CaoResponse {
  id: string;
  nome: string;
  tipoPelo: string;
  tamanho: string;
  genero: string;
  status: string;
  dataNascimento: string;
  cor: string;
  pedigree: string;
  descricao: string;
  destaque: boolean;
  pai: { id: string; nome: string } | null;
  mae: { id: string; nome: string } | null;
  imagens: ImagemResponse[];
  criadoEm: string;
}
