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
      className="cursor-pointer group relative w-full aspect-[9/16] max-h-[460px] bg-burjo-surface border border-burjo-border rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-xl transition-all duration-300 hover:border-burjo-blue/60"
    >
      {/* Background Stylized Graphic / Dark Gradient Simulation */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-zinc-900/60 z-0" />

      {/* Decorative Wok / Sawi Minimalist Ambient Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-burjo-blue/40 animate-pulse" />
      </div>

      {/* Top Bar: Category Pill & Duration Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 border border-burjo-border text-[10px] font-mono uppercase tracking-widest text-burjo-blue font-semibold">
          {sop.category}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
          <Clock className="w-3 h-3 text-zinc-400" />
          {sop.duration}
        </span>
      </div>

      {/* Centered Floating Play Button (Glass circle with #35C3F6) */}
      <div className="relative z-10 self-center my-auto">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-16 h-16 rounded-full bg-zinc-900/80 backdrop-blur-md border border-burjo-blue/40 flex items-center justify-center shadow-[0_0_24px_rgba(53,195,246,0.3)] group-hover:border-burjo-blue group-hover:shadow-[0_0_32px_rgba(53,195,246,0.5)] transition-all"
        >
          <Play className="w-6 h-6 text-burjo-blue fill-burjo-blue ml-1" />
        </motion.div>
      </div>

      {/* Bottom Info: Title & Key Takeaway */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-burjo-blue transition-colors">
          {sop.title}
        </h3>
        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {sop.keyTakeaway}
        </p>
        <div className="pt-2 flex items-center gap-1 text-[10px] font-mono text-burjo-blue">
          <span>KETUK UNTUK PUTAR VIDEO</span>
          <span className="animate-pulse">→</span>
        </div>
      </div>
    </motion.div>
  );
}
