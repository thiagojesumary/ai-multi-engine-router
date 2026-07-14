"use client";

import { useState } from "react";
import {
  Send,
  Loader2,
  Cpu,
  Zap,
  GitBranch,
  Bot,
} from "lucide-react";

import { postGenerate } from "../lib/api";
import type { GenerateResponseBody } from "../lib/types";

const TASKS = [
  "reasoning",
  "generation",
  "analysis",
  "summarization",
  "general",
] as const;

type TaskType = (typeof TASKS)[number];

export function PlaygroundPanel() {
  const [prompt, setPrompt] = useState("");
  const [task, setTask] = useState<TaskType>("reasoning");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] =
    useState<GenerateResponseBody | null>(null);

  const submit = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await postGenerate({
        task,
        input: prompt,
        model: null,
        temperature: 0.2,
        max_tokens: 350,
      });

      setResult(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Generation failed"
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-full w-full min-h-0 grid-cols-2 gap-4 overflow-hidden">
      <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-line/70 bg-panel/50 p-5">
        <span className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">
          Prompt Playground — POST /v1/generate
        </span>

        <label className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
          Task
        </label>

        <select
          value={task}
          onChange={(e) =>
            setTask(e.target.value as TaskType)
          }
          className="mb-4 rounded-lg border border-line/70 bg-void/60 px-3 py-2 text-sm text-ink outline-none focus:border-cyan/50"
        >
          {TASKS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
          Prompt
        </label>

        <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask the router to generate something…"
        className="min-h-0 flex-1 resize-none overflow-y-auto rounded-lg border border-line/70 bg-void/60 px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-cyan/50"
        />

        <button
          type="button"
          onClick={submit}
          disabled={loading || !prompt.trim()}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-cyan transition hover:bg-cyan/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}

          {loading ? "Routing…" : "Generate"}
        </button>
      </div>

      <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-line/70 bg-panel/50 p-5">
        <span className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">
          Response
        </span>

        {!result && !error && !loading && (
          <div className="flex flex-1 items-center justify-center text-center font-mono text-[11px] uppercase tracking-widest text-muted/60">
            Awaiting first request
          </div>
        )}

        {loading && (
          <div className="flex flex-1 items-center justify-center gap-2 text-muted">
            <Loader2 className="h-4 w-4 animate-spin text-cyan" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Routing to best engine
            </span>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-1 items-center justify-center text-center font-mono text-[11px] uppercase tracking-widest text-err">
            {error}
          </div>
        )}

        {result && !loading && (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-line/60 bg-void/40 p-3.5 pr-4">
              <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink">
                {result.response}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              <Stat
                icon={Cpu}
                label="Provider"
                value={result.provider}
              />
              <Stat
                icon={Bot}
                label="Model"
                value={result.model}
              />
              <Stat
                icon={Zap}
                label="Latency"
                value={`${(
                  result.latencyMs / 1000
                ).toFixed(2)}s`}
              />
              <Stat
                icon={GitBranch}
                label="Fallback"
                value={result.fallbackUsed ? "Yes" : "No"}
                warn={result.fallbackUsed}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  warn,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-lg border border-line/60 bg-void/40 px-2.5 py-2">
      <div className="flex items-center gap-1.5 text-muted">
        <Icon className="h-3 w-3" />
        <span className="font-mono text-[9px] uppercase tracking-widest">
          {label}
        </span>
      </div>

      <p
        className={`truncate text-[12px] font-medium ${
          warn ? "text-warn" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}