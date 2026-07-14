"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Cpu,
  BarChart3,
  Activity,
  TerminalSquare,
  HeartPulse,
} from "lucide-react";
import type { SubsystemStatus } from "../lib/types";

export type ViewKey =
  | "dashboard"
  | "providers"
  | "scores"
  | "telemetry"
  | "playground"
  | "health";

const NAV: { key: ViewKey; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "providers", label: "Providers", icon: Cpu },
  { key: "scores", label: "Scores", icon: BarChart3 },
  { key: "telemetry", label: "Telemetry", icon: Activity },
  { key: "playground", label: "Playground", icon: TerminalSquare },
  { key: "health", label: "System", icon: HeartPulse },
];

export function Sidebar({
  active,
  onChange,
  overallStatus,
}: {
  active: ViewKey;
  onChange: (v: ViewKey) => void;
  overallStatus: SubsystemStatus | "unknown";
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <aside className="flex h-full w-[18%] min-w-[220px] flex-col border-r border-line/70 bg-panel/60 px-5 py-6">
      <div className="flex items-center gap-3 pb-8">
        {!logoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/logo.png"
            alt="Router logo"
            className="h-8 w-8 object-contain"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/40 bg-cyan/5">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow-cyan" />
            <span className="absolute inset-0 rounded-lg border border-cyan/20 animate-pulse-slow" />
          </div>
        )}
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold tracking-wide text-ink">
            AI ROUTER
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Mission Control
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-body text-[13px] transition-all ${
                isActive
                  ? "bg-cyan/10 text-cyan shadow-[inset_0_0_0_1px_rgba(0,212,255,0.25)]"
                  : "text-muted hover:bg-white/[0.03] hover:text-ink"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-transform ${
                  isActive ? "text-cyan" : "text-muted group-hover:text-ink"
                }`}
              />
              {label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan shadow-glow-cyan" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
       Open Source Project
      </p>

     <a href="https://www.linkedin.com/in/thiago-jesumary/" target="_blank" rel="noopener noreferrer" className="mt-1 block text-[12px] font-medium text-ink transition-colors hover:text-cyan">
     by Thiago Jesumary ↗
   </a>
  </div>

      <div className="mt-auto space-y-3 border-t border-line/60 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          System status
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              overallStatus === "operational"
                ? "bg-online shadow-glow-online animate-pulse-slow"
                : overallStatus === "degraded"
                ? "bg-warn"
                : overallStatus === "offline"
                ? "bg-err shadow-glow-err"
                : "bg-muted"
            }`}
          />
          <span className="font-mono text-xs uppercase tracking-wide text-ink">
            {overallStatus === "unknown" ? "Connecting" : overallStatus}
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted">v1.0.0 · lp</p>
      </div>
    </aside>
  );
}
