import { getDiatonicChords } from './diatonicChords'
import type { ScaleMatch, ProgressionSuggestion } from '../types/music'

interface ProgressionTemplate {
  name: string
  degrees: string[]
}

const MAJOR_PROGRESSIONS: ProgressionTemplate[] = [
  { name: 'Pop clásico', degrees: ['I', 'V', 'vi', 'IV'] },
  { name: 'I–IV–V', degrees: ['I', 'IV', 'V', 'I'] },
  { name: 'vi–IV–I–V', degrees: ['vi', 'IV', 'I', 'V'] },
  { name: 'ii–V–I', degrees: ['ii', 'V', 'I'] },
  { name: 'I–iii–IV–V', degrees: ['I', 'iii', 'IV', 'V'] }
]

const MINOR_PROGRESSIONS: ProgressionTemplate[] = [
  { name: 'i–VII–VI–VII', degrees: ['i', 'VII', 'VI', 'VII'] },
  { name: 'i–VI–III–VII', degrees: ['i', 'VI', 'III', 'VII'] },
  { name: 'i–iv–v–i', degrees: ['i', 'iv', 'v', 'i'] },
  { name: 'i–iv–VII–III', degrees: ['i', 'iv', 'VII', 'III'] },
  { name: 'i–v–VI–VII', degrees: ['i', 'v', 'VI', 'VII'] }
]

const PENTATONIC_PROGRESSIONS: ProgressionTemplate[] = [
  { name: 'I–IV–V', degrees: ['I', 'IV', 'V'] },
  { name: 'I–II–V', degrees: ['I', 'II', 'V'] },
  { name: 'I–III–IV', degrees: ['I', 'III', 'IV'] },
  { name: 'I–IV–I', degrees: ['I', 'IV', 'I'] }
]

const ROMAN_TO_DEGREE: Record<string, number> = {
  I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7,
  i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7
}

function degreeRomanToNumber (roman: string): number {
  const base = roman.replace('°', '').replace('ø', '')
  return ROMAN_TO_DEGREE[base] ?? 1
}

export function generateProgressions (scaleAnalysis: ScaleMatch): ProgressionSuggestion[] {
  const scaleNotes = scaleAnalysis.scaleNotes ?? []
  const chords = getDiatonicChords(scaleNotes)
  if (chords.length === 0) return []
  const chordByDegree = Object.fromEntries(chords.map(c => [c.degree, c]))

  const n = scaleNotes.length
  const isMajor = scaleAnalysis.scaleType === 'major' || ['lydian', 'mixolydian'].includes(scaleAnalysis.scaleId)
  const isPentatonic = n >= 5 && n <= 6

  let templates: ProgressionTemplate[]
  if (n >= 7) {
    templates = isMajor ? MAJOR_PROGRESSIONS : MINOR_PROGRESSIONS
  } else if (isPentatonic) {
    templates = PENTATONIC_PROGRESSIONS.filter(t => t.degrees.every(d => degreeRomanToNumber(d) <= n))
  } else {
    return []
  }

  return templates.map(({ name, degrees }) => {
    const chordNames = degrees.map(d => {
      const deg = degreeRomanToNumber(d)
      const chord = chordByDegree[deg]
      return chord ? chord.triadName : '?'
    })
    return { name, degrees, chords: chordNames }
  })
}
