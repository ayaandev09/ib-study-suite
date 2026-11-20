import { AppId } from "@/types/workspace";

/**
 * Unified Sound & Haptics Engine for IB Study Suite (v2.0)
 *
 * Architecture & Principles:
 * 1. 100% Pure Web Audio API: Zero HTMLAudioElements (`new Audio()`, `<audio>`),
 *    preventing macOS / iOS WebKit from ever registering this app with MPRemoteCommandCenter
 *    (Now Playing / headphone play/pause button hijacking).
 * 2. Explicit MediaSession Disablement: Deregisters all action handlers (`null`) and forces
 *    `playbackState = "none"` so OS media controls and headphones never replay study sounds.
 * 3. Legendary Grand Opening Synthesizer: Multi-layered cinematic acoustics featuring
 *    sub-bass physical bloom, warm symphonic brass swell, spatial stereo spread, and
 *    cascading liquid glass shimmer harmonics.
 * 4. Zero-Leak Node Management: All oscillators and audio buffer sources automatically
 *    disconnect from the audio destination upon completion (`onended`), freeing audio hardware.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8;
  private isUnlocked: boolean = false;

  // Ambience (432Hz focus drone)
  private activeAmbienceGain: GainNode | null = null;
  private ambienceOsc1: OscillatorNode | null = null;
  private ambienceOsc2: OscillatorNode | null = null;
  private isAmbiencePlaying: boolean = false;
  private ambienceVolume: number = 0.25;

  // Walkthrough ambient (Web Audio API loop)
  private walkthroughSource: AudioBufferSourceNode | null = null;
  private walkthroughGain: GainNode | null = null;
  private isWalkthroughPlaying: boolean = false;

  // AudioBuffer cache (in-memory decoded PCM for instant playback)
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private currentIntroNodes: { oscs: OscillatorNode[]; gains: GainNode[] } | null = null;
  private currentPlayingSubjectId: AppId | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initFromStorage();
      this.setupAutoUnlock();
      this.disableMediaSessionRegistration();
      this.preloadSubjectAudios();
    }
  }

  /**
   * Strictly deregister with macOS / iOS MPRemoteCommandCenter (Now Playing / headphone play buttons).
   * Setting action handlers to `null` tells WebKit / Chromium that this page NEVER consumes media keys.
   */
  public disableMediaSessionRegistration() {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;
    try {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
      const actions: MediaSessionAction[] = [
        "play",
        "pause",
        "stop",
        "previoustrack",
        "nexttrack",
        "seekbackward",
        "seekforward",
        "seekto",
        "skipad",
      ];
      actions.forEach((action) => {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {}
      });
    } catch {}
  }

  private preloadSubjectAudios() {
    if (typeof window === "undefined") return;
    const subjects = ["biology", "orwell", "business", "economics", "physics", "german", "geography"];
    subjects.forEach((id) => {
      this.preloadAudioBuffer(`/audio/intro-${id}.wav`);
    });
    this.preloadAudioBuffer("/audio/welcome-cockpit.wav");
    this.preloadAudioBuffer("/audio/walkthrough-ambient.wav");
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
        ctx
          .resume()
          .then(() => {
            this.isUnlocked = true;
            this.disableMediaSessionRegistration();
          })
          .catch(() => {});
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

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
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

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

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

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

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

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

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

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

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
    if (!ctx || this.isAmbiencePlaying) return;

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
  // Walkthrough Ambient (Pure Web Audio API Loop - No HTMLAudioElement)
  // =========================================================================

  public async startWalkthroughAmbient() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || this.isWalkthroughPlaying) return;

    try {
      let buf = this.audioBuffers.get("/audio/walkthrough-ambient.wav");
      if (!buf) {
        buf = (await this.preloadAudioBuffer("/audio/walkthrough-ambient.wav")) || undefined;
      }

      if (buf) {
        const source = ctx.createBufferSource();
        source.buffer = buf;
        source.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.35 * this.volume, ctx.currentTime + 1.2);

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);

        this.walkthroughSource = source;
        this.walkthroughGain = gainNode;
        this.isWalkthroughPlaying = true;
      } else {
        // Fall back to clean synthesized ambient drone
        this.startAmbience();
      }
    } catch {}
  }

  public stopWalkthroughAmbient() {
    if (!this.isWalkthroughPlaying && !this.walkthroughSource) return;
    const ctx = this.getContext();
    if (this.walkthroughGain && ctx) {
      try {
        const now = ctx.currentTime;
        this.walkthroughGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
      } catch {}
    }
    setTimeout(() => {
      try {
        this.walkthroughSource?.stop();
        this.walkthroughSource?.disconnect();
        this.walkthroughGain?.disconnect();
      } catch {}
      this.walkthroughSource = null;
      this.walkthroughGain = null;
      this.isWalkthroughPlaying = false;
    }, 450);
  }

  // =========================================================================
  // LEGENDARY GRAND OPENING ACOUSTIC SUITE (Web Audio Synthesis)
  // =========================================================================

  /**
   * Play the majestic Grand Opening Overture for IB Study Suite.
   * Multi-layered spatial synthesis:
   * - Layer 1: Sub-Bass Cinematic Bloom (58Hz -> 32Hz sweep with warm room impact)
   * - Layer 2: Symphonic Brass Swell (Majestic open C-Major chords blooming over 1.8s)
   * - Layer 3: Spatial Liquid Glass Arpeggio (10-note celestial harmonic prism cascade)
   * - Layer 4: Stereo Ambient Dispersion (wide stereo shimmer decaying into OLED silence)
   */
  public playGrandOpeningSuite(): void {
    if (this.isMuted) return;
    this.disableMediaSessionRegistration();
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterVol = this.volume;

      // Master output limiter/soft gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(masterVol, now);
      masterGain.connect(ctx.destination);

      // --- LAYER 1: CINEMATIC SUB-BASS BLOOM (The IMAX / Apple Theatre Impact) ---
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      const subFilter = ctx.createBiquadFilter();

      subFilter.type = "lowpass";
      subFilter.frequency.setValueAtTime(110, now);
      subFilter.Q.setValueAtTime(1.5, now);

      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(58, now); // Low Bb/A sweep
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.4); // Down to sub-bass rumble

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.38, now + 0.08); // Punchy rise
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4); // Long resonant dissipation

      subOsc.connect(subFilter);
      subFilter.connect(subGain);
      subGain.connect(masterGain);

      subOsc.start(now);
      subOsc.stop(now + 2.5);
      subOsc.onended = () => {
        try {
          subOsc.disconnect();
          subFilter.disconnect();
          subGain.disconnect();
        } catch {}
      };

      // --- LAYER 2: SYMPHONIC BRASS & WARM ORCHESTRAL SWELL ---
      // Open majestic C-Major harmonic foundation: C2, G2, C3, E3, G3, C4
      const symphonicNotes = [65.41, 97.99, 130.81, 164.81, 196.0, 261.63];
      symphonicNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
        // Subtle micro-detuning for living spatial warmth (+/- 3 cents)
        const detune = (idx - 2.5) * 2.8;
        osc.detune.setValueAtTime(detune, now);
        osc.frequency.setValueAtTime(freq, now);

        // Sweeping resonant low-pass filter
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(180, now);
        filter.frequency.exponentialRampToValueAtTime(2600, now + 0.65);
        filter.frequency.exponentialRampToValueAtTime(420, now + 2.8);
        filter.Q.setValueAtTime(2.2, now);

        const noteGain = 0.08 / Math.sqrt(symphonicNotes.length);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(noteGain, now + 0.16 + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.015);
        osc.stop(now + 3.0);
        osc.onended = () => {
          try {
            osc.disconnect();
            filter.disconnect();
            gain.disconnect();
          } catch {}
        };
      });

      // --- LAYER 3: PRISMATIC LIQUID GLASS HARMONIC ARPEGGIO ---
      // Cascading high glass frequencies refracting through light:
      // C4 -> G4 -> C5 -> E5 -> G5 -> B5 -> D6 -> E6 -> G6 -> C7
      const glassNotes = [
        261.63, 392.0, 523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51, 1567.98, 2093.0,
      ];
      glassNotes.forEach((freq, idx) => {
        const noteStart = now + 0.12 + idx * 0.038;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        const peakGain = 0.14 / Math.sqrt(glassNotes.length);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(peakGain, noteStart + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 2.2);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(noteStart);
        osc.stop(noteStart + 2.25);
        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };
      });

      // Disconnect master gain when overture concludes
      setTimeout(() => {
        try {
          masterGain.disconnect();
        } catch {}
      }, 3300);
    } catch {}
  }

  // =========================================================================
  // SUBJECT-KEYED MAJESTIC STARTUP FANFARES (Cold Launch Only)
  // =========================================================================

  /**
   * Stop any actively playing subject intro audio and clean up Web Audio nodes
   */
  public stopSubjectIntro(): void {
    this.currentPlayingSubjectId = null;
    if (this.currentIntroNodes) {
      try {
        this.currentIntroNodes.oscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.currentIntroNodes.gains.forEach((g) => {
          try {
            g.disconnect();
          } catch {}
        });
      } catch {}
      this.currentIntroNodes = null;
    }
  }

  /**
   * Play subject intro tune: synchronous, zero-latency trigger designed to run
   * directly within user gesture handlers in WebKit / Safari and Desktop WKWebView.
   * Completely bypasses MediaSession and uses purely synthesized multi-harmonic fanfares.
   */
  public playSubjectIntro(appId: AppId): void {
    if (this.isMuted) return;

    this.stopSubjectIntro();
    this.disableMediaSessionRegistration();
    this.currentPlayingSubjectId = appId;

    this.playSubjectStartupGrand(appId);
  }

  /**
   * High-fidelity, subject-tailored majestic grand fanfare:
   * - biology: Primordial Bloom (Warm organic D-Major life chord + crystalline water harmonics)
   * - physics: Cosmic Resonance (Deep space 5ths + high quantum pulsar shimmer at 2.6kHz)
   * - economics: Sovereign Citadel (Royal C-Major brass fanfare + crisp institutional precision)
   * - business: Executive Horizon (Sleek modern Eb-Major 9th luxury chord + confident analog body)
   * - orwell: The Telescreen Chime (Deep cinematic A-Minor drone + ominous distant bell overtone)
   * - german: European Cathedral (Rich G-Major organ/chamber voicing + classical warmth)
   * - geography: Planetary Vista (Expansive open geospatial 5ths & 4ths across vast horizons)
   */
  public playSubjectStartupGrand(appId: AppId): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterVol = this.volume;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(masterVol, now);
      masterGain.connect(ctx.destination);

      const oscs: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      interface SubjectAcousticProfile {
        bassNote: number;
        chordFreqs: number[];
        oscType: OscillatorType;
        filterFreq: number;
        sparkleFreqs: number[];
        envelopeDecay: number;
      }

      const profiles: Record<AppId, SubjectAcousticProfile> = {
        biology: {
          bassNote: 73.42, // D2
          chordFreqs: [146.83, 220.0, 293.66, 369.99, 440.0, 587.33], // D3, A3, D4, F#4, A4, D5
          oscType: "sine",
          filterFreq: 1800,
          sparkleFreqs: [1174.66, 1479.98, 1760.0, 2349.32],
          envelopeDecay: 2.4,
        },
        physics: {
          bassNote: 82.41, // E2
          chordFreqs: [164.81, 246.94, 329.63, 493.88, 659.25], // E3, B3, E4, B4, E5
          oscType: "triangle",
          filterFreq: 3200,
          sparkleFreqs: [1318.51, 1975.53, 2637.02, 3296.0], // Quantum pulsar bell
          envelopeDecay: 2.6,
        },
        economics: {
          bassNote: 65.41, // C2
          chordFreqs: [130.81, 196.0, 261.63, 329.63, 392.0, 523.25], // C3, G3, C4, E4, G4, C5
          oscType: "sawtooth",
          filterFreq: 2400,
          sparkleFreqs: [1046.5, 1318.51, 1567.98],
          envelopeDecay: 2.2,
        },
        business: {
          bassNote: 77.78, // Eb2
          chordFreqs: [155.56, 233.08, 311.13, 388.91, 466.16, 622.25], // Eb3, Bb3, Eb4, G4, Bb4, Eb5
          oscType: "triangle",
          filterFreq: 2200,
          sparkleFreqs: [1244.51, 1555.63, 1864.66],
          envelopeDecay: 2.3,
        },
        orwell: {
          bassNote: 55.0, // A1
          chordFreqs: [110.0, 164.81, 220.0, 261.63, 329.63], // A2, E3, A3, C4, E4
          oscType: "sawtooth",
          filterFreq: 1100,
          sparkleFreqs: [880.0, 1046.5],
          envelopeDecay: 2.8,
        },
        german: {
          bassNote: 98.0, // G2
          chordFreqs: [196.0, 293.66, 392.0, 493.88, 587.33, 783.99], // G3, D4, G4, B4, D5, G5
          oscType: "triangle",
          filterFreq: 2600,
          sparkleFreqs: [987.77, 1174.66, 1567.98],
          envelopeDecay: 2.5,
        },
        geography: {
          bassNote: 73.42, // D2
          chordFreqs: [146.83, 220.0, 293.66, 440.0, 587.33, 739.99], // D3, A3, D4, A4, D5, F#5
          oscType: "sine",
          filterFreq: 2100,
          sparkleFreqs: [1174.66, 1479.98, 1760.0],
          envelopeDecay: 2.5,
        },
      };

      const prof = profiles[appId] || profiles.biology;

      // 1. Sub Bass Foundation
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(prof.bassNote, now);
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.24, now + 0.06);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + prof.envelopeDecay);

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(now);
      subOsc.stop(now + prof.envelopeDecay + 0.1);

      oscs.push(subOsc);
      gains.push(subGain);

      // 2. Harmonic Body Swell
      prof.chordFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = prof.oscType;
        osc.frequency.setValueAtTime(freq, now + idx * 0.025);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(prof.filterFreq, now + 0.4);
        filter.frequency.exponentialRampToValueAtTime(400, now + prof.envelopeDecay);

        const chordGain = (0.16 * masterVol) / Math.sqrt(prof.chordFreqs.length);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(chordGain, now + 0.1 + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + prof.envelopeDecay);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.02);
        osc.stop(now + prof.envelopeDecay + 0.1);

        oscs.push(osc);
        gains.push(gain);
      });

      // 3. Shimmer / Crystal Sparkle
      prof.sparkleFreqs.forEach((freq, sIdx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + 0.15 + sIdx * 0.05;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.6);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(startTime);
        osc.stop(startTime + 1.65);

        oscs.push(osc);
        gains.push(gain);
      });

      this.currentIntroNodes = { oscs, gains };

      // Cleanup
      setTimeout(() => {
        try {
          masterGain.disconnect();
          oscs.forEach((o) => {
            try {
              o.disconnect();
            } catch {}
          });
          gains.forEach((g) => {
            try {
              g.disconnect();
            } catch {}
          });
        } catch {}
        if (this.currentPlayingSubjectId === appId) {
          this.currentPlayingSubjectId = null;
        }
      }, (prof.envelopeDecay + 0.2) * 1000);
    } catch {}
  }

  // =========================================================================
  // Offline Buffer Playback (Strictly Web Audio API - No HTMLAudioElements)
  // =========================================================================

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

  public playFile(path: string, volumeScale = 1.0) {
    if (this.isMuted || typeof window === "undefined") return;
    this.disableMediaSessionRegistration();

    const ctx = this.getContext();
    const cachedBuffer = this.audioBuffers.get(path);

    if (ctx && cachedBuffer) {
      try {
        const source = ctx.createBufferSource();
        source.buffer = cachedBuffer;
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(
          Math.max(0, Math.min(1, this.volume * volumeScale)),
          ctx.currentTime
        );
        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.onended = () => {
          try {
            source.disconnect();
            gainNode.disconnect();
          } catch {}
        };

        source.start(0);
        return;
      } catch {}
    }

    if (ctx) {
      this.preloadAudioBuffer(path)
        .then((buf) => {
          if (buf) {
            try {
              const source = ctx.createBufferSource();
              source.buffer = buf;
              const gainNode = ctx.createGain();
              gainNode.gain.setValueAtTime(
                Math.max(0, Math.min(1, this.volume * volumeScale)),
                ctx.currentTime
              );
              source.connect(gainNode);
              gainNode.connect(ctx.destination);

              source.onended = () => {
                try {
                  source.disconnect();
                  gainNode.disconnect();
                } catch {}
              };

              source.start(0);
            } catch {
              this.playChime();
            }
          }
        })
        .catch(() => {
          this.playChime();
        });
      return;
    }

    this.playChime();
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
    } else {
      if (this.isAmbiencePlaying) this.stopAmbience();
      if (this.isWalkthroughPlaying) this.stopWalkthroughAmbient();
      this.stopSubjectIntro();
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem("ib_sound_muted", String(this.isMuted));
    } catch {}
    if (muted) {
      if (this.isAmbiencePlaying) this.stopAmbience();
      if (this.isWalkthroughPlaying) this.stopWalkthroughAmbient();
      this.stopSubjectIntro();
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
