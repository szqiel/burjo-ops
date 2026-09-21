"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEvaluation } from "@/context/EvaluationContext";
import { SusBenchmarkCard } from "./SusBenchmarkCard";
import { X, Play, Timer, CheckCircle2, RotateCcw, Sparkles, BookOpen } from "lucide-react";

export function EvaluationDrawer() {
  const router = useRouter();
  const {
    isDrawerOpen,
    closeDrawer,
    activeTaskId,
    startTask,
    cancelTask,
    taskRecords,
  } = useEvaluation();

  if (!isDrawerOpen) return null;

  const handleLaunchTask = (taskId: 1 | 2 | 3) => {
    startTask(taskId);
    if (taskId === 1) {
      router.push("/resep");
    } else if (taskId === 2) {
      router.push("/sop");
    } else if (taskId === 3) {
      router.push("/checklist");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={closeDrawer} />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className="relative z-10 w-full max-w-[420px] max-h-[85vh] bg-burjo-canvas border-t border-burjo-border rounded-t-3xl overflow-y-auto p-5 shadow-2xl space-y-5"
        >
          {/* Drawer Handle & Header */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-1 bg-zinc-800 rounded-full mb-3" />
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-burjo-yellow animate-pulse" />
                <h2 className="text-base font-bold text-white tracking-tight">
                  Usability Testing Runner
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-8 h-8 rounded-full bg-zinc-900 border border-burjo-border flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-1 self-start">
              Instrumen pengujian empiris Bab V Makalah. Stopwatch otomatis mencatat hingga checkpoint tercapai.
            </p>
          </div>

          {/* Active Task Banner if running */}
          {activeTaskId && (
            <div className="bg-burjo-yellow/10 border border-burjo-yellow/40 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-burjo-yellow">
                <Timer className="w-4 h-4 animate-spin" />
                <span className="text-xs font-mono font-bold">
                  Task {activeTaskId} Sedang Berjalan...
                </span>
              </div>
              <button
                type="button"
                onClick={cancelTask}
                className="text-[10px] font-mono text-zinc-400 hover:text-white underline"
              >
                Batalkan
              </button>
            </div>
          )}

          {/* Task Scenario Runner Buttons */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block">
              PILIH SKENARIO TUGAS UJI
            </span>

            {/* Task 1 */}
            <div className="bg-zinc-900/70 border border-burjo-border rounded-2xl p-3.5 flex items-center justify-between">
              <div className="max-w-[65%]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-burjo-blue/10 text-burjo-blue border border-burjo-blue/30 font-semibold">
                    Task 1
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Target: 16.4s</span>
                </div>
                <h3 className="text-xs font-bold text-white">Takaran Mi Dok-dok 1 Porsi</h3>
                <p className="text-[10px] text-zinc-400">Checkpoint: Halaman resep terbuka</p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchTask(1)}
                className="px-3 py-2 rounded-xl bg-burjo-blue text-zinc-950 text-xs font-mono font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-zinc-950" />
                <span>Mulai</span>
              </button>
            </div>

            {/* Task 2 */}
            <div className="bg-zinc-900/70 border border-burjo-border rounded-2xl p-3.5 flex items-center justify-between">
              <div className="max-w-[65%]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-burjo-yellow/10 text-burjo-yellow border border-burjo-yellow/30 font-semibold">
                    Task 2
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Target: 12.2s</span>
                </div>
                <h3 className="text-xs font-bold text-white">Video Sanitasi Wajan</h3>
                <p className="text-[10px] text-zinc-400">Checkpoint: Modal video dimainkan</p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchTask(2)}
                className="px-3 py-2 rounded-xl bg-burjo-yellow text-zinc-950 text-xs font-mono font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-zinc-950" />
                <span>Mulai</span>
              </button>
            </div>

            {/* Task 3 */}
            <div className="bg-zinc-900/70 border border-burjo-border rounded-2xl p-3.5 flex items-center justify-between">
              <div className="max-w-[65%]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-burjo-green/10 text-burjo-green border border-burjo-green/30 font-semibold">
                    Task 3
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Target: 28.6s</span>
                </div>
                <h3 className="text-xs font-bold text-white">Serah Terima Shift & Stok</h3>
                <p className="text-[10px] text-zinc-400">Checkpoint: Tombol submit diklik</p>
              </div>

              <button
                type="button"
                onClick={() => handleLaunchTask(3)}
                className="px-3 py-2 rounded-xl bg-burjo-green text-white text-xs font-mono font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Mulai</span>
              </button>
            </div>
          </div>

          {/* Empirical SUS Scorecard Benchmark */}
          <SusBenchmarkCard />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
