"use client";

import React, { useState, useEffect } from "react";
import { X, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/biology/data";

export function TimedExamSprintModal() {
  const { isExamSprintActive, closeExamSprint, activeTopicId } = useStudyStore();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [running, setRunning] = useState(false);

  const topic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  useEffect(() => {
    if (!isExamSprintActive || !running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isExamSprintActive, running]);

  if (!isExamSprintActive) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={closeExamSprint}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="liquid-glass-elevated rounded-3xl p-6 max-w-md w-full space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-300 text-xs font-mono uppercase">
            <Timer className="w-4 h-4" />
            IB Biology Paper 2 Sprint
          </div>
          <button
            onClick={closeExamSprint}
            className="p-1.5 rounded-xl bg-white/10 text-white/70 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center py-4 rounded-2xl bg-black/50 border border-white/10">
          <div className="text-5xl font-mono font-bold text-white tracking-wider">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
          <p className="text-xs text-white/55 mt-2">
            Focus Prompt ({topic.displayCode}):{" "}
            {topic.examBlueprint.paper2StructuredPrompt}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white text-black text-xs font-semibold cursor-pointer"
          >
            {running ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black" /> Start Sprint
              </>
            )}
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setSecondsLeft(15 * 60);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/10 text-white text-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
