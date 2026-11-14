"use client";

import React, { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeId } from "@/modules/physics/data/types";
import { ALL_TOPICS } from "@/modules/physics/data";
import { pushSyncToServer, SyncPayload } from "@/modules/physics/lib/syncService";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const InstanceContext = createContext<string>("default");

export interface InstanceNavState {
  activeTopicId: string;
  viewMode: ViewMode;
  activeThemeFilter: "all" | ThemeId;
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
  | "revision"
  | "formulas";

export type DeviceMode = "desktop" | "iphone16e";

export type StudyGoal =
  | "Grade 7 Master"
  | "45/45 Elite"
  | "Exam Speed Run"
  | "Diagnostic Cram";

export type WidgetTemplateSize = "small" | "medium" | "large";

interface StudyStoreState {
  activeTopicId: string;
  viewMode: ViewMode;
  activeThemeFilter: "all" | ThemeId;
  searchQuery: string;
  deviceMode: DeviceMode;
  academicStyle: "jakarta" | "garamond" | "newsreader";
  completedTopics: Record<string, boolean>;
  completedSubSections: Record<string, boolean>;
  bookmarkedTopics: Record<string, boolean>;
  bookmarkedFormulas: Record<string, boolean>;
  topicNotes: Record<string, string>;
  studyStreak: number;
  diagnosticsModalOpen: boolean;

  // Macbeth Alignment State
  isInspectorOpen: boolean;
  sidebarCollapsed: boolean;
  isExamSprintActive: boolean;
  isSpotlightOpen: boolean;
  isShortcutsOpen: boolean;
  isStartupActive: boolean;
  studyGoal: StudyGoal;
  studyLensMode: "primer" | "revision" | "deep";
  speedReadMode: boolean;
  widgetTemplate: WidgetTemplateSize;
  chapterSheetOpen: boolean;

  // Instance-scoped navigation
  instanceNavMap: Record<string, InstanceNavState>;
  setInstanceTopic: (instanceId: string, topicId: string) => void;
  setInstanceViewMode: (instanceId: string, mode: ViewMode) => void;
  setInstanceThemeFilter: (instanceId: string, filter: "all" | ThemeId) => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  // Actions
  triggerStartupIntro: () => void;
  dismissStartupIntro: () => void;
  setActiveTopic: (topicId: string) => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
  setViewMode: (mode: ViewMode) => void;
  setActiveThemeFilter: (filter: "all" | ThemeId) => void;
  levelFilter: "all" | "SL" | "HL";
  setLevelFilter: (filter: "all" | "SL" | "HL") => void;
  setSearchQuery: (query: string) => void;
  setDeviceMode: (mode: DeviceMode) => void;
  setAcademicStyle: (style: "jakarta" | "garamond" | "newsreader") => void;
  toggleTopicCompletion: (topicId: string) => void;
  toggleSubSectionComplete: (topicId: string, subId: string) => void;
  toggleTopicBookmark: (topicId: string) => void;
  toggleFormulaBookmark: (formulaId: string) => void;
  setTopicNote: (topicId: string, note: string) => void;
  saveTopicNote: (topicId: string, note: string) => void;
  setDiagnosticsModalOpen: (open: boolean) => void;
  setStudyLensMode: (mode: "primer" | "revision" | "deep") => void;
  toggleSpeedReadMode: () => void;
  applyRemoteSync: (payload: SyncPayload) => void;

