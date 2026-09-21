"use client";

import React from "react";
import { Award, CheckCircle2, TrendingUp, BookOpen } from "lucide-react";

export function SusBenchmarkCard() {
  return (
    <div className="w-full bg-zinc-900/90 border border-burjo-border rounded-2xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-yellow font-semibold flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          BENCHMARK EMPIRIS MAKALAH (BAB V)
        </span>
        <span className="px-2 py-0.5 rounded bg-burjo-green/10 border border-burjo-green/30 text-[10px] font-mono text-burjo-green font-bold">
          GRADE A
        </span>
      </div>

      {/* Primary Score Row */}
      <div className="flex items-baseline justify-between py-1 border-y border-burjo-border/60">
        <div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Rata-rata Skor SUS</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black font-mono text-white tracking-tight">81.5</span>
            <span className="text-xs font-mono text-burjo-green font-semibold">/ 100</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Predikat Adjektif</span>
          <span className="text-base font-bold text-burjo-blue">Excellent</span>
          <span className="text-[9px] font-mono text-zinc-500 block">Kategori Acceptable</span>
        </div>
      </div>

      {/* Metric Breakdown Table */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-burjo-border/40">
          <span className="text-[9px] text-zinc-500 uppercase block">Task Success Rate (TSR)</span>
          <span className="text-base font-bold text-burjo-green flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% (15/15)
          </span>
        </div>
        <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-burjo-border/40">
          <span className="text-[9px] text-zinc-500 uppercase block">Total Time on Task</span>
          <span className="text-base font-bold text-white mt-0.5 block">
            57.2 <span className="text-[10px] text-zinc-400">detik</span>
          </span>
        </div>
      </div>

      {/* Target Per Task Reference */}
      <div className="space-y-1 pt-1 text-[10px] font-mono text-zinc-400">
        <div className="flex justify-between">
          <span>Task 1: Mi Dok-dok 1 Porsi</span>
          <span className="text-white font-semibold">16.4s</span>
        </div>
        <div className="flex justify-between">
          <span>Task 2: Video Sanitasi Wajan</span>
          <span className="text-white font-semibold">12.2s</span>
        </div>
        <div className="flex justify-between">
          <span>Task 3: Serah Terima Shift</span>
          <span className="text-white font-semibold">28.6s</span>
        </div>
      </div>

      <p className="text-[9px] text-zinc-500 italic pt-1 border-t border-burjo-border/40">
        *Data empiris pengujian 5 responden (R1–R2 kru riil, R3–R5 proxy mahasiswa) pada meja kasir Burjo SS.
      </p>
    </div>
  );
}
