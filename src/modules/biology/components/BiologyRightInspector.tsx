"use client";

import React, { useState } from "react";
import {
  ALL_TOPICS,
  BIO_FLASHCARDS,
  BIO_FORMULAS,
} from "@/modules/biology/data";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import { CheckSquare, FlaskConical, Brain, StickyNote, X } from "lucide-react";

type InspectorTab = "markscheme" | "formulas" | "recall" | "notes";

export function BiologyRightInspector() {
  const {
    activeTopicId,
    isInspectorOpen,
    toggleInspector,
    topicNotes,
    setTopicNote,
  } = useStudyStore();

  const [tab, setTab] = useState<InspectorTab>("markscheme");
  const [revealRecall, setRevealRecall] = useState(false);

  if (!isInspectorOpen) return null;

  const topic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  const topicCard =
    BIO_FLASHCARDS.find((c) => c.topicId === topic.id) ?? BIO_FLASHCARDS[0];

  const matchingFormulas = BIO_FORMULAS.filter((f) =>
    f.topicCode.includes(topic.displayCode)
  );

  return (
    <aside className="hidden xl:flex flex-col w-[320px] 2xl:w-[344px] ml-5 shrink-0 h-[calc(100vh-4.5rem)] sticky top-[56px] rounded-3xl liquid-glass-elevated p-4 gap-3 select-none overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-green-300/80">
            IB Exam Companion
          </p>
          <h3 className="text-sm font-semibold text-white">
            {topic.displayCode} · {topic.level}
          </h3>
        </div>
        <button
          onClick={toggleInspector}
          className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] text-white/60 hover:text-white cursor-pointer"
          title="Close Inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Pill Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-black/45 border border-white/10 rounded-2xl p-1 text-[10px] font-mono">
        <button
          onClick={() => setTab("markscheme")}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl cursor-pointer transition-colors ${
            tab === "markscheme"
              ? "bg-green-500/25 text-green-200 font-semibold"
              : "text-white/50 hover:text-white"
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Mark</span>
        </button>
        <button
          onClick={() => setTab("formulas")}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl cursor-pointer transition-colors ${
            tab === "formulas"
              ? "bg-green-500/25 text-green-200 font-semibold"
              : "text-white/50 hover:text-white"
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Terms</span>
        </button>
        <button
          onClick={() => setTab("recall")}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl cursor-pointer transition-colors ${
            tab === "recall"
              ? "bg-green-500/25 text-green-200 font-semibold"
              : "text-white/50 hover:text-white"
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Recall</span>
        </button>
        <button
          onClick={() => setTab("notes")}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl cursor-pointer transition-colors ${
            tab === "notes"
              ? "bg-green-500/25 text-green-200 font-semibold"
              : "text-white/50 hover:text-white"
          }`}
        >
          <StickyNote className="w-3.5 h-3.5" />
          <span>Notes</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 text-xs">
        {tab === "markscheme" && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-black/45 border border-white/10 p-3 space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-green-300">
                Command Term: {topic.examBlueprint.commandTerm}
              </div>
              <p className="text-white font-medium">
                {topic.examBlueprint.paper2StructuredPrompt}
              </p>
            </div>
            <div className="rounded-2xl bg-green-500/10 border border-green-400/25 p-3 space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-green-300">
                Mark Scheme Points
              </div>
              <p className="text-white/85 leading-relaxed">
                {topic.examBlueprint.idealSolutionBreakdown.keyMarkSchemePoints}
              </p>
            </div>
            <div className="rounded-2xl bg-amber-500/10 border border-amber-400/25 p-3 space-y-1">
              <div className="text-[10px] font-mono uppercase text-amber-300">
                Pitfalls to Avoid
              </div>
              <ul className="space-y-1 text-white/75">
                {topic.examBlueprint.pitfallsToAvoid.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "formulas" && (
          <div className="space-y-3">
            {topic.primaryFormulas.length > 0 && (
              <div className="rounded-2xl bg-black/45 border border-green-400/25 p-3 space-y-2">
                <div className="text-[10px] font-mono uppercase text-green-300">
                  Topic Equations
                </div>
                {topic.primaryFormulas.map((f, i) => (
                  <div key={i} className="overflow-x-auto py-1">
                    <MathFormula formula={f} className="text-green-200" />
                  </div>
                ))}
              </div>
            )}
            {(matchingFormulas.length > 0
              ? matchingFormulas
              : BIO_FORMULAS.slice(0, 3)
            ).map((f) => (
              <div
                key={f.id}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 space-y-1.5"
              >
                <div className="font-semibold text-white">{f.name}</div>
                <div className="overflow-x-auto">
                  <MathFormula formula={f.latex} className="text-green-200" />
                </div>
                <p className="text-[11px] text-white/60">{f.examTip}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "recall" && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-black/45 border border-white/10 p-3.5 space-y-3">
              <div className="text-[10px] font-mono uppercase text-lime-300">
                Quick Recall ({topicCard.topicCode})
              </div>
              <p className="text-white font-medium leading-relaxed">
                {topicCard.front}
              </p>
              <button
                onClick={() => setRevealRecall((r) => !r)}
                className="w-full py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-400/35 text-green-200 font-semibold cursor-pointer"
              >
                {revealRecall ? "Hide Answer" : "Reveal Answer"}
              </button>
              {revealRecall && (
                <p className="text-white/85 leading-relaxed border-t border-white/10 pt-2.5">
                  {topicCard.back}
                </p>
              )}
            </div>
          </div>
        )}

        {tab === "notes" && (
          <div className="space-y-2 h-full flex flex-col">
            <div className="text-[10px] font-mono uppercase text-white/50">
              Personal Notes · {topic.displayCode}
            </div>
            <textarea
              value={topicNotes[topic.id] || ""}
              onChange={(e) => setTopicNote(topic.id, e.target.value)}
              placeholder={`Write your ${topic.displayCode} IA/exam notes here...`}
              className="flex-1 min-h-[240px] w-full rounded-2xl bg-black/50 border border-white/15 p-3 text-xs text-white placeholder-white/35 focus:outline-none focus:border-green-400/50 resize-none"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
