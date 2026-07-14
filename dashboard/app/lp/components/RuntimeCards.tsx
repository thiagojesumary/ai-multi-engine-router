"use client";

import {
  Activity,
  Cpu,
  Database,
  GitMerge,
  Cog,
  Server,
} from "lucide-react";

import type {
  HealthSnapshot,
  Provider,
  RouterMetrics,
  TelemetrySnapshot,
} from "../lib/types";

import { StatusLabel } from "./StatusPill";

interface RuntimeCardsProps {
  health: HealthSnapshot;
  metrics: RouterMetrics | null;
  providers: Provider[];
  telemetry: TelemetrySnapshot | null;
}

function RuntimeCard({
  title,
  icon: Icon,
  status,
  lines,
}: {
  title: string;
  icon: React.ElementType;
  status: HealthSnapshot[keyof HealthSnapshot];
  lines: string[];
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-line/60 bg-void/40 p-5 transition hover:border-cyan/30">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-cyan" />
        <StatusLabel status={status} />
      </div>

      <div className="mt-5 space-y-2">
        <p className="font-display text-sm text-ink">{title}</p>

        {lines.map((line) => (
          <p
            key={line}
            className="font-mono text-[11px] text-muted"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export function RuntimeCards({
  health,
  metrics,
  providers,
  telemetry,
}: RuntimeCardsProps) {
  const lastEvent =
    telemetry?.events.length
      ? telemetry.events[telemetry.events.length - 1]
      : null;

  return (
    <div className="grid flex-1 grid-cols-3 gap-4">

      <RuntimeCard
        title="API Gateway"
        icon={Server}
        status={health.api}
        lines={[
          `Requests: ${metrics?.totalRequests ?? 0}`,
          `Latency: ${((metrics?.avgLatencyMs ?? 0) / 1000).toFixed(2)}s`,
          `Success: ${(metrics?.successRate ?? 0).toFixed(1)}%`,
        ]}
      />

      <RuntimeCard
        title="Router Engine"
        icon={GitMerge}
        status={health.router}
        lines={[
          `Task: ${lastEvent?.task ?? "--"}`,
          `Provider: ${lastEvent?.provider ?? "--"}`,
          `Model: ${lastEvent?.model ?? "--"}`,
        ]}
      />

      <RuntimeCard
        title="Telemetry"
        icon={Activity}
        status={health.telemetry}
        lines={[
          `Events: ${telemetry?.events.length ?? 0}`,
          `Fallbacks: ${
            telemetry?.events.filter((e) => e.fallback).length ?? 0
          }`,
          `Live: ${telemetry?.activePerMinute ?? 0}/min`,
        ]}
      />

      <RuntimeCard
        title="Providers"
        icon={Cpu}
        status={health.providers}
        lines={[
          `Registered: ${providers.length}`,
          `Online: ${
            providers.filter((p) => p.status === "ONLINE").length
          }`,
          `Offline: ${
            providers.filter((p) => p.status !== "ONLINE").length
          }`,
        ]}
      />

      <RuntimeCard
        title="Database"
        icon={Database}
        status={health.database}
        lines={[
          `Telemetry Records`,
          `${telemetry?.events.length ?? 0} stored`,
          `Persistence: Memory`,
        ]}
      />

      <RuntimeCard
        title="AI Engine"
        icon={Cog}
        status={health.engine}
        lines={[
           `Router Engine`,
          `Task-Based Routing`,
          `Version: v1.0.0`,
        ]}
      />

    </div>
  );
}