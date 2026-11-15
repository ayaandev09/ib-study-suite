"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientAuroraCanvas } from "@/modules/orwell/components/AmbientAuroraCanvas";
import { BOOK_PARTS, ALL_CHAPTERS, THEMES_TAXONOMY } from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";
import { SideNav } from "@/modules/orwell/components/SideNav";
import { SceneSwitcher } from "@/modules/orwell/components/SceneSwitcher";
import { HomeDashboard } from "@/modules/orwell/components/HomeDashboard";
import { TopCommandBar } from "@/modules/orwell/components/TopCommandBar";
import { WidgetBridge } from "@/modules/orwell/components/WidgetBridge";
import { ChapterBentoCard } from "@/modules/orwell/components/ChapterBentoCard";
import { ExecutiveStreamView } from "@/modules/orwell/components/ExecutiveStreamView";
import { StudyMiniHomepage } from "@/modules/orwell/components/StudyMiniHomepage";
import { ThemeMatrixView } from "@/modules/orwell/components/ThemeMatrixView";
import { SymbolsMotifsView } from "@/modules/orwell/components/SymbolsMotifsView";
import { RevisionHubView } from "@/modules/orwell/components/RevisionHubView";
import { FloatingBottomDock } from "@/modules/orwell/components/FloatingBottomDock";
import { StartupDiagnosticsOverlay } from "@/modules/orwell/components/StartupDiagnosticsOverlay";
import { CinematicStartupIntro } from "@/modules/orwell/components/CinematicStartupIntro";
import { ImmersiveAppWalkthrough } from "@/modules/orwell/components/ImmersiveAppWalkthrough";
import { OrwellRightInspector } from "@/modules/orwell/components/OrwellRightInspector";
import { TimedExamSprintModal } from "@/modules/orwell/components/TimedExamSprintModal";
import { JellySpotlightModal } from "@/modules/orwell/components/JellySpotlightModal";
import { ChromaticButton } from "@/modules/orwell/components/chromatic-button";
import { initLiveSyncConnection, decodeSyncFromUrl, pullSyncFromServer } from "@/modules/orwell/lib/syncService";
import { initGlobalTactileListener } from "@/modules/orwell/lib/tactileHaptics";
import { CheckCircle2, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function Orwell1984LiquidShellPage() {
  const {
    activeChapterId,
    setActiveChapter,
    activePartFilter,
    setActivePartFilter,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    completedChapters,
    toggleChapterComplete,
    goToNextChapter,
    academicStyle,
    handwrittenStyle,
    applyRemoteSync,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
    telescreenMode,
    isSpotlightOpen,
    closeSpotlight,
    setStudyGoal,
  } = useStudyStore();

  const [isStartupActive, setIsStartupActive] = useState(false);
  const [showMainUI, setShowMainUI] = useState(true);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [visitedViews, setVisitedViews] = useState<Record<string, boolean>>(() => ({ [viewMode]: true }));

  useEffect(() => {
    setVisitedViews((prev) => (prev[viewMode] ? prev : { ...prev, [viewMode]: true }));
  }, [viewMode]);

  useEffect(() => {
    const views = ["focus", "matrix", "lexicon", "revision", "stream"];
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
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_1984_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  // Synchronize universal academic professional font attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeFont = academicStyle || handwrittenStyle || "newsreader";
      document.documentElement.setAttribute("data-academic-font", activeFont);
      document.documentElement.setAttribute("data-handwritten-style", activeFont);
    }
  }, [academicStyle, handwrittenStyle]);

  // Activate universal tactile mechanical feedback on buttons
  useEffect(() => {
    const cleanup = initGlobalTactileListener();
    return cleanup;
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

  // Fluid responsive adaptation: Auto-collapse inspector on screens below 1280px to avoid 3-column squeeze
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth < 1280 && isInspectorOpen) {
        toggleInspector();
      }
    };
    if (window.innerWidth < 1280 && isInspectorOpen) {
      toggleInspector();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInspectorOpen, toggleInspector]);

  // Live Sync and URL Payload Hydration
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const syncParam = params.get("sync");

    // 1. Hydrate from QR Code URL sync payload if present
    if (syncParam) {
      const decoded = decodeSyncFromUrl(syncParam);
      if (decoded) {
        applyRemoteSync(decoded);
      }
    } else {
      // Otherwise fetch latest cloud sync state
      pullSyncFromServer().then((remote) => {
        if (remote) applyRemoteSync(remote);
      });
    }

    // 2. Establish continuous bi-directional real-time sync with Mac
    const disconnectSync = initLiveSyncConnection((incoming) => {
      applyRemoteSync(incoming);
    });

    return () => {
      disconnectSync();
    };
  }, [applyRemoteSync]);

  const activeChapter = useMemo(
    () => ALL_CHAPTERS.find((c) => c.id === activeChapterId) || ALL_CHAPTERS[0],
    [activeChapterId]
  );

  const activeBookPart = useMemo(
    () => BOOK_PARTS.find((p) => p.id === activeChapter.partId) || BOOK_PARTS[0],
    [activeChapter.partId]
  );

  const currentChapterIndex = useMemo(
    () => ALL_CHAPTERS.findIndex((c) => c.id === activeChapter.id),
    [activeChapter.id]
  );

  const nextChapter = useMemo(
    () =>
      currentChapterIndex >= 0 && currentChapterIndex < ALL_CHAPTERS.length - 1
        ? ALL_CHAPTERS[currentChapterIndex + 1]
        : null,
    [currentChapterIndex]
  );

  const filteredStreamChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_CHAPTERS.filter((ch) => {
      // Global search across all parts when query is active
      if (!q && activePartFilter !== "all" && ch.partId !== activePartFilter) {
        return false;
      }
      if (q) {
        return (
          ch.title.toLowerCase().includes(q) ||
          ch.subtitle.toLowerCase().includes(q) ||
          ch.displayCode.toLowerCase().includes(q) ||
          ch.summary.toLowerCase().includes(q) ||
          ch.subSections.some(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.content.toLowerCase().includes(q)
          ) ||
          ch.quotes.some(
            (qt) =>
              qt.quote.toLowerCase().includes(q) ||
              qt.analysis.toLowerCase().includes(q)
          )
        );
      }
      return true;
    });
  }, [activePartFilter, searchQuery]);

  // When searching in focus mode, automatically sync active chapter to first search match
  useEffect(() => {
    if (searchQuery.trim() && filteredStreamChapters.length > 0) {
      if (!filteredStreamChapters.some((ch) => ch.id === activeChapterId)) {
        setActiveChapter(filteredStreamChapters[0].id);
      }
    }
  }, [searchQuery,
    setSearchQuery, filteredStreamChapters, activeChapterId, setActiveChapter]);

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

      {/* Telescreen Ambient CRT Surveillance Scanlines & Phosphor Grain */}
      {telescreenMode && <div className="telescreen-scanlines pointer-events-none" />}

      {/* 2. Main Study Dashboard - Fluid Liquid Glass Reveal */}
      <div
        className={`relative min-h-screen w-full bg-[#060402] overflow-x-clip text-slate-100 ${showMainUI ? "app-revealed" : ""} transition-opacity duration-700 ease-out ${
          telescreenMode ? "telescreen-glow" : ""
        } ${
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
          {/* Top Command & View Switcher Bar */}
          <WidgetBridge />
          <TopCommandBar onOpenWalkthrough={() => setIsWalkthroughOpen(true)} />

          {/* Mini Homepage & Live Widget Telemetry Hub */}
          

          {/* ==================== BUTTER-SMOOTH VIEW CONTENT WORKSPACE ==================== */}
          <div>
            {(viewMode === "home" || visitedViews["home"]) && (
              <div className={viewMode === "home" ? "" : "hidden"} aria-hidden={viewMode !== "home"}>
                <HomeDashboard />
              </div>
            )}

            {/* ==================== VIEW 1: FOCUS CHAPTER BENTO ==================== */}
            {(viewMode === "focus" || visitedViews["focus"]) && (
              <div className={viewMode === "focus" ? "space-y-4" : "hidden"} aria-hidden={viewMode !== "focus"}>
                <SceneSwitcher />

                {/* Active Chapter Bento Grid with Buttery Smooth Swap */}
                <div key={activeChapter.id} data-tour="study-bento" className="liquid-chapter-swap">
                  <ChapterBentoCard
                    chapter={activeChapter}
                    isDeferredBelowFold={false}
                    showPrevNextControls={true}
                  />
                </div>

                {/* Seamless Next-Chapter Speed-Read Transition Footer */}
                {nextChapter && (
                  <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Up Next in Your Speed-Read Queue
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {nextChapter.displayCode}: {nextChapter.title}
                      </div>
                      <div className="text-xs text-rose-300">
                        {nextChapter.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <ChromaticButton
                        onClick={() => {
                          if (!completedChapters[activeChapter.id]) {
                            toggleChapterComplete(activeChapter.id);
                          }
                          goToNextChapter();
                          window.scrollTo(0, 0);
                        }}
                        color="#00802f"
                        colorMode="spectrum"
                        speed={0.7}
                        paused={false}
                        phase={0}
                        feather={100}
                        projectionScale={174.7}
                        intensity={1.4}
                        grain={0.105}
                        seed={7}
                        borderRadius={50}
                        hoverEffect="brighten"
                        entrance="blur-up"
                        entranceSpeed={1}
                        entranceBlur={10}
                        entranceDistance={20}
                        entranceScale={0.65}
                        className="w-full sm:w-auto min-w-[200px] !h-12 !px-6 !text-xs font-bold shadow-xl cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 mr-2" />
                        <span>Complete {activeChapter.displayCode} &amp; Continue</span>
                        <ArrowRight className="w-4 h-4 text-white ml-2" />
                      </ChromaticButton>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== VIEW 2: CONTINUOUS FLOW STREAM ==================== */}
            {(viewMode === "stream" || visitedViews["stream"]) && (
              <div className={viewMode === "stream" ? "" : "hidden"} aria-hidden={viewMode !== "stream"}>
                <ExecutiveStreamView />
              </div>
            )}


            {/* ==================== VIEW 3: THEME & QUOTE MATRIX ==================== */}
            {(viewMode === "matrix" || visitedViews["matrix"]) && (
              <div className={viewMode === "matrix" ? "" : "hidden"} aria-hidden={viewMode !== "matrix"}>
                <ThemeMatrixView />
              </div>
            )}

            {/* ==================== VIEW 4: SYMBOLS, DOSSIERS & NEWSPEAK ==================== */}
            {(viewMode === "lexicon" || visitedViews["lexicon"]) && (
              <div className={viewMode === "lexicon" ? "" : "hidden"} aria-hidden={viewMode !== "lexicon"}>
                <SymbolsMotifsView />
              </div>
            )}

            {/* ==================== VIEW 5: REVISION & EXAM HUB ==================== */}
            {(viewMode === "revision" || visitedViews["revision"]) && (
              <div className={viewMode === "revision" ? "" : "hidden"} aria-hidden={viewMode !== "revision"}>
                <RevisionHubView />
              </div>
            )}

            {/* ==================== FALLBACK VIEW (SAFE DEFAULT) ==================== */}
            {!["home", "focus", "stream", "matrix", "lexicon", "revision"].includes(viewMode) && <HomeDashboard />}
          </div>
        </main>

        {/* Right Sticky Liquid Glass Analytical Inspector */}
        <OrwellRightInspector
          chapter={activeChapter}
          isOpen={isInspectorOpen}
          onToggle={toggleInspector}
        />
      </div>



      {/* Telemetry overlay removed */}
    </div>

    {/* Timed Exam Sprint Full-Screen Simulation Modal */}
    <TimedExamSprintModal
      isOpen={isExamSprintActive}
      onClose={closeExamSprint}
      chapter={activeChapter}
    />

    {/* Flagship Jelly Spotlight Search Modal (Raycast Ergonomics) */}
    <JellySpotlightModal
      isOpen={isSpotlightOpen}
      onClose={closeSpotlight}
    />

    {/* Immersive Onboarding Walkthrough Tour */}
    <ImmersiveAppWalkthrough
      isOpen={isWalkthroughOpen}
      onClose={() => setIsWalkthroughOpen(false)}
      onSelectGoal={(goal) => setStudyGoal(goal)}
      isInspectorOpen={isInspectorOpen}
      onOpenInspector={() => {
        if (!isInspectorOpen) toggleInspector();
      }}
    />
    </>
  );
}
