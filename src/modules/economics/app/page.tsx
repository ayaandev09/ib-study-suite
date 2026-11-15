"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientAuroraCanvas } from "@/modules/economics/components/AmbientAuroraCanvas";
import { FloatingSidebar } from "@/modules/economics/components/FloatingSidebar";
import { SideNav } from "@/modules/economics/components/SideNav";
import { SceneSwitcher } from "@/modules/economics/components/SceneSwitcher";
import { HomeDashboard } from "@/modules/economics/components/HomeDashboard";
import { TopCommandBar } from "@/modules/economics/components/TopCommandBar";
import { WidgetBridge } from "@/modules/economics/components/WidgetBridge";
import { StudyMiniHomepage } from "@/modules/economics/components/StudyMiniHomepage";
import { TopicBentoCard } from "@/modules/economics/components/TopicBentoCard";
import { ExecutiveStreamView } from "@/modules/economics/components/ExecutiveStreamView";
import { ThemeMatrixView } from "@/modules/economics/components/ThemeMatrixView";
import { CaseStudyVaultView } from "@/modules/economics/components/CaseStudyVaultView";
import { ExamStructureMasteryView } from "@/modules/economics/components/ExamStructureMasteryView";
import { LexiconDossierView } from "@/modules/economics/components/LexiconDossierView";
import { ActiveRecallRevisionView } from "@/modules/economics/components/ActiveRecallRevisionView";
import { FloatingBottomDock } from "@/modules/economics/components/FloatingBottomDock";
import { StartupDiagnosticsOverlay } from "@/modules/economics/components/StartupDiagnosticsOverlay";
import { CinematicStartupIntro } from "@/modules/economics/components/CinematicStartupIntro";
import { ImmersiveAppWalkthrough } from "@/modules/economics/components/ImmersiveAppWalkthrough";
import { EconomicsRightInspector } from "@/modules/economics/components/EconomicsRightInspector";
import { TimedExamSprintModal } from "@/modules/economics/components/TimedExamSprintModal";
import { JellySpotlightModal } from "@/modules/economics/components/JellySpotlightModal";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId } from "@/modules/economics/data";
import { useStudyStore } from "@/modules/economics/store/useStudyStore";
import {
  initLiveSyncConnection,
  decodeSyncFromUrl,
  pullSyncFromServer,
} from "@/modules/economics/lib/syncService";
import { initGlobalTactileListener } from "@/modules/economics/lib/tactileHaptics";
import {
  Sparkles,
  Layers,
  SearchX,
  BookOpen,
  ArrowRight,
  Monitor,
  CheckCircle2,
} from "lucide-react";

