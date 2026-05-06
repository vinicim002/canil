import logoMarron from "../../assets/logoMarron.png";

export function Navbar() {
  return (
    <nav className="navbar glass-navbar fixed top-0 left-0 right-0 z-50 py-4 px-36">
      <div className="navbar-inner flex flex-row items-center justify-between">
        <div className="navbar-marca flex flex-row items-center gap-3">
          <div className="navbar-logo w-10 h-10 rounded-full bg-brown shrink-0">
            <img src={logoMarron} alt="" />
          </div>
          <span className="font-cmas-play text-brown text-lg">
            Canil Alto da Bela Vista
          </span>
        </div>

        <ul className="navbar-links flex flex-row items-center gap-10">
          <li className="text-body text-sm font-medium cursor-pointer hover:text-brown transition-colors">
            Sobre o canil
          </li>
          <li className="text-body text-sm font-medium cursor-pointer hover:text-brown transition-colors">
            Nossos cães
          </li>
          <li className="text-body text-sm font-medium cursor-pointer hover:text-brown transition-colors">
            Cuidados
          </li>
          <li className="text-body text-sm font-medium cursor-pointer hover:text-brown transition-colors">
            Entrega
          </li>
          <li className="text-body text-sm font-medium cursor-pointer hover:text-brown transition-colors">
            FAQ
          </li>
        </ul>

        <button className="navbar-cta bg-brown text-white font-medium py-2 px-6 rounded-full cursor-pointer hover:bg-orange transition-colors">
          (00) 00000-0000
        </button>
      </div>
    </nav>
  );
}
