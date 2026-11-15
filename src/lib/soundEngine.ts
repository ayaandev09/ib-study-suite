import { AppId } from "@/types/workspace";

/**
 * Unified Sound & Haptics Engine for IB Study Suite (iOS & Desktop)
 * Synthesizes ultra-clean Apple-grade tactile audio via Web Audio API,
 * manages offline WAV file playback, handles iOS Safari AudioContext unlock,
 * and delivers real-time haptic feedback.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8;
  private isUnlocked: boolean = false;
  private activeAmbienceGain: GainNode | null = null;
  private ambienceOsc1: OscillatorNode | null = null;
  private ambienceOsc2: OscillatorNode | null = null;
  private isAmbiencePlaying: boolean = false;
  private ambienceVolume: number = 0.25;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private currentIntroSource: AudioBufferSourceNode | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private preloadedAudioElements: Map<string, HTMLAudioElement> = new Map();
  private currentPlayingSubjectId: AppId | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initFromStorage();
      this.setupAutoUnlock();
      this.preloadSubjectAudios();
    }
  }

  private preloadSubjectAudios() {
    if (typeof window === "undefined") return;
    const subjects = ["biology", "orwell", "business", "economics", "physics", "german", "geography"];
    subjects.forEach((id) => {
      try {
        const audio = new Audio(`/audio/intro-${id}.wav`);
        audio.preload = "auto";
        audio.volume = this.volume;
        this.preloadedAudioElements.set(id, audio);
      } catch {}
    });
    try {
      const welcome = new Audio("/audio/welcome-cockpit.wav");
      welcome.preload = "auto";
      welcome.volume = this.volume;
      this.preloadedAudioElements.set("welcome-cockpit", welcome);
    } catch {}
  }

  private initFromStorage() {
    try {
      const storedMute = localStorage.getItem("ib_sound_muted");
      if (storedMute !== null) this.isMuted = storedMute === "true";
      const storedVol = localStorage.getItem("ib_sound_volume");
      if (storedVol !== null) this.volume = parseFloat(storedVol) || 0.8;
      const storedAmbVol = localStorage.getItem("ib_ambience_volume");
      if (storedAmbVol !== null) this.ambienceVolume = parseFloat(storedAmbVol) || 0.25;
    } catch {
      // Ignore localStorage errors
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Automatically unlocks iOS Safari / WebKit AudioContext on first touch
   */
  private setupAutoUnlock() {
    const unlock = () => {
      if (this.isUnlocked) return;
      const ctx = this.getContext();
      if (ctx) {
        // Play silent 1-sample buffer to unlock WebKit audio hardware
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
        ctx.resume().then(() => {
          this.isUnlocked = true;
        }).catch(() => {});
      }
      window.removeEventListener("touchstart", unlock, true);
      window.removeEventListener("touchend", unlock, true);
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("click", unlock, true);
    };

    window.addEventListener("touchstart", unlock, { once: true, capture: true });
    window.addEventListener("touchend", unlock, { once: true, capture: true });
    window.addEventListener("pointerdown", unlock, { once: true, capture: true });
    window.addEventListener("click", unlock, { once: true, capture: true });
  }

  // =========================================================================
  // Tactile Synthesized Sound Effects (Pure Web Audio - 0ms Latency)
  // =========================================================================

  /**
   * Crisp, tactile liquid glass tap (for buttons, pills, toggles)
   */
  public playClick() {
    if (this.isMuted) return;
    this.triggerHaptic("light");
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1150, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.038);

      gain.gain.setValueAtTime(0.22 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Soft pill pop for tab switching / chapter navigation
   */
  public playPop() {
    if (this.isMuted) return;
    this.triggerHaptic("light");
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.18 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {}
  }

  /**
   * Harmonized spatial glass chime for module launch & dashboard cards
   */
  public playChime() {
    if (this.isMuted) return;
    this.triggerHaptic("medium");
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C-Major shimmer chord

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.025);

        const startTime = now + idx * 0.025;
        const duration = 0.55;

        gain.gain.setValueAtTime(0.15 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0005, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch {}
  }

  /**
   * Ascending 3-tone celebratory triad for chapter or revision completion
   */
  public playSuccess() {
    if (this.isMuted) return;
    this.triggerHaptic("success");
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const chord = [659.25, 830.61, 987.77, 1318.51]; // E-Major triumphant chord

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        const startTime = now + i * 0.06;
        const duration = 0.7;

        gain.gain.setValueAtTime(0.18 * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch {}
  }

  /**
   * Soft mechanical typewriter tick for search inputs & key terms
   */
  public playKeystroke() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const randomFreq = 1800 + (Math.random() * 400 - 200);
      osc.frequency.setValueAtTime(randomFreq, now);

      gain.gain.setValueAtTime(0.05 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }

  // =========================================================================
  // Deep Focus 432Hz Ambient Soundscape (Synthesized Lo-Fi Background)
  // =========================================================================

  public toggleAmbience(): boolean {
    if (this.isAmbiencePlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  public startAmbience() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (this.isAmbiencePlaying) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(this.ambienceVolume * 0.4, now + 1.2);
      masterGain.connect(ctx.destination);
      this.activeAmbienceGain = masterGain;

      // 1. Warm 432Hz Alpha Focus Drone
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(216, now); // Octave below 432Hz for deep grounding
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.3, now);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      this.ambienceOsc1 = osc1;

      // 2. Harmonic 432Hz Shimmer
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(432, now);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.12, now);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now);
      this.ambienceOsc2 = osc2;

      this.isAmbiencePlaying = true;
    } catch {}
  }

  public stopAmbience() {
    if (!this.isAmbiencePlaying || !this.activeAmbienceGain) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      this.activeAmbienceGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      setTimeout(() => {
        try {
          this.ambienceOsc1?.stop();
          this.ambienceOsc2?.stop();
          this.ambienceOsc1?.disconnect();
          this.ambienceOsc2?.disconnect();
          this.activeAmbienceGain?.disconnect();
        } catch {}
        this.ambienceOsc1 = null;
        this.ambienceOsc2 = null;
        this.activeAmbienceGain = null;
        this.isAmbiencePlaying = false;
      }, 650);
    } catch {
      this.isAmbiencePlaying = false;
    }
  }

  public setAmbienceVolume(val: number) {
    this.ambienceVolume = Math.max(0, Math.min(1, val));
    if (this.activeAmbienceGain && this.ctx) {
      this.activeAmbienceGain.gain.setValueAtTime(this.ambienceVolume * 0.4, this.ctx.currentTime);
    }
    try {
      localStorage.setItem("ib_ambience_volume", String(this.ambienceVolume));
    } catch {}
  }

  // =========================================================================
  // WAV Audio Asset Playback & Subject Startup Chords
  // =========================================================================

  /**
   * Preload audio buffer into Web Audio API memory
   */
  public async preloadAudioBuffer(path: string): Promise<AudioBuffer | null> {
    if (typeof window === "undefined") return null;
    if (this.audioBuffers.has(path)) {
      return this.audioBuffers.get(path)!;
    }
    const ctx = this.getContext();
    if (!ctx) return null;
    try {
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(path, audioBuffer);
      return audioBuffer;
    } catch {
      return null;
    }
  }

  /**
   * Stop any actively playing subject intro audio
   */
  public stopSubjectIntro(): void {
    this.currentPlayingSubjectId = null;
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {}
      this.currentAudioElement = null;
    }
    if (this.currentIntroSource) {
      try {
        this.currentIntroSource.stop();
        this.currentIntroSource.disconnect();
      } catch {}
      this.currentIntroSource = null;
    }
  }

  /**
   * Play subject intro tune: synchronous, zero-latency trigger designed to run
   * directly within user gesture handlers in WebKit / Safari and Desktop WKWebView.
   */
  public playSubjectIntro(appId: AppId): void {
    if (this.isMuted) return;

    // If this subject's intro audio is already actively playing and under 1.4s in, let it keep rolling in sync
    if (
      this.currentPlayingSubjectId === appId &&
      this.currentAudioElement &&
      !this.currentAudioElement.paused &&
      this.currentAudioElement.currentTime < 1.4
    ) {
      return;
    }

    // 1. Immediately stop any existing intro sound
    this.stopSubjectIntro();
    this.currentPlayingSubjectId = appId;

    // 2. Play synchronously via preloaded HTML5 Audio element (retains trusted gesture in WebKit)
    const audio = this.preloadedAudioElements.get(appId) || new Audio(`/audio/intro-${appId}.wav`);
    audio.volume = this.volume;
    try {
      audio.currentTime = 0;
    } catch {}
    this.currentAudioElement = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: Web Audio synthesis if HTML5 element is restricted
        this.playSubjectSyntheticChime(appId);
      });
    }

    // 3. Resume Web Audio context in background if needed
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  /**
   * High-fidelity Web Audio synthesis for each subject's harmonic chord
   */
  public playSubjectSyntheticChime(appId: AppId) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Chords per subject:
      // biology: D major (147Hz, 220Hz, 294Hz, 366Hz)
      // orwell: A minor (110Hz, 165Hz, 247Hz, 330Hz)
      // business: Eb major (156Hz, 233Hz, 312Hz, 388Hz, 526Hz)
      // economics: C major (131Hz, 196Hz, 245Hz, 326Hz)
      // physics: F# major (185Hz, 277Hz, 417Hz, 554Hz)
      // german: G major (196Hz, 293Hz, 392Hz, 489Hz, 589Hz)
      // geography: D spatial (293Hz, 440Hz, 659Hz, 740Hz)
      const chordMap: Record<AppId, number[]> = {
        biology: [147, 220, 294, 366, 588],
        orwell: [110, 165, 247, 330, 495],
        business: [156, 233, 312, 388, 526],
        economics: [131, 196, 245, 326, 490],
        physics: [185, 277, 417, 554, 740],
        german: [196, 293, 392, 489, 589],
        geography: [293, 440, 659, 740, 880],
      };

      const freqs = chordMap[appId] || [261.63, 329.63, 392.0, 523.25];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        const chordGain = (this.volume * 0.18) / Math.sqrt(freqs.length);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(chordGain, now + 0.12 + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + 2.25);
      });
    } catch {}
  }

  public playFile(path: string, volumeScale = 1.0) {
    if (this.isMuted) return;
    if (typeof window === "undefined") return;

    try {
      const audio = new Audio(path);
      audio.volume = Math.max(0, Math.min(1, this.volume * volumeScale));
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to synthesized chime if browser blocks audio file playback
          this.playChime();
        });
      }
    } catch {
      this.playChime();
    }
  }

  // =========================================================================
  // Tactile Haptics (iOS & Mobile)
  // =========================================================================

  public triggerHaptic(type: "light" | "medium" | "success" = "light") {
    if (typeof window === "undefined" || !navigator.vibrate) return;
    try {
      switch (type) {
        case "light":
          navigator.vibrate(8);
          break;
        case "medium":
          navigator.vibrate(16);
          break;
        case "success":
          navigator.vibrate([12, 40, 18]);
          break;
      }
    } catch {}
  }

  // =========================================================================
  // Controls & Persistence
  // =========================================================================

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem("ib_sound_muted", String(this.isMuted));
    } catch {}
    if (!this.isMuted) {
      this.playClick();
    } else if (this.isAmbiencePlaying) {
      this.stopAmbience();
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem("ib_sound_muted", String(this.isMuted));
    } catch {}
    if (muted && this.isAmbiencePlaying) {
      this.stopAmbience();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsAmbiencePlaying(): boolean {
    return this.isAmbiencePlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem("ib_sound_volume", String(this.volume));
    } catch {}
  }

  public getVolume(): number {
    return this.volume;
  }
}

// Export singleton
export const soundEngine = new SoundEngine();
