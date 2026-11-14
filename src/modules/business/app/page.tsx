"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientAuroraCanvas } from "@/modules/business/components/AmbientAuroraCanvas";
import { SideNav } from "@/modules/business/components/SideNav";
import { SceneSwitcher } from "@/modules/business/components/SceneSwitcher";
import { HomeDashboard } from "@/modules/business/components/HomeDashboard";
import { TopCommandBar } from "@/modules/business/components/TopCommandBar";
import { WidgetBridge } from "@/modules/business/components/WidgetBridge";
import { StudyMiniHomepage } from "@/modules/business/components/StudyMiniHomepage";
import { CuegisSandbox } from "@/modules/business/components/CuegisSandbox";
import { TopicBentoCard } from "@/modules/business/components/TopicBentoCard";
import { ExecutiveStreamView } from "@/modules/business/components/ExecutiveStreamView";
import { ThemeMatrixView } from "@/modules/business/components/ThemeMatrixView";
import { LexiconDossierView } from "@/modules/business/components/LexiconDossierView";
import { ActiveRecallRevisionView } from "@/modules/business/components/ActiveRecallRevisionView";
import { FloatingBottomDock } from "@/modules/business/components/FloatingBottomDock";
import { StartupDiagnosticsOverlay } from "@/modules/business/components/StartupDiagnosticsOverlay";
import { CinematicStartupIntro } from "@/modules/business/components/CinematicStartupIntro";
import { ImmersiveAppWalkthrough } from "@/modules/business/components/ImmersiveAppWalkthrough";
import { BusinessRightInspector } from "@/modules/business/components/BusinessRightInspector";
import { TimedExamSprintModal } from "@/modules/business/components/TimedExamSprintModal";
import { LiveDiagnosticsModal } from "@/modules/business/components/LiveDiagnosticsModal";
import { JellySpotlightModal } from "@/modules/business/components/JellySpotlightModal";
import { ChromaticButton } from "@/modules/business/components/chromatic-button";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId } from "@/modules/business/data";
import { useStudyStore } from "@/modules/business/store/useStudyStore";
import {
  initLiveSyncConnection,
  decodeSyncFromUrl,
  pullSyncFromServer,
} from "@/modules/business/lib/syncService";
import { initGlobalTactileListener } from "@/modules/business/lib/tactileHaptics";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Monitor,
  Sparkles,
  Layers,
  SearchX,
  X,
} from "lucide-react";

