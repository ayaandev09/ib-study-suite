"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  AppId,
  ModuleInstance,
  SessionSnapshot,
  SplitRatio,
} from "@/types/workspace";
import { MODULE_CATALOG, PRESET_SNAPSHOTS } from "@/data/modulesMeta";

export interface NavHistoryRoute {
  appId: AppId;
  instanceId: string;
  viewMode?: string;
  topicId?: string;
}

export interface NavHistoryEntry {
  view: "dashboard" | "workspace";
  instanceId: string | null;
  route?: NavHistoryRoute;
}

let restoringRouteDepth = 0;
let pendingCoalesceInstanceId: string | null = null;

function appendNavHistory(
  history: NavHistoryEntry[],
  index: number,
  entry: NavHistoryEntry
): { navHistory: NavHistoryEntry[]; navIndex: number } {
  const current = history[index];
  if (
    current &&
    current.view === entry.view &&
    current.instanceId === entry.instanceId &&
    current.route?.appId === entry.route?.appId &&
    current.route?.viewMode === entry.route?.viewMode &&
    current.route?.topicId === entry.route?.topicId
  ) {
    return { navHistory: history, navIndex: index };
  }
  const sliced = history.slice(0, index + 1);
  const next = [...sliced, entry].slice(-30);
  return { navHistory: next, navIndex: next.length - 1 };
}

const ALL_SUBJECT_IDS = Object.keys(MODULE_CATALOG) as AppId[];
const DEFAULT_SUBJECT_LEVELS: Record<string, "SL" | "HL"> = Object.fromEntries(
  ALL_SUBJECT_IDS.map((id) => [id, id === "german" ? "SL" : "HL"])
);

export interface WorldClockItem {
  id: string;
  city: string;
  country: string;
  timezone: string;
  customLabel?: string;
}

export const DEFAULT_WORLD_CLOCKS: WorldClockItem[] = [
  { id: "munich", city: "Munich", country: "Germany", timezone: "Europe/Berlin" },
  { id: "islamabad", city: "Islamabad", country: "Pakistan", timezone: "Asia/Karachi" },
];

interface WorkspaceState {
  activeView: "dashboard" | "workspace";
  openInstances: ModuleInstance[];
  primaryInstanceId: string | null;
  secondarySplitInstanceId: string | null;
  splitRatio: SplitRatio;
  isExposeOpen: boolean;
  isSettingsOpen: boolean;
  isReleaseNotesOpen: boolean;
  isCapsuleCondensed: boolean;
  sessionSnapshots: SessionSnapshot[];
  enabledSubjects: AppId[];
  subjectLevels: Record<string, "SL" | "HL">;
  seenAppIntros: Partial<Record<AppId, boolean>>;
  activeAppIntro: AppId | null;
  navHistory: NavHistoryEntry[];
  navIndex: number;
  isRestoringHistory: boolean;
  worldClocks: WorldClockItem[];

  // Actions
  addWorldClock: (clock: WorldClockItem) => void;
  removeWorldClock: (id: string) => void;
  setWorldClocks: (clocks: WorldClockItem[]) => void;
  resetWorldClocks: () => void;
  triggerAppIntro: (appId: AppId) => void;
  dismissAppIntro: () => void;
  setSettingsOpen: (open: boolean) => void;
  setReleaseNotesOpen: (open: boolean) => void;
  setEnabledSubjects: (subjects: AppId[]) => void;
  toggleSubjectEnabled: (appId: AppId) => void;
  setSubjectLevel: (appId: AppId, level: "SL" | "HL") => void;
  setSubjectLevels: (levels: Record<string, "SL" | "HL">) => void;
  goBack: () => void;
  goForward: () => void;
  pushModuleRoute: (route: NavHistoryRoute, prevRoute?: NavHistoryRoute) => void;

