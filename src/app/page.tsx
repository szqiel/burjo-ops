"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";

const destinations = [
  { number: "01", title: "Resep baku", detail: "Racik dengan ukuran yang sama, setiap shift.", href: "/resep", accent: "blue" },
  { number: "02", title: "Micro-SOP", detail: "Pelajari satu teknik dalam hitungan detik.", href: "/sop", accent: "yellow" },
  { number: "03", title: "Serah terima", detail: "Tinggalkan dapur dalam kondisi jelas.", href: "/checklist", accent: "blue" },
];

export default function HomePage() {
  return (
    <PageTransition>
      <div className="flex min-h-full flex-col">
        <section className="pt-7">
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet">Burjo SS, Tembalang</p>
          <h1 className="mt-20 max-w-[7ch] text-balance font-display text-[clamp(3.3rem,14vw,5.4rem)] font-normal leading-[0.86] tracking-[-0.085em] text-burjo-text">
            Semua yang dapur perlu tahu.
          </h1>
          <p className="mt-7 max-w-[28ch] text-[15px] leading-[1.25] tracking-[-0.03em] text-burjo-muted">
            Resep, kebiasaan kerja, dan log shift dalam satu tempat yang ringkas.
          </p>
        </section>

        <section className="relative mt-20 overflow-hidden rounded-[24px] bg-burjo-surface px-6 py-7">
          <span className="absolute right-[-20px] top-[-35px] h-36 w-36 rounded-full bg-burjo-blue" aria-hidden="true" />
          <span className="absolute bottom-[-50px] right-14 h-24 w-24 rounded-full border-[18px] border-burjo-yellow" aria-hidden="true" />
          <div className="relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-muted">Status sekarang</p>
            <p className="mt-12 max-w-[8ch] text-[clamp(2.2rem,10vw,3rem)] font-normal leading-[0.9] tracking-[-0.07em] text-burjo-text">Dapur siap melayani.</p>
            <div className="mt-10 flex items-end justify-between border-t border-burjo-border pt-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-muted">Shift malam</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.13em] text-burjo-yellow">Normal</span>
            </div>
          </div>
        </section>

        <section className="mt-20 pb-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-burjo-quiet">Pilih kebutuhanmu</p>
          <div className="mt-7 border-t border-burjo-border">
            {destinations.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.32, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={item.href} className="group grid grid-cols-[30px_1fr_auto] gap-x-3 border-b border-burjo-border py-6 active:scale-[0.98]">
                  <span className={`pt-1 text-[10px] font-mono ${item.accent === "yellow" ? "text-burjo-yellow" : "text-burjo-blue"}`}>{item.number}</span>
                  <span>
                    <span className="block text-[clamp(1.8rem,8vw,2.35rem)] leading-[0.9] tracking-[-0.065em] text-burjo-text">{item.title}</span>
                    <span className="mt-2 block max-w-[25ch] text-xs leading-[1.35] text-burjo-muted">{item.detail}</span>
                  </span>
                  <span className="self-center text-2xl leading-none text-burjo-muted transition-transform duration-200 ease-editorial group-hover:translate-x-1">↗</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
