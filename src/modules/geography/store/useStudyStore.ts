"use client";

import { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UnitId } from "@/modules/geography/data/types";
import { ALL_TOPICS } from "@/modules/geography/data";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const InstanceContext = createContext<string>("default");

export type ViewMode =
  | "home"
  | "focus"
  | "stream"
  | "matrix"
  | "lexicon"
  | "revision";

export interface InstanceNavState {
  activeTopicId: string;
  viewMode: ViewMode;
  activeUnitFilter: "all" | UnitId;
  searchQuery: string;
}

export type StudyGoal =
  | "Grade 7 Master"
  | "45/45 Elite"
  | "Exam Speed Run"
  | "Diagnostic Cram";

interface StudyStoreState {
  activeTopicId: string;
  viewMode: ViewMode;
  activeUnitFilter: "all" | UnitId;
  searchQuery: string;
  academicStyle: "jakarta" | "garamond" | "newsreader";
  completedTopics: Record<string, boolean>;
  completedSubSections: Record<string, boolean>;
  bookmarkedTopics: Record<string, boolean>;
  topicNotes: Record<string, string>;
  studyStreak: number;
  levelFilter: "all" | "SL" | "HL";

  isInspectorOpen: boolean;
  sidebarCollapsed: boolean;
  isExamSprintActive: boolean;
  isSpotlightOpen: boolean;
  studyGoal: StudyGoal;
  studyLensMode: "primer" | "revision" | "deep";
  speedReadMode: boolean;

  instanceNavMap: Record<string, InstanceNavState>;
  setInstanceTopic: (instanceId: string, topicId: string) => void;
  setInstanceViewMode: (instanceId: string, mode: ViewMode) => void;
  setInstanceUnitFilter: (instanceId: string, filter: "all" | UnitId) => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  setActiveTopic: (topicId: string) => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
  setViewMode: (mode: ViewMode) => void;
  setActiveUnitFilter: (filter: "all" | UnitId) => void;
  setSearchQuery: (query: string) => void;
  setLevelFilter: (filter: "all" | "SL" | "HL") => void;
  setAcademicStyle: (style: "jakarta" | "garamond" | "newsreader") => void;
  toggleTopicCompletion: (topicId: string) => void;
  toggleSubSectionComplete: (topicId: string, subId: string) => void;
  toggleTopicBookmark: (topicId: string) => void;
  setTopicNote: (topicId: string, note: string) => void;
  setStudyLensMode: (mode: "primer" | "revision" | "deep") => void;
  toggleSpeedReadMode: () => void;
  toggleInspector: () => void;
  setIsInspectorOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openExamSprint: () => void;
  closeExamSprint: () => void;
  toggleExamSprint: () => void;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
  setStudyGoal: (goal: StudyGoal) => void;
  resetAllProgress: () => void;
}

const useRawStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      activeTopicId: "geo-1-1",
      viewMode: "home",
      activeUnitFilter: "all",
      searchQuery: "",
      academicStyle: "jakarta",
      completedTopics: {},
      completedSubSections: {},
      bookmarkedTopics: {},
      topicNotes: {},
      studyStreak: 4,
      levelFilter: "all",

      isInspectorOpen: false,
      sidebarCollapsed: false,
      isExamSprintActive: false,
      isSpotlightOpen: false,
      studyGoal: "Grade 7 Master",
      studyLensMode: "deep",
      speedReadMode: false,

      instanceNavMap: {},

      setInstanceTopic: (instanceId, topicId) => {
        const current = get().instanceNavMap[instanceId];
        const prevTopicId = current?.activeTopicId ?? get().activeTopicId;
        const currentViewMode = current?.viewMode ?? get().viewMode;
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              activeTopicId: topicId,
              viewMode: s.instanceNavMap[instanceId]?.viewMode ?? s.viewMode,
              activeUnitFilter:
                s.instanceNavMap[instanceId]?.activeUnitFilter ?? s.activeUnitFilter,
              searchQuery: s.instanceNavMap[instanceId]?.searchQuery ?? s.searchQuery,
            },
          },
        }));
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "geography",
            instanceId,
            viewMode: currentViewMode,
            topicId,
          },
          {
            appId: "geography",
            instanceId,
            viewMode: currentViewMode,
            topicId: prevTopicId,
          }
        );
      },

      setInstanceViewMode: (instanceId, mode) => {
        const current = get().instanceNavMap[instanceId];
        const prevViewMode = current?.viewMode ?? get().viewMode;
        const currentTopicId = current?.activeTopicId ?? get().activeTopicId;
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              activeTopicId:
                s.instanceNavMap[instanceId]?.activeTopicId ?? s.activeTopicId,
              viewMode: mode,
              activeUnitFilter:
                s.instanceNavMap[instanceId]?.activeUnitFilter ?? s.activeUnitFilter,
              searchQuery: s.instanceNavMap[instanceId]?.searchQuery ?? s.searchQuery,
            },
          },
        }));
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "geography",
            instanceId,
            viewMode: mode,
            topicId: currentTopicId,
          },
          {
            appId: "geography",
            instanceId,
            viewMode: prevViewMode,
            topicId: currentTopicId,
          }
        );
      },

      setInstanceUnitFilter: (instanceId, filter) =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              activeTopicId:
                s.instanceNavMap[instanceId]?.activeTopicId ?? s.activeTopicId,
              viewMode: s.instanceNavMap[instanceId]?.viewMode ?? s.viewMode,
              activeUnitFilter: filter,
              searchQuery: s.instanceNavMap[instanceId]?.searchQuery ?? s.searchQuery,
            },
          },
        })),

      setInstanceSearchQuery: (instanceId, query) =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              activeTopicId:
                s.instanceNavMap[instanceId]?.activeTopicId ?? s.activeTopicId,
              viewMode: s.instanceNavMap[instanceId]?.viewMode ?? s.viewMode,
              activeUnitFilter:
                s.instanceNavMap[instanceId]?.activeUnitFilter ?? s.activeUnitFilter,
              searchQuery: query,
            },
          },
        })),

      setActiveTopic: (topicId) => {
        const s = get();
        const prevTopicId = s.activeTopicId;
        set({ activeTopicId: topicId });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "geography",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId,
          },
          {
            appId: "geography",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevTopicId,
          }
        );
      },

      goToNextTopic: () => {
        const s = get();
        const prevTopicId = s.activeTopicId;
        const idx = ALL_TOPICS.findIndex((t) => t.id === prevTopicId);
        const nextIdx = idx >= 0 ? (idx + 1) % ALL_TOPICS.length : 0;
        const nextId = ALL_TOPICS[nextIdx].id;
        set({ activeTopicId: nextId });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "geography",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: nextId,
          },
          {
            appId: "geography",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevTopicId,
          }
        );
      },

      goToPrevTopic: () => {
        const s = get();
        const prevTopicId = s.activeTopicId;
        const idx = ALL_TOPICS.findIndex((t) => t.id === prevTopicId);
        const prevIdx =
          idx >= 0
            ? (idx - 1 + ALL_TOPICS.length) % ALL_TOPICS.length
            : ALL_TOPICS.length - 1;
        const prevId = ALL_TOPICS[prevIdx].id;
        set({ activeTopicId: prevId });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "geography",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevId,
          },
          {
            appId: "geography",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevTopicId,
          }
        );
      },

      setViewMode: (mode) => {
        const s = get();
        const prevViewMode = s.viewMode;
        set({ viewMode: mode });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "geography",
            instanceId: "default",
            viewMode: mode,
            topicId: s.activeTopicId,
          },
          {
            appId: "geography",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: s.activeTopicId,
          }
        );
      },

      setActiveUnitFilter: (filter) => set({ activeUnitFilter: filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setLevelFilter: (filter) => set({ levelFilter: filter }),
      setAcademicStyle: (style) => set({ academicStyle: style }),

      toggleTopicCompletion: (topicId) =>
        set((s) => ({
          completedTopics: {
            ...s.completedTopics,
            [topicId]: !s.completedTopics[topicId],
          },
        })),

      toggleSubSectionComplete: (topicId, subId) =>
        set((s) => {
          const key = `${topicId}:${subId}`;
          return {
            completedSubSections: {
              ...s.completedSubSections,
              [key]: !s.completedSubSections[key],
            },
          };
        }),

      toggleTopicBookmark: (topicId) =>
        set((s) => ({
          bookmarkedTopics: {
            ...s.bookmarkedTopics,
            [topicId]: !s.bookmarkedTopics[topicId],
          },
        })),

      setTopicNote: (topicId, note) =>
        set((s) => ({
          topicNotes: { ...s.topicNotes, [topicId]: note },
        })),

      setStudyLensMode: (mode) => set({ studyLensMode: mode }),
      toggleSpeedReadMode: () => set((s) => ({ speedReadMode: !s.speedReadMode })),
      toggleInspector: () => set((s) => ({ isInspectorOpen: !s.isInspectorOpen })),
      setIsInspectorOpen: (open) => set({ isInspectorOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      openExamSprint: () => set({ isExamSprintActive: true }),
      closeExamSprint: () => set({ isExamSprintActive: false }),
      toggleExamSprint: () =>
        set((s) => ({ isExamSprintActive: !s.isExamSprintActive })),
      openSpotlight: () => set({ isSpotlightOpen: true }),
      closeSpotlight: () => set({ isSpotlightOpen: false }),
      toggleSpotlight: () =>
        set((s) => ({ isSpotlightOpen: !s.isSpotlightOpen })),
      setStudyGoal: (goal) => set({ studyGoal: goal }),

      resetAllProgress: () =>
        set({
          completedTopics: {},
          completedSubSections: {},
          bookmarkedTopics: {},
          topicNotes: {},
          activeTopicId: "geo-1-1",
        }),
    }),
    {
      name: "ib-geography-slhl-study-store-v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        activeTopicId: state.activeTopicId,
        viewMode: state.viewMode,
        academicStyle: state.academicStyle,
        completedTopics: state.completedTopics,
        completedSubSections: state.completedSubSections,
        bookmarkedTopics: state.bookmarkedTopics,
        topicNotes: state.topicNotes,
        studyStreak: state.studyStreak,
        studyGoal: state.studyGoal,
        levelFilter: state.levelFilter,
      }),
    }
  )
);

