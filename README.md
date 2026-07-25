# Orbius — Waitlist Landing Page

A real-time waitlist page for Orbius, the student-life OS. Built with Next.js (App Router), Tailwind CSS, Framer Motion, InsForge backend, and Lucide icons.

## Features

- Real-time waitlist signup with live counter
- Realtime toast notifications when someone joins ("Yayyy! Stay tuned for something amazing!")
- Rollout schedule with progress bars that update based on actual signup count
- Referral modal with share links
- Admin dashboard at `/dashboard` with live signup list
- Instagram, X/Twitter, and TikTok social links

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_INSFORGE_URL=https://your-project.region.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=anon_...
INSFORGE_API_KEY=ik_...
```

## Structure

```
app/
  layout.tsx        Fonts, metadata, Toaster wrapper
  page.tsx          Main waitlist page with real-time data
  globals.css       Theme tokens, highlighter utility
  api/waitlist/     REST API (POST to signup, GET to fetch all)
  dashboard/        Real-time admin dashboard
components/
  Logo.tsx          Original four-point sparkle mark
  Nav.tsx           Logo, links pill, "Get Access", Dashboard link (no hamburger)
  Hero.tsx          Headline, email capture form, live counter
  ToastListener.tsx Subscribes to waitlist:new channel, shows toast
  ReferralModal.tsx Post-submit referral link + share buttons
  FeatureCards.tsx  Horizontally scrolling pillar card carousel
  WaveCounter.tsx   Rollout waves with live progress bars
  FAQ.tsx           Collapsible FAQ
  Footer.tsx        Copyright, social links (Instagram, X, TikTok)
lib/
  insforge.ts       InsForge client initialization
migrations/         SQL migration for waitlist table + realtime trigger
```

## Backend

This project uses [InsForge](https://insforge.dev) for the Postgres backend and realtime pub/sub.

- **Waitlist table**: `public.waitlist` (id, email, referral_code, position, created_at)
- **Realtime channel**: `waitlist:new` — publishes on every new signup
- **RLS**: Public select/insert policies for anon role

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS 3
- Framer Motion
- @insforge/sdk (database + realtime)
- react-hot-toast
- Lucide React icons
