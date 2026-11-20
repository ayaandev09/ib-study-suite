"use client";

import React, { useEffect } from "react";
import { AmbientAuroraCanvas } from "@/modules/geography/components/AmbientAuroraCanvas";
import { SideNav } from "@/modules/geography/components/SideNav";
import { SceneSwitcher } from "@/modules/geography/components/SceneSwitcher";
import { HomeDashboard } from "@/modules/geography/components/HomeDashboard";
import { TopCommandBar } from "@/modules/geography/components/TopCommandBar";
import { TopicBentoCard } from "@/modules/geography/components/TopicBentoCard";
import { StudyMiniHomepage } from "@/modules/geography/components/StudyMiniHomepage";
import { ThemeMatrixView } from "@/modules/geography/components/ThemeMatrixView";
import { LexiconDossierView } from "@/modules/geography/components/LexiconDossierView";
import { ActiveRecallRevisionView } from "@/modules/geography/components/ActiveRecallRevisionView";
import { GeographyRightInspector } from "@/modules/geography/components/GeographyRightInspector";
import { TimedExamSprintModal } from "@/modules/geography/components/TimedExamSprintModal";
import { JellySpotlightModal } from "@/modules/geography/components/JellySpotlightModal";
import { ALL_TOPICS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";

export default function IBGeographyStudyDashboardPage() {
  const {
    activeTopicId,
    viewMode,
    goToNextTopic,
    goToPrevTopic,
  } = useStudyStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
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
  }, [goToNextTopic, goToPrevTopic]);

  const [visitedViews, setVisitedViews] = React.useState<Record<string, boolean>>(() => ({ [viewMode]: true }));

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

  const activeTopic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  return (
    <div className="relative min-h-screen w-full bg-[#060402] overflow-x-clip text-slate-100">
      <AmbientAuroraCanvas />
      <div className="w-full max-w-[1760px] mx-auto px-5 sm:px-7 lg:px-8 py-4 flex items-start mac-dashboard-shell relative z-10">
        <SideNav />

        <main
          className="flex-1 min-w-0 w-full pb-36 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ containerType: "inline-size" }}
        >
          <TopCommandBar />

          {(viewMode === "home" || visitedViews["home"]) && (
            <div className={viewMode === "home" ? "" : "hidden"} aria-hidden={viewMode !== "home"}>
              <HomeDashboard />
            </div>
          )}

          {(viewMode === "focus" || visitedViews["focus"]) && (
            <div className={viewMode === "focus" ? "space-y-4" : "hidden"} aria-hidden={viewMode !== "focus"}>
              <SceneSwitcher />
              <TopicBentoCard topic={activeTopic} />
            </div>
          )}

          {(viewMode === "stream" || visitedViews["stream"]) && (
            <div className={viewMode === "stream" ? "" : "hidden"} aria-hidden={viewMode !== "stream"}>
              <StudyMiniHomepage />
            </div>
          )}

          {(viewMode === "matrix" || visitedViews["matrix"]) && (
            <div className={viewMode === "matrix" ? "" : "hidden"} aria-hidden={viewMode !== "matrix"}>
              <ThemeMatrixView />
            </div>
          )}

          {(viewMode === "lexicon" || visitedViews["lexicon"]) && (
            <div className={viewMode === "lexicon" ? "" : "hidden"} aria-hidden={viewMode !== "lexicon"}>
              <LexiconDossierView />
            </div>
          )}

          {(viewMode === "revision" || visitedViews["revision"]) && (
            <div className={viewMode === "revision" ? "" : "hidden"} aria-hidden={viewMode !== "revision"}>
              <ActiveRecallRevisionView />
            </div>
          )}
        </main>

        <GeographyRightInspector />
        <TimedExamSprintModal />
        <JellySpotlightModal />
      </div>
    </div>
  );
}
