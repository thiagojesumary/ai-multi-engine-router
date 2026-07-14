"use client";

import Image from "next/image";

type OrbitProvider = {
  id: string;
  status: "online" | "offline" | "warning";
};

const NODES = [
  {
    id: "openrouter",
    label: "OpenRouter",
    model: "openrouter/free",
    x: "50%",
    y: "4%",
  },
  {
    id: "groq",
    label: "Groq",
    model: "gpt-oss-120b",
    x: "18%",
    y: "20%",
  },
  {
    id: "gemini",
    label: "Google Gemini",
    model: "gemini-2.5-flash",
    x: "82%",
    y: "20%",
  },
  {
    id: "cerebras",
    label: "Cerebras",
    model: "gpt-oss-120b",
    x: "10%",
    y: "48%",
  },
  {
    id: "ollama",
    label: "Ollama",
    model: "llama3.2",
    x: "90%",
    y: "48%",
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    model: "Qwen3-32B",
    x: "18%",
    y: "78%",
  },
  {
    id: "mistral",
    label: "Mistral AI",
    model: "mistral-small-latest",
    x: "82%",
    y: "78%",
  },
  {
    id: "deepseek",
    label: "DeepSeek AI",
    model: "deepseek-chat",
    x: "38%",
    y: "92%",
  },
  {
    id: "nexum",
    label: "Nexum Runtime",
    model: "Fallback Engine",
    x: "62%",
    y: "92%",
  },
];

export function ProviderOrbit({
  activeProvider,
}: {
  activeProvider?: string;
}) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">

      {/* LINHAS */}

      <div className="absolute left-1/2 top-1/2 h-[42%] w-px -translate-x-1/2 -translate-y-1/2 bg-cyan/10" />
      <div className="absolute left-1/2 top-1/2 h-px w-[42%] -translate-x-1/2 -translate-y-1/2 bg-cyan/10" />

      <div className="absolute left-[28%] top-[30%] h-px w-[22%] rotate-[28deg] bg-cyan/10" />
      <div className="absolute right-[28%] top-[30%] h-px w-[22%] -rotate-[28deg] bg-cyan/10" />

      <div className="absolute left-[28%] bottom-[24%] h-px w-[22%] -rotate-[28deg] bg-cyan/10" />
      <div className="absolute right-[28%] bottom-[24%] h-px w-[22%] rotate-[28deg] bg-cyan/10" />

      {/* PROVIDERS */}

      {NODES.map((node) => {
        const active = activeProvider === node.id;

        return (
          <div
            key={node.id}
            title={`${node.label}\n${node.model}`}
            className={`absolute z-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-auto ${
              active
                ? "scale-125 drop-shadow-[0_0_20px_rgba(0,220,255,.85)]"
                : "opacity-90 hover:scale-110"
            }`}
            style={{
              left: node.x,
              top: node.y,
            }}
          >
            <div className="relative">

              <Image
                src={`/engines/${node.id}.png`}
                alt={node.label}
                width={24}
                height={24}
                className="object-contain"
              />

              <span
                className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-panel ${
                  active
                    ? "bg-cyan shadow-[0_0_10px_rgba(0,255,255,.9)]"
                    : "bg-online"
                }`}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
}