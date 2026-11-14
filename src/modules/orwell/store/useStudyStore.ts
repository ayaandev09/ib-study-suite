"use client";

import React, { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ALL_CHAPTERS, BOOK_PARTS, ThemeId } from "@/modules/orwell/data";
import { pushSyncToServer, SyncPayload } from "@/modules/orwell/lib/syncService";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export const InstanceContext = createContext<string>("default");

export interface InstanceNavState {
  activeChapterId: string;
  viewMode: ViewMode;
  activePartFilter: "all" | "part-1" | "part-2" | "part-3";
  activeThemeFilter: ThemeId | "all";
  searchQuery: string;
}

export type ViewMode = "home" | "focus" | "stream" | "matrix" | "lexicon" | "revision";
export type DeviceMode = "mac" | "iphone16e";
export type StudyGoal = "learn" | "revise";
export type RevisionTab = "cram" | "flashcards" | "quiz" | "essays" | "cloze";
export type AcademicStyle = "newsreader" | "garamond" | "jakarta";
export type HandwrittenStyle = AcademicStyle;
export type WidgetTemplateSize = "small" | "medium" | "large";

interface StudyStoreState {
  // Navigation & View State
  activeChapterId: string;
  activePartFilter: "all" | "part-1" | "part-2" | "part-3";
  activeThemeFilter: ThemeId | "all";
  viewMode: ViewMode;
  deviceMode: "mac";
  studyGoal: StudyGoal;
  revisionTab: RevisionTab;
  academicStyle: AcademicStyle;
  handwrittenStyle: AcademicStyle;
  speedReadMode: boolean;
  searchQuery: string;
  sidebarCollapsed: boolean;
  chapterSheetOpen: boolean;
  spoilerMaskActive: boolean;
  diagnosticsActive: boolean;
  syncModalOpen: boolean;
  isInspectorOpen: boolean;
  isExamSprintActive: boolean;
  isSpotlightOpen: boolean;
  telescreenMode: boolean;
  widgetTemplate: WidgetTemplateSize;

  // Persisted Study Progress State
  completedChapters: Record<string, boolean>;
  completedSubSections: Record<string, boolean>;
  bookmarkedQuotes: Record<string, boolean>;
  chapterNotes: Record<string, string>;
  flashcardMastery: Record<string, boolean>;
  quizAnswers: Record<string, number>;
  quizSubmitted: boolean;

  // Instance-scoped navigation
  instanceNavMap: Record<string, InstanceNavState>;
  setInstanceChapter: (instanceId: string, chapterId: string) => void;
  setInstanceViewMode: (instanceId: string, mode: ViewMode) => void;
  setInstancePartFilter: (instanceId: string, partId: "all" | "part-1" | "part-2" | "part-3") => void;
  setInstanceThemeFilter: (instanceId: string, themeId: ThemeId | "all") => void;
  setInstanceSearchQuery: (instanceId: string, query: string) => void;

  // Actions
  setActiveChapter: (chapterId: string) => void;
  setActivePartFilter: (partId: "all" | "part-1" | "part-2" | "part-3") => void;
  setActiveThemeFilter: (themeId: ThemeId | "all") => void;
  setViewMode: (mode: ViewMode) => void;
  setDeviceMode: (device: DeviceMode) => void;
  setStudyGoal: (goal: StudyGoal) => void;
  setRevisionTab: (tab: RevisionTab) => void;
  setAcademicStyle: (style: AcademicStyle) => void;
  setHandwrittenStyle: (style: AcademicStyle) => void;
  toggleSpeedReadMode: () => void;
  toggleSpoilerMask: () => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setChapterSheetOpen: (open: boolean) => void;
  triggerDiagnostics: () => void;
  closeDiagnostics: () => void;
  setSyncModalOpen: (open: boolean) => void;
  toggleInspector: () => void;
  setInspectorOpen: (open: boolean) => void;
  openExamSprint: () => void;
  closeExamSprint: () => void;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
  setSpotlightOpen: (open: boolean) => void;
  setWidgetTemplate: (template: WidgetTemplateSize) => void;
  toggleTelescreenMode: () => void;
  toggleExamSprint: () => void;
  applyRemoteSync: (payload: SyncPayload) => void;

