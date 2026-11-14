"use client";

import React, { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId, ConceptId } from "@/modules/business/data";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const InstanceContext = createContext<string>("default");

export interface InstanceNavState {
  activeTopicId: string;
  viewMode: ViewMode;
  activeUnitFilter: UnitId | "all";
  activeConceptFilter: ConceptId | "all";
  searchQuery: string;
}

export type ViewMode = "home" | "focus" | "stream" | "matrix" | "lexicon" | "revision";
export type DeviceMode = "mac" | "iphone16e";
export type StudyGoal = "revise" | "learn";
export type LearningPosture = "learn-new" | "pre-lesson-cram";
export type FlashcardDeckType = "glossary" | "formulas" | "theorists" | "exam-questions";
export type AcademicStyle = "newsreader" | "garamond" | "jakarta";
export type HandwrittenStyle = AcademicStyle;
export type WidgetTemplateSize = "small" | "medium" | "large";

export interface StudySyncPayload {
  completedTopics: Record<string, boolean>;
  completedSubSections: Record<string, boolean>;
  bookmarkedCases: Record<string, boolean>;
  topicNotes: Record<string, string>;
  activeTopicId: string;
  studyGoal: StudyGoal;
  academicStyle: AcademicStyle;
  speedReadMode: boolean;
  timestamp: number;
}

interface StudyStoreState {
  // Navigation & View State
  activeTopicId: string;
  activeUnitFilter: UnitId | "all";
  activeConceptFilter: ConceptId | "all";
  viewMode: ViewMode;
  deviceMode: "mac";
  studyGoal: StudyGoal;
  learningPosture: LearningPosture;
  academicStyle: AcademicStyle;
  handwrittenStyle: AcademicStyle;
  speedReadMode: boolean;
  searchQuery: string;
  sidebarCollapsed: boolean;
  unitSheetOpen: boolean;
  chapterSheetOpen: boolean;
  diagnosticsActive: boolean;
  syncToastMessage: string | null;
  isInspectorOpen: boolean;
  isExamSprintActive: boolean;
  isSpotlightOpen: boolean;
  widgetTemplate: WidgetTemplateSize;

  // Flashcards & Active Recall State
  activeFlashcardDeck: FlashcardDeckType;
  masteredFlashcards: Record<string, boolean>;

  // Persisted Study Progress State
  completedTopics: Record<string, boolean>;
  completedSubSections: Record<string, boolean>;
  bookmarkedCases: Record<string, boolean>;
  topicNotes: Record<string, string>;

  // Instance-scoped navigation
  instanceNavMap: Record<string, InstanceNavState>;
  setInstanceTopic: (instanceId: string, topicId: string) => void;
  setInstanceViewMode: (instanceId: string, mode: ViewMode) => void;
  setInstanceUnitFilter: (instanceId: string, unitId: UnitId | "all") => void;
  setInstanceConceptFilter: (instanceId: string, conceptId: ConceptId | "all") => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  // Navigation Actions
  setActiveTopic: (topicId: string) => void;
  setActiveUnitFilter: (unitId: UnitId | "all") => void;
  setActiveConceptFilter: (conceptId: ConceptId | "all") => void;
  setViewMode: (mode: ViewMode) => void;
  setDeviceMode: (device: DeviceMode) => void;
  setStudyGoal: (goal: StudyGoal) => void;
  setLearningPosture: (posture: LearningPosture) => void;
  setAcademicStyle: (style: AcademicStyle) => void;
  setHandwrittenStyle: (style: AcademicStyle) => void;
  toggleSpeedReadMode: () => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setUnitSheetOpen: (open: boolean) => void;
  setChapterSheetOpen: (open: boolean) => void;
  triggerDiagnostics: () => void;
  closeDiagnostics: () => void;
  setSyncToastMessage: (msg: string | null) => void;
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

  // Sync Engine Actions
  getSyncPayload: () => StudySyncPayload;
  hydrateFromSyncPayload: (payload: Partial<StudySyncPayload>) => void;

