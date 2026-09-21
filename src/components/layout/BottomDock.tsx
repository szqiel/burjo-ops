"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, UtensilsCrossed, PlaySquare, ClipboardCheck } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Beranda", href: "/", icon: LayoutGrid },
  { name: "Resep", href: "/resep", icon: UtensilsCrossed },
  { name: "Micro-SOP", href: "/sop", icon: PlaySquare },
  { name: "Serah Terima", href: "/checklist", icon: ClipboardCheck },
];

export function BottomDock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-5 inset-x-0 mx-auto w-full max-w-[360px] px-3 z-40 pointer-events-none">
      <nav className="pointer-events-auto bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-full px-3 py-1.5 flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 flex flex-col items-center justify-center group focus:outline-none"
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`p-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-burjo-blue bg-burjo-blue/10"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[9px] font-mono tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-burjo-blue font-semibold"
                      : "text-zinc-500 group-hover:text-zinc-400"
                  }`}
                >
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
