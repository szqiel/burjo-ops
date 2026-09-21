"use client";

import React from "react";
import { Flame, Clock, Droplets, FlameKindling } from "lucide-react";
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
    <div className="grid grid-cols-2 gap-3 my-2">
      {/* Secondary Ingredients (e.g. Kecap, Cabai) */}
      {secondaryIngredients.map((item) => {
        const multipliedAmount = item.amount * portionMultiplier;
        return (
          <div
            key={item.name}
            className="bg-zinc-900/70 border border-burjo-border rounded-xl p-3.5 flex flex-col justify-between"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-burjo-muted font-semibold flex items-center gap-1">
              <Droplets className="w-3 h-3 text-burjo-blue" />
              {item.name}
            </span>
            <div className="mt-1.5">
              <p className="text-sm font-bold text-white tracking-tight">
                {multipliedAmount} {item.unit}
              </p>
              <span className="text-[9px] font-mono text-zinc-500">
                {item.name.toLowerCase().includes("kecap") ? "±15ml per putaran" : "Ulek kasar"}
              </span>
            </div>
          </div>
        );
      })}

      {/* Heat Level Parameter */}
      <div className="bg-zinc-900/70 border border-burjo-border rounded-xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-burjo-muted font-semibold flex items-center gap-1">
          <Flame className="w-3 h-3 text-burjo-yellow" />
          Tingkat Api
        </span>
        <div className="mt-1.5">
          <span className="inline-block px-2 py-0.5 rounded bg-burjo-yellow/10 border border-burjo-yellow/30 text-burjo-yellow text-xs font-mono font-bold uppercase">
            {heatLevel}
          </span>
        </div>
      </div>

      {/* Cook Time Parameter */}
      <div className="bg-zinc-900/70 border border-burjo-border rounded-xl p-3.5 flex flex-col justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-burjo-muted font-semibold flex items-center gap-1">
          <Clock className="w-3 h-3 text-zinc-400" />
          Target Waktu
        </span>
        <div className="mt-1.5">
          <p className="text-sm font-bold text-white tracking-tight font-mono">
            {cookTime}
          </p>
          <span className="text-[9px] font-mono text-zinc-500">
            Wajan panas stabil
          </span>
        </div>
      </div>
    </div>
  );
}