  // Active Recall & Flashcard Actions
  setActiveFlashcardDeck: (deck: FlashcardDeckType) => void;
  toggleFlashcardMastered: (id: string) => void;
  resetFlashcardProgress: () => void;

  // Progress Tracking Actions
  toggleTopicComplete: (topicId: string) => void;
  toggleSubSectionComplete: (topicId: string, subSectionId: string) => void;
  toggleUnitComplete: (unitId: UnitId) => void;
  toggleBookmarkCase: (caseId: string) => void;
  setTopicNote: (topicId: string, note: string) => void;
  resetAllProgress: () => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
  levelFilter: "all" | "SL" | "HL";
  setLevelFilter: (filter: "all" | "SL" | "HL") => void;
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
      studyGoal: "revise",
      learningPosture: "pre-lesson-cram",
      academicStyle: "newsreader",
      handwrittenStyle: "newsreader",
      speedReadMode: false,
      searchQuery: "",
      sidebarCollapsed: false,
      unitSheetOpen: false,
      chapterSheetOpen: false,
      diagnosticsActive: false,
      syncToastMessage: null,
      isInspectorOpen: false,
      isExamSprintActive: false,
      isSpotlightOpen: false,
      widgetTemplate: "medium",

      activeFlashcardDeck: "glossary",
      masteredFlashcards: {},

