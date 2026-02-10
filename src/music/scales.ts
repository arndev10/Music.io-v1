import { transposeNote } from './noteUtils'
import type { NoteName, ScaleDefinition } from '../types/music'

export const SCALE_DEFINITIONS: ScaleDefinition[] = [
  {
    id: 'major',
    nameEs: 'Mayor',
    nameEn: 'Ionian',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    formula: '1 2 3 4 5 6 7',
    tags: ['diatonic']
  },
  {
    id: 'dorian',
    nameEs: 'Dórico',
    nameEn: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    formula: '1 2 b3 4 5 6 b7',
    tags: ['diatonic', 'mode']
  },
  {
    id: 'phrygian',
    nameEs: 'Frigio',
    nameEn: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    formula: '1 b2 b3 4 5 b6 b7',
    tags: ['diatonic', 'mode']
  },
  {
    id: 'lydian',
    nameEs: 'Lidio',
    nameEn: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    formula: '1 2 3 #4 5 6 7',
    tags: ['diatonic', 'mode']
  },
  {
    id: 'mixolydian',
    nameEs: 'Mixolidio',
    nameEn: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    formula: '1 2 3 4 5 6 b7',
    tags: ['diatonic', 'mode']
  },
  {
    id: 'aeolian',
    nameEs: 'Menor natural',
    nameEn: 'Aeolian',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    formula: '1 2 b3 4 5 b6 b7',
    tags: ['diatonic', 'minor', 'mode']
  },
  {
    id: 'locrian',
    nameEs: 'Locrio',
    nameEn: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    formula: '1 b2 b3 4 b5 b6 b7',
    tags: ['diatonic', 'mode']
  },
  {
    id: 'harmonicMinor',
    nameEs: 'Menor armónica',
    nameEn: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    formula: '1 2 b3 4 5 b6 7',
    tags: ['minor']
  },
  {
    id: 'melodicMinor',
    nameEs: 'Menor melódica',
    nameEn: 'Melodic Minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    formula: '1 2 b3 4 5 6 7',
    tags: ['minor']
  },
  {
    id: 'pentatonicMajor',
    nameEs: 'Pentatónica mayor',
    nameEn: 'Major Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    formula: '1 2 3 5 6',
    tags: ['pentatonic']
  },
  {
    id: 'pentatonicMinor',
    nameEs: 'Pentatónica menor',
    nameEn: 'Minor Pentatonic',
    intervals: [0, 3, 5, 7, 10],
    formula: '1 b3 4 5 b7',
    tags: ['pentatonic']
  },
  {
    id: 'blues',
    nameEs: 'Blues',
    nameEn: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    formula: '1 b3 4 b5 5 b7',
    tags: ['blues']
  },
  {
    id: 'bluesMinor',
    nameEs: 'Blues menor',
    nameEn: 'Minor Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    formula: '1 b3 4 b5 5 b7',
    tags: ['blues', 'minor']
  },
  {
    id: 'chromatic',
    nameEs: 'Cromática',
    nameEn: 'Chromatic',
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    formula: '1 b2 2 b3 3 4 #4 5 b6 6 b7 7',
    tags: []
  }
]

export function getScaleNotes (root: NoteName, definition: ScaleDefinition): NoteName[] {
  return definition.intervals.map(semitones => transposeNote(root, semitones))
}

export function getScaleById (id: ScaleDefinition['id']): ScaleDefinition | undefined {
  return SCALE_DEFINITIONS.find(s => s.id === id)
}

export function getRelativeMinorRoot (majorRoot: NoteName): NoteName {
  return transposeNote(majorRoot, 9)
}

export function getRelativeMajorRoot (minorRoot: NoteName): NoteName {
  return transposeNote(minorRoot, 3)
}

export function isRelativePair (root1: NoteName, scale1: ScaleDefinition, root2: NoteName, scale2: ScaleDefinition): boolean {
  if (scale1.id === 'major' && scale2.id === 'aeolian') {
    return getRelativeMinorRoot(root1) === root2
  }
  if (scale1.id === 'aeolian' && scale2.id === 'major') {
    return getRelativeMajorRoot(root1) === root2
  }
  return false
}
