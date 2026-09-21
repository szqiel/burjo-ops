"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface QuickActionCardProps {
  href: string;
  badge: string;
  badgeColor?: "blue" | "yellow" | "green";
  title: string;
  description: string;
  statNumber?: string;
  statLabel?: string;
  icon: React.ElementType;
}

export function QuickActionCard({
  href,
  badge,
  badgeColor = "blue",
  title,
  description,
  statNumber,
  statLabel,
  icon: Icon,
}: QuickActionCardProps) {
  const badgeClasses = {
    blue: "bg-burjo-blue/10 text-burjo-blue border-burjo-blue/20",
    yellow: "bg-burjo-yellow/10 text-burjo-yellow border-burjo-yellow/20",
    green: "bg-burjo-green/10 text-burjo-green border-burjo-green/20",
  }[badgeColor];

  const borderAccent = {
    blue: "group-hover:border-burjo-blue/50",
    yellow: "group-hover:border-burjo-yellow/50",
    green: "group-hover:border-burjo-green/50",
  }[badgeColor];

  return (
    <Link href={href} className="block group focus:outline-none">
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={`w-full bg-burjo-surface border border-burjo-border ${borderAccent} rounded-2xl p-4 transition-all duration-200 relative overflow-hidden flex flex-col justify-between`}
      >
        <div className="flex items-start justify-between mb-3">
          <span
            className={`inline-block px-2 py-0.5 rounded-full border text-[9px] font-mono uppercase tracking-widest ${badgeClasses}`}
          >
            {badge}
          </span>
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-burjo-border flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="max-w-[70%]">
            <h2 className="text-base font-bold tracking-tight text-white group-hover:text-burjo-blue transition-colors">
              {title}
            </h2>
            <p className="text-xs text-burjo-muted line-clamp-1 mt-0.5">
              {description}
            </p>
          </div>

          {statNumber ? (
            <div className="text-right">
              <div className="text-2xl font-bold tracking-tight text-white font-mono leading-none">
                {statNumber}
              </div>
              {statLabel && (
                <span className="text-[9px] font-mono text-burjo-muted uppercase tracking-wider">
                  {statLabel}
                </span>
              )}
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
