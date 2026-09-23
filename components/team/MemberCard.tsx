import Image from "next/image";
import { ITeamMember } from "@/types";

export default function MemberCard({ name, picture, role }: ITeamMember) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-4 h-44 w-44 overflow-hidden rounded-full shadow-md ring-4 ring-purple-50 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/30 sm:h-48 sm:w-48">
        <Image
          src={`/img/team/${picture}`}
          alt={name}
          fill
          sizes="(max-width: 640px) 176px, 192px"
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {role}
      </p>
    </div>
  );
}
