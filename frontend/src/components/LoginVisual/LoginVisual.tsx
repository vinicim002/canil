import { Link } from "react-router-dom";

type Tela = "login" | "cadastro" | "esqueci-senha";

interface LoginVisualProps {
  tela: Tela;
}

export function LoginVisual({ tela }: LoginVisualProps) {
  return (
    <div className="login-visual hidden lg:flex w-1/2 bg-gradient-brown flex-col items-center justify-between p-16 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-white/5" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-white/5" />

      {/* Logo */}
      <Link to="/" className="flex flex-row items-center gap-3 z-10">
        <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="font-cmas-play text-white text-lg">
          Canil Alto da Bela Vista
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col items-center gap-6 z-10 text-center">
        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
          <span className="text-6xl">🐾</span>
        </div>
        <h2 className="font-cmas-play text-white text-4xl leading-tight">
          {tela === "login" && (
            <>
              Bem-vindo <br /> de volta
            </>
          )}
          {tela === "cadastro" && (
            <>
              Crie sua <br /> conta
            </>
          )}
          {tela === "esqueci-senha" && (
            <>
              Recupere <br /> seu acesso
            </>
          )}
        </h2>
        <p className="text-white/60 font-medium text-base max-w-xs">
          Gerencie suas reservas, acompanhe seu filhote e muito mais.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-row items-center gap-6 z-10">
        <div className="flex flex-col items-center gap-1">
          <span className="font-cmas-play text-white text-2xl">47+</span>
          <span className="text-white/50 text-xs font-medium">Clientes</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-cmas-play text-white text-2xl">8</span>
          <span className="text-white/50 text-xs font-medium">Disponíveis</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-cmas-play text-white text-2xl">13+</span>
          <span className="text-white/50 text-xs font-medium">Anos</span>
        </div>
      </div>
    </div>
  );
}
