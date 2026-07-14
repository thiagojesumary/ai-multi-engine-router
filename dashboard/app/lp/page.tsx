"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Sidebar, type ViewKey } from "./components/Sidebar";
import { Header } from "./components/Header";
import { KpiRow } from "./components/KpiRow";
import { OperationsCore } from "./components/OperationsCore";
import { ProvidersPanel } from "./components/ProvidersPanel";
import { ProviderOverview } from "./components/ProviderOverview";
import { ScoresPanel } from "./components/ScoresPanel";
import { TelemetryPanel } from "./components/TelemetryPanel";
import { PlaygroundPanel } from "./components/PlaygroundPanel";
import { HealthBar, HealthView } from "./components/HealthBar";
import { PanelFade } from "./components/StateViews";

import { useApi } from "./lib/useApi";
import {
  getMetrics,
  getProviders,
  getProviderScores,
  getTelemetry,
  getHealth,
} from "./lib/api";

export default function MissionControlPage() {
  const [view, setView] = useState<ViewKey>("dashboard");

  const metrics = useApi(getMetrics, 8000);
  const providers = useApi(getProviders, 10000);
  const scores = useApi(getProviderScores, 12000);
  const telemetry = useApi(getTelemetry, 6000);
  const health = useApi(getHealth, 15000);

  const overallStatus = useMemo(() => {
    if (health.state !== "success" || !health.data) return "unknown" as const;
    const values = Object.values(health.data);
    if (values.includes("offline")) return "offline" as const;
    if (values.includes("degraded")) return "degraded" as const;
    return "operational" as const;
  }, [health.state, health.data]);

  const notificationCount =
    telemetry.data?.events.filter((e) => e.kind === "error" || e.kind === "fallback").length ?? 0;

  return (
    <div className="mc-grid flex h-screen w-screen overflow-hidden bg-void">
      <Sidebar active={view} onChange={setView} overallStatus={overallStatus} />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <Header backendState={health.state} notificationCount={notificationCount} />

        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-8 py-5">
          <AnimatePresence mode="wait">
            {view === "dashboard" && (
              <PanelFade key="dashboard">
                <div className="flex h-full flex-col gap-4">
                  <KpiRow metrics={metrics.data} state={metrics.state} onRetry={metrics.retry} />
                  <div className="flex flex-1 gap-4 overflow-hidden">
                    <OperationsCore
                      series={metrics.data?.series ?? []}
                      state={metrics.state}
                      onRetry={metrics.retry}
                    />
                    <ProviderOverview
                    providers={providers.data ?? []}
                    state={providers.state}
                     onRetry={providers.retry}
                    />
                  </div>
                  <HealthBar health={health.data} state={health.state} onRetry={health.retry} />
                </div>
              </PanelFade>
            )}

            {view === "providers" && (
              <PanelFade key="providers">
                <ProvidersPanel
                  providers={providers.data ?? []}
                  state={providers.state}
                  onRetry={providers.retry}
                />
              </PanelFade>
            )}

            {view === "scores" && (
              <PanelFade key="scores">
                <ScoresPanel scores={scores.data ?? []} state={scores.state} onRetry={scores.retry} />
              </PanelFade>
            )}

            {view === "telemetry" && (
              <PanelFade key="telemetry">
                <TelemetryPanel telemetry={telemetry.data} state={telemetry.state} onRetry={telemetry.retry} />
              </PanelFade>
            )}

            {view === "playground" && (
              <PanelFade key="playground">
                  <PlaygroundPanel />
              </PanelFade>
            )}

            {view === "health" && (
              <PanelFade key="health">
                <HealthView health={health.data} state={health.state} onRetry={health.retry} />
              </PanelFade>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