  // Progress Tracker Actions
  toggleChapterComplete: (chapterId: string) => void;
  toggleSubSectionComplete: (chapterId: string, subSectionId: string) => void;
  togglePartComplete: (partId: "part-1" | "part-2" | "part-3") => void;
  toggleBookmarkQuote: (quoteId: string) => void;
  setChapterNote: (chapterId: string, note: string) => void;
  toggleFlashcardMastery: (id: string) => void;
  setQuizAnswer: (questionId: string, optionIndex: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  resetAllProgress: () => void;
  goToNextChapter: () => void;
  goToPrevChapter: () => void;
}

const useRawStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      activeChapterId: "p1-c1",
      activePartFilter: "all",
      activeThemeFilter: "all",
      viewMode: "home",
      deviceMode: "mac",
      studyGoal: "revise",
      revisionTab: "cram",
      academicStyle: "newsreader",
      handwrittenStyle: "newsreader",
      speedReadMode: false,
      searchQuery: "",
      sidebarCollapsed: false,
      chapterSheetOpen: false,
      spoilerMaskActive: true,
      diagnosticsActive: true,
      syncModalOpen: false,
      isInspectorOpen: false,
      isExamSprintActive: false,
      isSpotlightOpen: false,
      telescreenMode: false,
      widgetTemplate: "medium",

      completedChapters: {},
      completedSubSections: {},
      bookmarkedQuotes: {},
      chapterNotes: {},
      flashcardMastery: {},
      quizAnswers: {},
      quizSubmitted: false,

      instanceNavMap: {},

      setInstanceChapter: (instanceId, chapterId) => {
        const state = get();
        const current = state.instanceNavMap[instanceId] || {
          activeChapterId: state.activeChapterId,
          viewMode: state.viewMode,
          activePartFilter: state.activePartFilter,
          activeThemeFilter: state.activeThemeFilter,
          searchQuery: state.searchQuery,
        };
        const prevChapterId = current.activeChapterId;
        set({
          instanceNavMap: {
            ...state.instanceNavMap,
            [instanceId]: { ...current, activeChapterId: chapterId },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "orwell",
            instanceId,
            viewMode: current.viewMode,
            topicId: chapterId,
          },
          {
            appId: "orwell",
            instanceId,
            viewMode: current.viewMode,
            topicId: prevChapterId,
          }
        );
      },

      setInstanceViewMode: (instanceId, mode) => {
        const state = get();
        const current = state.instanceNavMap[instanceId] || {
          activeChapterId: state.activeChapterId,
          viewMode: state.viewMode,
          activePartFilter: state.activePartFilter,
          activeThemeFilter: state.activeThemeFilter,
          searchQuery: state.searchQuery,
        };
        const prevViewMode = current.viewMode;
        set({
          instanceNavMap: {
            ...state.instanceNavMap,
            [instanceId]: { ...current, viewMode: mode },
          },
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "orwell",
            instanceId,
            viewMode: mode,
            topicId: current.activeChapterId,
          },
          {
            appId: "orwell",
            instanceId,
            viewMode: prevViewMode,
            topicId: current.activeChapterId,
          }
        );
      },

      setInstancePartFilter: (instanceId, partId) =>
        set((state) => {
          const current = state.instanceNavMap[instanceId] || {
            activeChapterId: state.activeChapterId,
            viewMode: state.viewMode,
            activePartFilter: state.activePartFilter,
            activeThemeFilter: state.activeThemeFilter,
            searchQuery: state.searchQuery,
          };
          return {
            instanceNavMap: {
              ...state.instanceNavMap,
              [instanceId]: { ...current, activePartFilter: partId },
            },
          };
        }),

      setInstanceThemeFilter: (instanceId, themeId) =>
        set((state) => {
          const current = state.instanceNavMap[instanceId] || {
            activeChapterId: state.activeChapterId,
            viewMode: state.viewMode,
            activePartFilter: state.activePartFilter,
            activeThemeFilter: state.activeThemeFilter,
            searchQuery: state.searchQuery,
          };
          return {
            instanceNavMap: {
              ...state.instanceNavMap,
              [instanceId]: { ...current, activeThemeFilter: themeId },
            },
          };
        }),

      setInstanceSearchQuery: (instanceId, query) =>
        set((state) => {
          const current = state.instanceNavMap[instanceId] || {
            activeChapterId: state.activeChapterId,
            viewMode: state.viewMode,
            activePartFilter: state.activePartFilter,
            activeThemeFilter: state.activeThemeFilter,
            searchQuery: state.searchQuery,
          };
          return {
            instanceNavMap: {
              ...state.instanceNavMap,
              [instanceId]: { ...current, searchQuery: query },
            },
          };
        }),

      setActiveChapter: (chapterId) => {
        const s = get();
        const prevChapterId = s.activeChapterId;
        set({
          activeChapterId: chapterId,
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "orwell",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: chapterId,
          },
          {
            appId: "orwell",
            instanceId: "default",
            viewMode: s.viewMode,
            topicId: prevChapterId,
          }
        );
      },

      setActivePartFilter: (partId) =>
        set({
          activePartFilter: partId,
        }),

      setActiveThemeFilter: (themeId) =>
        set({
          activeThemeFilter: themeId,
        }),

      setViewMode: (mode) => {
        const s = get();
        const prevViewMode = s.viewMode;
        set({
          viewMode: mode,
        });
        useWorkspaceStore.getState().pushModuleRoute(
          {
            appId: "orwell",
            instanceId: "default",
            viewMode: mode,
            topicId: s.activeChapterId,
          },
          {
            appId: "orwell",
            instanceId: "default",
            viewMode: prevViewMode,
            topicId: s.activeChapterId,
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
        }),

      setRevisionTab: (tab) =>
        set({
          revisionTab: tab,
        }),

      setAcademicStyle: (style) => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-academic-font", style);
          document.documentElement.setAttribute("data-handwritten-style", style);
        }
        set({ academicStyle: style, handwrittenStyle: style });
      },

