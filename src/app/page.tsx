"use client";

import React from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { ShiftStatusCard } from "@/components/dashboard/ShiftStatusCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { UtensilsCrossed, PlaySquare, ClipboardCheck } from "lucide-react";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="flex flex-col space-y-6">
        {/* Header Title with High Negative Space */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-burjo-blue font-semibold">
              KMS MOBILE DAPUR
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Standarisasi Mutu & Log 24 Jam
          </h1>
          <p className="text-xs text-burjo-muted mt-1 leading-relaxed max-w-[90%]">
            Transformasi pengetahuan tacit ke explicit untuk konsistensi rasa dan kelancaran serah terima antar-shift.
          </p>
        </div>

        {/* Live Operational Station Status */}
        <ShiftStatusCard />

        {/* Core KMS Modules Navigation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              MODUL OPERASIONAL
            </span>
            <span className="text-[10px] font-mono text-zinc-600">3 AKTIF</span>
          </div>

          <div className="flex flex-col space-y-2.5">
            <QuickActionCard
              href="/resep/mi-dok-dok"
              badge="RESEP BAKU"
              badgeColor="blue"
              title="Digital Recipe Card"
              description="Rasio bumbu terukur, glanceable 50 cm di stasiun kompor"
              statNumber="1.5"
              statLabel="SDM BUMBU"
              icon={UtensilsCrossed}
            />

            <QuickActionCard
              href="/sop"
              badge="MICRO-SOP"
              badgeColor="yellow"
              title="Video Micro-SOP"
              description="Edukasi wajan & zero waste 30-60 detik onboard kru baru"
              statNumber="42s"
              statLabel="DURASI CEPAT"
              icon={PlaySquare}
            />

            <QuickActionCard
              href="/checklist"
              badge="LOG SHIFT"
              badgeColor="green"
              title="Serah Terima Shift"
              description="Validasi regulator gas & counter stok telur, mi, ayam"
              statNumber="3/3"
              statLabel="STOK KRITIS"
              icon={ClipboardCheck}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