export default function IBBusinessManagementStudyDashboardPage() {
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
    completedTopics,
    toggleTopicComplete,
    goToNextTopic,
    academicStyle,
    handwrittenStyle,
    syncToastMessage,
    setSyncToastMessage,
    hydrateFromSyncPayload,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
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
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_bm_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  const [liveDiagOpen, setLiveDiagOpen] = useState(false);
  const [forceStartupDiag, setForceStartupDiag] = useState(false);

  // Synchronize universal academic professional font attribute (Oxford / Garamond / Jakarta)
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

  // Fluid layout window adaptation on dynamic resize and full-screen toggles
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const store = useStudyStore.getState();
      if (width < 1024) {
        if (!store.sidebarCollapsed) store.toggleSidebar();
      }
      if (width < 1280) {
        if (store.isInspectorOpen) store.toggleInspector();
      }
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

  // Live Sync connection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const syncId = params.get("syncId") || params.get("sync");

      // Fetch live sync if sync parameter provided
      if (syncId) {
        const decoded = decodeSyncFromUrl(syncId);
        if (decoded) {
          hydrateFromSyncPayload(decoded as any);
        } else {
          pullSyncFromServer().then((remote) => {
            if (remote) hydrateFromSyncPayload(remote as any);
          });
        }
      } else {
        pullSyncFromServer().then((remote) => {
          if (remote) hydrateFromSyncPayload(remote as any);
        });
      }
    }

    const disconnectSync = initLiveSyncConnection((incoming) => {
      hydrateFromSyncPayload(incoming as any);
    });

    return () => {
      disconnectSync();
    };
  }, [hydrateFromSyncPayload]);

  // Auto-dismiss sync toast after 4s
  useEffect(() => {
    if (syncToastMessage) {
      const timer = setTimeout(() => {
        setSyncToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [syncToastMessage, setSyncToastMessage]);

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
      // Global search across all units when query is active
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
          cs.company.toLowerCase().includes(q) ||
          cs.application.toLowerCase().includes(q) ||
          cs.context.toLowerCase().includes(q)
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
        className={`relative min-h-screen w-full bg-[#060402] overflow-x-clip text-slate-100 ${showMainUI ? "app-revealed" : ""} transition-opacity duration-700 ease-out ${
          showMainUI
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none select-none"
        }`}
      >
        <AmbientAuroraCanvas />
        {/* Live Sync Toast Banner */}
      {syncToastMessage && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-[92%] px-4 py-2.5 rounded-full bg-blue-500/25 border border-blue-400/50 text-blue-200 backdrop-blur-2xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-semibold">{syncToastMessage}</span>
          <button
            onClick={() => setSyncToastMessage(null)}
            className="ml-1 p-0.5 rounded text-blue-300 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =====================================================================
          MAIN SHELL CONTAINER (MAC WIDESCREEN DASHBOARD)
          ===================================================================== */}
      <div className="w-full max-w-[1760px] mx-auto px-5 sm:px-7 lg:px-8 py-4 flex items-start mac-dashboard-shell relative z-10">
        {/* Left Floating Sidebar */}
        <SideNav />

        {/* Right Main Content Workspace */}
        <main
          className="flex-1 min-w-0 w-full pb-36 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ containerType: "inline-size" }}
        >
          {/* Top Command & View Switcher Long Bar */}
          <WidgetBridge />
          <TopCommandBar
            onOpenDiagnostics={() => setLiveDiagOpen(true)}
            onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
          />

          {/* Mini Homepage & Live Widget Telemetry Hub */}
          

          {/* =====================================================================
              BUTTER-SMOOTH VIEW CONTENT WORKSPACE
              ===================================================================== */}
          <div>
            {/* ==================== VIEW 0: HOME BENTO DASHBOARD ==================== */}
            {(viewMode === "home" || visitedViews["home"]) && (
              <div className={viewMode === "home" ? "" : "hidden"} aria-hidden={viewMode !== "home"}>
                <HomeDashboard />
              </div>
            )}

            {/* ==================== VIEW 1: FOCUS TOPIC BENTO ==================== */}
            {(viewMode === "focus" || visitedViews["focus"]) && (
              <div className={viewMode === "focus" ? "space-y-4" : "hidden"} aria-hidden={viewMode !== "focus"}>
                {/* Syllabus Unit Context Banner - 100% Full-Width Bulletproof Native Card */}
                <div className="liquid-glass-bento rounded-3xl p-5 mb-5 border border-white/15 shadow-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-300">
                      <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
                      <span className="font-bold text-sm text-white">{activeUnit.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-400/15 text-blue-300 border border-blue-400/30">
                        {activeUnit.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-300 border border-white/10 bg-white/5">
                        {activeUnit.topics.length} Topics
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed w-full">
                    {activeUnit.overview}
                  </p>
                </div>

                {/* Active Topic Bento Grid with Buttery Smooth Swap */}
                <div key={activeTopic.id} data-tour="study-bento" className="liquid-chapter-swap">
                  <TopicBentoCard
                    topic={activeTopic}
                    isDeferred={false}
                    showPrevNextControls={true}
                  />
                </div>

                {/* Seamless Next-Topic Speed-Read Transition Footer */}
                {nextTopic && (
                  <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Up Next in Your Speed-Read Queue
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {nextTopic.displayCode}: {nextTopic.title}
                      </div>
                      <div className="text-xs text-blue-300">
                        {nextTopic.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                      <ChromaticButton
                        onClick={() => {
                          if (!completedTopics[activeTopic.id]) {
                            toggleTopicComplete(activeTopic.id);
                          }
                          goToNextTopic();
                          window.scrollTo(0, 0);
                        }}
                        color="#2563eb"
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
                        className="w-full sm:w-auto !min-w-[200px] sm:!min-w-[240px] !h-12 !px-6 !text-xs font-bold shadow-xl cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-300 mr-2" />
                        <span>Complete {activeTopic.displayCode} &amp; Continue</span>
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


            {/* ==================== VIEW 3: CONCEPT & BMT MATRIX ==================== */}
            {(viewMode === "matrix" || visitedViews["matrix"]) && (
              <div className={viewMode === "matrix" ? "space-y-5" : "hidden"} aria-hidden={viewMode !== "matrix"}>
                <ThemeMatrixView />
                <CuegisSandbox />
              </div>
            )}

            {/* ==================== VIEW 4: GLOSSARY, FORMULAS & THEORISTS ==================== */}
            {(viewMode === "lexicon" || visitedViews["lexicon"]) && (
              <div className={viewMode === "lexicon" ? "" : "hidden"} aria-hidden={viewMode !== "lexicon"}>
                <LexiconDossierView />
              </div>
            )}

            {/* ==================== VIEW 5: ACTIVE RECALL REVISION & EXAM HUB ==================== */}
            {(viewMode === "revision" || visitedViews["revision"]) && (
              <div className={viewMode === "revision" ? "" : "hidden"} aria-hidden={viewMode !== "revision"}>
                <ActiveRecallRevisionView />
              </div>
            )}

            {/* ==================== FALLBACK VIEW (SAFE DEFAULT) ==================== */}
            {!["home", "focus", "stream", "matrix", "lexicon", "revision"].includes(viewMode) && <HomeDashboard />}
          </div>
        </main>

        {/* Right Sticky Liquid Glass Analytical Inspector */}
        <BusinessRightInspector
          topic={activeTopic}
          isOpen={isInspectorOpen}
          onToggle={toggleInspector}
        />
      </div>



      {/* Diagnostics Modal available only via manual trigger */}

      {/* =====================================================================
          PERSISTENT LIVE SYSTEM DIAGNOSTICS MODAL
          ===================================================================== */}
      <LiveDiagnosticsModal
        isOpen={liveDiagOpen}
        onClose={() => setLiveDiagOpen(false)}
        onRebootDiagnostics={() => setForceStartupDiag(true)}
      />
    </div>

    {/* Timed Exam Sprint Full-Screen Simulation Modal */}
    <TimedExamSprintModal
      isOpen={isExamSprintActive}
      onClose={closeExamSprint}
      topic={activeTopic}
    />

    {/* Flagship Spacious Jelly Spotlight Command Palette */}
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
