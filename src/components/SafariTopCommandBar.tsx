"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { MODULE_CATALOG, SUBJECT_CLUSTERS } from "@/data/modulesMeta";
import { SubjectCluster, AppId } from "@/types/workspace";
import {
  LayoutGrid,
  Plus,
  X,
  Sparkles,
  Home,
  Search,
  Timer,
  Keyboard,
  Globe,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UniversalSearchModal } from "./UniversalSearchModal";
import { useSoundStore } from "@/store/useSoundStore";
import { soundEngine } from "@/lib/soundEngine";

const SUBJECT_COLORS: Record<string, { base: string; border: string; bg: string }> = {
  orwell: { base: "#f43f5e", border: "rgba(244, 63, 94, 0.35)", bg: "rgba(244, 63, 94, 0.18)" },
  biology: { base: "#22c55e", border: "rgba(34, 197, 94, 0.4)", bg: "rgba(34, 197, 94, 0.18)" },
  business: { base: "#2563eb", border: "rgba(37, 99, 235, 0.4)", bg: "rgba(37, 99, 235, 0.2)" },
  economics: { base: "#0ea5e9", border: "rgba(14, 165, 233, 0.35)", bg: "rgba(14, 165, 233, 0.18)" },
  physics: { base: "#6366f1", border: "rgba(99, 102, 241, 0.35)", bg: "rgba(99, 102, 241, 0.18)" },
  german: { base: "#d946ef", border: "rgba(217, 70, 239, 0.35)", bg: "rgba(217, 70, 239, 0.18)" },
  geography: { base: "#14b8a6", border: "rgba(20, 184, 166, 0.4)", bg: "rgba(20, 184, 166, 0.18)" },
};

