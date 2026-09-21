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
      <div className="flex flex-col pb-6">
        {/* Header */}
        <div className="pt-7">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-yellow font-semibold">Serah terima</span>
          <h1 className="mt-14 max-w-[8ch] text-[clamp(3.4rem,14vw,5.4rem)] font-normal leading-[0.86] tracking-[-0.085em] text-burjo-text">Akhiri shift dengan jelas.</h1>
          <p className="mt-7 max-w-[28ch] text-[15px] leading-[1.25] tracking-[-0.03em] text-burjo-muted">Periksa keamanan dan stok, lalu kirim catatan untuk kru berikutnya.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-20 flex flex-col gap-8">
          {/* 1. Safety Toggle: Regulator LPG 3kg */}
          <SafetyToggle isSafe={isLpgSafe} onChange={setIsLpgSafe} />

          {/* 2. Critical Stock Steppers */}
          <div>
            <div className="mb-5 flex items-center justify-between border-b border-burjo-border pb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet">Stok kritis</span>
              <span className="text-[10px] font-mono text-burjo-muted">06.00 WIB</span>
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
              className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet font-semibold block"
            >
              CATATAN KHUSUS (OPSIONAL)
            </label>
            <textarea
              id="handover-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Pesan kondisi kompor atau bahan untuk shift malam..."
              className="mt-3 w-full border-b border-burjo-border bg-transparent px-0 py-3 text-sm text-burjo-text placeholder:text-burjo-quiet focus:border-burjo-blue focus:outline-none transition-colors resize-none font-sans"
            />
          </div>

          {/* 4. Full-Width High-Contrast Action Button (#16A34A Emerald Green) */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.97 }}
            className="w-full min-h-[56px] rounded-lg bg-burjo-yellow text-burjo-canvas font-bold uppercase tracking-[0.12em] text-[10px] flex items-center justify-center gap-2 transition-transform duration-200 active:scale-[0.98] disabled:opacity-75"
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
