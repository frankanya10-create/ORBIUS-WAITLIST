"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { insforge } from "@/lib/insforge";

let globalCountCallback: ((count: number) => void) | null = null;

export function setCountCallback(fn: (count: number) => void) {
  globalCountCallback = fn;
}

export default function ToastListener() {
  const cleanup = useRef<() => void>();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await insforge.realtime.subscribe("waitlist:new");
        if (!res.ok || cancelled) return;

        insforge.realtime.on("new_signup", (payload: { email?: string }) => {
          const email = payload.email || "Someone";
          toast.success(
            <div>
              <span className="font-semibold">Yayyy! Stay tuned for something amazing!</span>
              <br />
              <span className="text-xs opacity-80">{email} joined the waitlist</span>
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
          globalCountCallback?.(1);
        });
      } catch {
        // realtime not critical
      }
    })();

    cleanup.current = () => {
      cancelled = true;
      insforge.realtime.unsubscribe("waitlist:new");
    };

    return () => cleanup.current?.();
  }, []);

  return null;
}
