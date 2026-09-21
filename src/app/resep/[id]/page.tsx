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
import { ArrowLeft, ChefHat, CheckCircle2 } from "lucide-react";

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
      <div className="flex flex-col space-y-4">
        {/* Top Navigation Row: Back Link & Portion Segmented Control */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href="/resep"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors py-1 focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>

          {/* Portion Segmented Control (1 Porsi vs 2 Porsi) */}
          <PortionToggle portion={portion} onChange={setPortion} />
        </div>

        {/* Recipe Title & Kicker */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-blue font-semibold">
              {recipe.category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Porsi: {portion} Orang
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
            {recipe.title}
          </h1>
          <p className="text-xs text-burjo-muted font-mono mt-0.5">
            Racikan Baku Dapur Burjo SS
          </p>
        </div>

        {/* Hero Takaran Card (Glanceable at 50 cm) */}
        <HeroTakaranCard
          name={primaryIngredient.name}
          amount={multipliedPrimaryAmount}
          unit={primaryIngredient.unit}
        />

        {/* 2x2 Sub-Parameters Grid */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
            KOMPONEN BUMBU & TEKNIK
          </span>
          <CookingParametersGrid
            ingredients={recipe.ingredients}
            portionMultiplier={portion}
            cookTime={recipe.cookTime}
            heatLevel={recipe.heatLevel}
          />
        </div>

        {/* SOP Plating & Presentation Card */}
        <div className="bg-zinc-900/50 border border-burjo-border rounded-xl p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-burjo-yellow font-semibold">
            <ChefHat className="w-3.5 h-3.5" />
            <span>SOP Penyajian & Plating</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            {recipe.platingNotes}
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
