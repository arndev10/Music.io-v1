export type NoteName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export type ScaleType =
  | 'major'
  | 'dorian'
  | 'phrygian'
  | 'lydian'
  | 'mixolydian'
  | 'aeolian'
  | 'locrian'
  | 'harmonicMinor'
  | 'melodicMinor'
  | 'pentatonicMajor'
  | 'pentatonicMinor'
  | 'blues'
  | 'bluesMinor'
  | 'chromatic'

export interface ScaleDefinition {
  id: ScaleType
  nameEs: string
  nameEn: string
  intervals: number[]
  formula: string
  tags: ('diatonic' | 'pentatonic' | 'blues' | 'minor' | 'mode')[]
}

export type ScaleCategory = 'major' | 'minor' | 'pentatonic' | 'blues' | 'mode' | 'other'

export interface ScaleMatch {
  scaleId: ScaleType
  root: NoteName
  scaleNameEs: string
  scaleNameEn: string
  matchedNotes: NoteName[]
  outsideNotes: NoteName[]
  missingNotes: NoteName[]
  matchPercent: number
  coveragePercent: number
  confidenceScore: number
  isRelativeToTop1?: boolean
  tags: string[]
  scaleNotes: NoteName[]
  formula: string
  scaleType: ScaleCategory
}

export type ScaleAnalysisResult = ScaleMatch

export interface DiatonicChord {
  degree: number
  degreeRoman: string
  rootNote: NoteName
  triadName: string
  seventhName: string
  chordQuality: 'maj' | 'min' | 'dim' | 'aug' | 'dom' | 'halfDim'
  notesTriad: NoteName[]
  notesSeventh: NoteName[]
}

export interface ProgressionSuggestion {
  name: string
  degrees: string[]
  chords: string[]
}

export interface DegreeRow {
  degree: number
  roman: string
  note: NoteName
  nameEs: string
}

export interface HarmonicFunctions {
  tonic: NoteName
  subdominant: NoteName
  dominant: NoteName
}

export interface HistoryEntry {
  id: string
  timestamp: number
  inputNotes: NoteName[]
  topScale: ScaleMatch | null
}

export interface LearningContent {
  formula: string
  intervals: string
  vibe: string
  genre: string
}
