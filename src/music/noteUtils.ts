import type { NoteName } from '../types/music'

const CHROMATIC_SHARP: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const CHROMATIC_FLAT: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

const SHARP_TO_FLAT: Record<string, string> = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb'
}

const FLAT_TO_SHARP: Record<string, string> = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#'
}

export function getAllChromaticNotes (): NoteName[] {
  return [...CHROMATIC_SHARP]
}

export function normalizeNoteName (raw: string): NoteName | null {
  const trimmed = raw.trim()
  const upper = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  const sharp = CHROMATIC_SHARP.find(n => n === upper || n === trimmed)
  if (sharp) return sharp
  const flat = CHROMATIC_FLAT.find(n => n === upper || n === trimmed)
  if (flat && FLAT_TO_SHARP[flat]) return FLAT_TO_SHARP[flat] as NoteName
  return null
}

export function convertSharpToFlat (note: NoteName): string {
  return SHARP_TO_FLAT[note] ?? note
}

export function convertFlatToSharp (note: string): NoteName {
  return (FLAT_TO_SHARP[note] ?? note) as NoteName
}

export function transposeNote (note: NoteName, semitones: number): NoteName {
  const idx = CHROMATIC_SHARP.indexOf(note)
  const newIdx = (idx + semitones + 12) % 12
  return CHROMATIC_SHARP[newIdx]
}

export function noteToIndex (note: NoteName): number {
  return CHROMATIC_SHARP.indexOf(note)
}

export function indexToNote (index: number): NoteName {
  return CHROMATIC_SHARP[((index % 12) + 12) % 12]
}

export function getEnharmonic (note: NoteName, preferFlat: boolean): string {
  if (preferFlat && SHARP_TO_FLAT[note]) return SHARP_TO_FLAT[note]
  return note
}

const NOTE_NAMES_ES: Record<NoteName, string> = {
  C: 'Do',
  'C#': 'Do#',
  D: 'Re',
  'D#': 'Re#',
  E: 'Mi',
  F: 'Fa',
  'F#': 'Fa#',
  G: 'Sol',
  'G#': 'Sol#',
  A: 'La',
  'A#': 'La#',
  B: 'Si'
}

export function getNoteNameEs (note: NoteName): string {
  return NOTE_NAMES_ES[note]
}
