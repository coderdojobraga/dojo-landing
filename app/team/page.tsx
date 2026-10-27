import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TEAM_MEMBERS } from "@/data/team";
import MemberCard from "@/components/team/MemberCard";
import { isNavItemEnabled } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Equipa | CoderDojo Braga",
  description:
    "Conhece a equipa de voluntários e mentores do CoderDojo Braga, dedicados a ensinar programação aos mais jovens.",
};

export default function TeamPage() {
  if (!isNavItemEnabled("team")) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-12">
      {/* Title & Intro */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          Equipa
        </h1>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
        <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-gray-700">
          A equipa do CoderDojo Braga é composta por alunos voluntários de
          vários cursos dedicados e apaixonados pelo projeto e por tecnologia.
          Cada um traz o seu contributo único para criar uma experiência
          incrível para os Ninjas e todos os envolvidos com o projeto. Mais do
          que uma equipa, todos aqueles que se decidem envolver connosco
          encontram uma família.
        </p>
      </div>

      {/* Team grid */}
      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {TEAM_MEMBERS.map((member) => (
          <MemberCard key={`${member.name}-${member.role}`} {...member} />
        ))}
      </div>
    </div>
  );
}
