import Image from "next/image";
import { Users } from "lucide-react";

export default function MentorSection() {
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Queres ser Mentor?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
              Os Mentores são o coração do CoderDojo Braga. Sem eles, não há
              sessões e não há ninjas a aprender a programar.
            </p>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
              Ao seres mentor, não só estás a ter um impacto positivo na vida
              dos ninjas, como estás a desenvolver as tuas <i>soft skills</i>,
              nomeadamente a forma como comunicas com os outros.
            </p>
            <div className="mt-6">
              <a
                href="https://forms.gle/iEjGdnxfGYbk9rFy6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-base font-semibold text-white shadow-md shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg"
              >
                Quero ser Mentor
              </a>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-1/2">
            <Image
              alt="Mentores do CoderDojo Braga"
              src="/img/mentor.jpg"
              width={600}
              height={400}
              className="rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <span className="text-5xl font-bold text-primary">&ldquo;</span>
          <p className="-mt-4 text-lg leading-relaxed text-gray-800 sm:text-xl font-medium">
            Enquanto alguém que tem uma enorme paixão por tecnologia, ser mentor
            permite-me ser o veículo de aprendizagem para jovens que partilham
            dessa paixão, algo que me realiza particularmente. Além disso,
            aprendi muito e continuo a aprender com aqueles que já cá estavam e
            me receberam de braços abertos.
          </p>
          <span className="text-5xl font-bold text-primary">&rdquo;</span>
          <p className="mt-2 text-sm sm:text-base font-semibold text-gray-600">
            — Filipe Felício, Engenharia Informática
          </p>
        </div>
      </div>
    </section>
  );
}