      completedTopics: {},
      completedSubSections: {},
      bookmarkedCases: {},
      topicNotes: {},

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
            appId: "business",
            instanceId,
            viewMode,
            topicId,
          },
          {
            appId: "business",
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
            appId: "business",
            instanceId,
            viewMode: mode,
            topicId,
          },
          {
            appId: "business",
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

      setActiveTopic: (topicId) => {
        const s = get();
        const prevTopicId = s.activeTopicId;
        set({
          activeTopicId: topicId,
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "business",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId,
          },
          {
            appId: "business",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevTopicId,
          }
        );
      },

      setActiveUnitFilter: (unitId) =>
        set({
          activeUnitFilter: unitId,
        }),

      setActiveConceptFilter: (conceptId) =>
        set({
          activeConceptFilter: conceptId,
        }),

      setViewMode: (mode) => {
        const s = get();
        const prevViewMode = s.viewMode;
        set({
          viewMode: mode,
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "business",
            instanceId: "default",
            viewMode: mode,
            topicId: s.activeTopicId,
          },
          {
            appId: "business",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: s.activeTopicId,
          }
        );
      },

      setDeviceMode: () =>
        set({
          deviceMode: "mac",
        }),

      setStudyGoal: (goal) =>
        set({
          studyGoal: goal,
          learningPosture: goal === "revise" ? "pre-lesson-cram" : "learn-new",
        }),

      setLearningPosture: (posture) =>
        set({
          learningPosture: posture,
          studyGoal: posture === "pre-lesson-cram" ? "revise" : "learn",
        }),

      setAcademicStyle: (style) =>
        set({
          academicStyle: style,
          handwrittenStyle: style,
        }),

      setHandwrittenStyle: (style) =>
        set({
          academicStyle: style,
          handwrittenStyle: style,
        }),

      toggleSpeedReadMode: () =>
        set((state) => ({
          speedReadMode: !state.speedReadMode,
        })),

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
        }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setUnitSheetOpen: (open) =>
        set({
          unitSheetOpen: open,
          chapterSheetOpen: open,
        }),

      setChapterSheetOpen: (open) =>
        set({
          unitSheetOpen: open,
          chapterSheetOpen: open,
        }),

      triggerDiagnostics: () =>
        set({
          diagnosticsActive: true,
        }),

      closeDiagnostics: () =>
        set({
          diagnosticsActive: false,
        }),

      setSyncToastMessage: (msg) =>
        set({
          syncToastMessage: msg,
        }),

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

      getSyncPayload: () => {
        const s = get();
        return {
          completedTopics: s.completedTopics,
          completedSubSections: s.completedSubSections,
          bookmarkedCases: s.bookmarkedCases,
          topicNotes: s.topicNotes,
          activeTopicId: s.activeTopicId,
          studyGoal: s.studyGoal,
          academicStyle: s.academicStyle,
          speedReadMode: s.speedReadMode,
          timestamp: Date.now(),
        };
      },

      hydrateFromSyncPayload: (payload) => {
        if (!payload) return;
        set((state) => ({
          completedTopics: payload.completedTopics || state.completedTopics,
          completedSubSections:
            payload.completedSubSections || state.completedSubSections,
          bookmarkedCases: payload.bookmarkedCases || state.bookmarkedCases,
          topicNotes: payload.topicNotes || state.topicNotes,
          activeTopicId: payload.activeTopicId || state.activeTopicId,
          studyGoal: payload.studyGoal || state.studyGoal,
          learningPosture:
            payload.studyGoal === "revise" ? "pre-lesson-cram" : "learn-new",
          academicStyle: payload.academicStyle || state.academicStyle,
          speedReadMode:
            typeof payload.speedReadMode === "boolean"
              ? payload.speedReadMode
              : state.speedReadMode,
          deviceMode: "mac",
          syncToastMessage: "✓ Live Synced: All Topics & Progress Loaded!",
        }));
      },

      setActiveFlashcardDeck: (deck) =>
        set({
          activeFlashcardDeck: deck,
        }),

      toggleFlashcardMastered: (id) =>
        set((state) => ({
          masteredFlashcards: {
            ...state.masteredFlashcards,
            [id]: !state.masteredFlashcards[id],
          },
        })),

      resetFlashcardProgress: () =>
        set({
          masteredFlashcards: {},
        }),

      toggleTopicComplete: (topicId) =>
        set((state) => ({
          completedTopics: {
            ...state.completedTopics,
            [topicId]: !state.completedTopics[topicId],
          },
        })),

      toggleSubSectionComplete: (_topicId, subSectionId) =>
        set((state) => ({
          completedSubSections: {
            ...state.completedSubSections,
            [subSectionId]: !state.completedSubSections[subSectionId],
          },
        })),

      toggleUnitComplete: (unitId) =>
        set((state) => {
          const unit = SYLLABUS_UNITS.find((u) => u.id === unitId);
          if (!unit) return state;

          const allUnitDone = unit.topics.every(
            (t) => !!state.completedTopics[t.id]
          );
          const targetState = !allUnitDone;

          const updatedTopics = { ...state.completedTopics };
          const updatedSubSections = { ...state.completedSubSections };

          unit.topics.forEach((t) => {
            updatedTopics[t.id] = targetState;
            t.subSections.forEach((sub) => {
              updatedSubSections[sub.id] = targetState;
            });
          });

          return {
            completedTopics: updatedTopics,
            completedSubSections: updatedSubSections,
          };
        }),

      toggleBookmarkCase: (caseId) =>
        set((state) => ({
          bookmarkedCases: {
            ...state.bookmarkedCases,
            [caseId]: !state.bookmarkedCases[caseId],
          },
        })),

      setTopicNote: (topicId, note) =>
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: note,
          },
        })),

      resetAllProgress: () =>
        set({
          completedTopics: {},
          completedSubSections: {},
          bookmarkedCases: {},
        }),

      goToNextTopic: () => {
        const { activeTopicId } = get();
        const idx = ALL_TOPICS.findIndex((t) => t.id === activeTopicId);
        if (idx >= 0 && idx < ALL_TOPICS.length - 1) {
          set({ activeTopicId: ALL_TOPICS[idx + 1].id });
        }
      },

      goToPrevTopic: () => {
        const { activeTopicId } = get();
        const idx = ALL_TOPICS.findIndex((t) => t.id === activeTopicId);
        if (idx > 0) {
          set({ activeTopicId: ALL_TOPICS[idx - 1].id });
        }
      },
    }),
    {
      name: "ib-bm-hl-study-store-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        completedSubSections: state.completedSubSections,
        bookmarkedCases: state.bookmarkedCases,
        topicNotes: state.topicNotes,
        activeTopicId: state.activeTopicId,
        studyGoal: state.studyGoal,
        academicStyle: state.academicStyle,
        speedReadMode: state.speedReadMode,
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