      setHandwrittenStyle: (style) => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-academic-font", style);
          document.documentElement.setAttribute("data-handwritten-style", style);
        }
        set({ academicStyle: style, handwrittenStyle: style });
      },

      toggleSpeedReadMode: () =>
        set((state) => ({
          speedReadMode: !state.speedReadMode,
        })),

      toggleSpoilerMask: () =>
        set((state) => ({
          spoilerMaskActive: !state.spoilerMaskActive,
        })),

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
        }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setChapterSheetOpen: (open) =>
        set({
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

      setSyncModalOpen: (open) =>
        set({
          syncModalOpen: open,
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

      toggleExamSprint: () =>
        set((state) => ({
          isExamSprintActive: !state.isExamSprintActive,
        })),

      toggleTelescreenMode: () =>
        set((state) => ({
          telescreenMode: !state.telescreenMode,
        })),

      applyRemoteSync: (payload) => {
        set((state) => {
          const nextState = { ...state };
          if (payload.activeChapterId && payload.activeChapterId !== state.activeChapterId) {
            nextState.activeChapterId = payload.activeChapterId;
          }
          if (payload.studyGoal && payload.studyGoal !== state.studyGoal) {
            nextState.studyGoal = payload.studyGoal;
          }
          if (payload.academicStyle && payload.academicStyle !== state.academicStyle) {
            nextState.academicStyle = payload.academicStyle;
            nextState.handwrittenStyle = payload.academicStyle;
            if (typeof document !== "undefined") {
              document.documentElement.setAttribute("data-academic-font", payload.academicStyle);
              document.documentElement.setAttribute("data-handwritten-style", payload.academicStyle);
            }
          }
          if (typeof payload.speedReadMode === "boolean") {
            nextState.speedReadMode = payload.speedReadMode;
          }
          if (payload.completedChapters) {
            nextState.completedChapters = {
              ...state.completedChapters,
              ...payload.completedChapters,
            };
          }
          if (payload.completedSubSections) {
            nextState.completedSubSections = {
              ...state.completedSubSections,
              ...payload.completedSubSections,
            };
          }
          if (payload.bookmarkedQuotes) {
            nextState.bookmarkedQuotes = {
              ...state.bookmarkedQuotes,
              ...payload.bookmarkedQuotes,
            };
          }
          if (payload.chapterNotes) {
            nextState.chapterNotes = {
              ...state.chapterNotes,
              ...payload.chapterNotes,
            };
          }
          if (payload.flashcardMastery) {
            nextState.flashcardMastery = {
              ...state.flashcardMastery,
              ...payload.flashcardMastery,
            };
          }
          return nextState;
        });
      },

      toggleChapterComplete: (chapterId) =>
        set((state) => {
          const isCurrentlyCompleted = !!state.completedChapters[chapterId];
          const nextCompleted = !isCurrentlyCompleted;
          const chapter = ALL_CHAPTERS.find((c) => c.id === chapterId);

          const updatedSubSections = { ...state.completedSubSections };
          if (chapter) {
            chapter.subSections.forEach((sub) => {
              updatedSubSections[sub.id] = nextCompleted;
            });
          }

          return {
            completedChapters: {
              ...state.completedChapters,
              [chapterId]: nextCompleted,
            },
            completedSubSections: updatedSubSections,
          };
        }),

      toggleSubSectionComplete: (chapterId, subSectionId) =>
        set((state) => {
          const nextSubState = !state.completedSubSections[subSectionId];
          const updatedSubSections = {
            ...state.completedSubSections,
            [subSectionId]: nextSubState,
          };

          const chapter = ALL_CHAPTERS.find((c) => c.id === chapterId);
          let allSubsDone = false;
          if (chapter && chapter.subSections.length > 0) {
            allSubsDone = chapter.subSections.every(
              (sub) => !!updatedSubSections[sub.id]
            );
          }

          return {
            completedSubSections: updatedSubSections,
            completedChapters: {
              ...state.completedChapters,
              [chapterId]: allSubsDone,
            },
          };
        }),

      togglePartComplete: (partId) =>
        set((state) => {
          const part = BOOK_PARTS.find((p) => p.id === partId);
          if (!part) return state;

          const allPartDone = part.chapters.every(
            (ch) => !!state.completedChapters[ch.id]
          );
          const targetState = !allPartDone;

          const updatedChapters = { ...state.completedChapters };
          const updatedSubSections = { ...state.completedSubSections };

          part.chapters.forEach((ch) => {
            updatedChapters[ch.id] = targetState;
            ch.subSections.forEach((sub) => {
              updatedSubSections[sub.id] = targetState;
            });
          });

          return {
            completedChapters: updatedChapters,
            completedSubSections: updatedSubSections,
          };
        }),

      toggleBookmarkQuote: (quoteId) =>
        set((state) => ({
          bookmarkedQuotes: {
            ...state.bookmarkedQuotes,
            [quoteId]: !state.bookmarkedQuotes[quoteId],
          },
        })),

      setChapterNote: (chapterId, note) =>
        set((state) => ({
          chapterNotes: {
            ...state.chapterNotes,
            [chapterId]: note,
          },
        })),

      toggleFlashcardMastery: (id) =>
        set((state) => ({
          flashcardMastery: {
            ...state.flashcardMastery,
            [id]: !state.flashcardMastery[id],
          },
        })),

      setQuizAnswer: (questionId, optionIndex) =>
        set((state) => ({
          quizAnswers: {
            ...state.quizAnswers,
            [questionId]: optionIndex,
          },
        })),

      submitQuiz: () =>
        set({
          quizSubmitted: true,
        }),

      resetQuiz: () =>
        set({
          quizAnswers: {},
          quizSubmitted: false,
        }),

      resetAllProgress: () =>
        set({
          completedChapters: {},
          completedSubSections: {},
          bookmarkedQuotes: {},
          flashcardMastery: {},
          quizAnswers: {},
          quizSubmitted: false,
        }),

      goToNextChapter: () => {
        const { activeChapterId } = get();
        const idx = ALL_CHAPTERS.findIndex((c) => c.id === activeChapterId);
        if (idx >= 0 && idx < ALL_CHAPTERS.length - 1) {
          set({ activeChapterId: ALL_CHAPTERS[idx + 1].id });
        }
      },

      goToPrevChapter: () => {
        const { activeChapterId } = get();
        const idx = ALL_CHAPTERS.findIndex((c) => c.id === activeChapterId);
        if (idx > 0) {
          set({ activeChapterId: ALL_CHAPTERS[idx - 1].id });
        }
      },
    }),
    {
      name: "orwell-1984-liquid-study-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedChapters: state.completedChapters,
        completedSubSections: state.completedSubSections,
        bookmarkedQuotes: state.bookmarkedQuotes,
        chapterNotes: state.chapterNotes,
        activeChapterId: state.activeChapterId,
        studyGoal: state.studyGoal,
        handwrittenStyle: state.handwrittenStyle,
        speedReadMode: state.speedReadMode,
        flashcardMastery: state.flashcardMastery,
        spoilerMaskActive: state.spoilerMaskActive,
      }),
    }
  )
);

