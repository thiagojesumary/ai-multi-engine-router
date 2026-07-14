"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProviderOrbit } from "./ProviderOrbit";

/**
 * Renders /public/brainai.png as the router core. If that asset isn't
 * present yet, falls back to a generated animated glyph so the mission
 * control view still reads as intended — swap in the real PNG and this
 * component picks it up automatically.
 */
export function BrainCore() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative flex h-[38vh] w-[42%] min-w-[320px] items-center justify-center">
      {/* outer rings */}
      
      <div className="absolute inset-[8%] rounded-full border border-indigo/10 animate-spin-slower" />
      <div className="absolute inset-[16%] rounded-full border border-violet/10 animate-spin-slow" />

      {/* ambient glow field behind everything */}
      <div className="absolute h-[70%] w-[70%] rounded-full bg-cyan/10 blur-[70px]" />
      <div className="absolute h-[55%] w-[55%] rounded-full bg-indigo/10 blur-[60px]" />

      {!imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brainai.png"
          alt="BrainAI — AI Multi Engine Router core"
          onError={() => setImgFailed(true)}
          className="relative z-20 h-[100%] w-auto object-contain drop-shadow-[0_0_45px_rgba(0,212,255,0.45)]"
        />
      ) : (
        <GeneratedBrain />
      )}
      <ProviderOrbit/>

      {/* orbiting nodes */}
      <motion.div
        className="absolute h-[76%] w-[76%]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-glow-cyan" />
        <span className="absolute bottom-[10%] right-[8%] h-1 w-1 rounded-full bg-violet shadow-glow-violet" />
        <span className="absolute bottom-[6%] left-[10%] h-1 w-1 rounded-full bg-indigo shadow-glow-indigo" />
      </motion.div>
    </div>
  );
}

function GeneratedBrain() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="relative z-10 h-[72%] w-auto drop-shadow-[0_0_45px_rgba(0,212,255,0.45)]"
      fill="none"
    >
      <defs>
        <linearGradient id="brainStroke" x1="0" y1="0" x2="200" y2="160">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="55%" stopColor="#5B5BFF" />
          <stop offset="100%" stopColor="#B14EFF" />
        </linearGradient>
      </defs>
      <motion.path
        d="M60 24C40 24 26 40 26 58c0 8 3 15 8 20-5 6-8 13-8 21 0 20 16 36 36 36h4v-6M60 24c14 0 22 10 24 18M60 24c-6-8-16-12-24-8M60 129h4c10 0 18-4 24-11M46 78h20M42 96h24M50 60h16M34 78c0-8 4-14 10-18"
        stroke="url(#brainStroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      <motion.path
        d="M140 24c20 0 34 16 34 34 0 8-3 15-8 20 5 6 8 13 8 21 0 20-16 36-36 36h-4v-6M140 24c-14 0-22 10-24 18M140 24c6-8 16-12 24-8M140 129h-4c-10 0-18-4-24-11M154 78h-20M158 96h-24M150 60h-16M166 78c0-8-4-14-10-18"
        stroke="url(#brainStroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.line
        x1="100"
        y1="40"
        x2="100"
        y2="120"
        stroke="url(#brainStroke)"
        strokeWidth="1.5"
        strokeDasharray="2 4"
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.6 }}
      />
    </svg>
  );
}
