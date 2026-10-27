import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-8 h-36 w-36">
        <Image
          src="/img/logo.svg"
          alt="CoderDojo Braga"
          width={144}
          height={144}
          className="h-full w-full object-contain"
        />
      </div>

      <span className="text-lg">Erro 404</span>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Ups! Esta página não existe.
      </h1>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
}
