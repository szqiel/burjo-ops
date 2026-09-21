"use client";

import React from "react";
import { SopCategory } from "@/types/sop";

interface CategoryPillsProps {
  categories: SopCategory[];
  selectedCategory: SopCategory;
  onSelect: (cat: SopCategory) => void;
}

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap focus:outline-none ${
              isSelected
                ? "bg-burjo-blue text-zinc-950 font-bold shadow-sm"
                : "bg-burjo-surface border border-burjo-border text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
