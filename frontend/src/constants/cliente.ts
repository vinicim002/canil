import type { ClienteSecaoMenuItem } from "../types/cliente";

export const CLIENTE_SECOES: ClienteSecaoMenuItem[] = [
  { id: "reserva", label: "Minha Reserva", icon: "📋" },
  { id: "pagamentos", label: "Pagamentos", icon: "💳" },
  { id: "documentos", label: "Documentos", icon: "📄" },
  { id: "vacinacao", label: "Vacinação", icon: "💉" },
  { id: "comunicacao", label: "Comunicação", icon: "💬" },
];

export const CLIENTE_RESUMO_RESERVA = [
  { label: "Status da reserva", valor: "Confirmada", icon: "✅" },
  { label: "Valor do sinal", valor: "R$ 500,00", icon: "💰" },
  { label: "Valor restante", valor: "R$ 2.300,00", icon: "💳" },
];

export const CLIENTE_LINHA_TEMPO = [
  { label: "Reserva realizada", data: "05/05/2026", feito: true },
  { label: "Sinal pago", data: "05/05/2026", feito: true },
  { label: "Visita agendada", data: "15/05/2026", feito: false },
  { label: "Pagamento final", data: "20/05/2026", feito: false },
  { label: "Entrega do filhote", data: "25/05/2026", feito: false },
];

export const CLIENTE_PAGAMENTOS = [
  {
    descricao: "Sinal de reserva",
    valor: "R$ 500,00",
    status: "PAGO",
    data: "05/05/2026",
    tipo: "PIX",
  },
  {
    descricao: "Pagamento complementar",
    valor: "R$ 2.300,00",
    status: "PENDENTE",
    data: "20/05/2026",
    tipo: "—",
  },
];

export const CLIENTE_DOCUMENTOS = [
  { nome: "Contrato de compra", status: "Disponível", icon: "📄" },
  { nome: "Pedigree", status: "Disponível após pagamento", icon: "🏅" },
  { nome: "Carteira de vacinação", status: "Disponível", icon: "💉" },
  { nome: "Termo de garantia", status: "Disponível", icon: "✅" },
  { nome: "Orientações pós-venda", status: "Disponível", icon: "📘" },
  { nome: "Nota fiscal", status: "Disponível após pagamento", icon: "🧾" },
];

export const CLIENTE_VACINAS = [
  {
    vacina: "V10 — Múltipla",
    data: "15/03/2026",
    proxima: "15/06/2026",
    lote: "A123",
    status: "OK",
  },
  {
    vacina: "Antirrábica",
    data: "15/03/2026",
    proxima: "15/03/2027",
    lote: "B456",
    status: "OK",
  },
  {
    vacina: "Giárdia",
    data: "20/03/2026",
    proxima: "20/06/2026",
    lote: "C789",
    status: "OK",
  },
  {
    vacina: "V10 — Reforço",
    data: "—",
    proxima: "15/06/2026",
    lote: "—",
    status: "PENDENTE",
  },
];

export const CLIENTE_MENSAGENS = [
  {
    de: "Canil",
    mensagem:
      "Olá Maria! O Thor está se desenvolvendo muito bem. Segue foto atualizada 🐾",
    data: "05/05/2026",
  },
  {
    de: "Canil",
    mensagem:
      "Sua reserva foi confirmada com sucesso! Qualquer dúvida estamos à disposição.",
    data: "05/05/2026",
  },
];
