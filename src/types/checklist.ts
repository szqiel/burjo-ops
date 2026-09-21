export interface ShiftHandoverLog {
  id: string;
  timestamp: string;
  shiftName: string; // e.g., "Shift Siang -> Shift Malam"
  lpgSafety: boolean;
  eggStock: number; // Tray
  noodleStock: number; // Dus
  chickenStock: number; // Potong
  notes?: string;
  submittedBy?: string;
}
