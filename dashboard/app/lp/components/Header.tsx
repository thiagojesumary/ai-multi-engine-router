"use client";

import { useEffect, useState } from "react";
import { Bell, Maximize2, Minimize2 } from "lucide-react";
import type { ConnState } from "../lib/types";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function Header({
  backendState,
  notificationCount,
}: {
  backendState: ConnState;
  notificationCount: number;
}) {
  const now = useClock();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => undefined);
    }
  };

  const backendLabel: Record<ConnState, string> = {
    loading: "Connecting",
    success: "Backend Online",
    error: "Backend Error",
    offline: "Backend Offline",
  };
  const backendColor: Record<ConnState, string> = {
    loading: "text-muted",
    success: "text-online",
    error: "text-err",
    offline: "text-warn",
  };
  const backendDot: Record<ConnState, string> = {
    loading: "bg-muted",
    success: "bg-online shadow-glow-online animate-pulse-slow",
    error: "bg-err shadow-glow-err",
    offline: "bg-warn",
  };

  return (
    <header className="flex items-center justify-between border-b border-line/70 px-8 py-5">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-wide text-ink">
          AI MULTI ENGINE ROUTER
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Real-time infrastructure command surface
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className={`flex items-center gap-2 rounded-full border border-line/70 px-3 py-1.5 ${backendColor[backendState]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${backendDot[backendState]}`} />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            {backendLabel[backendState]}
          </span>
        </div>

        <div className="text-right">
          <p className="tabular text-sm text-ink">
            {now ? now.toLocaleTimeString("en-GB") : "--:--:--"}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {now
              ? now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
              : "----"}
          </p>
        </div>

        <button
          onClick={toggleFullscreen}
          className="rounded-lg border border-line/70 p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        <button
          className="relative rounded-lg border border-line/70 p-2 text-muted transition hover:border-cyan/40 hover:text-cyan"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet font-mono text-[9px] text-ink shadow-glow-violet">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