  // Actions
  openModule: (
    appId: AppId,
    customLabel?: string,
    initialRoute?: string
  ) => string;
  launchOrActivateModule: (
    appId: AppId,
    customLabel?: string,
    initialRoute?: string
  ) => string;
  closeInstance: (instanceId: string) => void;
  activateInstance: (instanceId: string) => void;
  pinToSplitView: (instanceId: string) => void;
  pairInstancesInSplit: (
    primaryId: string,
    secondaryId: string,
    ratio?: SplitRatio
  ) => void;
  closeSplitView: () => void;
  setSplitRatio: (ratio: SplitRatio) => void;
  swapSplitPanes: () => void;
  toggleExpose: () => void;
  setExposeOpen: (open: boolean) => void;
  setDashboardView: () => void;
  setWorkspaceView: () => void;
  loadSnapshot: (snapshot: SessionSnapshot) => void;
  saveCurrentAsSnapshot: (name: string, description: string) => void;
  updateInstanceLabel: (instanceId: string, label: string) => void;
  setCapsuleCondensed: (condensed: boolean) => void;
  closeAllInstances: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      activeView: "dashboard",
      openInstances: [],
      primaryInstanceId: null,
      secondarySplitInstanceId: null,
      splitRatio: "50/50",
      isExposeOpen: false,
      isSettingsOpen: false,
      isReleaseNotesOpen: false,
      isCapsuleCondensed: false,
      sessionSnapshots: PRESET_SNAPSHOTS,
      enabledSubjects: ALL_SUBJECT_IDS,
      subjectLevels: DEFAULT_SUBJECT_LEVELS,
      seenAppIntros: {},
      activeAppIntro: null,
      navHistory: [{ view: "dashboard", instanceId: null }],
      navIndex: 0,
      isRestoringHistory: false,
      worldClocks: DEFAULT_WORLD_CLOCKS,

      addWorldClock: (clock) => {
        const current = get().worldClocks;
        if (current.some((c) => c.id === clock.id || (c.city === clock.city && c.timezone === clock.timezone))) return;
        set({ worldClocks: [...current, clock] });
      },
      removeWorldClock: (id) => {
        const next = get().worldClocks.filter((c) => c.id !== id);
        set({ worldClocks: next.length > 0 ? next : DEFAULT_WORLD_CLOCKS.slice(0, 1) });
      },
      setWorldClocks: (clocks) => set({ worldClocks: clocks }),
      resetWorldClocks: () => set({ worldClocks: DEFAULT_WORLD_CLOCKS }),

      setSettingsOpen: (open) => set({ isSettingsOpen: open }),
      setReleaseNotesOpen: (open) => set({ isReleaseNotesOpen: open }),

