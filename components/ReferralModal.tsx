"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, PartyPopper, Share2, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getInsForge } from "@/lib/insforge";

export default function ReferralModal({
  open,
  onClose,
  referralLink,
  position,
  referrals,
  referralCode,
}: {
  open: boolean;
  onClose: () => void;
  referralLink: string;
  position: number;
  referrals: number;
  referralCode: string;
}) {
  const [copied, setCopied] = useState(false);
  const [liveCount, setLiveCount] = useState(referrals);
  const goal = 3;
  const progress = Math.min(liveCount / goal, 1);
  const subscribed = useRef(false);

  useEffect(() => {
    setLiveCount(referrals);
  }, [referrals]);

  useEffect(() => {
    if (!open || !referralCode || subscribed.current) return;
    subscribed.current = true;

    (async () => {
      try {
        const insforge = getInsForge();
        if (!insforge) return;

        const res = await insforge.realtime.subscribe("waitlist:new");
        if (!res.ok) return;

        insforge.realtime.on("new_signup", (payload: { referred_by?: string }) => {
          if (payload.referred_by === referralCode) {
            setLiveCount((c) => c + 1);
          }
        });
      } catch {
        // realtime not critical
      }
    })();

    return () => {
      const insforge = getInsForge();
      if (insforge) insforge.realtime.unsubscribe("waitlist:new");
    };
  }, [open, referralCode]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard may be unavailable
    }
  }

  const shareText = "I just joined the Orbius waitlist — the OS for campus life. Join with my link:";
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${referralLink}`)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}`;

  return (
    <AnimatePresence>
      {open && (
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
            className="relative w-full max-w-md rounded-3xl border border-ink-950/10 bg-cream-50 p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink-400 transition-colors hover:bg-ink-950/5 hover:text-ink-950"
            >
              <X size={18} />
            </button>

            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 text-ink-950">
              <PartyPopper size={20} />
            </span>

            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-950">
              You&apos;re on the list.
            </h3>
            <p className="mt-1.5 font-mono text-xs text-ink-400">
              Position #{position}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Move up the line! Share your link with{" "}
              <span className="font-medium text-ink-950">3 classmates</span>{" "}
              to unlock Priority Access.
            </p>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-ink-400">
                <span>{liveCount} / {goal} referrals</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-950/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-ink-950"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-ink-950/10 bg-cream-100 px-3 py-2.5">
              <span className="flex-1 truncate font-mono text-xs text-ink-600">
                {referralLink}
              </span>
              <button
                onClick={copyLink}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink-950/5 px-2.5 py-1.5 font-mono text-[11px] text-ink-950 transition-colors hover:bg-ink-950/10"
              >
                {copied ? (
                  <>
                    <Check size={13} /> copied
                  </>
                ) : (
                  <>
                    <Copy size={13} /> copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-ink-950/10 bg-teal-400 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:brightness-95"
              >
                <Share2 size={15} />
                WhatsApp
              </a>
              <a
                href={xHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-ink-950/10 bg-lavender-400 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:brightness-95"
              >
                <Share2 size={15} />
                Share on X
              </a>
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full rounded-full bg-ink-950 py-3 text-sm font-semibold text-cream-100 transition-colors hover:bg-ink-800"
            >
              Done for now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
