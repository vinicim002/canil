import pataImg from "../../assets/pata.png";

export function ProximoPasso() {
  return (
    <section className="section-proximo-passo relative bg-gradient-brown py-20 overflow-hidden">
      <div className="proximo-passo-decoracao-pata-topo absolute right-[5%] -top-[5%] w-[400px] h-[400px] z-0 opacity-80 rotate-[320deg]">
        <img src={pataImg} className="w-full h-full object-contain" alt="" />
      </div>

      <div className="proximo-passo-decoracao-pata-base absolute right-[-8%] -bottom-[20%] w-[400px] h-[400px] z-0 opacity-80 rotate-[320deg]">
        <img src={pataImg} className="w-full h-full object-contain" alt="" />
      </div>

      <div className="proximo-passo-inner mx-36 flex flex-col items-center justify-center gap-4">
        <div className="proximo-passo-header flex flex-col justify-center items-center gap-4">
          <h3 className="font-cmas-play text-orange text-3xl">
            PRONTO PARA DAR O PROXIMO PASSO?
          </h3>
          <h2 className="font-cmas-play text-white text-4xl text-center">
            Seu novo <br /> melhor amigo <br /> esta{" "}
            <span className="text-orange">esperando por você</span>
          </h2>
          <p className="proximo-passo-descricao text-white w-1/2 text-center font-medium">
            Entre em contato agora e descubra o filhote perfeito para sua
            família. Respondemos rapidamente pelo WhatsApp.
          </p>
        </div>

        <div className="proximo-passo-acoes flex flex-row items-center gap-8 mt-10">
          <button className="proximo-passo-btn-whatsapp bg-green-500 text-white font-medium py-3 px-6 rounded-full cursor-pointer">
            Chamar no WhatsApp
          </button>
          <button className="proximo-passo-btn-filhotes bg-white text-brown font-medium py-3 px-6 rounded-full cursor-pointer">
            Ver filhotes disponíveis
          </button>
        </div>
      </div>
    </section>
  );
}
