import type { ScaleMatch } from '../types/music'
import { getNoteNameEs } from '../music/noteUtils'

interface ScaleResultsProps {
  results: ScaleMatch[]
  selectedScale: ScaleMatch | null
  onSelectScale: (m: ScaleMatch) => void
  inputCount: number
}

export function ScaleResults ({
  results,
  selectedScale,
  onSelectScale,
  inputCount
}: ScaleResultsProps) {
  const lowConfidence = inputCount < 3

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
      <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400 sm:mb-3">
        Top 3 escalas
      </h2>
      {lowConfidence && (
        <p className="mb-2 text-sm text-amber-600 dark:text-amber-400 sm:mb-3">
          Agrega más notas para un análisis confiable.
        </p>
      )}
      <div className="space-y-2">
        {results.map((match) => (
          <button
            key={`${match.root}-${match.scaleId}`}
            type="button"
            onClick={() => onSelectScale(match)}
            className={`w-full rounded-lg border p-3 text-left transition-all min-h-[52px] active:scale-[0.99] ${
              selectedScale?.root === match.root && selectedScale?.scaleId === match.scaleId
                ? 'border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-700'
                : 'border-slate-200 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium">
                {getNoteNameEs(match.root)} {match.scaleNameEs}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {match.root} {match.scaleNameEn}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span>Coincidencia: {match.matchPercent.toFixed(0)}%</span>
              <span>Cobertura: {match.coveragePercent.toFixed(0)}%</span>
              {match.tags.length > 0 && (
                <span className="text-slate-500 dark:text-slate-400">
                  {match.tags.join(' · ')}
                </span>
              )}
            </div>
            {match.outsideNotes.length > 0 && (
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                Notas fuera: {match.outsideNotes.join(', ')}
              </p>
            )}
            {match.missingNotes.length > 0 && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Notas faltantes: {match.missingNotes.join(', ')}
              </p>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