export function SafariTopCommandBar() {
  const {
    activeView,
    openInstances,
    primaryInstanceId,
    activateInstance,
    closeInstance,
    toggleExpose,
    isExposeOpen,
    setDashboardView,
    setWorkspaceView,
    openModule,
    triggerAppIntro,
    navHistory,
    navIndex,
    goBack,
    goForward,
    enabledSubjects,
    setSettingsOpen,
    setReleaseNotesOpen,
  } = useWorkspaceStore();

  const { playClick, playPop, playChime } = useSoundStore();

  const enabledModules = Object.values(MODULE_CATALOG).filter((mod) =>
    enabledSubjects.includes(mod.id)
  );

  const canGoBack = navIndex > 0 || activeView === "workspace";
  const canGoForward = navIndex < navHistory.length - 1;

  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [launcherPos, setLauncherPos] = useState<{ top: number; left: number }>({ top: 56, left: 200 });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const launcherRef = useRef<HTMLDivElement>(null);
  const launcherButtonRef = useRef<HTMLButtonElement>(null);
  const launcherMenuRef = useRef<HTMLDivElement>(null);

  // Close launcher when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        launcherRef.current &&
        !launcherRef.current.contains(target) &&
        (!launcherMenuRef.current || !launcherMenuRef.current.contains(target))
      ) {
        setIsLauncherOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateLauncherPosition = () => {
    if (!launcherButtonRef.current) return;
    const rect = launcherButtonRef.current.getBoundingClientRect();
    const menuWidth = 280;
    const clampedLeft = Math.min(
      Math.max(12, rect.left),
      window.innerWidth - menuWidth - 12
    );
    setLauncherPos({ top: rect.bottom + 10, left: clampedLeft });
  };

  useEffect(() => {
    if (!isLauncherOpen) return;
    updateLauncherPosition();
    window.addEventListener("resize", updateLauncherPosition);
    return () => window.removeEventListener("resize", updateLauncherPosition);
  }, [isLauncherOpen]);

  const toggleLauncher = () => {
    if (!isLauncherOpen) {
      updateLauncherPosition();
    }
    setIsLauncherOpen((prev) => !prev);
  };

  // Global ⌘K universal search + ⌘[ / ⌘] Safari Back/Forward
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key === "[") {
        e.preventDefault();
        goBack();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "]") {
        e.preventDefault();
        goForward();
      }
    };
    const handleOpenUniversalSearch = () => {
      setIsSearchModalOpen(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("ib-suite-open-search", handleOpenUniversalSearch);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("ib-suite-open-search", handleOpenUniversalSearch);
    };
  }, [goBack, goForward]);

  const clusters: SubjectCluster[] = [
    "literature",
    "social-sciences",
    "stem-languages",
  ];

  const primaryInstance = openInstances.find(
    (i) => i.instanceId === primaryInstanceId
  );
  const primaryMeta = primaryInstance
    ? MODULE_CATALOG[primaryInstance.appId]
    : null;

  return (
    <>
      <header
        data-tour="topbar"
        className="fixed top-0 left-0 right-0 z-40 h-[calc(52px+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] bg-[#000000]/88 backdrop-blur-md border-b border-white/[0.10] shadow-[0_4px_30px_rgba(0,0,0,0.85)] flex items-center justify-between px-2.5 md:px-3.5 select-none"
        aria-label="Unified macOS Safari Top Command Bar"
      >
        {/* ====================================================================
            1. Left Region: Native macOS Traffic Light Padding + Dashboard Controls
           ==================================================================== */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0 pl-1 md:pl-[76px]">
          {/* Unified Suite Official Liquid Glass Logo Emblem */}
          <button
            onClick={() => {
              playClick();
              if (activeView === "dashboard") {
                setWorkspaceView();
              } else {
                setDashboardView();
              }
            }}
            className="flex items-center gap-2 group cursor-pointer"
            title="IB Study Suite Dashboard (⌘0)"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-black/40 border border-white/20 p-0.5 shadow-[0_0_10px_rgba(255,255,255,0.15)] group-hover:scale-105 group-hover:border-white/50 transition-all shrink-0">
              <img
                src="/logos/suite.svg"
                alt="IB Study Suite"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="hidden xl:inline text-xs font-semibold text-white/90 group-hover:text-white tracking-tight">
              IB Study Suite
            </span>
          </button>

          {/* Safari-Style Back & Forward Navigation Arrows (⌘[ / ⌘]) */}
          <div className="relative z-10 flex items-center rounded-full bg-white/[0.05] border border-white/10 p-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <motion.button
              type="button"
              data-motion="true"
              onClick={() => {
                playPop();
                goBack();
              }}
              disabled={!canGoBack}
              whileHover={canGoBack ? { scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.16)" } : undefined}
              whileTap={canGoBack ? { scale: 0.92 } : undefined}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                canGoBack
                  ? "text-white/90 hover:text-white cursor-pointer"
                  : "text-white/25 cursor-default"
              }`}
              title="Go Back (⌘[)"
              aria-label="Go Back"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              type="button"
              data-motion="true"
              onClick={() => {
                playPop();
                goForward();
              }}
              disabled={!canGoForward}
              whileHover={canGoForward ? { scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.16)" } : undefined}
              whileTap={canGoForward ? { scale: 0.92 } : undefined}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                canGoForward
                  ? "text-white/90 hover:text-white cursor-pointer"
                  : "text-white/25 cursor-default"
              }`}
              title="Go Forward (⌘])"
              aria-label="Go Forward"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Dashboard Home Toggle (⌘0) */}
          <button
            onClick={() => {
              playClick();
              if (activeView === "dashboard") {
                setWorkspaceView();
              } else {
                setDashboardView();
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              activeView === "dashboard"
                ? "bg-white/20 text-white shadow-[0_0_14px_rgba(255,255,255,0.35)] border border-white/25"
                : "bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/[0.12] border border-white/10"
            }`}
            title="Toggle Bento Dashboard (⌘0)"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
            <kbd className="hidden md:inline text-[9px] font-mono text-white/40">
              ⌘0
            </kbd>
          </button>

          {/* Spatial Exposé / Mission Control (⌘E) */}
          <button
            onClick={toggleExpose}
            className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all ${
              isExposeOpen
                ? "bg-white/25 text-white shadow-[0_0_14px_rgba(255,255,255,0.4)]"
                : "bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/[0.12]"
            }`}
            title="Spatial Exposé / Mission Control (⌘E)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {openInstances.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white text-[9px] font-mono flex items-center justify-center text-black font-bold">
                {openInstances.length}
              </span>
            )}
          </button>
        </div>

        {/* ====================================================================
            2. Center Region: Subject Tabs + Safari Smart Search Omnibar
           ==================================================================== */}
        <div className="flex-1 max-w-3xl mx-3 flex items-center gap-2 overflow-hidden">
          {/* A. Unified Subject Tabs */}
          <div className="flex items-center gap-1 max-w-[45vw] overflow-x-auto no-scrollbar">
            {openInstances
              .filter((inst) => Boolean(MODULE_CATALOG[inst.appId]))
              .map((inst) => {
              const isPrimary =
                inst.instanceId === primaryInstanceId &&
                activeView === "workspace";
              const meta = MODULE_CATALOG[inst.appId];
              const clusterMeta = SUBJECT_CLUSTERS[inst.subjectCluster];

              return (
                <div
                  key={inst.instanceId}
                  className="group relative flex items-center shrink-0"
                >
                  <button
                    onClick={() => {
                      if (!isPrimary) {
                        soundEngine.playClick();
                      }
                      activateInstance(inst.instanceId);
                    }}
                    className={`flex items-center gap-1.5 pl-2.5 pr-6 py-1 rounded-full text-xs transition-all duration-200 ${
                      isPrimary
                        ? "text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] border font-semibold"
                        : "text-white/60 hover:text-white hover:bg-white/[0.08] border border-transparent"
                    }`}
                    style={
                      isPrimary
                        ? {
                            backgroundColor: SUBJECT_COLORS[inst.appId]?.bg || "rgba(255, 255, 255, 0.2)",
                            borderColor: SUBJECT_COLORS[inst.appId]?.border || "rgba(255, 255, 255, 0.25)",
                            boxShadow: `0 0 16px ${SUBJECT_COLORS[inst.appId]?.bg || "rgba(255,255,255,0.15)"}, inset 0 1px 0 rgba(255,255,255,0.22)`,
                          }
                        : undefined
                    }
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          isPrimary
                            ? SUBJECT_COLORS[inst.appId]?.base || "#4ade80"
                            : SUBJECT_COLORS[inst.appId]?.base || clusterMeta?.color || "#ffffff",
                      }}
                    />
                    <span className="truncate max-w-[90px] sm:max-w-[120px]">
                      {meta?.shortTitle || inst.title}
                    </span>
                  </button>

                  {/* Micro Close Action on Hover */}
                  <div className="absolute right-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeInstance(inst.instanceId);
                      }}
                      className="p-0.5 rounded-full hover:bg-rose-500/30 text-white/60 hover:text-rose-300 transition-colors"
                      title="Close"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Launch New Instance "+" Button */}
            <div className="relative shrink-0" ref={launcherRef}>
              <button
                ref={launcherButtonRef}
                onClick={toggleLauncher}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                  isLauncherOpen
                    ? "bg-white/20 text-white border-white/35 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    : "bg-white/[0.07] hover:bg-white/[0.16] text-white/75 hover:text-white border-white/10"
                }`}
                title="Open New Study Module"
                aria-expanded={isLauncherOpen}
              >
                <Plus className={`w-3 h-3 transition-transform duration-300 ${isLauncherOpen ? "rotate-45" : ""}`} />
              </button>

              {/* Launcher Dropdown via Portal so it is NEVER clipped by overflow-x-auto */}
              {typeof document !== "undefined" &&
                createPortal(
                  <AnimatePresence>
                    {isLauncherOpen && (
                      <motion.div
                        ref={launcherMenuRef}
                        initial={{ opacity: 0, y: 10, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ type: "spring", mass: 1.05, stiffness: 240, damping: 24 }}
                        style={{
                          position: "fixed",
                          top: launcherPos.top,
                          left: launcherPos.left,
                        }}
                        className="w-[280px] liquid-glass-elevated rounded-2xl p-2.5 z-[9999] border border-white/25 shadow-[0_28px_72px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.28)]"
                      >
                        <div className="px-2.5 py-1 text-[10px] font-semibold text-white/50 uppercase tracking-wider font-mono">
                          Launch IB Study Module
                        </div>
                        <div className="space-y-1 mt-1">
                          {enabledModules.map((mod) => {
                            const subjColor = SUBJECT_COLORS[mod.id]?.base || SUBJECT_CLUSTERS[mod.cluster]?.color || "#ffffff";
                            return (
                              <button
                                key={mod.id}
                                onClick={() => {
                                  soundEngine.playClick();
                                  const store = useWorkspaceStore.getState();
                                  if (!store.seenAppIntros[mod.id]) {
                                    soundEngine.playSubjectIntro(mod.id);
                                  }
                                  openModule(mod.id);
                                  setIsLauncherOpen(false);
                                }}
                                className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-white/[0.12] text-left text-xs transition-colors group cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{
                                      backgroundColor: subjColor,
                                      boxShadow: `0 0 8px ${subjColor}`,
                                    }}
                                  />
                                  <span className="font-medium text-white/90 group-hover:text-white truncate">
                                    {mod.title}
                                  </span>
                                </div>
                                <span className="text-[10px] text-white/45 font-mono shrink-0 ml-2">
                                  {mod.level}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setIsLauncherOpen(false);
                              setSettingsOpen(true);
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-white/[0.08] text-[11px] text-white/65 hover:text-white transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <SlidersHorizontal className="w-3 h-3" />
                              <span>Manage Subjects…</span>
                            </span>
                            <span className="font-mono text-[10px] text-white/40">
                              {enabledModules.length}/{Object.keys(MODULE_CATALOG).length}
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>,
                  document.body
                )}
            </div>
          </div>

          {/* B. Safari Smart Search Omnibar (Universal AI Search Trigger - Clear Siri Liquid Glass Design) */}
          <button
            data-tour="search-trigger"
            onClick={() => setIsSearchModalOpen(true)}
            className="flex-1 min-w-[160px] h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-white/35 flex items-center justify-between px-3 text-xs text-white/70 hover:text-white transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md group cursor-pointer"
            title="Universal Search & Local AI Intelligence (⌘K)"
          >
            <div className="flex items-center gap-2 truncate">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[1px] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <span className="truncate text-white/70 group-hover:text-white">
                Ask AI or search {enabledModules.length}{" "}
                {enabledModules.length === 1 ? "subject" : "subjects"}...
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-white/90">
                <Sparkles className="w-2.5 h-2.5 text-purple-300" />
                <span>Siri AI</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/50">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* ====================================================================
            3. Right Region: Search & Quick Utilities
           ==================================================================== */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Universal Search Trigger Icon */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Open Universal Search (⌘K)"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
          </button>

          {/* Release Notes Button */}
          <button
            type="button"
            onClick={() => setReleaseNotesOpen(true)}
            className="px-2 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 border border-white/10"
            title="Release Notes & Updates"
          >
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span className="text-[11px] font-mono font-semibold text-white/85">v1.1</span>
          </button>

          {/* Subjects & Preferences Settings Button */}
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Suite Settings & Preferences"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>
      </header>

      {/* Universal Search & Local AI Intelligence Modal */}
      <UniversalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
