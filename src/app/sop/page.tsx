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
      <div className="flex flex-col">
        {/* Header */}
        <div className="pt-7">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-yellow font-semibold">Micro-SOP</span>
          <h1 className="mt-14 max-w-[8ch] text-[clamp(3.4rem,14vw,5.4rem)] font-normal leading-[0.86] tracking-[-0.085em] text-burjo-text">Lihat. Ikuti. Ulangi.</h1>
          <p className="mt-7 max-w-[28ch] text-[15px] leading-[1.25] tracking-[-0.03em] text-burjo-muted">Teknik dapur yang cukup ditonton sekali untuk langsung dikerjakan.</p>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="mt-16"><CategoryPills
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        /></div>

        {/* Video Cards Vertical Feed */}
        <div className="mt-12 flex flex-col gap-12">
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
