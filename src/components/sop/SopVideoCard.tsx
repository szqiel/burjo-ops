"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Clock } from "lucide-react";
import { MicroSOP } from "@/types/sop";

interface SopVideoCardProps {
  sop: MicroSOP;
  onOpen: (sop: MicroSOP) => void;
}

export function SopVideoCard({ sop, onOpen }: SopVideoCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(sop)}
      className="cursor-pointer group relative w-full aspect-[4/5] bg-burjo-surface rounded-[24px] overflow-hidden flex flex-col justify-between p-5 transition-transform duration-200 active:scale-[0.98]"
    >
      {/* Background Stylized Graphic / Dark Gradient Simulation */}
      <div className="absolute inset-0 bg-[#292b28] z-0" />

      {/* Decorative Wok / Sawi Minimalist Ambient Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div className="w-48 h-48 rounded-full border-[18px] border-burjo-blue/50" />
      </div>

      {/* Top Bar: Category Pill & Duration Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-burjo-blue font-semibold">
          {sop.category}
        </span>
        <span className="text-[10px] font-mono text-burjo-muted flex items-center gap-1">
          <Clock className="w-3 h-3 text-zinc-400" />
          {sop.duration}
        </span>
      </div>

      {/* Centered Floating Play Button (Glass circle with #35C3F6) */}
      <div className="relative z-10 self-center my-auto">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 rounded-full bg-burjo-blue text-burjo-canvas flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        >
          <Play className="w-6 h-6 fill-current ml-1" />
        </motion.div>
      </div>

      {/* Bottom Info: Title & Key Takeaway */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-[clamp(1.8rem,8vw,2.4rem)] font-normal leading-[0.9] tracking-[-0.065em] text-burjo-text">
          {sop.title}
        </h3>
        <p className="mt-3 text-xs text-burjo-muted line-clamp-2 leading-[1.35]">
          {sop.keyTakeaway}
        </p>
        <div className="pt-5 flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-blue">
          <span>Putar</span><span>↗</span>
        </div>
      </div>
    </motion.div>
  );
}
