import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FAQS } from "@/data/faqs";
import FaqAccordion from "@/components/faqs/FaqAccordion";
import { isNavItemEnabled } from "@/lib/settings";

export const metadata: Metadata = {
  title: "FAQs | CoderDojo Braga",
  description:
    "Perguntas mais frequentes sobre o CoderDojo Braga, funcionamento das sessões e voluntariado.",
};

export default function FaqsPage() {
  if (!isNavItemEnabled("faqs")) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-12">
      {/* Title & Intro */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
          FAQ&apos;s
        </h1>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary" />
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-700">
          Aqui podes esclarecer as perguntas mais frequentes sobre o CoderDojo
          Braga!
        </p>
      </div>

      {/* Accordion container */}
      <div className="mt-12">
        <FaqAccordion items={FAQS} />
      </div>
    </div>
  );
}
