"use client";

import Image from "next/image";

import type { Provider } from "../lib/types";
import {
  LoadingState,
  ErrorState,
  OfflineState,
  EmptyState,
} from "./StateViews";

import type { ConnState } from "../lib/types";

const PROVIDER_META: Record<
  string,
  {
    label: string;
    logo: string;
    model: string;
  }
> = {
  openrouter: {
    label: "OpenRouter",
    logo: "/engines/openrouter2.png",
    model: "openrouter/free",
  },
  groq: {
    label: "Groq",
    logo: "/engines/groq2.png",
    model: "gpt-oss-120b",
  },
  cerebras: {
    label: "Cerebras",
    logo: "/engines/cerebras2.png",
    model: "gpt-oss-120b",
  },
  gemini: {
    label: "Google Gemini",
    logo: "/engines/gemini2.png",
    model: "gemini-2.5-flash",
  },
  ollama: {
    label: "Ollama",
    logo: "/engines/ollama2.png",
    model: "llama3.2",
  },
  huggingface: {
    label: "Hugging Face",
    logo: "/engines/huggingface2.png",
    model: "Qwen3-32B",
  },
  mistral: {
    label: "Mistral AI",
    logo: "/engines/mistral2.png",
    model: "mistral-small-latest",
  },
  deepseek: {
    label: "DeepSeek AI",
    logo: "/engines/deepseek2.png",
    model: "deepseek-chat",
  },
  mock: {
    label: "Nexum Runtime",
    logo: "/engines/nexum2.png",
    model: "Fallback Engine",
  },
};

export function ProviderOverview({
  providers,
  state,
  onRetry,
}: {
  providers: Provider[];
  state: ConnState;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-line/70 bg-panel/50">

      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Active Providers
        </span>

        {state === "success" && (
          <span className="font-mono text-[10px] text-muted/70">
            {providers.length} total
          </span>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-4">

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

        {state === "success" && providers.length === 0 && (
          <EmptyState label="No providers registered" />
        )}

        {state === "success" && providers.length > 0 && (

          <div className="grid grid-cols-3 gap-x-8 gap-y-8 place-items-center">

            {providers.map((provider) => {

              const meta =
                PROVIDER_META[provider.id.toLowerCase()] ?? {
                  label: provider.name,
                  logo: "/engines/default.png",
                  model: provider.model,
                };

              return (
                <button
                  key={provider.id}
                  title={`${meta.label}\n${meta.model}`}
                  className="group relative transition-all duration-200 hover:scale-110"
                >

                  <Image
                    src={meta.logo}
                    alt={meta.label}
                    width={24}
                    height={24}
                    className={`object-contain transition-all duration-300 ${
                      provider.status === "ONLINE"
                        ? "opacity-100"
                        : "opacity-40 grayscale"
                    }`}
                  />

                  <span
                    className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-panel ${
                      provider.status === "ONLINE"
                        ? "bg-online shadow-[0_0_8px_rgba(0,255,170,.9)]"
                        : provider.status === "DEGRADED"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                  />

                </button>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}