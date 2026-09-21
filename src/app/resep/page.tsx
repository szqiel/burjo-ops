"use client";

import React from "react";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";
import { ChevronRight, Flame, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function RecipeCatalogPage() {
  const recipes = recipesData as Recipe[];

  return (
    <PageTransition>
      <div className="flex flex-col space-y-5">
        {/* Header */}
        <div className="pt-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-blue font-semibold">
            STANDARISASI MENU
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-0.5">
            Katalog Resep Baku
          </h1>
          <p className="text-xs text-burjo-muted mt-1 leading-relaxed">
            Daftar resep racik dapur Burjo SS untuk menjaga konsistensi rasa antar juru masak.
          </p>
        </div>

        {/* Recipe Cards List */}
        <div className="flex flex-col space-y-3">
          {recipes.map((recipe) => {
            const primaryIngredient = recipe.ingredients.find((i) => i.primary);

            return (
              <Link
                key={recipe.id}
                href={`/resep/${recipe.id}`}
                className="group focus:outline-none"
              >
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-burjo-surface border border-burjo-border group-hover:border-burjo-blue/50 rounded-2xl p-4 transition-all duration-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-burjo-border">
                      {recipe.category}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1 text-burjo-yellow">
                        <Flame className="w-3 h-3" />
                        {recipe.heatLevel}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {recipe.cookTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-burjo-blue transition-colors">
                        {recipe.title}
                      </h2>
                      <p className="text-xs text-burjo-muted line-clamp-1 mt-0.5">
                        {recipe.description}
                      </p>
                    </div>

                    {primaryIngredient && (
                      <div className="text-right pl-3">
                        <span className="text-xl font-black font-mono text-white leading-none">
                          {primaryIngredient.amount}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-burjo-blue block font-semibold">
                          {primaryIngredient.unit} BUMBU
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
