export interface CaoRequest {
  nome: string;
  tipo: "FILHOTE" | "MATRIZ" | "REPRODUTOR";
  tipoPelo: string;
  tamanho: string;
  genero: string;
  status: string;
  dataNascimento?: string;
  cor?: string;
  pedigree?: string;
  descricao?: string;
  destaque?: boolean;
  paiId?: string;
  maeId?: string;
}
