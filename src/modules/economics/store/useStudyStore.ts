"use client";

import React, { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UnitId, ConceptId } from "@/modules/economics/data/types";
import { ALL_TOPICS } from "@/modules/economics/data";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const InstanceContext = createContext<string>("default");

export interface InstanceNavState {
  activeTopicId: string;
  viewMode: ViewMode;
  activeUnitFilter: UnitId | "all";
  activeConceptFilter: ConceptId | "all";
  searchQuery: string;
}

export type ViewMode =
  | "home"
  | "focus"
  | "stream"
  | "diagrams"
  | "matrix"
  | "cases"
  | "exam-guide"
  | "lexicon"
  | "revision";

export type DeviceMode = "mac" | "iphone16e";
export type LearningPosture = "learn-new" | "pre-lesson-cram";
export type AcademicStyle = "newsreader" | "garamond" | "jakarta";
export type WidgetTemplateSize = "small" | "medium" | "large";
export type FlashcardDeckType =
  | "glossary"
  | "diagrams"
  | "formulas"
  | "concepts"
  | "exam-questions";

interface StudyStoreState {
  // Navigation & View State
  activeTopicId: string;
  activeUnitFilter: UnitId | "all";
  activeConceptFilter: ConceptId | "all";
  viewMode: ViewMode;
  deviceMode: "mac";
  learningPosture: LearningPosture;
  academicStyle: AcademicStyle;
  speedReadMode: boolean;
  searchQuery: string;
  sidebarCollapsed: boolean;
  unitSheetOpen: boolean;
  qrModalOpen: boolean;
  diagnosticsModalOpen: boolean;
  isInspectorOpen: boolean;
  isExamSprintActive: boolean;
  isSpotlightOpen: boolean;
  widgetTemplate: WidgetTemplateSize;

  // Diagram Explorer State
  activeDiagramId: string;

  // Flashcards & Active Recall State
  activeFlashcardDeck: FlashcardDeckType;
  masteredFlashcards: Record<string, boolean>;

  // Study Progress State
  completedTopics: Record<string, boolean>;
  bookmarkedTopics: Record<string, boolean>;
  bookmarkedCaseStudies: Record<string, boolean>;
  topicNotes: Record<string, string>;

  // Focus Timer / Pomodoro
  timerSeconds: number;
  isTimerRunning: boolean;

  // Instance-scoped navigation
  instanceNavMap: Record<string, InstanceNavState>;
  setInstanceTopic: (instanceId: string, topicId: string) => void;
  setInstanceViewMode: (instanceId: string, mode: ViewMode) => void;
  setInstanceUnitFilter: (instanceId: string, unitId: UnitId | "all") => void;
  setInstanceConceptFilter: (instanceId: string, conceptId: ConceptId | "all") => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  // Actions
  setActiveTopic: (topicId: string) => void;
  setActiveUnitFilter: (unitId: UnitId | "all") => void;
  setActiveConceptFilter: (conceptId: ConceptId | "all") => void;
  setViewMode: (mode: ViewMode) => void;
  setDeviceMode: (device: DeviceMode) => void;
  setLearningPosture: (posture: LearningPosture) => void;
  setAcademicStyle: (style: AcademicStyle) => void;
  toggleSpeedReadMode: () => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setUnitSheetOpen: (open: boolean) => void;
  setQrModalOpen: (open: boolean) => void;
  setDiagnosticsModalOpen: (open: boolean) => void;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;
  openExamSprint: () => void;
  closeExamSprint: () => void;
  toggleExamSprint: () => void;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
  setSpotlightOpen: (open: boolean) => void;
  setWidgetTemplate: (template: WidgetTemplateSize) => void;
  setActiveDiagramId: (diagramId: string) => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
  resetAllProgress: () => void;
  levelFilter: "all" | "SL" | "HL";
  setLevelFilter: (filter: "all" | "SL" | "HL") => void;

  // Flashcards Actions
  setActiveFlashcardDeck: (deck: FlashcardDeckType) => void;
  toggleFlashcardMastered: (id: string) => void;
  resetFlashcardProgress: () => void;

