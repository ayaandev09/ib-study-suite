"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { TopCommandBar } from "@/modules/german/components/TopCommandBar";
import { SideNav } from "@/modules/german/components/SideNav";
import { SceneSwitcher } from "@/modules/german/components/SceneSwitcher";
import { HomeDashboard } from "@/modules/german/components/HomeDashboard";
import { GermanRightInspector } from "@/modules/german/components/GermanRightInspector";
import { ThemesBentoView } from "@/modules/german/components/ThemesBentoView";
import { ExecutiveStreamView } from "@/modules/german/components/ExecutiveStreamView";
import { GrammarLabView } from "@/modules/german/components/GrammarLabView";
import { TextsortenVaultView } from "@/modules/german/components/TextsortenVaultView";
import { RedemittelDossierView } from "@/modules/german/components/RedemittelDossierView";
import { ExamMasteryView } from "@/modules/german/components/ExamMasteryView";
import { TestDafView } from "@/modules/german/components/TestDafView";
import { ThemeMatrixView } from "@/modules/german/components/ThemeMatrixView";
import { LiteratureOralLabView } from "@/modules/german/components/LiteratureOralLabView";
import { RevisionHubView } from "@/modules/german/components/RevisionHubView";
import { CinematicStartupIntro } from "@/modules/german/components/CinematicStartupIntro";
import { AmbientAuroraCanvas } from "@/modules/german/components/AmbientAuroraCanvas";
import { WidgetBridge } from "@/modules/german/components/WidgetBridge";
import { StudyMiniHomepage } from "@/modules/german/components/StudyMiniHomepage";
import { ImmersiveAppWalkthrough } from "@/modules/german/components/ImmersiveAppWalkthrough";
import { TimedExamSprintModal } from "@/modules/german/components/TimedExamSprintModal";
import { KeyboardShortcutsModal } from "@/modules/german/components/KeyboardShortcutsModal";
import { JellySpotlightModal } from "@/modules/german/components/JellySpotlightModal";
import { useGermanStudyStore, GermanNavMode } from "@/modules/german/store/useGermanStudyStore";
import { initGlobalTactileListener } from "@/modules/german/lib/tactileHaptics";

