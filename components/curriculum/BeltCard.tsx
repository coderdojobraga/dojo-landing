import { IBelt } from "@/types";
import NinjaSVG from "./Ninja";

export default function BeltCard({ colour, description, requirements, hex }: IBelt) {
  return (
    <section id={colour} className="my-16 border-b border-gray-100 pb-16 last:border-b-0">
      <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="flex-1">
          <h2 className="flex items-center text-2xl sm:text-3xl font-bold text-gray-900">
            <span className="mr-3 text-primary font-bold">|</span>
            Cinturão {colour}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
            {description}
          </p>
          <div className="mt-5">
            <h3 className="text-lg font-bold text-gray-900">Requisitos:</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-6 text-base text-gray-700">
              {requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 justify-center">
          <div className="h-44 w-44 drop-shadow-md sm:h-52 sm:w-52">
            <NinjaSVG colour={hex} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
