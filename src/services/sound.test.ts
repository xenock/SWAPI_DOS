import { describe, it, expect, beforeEach } from 'vitest';
import { SoundSynth } from './sound';

describe('SoundSynth', () => {
  let synth: SoundSynth;

  beforeEach(() => {
    synth = new SoundSynth();
  });

  it('starts unmuted by default and toggles mute state correctly', () => {
    expect(synth.isMuted()).toBe(false);

    const newState = synth.toggleMute();
    expect(newState).toBe(true);
    expect(synth.isMuted()).toBe(true);

    synth.setMuted(false);
    expect(synth.isMuted()).toBe(false);
  });

  it('does not throw when playBeep or playClick is called in test environment', () => {
    expect(() => synth.playClick()).not.toThrow();
    expect(() => synth.playError()).not.toThrow();
    expect(() => synth.playSuccess()).not.toThrow();
  });
});