export default function IBEconomicsSLStudyDashboardPage() {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    activeUnitFilter,
    setActiveUnitFilter,
    deviceMode,
    setDeviceMode,
    academicStyle,
    completedTopics,
    diagnosticsModalOpen,
    setDiagnosticsModalOpen,
    applyRemoteSync,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
    isSpotlightOpen,
    closeSpotlight,
    setLearningPosture,
  } = useStudyStore();

  const [isStartupActive, setIsStartupActive] = useState(false);
  const [showMainUI, setShowMainUI] = useState(true);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [visitedViews, setVisitedViews] = useState<Record<string, boolean>>(() => ({ [viewMode]: true }));

  useEffect(() => {
    setVisitedViews((prev) => (prev[viewMode] ? prev : { ...prev, [viewMode]: true }));
  }, [viewMode]);

  useEffect(() => {
    const views = ["focus", "matrix", "cases", "exam-guide", "lexicon", "revision", "stream"];
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
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_econ_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  // Synchronize dynamic scholarly typography engine (1984 style)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeFont = academicStyle || "jakarta";
      document.documentElement.setAttribute("data-academic-font", activeFont);
      document.documentElement.setAttribute("data-handwritten-style", activeFont);
    }
  }, [academicStyle]);

  // Activate universal tactile mechanical feedback on buttons
  useEffect(() => {
    const cleanup = initGlobalTactileListener();
    return cleanup;
  }, []);

  // Fluid layout window adaptation on dynamic resize and full-screen toggles
  useEffect(() => {
    let prevWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const store = useStudyStore.getState();
      if (width < 1024 && prevWidth >= 1024) {
        store.setSidebarCollapsed(true);
      } else if (width >= 1024 && prevWidth < 1024) {
        store.setSidebarCollapsed(false);
      }
      if (width < 1280 && prevWidth >= 1280) {
        if (store.isInspectorOpen) store.setInspectorOpen(false);
      }
      prevWidth = width;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global Keyboard Shortcut: Cmd/Ctrl + I to toggle Analytical Inspector, Cmd/Ctrl + E to toggle Exam Sprint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        toggleInspector();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        toggleExamSprint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleInspector, toggleExamSprint]);

  // Live sync hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const syncParam = params.get("sync");
      if (syncParam) {
        const decoded = decodeSyncFromUrl(syncParam);
        if (decoded) {
          applyRemoteSync(decoded);
        }
      } else {
        pullSyncFromServer().then((remote) => {
          if (remote) applyRemoteSync(remote);
        });
      }
    }

    const disconnectSync = initLiveSyncConnection((incoming) => {
      applyRemoteSync(incoming);
    });

    return () => {
      disconnectSync();
    };
  }, [applyRemoteSync]);

  const activeTopic = useMemo(
    () => ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0],
    [activeTopicId]
  );

  const activeUnit = useMemo(
    () =>
      SYLLABUS_UNITS.find((u) => u.id === activeTopic.unitId) ||
      SYLLABUS_UNITS[0],
    [activeTopic.unitId]
  );

  const currentTopicIndex = useMemo(
    () => ALL_TOPICS.findIndex((t) => t.id === activeTopic.id),
    [activeTopic.id]
  );

  const nextTopic = useMemo(
    () =>
      currentTopicIndex >= 0 && currentTopicIndex < ALL_TOPICS.length - 1
        ? ALL_TOPICS[currentTopicIndex + 1]
        : null,
    [currentTopicIndex]
  );

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_TOPICS.filter((t) => {
      // Global search across all units when query is present
      if (!q && activeUnitFilter !== "all" && t.unitId !== activeUnitFilter) {
        return false;
      }
      if (!q) return true;

      const inHeader =
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.displayCode.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.syllabusRef.toLowerCase().includes(q);

      const inBullets = t.speedReadBullets.some((b) =>
        b.toLowerCase().includes(q)
      );
      const inSubsections = t.subSections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q) ||
          s.analyticalTakeaway.toLowerCase().includes(q)
      );
      const inCases = t.cases.some(
        (cs) =>
          cs.title.toLowerCase().includes(q) ||
          cs.countryOrContext.toLowerCase().includes(q) ||
          cs.realWorldMechanism.toLowerCase().includes(q)
      );

      return inHeader || inBullets || inSubsections || inCases;
    });
  }, [searchQuery, activeUnitFilter]);

  // When searching in focus mode, automatically sync active topic to first search match
  useEffect(() => {
    if (searchQuery.trim() && filteredTopics.length > 0) {
      if (!filteredTopics.some((t) => t.id === activeTopicId)) {
        setActiveTopic(filteredTopics[0].id);
      }
    }
  }, [searchQuery, filteredTopics, activeTopicId, setActiveTopic]);

  return (
    <>
      {/* 1. Bulletproof Zero-Latency Liquid Glass Startup Animation */}
      <AnimatePresence>
        {isStartupActive && (
          <CinematicStartupIntro
            isOpen={isStartupActive}
            onClose={handleStartupComplete}
            onComplete={handleStartupComplete}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Study Dashboard - Buttery Liquid Glass reveal into main view */}
      <div
        className={`relative min-h-screen w-full bg-[#060402] overflow-x-clip text-slate-100 transition-opacity duration-700 ease-out ${
          showMainUI
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none select-none"
        }`}
      >
        <AmbientAuroraCanvas />
        {/* ==================== MAIN SHELL CONTAINER ==================== */}
        <div className="w-full max-w-[1760px] mx-auto px-5 sm:px-7 lg:px-8 py-4 flex items-start mac-dashboard-shell relative z-10">
          {/* Left Floating Sidebar */}
          <SideNav />

        {/* Right Main Content Workspace */}
        <main
          className="flex-1 min-w-0 w-full pb-36 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ containerType: "inline-size" }}
        >
          {/* Top Command & View Switcher Bar (Unified Long Bar) */}
          <WidgetBridge />
          <TopCommandBar onOpenWalkthrough={() => setIsWalkthroughOpen(true)} />

          {/* Mini Homepage & Live Widget Telemetry Hub */}
          

          {/* ==================== BUTTER-SMOOTH VIEW CONTENT WORKSPACE ==================== */}
          <div>
            {/* ===============================================================
                MODE 1: SINGLE TOPIC BENTO CARD (FOCUS / HOME VIEW)
                =============================================================== */}
            {(viewMode === "home" || visitedViews["home"]) && (
              <div className={viewMode === "home" ? "" : "hidden"} aria-hidden={viewMode !== "home"}>
                <HomeDashboard />
              </div>
            )}

            {(viewMode === "focus" || visitedViews["focus"]) && (
              <div className={viewMode === "focus" ? "space-y-5" : "hidden"} aria-hidden={viewMode !== "focus"}>
                <SceneSwitcher />
                {/* Unit Context Banner - 100% Full-Width Bulletproof Native Card */}
                <div className="liquid-glass-bento rounded-3xl p-5 mb-5 border border-white/15 shadow-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-300">
                      <BookOpen className="w-4 h-4 shrink-0 text-sky-400" />
                      <span className="font-bold text-sm text-white">{activeUnit.title}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-400/30">
                      {activeUnit.strategicArc}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed w-full">
                    {activeUnit.overview}
                  </p>
                </div>

                {/* Active Topic Bento Grid with Buttery Smooth Swap */}
                <div key={activeTopic.id} data-tour="study-bento" className="liquid-chapter-swap">
                  <TopicBentoCard
                    topic={activeTopic}
                    showPrevNextControls={true}
                  />
                </div>

                {/* Seamless Next-Topic Speed-Read Transition Footer */}
                {nextTopic && (
                  <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Up Next in Your Syllabus Queue
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {nextTopic.displayCode}: {nextTopic.title}
                      </div>
                      <div className="text-xs text-sky-300">
                        {nextTopic.readingTimeMinutes} min speed-read • {nextTopic.subSections.length} core sections
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setActiveTopic(nextTopic.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full sm:w-auto min-w-[200px] sm:min-w-[240px] h-12 px-6 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border-sky-400/40 shadow-lg shadow-sky-500/10 active:scale-95 flex items-center justify-center gap-2 group"
                      >
                        <span>Advance to Topic {nextTopic.displayCode}</span>
                        <ArrowRight className="w-4 h-4 text-sky-300 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===============================================================
                MODE 2: CONTINUOUS FLOW STREAM
                =============================================================== */}
            {(viewMode === "stream" || visitedViews["stream"]) && (
              <div className={viewMode === "stream" ? "" : "hidden"} aria-hidden={viewMode !== "stream"}>
                <ExecutiveStreamView />
              </div>
            )}


            {/* ===============================================================
                MODE 4: 9 KEY CONCEPTS MATRIX VIEW
                =============================================================== */}
            {(viewMode === "matrix" || visitedViews["matrix"]) && (
              <div className={viewMode === "matrix" ? "" : "hidden"} aria-hidden={viewMode !== "matrix"}>
                <ThemeMatrixView />
              </div>
            )}

            {/* ===============================================================
                MODE 5: 15-MARK ESSAY CASE STUDY VAULT (40 CASE STUDIES)
                =============================================================== */}
            {(viewMode === "cases" || visitedViews["cases"]) && (
              <div className={viewMode === "cases" ? "" : "hidden"} aria-hidden={viewMode !== "cases"}>
                <CaseStudyVaultView />
              </div>
            )}

            {/* ===============================================================
                MODE 6: EXAM STRUCTURE MASTERY & COMMAND TERMS BLUEPRINT
                =============================================================== */}
            {(viewMode === "exam-guide" || visitedViews["exam-guide"]) && (
              <div className={viewMode === "exam-guide" ? "" : "hidden"} aria-hidden={viewMode !== "exam-guide"}>
                <ExamStructureMasteryView />
              </div>
            )}

            {/* ===============================================================
                MODE 7: FORMULAS, THEORISTS & GLOSSARY DOSSIER
                =============================================================== */}
            {(viewMode === "lexicon" || visitedViews["lexicon"]) && (
              <div className={viewMode === "lexicon" ? "" : "hidden"} aria-hidden={viewMode !== "lexicon"}>
                <LexiconDossierView />
              </div>
            )}

            {/* ===============================================================
                MODE 8: ACTIVE RECALL REVISION & EXAM FLASHCARD HUB
                =============================================================== */}
            {(viewMode === "revision" || visitedViews["revision"]) && (
              <div className={viewMode === "revision" ? "" : "hidden"} aria-hidden={viewMode !== "revision"}>
                <ActiveRecallRevisionView />
              </div>
            )}

            {/* ==================== FALLBACK VIEW (SAFE DEFAULT) ==================== */}
            {!["home", "focus", "stream", "matrix", "cases", "exam-guide", "lexicon", "revision"].includes(viewMode) && (
              <HomeDashboard />
            )}
          </div>
        </main>

        {/* Right Sticky Liquid Glass Analytical Inspector */}
        <EconomicsRightInspector
          topic={activeTopic}
          isOpen={isInspectorOpen}
          onToggle={toggleInspector}
        />
      </div>



        {/* Diagnostics Modal */}
      </div>

      {/* Timed Exam Sprint Full-Screen Simulation Modal */}
      <TimedExamSprintModal
        isOpen={isExamSprintActive}
        onClose={closeExamSprint}
        topic={activeTopic}
      />

      {/* iPadOS / Mobile Touch Syllabus Drawer Sheet */}
      <FloatingSidebar isMobileSheet={true} />

      {/* Flagship Jelly Spotlight Search Modal (Raycast Ergonomics) */}
      <JellySpotlightModal
        isOpen={isSpotlightOpen}
        onClose={closeSpotlight}
      />

      {/* Immersive Onboarding Walkthrough Tour */}
      <ImmersiveAppWalkthrough
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        onSelectGoal={(goal) => setLearningPosture(goal === "revise" ? "pre-lesson-cram" : "learn-new")}
        isInspectorOpen={isInspectorOpen}
        onOpenInspector={() => {
          if (!isInspectorOpen) toggleInspector();
        }}
      />
    </>
  );
}