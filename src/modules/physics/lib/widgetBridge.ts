"use client";

import { ALL_TOPICS, SYLLABUS_UNITS } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";

export type WidgetSyncTrigger =
  | "init"
  | "flip"
  | "topic-complete"
  | "navigation"
  | "heartbeat"
  | "force"
  | "state-change"
  | "native-load";

interface NativeMessageHandler {
  postMessage: (payload: unknown) => void;
}

function writeWidgetData(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const jsonString = JSON.stringify(payload);

  const handler = (
    window as unknown as {
      webkit?: { messageHandlers?: { studySync?: NativeMessageHandler } };
    }
  ).webkit?.messageHandlers?.studySync;

  if (handler) {
    try {
      handler.postMessage(jsonString);
    } catch (err) {
      console.warn("[WidgetBridge] Failed to postMessage:", err);
    }
  }

  try {
    window.localStorage.setItem("widget_data", jsonString);
    window.localStorage.setItem("study_widget_physics", jsonString);
  } catch {
    // LocalStorage fallback
  }
}

export function syncWidgetSnapshot(trigger: WidgetSyncTrigger = "init") {
  const state = useStudyStore.getState();
  const activeTopic =
    ALL_TOPICS.find((topic) => topic.id === state.activeTopicId) ||
    ALL_TOPICS[0];
  const activeUnit =
    SYLLABUS_UNITS.find((unit) => unit.id === activeTopic?.themeId) ||
    SYLLABUS_UNITS[0];
  const currentIndex = ALL_TOPICS.findIndex(
    (topic) => topic.id === activeTopic?.id
  );
  const nextTopic =
    currentIndex >= 0 && currentIndex < ALL_TOPICS.length - 1
      ? ALL_TOPICS[currentIndex + 1]
      : null;
  const completed = Object.values(state.completedTopics || {}).filter(
    Boolean
  ).length;
  const total = ALL_TOPICS.length || 22;
  const masteryPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  writeWidgetData({
    appId: "ib-physics",
    appTitle: "QUANTUM & COSMOS // 2026",
    subjectBadge: "IB PHYSICS SL",
    activeUnit: `Theme ${activeTopic?.displayCode.charAt(0) || "A"}: ${activeUnit?.title || "Mechanics"}`,
    activeTopicTitle: `${activeTopic?.displayCode || "A.1"} · ${activeTopic?.title || "Kinematics"}`,
    nextTopicTitle: nextTopic
      ? `${nextTopic.displayCode} · ${nextTopic.title}`
      : "Syllabus Complete!",
    completed,
    total,
    masteryPercentage,
    streakDays: state.studyStreak || 3,
    remainingMinutes: ALL_TOPICS.reduce(
      (sum, t) => (state.completedTopics?.[t.id] ? sum : sum + t.readingTimeMinutes),
      0
    ),
    highlightQuoteOrFormula:
      activeTopic?.primaryFormulas?.[0] || "s = ut + \\frac{1}{2}at^2",
    examTip:
      activeTopic?.examBlueprint?.paper1TrapPattern ||
      "Check SI base units before substituting values.",
    lastUpdated: new Date().toISOString(),
    trigger,
  });
}
