"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AmbientAuroraCanvas } from "@/modules/physics/components/AmbientAuroraCanvas";
import { FloatingSidebar } from "@/modules/physics/components/FloatingSidebar";
import { SideNav } from "@/modules/physics/components/SideNav";
import { SceneSwitcher } from "@/modules/physics/components/SceneSwitcher";
import { HomeDashboard } from "@/modules/physics/components/HomeDashboard";
import { TopCommandBar } from "@/modules/physics/components/TopCommandBar";
import { WidgetBridge } from "@/modules/physics/components/WidgetBridge";
import { TopicBentoCard } from "@/modules/physics/components/TopicBentoCard";
import { ExecutiveStreamView } from "@/modules/physics/components/ExecutiveStreamView";
import { StudyMiniHomepage } from "@/modules/physics/components/StudyMiniHomepage";
import { ThemeMatrixView } from "@/modules/physics/components/ThemeMatrixView";
import { FormulaBankView } from "@/modules/physics/components/FormulaBankView";
import { DiagramLabView } from "@/modules/physics/components/DiagramLabView";
import { CaseStudyVaultView } from "@/modules/physics/components/CaseStudyVaultView";
import { ExamStructureMasteryView } from "@/modules/physics/components/ExamStructureMasteryView";
import { LexiconDossierView } from "@/modules/physics/components/LexiconDossierView";
import { ActiveRecallRevisionView } from "@/modules/physics/components/ActiveRecallRevisionView";
import { CinematicStartupIntro } from "@/modules/physics/components/CinematicStartupIntro";
import { PhysicsRightInspector } from "@/modules/physics/components/PhysicsRightInspector";
import { TimedExamSprintModal } from "@/modules/physics/components/TimedExamSprintModal";
import { JellySpotlightModal } from "@/modules/physics/components/JellySpotlightModal";
import { KeyboardShortcutsModal } from "@/modules/physics/components/KeyboardShortcutsModal";
import { ImmersiveAppWalkthrough } from "@/modules/physics/components/ImmersiveAppWalkthrough";
import { ALL_TOPICS, SYLLABUS_UNITS, PHYSICS_CONCEPTS, ThemeId } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import {
  initLiveSyncConnection,
  decodeSyncFromUrl,
  pullSyncFromServer,
} from "@/modules/physics/lib/syncService";
import { initGlobalTactileListener } from "@/modules/physics/lib/tactileHaptics";
import {
  Sparkles,
  Layers,
  SearchX,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Atom,
  Calculator,
} from "lucide-react";

