"use client";

import React, { memo, useEffect } from "react";
import GermanPage from "./app/page";
import { InstanceContext, useGermanStudyStore, GermanNavMode } from "./store/useGermanStudyStore";

interface ModuleProps {
  instanceId?: string;
  initialRoute?: string;
}

const mapGermanNavMode = (mode: string): GermanNavMode => {
  if (mode === "home") return "home";
  if (mode === "revision" || mode === "revise") return "revision";
  if (mode === "textsorten" || mode === "matrix") return "textsorten";
  if (mode === "literatur" || mode === "literature") return "literatur";
  if (mode === "grammatik") return "grammatik";
  if (mode === "redemittel" || mode === "lexicon") return "redemittel";
  if (mode === "pruefung" || mode === "exam") return "pruefung";
  if (mode === "testdaf") return "testdaf";
  if (mode === "focus" || mode === "themen") return "themen";
  return "home";
};

export const GermanModule = memo(function GermanModule({
  instanceId,
  initialRoute,
}: ModuleProps) {
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.appId === "german" && detail.targetId) {
        useGermanStudyStore.getState().setInstanceTopic(instanceId || "default", detail.targetId);
        if (detail.viewMode) {
          useGermanStudyStore.getState().setInstanceViewMode(instanceId || "default", mapGermanNavMode(detail.viewMode));
        }
      }
    };
    const handleRestoreRoute = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (
        detail &&
        detail.appId === "german" &&
        (!detail.instanceId || detail.instanceId === (instanceId || "default"))
      ) {
        if (detail.topicId) {
          useGermanStudyStore.getState().setInstanceTopic(instanceId || "default", detail.topicId);
        }
        if (detail.viewMode) {
          useGermanStudyStore.getState().setInstanceViewMode(instanceId || "default", mapGermanNavMode(detail.viewMode));
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
      <div className="w-full h-full relative subject-workspace subject-workspace-german" data-instance-id={instanceId} data-subject="german">
        <GermanPage />
      </div>
    </InstanceContext.Provider>
  );
});

export default GermanModule;
