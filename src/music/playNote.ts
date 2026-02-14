import type { NoteName } from '../types/music'

const NOTE_TO_SEMITONE: Record<NoteName, number> = {
  C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6,
  G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11
}

const OCTAVE = 4
const DURATION_MS = 350

let audioContext: AudioContext | null = null

function getContext (): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioContext
}

function noteToFrequency (note: NoteName, octave: number): number {
  const semitone = NOTE_TO_SEMITONE[note]
  const midi = (octave + 1) * 12 + semitone
  return 440 * Math.pow(2, (midi - 69) / 12)
}

export function playNote (note: NoteName, durationMs: number = DURATION_MS): void {
  try {
    const ctx = getContext()
    if (ctx.state === 'suspended') ctx.resume()

    const t0 = ctx.currentTime
    const duration = durationMs / 1000
    const freq = noteToFrequency(note, OCTAVE)

    const masterGain = ctx.createGain()
    masterGain.connect(ctx.destination)
    masterGain.gain.setValueAtTime(0, t0)
    masterGain.gain.linearRampToValueAtTime(0.35, t0 + 0.01)
    masterGain.gain.exponentialRampToValueAtTime(0.01, t0 + duration)

    const playPartial = (f: number, gain: number) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.connect(g)
      g.connect(masterGain)
      osc.type = 'sine'
      osc.frequency.value = f
      g.gain.setValueAtTime(gain, t0)
      g.gain.exponentialRampToValueAtTime(0.01, t0 + duration)
      osc.start(t0)
      osc.stop(t0 + duration)
    }

    playPartial(freq, 1)
    playPartial(freq * 2, 0.4)
    playPartial(freq * 3, 0.15)
  } catch {
    // ignore if audio fails
  }
}
