import { useMemo, useState, useEffect, useCallback } from 'react'
import { getAllChromaticNotes, getNoteNameEs } from './music/noteUtils'
import { analyzeScales } from './music/scaleAnalyzer'
import { NoteSelector } from './components/NoteSelector'
import { ScaleResults } from './components/ScaleResults'
import { ScaleDetail } from './components/ScaleDetail'
import { CircleOfFifths } from './components/CircleOfFifths'
import { HistoryPanel } from './components/HistoryPanel'
import { CopyButtons } from './components/CopyButtons'
import type { NoteName, ScaleMatch, HistoryEntry } from './types/music'

const HISTORY_KEY = 'music-io-history'
const MAX_HISTORY = 20

function loadHistory (): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryEntry[]
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : []
  } catch {
    return []
  }
}

function saveHistory (entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)))
  } catch {
    // ignore
  }
}

const CHROMATIC = getAllChromaticNotes()

export default function App () {
  const [orderedNotes, setOrderedNotes] = useState<NoteName[]>([])
  const [rootFixed, setRootFixed] = useState<NoteName | null>(null)
  const [selectedScale, setSelectedScale] = useState<ScaleMatch | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [darkMode])

  const noteList = useMemo(() => [...new Set(orderedNotes)], [orderedNotes])
  const results = useMemo(
    () => analyzeScales(noteList, rootFixed),
    [noteList, rootFixed]
  )
  const topScale = results[0] ?? null

  const handleAddNote = useCallback((note: NoteName) => {
    setOrderedNotes((prev) => [...prev, note])
  }, [])

  const handleRemoveAt = useCallback((index: number) => {
    setOrderedNotes((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleReset = useCallback(() => {
    setOrderedNotes([])
    setSelectedScale(null)
  }, [])

  const handleCopyNotes = useCallback(() => {
    const text = orderedNotes.join(', ')
    navigator.clipboard.writeText(text)
  }, [orderedNotes])

  const handleSaveToHistory = useCallback(() => {
    if (orderedNotes.length === 0) return
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      inputNotes: [...orderedNotes],
      topScale: topScale ?? null
    }
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_HISTORY)
      saveHistory(next)
      return next
    })
  }, [orderedNotes, topScale])

  const handleLoadHistory = useCallback((notes: NoteName[]) => {
    setOrderedNotes(notes)
    setSelectedScale(null)
  }, [])

  const handleClearHistory = useCallback(() => {
    setHistory([])
    saveHistory([])
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-800 sm:px-4 sm:py-5">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Music.io</h1>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400 sm:mt-1 sm:text-sm">
            Analiza escalas. Ideal para guitarra.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-4">
            <label className="flex min-h-[44px] items-center gap-2 text-sm">
              <span className="sr-only sm:not-sr-only sm:inline">Root fijo</span>
              <select
                value={rootFixed ?? ''}
                onChange={(e) => setRootFixed(e.target.value ? (e.target.value as NoteName) : null)}
                className="min-h-[44px] min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
              >
                <option value="">Auto</option>
                {CHROMATIC.map((n) => (
                  <option key={n} value={n}>
                    {getNoteNameEs(n)} ({n})
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              className="min-h-[44px] min-w-[88px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
            >
              {darkMode ? 'Claro' : 'Oscuro'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-4 p-3 pb-6 sm:space-y-6 sm:p-4 sm:pb-8">
        <NoteSelector
          orderedNotes={orderedNotes}
          scaleNotes={selectedScale?.scaleNotes ?? null}
          outsideNotes={selectedScale?.outsideNotes ?? []}
          onAddNote={handleAddNote}
          onRemoveAt={handleRemoveAt}
          onReset={handleReset}
          onCopyNotes={handleCopyNotes}
          onSaveToHistory={handleSaveToHistory}
        />

        <ScaleResults
          results={results}
          selectedScale={selectedScale}
          onSelectScale={setSelectedScale}
          inputCount={noteList.length}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <ScaleDetail
            match={selectedScale}
            inputNotes={orderedNotes}
          />
          <CircleOfFifths
            selectedRoot={rootFixed}
            onSelectRoot={setRootFixed}
          />
        </div>

        <CopyButtons
          selectedNotes={orderedNotes}
          selectedScale={selectedScale}
          topScale={topScale}
        />

        <HistoryPanel
          entries={history}
          onLoadEntry={handleLoadHistory}
          onClear={handleClearHistory}
        />
      </main>
    </div>
  )
}