  // New Actions
  toggleInspector: () => void;
  setIsInspectorOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openExamSprint: () => void;
  closeExamSprint: () => void;
  toggleExamSprint: () => void;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
  setIsShortcutsOpen: (open: boolean) => void;
  setStudyGoal: (goal: StudyGoal) => void;
  setWidgetTemplate: (template: WidgetTemplateSize) => void;
  setChapterSheetOpen: (open: boolean) => void;
  resetAllProgress: () => void;
}

const useRawStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      activeTopicId: "top-a1",
      viewMode: "home",
      activeThemeFilter: "all",
      levelFilter: "all",
      setLevelFilter: (filter) => set({ levelFilter: filter }),
      searchQuery: "",
      deviceMode: "desktop",
      academicStyle: "jakarta",
      completedTopics: {},
      completedSubSections: {},
      bookmarkedTopics: {},
      bookmarkedFormulas: {},
      topicNotes: {},
      studyStreak: 3,
      diagnosticsModalOpen: false,

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
                activeThemeFilter: s.activeThemeFilter,
                searchQuery: s.searchQuery,
              }),
              activeTopicId: topicId,
            },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "physics",
            instanceId,
            viewMode,
            topicId,
          },
          {
            appId: "physics",
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
                activeThemeFilter: s.activeThemeFilter,
                searchQuery: s.searchQuery,
              }),
              viewMode: mode,
            },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "physics",
            instanceId,
            viewMode: mode,
            topicId,
          },
          {
            appId: "physics",
            instanceId,
            viewMode: prevViewMode,
            topicId,
          }
        );
      },

      setInstanceThemeFilter: (instanceId: string, filter: "all" | ThemeId) =>
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

      setInstanceSearchQuery: (instanceId: string, query: string) =>
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

      // Flags
      isInspectorOpen: false,
      sidebarCollapsed: false,
      isExamSprintActive: false,
      isSpotlightOpen: false,
      isShortcutsOpen: false,
      isStartupActive: false,
      studyGoal: "Grade 7 Master",
      studyLensMode: "primer",
      speedReadMode: false,
      widgetTemplate: "medium",
      chapterSheetOpen: false,

      setActiveTopic: (topicId: string) => {
        const s = get();
        const prevTopicId = s.activeTopicId;
        set({ activeTopicId: topicId });
        pushSyncToServer({
          activeTopicId: topicId,
          viewMode: s.viewMode,
          completedTopics: s.completedTopics,
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "physics",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId,
          },
          {
            appId: "physics",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevTopicId,
          }
        );
      },

      goToNextTopic: () => {
        const currentId = get().activeTopicId;
        const idx = ALL_TOPICS.findIndex((t) => t.id === currentId);
        if (idx >= 0 && idx < ALL_TOPICS.length - 1) {
          const nextId = ALL_TOPICS[idx + 1].id;
          get().setActiveTopic(nextId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      goToPrevTopic: () => {
        const currentId = get().activeTopicId;
        const idx = ALL_TOPICS.findIndex((t) => t.id === currentId);
        if (idx > 0) {
          const prevId = ALL_TOPICS[idx - 1].id;
          get().setActiveTopic(prevId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },

      setViewMode: (mode: ViewMode) => {
        const s = get();
        const prevViewMode = s.viewMode;
        set({ viewMode: mode });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "physics",
            instanceId: "default",
            viewMode: mode,
            topicId: s.activeTopicId,
          },
          {
            appId: "physics",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: s.activeTopicId,
          }
        );
      },

      setActiveThemeFilter: (filter: "all" | ThemeId) => {
        set({ activeThemeFilter: filter });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setDeviceMode: (mode: DeviceMode) => {
        set({ deviceMode: mode });
      },

      setAcademicStyle: (style: "jakarta" | "garamond" | "newsreader") => {
        set({ academicStyle: style });
      },

      toggleTopicCompletion: (topicId: string) => {
        const updated = {
          ...get().completedTopics,
          [topicId]: !get().completedTopics[topicId],
        };
        set({ completedTopics: updated });
        pushSyncToServer({
          activeTopicId: get().activeTopicId,
          completedTopics: updated,
        });
      },

      toggleSubSectionComplete: (topicId: string, subId: string) => {
        const current = get().completedSubSections;
        set({
          completedSubSections: {
            ...current,
            [subId]: !current[subId],
          },
        });
      },

      setStudyLensMode: (mode: "primer" | "revision" | "deep") => {
        set({ studyLensMode: mode });
      },

      toggleSpeedReadMode: () => {
        set((s) => ({ speedReadMode: !s.speedReadMode }));
      },

      toggleTopicBookmark: (topicId: string) => {
        const current = get().bookmarkedTopics;
        set({
          bookmarkedTopics: {
            ...current,
            [topicId]: !current[topicId],
          },
        });
      },

      toggleFormulaBookmark: (formulaId: string) => {
        const current = get().bookmarkedFormulas;
        set({
          bookmarkedFormulas: {
            ...current,
            [formulaId]: !current[formulaId],
          },
        });
      },

      setDiagnosticsModalOpen: (open: boolean) => {
        set({ diagnosticsModalOpen: open });
      },

      setTopicNote: (topicId: string, note: string) => {
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: note,
          },
        }));
      },

      saveTopicNote: (topicId: string, note: string) => {
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: note,
          },
        }));
      },

      applyRemoteSync: (payload: SyncPayload) => {
        const updates: Partial<StudyStoreState> = {};
        if (payload.activeTopicId) updates.activeTopicId = payload.activeTopicId;
        if (payload.viewMode) updates.viewMode = payload.viewMode as ViewMode;
        if (payload.completedTopics) updates.completedTopics = payload.completedTopics;
        if (payload.academicStyle) {
          updates.academicStyle = payload.academicStyle as "jakarta" | "garamond" | "newsreader";
        }
        set(updates);
      },

      triggerStartupIntro: () => {
        set({ isStartupActive: true });
      },

      dismissStartupIntro: () => {
        set({ isStartupActive: false });
      },

      toggleInspector: () => {
        set((s) => ({ isInspectorOpen: !s.isInspectorOpen }));
      },

      setIsInspectorOpen: (open: boolean) => {
        set({ isInspectorOpen: open });
      },

      toggleSidebar: () => {
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed }));
      },

      openExamSprint: () => {
        set({ isExamSprintActive: true });
      },

      closeExamSprint: () => {
        set({ isExamSprintActive: false });
      },

      toggleExamSprint: () => {
        set((s) => ({ isExamSprintActive: !s.isExamSprintActive }));
      },

      openSpotlight: () => {
        set({ isSpotlightOpen: true });
      },

      closeSpotlight: () => {
        set({ isSpotlightOpen: false });
      },

      toggleSpotlight: () => {
        set((s) => ({ isSpotlightOpen: !s.isSpotlightOpen }));
      },

      setIsShortcutsOpen: (open: boolean) => {
        set({ isShortcutsOpen: open });
      },

      setStudyGoal: (goal: StudyGoal) => {
        set({ studyGoal: goal });
      },

      setWidgetTemplate: (template: WidgetTemplateSize) => {
        set({ widgetTemplate: template });
      },

      setChapterSheetOpen: (open: boolean) => {
        set({ chapterSheetOpen: open });
      },

      resetAllProgress: () => {
        set({
          completedTopics: {},
          completedSubSections: {},
          bookmarkedTopics: {},
          bookmarkedFormulas: {},
          topicNotes: {},
        });
      },
    }),
    {
      name: "ib-physics-sl-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        completedSubSections: state.completedSubSections,
        bookmarkedTopics: state.bookmarkedTopics,
        bookmarkedFormulas: state.bookmarkedFormulas,
        topicNotes: state.topicNotes,
        activeTopicId: state.activeTopicId,
        academicStyle: state.academicStyle,
        studyGoal: state.studyGoal,
        studyLensMode: state.studyLensMode,
        speedReadMode: state.speedReadMode,
        widgetTemplate: state.widgetTemplate,
        isInspectorOpen: state.isInspectorOpen,
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
        setActiveThemeFilter: (tf: "all" | ThemeId) => state.setInstanceThemeFilter(instanceId, tf),
        setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
      };
    }
    return {
      ...state,
      activeTopicId: currentId,
      viewMode: nav.viewMode ?? state.viewMode,
      activeThemeFilter: nav.activeThemeFilter ?? state.activeThemeFilter,
      searchQuery: nav.searchQuery ?? state.searchQuery,
      setActiveTopic: (tId: string) => state.setInstanceTopic(instanceId, tId),
      goToNextTopic,
      goToPrevTopic,
      setViewMode: (vm: ViewMode) => state.setInstanceViewMode(instanceId, vm),
      setActiveThemeFilter: (tf: "all" | ThemeId) => state.setInstanceThemeFilter(instanceId, tf),
      setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
    };
  }, [state, nav, instanceId]);

  return selector ? selector(scopedState) : (scopedState as unknown as T);
}

useStudyStore.getState = useRawStudyStore.getState;
useStudyStore.setState = useRawStudyStore.setState;
useStudyStore.subscribe = useRawStudyStore.subscribe;
