export type SopCategory = "Semua" | "Sanitasi" | "Zero-Waste";

export interface MicroSOP {
  id: string;
  title: string;
  category: "Sanitasi" | "Zero-Waste";
  duration: string;
  videoUrl: string;
  thumbnailUrl?: string;
  keyTakeaway: string;
  steps?: string[];
}
