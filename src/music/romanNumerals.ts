const ROMAN: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

export function toRoman (degree: number): string {
  if (degree < 1 || degree > 7) return String(degree)
  return ROMAN[degree - 1]
}

export function fromRoman (roman: string): number {
  const idx = ROMAN.indexOf(roman.toUpperCase())
  return idx >= 0 ? idx + 1 : 0
}
