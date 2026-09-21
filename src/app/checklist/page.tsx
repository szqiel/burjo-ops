"use client";

import React, { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { SafetyToggle } from "@/components/checklist/SafetyToggle";
import { TactileStepper } from "@/components/checklist/TactileStepper";
import { Toast } from "@/components/checklist/Toast";
import { HandoverHistoryList } from "@/components/checklist/HandoverHistoryList";
import { getHandoverLogs, saveHandoverLog } from "@/lib/storage";
import { ShiftHandoverLog } from "@/types/checklist";
import { useEvaluation } from "@/context/EvaluationContext";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ShiftChecklistPage() {
  const { activeTaskId, completeTask } = useEvaluation();

  const [isLpgSafe, setIsLpgSafe] = useState(true);
  const [eggStock, setEggStock] = useState(2); // 2 Tray default for Task 3
  const [noodleStock, setNoodleStock] = useState(4); // 4 Dus default for Task 3
  const [chickenStock, setChickenStock] = useState(15); // 15 Potong default
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [recentLogs, setRecentLogs] = useState<ShiftHandoverLog[]>([]);

  useEffect(() => {
    setRecentLogs(getHandoverLogs());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 400ms spinner per PRD specification
    setTimeout(() => {
      const saved = saveHandoverLog({
        shiftName: "Shift Siang -> Shift Malam",
        lpgSafety: isLpgSafe,
        eggStock,
        noodleStock,
        chickenStock,
        notes: notes.trim() || undefined,
        submittedBy: "Juru Masak (Kru 1)",
      });

      setRecentLogs(getHandoverLogs());
      setIsSubmitting(false);
      setShowToast(true);

      // Checkpoint detection for Task 3: Verifikasi LPG, stok telur & mi, submit serah terima
      if (activeTaskId === 3) {
        completeTask(3);
      }
    }, 400);
  };

  return (
    <PageTransition>
      <div className="flex flex-col space-y-5 pb-6">
        {/* Header */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-green font-semibold">
              INBOUND LOGISTICS & SAFETY
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Serah Terima Shift
          </h1>
          <p className="text-xs text-burjo-muted mt-1 leading-relaxed">
            Validasi stok kritis 24 jam & keamanan gas sebelum jam sibuk malam (18.00–23.00 WIB).
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* 1. Safety Toggle: Regulator LPG 3kg */}
          <SafetyToggle isSafe={isLpgSafe} onChange={setIsLpgSafe} />

          {/* 2. Critical Stock Steppers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                SISA STOK BAHAN CEPAT BERPUTAR
              </span>
              <span className="text-[10px] font-mono text-zinc-600">SUPPLIER 06.00 WIB</span>
            </div>

            {/* Sisa Telur Ayam (Tray) */}
            <TactileStepper
              label="SISA TELUR AYAM"
              value={eggStock}
              unit="TRAY"
              min={0}
              max={20}
              onChange={setEggStock}
            />

            {/* Sisa Mi Instan (Dus) */}
            <TactileStepper
              label="SISA MI INSTAN"
              value={noodleStock}
              unit="DUS"
              min={0}
              max={30}
              onChange={setNoodleStock}
            />

            {/* Sisa Daging Ayam (Potong) */}
            <TactileStepper
              label="SISA DAGING AYAM"
              value={chickenStock}
              unit="POTONG"
              min={0}
              max={100}
              onChange={setChickenStock}
            />
          </div>

          {/* 3. Optional Notes for Incoming Shift */}
          <div className="space-y-1.5">
            <label
              htmlFor="handover-notes"
              className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block"
            >
              CATATAN KHUSUS (OPSIONAL)
            </label>
            <textarea
              id="handover-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Pesan kondisi kompor atau bahan untuk shift malam..."
              className="w-full bg-burjo-surface border border-burjo-border rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:border-burjo-blue focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          {/* 4. Full-Width High-Contrast Action Button (#16A34A Emerald Green) */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.97 }}
            className="w-full min-h-[52px] rounded-2xl bg-burjo-green hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(22,163,74,0.35)] transition-all duration-200 disabled:opacity-75 focus:outline-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>MENGIRIMKAN LOG SHIFT...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>KIRIM SERAH TERIMA SHIFT</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Cloud Success Toast */}
        <Toast
          show={showToast}
          message="Log Shift Berhasil Terkirim ke Cloud"
          onClose={() => setShowToast(false)}
        />

        {/* History of Recent Handover Logs */}
        <HandoverHistoryList logs={recentLogs} />
      </div>
    </PageTransition>
  );
}
