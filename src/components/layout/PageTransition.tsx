"use client";

import React from "react";
import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
