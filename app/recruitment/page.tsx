import type { Metadata } from "next";
import { redirect } from "next/navigation";
import MentorSection from "@/components/recruitment/MentorSection";
import CommunicationSection from "@/components/recruitment/CommunicationSection";
import DeveloperSection from "@/components/recruitment/DeveloperSection";
import { isRouteEnabled } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Recrutamento | CoderDojo Braga",
  description:
    "Junta-te à equipa do CoderDojo Braga como mentor, comunicação & marketing ou developer.",
};

export default function RecruitmentPage() {
  if (!isRouteEnabled("/recruitment")) {
    redirect("/");
  }

  return (
    <div>
      {/* Intro header */}
      <div className="container mx-auto px-4 py-12 text-center sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          Junta-te ao CoderDojo Braga!
        </h1>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
        <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-gray-700">
          Contribui para o nosso projeto e faz parte de uma equipa incrivelmente
          dedicada e apaixonada, na qual certamente vais aprender bastante e
          fazer novas amizades. Quer queiras ser mentor e ensinar uma criança a
          programar, quer queiras ser tu a programar e contribuir para as nossas
          plataformas, ou quer queiras ajudar no nosso design e marketing,
          acolher-te-emos de braços abertos.
        </p>
      </div>

      <MentorSection />
      <CommunicationSection />
      <DeveloperSection />
    </div>
  );
}
