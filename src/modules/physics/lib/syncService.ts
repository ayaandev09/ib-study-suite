"use client";

export interface SyncPayload {
  activeTopicId?: string;
  viewMode?: string;
  studyGoal?: "learn" | "revise";
  academicStyle?: string;
  completedTopics?: Record<string, boolean>;
  timestamp?: number;
}

export interface SyncEnvelope {
  success: boolean;
  version: number;
  timestamp: number;
  clientId: string;
  payload: SyncPayload;
}

const CLIENT_ID =
  typeof window !== "undefined"
    ? `client-${Math.random().toString(36).substring(2, 9)}`
    : "ssr";

export const LOCAL_LAN_URL = "http://192.168.178.83:3085";

export function getSyncBaseUrl(): string {
  if (typeof window === "undefined") return "";
  if (
    window.location.protocol === "app:" ||
    window.location.hostname === "study-dashboard" ||
    window.location.protocol === "file:"
  ) {
    return "http://127.0.0.1:3085";
  }
  return "";
}

let lastSyncTimestamp = 0;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let eventSource: EventSource | null = null;

export function encodeSyncToUrl(payload: SyncPayload): string {
  try {
    const compact = {
      a: payload.activeTopicId,
      g: payload.studyGoal,
      f: payload.academicStyle,
      c: Object.keys(payload.completedTopics || {}).filter(
        (k) => payload.completedTopics?.[k]
      ),
      t: Date.now(),
    };
    const json = JSON.stringify(compact);
    if (typeof window !== "undefined") {
      return encodeURIComponent(window.btoa(unescape(encodeURIComponent(json))));
    }
    return "";
  } catch (err) {
    console.error("Failed to encode sync payload:", err);
    return "";
  }
}

export function decodeSyncFromUrl(encoded: string): SyncPayload | null {
  try {
    if (typeof window === "undefined") return null;
    const json = decodeURIComponent(escape(window.atob(decodeURIComponent(encoded))));
    const parsed = JSON.parse(json);
    const completedMap: Record<string, boolean> = {};
    if (Array.isArray(parsed.c)) {
      for (const k of parsed.c) {
        completedMap[k] = true;
      }
    }
    return {
      activeTopicId: parsed.a,
      studyGoal: parsed.g,
      academicStyle: parsed.f,
      completedTopics: completedMap,
      timestamp: parsed.t,
    };
  } catch (err) {
    console.error("Failed to decode sync payload:", err);
    return null;
  }
}

export function pushSyncToServer(payload: SyncPayload) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  lastSyncTimestamp = now;

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const baseUrl = getSyncBaseUrl();
    if (!baseUrl) return;

    fetch(`${baseUrl}/api/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: CLIENT_ID,
        timestamp: now,
        payload,
      }),
    }).catch(() => {
      // Gracefully handle offline mode
    });
  }, 300);
}

export async function pullSyncFromServer(): Promise<SyncPayload | null> {
  if (typeof window === "undefined") return null;
  const baseUrl = getSyncBaseUrl();
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/api/sync`);
    if (!res.ok) return null;
    const data: SyncEnvelope = await res.json();
    return data.payload;
  } catch {
    return null;
  }
}

export function initLiveSyncConnection(
  onUpdate: (payload: SyncPayload) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const baseUrl = getSyncBaseUrl();
  if (!baseUrl) return () => {};

  try {
    if (eventSource) {
      eventSource.close();
    }
    eventSource = new EventSource(`${baseUrl}/api/sync-events`);
    eventSource.onmessage = (event) => {
      try {
        const data: SyncEnvelope = JSON.parse(event.data);
        if (data.clientId !== CLIENT_ID && data.timestamp > lastSyncTimestamp) {
          onUpdate(data.payload);
        }
      } catch (err) {
        console.error("Failed to parse SSE payload", err);
      }
    };
  } catch {
    // Offline or SSE unsupported
  }

  return () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  };
}
