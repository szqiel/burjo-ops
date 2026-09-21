"use client";

import React from "react";
import { Flame, Clock, Droplets } from "lucide-react";
import { Ingredient } from "@/types/recipe";

interface CookingParametersGridProps {
  ingredients: Ingredient[];
  portionMultiplier: number;
  cookTime: string;
  heatLevel: string;
}

export function CookingParametersGrid({
  ingredients,
  portionMultiplier,
  cookTime,
  heatLevel,
}: CookingParametersGridProps) {
  const secondaryIngredients = ingredients.filter((item) => !item.primary);

  return (
    <div className="border-t border-burjo-border">
      {/* Secondary Ingredients (e.g. Kecap, Cabai) */}
      {secondaryIngredients.map((item) => {
        const multipliedAmount = item.amount * portionMultiplier;
        return (
          <div
            key={item.name}
            className="grid grid-cols-[1fr_auto] items-end gap-4 border-b border-burjo-border py-5"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted font-semibold flex items-center gap-1">
              {item.name}
            </span>
            <div className="text-right">
              <p className="text-lg tracking-[-0.04em] text-burjo-text">
                {multipliedAmount} {item.unit}
              </p>
              <span className="text-[9px] font-mono text-burjo-quiet">
                {item.name.toLowerCase().includes("kecap") ? "±15ml per putaran" : "Ulek kasar"}
              </span>
            </div>
          </div>
        );
      })}

      {/* Heat Level Parameter */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-burjo-border py-5">
        <span className="text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted font-semibold flex items-center gap-1">
          Tingkat Api
        </span>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.1em] text-burjo-yellow">
            {heatLevel}
          </span>
        </div>
      </div>

      {/* Cook Time Parameter */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-5">
        <span className="text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted font-semibold flex items-center gap-1">
          Target Waktu
        </span>
        <div className="text-right">
          <p className="text-lg tracking-[-0.04em] text-burjo-text">
            {cookTime}
          </p>
          <span className="text-[9px] font-mono text-burjo-quiet">
            Wajan panas stabil
          </span>
        </div>
      </div>
    </div>
  );
}
