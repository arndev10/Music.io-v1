import type { ScaleType } from '../types/music'
import type { LearningContent } from '../types/music'

const CONTENT: Record<ScaleType, LearningContent> = {
  major: {
    formula: '1 2 3 4 5 6 7',
    intervals: 'Tónica, 2ª mayor, 3ª mayor, 4ª justa, 5ª justa, 6ª mayor, 7ª mayor',
    vibe: 'Sonido estable y luminoso. Base de la música tonal occidental.',
    genre: 'Clásico, pop, rock (todas las épocas)'
  },
  dorian: {
    formula: '1 2 b3 4 5 6 b7',
    intervals: 'Escala menor con 6ª mayor. Intervalo característico: sexta mayor.',
    vibe: 'Menor con luz. Muy usada en funk, rock y jazz.',
    genre: 'Funk, rock, jazz (años 60 en adelante)'
  },
  phrygian: {
    formula: '1 b2 b3 4 5 b6 b7',
    intervals: 'Segunda menor (b2). Sonido español/flamenco.',
    vibe: 'Misterioso, tenso. Muy usado en flamenco y metal.',
    genre: 'Flamenco, metal, música cinematográfica'
  },
  lydian: {
    formula: '1 2 3 #4 5 6 7',
    intervals: 'Cuarta aumentada (#4). Sonido flotante.',
    vibe: 'Mayor con tensión. Común en bandas sonoras y prog.',
    genre: 'Cine, rock progresivo, jazz (años 70-80)'
  },
  mixolydian: {
    formula: '1 2 3 4 5 6 b7',
    intervals: 'Séptima menor (b7). Escala mayor con dominante.',
    vibe: 'Mayor con blues. Muy común en rock y blues.',
    genre: 'Rock, blues, country (años 50 en adelante)'
  },
  aeolian: {
    formula: '1 2 b3 4 5 b6 b7',
    intervals: 'Menor natural. Relativa de la mayor.',
    vibe: 'Melancólico, estable. Base del menor en pop/rock.',
    genre: 'Pop, rock, indie (todas las épocas)'
  },
  locrian: {
    formula: '1 b2 b3 4 b5 b6 b7',
    intervals: 'Quinta disminuida (b5). El más inestable.',
    vibe: 'Tenso, disonante. Uso experimental y metal.',
    genre: 'Metal, jazz moderno, experimental'
  },
  harmonicMinor: {
    formula: '1 2 b3 4 5 b6 7',
    intervals: 'Séptima mayor en contexto menor. Sensible.',
    vibe: 'Menor dramático. Clásico y metal.',
    genre: 'Clásico, metal, música cinematográfica'
  },
  melodicMinor: {
    formula: '1 2 b3 4 5 6 7',
    intervals: 'Menor con 6ª y 7ª mayores (ascendente).',
    vibe: 'Menor luminoso. Jazz y clásico.',
    genre: 'Jazz, clásico (siglo XX)'
  },
  pentatonicMajor: {
    formula: '1 2 3 5 6',
    intervals: 'Cinco notas. Sin 4ª ni 7ª. Muy estable.',
    vibe: 'Luminoso y simple. Ideal para melodías claras.',
    genre: 'Folk, country, pop (universal)'
  },
  pentatonicMinor: {
    formula: '1 b3 4 5 b7',
    intervals: 'Cinco notas. Base del rock y blues.',
    vibe: 'Bluesero, rockero. Fácil de improvisar.',
    genre: 'Blues, rock, metal (años 60 en adelante)'
  },
  blues: {
    formula: '1 b3 4 b5 5 b7',
    intervals: 'Pentatónica menor + nota blue (b5).',
    vibe: 'Blues clásico. Tensión y resolución.',
    genre: 'Blues, rock (años 40-70)'
  },
  bluesMinor: {
    formula: '1 b3 4 b5 5 b7',
    intervals: 'Igual que blues. Enfoque menor.',
    vibe: 'Blues en menor. Melancólico.',
    genre: 'Blues, rock (años 40-70)'
  },
  chromatic: {
    formula: '1 b2 2 b3 3 4 #4 5 b6 6 b7 7',
    intervals: 'Doce semitonos. Todas las notas.',
    vibe: 'Cromático. Uso ornamental o experimental.',
    genre: 'Jazz, clásico moderno, experimental'
  }
}

export function getLearningContent (scaleId: ScaleType): LearningContent {
  return CONTENT[scaleId] ?? CONTENT.major
}
