"use client";

import React, { useState, useEffect, useRef } from "react";
import { TopicData } from "@/modules/physics/data";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Award,
  Layers,
  BookOpen,
  Atom,
} from "lucide-react";

interface TimedExamSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: TopicData;
}

type SprintDuration = 15 | 30 | 45;

export function TimedExamSprintModal({
  isOpen,
  onClose,
  topic,
}: TimedExamSprintModalProps) {
  const [durationMinutes, setDurationMinutes] = useState<SprintDuration>(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [isSelfGrading, setIsSelfGrading] = useState(false);
  const [essayContent, setEssayContent] = useState("");
  const [copied, setCopied] = useState(false);

  // Self-grading checklist
  const [rubricScores, setRubricScores] = useState({
    principles: false,
    formula: false,
    substitution: false,
    units: false,
    evaluation: false,
  });

  // Load saved essay draft from local storage if available
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(`exam_sprint_physics_${topic.id}`);
      if (saved) setEssayContent(saved);
      setIsRunning(true);
      setSecondsRemaining(durationMinutes * 60);
    }
  }, [isOpen, topic.id, durationMinutes]);

  // Autosave essay text
  useEffect(() => {
    if (isOpen && essayContent) {
      localStorage.setItem(`exam_sprint_physics_${topic.id}`, essayContent);
    }
  }, [isOpen, essayContent, topic.id]);

  // Countdown timer engine
  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isRunning]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder
      .toString()
      .padStart(2, "0")}`;
  };

  const wordCount = essayContent.trim()
    ? essayContent.trim().split(/\s+/).length
    : 0;

  const handleCopyDraft = () => {
    if (essayContent.trim()) {
      navigator.clipboard.writeText(essayContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetTimer = () => {
    setSecondsRemaining(durationMinutes * 60);
    setIsRunning(true);
  };

  const handleDurationChange = (newDuration: SprintDuration) => {
    setDurationMinutes(newDuration);
    setSecondsRemaining(newDuration * 60);
    setIsRunning(true);
  };

  const totalScore = Object.values(rubricScores).filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl my-auto rounded-3xl p-5 sm:p-7 border border-cyan-500/40 bg-slate-950/95 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] text-white relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Sprint Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 shrink-0 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-cyan-500/20 border border-cyan-400/35 text-cyan-300">
              <Timer className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  Timed Exam Sprint // Paper 2 Simulation
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  {topic.displayCode}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {topic.title}
              </h2>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3">
            {/* Duration Pills */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-2xl border border-white/10">
              {([15, 30, 45] as SprintDuration[]).map((dur) => (
                <button
                  key={dur}
                  onClick={() => handleDurationChange(dur)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    durationMinutes === dur
                      ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {dur}m
                </button>
              ))}
            </div>

            {/* Countdown Badge */}
            <div
              className={`px-3 py-1.5 rounded-2xl font-mono text-base sm:text-lg font-bold tracking-wider flex items-center gap-2 border ${
                secondsRemaining < 120
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                  : "bg-white/[0.06] text-white border-white/15"
              }`}
            >
              <span>{formatTime(secondsRemaining)}</span>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-1 hover:text-cyan-300 transition-colors"
                title={isRunning ? "Pause Sprint" : "Resume Sprint"}
              >
                {isRunning ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={handleResetTimer}
                className="p-1 hover:text-cyan-300 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="Close Sprint"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/30 mb-4 shrink-0">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-1.5">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Official Exam Prompt
            </span>
            <span className="text-slate-400">
              Command Term: {topic.examBlueprint?.commandTerm || "Explain"}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-100 leading-relaxed font-serif">
            {topic.examBlueprint?.paper2StructuredPrompt ||
              topic.examPromptTakeaway ||
              `Explain the physical principles governing ${topic.title} and outline the fundamental conservation laws involved.`}
          </p>
        </div>

        {/* Writing Canvas / Split Self-Grading */}
        <div className="flex-1 min-h-[220px] flex flex-col mb-4 overflow-hidden relative">
          <textarea
            value={essayContent}
            onChange={(e) => setEssayContent(e.target.value)}
            placeholder="Structure your Paper 2 response: State fundamental principles, declare assumptions, write out the governing equations, show calculation steps, and provide units..."
            className="w-full flex-1 p-4 rounded-2xl bg-slate-900/70 border border-white/10 focus:border-cyan-400/50 text-slate-100 placeholder-slate-400 font-serif leading-relaxed text-sm focus:outline-none resize-none subtle-scrollbar"
          />

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 px-1">
            <div className="flex items-center gap-4">
              <span>
                Word Count:{" "}
                <strong className="text-cyan-300">{wordCount}</strong>
              </span>
              <span>
                Target:{" "}
                <span className="text-slate-300">
                  {durationMinutes === 15
                    ? "180–250 words"
                    : durationMinutes === 30
                    ? "400–600 words"
                    : "700+ words"}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyDraft}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copied ? "Copied" : "Copy Draft"}</span>
              </button>

              <button
                onClick={() => setIsSelfGrading(!isSelfGrading)}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all font-semibold ${
                  isSelfGrading
                    ? "bg-purple-500/25 text-purple-200 border border-purple-400/40"
                    : "bg-white/5 text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Band 7 Self-Rubric</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Band 7 Self-Grading Rubric */}
        {isSelfGrading && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 shrink-0 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-1">
              <span className="font-bold flex items-center gap-1.5 uppercase">
                <GraduationCap className="w-4 h-4" />
                Examiner Assessment Rubric ({totalScore} / 5 Criteria Checked)
              </span>
              <span className="text-[11px] text-slate-400">
                Official IB Physics SL / HL Standard
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rubricScores.principles}
                  onChange={(e) =>
                    setRubricScores({
                      ...rubricScores,
                      principles: e.target.checked,
                    })
                  }
                  className="rounded text-cyan-500"
                />
                <span>Stated fundamental physical principles</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rubricScores.formula}
                  onChange={(e) =>
                    setRubricScores({
                      ...rubricScores,
                      formula: e.target.checked,
                    })
                  }
                  className="rounded text-cyan-500"
                />
                <span>Quoted relevant Data Booklet equations</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rubricScores.substitution}
                  onChange={(e) =>
                    setRubricScores({
                      ...rubricScores,
                      substitution: e.target.checked,
                    })
                  }
                  className="rounded text-cyan-500"
                />
                <span>Correct values and step-by-step algebra</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rubricScores.units}
                  onChange={(e) =>
                    setRubricScores({
                      ...rubricScores,
                      units: e.target.checked,
                    })
                  }
                  className="rounded text-cyan-500"
                />
                <span>Appropriate SI units &amp; significant figures</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer sm:col-span-2">
                <input
                  type="checkbox"
                  checked={rubricScores.evaluation}
                  onChange={(e) =>
                    setRubricScores({
                      ...rubricScores,
                      evaluation: e.target.checked,
                    })
                  }
                  className="rounded text-cyan-500"
                />
                <span>Evaluated physical limits / assumptions</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
