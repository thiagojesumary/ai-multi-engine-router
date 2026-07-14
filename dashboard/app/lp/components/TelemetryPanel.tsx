"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowRightLeft, AlertCircle, PlugZap, Send, Zap } from "lucide-react";
import type { ConnState, TelemetryEvent, TelemetrySnapshot } from "../lib/types";
import { LoadingState, ErrorState, OfflineState, EmptyState } from "./StateViews";

const kindMeta: Record<TelemetryEvent["kind"], { icon: React.ElementType; color: string }> = {
  request: { icon: Send, color: "text-cyan" },
  fallback: { icon: ArrowRightLeft, color: "text-warn" },
  provider_online: { icon: PlugZap, color: "text-online" },
  provider_offline: { icon: PlugZap, color: "text-err" },
  error: { icon: AlertCircle, color: "text-err" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.max(1, Math.floor(diff / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

export function TelemetryPanel({
  telemetry,
  state,
  onRetry,
}: {
  telemetry: TelemetrySnapshot | null;
  state: ConnState;
  onRetry: () => void;
}) {
  if (state !== "success" || !telemetry) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-line/70 bg-panel/50">
        {state === "loading" && <LoadingState label="Tuning telemetry" />}
        {state === "error" && <ErrorState onRetry={onRetry} message="Telemetry unavailable" />}
        {state === "offline" && <OfflineState onRetry={onRetry} />}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col rounded-xl border border-line/70 bg-panel/50 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Request Timeline
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-online">
            <Zap className="h-3 w-3" />
            {telemetry.activePerMinute} req/min
          </span>
        </div>
        <div className="flex-1">
          {telemetry.timeline.length === 0 ? (
            <EmptyState label="No timeline data" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry.timeline}>
                <Tooltip
                  contentStyle={{ background: "#0B0F16", border: "1px solid #1B2433", fontSize: 11 }}
                  labelStyle={{ color: "#8B97A8" }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#00D4FF"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-4 border-t border-line/60 pt-3">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            Provider Events
          </p>
          <div className="flex flex-wrap gap-2">
            {telemetry.events
              .filter((e) => e.kind === "provider_online" || e.kind === "provider_offline" || e.kind === "fallback")
              .slice(0, 6)
              .map((e) => {
                const meta = kindMeta[e.kind];
                const Icon = meta.icon;
                return (
                  <span
                    key={e.id}
                    className={`flex items-center gap-1.5 rounded-full border border-line/60 bg-void/40 px-2.5 py-1 font-mono text-[10px] ${meta.color}`}
                  >
                    <Icon className="h-3 w-3" />
                    {e.provider}
                  </span>
                );
              })}
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-xl border border-line/70 bg-panel/50 p-5">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">
          Live Activity
        </p>
        <div className="flex-1 space-y-2.5 overflow-hidden">
          {telemetry.events.length === 0 && <EmptyState label="No recent activity" />}
          {telemetry.events.slice(0, 8).map((e) => {
            const meta = kindMeta[e.kind];
            const Icon = meta.icon;
            return (
              <div key={e.id} className="flex items-start gap-2.5">
                <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${meta.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] text-ink">{e.message}</p>
                  <p className="font-mono text-[10px] text-muted">
                    {e.provider} · {timeAgo(e.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
