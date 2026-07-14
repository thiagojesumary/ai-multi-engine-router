"use client";

import { Activity, Zap, CheckCircle2, Layers, Cpu, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import type { ConnState, RouterMetrics } from "../lib/types";
import { LoadingState, ErrorState, OfflineState } from "./StateViews";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("en-US");
}

function Delta({ pct }: { pct: number }) {
  const positive = pct >= 0;
  return (
    <span className={`flex items-center gap-0.5 font-mono text-[10px] ${positive ? "text-online" : "text-err"}`}>
      {positive ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />}
      {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  accent,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delta?: number;
  accent: string;
  sub?: string;
}) {
  return (
    <div className="group flex flex-1 items-center gap-3 rounded-xl border border-line/70 bg-panel/60 px-4 py-3.5 transition hover:border-cyan/30 hover:bg-panel">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
        style={{ borderColor: `${accent}40`, background: `${accent}14` }}
      >
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="tabular truncate text-lg font-semibold text-ink">{value}</p>
          {delta !== undefined && <Delta pct={delta} />}
        </div>
        {sub && <p className="font-mono text-[9px] uppercase tracking-widest text-muted/70">{sub}</p>}
      </div>
    </div>
  );
}

export function KpiRow({
  metrics,
  state,
  onRetry,
}: {
  metrics: RouterMetrics | null;
  state: ConnState;
  onRetry: () => void;
}) {
  if (state !== "success" || !metrics) {
    return (
      <div className="h-[92px] rounded-xl border border-line/70 bg-panel/40">
        {state === "loading" && <LoadingState label="Loading metrics" />}
        {state === "error" && <ErrorState onRetry={onRetry} message="Metrics unavailable" />}
        {state === "offline" && <OfflineState onRetry={onRetry} />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-3">
      <KpiCard
        icon={Activity}
        label="Total Requests"
        value={formatNumber(metrics.totalRequests)}
        delta={metrics.totalRequestsDeltaPct}
        accent="#00D4FF"
      />
      <KpiCard
        icon={Zap}
        label="Avg Latency"
        value={`${(metrics.avgLatencyMs / 1000).toFixed(2)}s`}
        delta={-metrics.avgLatencyDeltaPct}
        accent="#5B5BFF"
      />
      <KpiCard
        icon={CheckCircle2}
        label="Success"
        value={`${metrics.successRate.toFixed(1)}%`}
        delta={metrics.successRateDeltaPct}
        accent="#00FF99"
      />
      <KpiCard
        icon={Layers}
        label="Tokens Used"
        value={formatNumber(metrics.tokensUsed)}
        delta={metrics.tokensUsedDeltaPct}
        accent="#B14EFF"
      />
      <KpiCard
        icon={Cpu}
        label="Providers"
        value={`${metrics.activeProviders}/${metrics.totalProviders}`}
        accent="#00D4FF"
        sub="active"
      />
      <KpiCard
        icon={DollarSign}
        label="Total Cost"
        value={`$${metrics.costUsd.toFixed(2)}`}
        accent="#FFD84D"
      />
    </div>
  );
}
