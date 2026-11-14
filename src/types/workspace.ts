export type AppId =
  | "biology"
  | "orwell"
  | "business"
  | "economics"
  | "physics"
  | "german"
  | "geography";

export type SubjectCluster =
  | "literature"
  | "social-sciences"
  | "stem-languages";

export type SplitRatio = "50/50" | "65/35" | "35/65";

export interface ModuleAppMetadata {
  id: AppId;
  title: string;
  shortTitle: string;
  subjectCode: string;
  cluster: SubjectCluster;
  clusterLabel: string;
  description: string;
  tagline: string;
  badge: string;
  level: "HL" | "SL" | "SL / HL" | "Literature A" | "Language B HL";
  accentColor: string;
  glowColor: string;
  quickRoutes: { label: string; viewMode: string }[];
}

export interface ModuleInstance {
  instanceId: string;
  appId: AppId;
  subjectCluster: SubjectCluster;
  title: string;
  customLabel?: string;
  isPinnedSplit?: boolean;
  lastScrollPos?: number;
  activeRoute?: string;
  createdAt: number;
}

export interface SessionSnapshot {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  clusterBadge: string;
  cluster: SubjectCluster | "cross-disciplinary";
  primaryAppId: AppId;
  primaryLabel?: string;
  secondaryAppId?: AppId;
  secondaryLabel?: string;
  splitRatio?: SplitRatio;
}
