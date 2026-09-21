"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Cloud, X } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export function Toast({ show, message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed top-16 inset-x-0 mx-auto z-50 w-full max-w-[360px] px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-zinc-950/95 border border-burjo-green/50 text-white rounded-2xl p-3.5 shadow-[0_8px_30px_rgba(22,163,74,0.3)] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-burjo-green/20 flex items-center justify-center text-burjo-green shrink-0">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-tight">
                  Tersinkronisasi
                </p>
                <p className="text-[11px] text-zinc-300 font-mono">
                  {message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
