import Image from "next/image";
import { MessageSquare } from "lucide-react";

export default function CommunicationSection() {
  return (
    <section className="overflow-hidden bg-primary py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-lg">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Queres ajudar com Design e Marketing?
            </h2>
            <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-purple-100">
              O design e marketing são essenciais para o CoderDojo Braga, pois permitem expandir a nossa atuação, dando-nos a conhecer a mais pessoas, sejam novos guardiões e ninjas, ou mentores e voluntários.
            </p>
            <p className="mt-3 text-base sm:text-lg font-normal leading-relaxed text-purple-100">
              Junta-te à nossa equipa, e contribui para tornar este projeto nalgo cada vez maior e melhor.
            </p>
            <div className="mt-6">
              <a
                href="https://forms.gle/iEjGdnxfGYbk9rFy6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 text-base font-semibold text-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-lg"
              >
                Quero ajudar com Design e Marketing
              </a>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-1/2">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              <Image
                alt="CoderDojo Braga Half Logo"
                src="/img/half_logo.svg"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <span className="text-5xl font-bold text-purple-200">&ldquo;</span>
          <p className="-mt-4 text-lg leading-relaxed text-white sm:text-xl font-medium">
            É realmente fantástico fazer parte de um projeto que tanto tem crescido nos últimos anos e poder ajudá-lo a chegar ainda mais longe. Integrar a equipa de Comunicação e Marketing do Dojo tem-me permitido ganhar experiência prática na minha área e aprender imenso com os restantes mentores e voluntários.
          </p>
          <span className="text-5xl font-bold text-purple-200">&rdquo;</span>
          <p className="mt-2 text-sm sm:text-base font-semibold text-purple-200">
            — Francisco Alves, Ciências da Comunicação
          </p>
        </div>
      </div>
    </section>
  );
}
