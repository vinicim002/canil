export const statusUsuarioColor: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-700",
  APROVADO: "bg-green-100 text-green-700",
  REJEITADO: "bg-red-100 text-red-700",
};

export const statusUsuarioLabel: Record<string, string> = {
  PENDENTE: "Pendente",
  APROVADO: "Aprovado",
  REJEITADO: "Rejeitado",
};

export const statusReservaColor: Record<string, string> = {
  APROVADA: "bg-green-100 text-green-700",
  SOLICITADA: "bg-yellow-100 text-yellow-700",
  EM_ANALISE: "bg-blue-100 text-blue-700",
  PAGA: "bg-purple-100 text-purple-700",
  REJEITADA: "bg-red-100 text-red-700",
  CANCELADA: "bg-red-100 text-red-700",
};

export const statusFilhoteColor: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-700",
  RESERVADO: "bg-yellow-100 text-yellow-700",
  VENDIDO: "bg-brown/10 text-brown",
};

export const statusFilhoteGridColor: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-700 border-green-200",
  RESERVADO: "bg-yellow-100 text-yellow-700 border-yellow-200",
  VENDIDO: "bg-red-100 text-red-700 border-red-200",
};

export const tipoCaoLabel: Record<string, string> = {
  FILHOTE: "Filhote",
  MATRIZ: "Matriz",
  REPRODUTOR: "Reprodutor",
};

export function getStatusColor(
  map: Record<string, string>,
  status: string,
): string {
  return map[status] ?? "bg-gray-100 text-gray-700";
}
