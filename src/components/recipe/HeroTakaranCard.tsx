"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroTakaranCardProps {
  name: string;
  amount: number;
  unit: string;
}

export function HeroTakaranCard({ name, amount, unit }: HeroTakaranCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-burjo-surface px-6 py-7">
      <span className="absolute right-[-18px] top-[-18px] h-20 w-20 rounded-full bg-burjo-blue" aria-hidden="true" />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-muted">Takaran utama</span>
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-yellow">Baku</span>
      </div>

      {/* Large 50cm Glanceable Metric */}
      <div className="relative py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={amount}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-end gap-3"
          >
            <span className="text-[clamp(5rem,26vw,8rem)] font-normal tracking-[-0.1em] text-burjo-text leading-none">
              {amount}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-mono font-bold tracking-[0.1em] uppercase text-burjo-text">
                {unit.toUpperCase()}
              </span>
              <span className="mt-1 text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted">
                {name}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-between border-t border-burjo-border pt-3 text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted">
        <span>Terlihat dari 50 cm</span>
        <span className="text-burjo-text">SS</span>
      </div>
    </div>
  );
}
