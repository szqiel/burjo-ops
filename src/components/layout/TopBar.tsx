"use client";

import React, { useState, useEffect, useRef } from "react";
import { useEvaluation } from "@/context/EvaluationContext";
import { Clock, ShieldCheck, Timer } from "lucide-react";

export function TopBar() {
  const { openDrawer, activeTaskId, currentDuration } = useEvaluation();
  const [timeString, setTimeString] = useState<string>("");
  const [shiftName, setShiftName] = useState<string>("SHIFT MALAM");
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
    <header className="sticky top-0 z-30 w-full bg-burjo-canvas/95 backdrop-blur-md border-b border-burjo-border px-5 py-3.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Logo with 3-Tap Usability Hook */}
        <div
          onClick={handleLogoTap}
          className="cursor-pointer select-none group flex items-center gap-2"
          title="Ketuk 3x untuk Drawer Evaluasi Usabilitas"
        >
          <div className="w-2 h-2 rounded-full bg-burjo-blue animate-pulse" />
          <span className="text-sm font-bold tracking-tight text-burjo-text group-hover:text-burjo-blue transition-colors">
            BURJO SS
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-muted">
            OPS
          </span>
        </div>

        {/* Live Operational Shift Badge & Active Stopwatch */}
        <div className="flex items-center gap-2">
          {activeTaskId ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-burjo-yellow/10 border border-burjo-yellow/30 text-burjo-yellow">
              <Timer className="w-3 h-3 animate-spin" />
              <span className="text-[11px] font-mono font-bold tracking-wider">
                {currentDuration.toFixed(1)}s
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-burjo-border text-[10px] font-mono text-zinc-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-burjo-green" />
                <span>{shiftName}</span>
              </div>
              <span className="text-[11px] font-mono text-burjo-muted hidden xs:inline">
                {timeString}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
