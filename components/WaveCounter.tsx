"use client";

import { motion } from "framer-motion";

const WAVE_01_CAPACITY = 50;
const WAVE_02_THRESHOLD = 200;

function getWaveConfig(waveNum: number) {
  switch (waveNum) {
    case 0:
      return {
        tag: "Wave 01",
        title: "Closed Beta",
        detail: "50 spots &middot; founding students shape the product directly",
        getLabel: (count: number) => (count >= WAVE_01_CAPACITY ? "filled" : "filling"),
        getFill: (count: number) => Math.min(Math.round((count / WAVE_01_CAPACITY) * 100), 100),
        getStatus: (count: number) => (count >= WAVE_01_CAPACITY ? "filling" : "filling"),
      };
    case 1:
      return {
        tag: "Wave 02",
        title: "Campus Early Access",
        detail: "Unlocks school-by-school as referrals hit threshold",
        getLabel: (count: number) => (count >= WAVE_01_CAPACITY ? "next" : "locked"),
        getFill: (count: number) =>
          count >= WAVE_01_CAPACITY
            ? Math.min(Math.round(((count - WAVE_01_CAPACITY) / WAVE_02_THRESHOLD) * 100), 100)
            : 0,
        getStatus: (count: number) => (count >= WAVE_01_CAPACITY ? "next" : "locked"),
      };
    case 2:
      return {
        tag: "Wave 03",
        title: "Public Release",
        detail: "Open to every campus, everywhere",
        getLabel: () => "locked",
        getFill: () => 0,
        getStatus: () => "locked",
      };
    default:
      return null;
  }
}

const waveIndices = [0, 1, 2];

const statusStyles: Record<string, string> = {
  filling: "text-ink-950 border-ink-950/10 bg-lime-400",
  next: "text-ink-950 border-ink-950/10 bg-lavender-400",
  locked: "text-ink-400 border-ink-950/10 bg-cream-200",
};

export default function WaveCounter({ joinedCount = 0 }: { joinedCount?: number }) {
  return (
    <section id="waves" className="px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
            Rollout Schedule
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            Access rolls out in waves, not all at once.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-600">
            The higher up the list you are, the earlier your wave unlocks.
          </p>
        </motion.div>

        <div className="space-y-3">
          {waveIndices.map((idx, i) => {
            const w = getWaveConfig(idx)!;
            const fill = w.getFill(joinedCount);
            const status = w.getStatus(joinedCount);
            const label = w.getLabel(joinedCount);
            return (
              <motion.div
                key={w.tag}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-4 rounded-3xl border border-ink-950/10 bg-cream-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-ink-400">
                    {w.tag}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-950 sm:text-lg">
                      {w.title}
                    </h3>
                    <p
                      className="text-xs text-ink-600 sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: w.detail }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink-950/10 sm:w-32">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fill}%` }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="h-full rounded-full bg-ink-950"
                    />
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${statusStyles[status]}`}
                  >
                    {label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
