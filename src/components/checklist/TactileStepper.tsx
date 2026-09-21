"use client";

import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface TactileStepperProps {
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

export function TactileStepper({
  label,
  value,
  unit,
  min = 0,
  max = 999,
  onChange,
}: TactileStepperProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="w-full bg-burjo-surface border border-burjo-border rounded-2xl p-3.5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-muted font-semibold">
          {label}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-burjo-border">
          SATUAN: {unit}
        </span>
      </div>

      <div className="flex items-center justify-between bg-zinc-900/60 border border-burjo-border/60 rounded-xl p-1.5">
        {/* Minus Button - Exactly 48x48px touch target */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-12 h-12 rounded-lg bg-zinc-800/90 border border-burjo-border flex items-center justify-center text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-700 transition-colors focus:outline-none"
          aria-label={`Kurangi ${label}`}
        >
          <Minus className="w-5 h-5" />
        </motion.button>

        {/* Counter Display Centered */}
        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-2xl font-black font-mono tracking-tight text-white leading-none">
            {value}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-blue mt-1 font-semibold">
            {unit}
          </span>
        </div>

        {/* Plus Button - Exactly 48x48px touch target */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-12 h-12 rounded-lg bg-zinc-800/90 border border-burjo-border flex items-center justify-center text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-700 transition-colors focus:outline-none"
          aria-label={`Tambah ${label}`}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
