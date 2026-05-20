import { motion } from "framer-motion";
import { Clock, LogOut, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function ClientePendingPage() {
  const { usuario, logout } = useAuth();
  const rejeitado = usuario?.status === "REJEITADO";

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-[2.5rem] p-10 md:p-12 shadow-xl shadow-brown/10 border border-brown/10 flex flex-col items-center text-center gap-8"
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-3xl bg-brown/10 flex items-center justify-center"
        >
          <Clock className="text-orange" size={40} />
        </motion.div>

        <div className="flex flex-col gap-3">
          <h1 className="font-cmas-play text-brown text-3xl md:text-4xl">
            {rejeitado ? "Cadastro não aprovado" : "Conta em análise"}
          </h1>
          <div className="h-1 w-16 bg-orange rounded-full mx-auto" />
          <p className="text-body/70 font-medium leading-relaxed">
            Olá, <span className="text-brown font-bold">{usuario?.nome}</span>!
            {rejeitado
              ? " Infelizmente seu cadastro não foi aprovado. Entre em contato conosco para mais informações."
              : " Seu cadastro está aguardando aprovação da nossa equipe."}
          </p>
        </div>

        {!rejeitado && (
        <div className="w-full bg-cream/60 rounded-2xl p-6 flex flex-col gap-3 text-left">
          <p className="text-body/60 text-sm font-medium">
            Assim que sua conta for liberada, você receberá um e-mail em:
          </p>
          <div className="flex items-center gap-3 text-brown font-bold text-sm">
            <Mail size={18} className="text-orange shrink-0" />
            {usuario?.email}
          </div>
        </div>
        )}

        {!rejeitado && (
        <p className="text-body/50 text-xs font-medium leading-relaxed">
          O processo costuma levar até 24 horas úteis. Enquanto isso, explore
          nosso site e conheça nossos filhotes disponíveis.
        </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to="/"
            className="flex-1 bg-brown text-white font-bold py-3.5 px-6 rounded-full hover:bg-orange transition-colors text-sm uppercase tracking-widest text-center"
          >
            Voltar ao site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex-1 flex items-center justify-center gap-2 border border-brown/20 text-body font-bold py-3.5 px-6 rounded-full hover:bg-brown/5 transition-colors text-sm cursor-pointer"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </motion.div>
    </main>
  );
}
