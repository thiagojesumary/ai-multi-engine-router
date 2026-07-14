"use client";

import Image from "next/image";

import type { ConnState, Provider } from "../lib/types";
import { RoleBadge, StatusDot } from "./StatusPill";
import {
  LoadingState,
  ErrorState,
  OfflineState,
  EmptyState,
} from "./StateViews";

const PROVIDER_META: Record<
  string,
  {
    label: string;
    logo: string;
  }
> = {
  openrouter: {
    label: "OpenRouter",
    logo: "/engines/openrouter.png",
  },
  groq: {
    label: "Groq",
    logo: "/engines/groq.png",
  },
  cerebras: {
    label: "Cerebras",
    logo: "/engines/cerebras.png",
  },
  gemini: {
    label: "Google Gemini",
    logo: "/engines/gemini.png",
  },
  ollama: {
    label: "Ollama",
    logo: "/engines/ollama.png",
  },
  huggingface: {
    label: "Hugging Face",
    logo: "/engines/huggingface.png",
  },
  mistral: {
    label: "Mistral AI",
    logo: "/engines/mistral.png",
  },
  deepseek: {
    label: "DeepSeek AI",
    logo: "/engines/deepseek.png",
  },
  mock: {
    label: "Nexum Runtime",
    logo: "/engines/nexum.png",
  },
};

const PROVIDER_MODELS: Record<string, string> = {
  openrouter: "openrouter/free",
  groq: "gpt-oss-120b",
  cerebras: "gpt-oss-120b",
  gemini: "gemini-2.5-flash",
  ollama: "llama3.2",
  huggingface: "Qwen3-32B",
  mistral: "mistral-small",
  deepseek: "deepseek-chat",
  mock: "Nexum-Runtime",
};

function ProviderCard({
  provider,
}: {
  provider: Provider;
}) {
  const meta =
    PROVIDER_META[provider.id.toLowerCase()] ?? {
      label: provider.name,
      logo: "/engines/default.png",
    };

  const model =
  PROVIDER_MODELS[provider.id.toLowerCase()] ??
  provider.model;  

  return (
    <div className="group flex h-[108px] flex-col justify-between rounded-xl border border-line/60 bg-void/40 p-4 transition-all duration-200 hover:border-cyan/40 hover:bg-panel/70 hover:shadow-[0_0_16px_rgba(0,255,255,.08)]">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3 min-w-0">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line/60 bg-panel">
            <Image
              src={meta.logo}
              alt={meta.label}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink">
              {meta.label}
            </p>

            <p className="truncate font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
              {model}
            </p>
          </div>

        </div>

        <StatusDot status={provider.status} />

      </div>

      <div className="flex items-center justify-between">

        <RoleBadge role={provider.role} />

        <span className="font-mono text-[10px] text-muted">
          {(provider.latencyMs / 1000).toFixed(2)}s
        </span>

      </div>

    </div>
  );
}

export function ProvidersPanel({
  providers,
  state,
  onRetry,
  compact = false,
}: {
  providers: Provider[];
  state: ConnState;
  onRetry: () => void;
  compact?: boolean;
}) {
  const list = compact ? providers.slice(0, 4) : providers;

  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-line/70 bg-panel/50 ${
        compact ? "w-[300px]" : "w-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Active Providers
        </span>

        {state === "success" && (
          <span className="font-mono text-[10px] text-muted/70">
            {providers.length} total
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">

        {state === "loading" && (
          <LoadingState label="Scanning providers" />
        )}

        {state === "error" && (
          <ErrorState
            onRetry={onRetry}
            message="Providers unreachable"
          />
        )}

        {state === "offline" && (
          <OfflineState onRetry={onRetry} />
        )}

        {state === "success" && list.length === 0 && (
          <EmptyState label="No providers registered" />
        )}

        {state === "success" && (
          <div className="grid grid-cols-3 gap-4">

            {list.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}