export default function IBGermanBStudyDashboardPage() {
  const {
    viewMode,
    setViewMode,
    toggleInspector,
    toggleExamSprint,
    isExamSprintActive,
    closeExamSprint,
    isShortcutsOpen,
    setIsShortcutsOpen,
    openSpotlight,
    academicStyle,
  } = useGermanStudyStore();

  const [isStartupActive, setIsStartupActive] = useState(false);
  const [showMainUI, setShowMainUI] = useState(true);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [visitedViews, setVisitedViews] = useState<Record<string, boolean>>(() => ({ [viewMode]: true }));

  useEffect(() => {
    setVisitedViews((prev) => (prev[viewMode] ? prev : { ...prev, [viewMode]: true }));
  }, [viewMode]);

  useEffect(() => {
    const views = ["themen", "revision", "matrix", "grammatik", "textsorten", "redemittel", "pruefung", "literatur", "testdaf"];
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (idx >= views.length) return;
      const v = views[idx++];
      React.startTransition(() => {
        setVisitedViews((prev) => (prev[v] ? prev : { ...prev, [v]: true }));
      });
      timer = setTimeout(step, 160);
    };
    timer = setTimeout(step, 650);
    return () => clearTimeout(timer);
  }, []);

  const handleStartupComplete = useCallback(() => {
    setIsStartupActive(false);
    setShowMainUI(true);
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_german_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  // Synchronize dynamic scholarly typography
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeFont = academicStyle || "jakarta";
      document.documentElement.setAttribute("data-academic-font", activeFont);
      document.documentElement.setAttribute("data-handwritten-style", activeFont);
    }
  }, [academicStyle]);

  // Activate tactile button feedback
  useEffect(() => {
    const cleanup = initGlobalTactileListener();
    return cleanup;
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + I: Inspector
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        toggleInspector();
      }
      // Cmd/Ctrl + J: Exam Sprint
      else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        toggleExamSprint();
      }
      // ?: Shortcuts Cheatsheet
      else if (
        e.key === "?" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
      // Number keys 1-6 for quick tab switching
      else if (
        !e.metaKey &&
        !e.ctrlKey &&
        ["1", "2", "3", "4", "5", "6"].includes(e.key) &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        const modes: GermanNavMode[] = [
          "themen",
          "grammatik",
          "textsorten",
          "redemittel",
          "pruefung",
          "literatur",
          "testdaf",
        ];
        const idx = parseInt(e.key, 10) - 1;
        if (modes[idx]) {
          setViewMode(modes[idx]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleInspector, toggleExamSprint, setIsShortcutsOpen, setViewMode]);

  return (
    <div className="relative min-h-screen w-full bg-[#060402] text-slate-100 flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-100 overflow-x-clip">
      {/* Background Animated Ambient Aurora Blobs */}
      <AmbientAuroraCanvas />
      {/* Real-time WidgetKit Sync Bridge */}
      <WidgetBridge />

      {/* Main 3-Column macOS Dashboard Shell */}
      <div
        className={`relative z-10 w-full max-w-[1760px] mx-auto px-5 sm:px-7 lg:px-8 py-4 flex items-start transition-opacity duration-700 mac-dashboard-shell ${
          showMainUI ? "app-revealed opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Column: Syllabus Sidebar */}
        <SideNav />

        {/* Middle Column: Top Command Bar & Active Study View */}
        <main
          data-tour="main-workspace"
          className="flex-1 min-w-0 w-full pb-36 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ containerType: "inline-size" }}
        >
          {/* Top Command Bar */}
          <TopCommandBar
            onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
            onOpenDiagnostics={() => setIsStartupActive(true)}
          />

          {/* Mini Homepage & Live Widget Telemetry Hub (Macbeth Match) */}
          

          {/* Active View Container */}
          <div className="space-y-4">
            {(viewMode === "home" || visitedViews["home"]) && (
              <div className={viewMode === "home" ? "" : "hidden"} aria-hidden={viewMode !== "home"}>
                <HomeDashboard />
              </div>
            )}
            {(viewMode === "themen" || visitedViews["themen"]) && (
              <div className={viewMode === "themen" ? "space-y-4" : "hidden"} aria-hidden={viewMode !== "themen"}>
                <SceneSwitcher />
                <ThemesBentoView />
              </div>
            )}
            {(viewMode === "revision" || visitedViews["revision"]) && (
              <div className={viewMode === "revision" ? "" : "hidden"} aria-hidden={viewMode !== "revision"}>
                <RevisionHubView />
              </div>
            )}
            {(viewMode === "stream" || visitedViews["stream"]) && (
              <div className={viewMode === "stream" ? "" : "hidden"} aria-hidden={viewMode !== "stream"}>
                <ExecutiveStreamView />
              </div>
            )}
            {(viewMode === "matrix" || visitedViews["matrix"]) && (
              <div className={viewMode === "matrix" ? "" : "hidden"} aria-hidden={viewMode !== "matrix"}>
                <ThemeMatrixView />
              </div>
            )}
            {(viewMode === "grammatik" || visitedViews["grammatik"]) && (
              <div className={viewMode === "grammatik" ? "" : "hidden"} aria-hidden={viewMode !== "grammatik"}>
                <GrammarLabView />
              </div>
            )}
            {(viewMode === "textsorten" || visitedViews["textsorten"]) && (
              <div className={viewMode === "textsorten" ? "" : "hidden"} aria-hidden={viewMode !== "textsorten"}>
                <TextsortenVaultView />
              </div>
            )}
            {(viewMode === "redemittel" || visitedViews["redemittel"]) && (
              <div className={viewMode === "redemittel" ? "" : "hidden"} aria-hidden={viewMode !== "redemittel"}>
                <RedemittelDossierView />
              </div>
            )}
            {(viewMode === "pruefung" || visitedViews["pruefung"]) && (
              <div className={viewMode === "pruefung" ? "" : "hidden"} aria-hidden={viewMode !== "pruefung"}>
                <ExamMasteryView />
              </div>
            )}
            {(viewMode === "literatur" || visitedViews["literatur"]) && (
              <div className={viewMode === "literatur" ? "" : "hidden"} aria-hidden={viewMode !== "literatur"}>
                <LiteratureOralLabView />
              </div>
            )}
            {(viewMode === "testdaf" || visitedViews["testdaf"]) && (
              <div className={viewMode === "testdaf" ? "" : "hidden"} aria-hidden={viewMode !== "testdaf"}>
                <TestDafView />
              </div>
            )}
            {!["home", "themen", "revision", "stream", "matrix", "grammatik", "textsorten", "redemittel", "pruefung", "literatur", "testdaf"].includes(viewMode) && <HomeDashboard />}
          </div>
        </main>

        {/* Right Column: Analytical Inspector */}
        <GermanRightInspector />
      </div>

      {/* Startup Diagnostic Intro Sequence */}
      <AnimatePresence>
        {isStartupActive && (
          <CinematicStartupIntro onComplete={handleStartupComplete} />
        )}
      </AnimatePresence>

      {/* Interactive Walkthrough Tour */}
      <ImmersiveAppWalkthrough
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
      />

      {/* Timed Exam Sprint Simulation Modal (⌘E) */}
      <TimedExamSprintModal
        isOpen={isExamSprintActive}
        onClose={closeExamSprint}
      />

      {/* Global Keyboard Shortcuts Cheatsheet Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onOpenTour={() => setIsWalkthroughOpen(true)}
      />

      {/* Instant Spotlight Search Modal (⌘K) */}
      <JellySpotlightModal />
    </div>
  );
}
