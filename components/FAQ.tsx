"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const items = [
  {
    q: "When is launch?",
    a: "Closed Beta opens as soon as the first 50 spots are claimed — we're most of the way there. Campus Early Access follows a few weeks after, school by school, based on referral activity.",
  },
  {
    q: "Is Orbius free?",
    a: "Yes, for students. Orbius is free to use for your entire time on campus, no credit card required to join the waitlist or the beta.",
  },
  {
    q: "How does the waitlist work?",
    a: "Your spot is set by signup time, but referrals move you up. Share your link with 3 classmates and you skip straight to Priority Access.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
          FAQ
        </p>
        <h2 className="mb-10 text-center font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
          Quick answers.
        </h2>

        <div className="divide-y divide-ink-950/10 rounded-3xl border border-ink-950/10 bg-cream-50">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left sm:px-6 sm:py-5"
                >
                  <span className="font-medium text-ink-950">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-ink-950" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 sm:px-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
