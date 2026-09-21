"use client";

import React, { useState, useEffect, useRef } from "react";
import { useEvaluation } from "@/context/EvaluationContext";
import { Timer, X, Menu } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export function TopBar() {
  const { openDrawer, activeTaskId, currentDuration } = useEvaluation();
  const [timeString, setTimeString] = useState<string>("");
  const [shiftName, setShiftName] = useState<string>("SHIFT MALAM");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);

  useEffect(() => {
    const updateTimeAndShift = () => {
      const now = new Date();
      // Format WIB
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`${String(hours).padStart(2, "0")}:${minutes} WIB`);

      if (hours >= 6 && hours < 14) {
        setShiftName("SHIFT PAGI (06-14)");
      } else if (hours >= 14 && hours < 18) {
        setShiftName("SHIFT SIANG (14-18)");
      } else {
        setShiftName("SHIFT MALAM (18-06)");
      }
    };

    updateTimeAndShift();
    const interval = setInterval(updateTimeAndShift, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoTap = () => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < 1200) {
      tapCountRef.current += 1;
    } else {
      tapCountRef.current = 1;
    }
    lastTapTimeRef.current = now;

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      openDrawer();
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-burjo-canvas px-5 pt-5 sm:px-7">
      <div className="flex items-center justify-between">
        <div
          onClick={handleLogoTap}
          className="cursor-pointer select-none group flex items-center gap-2"
          title="Ketuk 3x untuk Drawer Evaluasi Usabilitas"
        >
          <span className="text-[15px] font-bold tracking-[-0.08em] text-burjo-text leading-none">
            BURJO
          </span>
          <span className="text-[15px] font-bold tracking-[-0.08em] text-burjo-blue leading-none">
            OPS
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeTaskId ? (
            <div className="flex items-center gap-1.5 px-2 py-1 text-burjo-yellow">
              <Timer className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono font-bold">
                {currentDuration.toFixed(1)}s
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-mono tracking-wide text-burjo-quiet hidden sm:inline">{shiftName}</span>
          )}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-burjo-text transition-transform duration-200 ease-editorial active:scale-95"
            aria-label="Buka navigasi"
          >
            <Menu className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex min-h-screen w-full max-w-[460px] flex-col bg-burjo-canvas px-5 pb-10 pt-5 sm:px-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold tracking-[-0.08em] text-burjo-text">BURJO<span className="text-burjo-blue">OPS</span></span>
              <button type="button" onClick={() => setIsMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-burjo-text active:scale-95" aria-label="Tutup navigasi">
                <X className="h-5 w-5" strokeWidth={2.4} />
              </button>
            </div>
            <nav className="mt-auto mb-auto flex flex-col gap-3 py-16">
              {[
                ["Beranda", "/"],
                ["Resep", "/resep"],
                ["Micro-SOP", "/sop"],
                ["Serah terima", "/checklist"],
              ].map(([label, href], index) => (
                <motion.div key={href} initial={{ opacity: 0, transform: "translateY(12px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease: "easeOut" }}>
                  <Link href={href} onClick={() => setIsMenuOpen(false)} className="block text-[clamp(2.5rem,12vw,4rem)] font-normal tracking-[-0.07em] text-burjo-text transition-colors hover:text-burjo-blue">
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-burjo-border pt-5 text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet">{timeString || shiftName}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
