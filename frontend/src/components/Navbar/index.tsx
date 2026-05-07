import { Link } from "react-router-dom";
import logoMarron from "../../assets/logoMarron.png";

export function Navbar() {
  return (
    <nav className="navbar glass-navbar fixed top-0 left-0 right-0 z-50 py-4 px-36">
      <div className="navbar-inner flex flex-row items-center justify-between">
        <Link to="/" className="navbar-marca flex flex-row items-center gap-3">
          <div className="navbar-logo w-10 h-10 rounded-full bg-brown shrink-0">
            <img src={logoMarron} alt="Logo Canil Alto da Bela Vista" />
          </div>
          <span className="font-cmas-play text-brown text-lg">
            Canil Alto da Bela Vista
          </span>
        </Link>

        <ul className="navbar-links flex flex-row items-center gap-10">
          <li>
            <Link
              to="/"
              className="text-body text-sm font-medium hover:text-brown transition-colors"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/sobre"
              className="text-body text-sm font-medium hover:text-brown transition-colors"
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              to="/nossos-caes"
              className="text-body text-sm font-medium hover:text-brown transition-colors"
            >
              Nossos cães
            </Link>
          </li>
          <li>
            <Link
              to="/filhotes"
              className="text-body text-sm font-medium hover:text-brown transition-colors"
            >
              Filhotes
            </Link>
          </li>
          <li>
            <Link
              to="/contato"
              className="text-body text-sm font-medium hover:text-brown transition-colors"
            >
              Contato
            </Link>
          </li>
        </ul>

        <button className="navbar-cta bg-brown text-white font-medium py-2 px-6 rounded-full cursor-pointer hover:bg-orange transition-colors">
          (00) 00000-0000
        </button>
      </div>
    </nav>
  );
}
