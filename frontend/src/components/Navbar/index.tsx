import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoMarron from "../../assets/logoMarron.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Bloqueia o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Nossos cães", path: "/nossos-caes" },
    { name: "Filhotes", path: "/filhotes" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 lg:px-36 py-4 ${
        // Se o menu estiver aberto, a barra principal fica transparente para não "cortar" o fundo do slide-in
        isMobileMenuOpen
          ? "bg-transparent"
          : isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-6"
      }`}
    >
      <div className="navbar-inner flex items-center justify-between lg:grid lg:grid-cols-3">
        {/* COLUNA 1: Logo */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="navbar-marca flex flex-row items-center gap-3 group"
          >
            <div className="navbar-logo w-10 h-10 rounded-full bg-brown shrink-0 overflow-hidden transition-transform group-hover:scale-110">
              <img
                src={logoMarron}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-cmas-play text-lg transition-colors duration-300 hidden sm:block ${
                isMobileMenuOpen || isScrolled
                  ? "text-brown"
                  : "text-white md:text-brown"
              }`}
            >
              Canil Alto da Bela Vista
            </span>
          </Link>
        </div>

        {/* COLUNA 2: Links Desktop */}
        <div className="hidden lg:flex justify-center">
          <ul className="flex flex-row items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-xs md:text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:text-orange ${
                    isScrolled ? "text-body" : "text-white lg:text-body"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUNA 3: Login & Hamburguer */}
        <div className="flex justify-end items-center gap-4">
          <Link
            to="/login"
            className={`hidden lg:block text-sm font-bold uppercase tracking-[0.2em] transition-colors border-b-2 border-transparent hover:border-orange ${
              isScrolled
                ? "text-brown hover:text-orange"
                : "text-white lg:text-brown hover:text-orange"
            }`}
          >
            Login
          </Link>

          <button
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11 rounded-full z-[60] transition-all shadow-sm bg-[#fbf8f8] border border-brown/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`w-5 h-0.5 bg-brown transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-brown transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-brown transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-[51]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 w-[300px] bg-[#fbf8f8] shadow-2xl lg:hidden flex flex-col z-[52]"
            >
              <div className="flex flex-col p-8 pt-32 gap-6 h-full">
                <ul className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-brown text-xl font-medium block hover:text-orange transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-6 border-t border-brown/10">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-orange text-xl font-bold block"
                    >
                      LOGIN
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
