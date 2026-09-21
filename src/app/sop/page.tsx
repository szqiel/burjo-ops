"use client";

import React, { useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { CategoryPills } from "@/components/sop/CategoryPills";
import { SopVideoCard } from "@/components/sop/SopVideoCard";
import { VideoModalPlayer } from "@/components/sop/VideoModalPlayer";
import sopsData from "@/data/sops.json";
import { MicroSOP, SopCategory } from "@/types/sop";
import { PlaySquare } from "lucide-react";

const CATEGORIES: SopCategory[] = ["Semua", "Sanitasi", "Zero-Waste"];

export default function MicroSopPage() {
  const [selectedCategory, setSelectedCategory] = useState<SopCategory>("Semua");
  const [activeSop, setActiveSop] = useState<MicroSOP | null>(null);

  const sops = sopsData as MicroSOP[];

  const filteredSops =
    selectedCategory === "Semua"
      ? sops
      : sops.filter((item) => item.category === selectedCategory);

  return (
    <PageTransition>
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-yellow font-semibold">
              ONBOARDING KRU BARU
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Micro-SOP Dapur
          </h1>
          <p className="text-xs text-burjo-muted mt-1 leading-relaxed">
            Edukasi praktis 30-60 detik untuk teknik sanitasi dan efisiensi bahan baku zero-waste.
          </p>
        </div>

        {/* Category Horizontal Filter Pills */}
        <CategoryPills
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Video Cards Vertical Feed */}
        <div className="flex flex-col space-y-4 pt-1">
          {filteredSops.map((sop) => (
            <SopVideoCard key={sop.id} sop={sop} onOpen={setActiveSop} />
          ))}
        </div>

        {/* Interactive Expanding Modal Video Player */}
        <VideoModalPlayer sop={activeSop} onClose={() => setActiveSop(null)} />
      </div>
    </PageTransition>
  );
}
