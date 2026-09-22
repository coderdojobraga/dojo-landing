import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mt-24 pt-6 pb-8 sm:pt-10 sm:pb-12">
      <div className="w-full px-8 sm:px-14 lg:px-20 xl:px-24">
        <div className="max-w-full flex flex-col items-start">
          <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] xl:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight lg:whitespace-nowrap">
            Bem-vindo à página do CoderDojo Braga!
          </h1>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="https://forms.gle/wLfmRqPDcoHr5XXs9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 sm:h-13 items-center justify-center rounded-xl bg-primary px-7 sm:px-8 text-base sm:text-lg font-semibold text-white shadow-md shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/35 active:translate-y-0 active:scale-[0.98]"
            >
              Quero ser Ninja
            </a>
            <Link
              href="/recruitment"
              className="inline-flex h-12 sm:h-13 items-center justify-center rounded-xl bg-dark px-7 sm:px-8 text-base sm:text-lg font-semibold text-white shadow-md shadow-gray-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/30 active:translate-y-0 active:scale-[0.98]"
            >
              Quero ser Voluntário
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
