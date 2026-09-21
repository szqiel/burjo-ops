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
    <div className="flex items-center gap-5 overflow-x-auto border-b border-burjo-border pb-3 no-scrollbar">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`border-b-2 pb-2 text-[10px] font-mono uppercase tracking-[0.13em] transition-colors duration-200 whitespace-nowrap ${
              isSelected
                ? "border-burjo-blue text-burjo-text"
                : "border-transparent text-burjo-quiet hover:text-burjo-muted"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
