"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { IFaqItem } from "@/types";

interface FaqAccordionProps {
  items: IFaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-4xl divide-y divide-gray-200">
      {items.map((item, index) => {
        const isOpen = openIndexes.has(index);

        return (
          <div key={item.question} className="py-6">
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="flex w-full items-start justify-between text-left transition-colors hover:text-primary focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold leading-7 text-gray-900 sm:text-xl">
                {item.question}
              </span>
              <span className="ml-6 flex h-7 items-center">
                {isOpen ? (
                  <Minus className="h-5 w-5 text-primary transition-transform duration-200" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                )}
              </span>
            </button>
            {isOpen && (
              <div className="mt-4 pr-8 animate-in fade-in duration-200">
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
