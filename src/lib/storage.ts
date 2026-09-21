import { ShiftHandoverLog } from "@/types/checklist";

const HANDOVER_STORAGE_KEY = "burjo_ops_handover_logs";

const INITIAL_LOGS: ShiftHandoverLog[] = [
  {
    id: "log-init-1",
    timestamp: "2026-09-21 17:55 WIB",
    shiftName: "Shift Pagi -> Shift Malam",
    lpgSafety: true,
    eggStock: 3,
    noodleStock: 5,
    chickenStock: 20,
    notes: "Kompor stasiun 1 api stabil. Tabung gas cadangan masih ada 2.",
    submittedBy: "Kru Shift Pagi (R1)",
  },
];

export function getHandoverLogs(): ShiftHandoverLog[] {
  if (typeof window === "undefined") return INITIAL_LOGS;
  try {
    const raw = localStorage.getItem(HANDOVER_STORAGE_KEY);
    if (!raw) return INITIAL_LOGS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_LOGS;
  }
}

export function saveHandoverLog(log: Omit<ShiftHandoverLog, "id" | "timestamp">): ShiftHandoverLog {
  const newLog: ShiftHandoverLog = {
    ...log,
    id: `log-${Date.now()}`,
    timestamp: new Intl.DateTimeFormat("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date()) + " WIB",
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getHandoverLogs();
      const updated = [newLog, ...existing];
      localStorage.setItem(HANDOVER_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save handover log to localStorage:", e);
    }
  }

  return newLog;
}
