"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { AmbientOledCanvas } from "@/components/AmbientOledCanvas";
import { LiquidGlassPhysics } from "@/components/LiquidGlassPhysics";
import { SuiteStartupIntro } from "@/components/SuiteStartupIntro";
import { ModuleStartupIntro } from "@/components/ModuleStartupIntro";
import { SafariTopCommandBar } from "@/components/SafariTopCommandBar";
import { BentoDashboard } from "@/components/BentoDashboard";
import { SplitWorkspaceLayout } from "@/components/SplitWorkspaceLayout";
import { SpatialExposeDrawer } from "@/components/SpatialExposeDrawer";
import { InteractiveWalkthrough } from "@/components/InteractiveWalkthrough";
import { SubjectSettingsModal } from "@/components/SubjectSettingsModal";

const SUITE_STARTUP_SESSION_KEY = "ib_suite_startup_seen_v1";
const WALKTHROUGH_DONE_KEY = "ib_suite_walkthrough_done_v1";

export default function UnifiedStudySuitePage() {
  const {
    activeView,
    setDashboardView,
    setWorkspaceView,
    toggleExpose,
    isExposeOpen,
    setExposeOpen,
    closeSplitView,
    secondarySplitInstanceId,
    openInstances,
    activateInstance,
    activeAppIntro,
    dismissAppIntro,
  } = useWorkspaceStore();

  // Start TRUE on initial render & static HTML so opaque #000000 startup covers frame 0 with zero dashboard flash
  const [showSuiteStartup, setShowSuiteStartup] = useState(true);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [isDemoWalkthrough, setIsDemoWalkthrough] = useState(false);
  const [settledView, setSettledView] = useState<"dashboard" | "workspace">(activeView);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const demoFlag = Boolean((window as unknown as { __IB_WALKTHROUGH_DEMO__?: boolean }).__IB_WALKTHROUGH_DEMO__);
    if (demoFlag) {
      // Demo app launches straight into the fluid walkthrough over the live dashboard, then triggers original startup animation at the end!
      setIsDemoWalkthrough(true);
      setShowSuiteStartup(false);
      setShowWalkthrough(true);
      return;
    }

    const walkthroughDone = localStorage.getItem(WALKTHROUGH_DONE_KEY);
    if (!walkthroughDone) {
      // Brand-new user: show the fluid spotlight walkthrough over the dashboard first, then play original startup animation!
      setShowSuiteStartup(false);
      setShowWalkthrough(true);
    } else {
      const seen = sessionStorage.getItem(SUITE_STARTUP_SESSION_KEY);
      if (seen) {
        setShowSuiteStartup(false);
      }
    }

    const handleReplay = () => setShowSuiteStartup(true);
    const handleOpenWalkthrough = () => setShowWalkthrough(true);
    window.addEventListener("ib-suite-replay-startup", handleReplay);
    window.addEventListener("ib-suite-open-walkthrough", handleOpenWalkthrough);
    return () => {
      window.removeEventListener("ib-suite-replay-startup", handleReplay);
      window.removeEventListener("ib-suite-open-walkthrough", handleOpenWalkthrough);
    };
  }, []);

  const handleSuiteStartupComplete = useCallback(() => {
    setShowSuiteStartup(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SUITE_STARTUP_SESSION_KEY, "1");
    }
  }, []);

  const handleCloseWalkthrough = useCallback(() => {
    setShowWalkthrough(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(WALKTHROUGH_DONE_KEY, "1");
    }
  }, []);

  const handleCompleteWalkthroughSetup = useCallback(() => {
    setShowWalkthrough(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(WALKTHROUGH_DONE_KEY, "1");
    }
    // Trigger the original dashboard startup animation + sound right after "Setting up your dashboard..."!
    setShowSuiteStartup(true);
  }, []);

  // Universal Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // ⌘0: Toggle Dashboard / Workspace
      if (isCmdOrCtrl && e.key === "0") {
        e.preventDefault();
        if (activeView === "dashboard") {
          setWorkspaceView();
        } else {
          setDashboardView();
        }
      }

      // ⌘E: Toggle Spatial Exposé / Mission Control
      if (isCmdOrCtrl && e.key.toLowerCase() === "e") {
        e.preventDefault();
        toggleExpose();
      }

      // ⌘\: Close Split View
      if (isCmdOrCtrl && (e.key === "\\" || e.key === "|")) {
        e.preventDefault();
        if (secondarySplitInstanceId) {
          closeSplitView();
        }
      }

      // Escape: Close Exposé
      if (e.key === "Escape") {
        if (isExposeOpen) {
          setExposeOpen(false);
        }
      }

      // ⌘1 - ⌘6: Switch directly between open instances
      if (isCmdOrCtrl && ["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (openInstances[index]) {
          e.preventDefault();
          activateInstance(openInstances[index].instanceId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeView,
    setDashboardView,
    setWorkspaceView,
    toggleExpose,
    isExposeOpen,
    setExposeOpen,
    secondarySplitInstanceId,
    closeSplitView,
    openInstances,
    activateInstance,
  ]);

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#F5F5F7] font-sans overflow-x-clip select-none sm:select-auto">
      {/* 0. Global 120fps Pointer-Reactive Liquid Glass Physics */}
      <LiquidGlassPhysics />

      {/* 0.5 Unified Suite & Per-App Liquid Glass Startup Sequences */}
      <AnimatePresence>
        {showSuiteStartup && (
          <SuiteStartupIntro
            key="suite-startup"
            isOpen={showSuiteStartup}
            onComplete={handleSuiteStartupComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showSuiteStartup && activeAppIntro && (
          <ModuleStartupIntro
            key={`module-startup-${activeAppIntro}`}
            appId={activeAppIntro}
            isOpen={Boolean(activeAppIntro)}
            onComplete={dismissAppIntro}
          />
        )}
      </AnimatePresence>

      {/* 1. Master 4K OLED Ambient Glass Canvas */}
      <AmbientOledCanvas />

      {/* 2. Unified Safari-Style Fixed Top Command Bar with Local AI Search */}
      <SafariTopCommandBar />

      {/* 3. Spatial Exposé / Mission Control Drawer */}
      <SpatialExposeDrawer />

      {/* 4. Active Spatial View Router (Zero-Reload DOM Persistence + Fluid Transitions) */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Bento Dashboard View */}
        <motion.div
          initial={false}
          animate={
            activeView === "dashboard"
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.985, y: 6 }
          }
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (activeView !== "dashboard") {
              setSettledView(activeView);
            }
          }}
          className={
            activeView !== "dashboard" && settledView === "dashboard"
              ? "fixed inset-0 z-0 pointer-events-none"
              : "relative z-10"
          }
          style={{
            display:
              activeView === "dashboard" || settledView === "dashboard"
                ? "block"
                : "none",
          }}
        >
          <BentoDashboard isRevealed={!showSuiteStartup} />
        </motion.div>

        {/* Unified Study Workspace View with Split Layout */}
        <motion.div
          initial={false}
          animate={
            activeView === "workspace"
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.985, y: 6 }
          }
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (activeView !== "workspace") {
              setSettledView(activeView);
            }
          }}
          className={
            activeView !== "workspace" && settledView === "workspace"
              ? "fixed inset-0 z-0 pointer-events-none"
              : "relative z-10"
          }
          style={{
            display:
              activeView === "workspace" || settledView === "workspace"
                ? "block"
                : "none",
          }}
        >
          <SplitWorkspaceLayout />
        </motion.div>
      </main>

      <InteractiveWalkthrough
        isOpen={showWalkthrough}
        onClose={handleCloseWalkthrough}
        onCompleteSetup={handleCompleteWalkthroughSetup}
        isDemoMode={isDemoWalkthrough}
      />
      <SubjectSettingsModal />
    </div>
  );
}
