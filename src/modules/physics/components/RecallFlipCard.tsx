"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles, CheckCircle2, Flame, Zap } from "lucide-react";
import { syncWidgetSnapshot } from "@/modules/physics/lib/widgetBridge";

export interface RecallFlipCardProps {
  moduleCode: string;
  title: string;
  prompt: string;
  answer: string;
  accent?: string;
  secondary?: string;
  meta?: string;
}

export function RecallFlipCard({
  moduleCode,
  title,
  prompt,
  answer,
  accent = "#06b6d4",
  secondary = "#991b1b",
  meta = "ACTIVE RECALL",
}: RecallFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [confidence, setConfidence] = useState<"review" | "good" | "mastered" | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setFlipped((value) => !value);
    syncWidgetSnapshot("flip");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5.5;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 4.5;
    setTilt({ rotateX, rotateY, glareX: pctX, glareY: pctY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full cursor-pointer select-none group"
      style={{ perspective: "1400px" }}
      data-recall-module={moduleCode}
      role="button"
      tabIndex={0}
      aria-label={`Active recall card for ${moduleCode}`}
      onClick={toggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <motion.div
        className="relative w-full rounded-2xl transition-all"
        animate={{
          rotateY: flipped ? 180 : 0,
          rotateX: tilt.rotateX,
        }}
        transition={{
          rotateY: { duration: 0.44, ease: [0.16, 1, 0.3, 1] },
          rotateX: { duration: 0.12, ease: "easeOut" },
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Face: Question / Prompt */}
        <div
          className={`relative rounded-2xl p-4 border transition-all ${
            flipped ? "pointer-events-none opacity-0" : "opacity-100"
          } bg-[#060402]/90 border-cyan-500/20 shadow-xl overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Subtle Glare Specular Highlight */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(251,191,36,0.18) 0%, transparent 60%)`,
            }}
          />

          <div className="flex items-center justify-between gap-2 text-[10px] font-mono mb-2.5">
            <span
              className="px-2 py-0.5 rounded-full font-bold uppercase tracking-wider truncate"
              style={{
                backgroundColor: `${accent}20`,
                borderColor: `${accent}40`,
                color: accent,
              }}
            >
              {meta} · {moduleCode}
            </span>
            <span className="text-slate-400 flex items-center gap-1 whitespace-nowrap shrink-0">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Flip
            </span>
          </div>

          <p className="text-sm font-semibold text-white mb-1.5">{title}</p>
          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-serif italic mb-3">
            &ldquo;{prompt}&rdquo;
          </p>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
            <span>Recall Prompt</span>
            <span className="font-mono text-cyan-300 font-bold">Space / Click</span>
          </div>
        </div>

        {/* Back Face: Answer / Key Derivation */}
        <div
          className={`absolute inset-0 rounded-2xl p-4 border transition-all ${
            flipped ? "opacity-100" : "pointer-events-none opacity-0"
          } bg-gradient-to-br from-[#060402]/95 to-black/95 border-cyan-500/40 shadow-2xl overflow-y-auto`}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-emerald-300 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              MODEL ANSWER
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              Flip Back
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans mb-3">
            {answer}
          </p>

          {/* Confidence self-rating pills */}
          <div
            className="flex items-center gap-1.5 pt-2 border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-slate-400 font-mono mr-1">
              Rate:
            </span>
            <button
              onClick={() => setConfidence("review")}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                confidence === "review"
                  ? "bg-rose-500/30 text-rose-300 border border-rose-500/50"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Review
            </button>
            <button
              onClick={() => setConfidence("good")}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                confidence === "good"
                  ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Good
            </button>
            <button
              onClick={() => setConfidence("mastered")}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                confidence === "mastered"
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Mastered
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
