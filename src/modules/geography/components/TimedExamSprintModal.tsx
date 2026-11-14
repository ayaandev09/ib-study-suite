"use client";

import React, { useEffect, useState } from "react";
import { X, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/geography/data";

export function TimedExamSprintModal() {
  const { isExamSprintActive, closeExamSprint, activeTopicId } = useStudyStore();
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [running, setRunning] = useState(true);

  const topic = ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];

  useEffect(() => {
    if (!isExamSprintActive || !running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isExamSprintActive, running]);

  if (!isExamSprintActive) return null;

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-[28px] border border-teal-500/30 bg-[#041010] p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-mono uppercase tracking-[0.18em]">
            <Timer className="w-4 h-4" />
            <span>IB Geography Timed Sprint</span>
          </div>
          <button
            onClick={closeExamSprint}
            className="h-8 w-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center py-4 rounded-2xl bg-teal-950/30 border border-teal-500/20">
          <div className="text-5xl font-black font-mono text-white tracking-wider">
            {mins}:{secs}
          </div>
          <div className="text-xs text-teal-300 mt-2">
            {topic.topicCode} · {topic.examBlueprint.commandTerm} Essay Drill
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-sm text-white/85">
          {topic.examBlueprint.paper2StructuredPrompt}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/25 border border-teal-400/35 text-xs font-semibold text-teal-100"
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{running ? "Pause" : "Resume"}</span>
          </button>
          <button
            onClick={() => {
              setSecondsLeft(20 * 60);
              setRunning(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/75"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset 20m</span>
          </button>
        </div>
      </div>
    </div>
  );
}
