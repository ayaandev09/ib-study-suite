"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Check,
  Sparkles,
  Loader2,
} from "lucide-react";
import { MODULE_CATALOG } from "@/data/modulesMeta";
import { AppId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { soundEngine } from "@/lib/soundEngine";

interface InteractiveWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteSetup: () => void;
  isDemoMode?: boolean;
}

const USER_NAME_KEY = "ib_suite_user_name_v1";
const SELECTED_SUBJECTS_KEY = "ib_suite_selected_subjects_v1";
const SUBJECT_LEVELS_KEY = "ib_suite_subject_levels_v1";

type TourStep = {
  id: string;
  target: string;
  eyebrow: string;
  title: string;
  description: string;
  glowColor: string;
};

const TOUR_STEPS: TourStep[] = [
  {
    id: "topbar",
    target: '[data-tour="topbar"]',
    eyebrow: "01 · COMMAND BAR",
    title: "Safari-Style Top Bar",
    description:
      "Switch between your Dashboard, live open subject tabs, Split View, and browser-style Back/Forward history without ever losing your place.",
    glowColor: "rgba(56, 189, 248, 0.72)",
  },
  {
    id: "search",
    target: '[data-tour="search-trigger"]',
    eyebrow: "02 · UNIVERSAL AI SEARCH",
    title: "Instant Cross-Subject Search (⌘K)",
    description:
      "Search formulas, case studies, or Paper 1/2 exam traps across all 7 IB subjects with typo tolerance and 1-click jumps.",
    glowColor: "rgba(129, 140, 248, 0.75)",
  },
  {
    id: "cockpit",
    target: '[data-tour="cockpit"]',
    eyebrow: "03 · STUDY COCKPIT",
    title: "Live Clocks & Calendar Sync",
    description:
      "Keep track of your live study session alongside upcoming Apple Calendar deadlines right from your home cockpit.",
    glowColor: "rgba(20, 184, 166, 0.75)",
  },
  {
    id: "subjects-grid",
    target: '[data-tour="subjects-grid"]',
    eyebrow: "04 · SUBJECT MODULES",
    title: "7 Unified IB Study Modules",
    description:
      "Each card launches an entire interactive syllabus codex—complete with SL/HL filtering, Theme Matrices, flashcards, and timed sprints.",
    glowColor: "rgba(34, 197, 94, 0.72)",
  },
];

const TOTAL_STEPS = TOUR_STEPS.length + 2; // 4 spotlight + subject select + level select

