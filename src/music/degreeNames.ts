const DEGREE_NAMES_ES: string[] = [
  'Tónica',
  'Supertónica',
  'Mediante',
  'Subdominante',
  'Dominante',
  'Submediante',
  'Sensible'
]

export function getDegreeNameEs (degree: number): string {
  if (degree < 1 || degree > 7) return `Grado ${degree}`
  return DEGREE_NAMES_ES[degree - 1]
}

export function getHarmonicFunction (degree: number): 'tonic' | 'subdominant' | 'dominant' | null {
  if (degree === 1) return 'tonic'
  if (degree === 4) return 'subdominant'
  if (degree === 5) return 'dominant'
  return null
}
