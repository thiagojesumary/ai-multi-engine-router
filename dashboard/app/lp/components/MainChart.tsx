"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ConnState } from "../lib/types";
import { LoadingState, ErrorState, OfflineState, EmptyState } from "./StateViews";

interface Point {
  timestamp: string;
  requests: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-cyan/30 bg-[#0B0F16]/95 px-3 py-2 shadow-glow-cyan">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <p className="tabular text-sm font-semibold text-cyan">{payload[0].value} req</p>
    </div>
  );
}

export function MainChart({
  series,
  state,
  onRetry,
}: {
  series: Point[];
  state: ConnState;
  onRetry: () => void;
}) {
  if (state === "loading") return <LoadingState label="Streaming flow" />;
  if (state === "error") return <ErrorState onRetry={onRetry} message="Flow signal lost" />;
  if (state === "offline") return <OfflineState onRetry={onRetry} />;
  if (!series.length) return <EmptyState label="Awaiting request flow" />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={series} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="flowStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="50%" stopColor="#5B5BFF" />
            <stop offset="100%" stopColor="#B14EFF" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1B2433" strokeDasharray="3 6" vertical={false} />
        <XAxis
          dataKey="timestamp"
          tick={{ fill: "#8B97A8", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={{ stroke: "#1B2433" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#8B97A8", fontSize: 10, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#00D4FF", strokeWidth: 1, strokeDasharray: "3 3" }} />
        <Area
          type="monotone"
          dataKey="requests"
          stroke="url(#flowStroke)"
          strokeWidth={2}
          fill="url(#flowFill)"
          isAnimationActive
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
