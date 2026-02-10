import { getScaleById, getScaleNotes } from './scales'
import { toRoman } from './romanNumerals'
import { getDegreeNameEs } from './degreeNames'
import { getDiatonicChords } from './diatonicChords'
import { generateProgressions } from './progressions'
import { getNoteNameEs } from './noteUtils'
import type { ScaleMatch, NoteName } from '../types/music'

export function buildSummaryText (
  inputNotes: NoteName[],
  scale: ScaleMatch | null
): string {
  if (!scale) {
    return `Music.io Analysis\n\nInput Notes: ${inputNotes.join(' ')}\nTop 1: (none)`
  }
  const lines = [
    'Music.io Analysis',
    '',
    `Input Notes: ${inputNotes.join(' ')}`,
    '',
    `Top 1: ${getNoteNameEs(scale.root)} ${scale.scaleNameEs} (${scale.root} ${scale.scaleNameEn})`,
    `Match: ${scale.matchPercent.toFixed(0)}%`,
    `Coverage: ${scale.coveragePercent.toFixed(0)}%`,
    scale.missingNotes.length > 0 ? `Missing Notes: ${scale.missingNotes.join(' ')}` : 'Missing Notes: None',
    scale.outsideNotes.length > 0 ? `Outside Notes: ${scale.outsideNotes.join(' ')}` : 'Outside Notes: None'
  ]
  return lines.join('\n')
}

export function buildDegreesText (scale: ScaleMatch): string {
  const def = getScaleById(scale.scaleId)
  if (!def) return ''
  const notes = getScaleNotes(scale.root, def)
  const rows = notes.map((note, i) => {
    const degree = i + 1
    return `${toRoman(degree)} - ${note} (${getDegreeNameEs(degree)})`
  })
  return ['Degrees:', ...rows].join('\n')
}

export function buildChordsText (scale: ScaleMatch): string {
  const chords = getDiatonicChords(scale.scaleNotes)
  const rows = chords.map(c => {
    const notes = c.notesSeventh.join(' ')
    return `${c.degreeRoman}: ${c.triadName} / ${c.seventhName}  [${notes}]`
  })
  return ['Diatonic Chords:', ...rows].join('\n')
}

export function buildProgressionsText (scale: ScaleMatch): string {
  const progressions = generateProgressions(scale)
  const rows = progressions.map(p => {
    const degrees = p.degrees.join('–')
    const chords = p.chords.join('–')
    return `${p.name}: ${degrees} => ${chords}`
  })
  return ['Progressions:', ...rows].join('\n')
}

export function buildFullExportText (
  inputNotes: NoteName[],
  scale: ScaleMatch | null
): string {
  const parts = [buildSummaryText(inputNotes, scale)]
  if (scale) {
    parts.push('', buildDegreesText(scale))
    parts.push('', buildChordsText(scale))
    parts.push('', buildProgressionsText(scale))
  }
  return parts.join('\n')
}
