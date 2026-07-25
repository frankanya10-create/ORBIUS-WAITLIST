"use client";

import Logo from "@/components/Logo";

export default function Nav() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-ink-950">
            <Logo size={16} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            orbius
          </span>
        </div>

        <div className="hidden items-center gap-6 rounded-full border border-ink-950/10 bg-cream-50 px-6 py-2.5 text-sm font-medium text-ink-800 md:flex">
          <a href="#pillars" className="transition-colors hover:text-ink-950">
            Pillars
          </a>
          <a href="#waves" className="transition-colors hover:text-ink-950">
            Waves
          </a>
          <a href="#faq" className="transition-colors hover:text-ink-950">
            FAQ
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/dashboard"
          className="rounded-full border border-ink-950/10 bg-cream-50 px-3 py-2 font-mono text-[10px] text-ink-400 transition-colors hover:text-ink-950 sm:px-4 sm:text-[11px]"
        >
          Dashboard
        </a>
        <a
          href="#waitlist"
          className="hidden items-center gap-1.5 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-medium text-cream-100 transition-colors hover:bg-ink-800 sm:flex"
        >
          Get Access
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  );
}