  // Progress Actions
  toggleTopicCompleted: (topicId: string) => void;
  toggleTopicBookmarked: (topicId: string) => void;
  toggleCaseStudyBookmarked: (caseId: string) => void;
  saveTopicNote: (topicId: string, note: string) => void;

  // Timer Actions
  tickTimer: () => void;
  toggleTimerRunning: () => void;
  resetTimer: (seconds?: number) => void;

  applyRemoteSync: (payload: any) => void;
}

const useRawStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      activeTopicId: "u1-1",
      activeUnitFilter: "all",
      activeConceptFilter: "all",
      levelFilter: "all",
      setLevelFilter: (filter) => set({ levelFilter: filter }),
      viewMode: "home",
      deviceMode: "mac",
      learningPosture: "learn-new",
      academicStyle: "jakarta",
      speedReadMode: false,
      searchQuery: "",
      sidebarCollapsed: false,
      unitSheetOpen: false,
      qrModalOpen: false,
      diagnosticsModalOpen: false,
      isInspectorOpen: false,
      isExamSprintActive: false,
      isSpotlightOpen: false,
      widgetTemplate: "medium",

      instanceNavMap: {},

      setInstanceTopic: (instanceId: string, topicId: string) => {
        const s = get();
        const prev = s.instanceNavMap[instanceId];
        const prevTopicId = prev?.activeTopicId ?? s.activeTopicId;
        const viewMode = prev?.viewMode ?? s.viewMode;
        set({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(prev || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeUnitFilter: s.activeUnitFilter,
                activeConceptFilter: s.activeConceptFilter,
                searchQuery: s.searchQuery,
              }),
              activeTopicId: topicId,
            },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "economics",
            instanceId,
            viewMode,
            topicId,
          },
          {
            appId: "economics",
            instanceId,
            viewMode,
            topicId: prevTopicId,
          }
        );
      },

      setInstanceViewMode: (instanceId: string, mode: ViewMode) => {
        const s = get();
        const prev = s.instanceNavMap[instanceId];
        const prevViewMode = prev?.viewMode ?? s.viewMode;
        const topicId = prev?.activeTopicId ?? s.activeTopicId;
        set({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(prev || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeUnitFilter: s.activeUnitFilter,
                activeConceptFilter: s.activeConceptFilter,
                searchQuery: s.searchQuery,
              }),
              viewMode: mode,
            },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "economics",
            instanceId,
            viewMode: mode,
            topicId,
          },
          {
            appId: "economics",
            instanceId,
            viewMode: prevViewMode,
            topicId,
          }
        );
      },

      setInstanceUnitFilter: (instanceId: string, unitId: UnitId | "all") =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(s.instanceNavMap[instanceId] || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeUnitFilter: s.activeUnitFilter,
                activeConceptFilter: s.activeConceptFilter,
                searchQuery: s.searchQuery,
              }),
              activeUnitFilter: unitId,
            },
          },
        })),

      setInstanceConceptFilter: (instanceId: string, conceptId: ConceptId | "all") =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(s.instanceNavMap[instanceId] || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeUnitFilter: s.activeUnitFilter,
                activeConceptFilter: s.activeConceptFilter,
                searchQuery: s.searchQuery,
              }),
              activeConceptFilter: conceptId,
            },
          },
        })),

      setInstanceSearchQuery: (instanceId: string, query: string) =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(s.instanceNavMap[instanceId] || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeUnitFilter: s.activeUnitFilter,
                activeConceptFilter: s.activeConceptFilter,
                searchQuery: s.searchQuery,
              }),
              searchQuery: query,
            },
          },
        })),

      activeDiagramId: "diag-ppf",

      activeFlashcardDeck: "diagrams",
      masteredFlashcards: {},

      completedTopics: {},
      bookmarkedTopics: {},
      bookmarkedCaseStudies: {},
      topicNotes: {},

      timerSeconds: 25 * 60,
      isTimerRunning: false,

      setActiveTopic: (topicId) => {
        const s = get();
        const prevTopicId = s.activeTopicId;
        const prevViewMode = s.viewMode;
        const nextMode =
          prevViewMode === "focus" || prevViewMode === "stream"
            ? prevViewMode
            : "focus";
        set({
          activeTopicId: topicId,
          viewMode: nextMode,
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "economics",
            instanceId: "default",
            viewMode: nextMode,
            topicId,
          },
          {
            appId: "economics",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: prevTopicId,
          }
        );
      },

      setActiveUnitFilter: (unitId) => set({ activeUnitFilter: unitId }),
      setActiveConceptFilter: (conceptId) =>
        set({ activeConceptFilter: conceptId }),
      setViewMode: (mode) => {
        const s = get();
        const prevViewMode = s.viewMode;
        set({ viewMode: mode });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "economics",
            instanceId: "default",
            viewMode: mode,
            topicId: s.activeTopicId,
          },
          {
            appId: "economics",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: s.activeTopicId,
          }
        );
      },
      setDeviceMode: () => set({ deviceMode: "mac" }),
      setLearningPosture: (posture) => set({ learningPosture: posture }),
      setAcademicStyle: (style) => set({ academicStyle: style }),
      toggleSpeedReadMode: () =>
        set((state) => ({ speedReadMode: !state.speedReadMode })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setUnitSheetOpen: (open) => set({ unitSheetOpen: open }),
      setQrModalOpen: (open) => set({ qrModalOpen: open }),
      setDiagnosticsModalOpen: (open) => set({ diagnosticsModalOpen: open }),
      toggleInspector: () =>
        set((state) => ({
          isInspectorOpen: !state.isInspectorOpen,
        })),
      setInspectorOpen: (open) =>
        set({
          isInspectorOpen: open,
        }),
      openExamSprint: () =>
        set({
          isExamSprintActive: true,
        }),
      closeExamSprint: () =>
        set({
          isExamSprintActive: false,
        }),
      toggleExamSprint: () =>
        set((state) => ({
          isExamSprintActive: !state.isExamSprintActive,
        })),
      openSpotlight: () =>
        set({
          isSpotlightOpen: true,
        }),
      closeSpotlight: () =>
        set({
          isSpotlightOpen: false,
        }),
      toggleSpotlight: () =>
        set((state) => ({
          isSpotlightOpen: !state.isSpotlightOpen,
        })),
      setSpotlightOpen: (open) =>
        set({
          isSpotlightOpen: open,
        }),
      setWidgetTemplate: (template) =>
        set({
          widgetTemplate: template,
        }),
      setActiveDiagramId: (diagramId) => set({ activeDiagramId: diagramId }),

      goToNextTopic: () => {
        const curIdx = ALL_TOPICS.findIndex((t) => t.id === get().activeTopicId);
        if (curIdx >= 0 && curIdx < ALL_TOPICS.length - 1) {
          set({ activeTopicId: ALL_TOPICS[curIdx + 1].id });
        }
      },
      goToPrevTopic: () => {
        const curIdx = ALL_TOPICS.findIndex((t) => t.id === get().activeTopicId);
        if (curIdx > 0) {
          set({ activeTopicId: ALL_TOPICS[curIdx - 1].id });
        }
      },
      resetAllProgress: () =>
        set({ completedTopics: {}, masteredFlashcards: {} }),

      setActiveFlashcardDeck: (deck) => set({ activeFlashcardDeck: deck }),
      toggleFlashcardMastered: (id) =>
        set((state) => ({
          masteredFlashcards: {
            ...state.masteredFlashcards,
            [id]: !state.masteredFlashcards[id],
          },
        })),
      resetFlashcardProgress: () => set({ masteredFlashcards: {} }),

      toggleTopicCompleted: (topicId) =>
        set((state) => ({
          completedTopics: {
            ...state.completedTopics,
            [topicId]: !state.completedTopics[topicId],
          },
        })),
      toggleTopicBookmarked: (topicId) =>
        set((state) => ({
          bookmarkedTopics: {
            ...state.bookmarkedTopics,
            [topicId]: !state.bookmarkedTopics[topicId],
          },
        })),
      toggleCaseStudyBookmarked: (caseId) =>
        set((state) => ({
          bookmarkedCaseStudies: {
            ...state.bookmarkedCaseStudies,
            [caseId]: !state.bookmarkedCaseStudies[caseId],
          },
        })),
      saveTopicNote: (topicId, note) =>
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: note,
          },
        })),

      tickTimer: () =>
        set((state) => ({
          timerSeconds: Math.max(0, state.timerSeconds - 1),
        })),
      toggleTimerRunning: () =>
        set((state) => ({ isTimerRunning: !state.isTimerRunning })),
      resetTimer: (seconds = 25 * 60) =>
        set({ timerSeconds: seconds, isTimerRunning: false }),

      applyRemoteSync: (payload) =>
        set((state) => ({
          ...(payload.activeTopicId ? { activeTopicId: payload.activeTopicId } : {}),
          ...(payload.studyGoal ? { learningPosture: (payload.studyGoal === "revise" ? "pre-lesson-cram" : "learn-new") as LearningPosture } : {}),
          ...(payload.academicStyle ? { academicStyle: payload.academicStyle } : {}),
          ...(payload.completedTopics
            ? { completedTopics: { ...state.completedTopics, ...payload.completedTopics } }
            : {}),
        })),
    }),
    {
      name: "ib-econ-sl-study-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        learningPosture: state.learningPosture,
        academicStyle: state.academicStyle,
        speedReadMode: state.speedReadMode,
        completedTopics: state.completedTopics,
        bookmarkedTopics: state.bookmarkedTopics,
        bookmarkedCaseStudies: state.bookmarkedCaseStudies,
        masteredFlashcards: state.masteredFlashcards,
        topicNotes: state.topicNotes,
        activeFlashcardDeck: state.activeFlashcardDeck,
        activeDiagramId: state.activeDiagramId,
      }),
    }
  )
);

