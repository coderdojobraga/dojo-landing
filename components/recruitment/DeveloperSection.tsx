import Image from "next/image";
import { GitPullRequest } from "lucide-react";

export default function DeveloperSection() {
  return (
    <section className="overflow-hidden bg-dark py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-dark shadow-lg">
              <GitPullRequest className="h-7 w-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Contribui para as plataformas Open Source do CoderDojo Braga
            </h2>
            <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-gray-200">
              O código-fonte destas plataformas é público, o que significa que
              qualquer pessoa pode ver e contribuir para as mesmas.
            </p>
            <p className="mt-3 text-base sm:text-lg font-normal leading-relaxed text-gray-200">
              Ao contribuires para as nossas plataformas, estás não só a ganhar
              experiência profissional, como também a melhorar a qualidade do
              trabalho que desenvolvemos.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://github.com/coderdojobraga/shuriken"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-base font-semibold text-white shadow-md shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg"
              >
                Shuriken
              </a>
              <a
                href="https://github.com/coderdojobraga/bokken"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-base font-semibold text-white shadow-md shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg"
              >
                Bokken
              </a>
              <a
                href="https://forms.gle/iEjGdnxfGYbk9rFy6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-gray-400 px-7 py-3 text-base font-semibold text-white transition-colors duration-200 hover:border-white hover:text-purple-300"
              >
                Quero contribuir
              </a>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-1/2">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80">
              <Image
                alt="Code Illustration"
                src="/img/code.svg"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <span className="text-5xl font-bold text-gray-400">&ldquo;</span>
          <p className="-mt-4 text-lg leading-relaxed text-gray-200 sm:text-xl font-medium">
            Ser voluntário no CoderDojo Braga é uma experiência muito
            gratificante, pois permite-me apoiar e melhorar uma organização
            cujas atividades têm um efeito positivo profundo e duradouro nos
            ninjas, mentores e voluntários que nelas participam.
          </p>
          <span className="text-5xl font-bold text-gray-400">&rdquo;</span>
          <p className="mt-2 text-sm sm:text-base font-semibold text-gray-400">
            — Miguel Brandão, Engenharia Informática
          </p>
        </div>
      </div>
    </section>
  );
}