export function InteractiveWalkthrough({
  isOpen,
  onClose,
  onCompleteSetup,
  isDemoMode = false,
}: InteractiveWalkthroughProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userName, setUserName] = useState("Ayaan");
  const [selectedSubjects, setSelectedSubjects] = useState<AppId[]>(() =>
    Object.keys(MODULE_CATALOG) as AppId[]
  );
  const [subjectLevels, setSubjectLevels] = useState<Record<AppId, "SL" | "HL">>({
    biology: "HL",
    geography: "HL",
    physics: "SL",
    economics: "SL",
    business: "HL",
    orwell: "HL",
    german: "SL",
  });

  const [spotlightRect, setSpotlightRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedName = localStorage.getItem(USER_NAME_KEY);
    if (savedName) setUserName(savedName);
  }, []);

  // Measure target element rect for fluid spotlight
  const updateRect = useCallback(() => {
    if (!isOpen || stepIndex >= TOUR_STEPS.length) {
      setSpotlightRect(null);
      return;
    }
    const step = TOUR_STEPS[stepIndex];
    const el = document.querySelector(step.target) as HTMLElement | null;
    if (!el) {
      setSpotlightRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < 50 || r.bottom > window.innerHeight - 40) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const pad = 6;
    setSpotlightRect({
      top: Math.max(4, r.top - pad),
      left: Math.max(4, r.left - pad),
      width: Math.min(window.innerWidth - 8, r.width + pad * 2),
      height: Math.min(window.innerHeight - 8, r.height + pad * 2),
    });
  }, [isOpen, stepIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const t1 = setTimeout(updateRect, 40);
    const t2 = setTimeout(updateRect, 260);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [isOpen, stepIndex, updateRect]);

  // Ambient background sound throughout walkthrough (pure Web Audio API, no media session)
  useEffect(() => {
    if (!isOpen) return;
    setStepIndex(0);
    setIsSettingUp(false);

    soundEngine.startWalkthroughAmbient();

    return () => {
      soundEngine.stopWalkthroughAmbient();
    };
  }, [isOpen]);

  const playStepChime = useCallback(() => {
    soundEngine.playPop();
  }, []);

  const handleLaunchDashboard = useCallback(() => {
    setIsSettingUp(true);
    if (typeof window !== "undefined") {
      if (userName.trim()) {
        localStorage.setItem(USER_NAME_KEY, userName.trim());
        window.dispatchEvent(
          new CustomEvent("ib-suite-user-updated", {
            detail: { name: userName.trim() },
          })
        );
      }
      localStorage.setItem(SELECTED_SUBJECTS_KEY, JSON.stringify(selectedSubjects));
      localStorage.setItem(SUBJECT_LEVELS_KEY, JSON.stringify(subjectLevels));
    }
    const store = useWorkspaceStore.getState();
    store.setEnabledSubjects(selectedSubjects);
    store.setSubjectLevels(subjectLevels);

    setTimeout(() => {
      setIsSettingUp(false);
      onCompleteSetup();
    }, 1450);
  }, [userName, selectedSubjects, subjectLevels, onCompleteSetup]);

  if (!isOpen) return null;

  const isTourPhase = stepIndex < TOUR_STEPS.length;
  const isSubjectsPhase = stepIndex === TOUR_STEPS.length;
  const isLevelsPhase = stepIndex === TOUR_STEPS.length + 1;
  const currentTour = isTourPhase ? TOUR_STEPS[stepIndex] : null;

  const toggleSubject = (id: AppId) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((x) => x !== id) : prev;
      }
      return [...prev, id];
    });
  };

  // Compute clean non-overlapping position for the frosted Liquid Glass tooltip card
  const getTooltipStyle = (): React.CSSProperties => {
    if (!spotlightRect) {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }
    const cardW = 360;
    const cardH = 215;
    const margin = 18;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    // Prefer placing below spotlight if room; otherwise above; otherwise centered bottom
    const spaceBelow = vh - (spotlightRect.top + spotlightRect.height);
    const spaceAbove = spotlightRect.top;

    let top = spotlightRect.top + spotlightRect.height + margin;
    if (spaceBelow < cardH + margin && spaceAbove > cardH + margin) {
      top = spotlightRect.top - cardH - margin;
    } else if (spaceBelow < cardH + margin) {
      top = Math.max(margin, vh - cardH - margin - 12);
    }

    let left = spotlightRect.left + spotlightRect.width / 2 - cardW / 2;
    left = Math.max(margin, Math.min(vw - cardW - margin, left));

    return { top, left, width: cardW };
  };

  return (
    <div className="fixed inset-0 z-[95] pointer-events-auto select-none">
      {/* Spotlight Scrim & Glowing Cutout Ring */}
      {isTourPhase && spotlightRect && !isSettingUp ? (
        <div
          className="fixed rounded-2xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
            boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.68), 0 0 36px ${currentTour?.glowColor || "rgba(94,234,212,0.75)"}, inset 0 0 14px rgba(255,255,255,0.22)`,
            border: "1.5px solid rgba(255, 255, 255, 0.72)",
          }}
        />
      ) : (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300" />
      )}

      {/* Phase 1: Small Frosted Liquid Glass Bento Tooltip */}
      {isTourPhase && currentTour && !isSettingUp && (
        <motion.div
          key={currentTour.id}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={getTooltipStyle()}
          className="fixed z-[96] rounded-[24px] border border-white/25 bg-[#081016]/85 backdrop-blur-2xl p-5 shadow-[0_24px_64px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.28)] space-y-3.5"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-teal-300">
                {currentTour.eyebrow}
              </span>
              {isDemoMode && (
                <span className="px-1.5 py-0.5 rounded bg-teal-500/20 border border-teal-400/35 text-[9px] font-mono text-teal-200">
                  DEMO
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted((m) => !m)}
                className="h-6 w-6 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center text-white/70"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-teal-300" />
                )}
              </button>
              <button
                onClick={onClose}
                className="h-6 w-6 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] flex items-center justify-center text-white/60 hover:text-white"
                title="Skip Walkthrough"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">{currentTour.title}</h3>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              {currentTour.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === stepIndex ? "w-5 bg-white" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {stepIndex > 0 && (
                <button
                  onClick={() => {
                    playStepChime();
                    setStepIndex((s) => s - 1);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] text-xs font-medium text-white/80 flex items-center gap-0.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              )}
              <button
                onClick={() => {
                  playStepChime();
                  setStepIndex((s) => s + 1);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-bold flex items-center gap-1 shadow-[0_4px_16px_rgba(255,255,255,0.22)]"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Phase 2 & 3: Subject & Level Selection (Centered Frosted Liquid Glass Bento) */}
      {(isSubjectsPhase || isLevelsPhase) && !isSettingUp && (
        <div className="fixed inset-0 z-[96] flex items-center justify-center p-4">
          <motion.div
            key={isSubjectsPhase ? "subjects" : "levels"}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl rounded-[28px] border border-white/20 bg-[#070d12]/90 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_32px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-teal-300">
                {isSubjectsPhase ? "05 · SELECT SUBJECTS" : "06 · SELECT LEVELS"}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMuted((m) => !m)}
                  className="h-7 px-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] flex items-center gap-1 text-[11px] text-white/70"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-teal-300" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="h-7 w-7 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isSubjectsPhase ? (
              <>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Which IB subjects are you taking?
                  </h2>
                  <p className="text-xs text-white/60 mt-1">
                    Select all that apply—we&apos;ll tailor your study workspace.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.values(MODULE_CATALOG).map((mod) => {
                    const active = selectedSubjects.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleSubject(mod.id)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-2xl border text-left transition-all ${
                          active
                            ? "bg-white/15 border-teal-400/50 text-white shadow-[0_0_16px_rgba(20,184,166,0.18)]"
                            : "bg-white/[0.03] border-white/10 text-white/55 hover:text-white"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{mod.title}</div>
                          <div className="text-[10px] text-white/45 truncate">
                            {mod.clusterLabel}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                            active
                              ? "bg-teal-400 border-teal-300 text-black"
                              : "border-white/20"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Choose SL or HL &amp; Your Name
                  </h2>
                  <p className="text-xs text-white/60 mt-1">
                    Each module filters HL-only concepts and exam questions automatically.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Your Name
                  </label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                  {selectedSubjects.map((id) => {
                    const mod = MODULE_CATALOG[id];
                    const lvl = subjectLevels[id] || "HL";
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10"
                      >
                        <span className="text-xs font-semibold text-white">
                          {mod.shortTitle}
                        </span>
                        <div className="flex items-center rounded-lg bg-black/60 border border-white/10 p-0.5">
                          {(["SL", "HL"] as const).map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                setSubjectLevels((prev) => ({
                                  ...prev,
                                  [id]: option,
                                }))
                              }
                              className={`px-3 py-1 rounded-md text-[11px] font-mono font-bold transition-colors ${
                                lvl === option
                                  ? "bg-white text-black"
                                  : "text-white/50 hover:text-white"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  playStepChime();
                  setStepIndex((s) => Math.max(0, s - 1));
                }}
                className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-white/80 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {isSubjectsPhase ? (
                <button
                  onClick={() => {
                    playStepChime();
                    setStepIndex((s) => s + 1);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-bold flex items-center gap-1"
                >
                  <span>Next: Choose Levels</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleLaunchDashboard}
                  className="px-5 py-2 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-bold flex items-center gap-1.5 shadow-[0_0_24px_rgba(20,184,166,0.35)]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Finish &amp; Launch</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Phase 4: "Setting up your dashboard..." transition before SuiteStartupIntro */}
      <AnimatePresence>
        {isSettingUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[98] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
          >
            <div className="rounded-[28px] border border-white/20 bg-white/[0.05] px-8 py-7 text-center space-y-3 shadow-2xl">
              <Loader2 className="w-7 h-7 text-teal-300 animate-spin mx-auto" />
              <div className="text-lg font-bold text-white">
                Setting up your dashboard…
              </div>
              <p className="text-xs text-white/55 font-mono">
                Configuring {selectedSubjects.length} IB modules &amp; SL/HL levels
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
