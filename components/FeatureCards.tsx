"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import Logo from "@/components/Logo";
import FeatureDetailModal from "@/components/FeatureDetailModal";
import {
  type Audience,
  type Feature,
  lecturerFeatures,
  studentFeatures,
} from "@/lib/features";

const copy: Record<Audience, { eyebrow: string; heading: string }> = {
  student: {
    eyebrow: "For Students",
    heading: "Everything you need to actually function.",
  },
  lecturer: {
    eyebrow: "For Lecturers",
    heading: "Run every section without the admin overhead.",
  },
};

export default function FeatureCards() {
  const [audience, setAudience] = useState<Audience>("student");
  const [active, setActive] = useState<Feature | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const cards = audience === "student" ? studentFeatures : lecturerFeatures;

  function scroll(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  function switchAudience(next: Audience) {
    setAudience(next);
    scrollerRef.current?.scrollTo({ left: 0 });
  }

  return (
    <section id="pillars" className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
              {copy[audience].eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
              {copy[audience].heading}
            </h2>
          </motion.div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex rounded-full border border-ink-950/10 bg-cream-50 p-1">
              <button
                onClick={() => switchAudience("student")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  audience === "student"
                    ? "bg-ink-950 text-cream-100"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => switchAudience("lecturer")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  audience === "lecturer"
                    ? "bg-ink-950 text-cream-100"
                    : "text-ink-600 hover:text-ink-950"
                }`}
              >
                Lecturers
              </button>
            </div>

            <div className="hidden shrink-0 gap-2 sm:flex">
              <button
                onClick={() => scroll(-1)}
                aria-label="Scroll left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-950/10 bg-cream-50 text-ink-950 transition-colors hover:bg-ink-950 hover:text-cream-100"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Scroll right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-950/10 bg-cream-50 text-ink-950 transition-colors hover:bg-ink-950 hover:text-cream-100"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0"
        >
          {cards.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.06 }}
              className={`group relative flex min-h-[280px] w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl p-5 sm:w-[280px] ${c.bg}`}
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="rounded-full bg-ink-950/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-950">
                  {c.tag} · {c.tagNote}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-cream-100">
                  <Logo size={14} />
                </span>
              </div>

              <h3 className="mb-2 font-display text-2xl font-semibold leading-tight tracking-tight text-ink-950">
                {c.title}
              </h3>
              <p className="mb-10 text-sm leading-relaxed text-ink-800/80">
                {c.summary}
              </p>

              <button
                onClick={() => setActive(c)}
                className="mt-auto flex w-fit items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 text-xs font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-cream-100"
              >
                Read More
                <ArrowUpRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <FeatureDetailModal feature={active} onClose={() => setActive(null)} />
    </section>
  );
}
