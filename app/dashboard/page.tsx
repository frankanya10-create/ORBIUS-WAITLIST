"use client";

import { useEffect, useState, useRef } from "react";
import { insforge } from "@/lib/insforge";
import { motion } from "framer-motion";
import { Users, Mail, TrendingUp, Clock } from "lucide-react";

interface WaitlistEntry {
  id: number;
  email: string;
  referral_code: string;
  position: number;
  created_at: string;
}

export default function Dashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (async () => {
      try {
        const res = await fetch("/api/waitlist");
        const json = await res.json();
        if (json.data) setEntries(json.data);
        if (json.count !== undefined) setCount(json.count);
      } catch (e) {
        console.error("Failed to load waitlist", e);
      } finally {
        setLoading(false);
      }
    })();

    (async () => {
      try {
        await insforge.realtime.connect();
        const sub = await insforge.realtime.subscribe("waitlist:new");
        if (sub.ok) {
          insforge.realtime.on("new_signup", (payload: WaitlistEntry) => {
            setEntries((prev) => [{ ...payload, created_at: payload.created_at || new Date().toISOString() }, ...prev]);
            setCount((c) => c + 1);
          });
        }
      } catch {
        // realtime not critical
      }
    })();

    return () => {
      insforge.realtime.unsubscribe("waitlist:new");
      insforge.realtime.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 text-ink-950 font-body antialiased">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">Orbius Waitlist</h1>
            <p className="mt-1 text-sm text-ink-400">Real-time dashboard &middot; live updates</p>
          </div>
          <a
            href="/"
            className="rounded-full bg-ink-950 px-5 py-2.5 text-sm font-medium text-cream-100 transition-colors hover:bg-ink-800"
          >
            Back to site
          </a>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink-950/10 bg-cream-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-ink-400">
              <Users size={16} />
              <span className="font-mono text-xs uppercase tracking-wide">Total Signups</span>
            </div>
            <p className="font-display text-3xl font-semibold">{count}</p>
          </div>
          <div className="rounded-2xl border border-ink-950/10 bg-cream-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-ink-400">
              <TrendingUp size={16} />
              <span className="font-mono text-xs uppercase tracking-wide">Filled Spots</span>
            </div>
            <p className="font-display text-3xl font-semibold">{Math.min(count, 50)}</p>
          </div>
          <div className="rounded-2xl border border-ink-950/10 bg-cream-50 p-5">
            <div className="mb-2 flex items-center gap-2 text-ink-400">
              <Clock size={16} />
              <span className="font-mono text-xs uppercase tracking-wide">To Capacity</span>
            </div>
            <p className="font-display text-lg font-semibold">{Math.max(50 - count, 0)} spots left</p>
          </div>
        </div>

        <div className="rounded-3xl border border-ink-950/10 bg-cream-50 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-ink-950/10 px-5 py-4">
            <Mail size={14} className="text-ink-400" />
            <span className="font-mono text-xs uppercase tracking-wide text-ink-400">Recent Signups</span>
            {!loading && (
              <span className="ml-auto rounded-full bg-lime-400 px-2 py-0.5 font-mono text-[10px] font-medium">
                live
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink-950 border-t-transparent" />
            </div>
          ) : entries.length === 0 ? (
            <div className="py-16 text-center font-mono text-sm text-ink-400">
              No signups yet. Share the waitlist!
            </div>
          ) : (
            <div className="divide-y divide-ink-950/5">
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-cream-100/50"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/5 font-mono text-[11px] font-medium text-ink-400">
                      #{entry.position}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink-950">{entry.email}</p>
                      <p className="font-mono text-[11px] text-ink-400">
                        {new Date(entry.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-ink-950/5 px-2.5 py-1 font-mono text-[10px] text-ink-400">
                    {entry.referral_code}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
