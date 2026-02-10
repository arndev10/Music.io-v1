import { useState, useCallback } from 'react'
import {
  buildSummaryText,
  buildDegreesText,
  buildProgressionsText,
  buildFullExportText
} from '../music/exportUtils'
import type { ScaleMatch, NoteName } from '../types/music'

interface CopyButtonsProps {
  selectedNotes: NoteName[]
  selectedScale: ScaleMatch | null
  topScale: ScaleMatch | null
}

export function CopyButtons ({
  selectedNotes,
  selectedScale,
  topScale
}: CopyButtonsProps) {
  const [toast, setToast] = useState<string | null>(null)
  const scale = selectedScale ?? topScale

  const showCopied = useCallback(() => {
    setToast('Copiado al portapapeles')
    const t = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(t)
  }, [])

  const copy = useCallback((text: string, show: boolean = true) => {
    navigator.clipboard.writeText(text)
    if (show) showCopied()
  }, [showCopied])

  const handleCopySummary = () => {
    copy(buildSummaryText(selectedNotes, scale))
  }

  const handleCopyDegrees = () => {
    if (!scale) return
    copy(buildDegreesText(scale))
  }

  const handleCopyProgressions = () => {
    if (!scale) return
    copy(buildProgressionsText(scale))
  }

  const handleCopyAll = () => {
    copy(buildFullExportText(selectedNotes, scale))
  }

  const handleExportJson = () => {
    const data = {
      notes: selectedNotes,
      topScale: scale
        ? {
            root: scale.root,
            scaleId: scale.scaleId,
            scaleNameEs: scale.scaleNameEs,
            scaleNameEn: scale.scaleNameEn,
            matchPercent: scale.matchPercent,
            coveragePercent: scale.coveragePercent
          }
        : null,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'music-io-export.json'
    a.click()
    URL.revokeObjectURL(url)
    showCopied()
  }

  const handleExportTxt = () => {
    const text = buildFullExportText(selectedNotes, scale)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'music-io-report.txt'
    a.click()
    URL.revokeObjectURL(url)
    showCopied()
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Copiar / Exportar
        </h2>
        {toast && (
          <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/50 dark:text-green-200">
            {toast}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
        <button
          type="button"
          onClick={handleCopySummary}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          Copiar resumen
        </button>
        <button
          type="button"
          onClick={handleCopyDegrees}
          disabled={!scale}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 disabled:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          Grados
        </button>
        <button
          type="button"
          onClick={handleCopyProgressions}
          disabled={!scale}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 disabled:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          Progresiones
        </button>
        <button
          type="button"
          onClick={handleCopyAll}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          Copiar todo
        </button>
        <button
          type="button"
          onClick={handleExportJson}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          JSON
        </button>
        <button
          type="button"
          onClick={handleExportTxt}
          className="min-h-[44px] rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 active:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:active:bg-slate-500 sm:py-1.5"
        >
          TXT
        </button>
      </div>
    </section>
  )
}
