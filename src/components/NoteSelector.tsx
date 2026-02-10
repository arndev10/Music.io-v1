import { getAllChromaticNotes } from '../music/noteUtils'
import type { NoteName } from '../types/music'

interface NoteSelectorProps {
  orderedNotes: NoteName[]
  scaleNotes: NoteName[] | null
  outsideNotes: NoteName[]
  onAddNote: (note: NoteName) => void
  onRemoveAt: (index: number) => void
  onReset: () => void
  onCopyNotes: () => void
  onSaveToHistory: () => void
}

const CHROMATIC = getAllChromaticNotes()

export function NoteSelector ({
  orderedNotes,
  scaleNotes,
  outsideNotes,
  onAddNote,
  onRemoveAt,
  onReset,
  onCopyNotes,
  onSaveToHistory
}: NoteSelectorProps) {
  const selectedSet = new Set(orderedNotes)
  const scaleSet = scaleNotes ? new Set(scaleNotes) : null
  const outsideSet = new Set(outsideNotes)

  function getNoteStyle (note: NoteName): string {
    if (!selectedSet.has(note)) {
      return 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
    }
    if (scaleSet) {
      if (outsideSet.has(note)) {
        return 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
      }
      return 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
    }
    return 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
      <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400 sm:mb-3">
        Notas (en orden de progresión)
      </h2>
      <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
        Toca una nota para agregarla al final. Toca una de la secuencia para quitarla.
      </p>
      {orderedNotes.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Secuencia:</span>
          {orderedNotes.map((note, i) => (
            <button
              key={`${i}-${note}`}
              type="button"
              onClick={() => onRemoveAt(i)}
              className="min-h-[44px] min-w-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-red-100 active:text-red-700 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-red-900/30 dark:active:text-red-300"
              title="Quitar esta nota"
            >
              {note} ×
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-2">
        {CHROMATIC.map((note) => (
          <button
            key={note}
            type="button"
            onClick={() => onAddNote(note)}
            title={scaleSet && outsideSet.has(note) && selectedSet.has(note) ? 'Nota fuera de la escala seleccionada' : `Agregar ${note}`}
            className={`min-h-[48px] rounded-lg px-2 py-2.5 text-sm font-medium transition-all active:scale-[0.98] sm:min-h-0 sm:px-4 sm:py-2 ${getNoteStyle(note)}`}
          >
            {note}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-2">
        <button
          type="button"
          onClick={onReset}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onCopyNotes}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          Copiar notas
        </button>
        <button
          type="button"
          onClick={onSaveToHistory}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:col-span-3 sm:py-1.5"
        >
          Guardar en historial
        </button>
      </div>
    </section>
  )
}
