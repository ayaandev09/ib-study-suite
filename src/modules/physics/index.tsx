"use client";

import React, { memo, useEffect } from "react";
import PhysicsPage from "./app/page";
import { InstanceContext, useStudyStore, ViewMode } from "./store/useStudyStore";

interface ModuleProps {
  instanceId?: string;
  initialRoute?: string;
}

export const PhysicsModule = memo(function PhysicsModule({
  instanceId,
  initialRoute,
}: ModuleProps) {
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.appId === "physics" && detail.targetId) {
        useStudyStore.getState().setInstanceTopic(instanceId || "default", detail.targetId);
        if (detail.viewMode) {
          useStudyStore.getState().setInstanceViewMode(instanceId || "default", detail.viewMode);
        }
      }
    };
    const handleRestoreRoute = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (
        detail &&
        detail.appId === "physics" &&
        (!detail.instanceId || detail.instanceId === (instanceId || "default"))
      ) {
        if (detail.topicId) {
          useStudyStore
            .getState()
            .setInstanceTopic(instanceId || "default", detail.topicId);
        }
        if (detail.viewMode) {
          useStudyStore
            .getState()
            .setInstanceViewMode(
              instanceId || "default",
              detail.viewMode as ViewMode
            );
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
      <div className="w-full h-full relative subject-workspace subject-workspace-physics" data-instance-id={instanceId} data-subject="physics">
        <PhysicsPage />
      </div>
    </InstanceContext.Provider>
  );
});

export default PhysicsModule;
