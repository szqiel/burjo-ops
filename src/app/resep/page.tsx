"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import recipesData from "@/data/recipes.json";
import { Recipe } from "@/types/recipe";

export default function RecipeCatalogPage() {
  const recipes = recipesData as Recipe[];

  return (
    <PageTransition>
      <section className="pt-7">
        <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-blue">Resep baku</p>
        <h1 className="mt-14 max-w-[8ch] text-balance text-[clamp(3.4rem,14vw,5.4rem)] font-normal leading-[0.86] tracking-[-0.085em] text-burjo-text">Masak dengan pasti.</h1>
        <p className="mt-7 max-w-[29ch] text-[15px] leading-[1.25] tracking-[-0.03em] text-burjo-muted">Pilih menu, atur porsi, lalu lihat takaran tanpa perlu menebak.</p>

        <div className="mt-24 border-t border-burjo-border">
          {recipes.map((recipe, index) => {
            const primary = recipe.ingredients.find((ingredient) => ingredient.primary);
            return (
              <motion.div key={recipe.id} initial={{ opacity: 0, transform: "translateY(12px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: 0.32, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                <Link href={`/resep/${recipe.id}`} className="group block border-b border-burjo-border py-7 active:scale-[0.98]">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet">{String(index + 1).padStart(2, "0")} · {recipe.category}</span>
                      <h2 className="mt-3 text-[clamp(2rem,9vw,2.8rem)] leading-[0.88] tracking-[-0.07em] text-burjo-text transition-colors duration-200 ease-editorial group-hover:text-burjo-blue">{recipe.title}</h2>
                      <p className="mt-3 max-w-[24ch] text-xs leading-[1.35] text-burjo-muted">{recipe.description}</p>
                    </div>
                    <div className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border ${index % 2 === 0 ? "border-burjo-blue text-burjo-blue" : "border-burjo-yellow text-burjo-yellow"}`}>
                      <span className="text-lg leading-none">↗</span>
                    </div>
                  </div>
                  {primary && <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-quiet"><span className="text-burjo-text">{primary.amount} {primary.unit}</span> {primary.name}</p>}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
