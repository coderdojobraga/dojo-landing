import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BELTS } from "@/data/curriculum";
import BeltCard from "@/components/curriculum/BeltCard";
import {
  getSiteSettings,
  isNavItemEnabled,
  NOTION_CURRICULUM_URL,
} from "@/lib/settings";

export const metadata: Metadata = {
  title: "Currículo | CoderDojo Braga",
  description:
    "Conhece o currículo e os cinturões de aprendizagem do CoderDojo Braga.",
};

export default function CurriculumPage() {
  const settings = getSiteSettings();

  if (!isNavItemEnabled("curriculum", settings)) {
    redirect("/");
  }

  if (settings.curriculumDestination === "notion") {
    redirect(settings.notionCurriculumUrl || NOTION_CURRICULUM_URL);
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-12">
      {/* Header text */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          Currículo do CoderDojo Braga!
        </h1>
        <p className="mt-3 text-lg sm:text-xl font-normal text-gray-600">
          Vamos aprender juntos?
        </p>
      </div>

      {/* Explanatory section */}
      <div className="mx-auto my-10 max-w-4xl rounded-2xl bg-purple-50/50 p-6 sm:p-8">
        <h2 className="flex items-center text-2xl sm:text-3xl font-bold text-gray-900">
          <span className="mr-3 text-primary font-bold">|</span>O que são os
          cinturões?
        </h2>
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
          Ao longo do seu percurso pelo CoderDojo Braga, os ninjas recebem
          cinturões. À semelhança das artes marciais, os cinturões representam o
          conhecimento e domínio da programação que os ninjas possuem. O caminho
          de cada ninja é único, mas deverá sempre passar pelos fundamentos da
          área.
        </p>
      </div>

      {/* Belt cards */}
      <div className="mx-auto max-w-4xl">
        {BELTS.map((belt) => (
          <BeltCard key={belt.colour} {...belt} />
        ))}
      </div>
    </div>
  );
}
