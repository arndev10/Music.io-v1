import { useState } from 'react'
import { toRoman } from '../music/romanNumerals'
import { getDegreeNameEs, getHarmonicFunction } from '../music/degreeNames'
import { getLearningContent } from '../music/learningContent'
import { getDiatonicChords } from '../music/diatonicChords'
import { generateProgressions } from '../music/progressions'
import { getNoteNameEs } from '../music/noteUtils'
import { ScalePiano } from './ScalePiano'
import type { ScaleMatch, HarmonicFunctions } from '../types/music'

interface ScaleDetailProps {
  match: ScaleMatch | null
  inputNotes: import('../types/music').NoteName[]
}

function buildDegreeRows (match: ScaleMatch): { degree: number; roman: string; note: string; nameEs: string; functionLabel: string | null }[] {
  const notes = match.scaleNotes
  return notes.map((note, i) => {
    const degree = i + 1
    const fn = getHarmonicFunction(degree)
    return {
      degree,
      roman: toRoman(degree),
      note,
      nameEs: getDegreeNameEs(degree),
      functionLabel: fn ? (fn === 'tonic' ? 'Tónica' : fn === 'subdominant' ? 'Subdominante' : 'Dominante') : null
    }
  })
}

function getHarmonicFunctionsFromMatch (match: ScaleMatch): HarmonicFunctions {
  const notes = match.scaleNotes
  return {
    tonic: notes[0] ?? match.root,
    subdominant: notes[3] ?? match.root,
    dominant: notes[4] ?? match.root
  }
}

function Collapsible ({
  title,
  open: initialOpen,
  children
}: { title: string; open?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(initialOpen ?? false)
  return (
    <div className="border-b border-slate-200 last:border-b-0 dark:border-slate-600">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[48px] w-full items-center justify-between py-3 text-left text-sm font-medium text-slate-700 active:bg-slate-50 dark:text-slate-300 dark:active:bg-slate-700/30 sm:py-2"
      >
        {title}
        <span className="text-slate-400">{open ? '▼' : '▶'}</span>
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  )
}

export function ScaleDetail ({ match, inputNotes }: ScaleDetailProps) {
  if (!match) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selecciona una escala del Top 3 para ver grados, acordes y progresiones.
        </p>
      </section>
    )
  }

  const rows = buildDegreeRows(match)
  const functions = getHarmonicFunctionsFromMatch(match)
  const learning = getLearningContent(match.scaleId)
  const chords = getDiatonicChords(match.scaleNotes)
  const progressions = generateProgressions(match)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-4">
      <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400 sm:mb-3">
        Detalle: {getNoteNameEs(match.root)} {match.scaleNameEs}
      </h2>

      <Collapsible title="Tabla de grados" open>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-600">
                <th className="py-2 text-left font-medium">Grado</th>
                <th className="py-2 text-left font-medium">Nota</th>
                <th className="py-2 text-left font-medium">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.degree} className="border-b border-slate-100 dark:border-slate-700">
                  <td className="py-1.5">
                    {r.roman}
                    {r.functionLabel && (
                      <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                        ({r.functionLabel})
                      </span>
                    )}
                  </td>
                  <td className="py-1.5">{r.note}</td>
                  <td className="py-1.5">{r.nameEs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Collapsible>

      <Collapsible title="Funciones armónicas" open>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
          <p className="text-sm">
            Tónica: {functions.tonic} · Subdominante: {functions.subdominant} · Dominante: {functions.dominant}
          </p>
        </div>
      </Collapsible>

      <Collapsible title="Piano" open>
        <ScalePiano
          scaleNotes={match.scaleNotes}
          tonic={match.root}
          inputNotes={inputNotes}
        />
      </Collapsible>

      <Collapsible title="Acordes diatónicos">
        <div className="space-y-2">
          {chords.map((c) => (
            <div
              key={c.degree}
              className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm dark:border-slate-600 dark:bg-slate-700/30"
            >
              <span className="font-medium">{c.degreeRoman}:</span>{' '}
              {c.triadName} / {c.seventhName}
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {c.notesSeventh.join(' ')}
              </p>
            </div>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="Progresiones sugeridas" open>
        {inputNotes.length > 0 && (
          <p className="mb-2 text-xs text-slate-600 dark:text-slate-400">
            Tu secuencia: {inputNotes.join(' → ')}
          </p>
        )}
        <div className="space-y-2">
          {progressions.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Esta escala tiene menos de 5 grados; no hay progresiones predefinidas.
            </p>
          ) : progressions.map((p) => {
            const line = `${p.name}: ${p.degrees.join('–')} => ${p.chords.join('–')}`
            return (
              <div
                key={p.name}
                className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm dark:border-slate-600 dark:bg-slate-700/30"
              >
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {p.degrees.join('–')} ⇒ {p.chords.join('–')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(line)}
                  className="shrink-0 rounded bg-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500"
                >
                  Copiar progresión
                </button>
              </div>
            )
          })}
        </div>
      </Collapsible>

      <Collapsible title="Panel aprendizaje">
        <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-800">
          <p className="text-sm"><strong>Fórmula:</strong> {learning.formula}</p>
          <p className="mt-1 text-sm"><strong>Intervalos:</strong> {learning.intervals}</p>
          <p className="mt-1 text-sm"><strong>Vibe:</strong> {learning.vibe}</p>
          <p className="mt-1 text-sm"><strong>Género típico:</strong> {learning.genre}</p>
        </div>
      </Collapsible>
    </section>
  )
}
