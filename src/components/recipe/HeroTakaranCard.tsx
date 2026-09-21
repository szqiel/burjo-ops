"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroTakaranCardProps {
  name: string;
  amount: number;
  unit: string;
}

export function HeroTakaranCard({ name, amount, unit }: HeroTakaranCardProps) {
  return (
    <div className="w-full bg-burjo-surface border-y border-r border-burjo-border border-l-[4px] border-l-burjo-blue rounded-2xl p-5 shadow-lg relative overflow-hidden">
      {/* Top Label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-burjo-blue flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {name}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-burjo-border">
          TAKARAN BAKU
        </span>
      </div>

      {/* Large 50cm Glanceable Metric */}
      <div className="py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={amount}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-baseline gap-3"
          >
            <span className="text-6xl font-black tracking-tight text-white font-mono leading-none">
              {amount}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-300">
                {unit.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                SENDOK MAKAN
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 pt-2.5 border-t border-burjo-border/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>JARAK BACA JURU MASAK 50 CM</span>
        <span className="text-burjo-blue font-semibold">STANDAR SS</span>
      </div>
    </div>
  );
}
