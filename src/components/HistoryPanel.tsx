import type { HistoryEntry } from '../types/music'
import { getNoteNameEs } from '../music/noteUtils'

interface HistoryPanelProps {
  entries: HistoryEntry[]
  onLoadEntry: (notes: HistoryEntry['inputNotes']) => void
  onClear: () => void
}

export function HistoryPanel ({ entries, onLoadEntry, onClear }: HistoryPanelProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Historial
        </h2>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="min-h-[44px] min-w-[64px] rounded-lg px-2 text-xs font-medium text-slate-500 active:bg-slate-100 dark:text-slate-400 dark:active:bg-slate-700"
          >
            Limpiar
          </button>
        )}
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No hay búsquedas guardadas.
        </p>
      ) : (
        <ul className="space-y-2">
          {entries.slice(0, 20).map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => onLoadEntry(entry.inputNotes)}
                className="w-full min-h-[52px] rounded-lg border border-slate-200 px-3 py-3 text-left text-sm active:bg-slate-50 dark:border-slate-600 dark:active:bg-slate-700/50"
              >
                <span className="text-slate-600 dark:text-slate-300">
                  {entry.inputNotes.join(', ')}
                </span>
                {entry.topScale && (
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                    → {getNoteNameEs(entry.topScale.root)} {entry.topScale.scaleNameEs}
                  </span>
                )}
                <span className="block text-xs text-slate-400 dark:text-slate-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
