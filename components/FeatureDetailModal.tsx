"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Logo from "@/components/Logo";
import type { Feature } from "@/lib/features";

export default function FeatureDetailModal({
  feature,
  onClose,
}: {
  feature: Feature | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-ink-950/10 bg-cream-50 p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink-400 transition-colors hover:bg-ink-950/5 hover:text-ink-950"
            >
              <X size={18} />
            </button>

            <div className="mb-5 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${feature.bg}`}
              >
                <Logo size={18} className="text-ink-950" />
              </span>
              <span className="rounded-full bg-ink-950/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-600">
                {feature.tag} · {feature.tagNote}
              </span>
            </div>

            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-950 sm:text-3xl">
              {feature.title}
            </h3>
            <p className="mt-1.5 font-medium text-ink-600">{feature.tagline}</p>

            <p className="mt-5 text-sm leading-relaxed text-ink-800/85">
              {feature.description}
            </p>

            <div className="mt-6 space-y-2.5">
              {feature.bullets.map((b) => (
                <div key={b} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${feature.bg}`}
                  >
                    <Check size={11} className="text-ink-950" strokeWidth={3} />
                  </span>
                  <p className="text-sm leading-relaxed text-ink-800/85">{b}</p>
                </div>
              ))}
            </div>

            <a
              href="#waitlist"
              onClick={onClose}
              className="mt-7 flex w-full items-center justify-center rounded-full bg-ink-950 py-3 text-sm font-semibold text-cream-100 transition-colors hover:bg-ink-800"
            >
              Join the waitlist for early access
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
