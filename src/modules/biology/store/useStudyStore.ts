"use client";

import { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeId } from "@/modules/biology/data/types";
import { ALL_TOPICS } from "@/modules/biology/data";
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
  activeThemeFilter: "all" | ThemeId;
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
  activeThemeFilter: "all" | ThemeId;
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
  setInstanceThemeFilter: (instanceId: string, filter: "all" | ThemeId) => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  setActiveTopic: (topicId: string) => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
  setViewMode: (mode: ViewMode) => void;
  setActiveThemeFilter: (filter: "all" | ThemeId) => void;
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
      activeTopicId: "bio-a1-1",
      viewMode: "home",
      activeThemeFilter: "all",
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
                activeThemeFilter: s.activeThemeFilter,
                searchQuery: s.searchQuery,
              }),
              activeTopicId: topicId,
            },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "biology",
            instanceId,
            viewMode,
            topicId,
          },
          {
            appId: "biology",
            instanceId,
            viewMode,
            topicId: prevTopicId,
          }
        );
      },

      setInstanceViewMode: (instanceId, mode) => {
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
                activeThemeFilter: s.activeThemeFilter,
                searchQuery: s.searchQuery,
              }),
              viewMode: mode,
            },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "biology",
            instanceId,
            viewMode: mode,
            topicId,
          },
          {
            appId: "biology",
            instanceId,
            viewMode: prevViewMode,
            topicId,
          }
        );
      },

      setInstanceThemeFilter: (instanceId, filter) =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(s.instanceNavMap[instanceId] || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeThemeFilter: s.activeThemeFilter,
                searchQuery: s.searchQuery,
              }),
              activeThemeFilter: filter,
            },
          },
        })),

      setInstanceSearchQuery: (instanceId, query) =>
        set((s) => ({
          instanceNavMap: {
            ...s.instanceNavMap,
            [instanceId]: {
              ...(s.instanceNavMap[instanceId] || {
                activeTopicId: s.activeTopicId,
                viewMode: s.viewMode,
                activeThemeFilter: s.activeThemeFilter,
                searchQuery: s.searchQuery,
              }),
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
            appId: "biology",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId,
          },
          {
            appId: "biology",
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
            appId: "biology",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: nextId,
          },
          {
            appId: "biology",
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
            appId: "biology",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevId,
          },
          {
            appId: "biology",
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
            appId: "biology",
            instanceId: "default",
            viewMode: mode,
            topicId: s.activeTopicId,
          },
          {
            appId: "biology",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: s.activeTopicId,
          }
        );
      },
      setActiveThemeFilter: (filter) => set({ activeThemeFilter: filter }),
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

      toggleSubSectionComplete: (topicId, subId) => {
        const key = `${topicId}:${subId}`;
        set((s) => ({
          completedSubSections: {
            ...s.completedSubSections,
            [key]: !s.completedSubSections[key],
          },
        }));
      },

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
          activeTopicId: "bio-a1-1",
        }),
    }),
    {
      name: "ib-biology-slhl-2027-study-store-v1",
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
      activeThemeFilter: nav?.activeThemeFilter ?? rawState.activeThemeFilter,
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
      setActiveThemeFilter: (f: "all" | ThemeId) =>
        rawState.setInstanceThemeFilter(instanceId, f),
      setSearchQuery: (q: string) => rawState.setInstanceSearchQuery(instanceId, q),
    };
  }, [rawState, instanceId]);

  return selector ? selector(scopedState) : scopedState;
}

useStudyStore.getState = useRawStudyStore.getState;
useStudyStore.setState = useRawStudyStore.setState;
useStudyStore.subscribe = useRawStudyStore.subscribe;
