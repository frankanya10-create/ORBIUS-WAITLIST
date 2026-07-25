// Mock/local-only helpers standing in for a real backend + waitlist DB.

export function generateReferralCode(email: string): string {
  const base = email.split("@")[0]?.replace(/[^a-zA-Z0-9]/g, "") || "student";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base.slice(0, 8)}-${suffix}`.toLowerCase();
}

export function mockWaitlistPosition(): number {
  // Pretend there's already a healthy line. Deterministic-ish for demo purposes.
  return 200 + Math.floor(Math.random() * 80);
}

export function buildReferralLink(code: string): string {
  return `https://orbius.app/r/${code}`;
}

export const TOTAL_JOINED_BASE = 512;
