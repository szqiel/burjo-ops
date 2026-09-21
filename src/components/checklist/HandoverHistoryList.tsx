"use client";

import React from "react";
import { ShiftHandoverLog } from "@/types/checklist";
import { Clock, ShieldCheck, ShieldAlert, History } from "lucide-react";

interface HandoverHistoryListProps {
  logs: ShiftHandoverLog[];
}

export function HandoverHistoryList({ logs }: HandoverHistoryListProps) {
  if (logs.length === 0) return null;

  return (
    <div className="space-y-3 pt-3">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
        <History className="w-3.5 h-3.5" />
        <span>RIWAYAT SERAH TERIMA TERAKHIR</span>
      </div>

      <div className="space-y-2.5">
        {logs.slice(0, 3).map((log) => (
          <div
            key={log.id}
            className="bg-zinc-950/60 border border-burjo-border rounded-xl p-3.5 space-y-2"
          >
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-burjo-blue font-semibold">{log.shiftName}</span>
              <span className="text-zinc-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {log.timestamp}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-1 bg-zinc-900/50 rounded-lg border border-burjo-border/40">
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Telur</span>
                <span className="text-sm font-bold text-white font-mono">{log.eggStock} Tray</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Mi</span>
                <span className="text-sm font-bold text-white font-mono">{log.noodleStock} Dus</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Ayam</span>
                <span className="text-sm font-bold text-white font-mono">{log.chickenStock} Ptg</span>
              </div>
            </div>

            {log.notes && (
              <p className="text-xs text-zinc-400 font-sans italic border-l-2 border-zinc-700 pl-2">
                &ldquo;{log.notes}&rdquo;
              </p>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-burjo-border/40">
              <span className="flex items-center gap-1 text-burjo-green">
                <ShieldCheck className="w-3 h-3" />
                Regulator Aman
              </span>
              <span>{log.submittedBy || "Kru Shift"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