export default function IBPhysicsSLStudyDashboardPage() {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    activeThemeFilter,
    setActiveThemeFilter,
    diagnosticsModalOpen,
    setDiagnosticsModalOpen,
    academicStyle,
    deviceMode,
    setDeviceMode,
    completedTopics,
    toggleTopicCompletion,
    goToNextTopic,
    goToPrevTopic,
    applyRemoteSync,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
    isSpotlightOpen,
    openSpotlight,
    closeSpotlight,
    isShortcutsOpen,
    setIsShortcutsOpen,
    toggleSidebar,
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
    const views = ["focus", "formulas", "diagrams", "matrix", "cases", "exam-guide", "lexicon", "revision", "stream"];
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

  const isStartupActiveStore = useStudyStore((s) => s.isStartupActive);
  const dismissStartupIntro = useStudyStore((s) => s.dismissStartupIntro);

  useEffect(() => {
    if (isStartupActiveStore) {
      setIsStartupActive(true);
    }
  }, [isStartupActiveStore]);

  const handleStartupComplete = useCallback(() => {
    setIsStartupActive(false);
    dismissStartupIntro();
    setShowMainUI(true);
  }, [dismissStartupIntro]);

  // Synchronize dynamic scholarly typography engine
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

  // Global Keyboard Navigation (Arrow keys between topics; accelerators handled in TopCommandBar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in inputs or textareas
      const target = e.target as HTMLElement | null;
      const isInput =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      // Left/Right Arrow Navigation (when not in input)
      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goToNextTopic();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToPrevTopic();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    goToNextTopic,
    goToPrevTopic,
  ]);

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

  const activeTheme = useMemo(
    () =>
      SYLLABUS_UNITS.find((u) => u.id === activeTopic.themeId) ||
      SYLLABUS_UNITS[0],
    [activeTopic.themeId]
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
      const matchesTheme =
        activeThemeFilter === "all" || t.themeId === activeThemeFilter;
      if (!matchesTheme) return false;
      if (!q) return true;

      const inHeader =
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.displayCode.toLowerCase().includes(q) ||
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
          cs.domainOrContext.toLowerCase().includes(q) ||
          cs.physicalMechanism.toLowerCase().includes(q)
      );

      return inHeader || inBullets || inSubsections || inCases;
    });
  }, [searchQuery, activeThemeFilter]);

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

      {/* 2. Main Study Dashboard - Fluid Liquid Glass Reveal */}
      <div
        className={`relative min-h-screen w-full bg-[#060402] overflow-x-clip text-slate-100 transition-opacity duration-700 ease-out ${
          showMainUI
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none select-none"
        }`}
      >
        <AmbientAuroraCanvas />

        {/* =====================================================================
            MAIN LIQUID GLASS SHELL WORKSPACE (MAC WIDESCREEN DASHBOARD)
            ===================================================================== */}
        <div className="max-w-[1760px] mx-auto px-5 sm:px-7 lg:px-8 py-4 flex items-start mac-dashboard-shell relative z-10">
          {/* Left Sticky Liquid Glass Navigation Sidebar */}
          <SideNav />

          {/* Main Content Column */}
          <main
            className="flex-1 min-w-0 w-full pb-36 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ containerType: "inline-size" }}
          >
            <WidgetBridge />

            {/* Command Bar */}
            <div className="relative z-20 mb-4">
              <TopCommandBar
                onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
                onOpenDiagnostics={() => setDiagnosticsModalOpen(true)}
              />
            </div>

            {/* Mini Homepage & Live Widget Telemetry Hub */}
            

            {/* Search Match Pill Bar */}
            {searchQuery.trim() && viewMode === "focus" && (
              <div className="liquid-glass-bento rounded-2xl p-4 mb-5 border border-indigo-400/30">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-xs text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Search Matches Across All Topics ({filteredTopics.length})
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Click a topic pill to inspect
                  </span>
                </div>
                {filteredTopics.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredTopics.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTopic(t.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                          t.id === activeTopicId
                            ? "liquid-glass-pill-active text-white"
                            : "liquid-glass-pill text-slate-300"
                        }`}
                      >
                        {t.displayCode} — {t.title}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-rose-300">
                    No topics matched &ldquo;{searchQuery}&rdquo;. Try another
                    keyword (e.g., &ldquo;SUVAT&rdquo;, &ldquo;Doppler&rdquo;,
                    &ldquo;gravitation&rdquo;, &ldquo;decay&rdquo;).
                  </p>
                )}
              </div>
            )}

            {/* ===============================================================
                VIEW WORKSPACE
                =============================================================== */}
            <div>
              {/* ===============================================================
                  MODE 1: SINGLE TOPIC BENTO FOCUS VIEW
                  =============================================================== */}
              {(viewMode === "home" || visitedViews["home"]) && (
                <div className={viewMode === "home" ? "" : "hidden"} aria-hidden={viewMode !== "home"}>
                  <HomeDashboard />
                </div>
              )}

              {(viewMode === "focus" || visitedViews["focus"]) && (
                <div className={viewMode === "focus" ? "space-y-5" : "hidden"} aria-hidden={viewMode !== "focus"}>
                  <SceneSwitcher />
                  {/* Compact Theme Context Strip */}
                  <div className="rounded-2xl px-4 py-2.5 border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0">
                        <Atom className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex items-baseline gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 uppercase shrink-0">
                          {activeTheme.code.startsWith("THEME") ? activeTheme.code : `Theme ${activeTheme.code}`}
                        </span>
                        <h2 className="text-xs sm:text-sm font-semibold text-white truncate">
                          {activeTheme.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {PHYSICS_CONCEPTS.slice(0, 4).map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold border cursor-default"
                          style={{
                            backgroundColor: c.badgeBg,
                            borderColor: c.badgeBorder,
                            color: c.badgeText,
                          }}
                        >
                          {c.shortName}
                        </span>
                      ))}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-400/30 shrink-0">
                        {activeTheme.topics.length} Topics
                      </span>
                    </div>
                  </div>

                  {/* Active Topic Bento Grid */}
                  <div
                    key={activeTopic.id}
                    data-tour="study-bento"
                    className="liquid-chapter-swap"
                  >
                    <TopicBentoCard topic={activeTopic} isDeferred={false} />
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
                        <div className="text-xs text-indigo-300">
                          {nextTopic.subtitle}
                        </div>
                      </div>

                      <div className="w-full sm:w-auto flex items-center justify-center shrink-0">
                        <button
                          onClick={() => {
                            if (!completedTopics[activeTopic.id]) {
                              toggleTopicCompletion(activeTopic.id);
                            }
                            goToNextTopic();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl liquid-glass-pill bg-gradient-to-r from-indigo-500/25 via-indigo-600/20 to-teal-600/20 hover:from-indigo-500/35 hover:via-indigo-600/30 hover:to-teal-600/30 border border-indigo-400/40 hover:border-indigo-400/70 text-white font-semibold text-xs shadow-[0_8px_30px_rgba(99,102,241,0.2)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer backdrop-blur-xl"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-300 group-hover:text-emerald-200 transition-colors" />
                          <span className="tracking-wide">
                            Complete {activeTopic.displayCode} &amp; Continue
                          </span>
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ===============================================================
                  MODE 2: CONTINUOUS ALL-TOPICS SPEED-READ STREAM
                  =============================================================== */}
              {(viewMode === "stream" || visitedViews["stream"]) && (
                <div className={viewMode === "stream" ? "" : "hidden"} aria-hidden={viewMode !== "stream"}>
                  <ExecutiveStreamView />
                </div>
              )}


              {/* ===============================================================
                  MODE 3: FORMULA BANK VIEW
                  =============================================================== */}
              {(viewMode === "formulas" || visitedViews["formulas"]) && (
                <div className={viewMode === "formulas" ? "" : "hidden"} aria-hidden={viewMode !== "formulas"}>
                  <FormulaBankView />
                </div>
              )}

              {/* ===============================================================
                  MODE 4: DIAGRAM LAB & VECTOR STUDIO
                  =============================================================== */}
              {(viewMode === "diagrams" || visitedViews["diagrams"]) && (
                <div className={viewMode === "diagrams" ? "" : "hidden"} aria-hidden={viewMode !== "diagrams"}>
                  <DiagramLabView />
                </div>
              )}

              {/* ===============================================================
                  MODE 5: 7 GUIDING CONCEPTS MATRIX VIEW
                  =============================================================== */}
              {(viewMode === "matrix" || visitedViews["matrix"]) && (
                <div className={viewMode === "matrix" ? "" : "hidden"} aria-hidden={viewMode !== "matrix"}>
                  <ThemeMatrixView />
                </div>
              )}

              {/* ===============================================================
                  MODE 6: REAL-WORLD CASE STUDY VAULT
                  =============================================================== */}
              {(viewMode === "cases" || visitedViews["cases"]) && (
                <div className={viewMode === "cases" ? "" : "hidden"} aria-hidden={viewMode !== "cases"}>
                  <CaseStudyVaultView />
                </div>
              )}

              {/* ===============================================================
                  MODE 7: EXAM STRUCTURE & UNCERTAINTIES GUIDE
                  =============================================================== */}
              {(viewMode === "exam-guide" || visitedViews["exam-guide"]) && (
                <div className={viewMode === "exam-guide" ? "" : "hidden"} aria-hidden={viewMode !== "exam-guide"}>
                  <ExamStructureMasteryView />
                </div>
              )}

              {/* ===============================================================
                  MODE 8: LEXICON DOSSIER
                  =============================================================== */}
              {(viewMode === "lexicon" || visitedViews["lexicon"]) && (
                <div className={viewMode === "lexicon" ? "" : "hidden"} aria-hidden={viewMode !== "lexicon"}>
                  <LexiconDossierView />
                </div>
              )}

              {/* ===============================================================
                  MODE 9: ACTIVE RECALL REVISION & QUIZ HUB
                  =============================================================== */}
              {(viewMode === "revision" || visitedViews["revision"]) && (
                <div className={viewMode === "revision" ? "" : "hidden"} aria-hidden={viewMode !== "revision"}>
                  <ActiveRecallRevisionView />
                </div>
              )}

              {/* ==================== FALLBACK VIEW (SAFE DEFAULT) ==================== */}
              {!["home", "focus", "stream", "formulas", "diagrams", "matrix", "cases", "exam-guide", "lexicon", "revision"].includes(viewMode) && (
                <HomeDashboard />
              )}
            </div>
          </main>

          {/* Right Sticky Liquid Glass Analytical Inspector */}
          <PhysicsRightInspector
            topic={activeTopic}
            isOpen={isInspectorOpen}
            onToggle={toggleInspector}
          />
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      <FloatingSidebar isMobileSheet={true} />

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

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
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
