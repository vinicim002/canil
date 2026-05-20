import { CLIENTE_SECOES } from "../../../constants/cliente";
import type { ClienteSecao } from "../../../types/cliente";

interface ClienteSectionNavProps {
  secaoAtiva: ClienteSecao;
  onSecaoChange: (secao: ClienteSecao) => void;
}

export function ClienteSectionNav({
  secaoAtiva,
  onSecaoChange,
}: ClienteSectionNavProps) {
  return (
    <div className="cliente-menu flex flex-row gap-2 border-b border-brown/10 pb-0">
      {CLIENTE_SECOES.map((s) => (
        <button
          key={s.id}
          onClick={() => onSecaoChange(s.id)}
          className={`flex flex-row items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            secaoAtiva === s.id
              ? "border-orange text-brown"
              : "border-transparent text-body/50 hover:text-brown"
          }`}
        >
          <span>{s.icon}</span>
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
}
