"use client";

import React from "react";
import { motion } from "framer-motion";

interface PortionToggleProps {
  portion: 1 | 2;
  onChange: (p: 1 | 2) => void;
}

export function PortionToggle({ portion, onChange }: PortionToggleProps) {
  return (
    <div className="flex items-center gap-1 border-b border-burjo-border">
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`relative px-2 py-2 text-[10px] font-mono font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
          portion === 1 ? "text-burjo-text" : "text-burjo-quiet hover:text-burjo-muted"
        }`}
      >
        {portion === 1 && (
          <motion.div
            layoutId="portion-pill"
            className="absolute inset-x-2 bottom-0 h-0.5 bg-burjo-blue"
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}
        <span className="relative z-10">1 PORSI</span>
      </button>

      <button
        type="button"
        onClick={() => onChange(2)}
        className={`relative px-2 py-2 text-[10px] font-mono font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
          portion === 2 ? "text-burjo-text" : "text-burjo-quiet hover:text-burjo-muted"
        }`}
      >
        {portion === 2 && (
          <motion.div
            layoutId="portion-pill"
            className="absolute inset-x-2 bottom-0 h-0.5 bg-burjo-blue"
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        )}
        <span className="relative z-10">2 PORSI</span>
      </button>
    </div>
  );
}
