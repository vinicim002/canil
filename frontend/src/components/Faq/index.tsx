import salsichaDeOculos from "../../assets/salsichaDeoculos.png";

export function Faq() {
  return (
    <section className="section-faq mx-36 pt-20 flex items-start justify-between gap-20">
      <div className="faq-esquerda flex flex-col gap-8 w-1/2">
        <div className="faq-header flex flex-col gap-3">
          <h3 className="text-3xl text-orange font-cmas-play">FAQ</h3>
          <h2 className="text-4xl text-brown font-cmas-play">
            Perguntas Frequentes
          </h2>
          <p className="text-base font-medium">
            Respondemos com transparência tudo o que você precisa saber antes de
            levar seu novo companheiro para casa.
          </p>
        </div>

        <div className="faq-imagem">
          <img
            src={salsichaDeOculos}
            className="w-full object-cover"
            alt="Dachshund de óculos"
          />
        </div>
      </div>

      <div className="faq-direita w-1/2 flex flex-col gap-4">
        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>

        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>

        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>

        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>

        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>

        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>

        <div className="faq-item flex flex-col gap-4">
          <div className="faq-item-header flex flex-row items-center justify-between gap-4">
            <p className="font-medium text-base">
              Com quantas semanas o filhote vai para casa?
            </p>
            <button className="faq-item-botao bg-brown w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
              <span className="text-4xl text-orange leading-none">+</span>
            </button>
          </div>
          <div className="faq-item-divisor border-2 border-orange"></div>
        </div>
      </div>
    </section>
  );
}