export function useStudyStore<T = StudyStoreState>(selector?: (state: StudyStoreState) => T): T {
  const instanceId = useContext(InstanceContext) || "default";
  const state = useRawStudyStore();
  const nav = state.instanceNavMap?.[instanceId];

  const scopedState = useMemo(() => {
    const currentId = nav?.activeChapterId ?? state.activeChapterId;
    const goToNextChapter = () => {
      const idx = ALL_CHAPTERS.findIndex((c) => c.id === currentId);
      if (idx >= 0 && idx < ALL_CHAPTERS.length - 1) {
        state.setInstanceChapter(instanceId, ALL_CHAPTERS[idx + 1].id);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const goToPrevChapter = () => {
      const idx = ALL_CHAPTERS.findIndex((c) => c.id === currentId);
      if (idx > 0) {
        state.setInstanceChapter(instanceId, ALL_CHAPTERS[idx - 1].id);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    if (!nav) {
      return {
        ...state,
        setActiveChapter: (chId: string) => state.setInstanceChapter(instanceId, chId),
        goToNextChapter,
        goToPrevChapter,
        setViewMode: (vm: ViewMode) => state.setInstanceViewMode(instanceId, vm),
        setActivePartFilter: (pf: "all" | "part-1" | "part-2" | "part-3") =>
          state.setInstancePartFilter(instanceId, pf),
        setActiveThemeFilter: (tf: ThemeId | "all") =>
          state.setInstanceThemeFilter(instanceId, tf),
        setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
      };
    }
    return {
      ...state,
      activeChapterId: currentId,
      viewMode: nav.viewMode ?? state.viewMode,
      activePartFilter: nav.activePartFilter ?? state.activePartFilter,
      activeThemeFilter: nav.activeThemeFilter ?? state.activeThemeFilter,
      searchQuery: nav.searchQuery ?? state.searchQuery,
      setActiveChapter: (chId: string) => state.setInstanceChapter(instanceId, chId),
      goToNextChapter,
      goToPrevChapter,
      setViewMode: (vm: ViewMode) => state.setInstanceViewMode(instanceId, vm),
      setActivePartFilter: (pf: "all" | "part-1" | "part-2" | "part-3") =>
        state.setInstancePartFilter(instanceId, pf),
      setActiveThemeFilter: (tf: ThemeId | "all") =>
        state.setInstanceThemeFilter(instanceId, tf),
      setSearchQuery: (sq: string) => state.setInstanceSearchQuery(instanceId, sq),
    };
  }, [state, nav, instanceId]);

  return selector ? selector(scopedState) : (scopedState as unknown as T);
}

useStudyStore.getState = useRawStudyStore.getState;
useStudyStore.subscribe = useRawStudyStore.subscribe;
useStudyStore.setState = useRawStudyStore.setState;

// Automatic bi-directional synchronization observer
if (typeof window !== "undefined") {
  useStudyStore.subscribe((state, prevState) => {
    if (
      state.activeChapterId !== prevState.activeChapterId ||
      state.studyGoal !== prevState.studyGoal ||
      state.academicStyle !== prevState.academicStyle ||
      state.speedReadMode !== prevState.speedReadMode ||
      state.completedChapters !== prevState.completedChapters ||
      state.completedSubSections !== prevState.completedSubSections ||
      state.bookmarkedQuotes !== prevState.bookmarkedQuotes ||
      state.chapterNotes !== prevState.chapterNotes ||
      state.flashcardMastery !== prevState.flashcardMastery
    ) {
      pushSyncToServer({
        activeChapterId: state.activeChapterId,
        studyGoal: state.studyGoal,
        academicStyle: state.academicStyle,
        speedReadMode: state.speedReadMode,
        completedChapters: state.completedChapters,
        completedSubSections: state.completedSubSections,
        bookmarkedQuotes: state.bookmarkedQuotes,
        chapterNotes: state.chapterNotes,
        flashcardMastery: state.flashcardMastery,
      });
    }
  });
}
