"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvaluation } from "@/context/EvaluationContext";
import { CheckCircle2, Timer, Trophy, ArrowRight, X } from "lucide-react";

export function TaskCheckpointModal() {
  const { lastCompletedTask, clearLastCompleted, openDrawer } = useEvaluation();

  if (!lastCompletedTask) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-[340px] bg-burjo-canvas border border-burjo-green/60 rounded-3xl p-5 shadow-[0_0_40px_rgba(22,163,74,0.25)] flex flex-col space-y-4 relative"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={clearLastCompleted}
            className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Success Icon */}
          <div className="w-12 h-12 rounded-2xl bg-burjo-green/20 border border-burjo-green/40 flex items-center justify-center text-burjo-green">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-green font-bold">
              CHECKPOINT TERCAPAI
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Task {lastCompletedTask.taskId} Berhasil!
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {lastCompletedTask.name}
            </p>
          </div>

          {/* Durations Comparison */}
          <div className="bg-zinc-900/80 border border-burjo-border rounded-xl p-3 grid grid-cols-2 gap-2 text-center">
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Waktu Tercatat</span>
              <span className="text-xl font-black font-mono text-burjo-blue">
                {lastCompletedTask.elapsedSeconds || lastCompletedTask.targetSeconds}s
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Target Makalah</span>
              <span className="text-xl font-black font-mono text-white">
                {lastCompletedTask.targetSeconds}s
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                clearLastCompleted();
                openDrawer();
              }}
              className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-burjo-yellow" />
              <span>Lihat Skor SUS</span>
            </button>
            <button
              type="button"
              onClick={clearLastCompleted}
              className="flex-1 py-2.5 rounded-xl bg-burjo-green text-white text-xs font-mono font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
