"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "error" | "success";

export default function Hero({
  onSubmit,
  status,
  joinedCount,
}: {
  onSubmit: (email: string) => Promise<void>;
  status: Status;
  joinedCount: number;
}) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid || status === "loading") return;
    await onSubmit(email);
    setEmail("");
    setTouched(false);
  }

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-8 sm:px-10 sm:pt-10">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-400"
        >
          Join The Orbit
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink-950 sm:text-6xl"
        >
          Your semester,
          <br />
          finally in{" "}
          <span className="highlight" style={{ ["--highlight-delay" as string]: "0.55s" }}>
            orbit.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-lg text-balance text-base text-ink-600 sm:text-lg"
        >
          Orbius merges your syllabus, your group chats, and your campus feed
          into one login for students &mdash; while lecturers get attendance,
          broadcasts, and course tools in the same platform. Nothing slips
          through the cracks, on either side of the lecture hall.
        </motion.p>

        <motion.form
          id="waitlist"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor="email" className="sr-only">
              Campus email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className="w-full rounded-full border border-ink-950/15 bg-cream-50 px-5 py-3.5 text-sm text-ink-950 placeholder:text-ink-400 transition-colors focus:border-ink-950/40"
            />
            {touched && !isValid && (
              <p className="mt-1.5 pl-2 text-left text-xs text-red-500">
                Enter a valid email to join.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:bg-ink-800 active:scale-[0.98] disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Joining...
              </>
            ) : (
              <>
                Join Waitlist
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 flex items-center gap-2"
        >
          <span className="flex h-6 items-center rounded-full bg-lime-400 px-3 font-mono text-[11px] font-medium text-ink-950">
            {joinedCount.toLocaleString()}+ students already in orbit
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="sm:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-ink-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
