"use client";

import React from "react";
import { motion } from "framer-motion";

interface PortionToggleProps {
  portion: 1 | 2;
  onChange: (p: 1 | 2) => void;
}

export function PortionToggle({ portion, onChange }: PortionToggleProps) {
  return (
    <div className="bg-zinc-900/90 border border-burjo-border p-1 rounded-xl flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
          portion === 1 ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        {portion === 1 && (
          <motion.div
            layoutId="portion-pill"
            className="absolute inset-0 bg-burjo-surface border border-burjo-border rounded-lg shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">1 PORSI</span>
      </button>

      <button
        type="button"
        onClick={() => onChange(2)}
        className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
          portion === 2 ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        {portion === 2 && (
          <motion.div
            layoutId="portion-pill"
            className="absolute inset-0 bg-burjo-surface border border-burjo-border rounded-lg shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">2 PORSI</span>
      </button>
    </div>
  );
}
