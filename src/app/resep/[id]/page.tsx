"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { PortionToggle } from "@/components/recipe/PortionToggle";
import { HeroTakaranCard } from "@/components/recipe/HeroTakaranCard";
import { CookingParametersGrid } from "@/components/recipe/CookingParametersGrid";
import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import { useEvaluation } from "@/context/EvaluationContext";
import { ArrowLeft } from "lucide-react";

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { activeTaskId, completeTask } = useEvaluation();

  const [portion, setPortion] = useState<1 | 2>(1);

  const recipe = (recipesData as Recipe[]).find((r) => r.id === id);

  // Checkpoint detection for Task 1: Mencari takaran Mi Dok-dok 1 porsi
  useEffect(() => {
    if (activeTaskId === 1 && id === "mi-dok-dok") {
      const timer = setTimeout(() => {
        completeTask(1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeTaskId, id, completeTask]);

  if (!recipe) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-zinc-400">Resep tidak ditemukan.</p>
        <Link href="/resep" className="text-xs text-burjo-blue mt-2 inline-block">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const primaryIngredient = recipe.ingredients.find((i) => i.primary) || recipe.ingredients[0];
  const multipliedPrimaryAmount = primaryIngredient.amount * portion;

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Top Navigation Row: Back Link & Portion Segmented Control */}
        <div className="flex items-center justify-between pt-7">
          <Link
            href="/resep"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted hover:text-burjo-text transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>

          {/* Portion Segmented Control (1 Porsi vs 2 Porsi) */}
          <PortionToggle portion={portion} onChange={setPortion} />
        </div>

        {/* Recipe Title & Kicker */}
        <div className="mt-20">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-blue font-semibold">
              {recipe.category}
            </span>
            <span className="text-burjo-quiet">•</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet">
              Porsi: {portion} Orang
            </span>
          </div>
          <h1 className="mt-4 text-[clamp(3rem,13vw,4.8rem)] font-normal leading-[0.86] tracking-[-0.085em] text-burjo-text">
            {recipe.title}
          </h1>
          <p className="mt-5 text-[15px] leading-[1.25] tracking-[-0.03em] text-burjo-muted">
            {recipe.description}
          </p>
        </div>

        {/* Hero Takaran Card (Glanceable at 50 cm) */}
        <div className="mt-16"><HeroTakaranCard
          name={primaryIngredient.name}
          amount={multipliedPrimaryAmount}
          unit={primaryIngredient.unit}
        /></div>

        {/* 2x2 Sub-Parameters Grid */}
        <div className="mt-20">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet block mb-5">
            Komponen & teknik
          </span>
          <CookingParametersGrid
            ingredients={recipe.ingredients}
            portionMultiplier={portion}
            cookTime={recipe.cookTime}
            heatLevel={recipe.heatLevel}
          />
        </div>

        {/* SOP Plating & Presentation Card */}
        <div className="mt-16 border-t border-burjo-border py-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-yellow font-semibold">
            Penyajian
          </div>
          <p className="mt-3 text-[15px] leading-[1.35] tracking-[-0.02em] text-burjo-muted">
            {recipe.platingNotes}
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
