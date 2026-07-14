"use client";

const roleStyles: Record<string, string> = {
  PRIMARY: "bg-cyan/10 text-cyan border-cyan/30",
  SECONDARY: "bg-indigo/10 text-indigo border-indigo/30",
  TERTIARY: "bg-violet/10 text-violet border-violet/30",
  FALLBACK: "bg-muted/10 text-muted border-muted/30",
};

export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest ${
        roleStyles[role] ?? roleStyles.FALLBACK
      }`}
    >
      {role}
    </span>
  );
}

const dotStyles: Record<string, string> = {
  ONLINE: "bg-online shadow-glow-online",
  operational: "bg-online shadow-glow-online",
  OFFLINE: "bg-err shadow-glow-err",
  offline: "bg-err shadow-glow-err",
  DEGRADED: "bg-warn",
  degraded: "bg-warn",
};

export function StatusDot({ status }: { status: string }) {
  return (
    <span
      className={`h-1.5 w-1.5 rounded-full ${dotStyles[status] ?? "bg-muted"} ${
        status === "ONLINE" || status === "operational" ? "animate-pulse-slow" : ""
      }`}
    />
  );
}

export function StatusLabel({ status }: { status: string }) {
  const color =
    status === "ONLINE" || status === "operational"
      ? "text-online"
      : status === "OFFLINE" || status === "offline"
      ? "text-err"
      : "text-warn";
  return (
    <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${color}`}>
      <StatusDot status={status} />
      {status}
    </span>
  );
}
