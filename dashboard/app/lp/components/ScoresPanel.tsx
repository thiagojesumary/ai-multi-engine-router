"use client";

import type { ConnState, ProviderScore } from "../lib/types";
import { LoadingState, ErrorState, OfflineState, EmptyState } from "./StateViews";

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return <div className="h-6 w-16" />;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 60;
      const y = 22 - ((p - min) / range) * 22;
      return `${x},${y}`;
    })
    .join(" ");
  const rising = points[points.length - 1]! >= points[0]!;
  return (
    <svg width="64" height="24" viewBox="0 0 64 24" className="shrink-0">
      <polyline
        points={coords}
        fill="none"
        stroke={rising ? "#00FF99" : "#FF4D6D"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function rankColor(rank: number) {
  if (rank === 1) return "text-cyan border-cyan/40 bg-cyan/10";
  if (rank === 2) return "text-indigo border-indigo/40 bg-indigo/10";
  if (rank === 3) return "text-violet border-violet/40 bg-violet/10";
  return "text-muted border-line bg-void/40";
}

export function ScoresPanel({
  scores,
  state,
  onRetry,
}: {
  scores: ProviderScore[];
  state: ConnState;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line/70 bg-panel/50">
      <div className="px-5 pt-4 pb-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Provider Scores — ranking
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-5 pb-5">
        {state === "loading" && <LoadingState label="Computing scores" />}
        {state === "error" && <ErrorState onRetry={onRetry} message="Scores unavailable" />}
        {state === "offline" && <OfflineState onRetry={onRetry} />}
        {state === "success" && scores.length === 0 && <EmptyState label="No scored providers" />}
        {state === "success" &&
          scores.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 rounded-lg border border-line/50 bg-void/40 px-4 py-3 transition hover:border-cyan/30"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-semibold ${rankColor(
                  s.rank
                )}`}
              >
                {s.rank}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-ink">{s.name}</p>
                <p className="tabular font-mono text-[10px] text-muted">
                  {(s.latencyMs / 1000).toFixed(2)}s · {s.successRate.toFixed(1)}% success
                </p>
              </div>
              <Sparkline points={s.trend} />
              <span className="tabular w-10 shrink-0 text-right text-sm font-semibold text-cyan">
                {s.score.toFixed(1)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
