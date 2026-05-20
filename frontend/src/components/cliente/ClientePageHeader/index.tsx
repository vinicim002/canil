import { Link } from "react-router-dom";

export function ClientePageHeader() {
  return (
    <div className="cliente-header flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-cmas-play text-orange text-xl">BEM-VINDO DE VOLTA</h3>
        <h1 className="font-cmas-play text-brown text-4xl">
          Olá, Maria Silva 👋
        </h1>
        <p className="text-body/60 font-medium text-sm">
          Acompanhe sua reserva e todas as informações do seu filhote aqui.
        </p>
      </div>
      <Link
        to="/"
        className="text-body/50 text-sm font-medium hover:text-brown transition-colors flex items-center gap-2"
      >
        <span>←</span> Voltar ao site
      </Link>
    </div>
  );
}