export function useStudyStore(): StudyStoreState;
export function useStudyStore<T>(selector: (state: StudyStoreState) => T): T;
export function useStudyStore<T>(selector?: (state: StudyStoreState) => T): T | StudyStoreState {
  const instanceId = useContext(InstanceContext);
  const rawState = useRawStudyStore();

  const scopedState = useMemo((): StudyStoreState => {
    if (!instanceId || instanceId === "default") return rawState;
    const nav = rawState.instanceNavMap[instanceId];
    const currentTopicId = nav?.activeTopicId ?? rawState.activeTopicId;

    return {
      ...rawState,
      activeTopicId: currentTopicId,
      viewMode: nav?.viewMode ?? rawState.viewMode,
      activeUnitFilter: nav?.activeUnitFilter ?? rawState.activeUnitFilter,
      searchQuery: nav?.searchQuery ?? rawState.searchQuery,
      setActiveTopic: (id: string) => rawState.setInstanceTopic(instanceId, id),
      goToNextTopic: () => {
        const idx = ALL_TOPICS.findIndex((t) => t.id === currentTopicId);
        const nextIdx = idx >= 0 ? (idx + 1) % ALL_TOPICS.length : 0;
        rawState.setInstanceTopic(instanceId, ALL_TOPICS[nextIdx].id);
      },
      goToPrevTopic: () => {
        const idx = ALL_TOPICS.findIndex((t) => t.id === currentTopicId);
        const prevIdx =
          idx >= 0
            ? (idx - 1 + ALL_TOPICS.length) % ALL_TOPICS.length
            : ALL_TOPICS.length - 1;
        rawState.setInstanceTopic(instanceId, ALL_TOPICS[prevIdx].id);
      },
      setViewMode: (m: ViewMode) => rawState.setInstanceViewMode(instanceId, m),
      setActiveUnitFilter: (f: "all" | UnitId) =>
        rawState.setInstanceUnitFilter(instanceId, f),
      setSearchQuery: (q: string) => rawState.setInstanceSearchQuery(instanceId, q),
    };
  }, [rawState, instanceId]);

  return selector ? selector(scopedState) : scopedState;
}

useStudyStore.getState = useRawStudyStore.getState;
useStudyStore.setState = useRawStudyStore.setState;
useStudyStore.subscribe = useRawStudyStore.subscribe;
