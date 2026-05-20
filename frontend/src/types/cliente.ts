export type ClienteSecao =
  | "reserva"
  | "pagamentos"
  | "documentos"
  | "vacinacao"
  | "comunicacao";

export type ClienteSecaoMenuItem = {
  id: ClienteSecao;
  label: string;
  icon: string;
};
