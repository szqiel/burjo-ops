"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";
import { MicroSOP } from "@/types/sop";
import { useEvaluation } from "@/context/EvaluationContext";

interface VideoModalPlayerProps {
  sop: MicroSOP | null;
  onClose: () => void;
}

export function VideoModalPlayer({ sop, onClose }: VideoModalPlayerProps) {
  const { activeTaskId, completeTask } = useEvaluation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Checkpoint detection for Task 2: Memutar video sanitasi wajan
  useEffect(() => {
    if (sop && activeTaskId === 2 && sop.id === "sanitasi-wajan") {
      const timer = setTimeout(() => {
        completeTask(2);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [sop, activeTaskId, completeTask]);

  // Video progress simulation
  useEffect(() => {
    if (!sop || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0; // Auto-loop
        return prev + 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [sop, isPlaying]);

  if (!sop) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full max-w-[390px] max-h-[92vh] bg-burjo-canvas border border-burjo-border rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar with 44x44px Close Button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-burjo-border bg-burjo-surface/80">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-blue font-semibold">
                MICRO-SOP • {sop.category}
              </span>
              <h2 className="text-sm font-bold text-white tracking-tight line-clamp-1">
                {sop.title}
              </h2>
            </div>

            {/* Min 44x44 px touch target close button as required by PRD 4.2 */}
            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] rounded-full bg-zinc-900 border border-burjo-border flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors focus:outline-none"
              aria-label="Tutup Video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Demonstration Canvas / Visual Viewport */}
          <div className="relative w-full aspect-[9/12] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden p-6">
            {/* Animated Demo Visualization */}
            <div className="relative w-40 h-40 rounded-full border-4 border-dashed border-burjo-blue/30 flex items-center justify-center">
              {sop.id === "sanitasi-wajan" ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-burjo-surface border border-burjo-blue flex items-center justify-center shadow-[0_0_20px_rgba(53,195,246,0.2)]">
                    <span className="text-3xl animate-bounce">🍳</span>
                  </div>
                  <span className="text-[10px] font-mono text-burjo-blue mt-2 font-semibold">
                    {progress < 40 ? "1. Siram Saat Panas" : progress < 75 ? "2. Sabut Halus" : "3. Tiriskan Bersih"}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-burjo-surface border border-burjo-yellow flex items-center justify-center shadow-[0_0_20px_rgba(255,232,55,0.2)]">
                    <span className="text-3xl animate-pulse">🥬</span>
                  </div>
                  <span className="text-[10px] font-mono text-burjo-yellow mt-2 font-semibold">
                    {progress < 50 ? "1. Batang untuk Kuah" : "2. Daun Topping"}
                  </span>
                </div>
              )}

              {/* Progress Ring Indicator */}
              <div className="absolute -inset-1 rounded-full border border-burjo-blue/20 pointer-events-none" />
            </div>

            {/* Video Overlay Control Bar */}
            <div className="absolute bottom-3 inset-x-4 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-burjo-border">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-lg bg-burjo-surface flex items-center justify-center text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Progress Bar */}
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-burjo-blue transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-zinc-400">
                {sop.duration}
              </span>
            </div>
          </div>

          {/* Bottom Educational Takeaway & Checklist */}
          <div className="p-4 border-t border-burjo-border bg-burjo-surface/90 space-y-2.5">
            <div className="flex items-center gap-1.5 text-burjo-yellow text-[10px] font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Standar Baku Dapur</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              {sop.keyTakeaway}
            </p>

            {/* Practical Micro Steps */}
            {sop.steps && (
              <div className="space-y-1 pt-1">
                {sop.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-burjo-green shrink-0" />
                    <span className="line-clamp-1">{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