      setEnabledSubjects: (subjects) => {
        const valid = subjects.filter((id) => Boolean(MODULE_CATALOG[id]));
        const nextSubjects = valid.length > 0 ? valid : [ALL_SUBJECT_IDS[0]];
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "ib_suite_selected_subjects_v1",
              JSON.stringify(nextSubjects)
            );
          } catch {
            // ignore
          }
        }
        const { openInstances, primaryInstanceId, secondarySplitInstanceId, activeView } = get();
        const filteredInstances = openInstances.filter((inst) =>
          nextSubjects.includes(inst.appId)
        );
        const primaryStillExists = filteredInstances.some(
          (i) => i.instanceId === primaryInstanceId
        );
        const secondaryStillExists = filteredInstances.some(
          (i) => i.instanceId === secondarySplitInstanceId
        );
        const nextPrimary = primaryStillExists
          ? primaryInstanceId
          : filteredInstances[filteredInstances.length - 1]?.instanceId ?? null;
        const nextSecondary = secondaryStillExists ? secondarySplitInstanceId : null;
        const nextView = filteredInstances.length === 0 ? "dashboard" : activeView;

        set({
          enabledSubjects: nextSubjects,
          openInstances: filteredInstances,
          primaryInstanceId: nextPrimary,
          secondarySplitInstanceId: nextSecondary,
          activeView: nextView,
        });
      },

      toggleSubjectEnabled: (appId) => {
        const current = get().enabledSubjects;
        if (current.includes(appId)) {
          if (current.length <= 1) return;
          get().setEnabledSubjects(current.filter((id) => id !== appId));
        } else {
          get().setEnabledSubjects([...current, appId]);
        }
      },

      setSubjectLevel: (appId, level) => {
        const next = { ...get().subjectLevels, [appId]: level };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("ib_suite_subject_levels_v1", JSON.stringify(next));
          } catch {
            // ignore
          }
        }
        set({ subjectLevels: next });
      },

      setSubjectLevels: (levels) => {
        const next = { ...DEFAULT_SUBJECT_LEVELS, ...levels };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("ib_suite_subject_levels_v1", JSON.stringify(next));
          } catch {
            // ignore
          }
        }
        set({ subjectLevels: next });
      },

      triggerAppIntro: (appId) => {
        set({ activeAppIntro: appId });
      },

      pushModuleRoute: (route, prevRoute) => {
        if (restoringRouteDepth > 0 || get().isRestoringHistory) return;
        const state = get();
        if (state.activeView !== "workspace") return;
        const targetInstanceId =
          route.instanceId && route.instanceId !== "default"
            ? route.instanceId
            : state.primaryInstanceId;
        if (
          !targetInstanceId ||
          (targetInstanceId !== state.primaryInstanceId &&
            targetInstanceId !== state.secondarySplitInstanceId)
        ) {
          return;
        }
        const entry: NavHistoryEntry = {
          view: "workspace",
          instanceId: targetInstanceId,
          route: {
            ...route,
            instanceId: targetInstanceId,
          },
        };

        // Coalesce multiple synchronous route updates in the same event handler
        // (e.g. setInstanceTopic + setInstanceViewMode in a single click or search jump)
        if (
          pendingCoalesceInstanceId === targetInstanceId &&
          state.navIndex > 0 &&
          state.navHistory[state.navIndex]?.view === "workspace" &&
          state.navHistory[state.navIndex]?.instanceId === targetInstanceId
        ) {
          const nextHistory = [...state.navHistory.slice(0, state.navIndex), entry];
          set({
            navHistory: nextHistory,
            navIndex: nextHistory.length - 1,
          });
          return;
        }

        let baseHistory = state.navHistory;
        const current = baseHistory[state.navIndex];
        if (
          current &&
          current.view === "workspace" &&
          current.instanceId === targetInstanceId &&
          !current.route &&
          prevRoute
        ) {
          baseHistory = baseHistory.map((item, idx) =>
            idx === state.navIndex
              ? {
                  ...item,
                  route: {
                    ...prevRoute,
                    instanceId: targetInstanceId,
                  },
                }
              : item
          );
        }

        const appended = appendNavHistory(baseHistory, state.navIndex, entry);
        if (appended.navHistory !== baseHistory || appended.navIndex !== state.navIndex) {
          pendingCoalesceInstanceId = targetInstanceId;
          Promise.resolve().then(() => {
            if (pendingCoalesceInstanceId === targetInstanceId) {
              pendingCoalesceInstanceId = null;
            }
          });
        }
        set(appended);
      },

      goBack: () => {
        const { navHistory, navIndex, openInstances, activeView, primaryInstanceId } = get();
        const dispatchRestore = (route?: NavHistoryRoute) => {
          if (!route || typeof window === "undefined") return;
          restoringRouteDepth += 1;
          set({ isRestoringHistory: true });
          try {
            window.dispatchEvent(
              new CustomEvent("ib-suite-restore-route", { detail: route })
            );
          } finally {
            restoringRouteDepth = Math.max(0, restoringRouteDepth - 1);
            set({ isRestoringHistory: false });
          }
        };

        if (navIndex <= 0) {
          if (activeView === "workspace") {
            const currentWorkspaceEntry: NavHistoryEntry =
              navHistory[0]?.view === "workspace"
                ? navHistory[0]
                : { view: "workspace", instanceId: primaryInstanceId };
            const restHistory = navHistory.slice(1);
            set({
              activeView: "dashboard",
              isExposeOpen: false,
              navHistory: [
                { view: "dashboard" as const, instanceId: primaryInstanceId },
                currentWorkspaceEntry,
                ...restHistory,
              ].slice(0, 30),
              navIndex: 0,
            });
          }
          return;
        }
        let targetIdx = navIndex - 1;
        while (targetIdx >= 0) {
          const entry = navHistory[targetIdx];
          if (entry.view === "dashboard") {
            set({
              activeView: "dashboard",
              isExposeOpen: false,
              navIndex: targetIdx,
            });
            return;
          }
          if (
            entry.instanceId &&
            openInstances.some((i) => i.instanceId === entry.instanceId)
          ) {
            set({
              activeView: "workspace",
              primaryInstanceId: entry.instanceId,
              isExposeOpen: false,
              navIndex: targetIdx,
            });
            dispatchRestore(entry.route);
            return;
          }
          targetIdx -= 1;
        }
        set({
          activeView: "dashboard",
          isExposeOpen: false,
          navIndex: 0,
        });
      },

      goForward: () => {
        const { navHistory, navIndex, openInstances } = get();
        if (navIndex >= navHistory.length - 1) return;
        const dispatchRestore = (route?: NavHistoryRoute) => {
          if (!route || typeof window === "undefined") return;
          restoringRouteDepth += 1;
          set({ isRestoringHistory: true });
          try {
            window.dispatchEvent(
              new CustomEvent("ib-suite-restore-route", { detail: route })
            );
          } finally {
            restoringRouteDepth = Math.max(0, restoringRouteDepth - 1);
            set({ isRestoringHistory: false });
          }
        };
        let targetIdx = navIndex + 1;
        while (targetIdx < navHistory.length) {
          const entry = navHistory[targetIdx];
          if (entry.view === "dashboard") {
            set({
              activeView: "dashboard",
              isExposeOpen: false,
              navIndex: targetIdx,
            });
            return;
          }
          if (
            entry.instanceId &&
            openInstances.some((i) => i.instanceId === entry.instanceId)
          ) {
            set({
              activeView: "workspace",
              primaryInstanceId: entry.instanceId,
              isExposeOpen: false,
              navIndex: targetIdx,
            });
            dispatchRestore(entry.route);
            return;
          }
          targetIdx += 1;
        }
      },

      dismissAppIntro: () => {
        const { activeAppIntro, seenAppIntros } = get();
        if (!activeAppIntro) return;
        set({
          seenAppIntros: { ...seenAppIntros, [activeAppIntro]: true },
          activeAppIntro: null,
        });
      },

      openModule: (appId, customLabel, initialRoute) => {
        const { openInstances, seenAppIntros } = get();
        const meta = MODULE_CATALOG[appId];
        const newInstanceId = `inst-${appId}-${Date.now()}`;

        const newInstance: ModuleInstance = {
          instanceId: newInstanceId,
          appId,
          subjectCluster: meta.cluster,
          title: meta.title,
          customLabel: customLabel || meta.tagline,
          isPinnedSplit: false,
          activeRoute: initialRoute || "focus",
          createdAt: Date.now(),
        };

        set({
          openInstances: [...openInstances, newInstance],
          primaryInstanceId: newInstanceId,
          activeView: "workspace",
          isExposeOpen: false,
          activeAppIntro: !seenAppIntros[appId] ? appId : get().activeAppIntro,
          ...appendNavHistory(get().navHistory, get().navIndex, {
            view: "workspace",
            instanceId: newInstanceId,
          }),
        });

        return newInstanceId;
      },

      launchOrActivateModule: (appId, customLabel, initialRoute) => {
        const { openInstances, activateInstance, openModule } = get();
        // If an instance of this app already exists, activate it
        const existing = openInstances.find((i) => i.appId === appId);
        if (existing) {
          activateInstance(existing.instanceId);
          return existing.instanceId;
        }
        return openModule(appId, customLabel, initialRoute);
      },

      closeInstance: (instanceId) => {
        const {
          openInstances,
          primaryInstanceId,
          secondarySplitInstanceId,
        } = get();
        const nextInstances = openInstances.filter(
          (i) => i.instanceId !== instanceId
        );

        let nextPrimary = primaryInstanceId;
        let nextSecondary = secondarySplitInstanceId;

        if (primaryInstanceId === instanceId) {
          if (secondarySplitInstanceId) {
            nextPrimary = secondarySplitInstanceId;
            nextSecondary = null;
          } else if (nextInstances.length > 0) {
            nextPrimary = nextInstances[nextInstances.length - 1].instanceId;
          } else {
            nextPrimary = null;
          }
        }

        if (secondarySplitInstanceId === instanceId) {
          nextSecondary = null;
        }

        const nextView = nextInstances.length === 0 ? "dashboard" : get().activeView;

        set({
          openInstances: nextInstances,
          primaryInstanceId: nextPrimary,
          secondarySplitInstanceId: nextSecondary,
          activeView: nextView,
        });
      },

      activateInstance: (instanceId) => {
        const { openInstances, seenAppIntros } = get();
        const target = openInstances.find((i) => i.instanceId === instanceId);
        const appId = target?.appId;
        set({
          primaryInstanceId: instanceId,
          secondarySplitInstanceId: null,
          activeView: "workspace",
          isExposeOpen: false,
          activeAppIntro:
            appId && !seenAppIntros[appId] ? appId : get().activeAppIntro,
          ...appendNavHistory(get().navHistory, get().navIndex, {
            view: "workspace",
            instanceId,
          }),
        });
      },

      pinToSplitView: (instanceId) => {
        // Split view removed: activating instance cleanly as primary focus
        get().activateInstance(instanceId);
      },

      pairInstancesInSplit: (primaryId) => {
        const { openInstances } = get();
        if (!openInstances.some((i) => i.instanceId === primaryId)) return;
        get().activateInstance(primaryId);
      },

      closeSplitView: () => {
        set({ secondarySplitInstanceId: null });
      },

      setSplitRatio: (ratio) => {
        set({ splitRatio: ratio });
      },

      swapSplitPanes: () => {
        set({ secondarySplitInstanceId: null });
      },

      toggleExpose: () => {
        set((state) => ({ isExposeOpen: !state.isExposeOpen }));
      },

      setExposeOpen: (open) => {
        set({ isExposeOpen: open });
      },

      setDashboardView: () => {
        set({
          activeView: "dashboard",
          isExposeOpen: false,
          ...appendNavHistory(get().navHistory, get().navIndex, {
            view: "dashboard",
            instanceId: get().primaryInstanceId,
          }),
        });
      },

      setWorkspaceView: () => {
        const { openInstances, primaryInstanceId, seenAppIntros } = get();
        if (!primaryInstanceId && openInstances.length > 0) {
          const firstAppId = openInstances[0].appId;
          const firstId = openInstances[0].instanceId;
          set({
            primaryInstanceId: firstId,
            activeView: "workspace",
            isExposeOpen: false,
            activeAppIntro: !seenAppIntros[firstAppId]
              ? firstAppId
              : get().activeAppIntro,
            ...appendNavHistory(get().navHistory, get().navIndex, {
              view: "workspace",
              instanceId: firstId,
            }),
          });
        } else if (openInstances.length === 0) {
          // Open biology by default
          const id = get().openModule("biology");
          set({
            primaryInstanceId: id,
            activeView: "workspace",
            isExposeOpen: false,
          });
        } else {
          const current = openInstances.find(
            (i) => i.instanceId === primaryInstanceId
          );
          const currentAppId = current?.appId;
          set({
            activeView: "workspace",
            isExposeOpen: false,
            activeAppIntro:
              currentAppId && !seenAppIntros[currentAppId]
                ? currentAppId
                : get().activeAppIntro,
            ...appendNavHistory(get().navHistory, get().navIndex, {
              view: "workspace",
              instanceId: primaryInstanceId,
            }),
          });
        }
      },

      loadSnapshot: (snapshot) => {
        const { openInstances } = get();
        let primaryInst = openInstances.find((i) => i.appId === snapshot.primaryAppId);
        let primaryInstId = primaryInst?.instanceId;

        const additionalInstances: ModuleInstance[] = [];

        if (!primaryInst) {
          const primaryMeta = MODULE_CATALOG[snapshot.primaryAppId];
          primaryInstId = `inst-${snapshot.primaryAppId}-${Date.now()}`;
          primaryInst = {
            instanceId: primaryInstId,
            appId: snapshot.primaryAppId,
            subjectCluster: primaryMeta.cluster,
            title: primaryMeta.title,
            customLabel: snapshot.primaryLabel || primaryMeta.tagline,
            createdAt: Date.now(),
          };
          additionalInstances.push(primaryInst);
        }

        let secondaryInstId: string | null = null;
        if (snapshot.secondaryAppId) {
          let secondaryInst = openInstances.find(
            (i) => i.appId === snapshot.secondaryAppId && i.instanceId !== primaryInstId
          );
          if (secondaryInst) {
            secondaryInstId = secondaryInst.instanceId;
          } else {
            const secondaryMeta = MODULE_CATALOG[snapshot.secondaryAppId];
            secondaryInstId = `inst-${snapshot.secondaryAppId}-${Date.now() + 1}`;
            secondaryInst = {
              instanceId: secondaryInstId,
              appId: snapshot.secondaryAppId,
              subjectCluster: secondaryMeta.cluster,
              title: secondaryMeta.title,
              customLabel: snapshot.secondaryLabel || secondaryMeta.tagline,
              createdAt: Date.now() + 1,
            };
            additionalInstances.push(secondaryInst);
          }
        }

        const { seenAppIntros } = get();
        set({
          openInstances: [...openInstances, ...additionalInstances],
          primaryInstanceId: primaryInstId!,
          secondarySplitInstanceId: null,
          splitRatio: snapshot.splitRatio || "50/50",
          activeView: "workspace",
          isExposeOpen: false,
          activeAppIntro: !seenAppIntros[snapshot.primaryAppId]
            ? snapshot.primaryAppId
            : get().activeAppIntro,
        });
      },

      saveCurrentAsSnapshot: (name, description) => {
        const {
          primaryInstanceId,
          secondarySplitInstanceId,
          openInstances,
          sessionSnapshots,
          splitRatio,
        } = get();

        const primary = openInstances.find(
          (i) => i.instanceId === primaryInstanceId
        );
        if (!primary) return;

        const secondary = openInstances.find(
          (i) => i.instanceId === secondarySplitInstanceId
        );

        const newSnapshot: SessionSnapshot = {
          id: `snapshot-${Date.now()}`,
          name: name || `${primary.title}${secondary ? " × " + secondary.title : ""}`,
          subtitle: secondary
            ? `${primary.title} & ${secondary.title}`
            : primary.title,
          description:
            description ||
            `Study session with ${primary.title}${
              secondary ? " paired with " + secondary.title : ""
            }`,
          clusterBadge: secondary ? "Comparative Duo" : primary.subjectCluster,
          cluster: secondary ? "cross-disciplinary" : primary.subjectCluster,
          primaryAppId: primary.appId,
          primaryLabel: primary.customLabel,
          secondaryAppId: secondary?.appId,
          secondaryLabel: secondary?.customLabel,
          splitRatio: secondary ? splitRatio : undefined,
        };

        set({
          sessionSnapshots: [newSnapshot, ...sessionSnapshots],
        });
      },

      updateInstanceLabel: (instanceId, label) => {
        set((state) => ({
          openInstances: state.openInstances.map((inst) =>
            inst.instanceId === instanceId
              ? { ...inst, customLabel: label }
              : inst
          ),
        }));
      },

      setCapsuleCondensed: (condensed) => {
        set({ isCapsuleCondensed: condensed });
      },

      closeAllInstances: () => {
        set({
          openInstances: [],
          primaryInstanceId: null,
          secondarySplitInstanceId: null,
          activeView: "dashboard",
        });
      },
    }),
    {
      name: "ib_unified_study_suite_workspace_v1",
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
        splitRatio: state.splitRatio,
        sessionSnapshots: state.sessionSnapshots,
        enabledSubjects: state.enabledSubjects,
        subjectLevels: state.subjectLevels,
        worldClocks: state.worldClocks,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        if (!state.worldClocks || !Array.isArray(state.worldClocks) || state.worldClocks.length === 0) {
          state.worldClocks = DEFAULT_WORLD_CLOCKS;
        }

        const migratedSnapshots = (state.sessionSnapshots || []).map((snap) => {
          if (snap.id === "lit-comparative-paper2" || (snap.primaryAppId as string) === "macbeth" || (snap.secondaryAppId as string) === "macbeth") {
            return PRESET_SNAPSHOTS[0];
          }
          return snap;
        });

        // Sync from standalone onboarding localStorage keys if present
        if (typeof window !== "undefined") {
          try {
            const rawSel = localStorage.getItem("ib_suite_selected_subjects_v1");
            if (rawSel) {
              const parsed = JSON.parse(rawSel) as AppId[];
              const valid = Array.isArray(parsed)
                ? parsed.filter((id) => Boolean(MODULE_CATALOG[id]))
                : [];
              if (valid.length > 0) state.enabledSubjects = valid;
            }
            const rawLvls = localStorage.getItem("ib_suite_subject_levels_v1");
            if (rawLvls) {
              const parsedLvls = JSON.parse(rawLvls);
              if (parsedLvls && typeof parsedLvls === "object") {
                state.subjectLevels = { ...DEFAULT_SUBJECT_LEVELS, ...parsedLvls };
              }
            }
          } catch {
            // ignore
          }
        }
        if (!state.enabledSubjects || state.enabledSubjects.length === 0) {
          state.enabledSubjects = ALL_SUBJECT_IDS;
        }
        if (!state.subjectLevels) {
          state.subjectLevels = DEFAULT_SUBJECT_LEVELS;
        }

        // Always launch on the homescreen with all tabs closed
        state.activeView = "dashboard";
        state.openInstances = [];
        state.primaryInstanceId = null;
        state.secondarySplitInstanceId = null;
        state.sessionSnapshots = migratedSnapshots;
        state.navHistory = [{ view: "dashboard", instanceId: null }];
        state.navIndex = 0;
        state.isRestoringHistory = false;
      },
    }
  )
);

if (typeof window !== "undefined") {
  window.addEventListener("ib-suite-push-route", (e: Event) => {
    const detail = (e as CustomEvent<NavHistoryRoute>).detail;
    if (detail && detail.appId) {
      useWorkspaceStore.getState().pushModuleRoute(detail);
    }
  });
}
