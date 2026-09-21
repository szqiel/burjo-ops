"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Check } from "lucide-react";

interface SafetyToggleProps {
  isSafe: boolean;
  onChange: (safe: boolean) => void;
}

export function SafetyToggle({ isSafe, onChange }: SafetyToggleProps) {
  return (
    <div
      onClick={() => onChange(!isSafe)}
      className={`cursor-pointer w-full p-4 rounded-2xl border transition-all duration-200 select-none flex items-center justify-between ${
        isSafe
          ? "bg-burjo-green/10 border-burjo-green shadow-[0_0_16px_rgba(22,163,74,0.15)]"
          : "bg-red-950/20 border-red-800/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            isSafe ? "bg-burjo-green/20 text-burjo-green" : "bg-red-900/30 text-red-400"
          }`}
        >
          {isSafe ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
            KEAMANAN GAS LPG 3KG
          </span>
          <p className="text-sm font-bold text-white tracking-tight">
            {isSafe ? "Regulator Aman (Tidak Berdesis)" : "Periksa Regulator & Selang!"}
          </p>
        </div>
      </div>

      {/* Toggle Pill Indicator */}
      <div
        className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
          isSafe ? "bg-burjo-green justify-end" : "bg-zinc-800 justify-start"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-zinc-900"
        >
          {isSafe && <Check className="w-3.5 h-3.5 text-burjo-green stroke-[3]" />}
        </motion.div>
      </div>
    </div>
  );
}
