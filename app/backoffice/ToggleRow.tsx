"use client";

import { useState, useTransition } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { NavItemSetting } from "@/lib/settings";
import { toggleNavAction, updateCurriculumDestinationAction } from "./actions";

interface ToggleRowProps {
  item: NavItemSetting;
  curriculumDestination?: "internal" | "notion";
  notionUrl?: string;
}

export default function ToggleRow({
  item,
  curriculumDestination = "internal",
  notionUrl,
}: ToggleRowProps) {
  const [enabled, setEnabled] = useState(item.enabled);
  const [destination, setDestination] = useState<"internal" | "notion">(
    curriculumDestination
  );
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);

    startTransition(async () => {
      const res = await toggleNavAction(item.id, nextState);
      if (res?.error) {
        setEnabled(!nextState);
      }
    });
  };

  const handleDestinationChange = (newDest: "internal" | "notion") => {
    if (destination === newDest) return;
    const prev = destination;
    setDestination(newDest);

    startTransition(async () => {
      const res = await updateCurriculumDestinationAction(newDest);
      if (res?.error) {
        setDestination(prev);
      }
    });
  };

  return (
    <div className="py-4">
      {/* Top row: Label, Path, and Visibility Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-gray-900">{item.label}</span>
          {item.id === "curriculum" ? (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">
              {destination === "notion" ? "Notion (externo)" : "/curriculum"}
            </span>
          ) : (
            <span className="text-xs font-mono text-gray-400">{item.path}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isPending && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={isPending}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-wait ${
              enabled ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <span className="sr-only">Alternar visibilidade de {item.label}</span>
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Curriculum Destination Option */}
      {item.id === "curriculum" && (
        <div className="mt-3.5 rounded-xl border border-gray-100 bg-gray-50/80 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Destino do botão no menu:
            </span>
            {destination === "notion" && notionUrl && (
              <a
                href={notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <span>Abrir Notion</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleDestinationChange("internal")}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
                destination === "internal"
                  ? "bg-white text-primary shadow-xs ring-1 ring-gray-200 font-semibold"
                  : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
              }`}
            >
              <span>Página Interna (/curriculum)</span>
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => handleDestinationChange("notion")}
              className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
                destination === "notion"
                  ? "bg-white text-primary shadow-xs ring-1 ring-gray-200 font-semibold"
                  : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
              }`}
            >
              <span>Notion (Externo)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
