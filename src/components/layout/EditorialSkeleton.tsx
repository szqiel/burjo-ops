import React from "react";

export function EditorialSkeleton({ variant = "list" }: { variant?: "home" | "list" | "detail" | "form" }) {
  const rows = variant === "list" ? 3 : variant === "form" ? 4 : 2;
  return (
    <div className="animate-pulse pt-7" aria-label="Memuat konten">
      <div className="h-3 w-24 bg-burjo-surface" />
      <div className="mt-14 h-14 w-4/5 bg-burjo-surface" />
      <div className="mt-3 h-14 w-3/5 bg-burjo-surface" />
      <div className="mt-8 h-3 w-2/3 bg-burjo-surface" />
      <div className="mt-20 border-t border-burjo-border">
        {Array.from({ length: rows }).map((_, index) => (
          <div className="border-b border-burjo-border py-7" key={index}>
            <div className="h-3 w-20 bg-burjo-surface" />
            <div className="mt-4 h-8 w-3/4 bg-burjo-surface" />
            <div className="mt-3 h-3 w-1/2 bg-burjo-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}
