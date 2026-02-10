import { SCALE_DEFINITIONS, getScaleNotes, getScaleById, isRelativePair } from './scales'
import type { NoteName, ScaleMatch, ScaleCategory } from '../types/music'

function scaleCategory (scaleId: string, tags: string[]): ScaleCategory {
  if (tags.includes('pentatonic')) return 'pentatonic'
  if (tags.includes('blues')) return 'blues'
  if (tags.includes('minor')) return 'minor'
  if (tags.includes('mode')) return 'mode'
  if (scaleId === 'major') return 'major'
  return 'other'
}

export function analyzeScales (
  inputNotes: NoteName[],
  rootFixed: NoteName | null = null
): ScaleMatch[] {
  const inputSet = new Set(inputNotes)
  const results: ScaleMatch[] = []

  const roots: NoteName[] = rootFixed
    ? [rootFixed]
    : (['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as NoteName[])

  for (const root of roots) {
    for (const def of SCALE_DEFINITIONS) {
      if (def.id === 'chromatic') continue
      const scaleNotes = getScaleNotes(root, def)
      const scaleSet = new Set(scaleNotes)
      const matchedNotes = inputNotes.filter(n => scaleSet.has(n))
      const outsideNotes = inputNotes.filter(n => !scaleSet.has(n))
      const missingNotes = scaleNotes.filter(n => !inputSet.has(n))

      const matchPercent = inputNotes.length > 0
        ? (matchedNotes.length / inputNotes.length) * 100
        : 0
      const coveragePercent = scaleNotes.length > 0
        ? (matchedNotes.length / scaleNotes.length) * 100
        : 0
      const confidenceScore = matchPercent * 0.7 + coveragePercent * 0.3

      const tags: string[] = []
      if (def.tags.includes('pentatonic')) tags.push('Pentatónica')
      if (def.tags.includes('mode')) tags.push('Modo')
      if (def.tags.includes('blues')) tags.push('Blues')

      results.push({
        scaleId: def.id,
        root,
        scaleNameEs: def.nameEs,
        scaleNameEn: def.nameEn,
        matchedNotes,
        outsideNotes,
        missingNotes,
        matchPercent,
        coveragePercent,
        confidenceScore,
        tags,
        scaleNotes,
        formula: def.formula,
        scaleType: scaleCategory(def.id, def.tags)
      })
    }
  }

  results.sort((a, b) => {
    if (Math.abs(b.confidenceScore - a.confidenceScore) > 0.01) return b.confidenceScore - a.confidenceScore
    if (Math.abs(b.coveragePercent - a.coveragePercent) > 0.01) return b.coveragePercent - a.coveragePercent
    const defA = getScaleById(a.scaleId)!
    const defB = getScaleById(b.scaleId)!
    return defB.intervals.length - defA.intervals.length
  })

  const top3 = results.slice(0, 3)
  const top1 = top3[0]
  if (top1) {
    top3.forEach((r, i) => {
      if (i === 0) return
      if (isRelativePair(top1.root, getScaleById(top1.scaleId)!, r.root, getScaleById(r.scaleId)!)) {
        r.isRelativeToTop1 = true
        r.tags = [...r.tags, 'Relativa']
      }
    })
  }

  return top3
}
