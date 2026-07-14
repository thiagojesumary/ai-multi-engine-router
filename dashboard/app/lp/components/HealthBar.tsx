"use client";

import { Server, GitMerge, Activity, Cpu, Database, Cog } from "lucide-react";
import type { ConnState, HealthSnapshot, Provider, RouterMetrics, TelemetrySnapshot, SubsystemStatus,} from "../lib/types";
import { StatusLabel } from "./StatusPill";
import { LoadingState, ErrorState, OfflineState } from "./StateViews";
import { RuntimeCards } from "./RuntimeCards";

const SUBSYSTEMS: { key: keyof HealthSnapshot; label: string; icon: React.ElementType }[] = [
  { key: "api", label: "API Gateway", icon: Server },
  { key: "router", label: "Router Engine", icon: GitMerge },
  { key: "telemetry", label: "Telemetry", icon: Activity },
  { key: "providers", label: "Providers", icon: Cpu },
  { key: "database", label: "Database", icon: Database },
  { key: "engine", label: "Engine", icon: Cog },
];

export function HealthBar({
  health,
  state,
  onRetry,
}: {
  health: HealthSnapshot | null;
  state: ConnState;
  onRetry: () => void;
}) {
  if (state !== "success" || !health) {
    return (
      <div className="h-[64px] rounded-xl border border-line/70 bg-panel/40">
        {state === "loading" && <LoadingState label="Checking subsystems" />}
        {state === "error" && <ErrorState onRetry={onRetry} message="Health check failed" />}
        {state === "offline" && <OfflineState onRetry={onRetry} />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 gap-3">
      {SUBSYSTEMS.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="flex items-center gap-2.5 rounded-xl border border-line/70 bg-panel/50 px-4 py-3"
        >
          <Icon className="h-4 w-4 text-muted" />
          <div>
            <p className="text-[12px] text-ink">{label}</p>
            <StatusLabel status={health[key]} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HealthView({
  health,
  metrics,
  providers,
  telemetry,
  state,
  onRetry,
}: {
  health: HealthSnapshot | null;
  metrics: RouterMetrics | null;
  providers: Provider[];
  telemetry: TelemetrySnapshot | null;
  state: ConnState;
  onRetry: () => void;
}) {
  if (state !== "success" || !health) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-line/70 bg-panel/50">
        {state === "loading" && <LoadingState label="Checking subsystems" />}
        {state === "error" && <ErrorState onRetry={onRetry} message="Health check failed" />}
        {state === "offline" && <OfflineState onRetry={onRetry} />}
      </div>
    );
  }

  const overall: SubsystemStatus = Object.values(health).includes("offline")
    ? "offline"
    : Object.values(health).includes("degraded")
    ? "degraded"
    : "operational";

  return (
    <div className="flex h-full flex-col rounded-xl border border-line/70 bg-panel/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Runtime Health — Operational Overview
        </span>
        <StatusLabel status={overall} />
      </div>
      <RuntimeCards
       health={health}
        metrics={metrics}
        providers={providers}
        telemetry={telemetry}
    />
    </div>
  );
}
