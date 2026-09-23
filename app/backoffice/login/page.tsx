import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Backoffice | CoderDojo Braga",
  description: "Área reservada de administração do website do CoderDojo Braga.",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (verifySessionToken(sessionToken)) {
    redirect("/backoffice");
  }

  return (
    <div className="flex min-h-[70vh] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/img/logo-lettering-dark.svg"
              alt="CoderDojo Braga"
              width={208}
              height={65}
              priority
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Backoffice
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-xs sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
