"use client";

import { create } from "zustand";
import { soundEngine } from "@/lib/soundEngine";
import { AppId } from "@/types/workspace";

interface SoundStoreState {
  isMuted: boolean;
  isAmbiencePlaying: boolean;
  volume: number;
  ambienceVolume: number;
  toggleMute: () => void;
  toggleAmbience: () => void;
  setVolume: (v: number) => void;
  setAmbienceVolume: (v: number) => void;
  playClick: () => void;
  playPop: () => void;
  playChime: () => void;
  playSuccess: () => void;
  playKeystroke: () => void;
  playFile: (path: string, volumeScale?: number) => void;
  playSubjectIntro: (appId: AppId) => void;
  playGrandOpeningSuite: () => void;
}

export const useSoundStore = create<SoundStoreState>((set, get) => ({
  isMuted: typeof window !== "undefined" ? soundEngine.getIsMuted() : false,
  isAmbiencePlaying: false,
  volume: typeof window !== "undefined" ? soundEngine.getVolume() : 0.8,
  ambienceVolume: 0.25,

  toggleMute: () => {
    const next = soundEngine.toggleMute();
    set({ isMuted: next, isAmbiencePlaying: soundEngine.getIsAmbiencePlaying() });
  },

  toggleAmbience: () => {
    const next = soundEngine.toggleAmbience();
    set({ isAmbiencePlaying: next });
  },

  setVolume: (v: number) => {
    soundEngine.setVolume(v);
    set({ volume: v });
  },

  setAmbienceVolume: (v: number) => {
    soundEngine.setAmbienceVolume(v);
    set({ ambienceVolume: v });
  },

  playClick: () => soundEngine.playClick(),
  playPop: () => soundEngine.playPop(),
  playChime: () => soundEngine.playChime(),
  playSuccess: () => soundEngine.playSuccess(),
  playKeystroke: () => soundEngine.playKeystroke(),
  playFile: (path: string, volumeScale?: number) => soundEngine.playFile(path, volumeScale),
  playSubjectIntro: (appId: AppId) => soundEngine.playSubjectIntro(appId),
  playGrandOpeningSuite: () => soundEngine.playGrandOpeningSuite(),
}));
