"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { getInsForge } from "@/lib/insforge";
import { motion } from "framer-motion";
import { Users, Mail, TrendingUp, Clock, Lock, ArrowRight, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";

interface WaitlistEntry {
  id: number;
  email: string;
  university?: string;
  position: number;
  created_at: string;
}

const SESSION_KEY = "orbius_dashboard_auth";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, "1");
        onUnlock();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl border border-ink-950/10 bg-cream-50 p-8 text-center"
      >
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 text-ink-950">
          <Lock size={20} />
        </span>
        <h1 className="font-display text-xl font-semibold tracking-tight text-ink-950">
          Dashboard Access
        </h1>
        <p className="mt-1.5 text-sm text-ink-400">
          Enter the password to view the waitlist dashboard.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-full border border-ink-950/15 bg-cream-100 px-5 py-3 text-sm text-ink-950 placeholder:text-ink-400 transition-colors focus:border-ink-950/40"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-cream-100 transition-all hover:bg-ink-800 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Unlock <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}

export default function Dashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked || initialized.current) return;
    initialized.current = true;

    (async () => {
      try {
        const res = await fetch("/api/waitlist");
        const json = await res.json();
        if (!res.ok) { setError(json.error || "Failed to load"); return; }
        if (json.data) setEntries(json.data);
        if (json.count !== undefined) setCount(json.count);
      } catch {
        setError("Network error. Check your connection.");
      } finally {
        setLoading(false);
      }
    })();

    (async () => {
      try {
        const insf = getInsForge();
        if (!insf) return;
        await insf.realtime.subscribe("waitlist:new");
        insf.realtime.on("new_signup", (payload: WaitlistEntry) => {
          setEntries((prev) => [{ ...payload, created_at: payload.created_at || new Date().toISOString() }, ...prev]);
          setCount((c) => c + 1);
        });
      } catch {
        // realtime not critical
      }
    })();

    return () => {
      const insf = getInsForge();
      if (insf) insf.realtime.unsubscribe("waitlist:new");
    };
  }, [unlocked]);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

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
          ) : error ? (
            <div className="py-16 text-center font-mono text-sm text-red-500">{error}</div>
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
                        {entry.university ? `${entry.university} · ` : ""}
                        {new Date(entry.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
