import React, { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { ThemeId } from "@/modules/german/data/types";
import { ALL_SUBTOPICS } from "@/modules/german/data/themes";
import { GRAMMAR_POINTS } from "@/modules/german/data/grammar";
import { ALL_TEXTSORTEN } from "@/modules/german/data/textsorten";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const InstanceContext = createContext<string>("default");

export interface InstanceNavState {
  activeTopicId: string;
  viewMode: GermanNavMode;
  activeThemeId: ThemeId;
  searchQuery: string;
}

export type GermanNavMode =
  | "home"
  | "themen"
  | "stream"
  | "matrix"
  | "grammatik"
  | "textsorten"
  | "redemittel"
  | "pruefung"
  | "literatur"
  | "testdaf"
  | "revision";

export type AcademicStyle = "jakarta" | "newsreader" | "garamond";

interface GermanStudyState {
  // Navigation & View
  viewMode: GermanNavMode;
  setViewMode: (mode: GermanNavMode) => void;
  activeTopicId: string;
  setActiveTopic: (topicId: string) => void;
  activeThemeId: ThemeId;
  setActiveTheme: (themeId: ThemeId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Instance-scoped navigation
  instanceNavMap: Record<string, InstanceNavState>;
  setInstanceTopic: (instanceId: string, topicId: string) => void;
  setInstanceViewMode: (instanceId: string, mode: GermanNavMode) => void;
  setInstanceTheme: (instanceId: string, themeId: ThemeId) => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  // Study posture
  studyGoal: "learn" | "revise";
  setStudyGoal: (goal: "learn" | "revise") => void;

  // Filters
  levelFilter: "all" | "SL" | "HL";
  setLevelFilter: (filter: "all" | "SL" | "HL") => void;
  activeGrammarCategory: string;
  setActiveGrammarCategory: (cat: string) => void;
  activeThemeFilter: string;
  setActiveThemeFilter: (filter: string) => void;

  // Trackers (Progress)
  completedTopics: string[];
  toggleTopicComplete: (topicId: string) => void;
  masteredGrammar: string[];
  toggleGrammarMastered: (grammarId: string) => void;
  practicedTextsorten: string[];
  toggleTextsortePracticed: (textsorteId: string) => void;
  topicNotes: Record<string, string>;
  setTopicNote: (topicId: string, note: string) => void;
  goToPrevTopic: () => void;
  goToNextTopic: () => void;

  // Widget Template Switcher
  widgetTemplate: "small" | "medium" | "large";
  setWidgetTemplate: (size: "small" | "medium" | "large") => void;

  // UI Panels
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isInspectorOpen: boolean;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;

  // Modals
  isExamSprintActive: boolean;
  openExamSprint: () => void;
  closeExamSprint: () => void;
  toggleExamSprint: () => void;

  isSpotlightOpen: boolean;
  openSpotlight: () => void;
  closeSpotlight: () => void;

  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;

  // Typography
  academicStyle: AcademicStyle;
  setAcademicStyle: (style: AcademicStyle) => void;

  // Oral Exam Simulator Timer
  oralTimerSeconds: number;
  isOralTimerRunning: boolean;
  startOralTimer: () => void;
  pauseOralTimer: () => void;
  resetOralTimer: (seconds?: number) => void;
  tickOralTimer: () => void;

  // Calculated Progress
  getProgressStats: () => {
    totalTopics: number;
    completedTopicsCount: number;
    totalGrammar: number;
    masteredGrammarCount: number;
    totalTextsorten: number;
    practicedTextsortenCount: number;
    overallPercentage: number;
  };
}

export const useRawGermanStudyStore = create<GermanStudyState>((set, get) => {
  // Safe SSR initial state
  const isBrowser = typeof window !== "undefined";

  const loadFromStorage = (key: string, fallback: any) => {
    if (!isBrowser) return fallback;
    try {
      const stored = localStorage.getItem(`ib_german_codex_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const initialCompletedTopics = loadFromStorage("completedTopics", ["sub-1-1"]);
  const initialMasteredGrammar = loadFromStorage("masteredGrammar", ["g-faelle-grundlagen"]);
  const initialPracticedTextsorten = loadFromStorage("practicedTextsorten", ["artikel"]);

  return {
    viewMode: "home",
    levelFilter: "all",
    setLevelFilter: (filter) => set({ levelFilter: filter }),
    setViewMode: (mode) => {
      const s = get();
      const prevMode = s.viewMode;
      set({ viewMode: mode });
      useWorkspaceStore.getState().pushModuleRoute(
        {
          appId: "german",
          instanceId: "default",
          viewMode: mode,
          topicId: s.activeTopicId,
        },
        {
          appId: "german",
          instanceId: "default",
          viewMode: prevMode,
          topicId: s.activeTopicId,
        }
      );
    },
    activeTopicId: "sub-1-1",
    setActiveTopic: (topicId) => {
      const s = get();
      const prevTopicId = s.activeTopicId;
      const topic = ALL_SUBTOPICS.find((t) => t.id === topicId);
      if (topic) {
        set({ activeTopicId: topicId, activeThemeId: topic.themeId });
      } else {
        set({ activeTopicId: topicId });
      }
      useWorkspaceStore.getState().pushModuleRoute(
        {
          appId: "german",
          instanceId: "default",
          viewMode: s.viewMode,
          topicId,
        },
        {
          appId: "german",
          instanceId: "default",
          viewMode: s.viewMode,
          topicId: prevTopicId,
        }
      );
    },
    activeThemeId: "identitaeten",
    setActiveTheme: (themeId) => set({ activeThemeId: themeId }),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    instanceNavMap: {},

    setInstanceTopic: (instanceId: string, topicId: string) => {
      const s = get();
      const prev = s.instanceNavMap[instanceId];
      const prevTopicId = prev?.activeTopicId ?? s.activeTopicId;
      const topic = ALL_SUBTOPICS.find((t) => t.id === topicId);
      const themeId = topic ? topic.themeId : s.activeThemeId;
      const viewMode = prev?.viewMode ?? s.viewMode;
      set({
        instanceNavMap: {
          ...s.instanceNavMap,
          [instanceId]: {
            ...(prev || {
              activeTopicId: s.activeTopicId,
              viewMode: s.viewMode,
              activeThemeId: s.activeThemeId,
              searchQuery: s.searchQuery,
            }),
            activeTopicId: topicId,
            activeThemeId: themeId,
          },
        },
      });
      useWorkspaceStore.getState().pushModuleRoute(
        {
          appId: "german",
          instanceId,
          viewMode,
          topicId,
        },
        {
          appId: "german",
          instanceId,
          viewMode,
          topicId: prevTopicId,
        }
      );
    },

    setInstanceViewMode: (instanceId: string, mode: GermanNavMode) => {
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
              activeThemeId: s.activeThemeId,
              searchQuery: s.searchQuery,
            }),
            viewMode: mode,
          },
        },
      });
      useWorkspaceStore.getState().pushModuleRoute(
        {
          appId: "german",
          instanceId,
          viewMode: mode,
          topicId,
        },
        {
          appId: "german",
          instanceId,
          viewMode: prevViewMode,
          topicId,
        }
      );
    },

    setInstanceTheme: (instanceId: string, themeId: ThemeId) =>
      set((s) => ({
        instanceNavMap: {
          ...s.instanceNavMap,
          [instanceId]: {
            ...(s.instanceNavMap[instanceId] || {
              activeTopicId: s.activeTopicId,
              viewMode: s.viewMode,
              activeThemeId: s.activeThemeId,
              searchQuery: s.searchQuery,
            }),
            activeThemeId: themeId,
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
              activeThemeId: s.activeThemeId,
              searchQuery: s.searchQuery,
            }),
            searchQuery: query,
          },
        },
      })),

    studyGoal: "learn",
    setStudyGoal: (goal) => set({ studyGoal: goal }),

    activeGrammarCategory: "all",
    setActiveGrammarCategory: (cat) => set({ activeGrammarCategory: cat }),
    activeThemeFilter: "all",
    setActiveThemeFilter: (filter) => set({ activeThemeFilter: filter }),

    completedTopics: initialCompletedTopics,
    toggleTopicComplete: (topicId) => {
      set((state) => {
        const exists = state.completedTopics.includes(topicId);
        const next = exists
          ? state.completedTopics.filter((id) => id !== topicId)
          : [...state.completedTopics, topicId];
        if (typeof window !== "undefined") {
          localStorage.setItem("ib_german_codex_completedTopics", JSON.stringify(next));
        }
        return { completedTopics: next };
      });
    },

    masteredGrammar: initialMasteredGrammar,
    toggleGrammarMastered: (grammarId) => {
      set((state) => {
        const exists = state.masteredGrammar.includes(grammarId);
        const next = exists
          ? state.masteredGrammar.filter((id) => id !== grammarId)
          : [...state.masteredGrammar, grammarId];
        if (typeof window !== "undefined") {
          localStorage.setItem("ib_german_codex_masteredGrammar", JSON.stringify(next));
        }
        return { masteredGrammar: next };
      });
    },

    practicedTextsorten: initialPracticedTextsorten,
    toggleTextsortePracticed: (textsorteId) => {
      set((state) => {
        const exists = state.practicedTextsorten.includes(textsorteId);
        const next = exists
          ? state.practicedTextsorten.filter((id) => id !== textsorteId)
          : [...state.practicedTextsorten, textsorteId];
        if (typeof window !== "undefined") {
          localStorage.setItem("ib_german_codex_practicedTextsorten", JSON.stringify(next));
        }
        return { practicedTextsorten: next };
      });
    },

    topicNotes: loadFromStorage("topicNotes", {}),
    setTopicNote: (topicId, note) => {
      set((state) => {
        const next = { ...state.topicNotes, [topicId]: note };
        if (typeof window !== "undefined") {
          localStorage.setItem("ib_german_codex_topicNotes", JSON.stringify(next));
        }
        return { topicNotes: next };
      });
    },

    goToPrevTopic: () => {
      const currentId = get().activeTopicId;
      const idx = ALL_SUBTOPICS.findIndex((s) => s.id === currentId);
      if (idx > 0) {
        const prev = ALL_SUBTOPICS[idx - 1];
        set({ activeTopicId: prev.id, activeThemeId: prev.themeId });
      }
    },

    goToNextTopic: () => {
      const currentId = get().activeTopicId;
      const idx = ALL_SUBTOPICS.findIndex((s) => s.id === currentId);
      if (idx >= 0 && idx < ALL_SUBTOPICS.length - 1) {
        const next = ALL_SUBTOPICS[idx + 1];
        set({ activeTopicId: next.id, activeThemeId: next.themeId });
      }
    },

    widgetTemplate: "medium",
    setWidgetTemplate: (size) => set({ widgetTemplate: size }),

    sidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    isInspectorOpen: true,
    toggleInspector: () => set((state) => ({ isInspectorOpen: !state.isInspectorOpen })),
    setInspectorOpen: (open) => set({ isInspectorOpen: open }),

    isExamSprintActive: false,
    openExamSprint: () => set({ isExamSprintActive: true }),
    closeExamSprint: () => set({ isExamSprintActive: false }),
    toggleExamSprint: () => set((state) => ({ isExamSprintActive: !state.isExamSprintActive })),

    isSpotlightOpen: false,
    openSpotlight: () => set({ isSpotlightOpen: true }),
    closeSpotlight: () => set({ isSpotlightOpen: false }),

    isShortcutsOpen: false,
    setIsShortcutsOpen: (open) =>
      set((state) => ({
        isShortcutsOpen: typeof open === "function" ? open(state.isShortcutsOpen) : open,
      })),

    academicStyle: "jakarta",
    setAcademicStyle: (style) => set({ academicStyle: style }),

    oralTimerSeconds: 240, // 4 minutes default for presentation part
    isOralTimerRunning: false,
    startOralTimer: () => set({ isOralTimerRunning: true }),
    pauseOralTimer: () => set({ isOralTimerRunning: false }),
    resetOralTimer: (seconds = 240) => set({ oralTimerSeconds: seconds, isOralTimerRunning: false }),
    tickOralTimer: () =>
      set((state) => ({
        oralTimerSeconds: Math.max(0, state.oralTimerSeconds - 1),
      })),

    getProgressStats: () => {
      const state = get();
      const totalTopics = ALL_SUBTOPICS.length;
      const completedTopicsCount = state.completedTopics.length;
      const totalGrammar = GRAMMAR_POINTS.length;
      const masteredGrammarCount = state.masteredGrammar.length;
      const totalTextsorten = ALL_TEXTSORTEN.length;
      const practicedTextsortenCount = state.practicedTextsorten.length;

      const totalItems = totalTopics + totalGrammar + totalTextsorten;
      const completedItems =
        completedTopicsCount + masteredGrammarCount + practicedTextsortenCount;
      const overallPercentage = Math.round((completedItems / totalItems) * 100);

      return {
        totalTopics,
        completedTopicsCount,
        totalGrammar,
        masteredGrammarCount,
        totalTextsorten,
        practicedTextsortenCount,
        overallPercentage,
      };
    },
  };
});

export function useGermanStudyStore<T = GermanStudyState>(selector?: (state: GermanStudyState) => T): T {
  const instanceId = useContext(InstanceContext) || "default";
  const state = useRawGermanStudyStore();
  const nav = state.instanceNavMap?.[instanceId];

  const scopedState = useMemo(() => {
    const currentId = nav?.activeTopicId ?? state.activeTopicId;
    const goToPrevTopic = () => {
      const idx = ALL_SUBTOPICS.findIndex((s) => s.id === currentId);
      if (idx > 0) {
        const prev = ALL_SUBTOPICS[idx - 1];
        state.setInstanceTopic(instanceId, prev.id);
        state.setInstanceTheme(instanceId, prev.themeId);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const goToNextTopic = () => {
      const idx = ALL_SUBTOPICS.findIndex((s) => s.id === currentId);
      if (idx >= 0 && idx < ALL_SUBTOPICS.length - 1) {
        const next = ALL_SUBTOPICS[idx + 1];
        state.setInstanceTopic(instanceId, next.id);
        state.setInstanceTheme(instanceId, next.themeId);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (!nav) {
      return {
        ...state,
        setActiveTopic: (tId: string) => state.setInstanceTopic(instanceId, tId),
        goToPrevTopic,
        goToNextTopic,
        setViewMode: (vm: GermanNavMode) => state.setInstanceViewMode(instanceId, vm),
        setActiveTheme: (thId: ThemeId) => state.setInstanceTheme(instanceId, thId),
        setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
      };
    }
    return {
      ...state,
      activeTopicId: currentId,
      viewMode: nav.viewMode ?? state.viewMode,
      activeThemeId: nav.activeThemeId ?? state.activeThemeId,
      searchQuery: nav.searchQuery ?? state.searchQuery,
      setActiveTopic: (tId: string) => state.setInstanceTopic(instanceId, tId),
      goToPrevTopic,
      goToNextTopic,
      setViewMode: (vm: GermanNavMode) => state.setInstanceViewMode(instanceId, vm),
      setActiveTheme: (thId: ThemeId) => state.setInstanceTheme(instanceId, thId),
      setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
    };
  }, [state, nav, instanceId]);

  return selector ? selector(scopedState) : (scopedState as unknown as T);
}

useGermanStudyStore.getState = useRawGermanStudyStore.getState;
useGermanStudyStore.setState = useRawGermanStudyStore.setState;
useGermanStudyStore.subscribe = useRawGermanStudyStore.subscribe;
