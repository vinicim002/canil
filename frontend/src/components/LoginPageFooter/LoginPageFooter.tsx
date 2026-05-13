import { Link } from "react-router-dom";

export function LoginPageFooter() {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div className="flex-1 h-px bg-brown/10" />
      </div>

      <Link
        to="/"
        className="flex flex-row items-center justify-center gap-2 text-body/50 text-sm font-medium hover:text-brown transition-colors"
      >
        <span>←</span>
        <span>Voltar para o site</span>
      </Link>
    </>
  );
}
