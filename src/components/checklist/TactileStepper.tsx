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
    <div className="w-full border-b border-burjo-border py-5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-burjo-muted font-semibold">
          {label}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-quiet">
          {unit}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {/* Minus Button - Exactly 48x48px touch target */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-12 h-12 rounded-full border border-burjo-border flex items-center justify-center text-burjo-text disabled:opacity-30 disabled:pointer-events-none hover:border-burjo-muted transition-colors"
          aria-label={`Kurangi ${label}`}
        >
          <Minus className="w-5 h-5" />
        </motion.button>

        {/* Counter Display Centered */}
        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-4xl font-normal tracking-[-0.08em] text-burjo-text leading-none">
            {value}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-burjo-blue mt-2 font-semibold">
            {unit}
          </span>
        </div>

        {/* Plus Button - Exactly 48x48px touch target */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-12 h-12 rounded-full border border-burjo-border flex items-center justify-center text-burjo-text disabled:opacity-30 disabled:pointer-events-none hover:border-burjo-muted transition-colors"
          aria-label={`Tambah ${label}`}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
