"use client";

import React from "react";
import { Users, Flame, Truck, AlertCircle } from "lucide-react";

export function ShiftStatusCard() {
  return (
    <div className="w-full bg-burjo-surface border border-burjo-border rounded-2xl p-4 shadow-sm relative overflow-hidden">
      {/* Top indicator row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-muted">
          STATUS STASIUN AKTIF
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-burjo-green/10 border border-burjo-green/30 text-[10px] font-mono text-burjo-green">
          <span className="w-1.5 h-1.5 rounded-full bg-burjo-green animate-pulse" />
          DAPUR NORMAL
        </span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-zinc-900/60 border border-burjo-border/60 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
            <Users className="w-3.5 h-3.5 text-burjo-blue" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Kru Shift</span>
          </div>
          <p className="text-xl font-bold tracking-tight text-white">4 Kru</p>
          <span className="text-[9px] text-zinc-500 mt-0.5">2 Masak • 1 Cuci • 1 Kasir</span>
        </div>

        <div className="bg-zinc-900/60 border border-burjo-border/60 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-burjo-yellow" />
            <span className="text-[10px] font-mono uppercase tracking-wider">Jam Sibuk</span>
          </div>
          <p className="text-xl font-bold tracking-tight text-white">18-23 <span className="text-xs font-normal text-zinc-400">WIB</span></p>
          <span className="text-[9px] text-zinc-500 mt-0.5">Supplier tiba 06.00 WIB</span>
        </div>
      </div>
    </div>
  );
}
