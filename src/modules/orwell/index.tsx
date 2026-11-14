"use client";

import React, { memo, useEffect } from "react";
import OrwellPage from "./app/page";
import { InstanceContext, useStudyStore, ViewMode } from "./store/useStudyStore";

interface ModuleProps {
  instanceId?: string;
  initialRoute?: string;
}

export const OrwellModule = memo(function OrwellModule({
  instanceId,
  initialRoute,
}: ModuleProps) {
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.appId === "orwell" && detail.targetId) {
        useStudyStore.getState().setInstanceChapter(instanceId || "default", detail.targetId);
        if (detail.viewMode) {
          useStudyStore.getState().setInstanceViewMode(instanceId || "default", detail.viewMode);
        }
      }
    };
    const handleRestoreRoute = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (
        detail &&
        detail.appId === "orwell" &&
        (!detail.instanceId || detail.instanceId === (instanceId || "default"))
      ) {
        if (detail.topicId) {
          useStudyStore.getState().setInstanceChapter(instanceId || "default", detail.topicId);
        }
        if (detail.viewMode) {
          useStudyStore.getState().setInstanceViewMode(instanceId || "default", detail.viewMode as ViewMode);
        }
      }
    };
    window.addEventListener("ib-suite-navigate", handleNavigate);
    window.addEventListener("ib-suite-restore-route", handleRestoreRoute);
    return () => {
      window.removeEventListener("ib-suite-navigate", handleNavigate);
      window.removeEventListener("ib-suite-restore-route", handleRestoreRoute);
    };
  }, [instanceId]);

  return (
    <InstanceContext.Provider value={instanceId || "default"}>
      <div className="w-full h-full relative subject-workspace subject-workspace-orwell" data-instance-id={instanceId} data-subject="orwell">
        <OrwellPage />
      </div>
    </InstanceContext.Provider>
  );
});

export default OrwellModule;
