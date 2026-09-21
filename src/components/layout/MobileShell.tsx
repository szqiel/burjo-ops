"use client";

import React from "react";
import { TopBar } from "./TopBar";
import { BottomDock } from "./BottomDock";
import { EvaluationProvider } from "@/context/EvaluationContext";
import { EvaluationDrawer } from "@/components/evaluation/EvaluationDrawer";
import { TaskCheckpointModal } from "@/components/evaluation/TaskCheckpointModal";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <EvaluationProvider>
      {/* Outer wrapper for desktop simulator feel */}
      <div className="min-h-screen w-full bg-[#050507] flex justify-center items-start sm:py-6 selection:bg-burjo-blue/20 selection:text-burjo-blue">
        {/* Mobile Viewport Shell (390px - 420px max) */}
        <div className="w-full max-w-[420px] min-h-screen sm:min-h-[844px] sm:max-h-[920px] bg-burjo-canvas sm:border sm:border-burjo-border/80 sm:rounded-[36px] relative shadow-2xl flex flex-col overflow-hidden">
          {/* Top Status Bar */}
          <TopBar />

          {/* Main Scrollable Screen Area */}
          <main className="flex-1 flex flex-col overflow-y-auto px-5 pt-4 pb-28">
            {children}
          </main>

          {/* Floating Bottom Navigation Pill */}
          <BottomDock />

          {/* Evaluation Usability Drawer & Checkpoint Modal */}
          <EvaluationDrawer />
          <TaskCheckpointModal />
        </div>
      </div>
    </EvaluationProvider>
  );
}
