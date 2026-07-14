"use client";

import { AlertTriangle, Loader2, RefreshCw, WifiOff, Inbox } from "lucide-react";
import { motion } from "framer-motion";

export function LoadingState({ label = "Syncing" }: { label?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
      <Loader2 className="h-5 w-5 animate-spin text-cyan" />
      <span className="font-mono text-[11px] uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function ErrorState({
  message = "Connection failed",
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-err">
      <AlertTriangle className="h-5 w-5" />
      <span className="max-w-[220px] text-center font-mono text-[11px] uppercase tracking-widest">
        {message}
      </span>
      <button
        onClick={onRetry}
        className="mt-1 flex items-center gap-1 rounded-full border border-err/40 px-3 py-1 text-[10px] uppercase tracking-widest text-err transition hover:bg-err/10"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    </div>
  );
}

export function OfflineState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-warn">
      <WifiOff className="h-5 w-5" />
      <span className="font-mono text-[11px] uppercase tracking-widest">Backend offline</span>
      <button
        onClick={onRetry}
        className="mt-1 flex items-center gap-1 rounded-full border border-warn/40 px-3 py-1 text-[10px] uppercase tracking-widest text-warn transition hover:bg-warn/10"
      >
        <RefreshCw className="h-3 w-3" />
        Reconnect
      </button>
    </div>
  );
}

export function EmptyState({ label = "No data yet" }: { label?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted/70">
      <Inbox className="h-5 w-5" />
      <span className="font-mono text-[11px] uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function PanelFade({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full w-full min-h-0"
    >
      {children}
    </motion.div>
  );
}
