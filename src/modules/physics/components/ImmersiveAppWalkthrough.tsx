"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  Compass,
  Atom,
  Calculator,
  Timer,
  Edit3,
} from "lucide-react";
import { StudyGoal } from "@/modules/physics/store/useStudyStore";

interface ImmersiveAppWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGoal?: (goal: StudyGoal) => void;
  isInspectorOpen?: boolean;
  onOpenInspector?: () => void;
}

export function ImmersiveAppWalkthrough({
  isOpen,
  onClose,
  onSelectGoal,
  isInspectorOpen,
  onOpenInspector,
}: ImmersiveAppWalkthroughProps) {
  const [step, setStep] = useState(0);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenAppWalkthrough_physics_v1", "true");
    }
    onClose();
  };

  if (!isOpen) return null;

  const steps = [
    {
      title: "Welcome to Quantum & Cosmos",
      subtitle: "The Flagship IB Physics SL / HL Study Suite",
      description:
        "Engineered for the 2025–2026 syllabus with an imperial Liquid Glass interface, interactive diagram simulations, and offline-first persistence.",
      icon: <Atom className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Interactive Bento Topic Cards",
      subtitle: "Derivations & Conceptual Depth",
      description:
        "Every topic includes step-by-step mathematical proofs, official Data Booklet formulas rendered in KaTeX, and real-world astrophysics / engineering applications.",
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Analytical Pro Inspector & Notes",
      subtitle: "Active Recall & Academic Handwritten Notes",
      description:
        "Press ⌘I anytime to toggle the right inspector. Flip through active recall cards, copy formulas, check Band 7 criteria, and write in the ruled academic notebook canvas.",
      icon: <Edit3 className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Timed Exam Sprint Simulator",
      subtitle: "Paper 1 & Paper 2 Exam Conditioning",
      description:
        "Press ⌘E to launch a timed 15m, 30m, or 45m sprint with live word counting and self-grading rubric criteria.",
      icon: <Timer className="w-6 h-6 text-emerald-400" />,
    },
  ];

  const current = steps[step];

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-cyan-500/40 bg-slate-950/95 p-6 shadow-2xl text-white relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Walkthrough Tour · Step {step + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={handleFinish}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-4">
          {current.icon}
        </div>

        <h3 className="text-lg font-bold text-white mb-1">{current.title}</h3>
        <h4 className="text-xs font-mono text-cyan-300 mb-3">{current.subtitle}</h4>
        <p className="text-xs text-slate-300 leading-relaxed mb-6 font-serif">
          {current.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === step ? "bg-cyan-400 w-5" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Get Started</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
