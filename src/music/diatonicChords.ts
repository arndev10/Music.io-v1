import { transposeNote } from './noteUtils'
import type { NoteName, DiatonicChord } from '../types/music'

const TRIAD_INTERVALS: Record<string, [number, number, number]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8]
}

const SEVENTH_INTERVALS: Record<string, [number, number, number, number]> = {
  maj7: [0, 4, 7, 11],
  dom7: [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  mMaj7: [0, 3, 7, 11],
  halfDim: [0, 3, 6, 10]
}

function noteIndex (note: NoteName): number {
  const chroma = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as NoteName[]
  return chroma.indexOf(note)
}

function semitonesBetween (from: NoteName, to: NoteName): number {
  const a = noteIndex(from)
  const b = noteIndex(to)
  return (b - a + 12) % 12
}

function getTriadQuality (scaleNotes: NoteName[], rootIdx: number): 'maj' | 'min' | 'dim' | 'aug' {
  const n = scaleNotes.length
  const root = scaleNotes[rootIdx % n]
  const third = scaleNotes[(rootIdx + 2) % n]
  const fifth = scaleNotes[(rootIdx + 4) % n]
  const d1 = semitonesBetween(root, third)
  const d2 = semitonesBetween(root, fifth)
  if (d1 === 4 && d2 === 7) return 'maj'
  if (d1 === 3 && d2 === 7) return 'min'
  if (d1 === 3 && d2 === 6) return 'dim'
  if (d1 === 4 && d2 === 8) return 'aug'
  return d1 === 3 ? 'min' : 'maj'
}

function getSeventhQuality (scaleNotes: NoteName[], rootIdx: number): 'maj7' | 'dom7' | 'm7' | 'mMaj7' | 'halfDim' {
  const n = scaleNotes.length
  const root = scaleNotes[rootIdx % n]
  const third = scaleNotes[(rootIdx + 2) % n]
  const fifth = scaleNotes[(rootIdx + 4) % n]
  const seventh = scaleNotes[(rootIdx + 6) % n]
  const d1 = semitonesBetween(root, third)
  const d2 = semitonesBetween(root, fifth)
  const d3 = semitonesBetween(root, seventh)
  if (d1 === 4 && d2 === 7 && d3 === 11) return 'maj7'
  if (d1 === 4 && d2 === 7 && d3 === 10) return 'dom7'
  if (d1 === 3 && d2 === 7 && d3 === 10) return 'm7'
  if (d1 === 3 && d2 === 7 && d3 === 11) return 'mMaj7'
  if (d1 === 3 && d2 === 6 && d3 === 10) return 'halfDim'
  return d1 === 3 ? 'm7' : 'maj7'
}

const ROMAN_MINOR = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii°']
const ROMAN_MAJOR = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII°']

function triadToLabel (root: NoteName, triadQuality: 'maj' | 'min' | 'dim' | 'aug'): string {
  if (triadQuality === 'maj') return root
  if (triadQuality === 'min') return root + 'm'
  if (triadQuality === 'dim') return root + 'dim'
  if (triadQuality === 'aug') return root + 'aug'
  return root
}

function seventhToLabel (root: NoteName, seventh: string): string {
  if (seventh === 'maj7') return root + 'maj7'
  if (seventh === 'dom7') return root + '7'
  if (seventh === 'm7') return root + 'm7'
  if (seventh === 'mMaj7') return root + 'mMaj7'
  if (seventh === 'halfDim') return root + 'm7b5'
  return root + '7'
}

export function getDiatonicChords (scaleNotes: NoteName[]): DiatonicChord[] {
  if (scaleNotes.length < 5) return []
  const isMinor = scaleNotes.length >= 7 && semitonesBetween(scaleNotes[0], scaleNotes[2]) === 3
  const romans = isMinor ? ROMAN_MINOR : ROMAN_MAJOR
  const chords: DiatonicChord[] = []
  const n = scaleNotes.length

  for (let i = 0; i < n; i++) {
    const root = scaleNotes[i]
    const triadQuality = getTriadQuality(scaleNotes, i)
    const seventhQuality = getSeventhQuality(scaleNotes, i)
    const triadIntervals = TRIAD_INTERVALS[triadQuality] ?? TRIAD_INTERVALS.maj
    const seventhIntervals = SEVENTH_INTERVALS[seventhQuality] ?? SEVENTH_INTERVALS.maj7
    const notesTriad = triadIntervals.map(s => transposeNote(root, s))
    const notesSeventh = seventhIntervals.map(s => transposeNote(root, s))
    const chordQuality: DiatonicChord['chordQuality'] =
      seventhQuality === 'halfDim' ? 'halfDim' : triadQuality === 'dim' ? 'dim' : triadQuality === 'min' ? 'min' : triadQuality === 'maj' ? 'maj' : 'dom'
    chords.push({
      degree: i + 1,
      degreeRoman: romans[i] ?? String(i + 1),
      rootNote: root,
      triadName: triadToLabel(root, triadQuality),
      seventhName: seventhToLabel(root, seventhQuality),
      chordQuality,
      notesTriad,
      notesSeventh
    })
  }
  return chords
}
