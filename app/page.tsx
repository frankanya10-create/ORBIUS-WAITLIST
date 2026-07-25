"use client";

import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import WaveCounter from "@/components/WaveCounter";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ToastListener, { onNewSignup } from "@/components/ToastListener";

type Status = "idle" | "loading" | "error" | "success";

export default function Page() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [position, setPosition] = useState(0);
  const [joinedCount, setJoinedCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/waitlist");
        const json = await res.json();
        if (json.count !== undefined) setJoinedCount(json.count);
      } catch {
        // fallback
      }
    })();

    const unsub = onNewSignup(() => {
      setJoinedCount((c) => c + 1);
    });

    return unsub;
  }, []);

  const handleSubmit = useCallback(async (email: string, university: string) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const body: Record<string, string> = { email };
      if (university) body.university = university;

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "Something went wrong. Try again.");
        return;
      }
      setPosition(json.data.position);
      setJoinedCount((c) => c + 1);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection.");
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ToastListener />
      <Nav />
      <Hero onSubmit={handleSubmit} status={status} joinedCount={joinedCount} errorMessage={errorMessage} position={position} />
      <FeatureCards />
      <WaveCounter joinedCount={joinedCount} />
      <FAQ />
      <Footer />
    </main>
  );
}
