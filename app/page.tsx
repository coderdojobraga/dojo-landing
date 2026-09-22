import Hero from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Hero />

      <div className="w-full px-8 sm:px-14 lg:px-20 xl:px-24">
        <section className="relative mt-8 mb-16 sm:mt-12 sm:mb-20">
          <div className="max-w-3xl flex flex-col items-start">
            <h2 className="py-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              <span className="mr-2 text-purple-600 font-bold">|</span>
              O que é o CoderDojo Braga?
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
              O CoderDojo Braga integra-se num movimento global, voluntário, sem
              fins lucrativos e que visa ensinar crianças e jovens dos 7 aos 17
              anos a programar. O projeto pretende mostrar como a programação pode
              ser uma força de mudança positiva no mundo.
            </p>
          </div>
        </section>
      </div>

      <div className="landing-curves-container">
        <div className="landing-curve-top" />
        <div className="landing-rectangle" />
        <div className="landing-curve-bottom" />
      </div>

      <div className="w-full px-8 sm:px-14 lg:px-20 xl:px-24">
        <section className="relative flex justify-end text-white">
          <div className="my-10 flex max-w-3xl flex-col items-end">
            <h2 className="gap-1 py-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Como funciona o Dojo?
              <span className="ml-2 text-purple-400 font-bold">|</span>
            </h2>
            <p className="mt-3 text-right text-base sm:text-lg leading-relaxed text-gray-100 font-normal">
              As sessões decorrem uma vez por mês no Departamento de Informática
              da Universidade do Minho, em Braga. São propostos diversos desafios
              aos Ninjas, consoante o nível em que se encontram, e que os mesmos
              tentam completar com a ajuda dos Mentores.
            </p>
          </div>
        </section>
      </div>

      <div className="w-full px-8 sm:px-14 lg:px-20 xl:px-24">
        <section className="relative mb-20 mt-10 text-white md:mt-24">
          <hr className="mx-auto w-6/12 border-purple-500 py-3 text-center lg:w-3/12" />
          <div className="m-4 mx-auto mb-40 max-w-3xl text-center text-xl sm:text-2xl leading-relaxed font-normal">
            O CoderDojo Braga pretende dar a todas as crianças e jovens da
            região minhota a oportunidade de aprenderem a programar num ambiente
            amigável e divertido.
          </div>
        </section>
      </div>
    </div>
  );
}
