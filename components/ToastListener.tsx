"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { insforge } from "@/lib/insforge";

let countSubscriber: (() => void) | null = null;

export function onNewSignup(fn: () => void) {
  countSubscriber = fn;
  return () => { countSubscriber = null; };
}

export default function ToastListener() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await insforge.realtime.subscribe("waitlist:new");
        if (!res.ok || cancelled) return;

        insforge.realtime.on("new_signup", (payload: { email?: string }) => {
          if (cancelled) return;
          countSubscriber?.();
          toast.success(
            <div>
              <span className="font-semibold">Yayyy! Stay tuned for something amazing!</span>
              <br />
              <span className="text-xs opacity-80">{payload.email || "Someone"} joined the waitlist</span>
            </div>,
            {
              duration: 5000,
              position: "bottom-right",
              style: {
                background: "#141310",
                color: "#f4efe4",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
              },
            }
          );
        });
      } catch {
        // realtime not critical
      }
    })();

    return () => {
      cancelled = true;
      insforge.realtime.unsubscribe("waitlist:new");
    };
  }, []);

  return null;
}
