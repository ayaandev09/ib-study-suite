"use client";

import React, { useEffect } from "react";
import { InstanceContext, useStudyStore } from "./store/useStudyStore";
import IBGeographyStudyDashboardPage from "./app/page";

export function GeographyModule({
  instanceId = "default",
}: {
  instanceId?: string;
}) {
  useEffect(() => {
    const handleNavigateTopic = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        appId?: string;
        topicId?: string;
      };
      if (detail?.appId === "geography" && detail.topicId) {
        const store = useStudyStore.getState();
        if (instanceId && instanceId !== "default") {
          store.setInstanceTopic(instanceId, detail.topicId);
          store.setInstanceViewMode(instanceId, "focus");
        } else {
          store.setActiveTopic(detail.topicId);
          store.setViewMode("focus");
        }
      }
    };

    const handleRestoreRoute = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        appId?: string;
        instanceId?: string;
        viewMode?: string;
        topicId?: string;
      };
      if (detail?.appId === "geography") {
        const store = useStudyStore.getState();
        if (instanceId && instanceId !== "default") {
          if (detail.topicId) store.setInstanceTopic(instanceId, detail.topicId);
          if (detail.viewMode) store.setInstanceViewMode(instanceId, detail.viewMode as any);
        } else {
          if (detail.topicId) store.setActiveTopic(detail.topicId);
          if (detail.viewMode) store.setViewMode(detail.viewMode as any);
        }
      }
    };

    window.addEventListener("ib-navigate-topic", handleNavigateTopic);
    window.addEventListener("ib-restore-route", handleRestoreRoute);
    return () => {
      window.removeEventListener("ib-navigate-topic", handleNavigateTopic);
      window.removeEventListener("ib-restore-route", handleRestoreRoute);
    };
  }, [instanceId]);

  return (
    <InstanceContext.Provider value={instanceId}>
      <IBGeographyStudyDashboardPage />
    </InstanceContext.Provider>
  );
}

export default GeographyModule;