export function useStudyStore<T = StudyStoreState>(selector?: (state: StudyStoreState) => T): T {
  const instanceId = useContext(InstanceContext) || "default";
  const state = useRawStudyStore();
  const nav = state.instanceNavMap?.[instanceId];

  const scopedState = useMemo(() => {
    const currentId = nav?.activeTopicId ?? state.activeTopicId;
    const goToNextTopic = () => {
      const idx = ALL_TOPICS.findIndex((t) => t.id === currentId);
      if (idx >= 0 && idx < ALL_TOPICS.length - 1) {
        state.setInstanceTopic(instanceId, ALL_TOPICS[idx + 1].id);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const goToPrevTopic = () => {
      const idx = ALL_TOPICS.findIndex((t) => t.id === currentId);
      if (idx > 0) {
        state.setInstanceTopic(instanceId, ALL_TOPICS[idx - 1].id);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (!nav) {
      return {
        ...state,
        setActiveTopic: (tId: string) => state.setInstanceTopic(instanceId, tId),
        goToNextTopic,
        goToPrevTopic,
        setViewMode: (vm: ViewMode) => state.setInstanceViewMode(instanceId, vm),
        setActiveUnitFilter: (uf: UnitId | "all") => state.setInstanceUnitFilter(instanceId, uf),
        setActiveConceptFilter: (cf: ConceptId | "all") => state.setInstanceConceptFilter(instanceId, cf),
        setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
      };
    }
    return {
      ...state,
      activeTopicId: currentId,
      viewMode: nav.viewMode ?? state.viewMode,
      activeUnitFilter: nav.activeUnitFilter ?? state.activeUnitFilter,
      activeConceptFilter: nav.activeConceptFilter ?? state.activeConceptFilter,
      searchQuery: nav.searchQuery ?? state.searchQuery,
      setActiveTopic: (tId: string) => state.setInstanceTopic(instanceId, tId),
      goToNextTopic,
      goToPrevTopic,
      setViewMode: (vm: ViewMode) => state.setInstanceViewMode(instanceId, vm),
      setActiveUnitFilter: (uf: UnitId | "all") => state.setInstanceUnitFilter(instanceId, uf),
      setActiveConceptFilter: (cf: ConceptId | "all") => state.setInstanceConceptFilter(instanceId, cf),
      setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
    };
  }, [state, nav, instanceId]);

  return selector ? selector(scopedState) : (scopedState as unknown as T);
}

useStudyStore.getState = useRawStudyStore.getState;
useStudyStore.setState = useRawStudyStore.setState;
useStudyStore.subscribe = useRawStudyStore.subscribe;
