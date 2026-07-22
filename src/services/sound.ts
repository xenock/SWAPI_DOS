export class SoundSynth {
  private audioCtx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // AudioContext is initialized lazily on first user interaction
  }

  private initContext(): AudioContext | null {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  public playBeep(freq: number = 750, durationMs: number = 40): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch {
      // Ignore audio synthesis errors in unsupported environments
    }
  }

  public playClick(): void {
    this.playBeep(900, 20);
  }

  public playError(): void {
    this.playBeep(200, 120);
  }

  public playSuccess(): void {
    this.playBeep(587, 40);
    setTimeout(() => this.playBeep(880, 60), 45);
  }
}

export const soundSynth = new SoundSynth();
