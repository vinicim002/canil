import logoBrancaImg from "../../assets/logoBranca.png";

export function Footer() {
  return (
    <footer className="section-footer relative py-20 overflow-hidden bg-brown">
      <div className="footer-inner mx-36 flex flex-row items-start justify-between gap-12">
        <div className="footer-marca flex flex-col gap-4 w-1/3">
          <div className="footer-marca-header flex flex-row items-center gap-3">
            <div className="footer-logo w-12 h-12 rounded-full bg-orange shrink-0">
              <img src={logoBrancaImg} alt="" />
            </div>
            <span className="font-cmas-play text-white text-xl">
              Canil Alto da Bela Vista
            </span>
          </div>
          <p className="text-white/70 text-sm font-medium leading-relaxed">
            Canil especializado em Dachshunds desde 2011. Criamos com amor,
            responsabilidade e total transparência para famílias que merecem o
            melhor.
          </p>
        </div>

        <div className="footer-navegar flex flex-col gap-4">
          <h4 className="font-cmas-play text-orange text-xl">Navegar</h4>
          <ul className="flex flex-col gap-2">
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Sobre o canil
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Nossos cães
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Cuidados
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Entrega
            </li>
          </ul>
        </div>

        <div className="footer-informacoes flex flex-col gap-4">
          <h4 className="font-cmas-play text-orange text-xl">Informacoes</h4>
          <ul className="flex flex-col gap-2">
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Perguntas Frequentes
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Reservar filhote
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Política de garantia
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              Contrato de compra
            </li>
          </ul>
        </div>

        <div className="footer-contato flex flex-col gap-4">
          <h4 className="font-cmas-play text-orange text-xl">Contato</h4>
          <ul className="flex flex-col gap-2">
            <li className="text-white/70 text-sm font-medium">
              contato@canilaltabelavista.com.br
            </li>
            <li className="text-white/70 text-sm font-medium">
              (11) 99999-9999
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              @canilaltabelavista
            </li>
            <li className="text-white/70 text-sm font-medium cursor-pointer hover:text-white">
              @canilaltabelavista
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-rodape mx-36 mt-12 pt-6 border-t border-white/20">
        <p className="text-white/40 text-sm text-center font-medium">
          © 2026 Canil Alto da Bela Vista. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
