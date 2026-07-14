"use client";

import { Radio } from "lucide-react";
import type { ConnState } from "../lib/types";
import { MainChart } from "./MainChart";
import { BrainCore } from "./BrainCore";

export function OperationsCore({
  series,
  state,
  onRetry,
}: {
  series: { timestamp: string; requests: number }[];
  state: ConnState;
  onRetry: () => void;
}) {
  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden rounded-xl border border-line/70 bg-panel/50">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Requests over time — router flow
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/70">
          Last 24 hours
        </span>
      </div>

      <div className="mc-grid relative flex-1">
        {/* chart runs full width beneath the core */}
        <div className="absolute inset-x-4 inset-y-2">
          <MainChart series={series} state={state} onRetry={onRetry} />
        </div>

        {/* soft panel-colored halo so the brain reads as blended into the flow, not pasted over it */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-panel/70 blur-2xl" />

        {/* core, centered, on top */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <BrainCore />
        </div>
      </div>
    </div>
  );
}
