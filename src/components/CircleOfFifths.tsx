import { useState } from 'react'
import { getNoteNameEs, transposeNote } from '../music/noteUtils'
import type { NoteName } from '../types/music'

const FIFTHS_ORDER: NoteName[] = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'A#', 'D#', 'F']

function getRelativeMinor (root: NoteName): NoteName {
  return transposeNote(root, 9)
}

function getNeighborIndices (selectedIdx: number): { prev: number; next: number } {
  const prev = (selectedIdx - 1 + 12) % 12
  const next = (selectedIdx + 1) % 12
  return { prev, next }
}

interface CircleOfFifthsProps {
  selectedRoot: NoteName | null
  onSelectRoot: (root: NoteName | null) => void
}

function positionOnCircle (index: number, total: number, radius: number): { x: number; y: number } {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle)
  }
}

export function CircleOfFifths ({ selectedRoot, onSelectRoot }: CircleOfFifthsProps) {
  const [hoverNote, setHoverNote] = useState<NoteName | null>(null)
  const selectedIdx = selectedRoot != null ? FIFTHS_ORDER.indexOf(selectedRoot) : -1
  const neighbors = selectedIdx >= 0 ? getNeighborIndices(selectedIdx) : null

  const outerRadius = 42
  const innerRadius = 28
  const outerPositions = FIFTHS_ORDER.map((_, i) => positionOnCircle(i, 12, outerRadius))
  const innerPositions = FIFTHS_ORDER.map((_, i) => positionOnCircle(i, 12, innerRadius))

  function getCircleStyle (i: number): string {
    if (i === selectedIdx) {
      return 'fill-blue-500 stroke-blue-600 dark:fill-blue-500 dark:stroke-blue-400'
    }
    if (neighbors && (i === neighbors.prev || i === neighbors.next)) {
      return 'fill-blue-200 stroke-blue-300 dark:fill-blue-900/50 dark:stroke-blue-700'
    }
    return 'fill-transparent stroke-slate-400 dark:stroke-slate-500 hover:stroke-slate-600 dark:hover:stroke-slate-300'
  }

  function getTitle (i: number): string {
    if (i === selectedIdx) return getNoteNameEs(FIFTHS_ORDER[i])
    if (neighbors && (i === neighbors.prev || i === neighbors.next)) {
      return 'Tonalidad cercana: comparte muchas notas'
    }
    return getNoteNameEs(FIFTHS_ORDER[i])
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
      <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400 sm:mb-3">
        Círculo de quintas
      </h2>
      <p className="mb-2 text-xs text-slate-500 dark:text-slate-400 sm:mb-3">
        Toca una tonalidad para fijar root.
      </p>
      <div className="relative mx-auto aspect-square w-full max-w-[260px] min-h-[220px] sm:max-w-[280px]">
        <svg viewBox="0 0 100 100" className="w-full">
          <circle
            cx="50"
            cy="50"
            r={outerRadius + 4}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-slate-300 dark:text-slate-600"
          />
          <circle
            cx="50"
            cy="50"
            r={innerRadius - 2}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-slate-300 dark:text-slate-600"
          />
          {FIFTHS_ORDER.map((note, i) => {
            const outer = outerPositions[i]
            const inner = innerPositions[i]
            const minor = getRelativeMinor(note)
            return (
              <g
                key={note}
                onMouseEnter={() => setHoverNote(note)}
                onMouseLeave={() => setHoverNote(null)}
              >
                <title>{getTitle(i)}</title>
                <circle
                  cx={outer.x}
                  cy={outer.y}
                  r="8"
                  className={`cursor-pointer transition-colors ${getCircleStyle(i)}`}
                  onClick={() => onSelectRoot(note)}
                />
                <text
                  x={outer.x}
                  y={outer.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none text-[5px] font-medium fill-slate-700 dark:fill-slate-200"
                >
                  {getNoteNameEs(note)}
                </text>
                <circle
                  cx={inner.x}
                  cy={inner.y}
                  r="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-400 dark:text-slate-500"
                />
                <text
                  x={inner.x}
                  y={inner.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[3.5px] fill-slate-500 dark:fill-slate-400"
                >
                  {minor}m
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      {hoverNote && neighbors && (FIFTHS_ORDER.indexOf(hoverNote) === neighbors.prev || FIFTHS_ORDER.indexOf(hoverNote) === neighbors.next) && (
        <p className="mt-1 text-center text-xs text-slate-500 dark:text-slate-400">
          Tonalidad cercana: comparte muchas notas
        </p>
      )}
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => onSelectRoot(null)}
          className={`min-h-[44px] min-w-[80px] rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.98] ${
            selectedRoot === null
              ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
              : 'bg-slate-200 text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500'
          }`}
        >
          Auto
        </button>
      </div>
    </section>
  )
}
