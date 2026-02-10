import { toRoman } from '../music/romanNumerals'
import type { NoteName } from '../types/music'

const WHITE_KEYS: NoteName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B']
const BLACK_NOTES: NoteName[] = ['C#', 'D#', 'F#', 'G#', 'A#', 'C#', 'D#', 'F#', 'G#', 'A#']
const BLACK_POSITIONS = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12]

interface ScalePianoProps {
  scaleNotes: NoteName[] | null
  tonic: NoteName | null
  inputNotes: NoteName[]
}

function getDegreeInScale (note: NoteName, scaleNotes: NoteName[]): number | null {
  const idx = scaleNotes.indexOf(note)
  return idx >= 0 ? idx + 1 : null
}

export function ScalePiano ({ scaleNotes, tonic, inputNotes }: ScalePianoProps) {
  const scaleSet = scaleNotes ? new Set(scaleNotes) : new Set<NoteName>()
  const inputSet = new Set(inputNotes)

  function whiteKeyStyle (note: NoteName): string {
    const inScale = scaleSet.has(note)
    const isTonic = tonic === note
    const isInput = inputSet.has(note)
    if (isInput) return 'bg-green-100 dark:bg-green-900/40'
    if (isTonic) return 'bg-sky-200 dark:bg-sky-600/60'
    if (inScale) return 'bg-sky-100 dark:bg-sky-800/40'
    return 'bg-white dark:bg-neutral-800'
  }

  function blackKeyStyle (note: NoteName): string {
    const inScale = scaleSet.has(note)
    const isTonic = tonic === note
    const isInput = inputSet.has(note)
    if (isInput) return 'bg-green-200 dark:bg-green-800/60'
    if (isTonic) return 'bg-sky-400 dark:bg-sky-500'
    if (inScale) return 'bg-sky-300 dark:bg-sky-700/80'
    return 'bg-neutral-900 dark:bg-black'
  }

  return (
    <div className="rounded-lg border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-600 dark:bg-neutral-800">
      <h3 className="mb-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 sm:mb-2">
        Piano (2 octavas)
      </h3>
      <div className="relative h-24 sm:h-28">
        <div className="flex h-full border border-neutral-400 dark:border-neutral-600">
          {WHITE_KEYS.map((note, i) => (
            <div
              key={`w-${i}-${note}`}
              className={`relative flex flex-1 flex-col items-center justify-end border-r border-neutral-400 pb-1 last:border-r-0 dark:border-neutral-600 ${whiteKeyStyle(note)}`}
              title={
                scaleNotes
                  ? (getDegreeInScale(note, scaleNotes)
                      ? `${note} – Grado ${toRoman(getDegreeInScale(note, scaleNotes)!)}`
                      : `${note} – fuera de escala`)
                  : note
              }
            >
              <span className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300">
                {note}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 flex h-12 w-full pointer-events-none sm:h-14">
          {BLACK_POSITIONS.map((whiteIdx, k) => {
            const note = BLACK_NOTES[k]
            const leftPct = (whiteIdx / 14) * 100 + (1 / 14) * 50
            return (
              <div
                key={`b-${k}-${note}`}
                className={`absolute flex h-12 w-[6.5%] -translate-x-1/2 flex-col items-center justify-end rounded-b border border-neutral-800 pb-0.5 pointer-events-auto dark:border-neutral-700 sm:h-14 ${blackKeyStyle(note)}`}
                style={{ left: `${leftPct}%` }}
                title={
                  scaleNotes
                    ? (getDegreeInScale(note, scaleNotes)
                        ? `${note} – Grado ${toRoman(getDegreeInScale(note, scaleNotes)!)}`
                        : `${note} – fuera de escala`)
                    : note
                }
              >
                <span className="text-[9px] font-medium text-white">
                  {note}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-1 text-[10px] text-neutral-600 dark:text-neutral-400">
        Blanco/negro = teclas normales · Verde pálido = notas ingresadas · Azul/celeste = escala elegida
      </p>
    </div>
  )
}
