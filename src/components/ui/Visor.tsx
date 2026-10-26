import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import type { Midia } from '@/lib/midia'

type VisorContexto = { abrir: (lista: Midia[], indice: number) => void }

const Contexto = createContext<VisorContexto | null>(null)

export const useVisor = (): VisorContexto => {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useVisor precisa estar dentro de <VisorProvider>.')
  return ctx
}

/** Visor em tela cheia para fotos e vídeos, com navegação por setas e teclado. */
export const VisorProvider = ({ children }: { children: ReactNode }) => {
  const { setScrollLocked } = useSmoothScroll()
  const [lista, setLista] = useState<Midia[]>([])
  const [indice, setIndice] = useState(-1)
  const aberto = indice >= 0

  const abrir = useCallback((l: Midia[], i: number) => {
    setLista(l)
    setIndice(i)
  }, [])

  const fechar = useCallback(() => setIndice(-1), [])
  const passo = useCallback(
    (d: number) => setIndice((i) => (lista.length ? (i + d + lista.length) % lista.length : -1)),
    [lista.length],
  )

  useEffect(() => {
    setScrollLocked(aberto)
    if (!aberto) return
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar()
      if (e.key === 'ArrowRight') passo(1)
      if (e.key === 'ArrowLeft') passo(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [aberto, fechar, passo, setScrollLocked])

  const valor = useMemo(() => ({ abrir }), [abrir])
  const atual = aberto ? lista[indice] : null

  return (
    <Contexto.Provider value={valor}>
      {children}
      <AnimatePresence>
        {atual && (
          <motion.div
            key="visor"
            role="dialog"
            aria-modal="true"
            aria-label={atual.legenda}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-mar-950/95 backdrop-blur-sm"
            onClick={fechar}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="etiqueta text-latao-300">
                {String(indice + 1).padStart(2, '0')} / {String(lista.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={fechar}
                className="rounded-full border border-lona-100/25 px-4 py-2 text-sm text-lona-50 transition-colors hover:border-latao-300 hover:text-latao-200"
              >
                Fechar ✕
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              <motion.div
                key={atual.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full max-h-full w-full items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {atual.tipo === 'video' ? (
                  <video
                    src={atual.video}
                    poster={atual.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[78vh] max-w-full rounded-xl bg-black"
                  />
                ) : (
                  <img src={atual.src} alt={atual.legenda} className="max-h-[78vh] max-w-full rounded-xl object-contain" />
                )}
              </motion.div>

              {lista.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Anterior"
                    onClick={(e) => {
                      e.stopPropagation()
                      passo(-1)
                    }}
                    className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-mar-800/90 text-xl text-lona-50 transition-colors hover:bg-latao-500 hover:text-mar-900 sm:left-4"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima"
                    onClick={(e) => {
                      e.stopPropagation()
                      passo(1)
                    }}
                    className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-mar-800/90 text-xl text-lona-50 transition-colors hover:bg-latao-500 hover:text-mar-900 sm:right-4"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <p className="px-4 pb-6 pt-3 text-center font-display text-lg italic text-lona-100/90">{atual.legenda}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Contexto.Provider>
  )
}
