"use client";

import React from "react";
import { TopBar } from "./TopBar";
import { EvaluationProvider } from "@/context/EvaluationContext";
import { EvaluationDrawer } from "@/components/evaluation/EvaluationDrawer";
import { TaskCheckpointModal } from "@/components/evaluation/TaskCheckpointModal";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <EvaluationProvider>
      <div className="min-h-screen w-full bg-[#171817] flex justify-center">
        <div className="w-full max-w-[460px] min-h-screen bg-burjo-canvas relative flex flex-col overflow-x-hidden sm:border-x sm:border-burjo-border/50">
          <TopBar />
          <main className="flex-1 flex flex-col overflow-y-auto px-5 pb-16 pt-10 sm:px-7">
            {children}
          </main>
          <EvaluationDrawer />
          <TaskCheckpointModal />
        </div>
      </div>
    </EvaluationProvider>
  );
}
