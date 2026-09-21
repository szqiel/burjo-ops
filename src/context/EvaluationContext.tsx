"use client";

import React, { createContext, useContext, useState, useRef } from "react";

export interface TaskRecord {
  taskId: 1 | 2 | 3;
  name: string;
  targetSeconds: number; // 16.4, 12.2, 28.6
  elapsedSeconds?: number;
  completed: boolean;
}

interface EvaluationContextType {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  activeTaskId: (1 | 2 | 3) | null;
  startTask: (taskId: 1 | 2 | 3) => void;
  completeTask: (taskId: 1 | 2 | 3) => void;
  cancelTask: () => void;
  taskRecords: Record<1 | 2 | 3, TaskRecord>;
  currentDuration: number;
  lastCompletedTask: TaskRecord | null;
  clearLastCompleted: () => void;
}

const EvaluationContext = createContext<EvaluationContextType | null>(null);

export function EvaluationProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<(1 | 2 | 3) | null>(null);
  const [currentDuration, setCurrentDuration] = useState<number>(0);
  const [lastCompletedTask, setLastCompletedTask] = useState<TaskRecord | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const [taskRecords, setTaskRecords] = useState<Record<1 | 2 | 3, TaskRecord>>({
    1: { taskId: 1, name: "Task 1: Takaran Mi Dok-dok 1 Porsi", targetSeconds: 16.4, completed: false },
    2: { taskId: 2, name: "Task 2: Video Sanitasi Wajan Cepat", targetSeconds: 12.2, completed: false },
    3: { taskId: 3, name: "Task 3: Validasi Serah Terima Shift", targetSeconds: 28.6, completed: false },
  });

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const startTask = (taskId: 1 | 2 | 3) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveTaskId(taskId);
    setCurrentDuration(0);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      setCurrentDuration(Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1)));
    }, 100);

    closeDrawer();
  };

  const completeTask = (taskId: 1 | 2 | 3) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const finalSeconds = Number(((Date.now() - (startTimeRef.current || Date.now())) / 1000).toFixed(1));
    const finalDuration = finalSeconds > 0 ? finalSeconds : taskRecords[taskId].targetSeconds;

    const updated: TaskRecord = {
      ...taskRecords[taskId],
      elapsedSeconds: finalDuration,
      completed: true,
    };

    setTaskRecords((prev) => ({
      ...prev,
      [taskId]: updated,
    }));

    setActiveTaskId(null);
    setLastCompletedTask(updated);
  };

  const cancelTask = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveTaskId(null);
    setCurrentDuration(0);
  };

  const clearLastCompleted = () => setLastCompletedTask(null);

  return (
    <EvaluationContext.Provider
      value={{
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        activeTaskId,
        startTask,
        completeTask,
        cancelTask,
        taskRecords,
        currentDuration,
        lastCompletedTask,
        clearLastCompleted,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
}

export function useEvaluation() {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error("useEvaluation must be used within an EvaluationProvider");
  }
  return context;
}
