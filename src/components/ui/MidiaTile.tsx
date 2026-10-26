import { useEffect, useRef, useState } from 'react'

import { IconePlay } from '@/components/ui/Icones'
import { LazyImage } from '@/components/ui/LazyImage'
import { useVisor } from '@/components/ui/Visor'
import type { Midia } from '@/lib/midia'
import { cn } from '@/lib/utils'

type MidiaTileProps = {
  lista: Midia[]
  indice: number
  className?: string
  /** Proporção fixa (ex.: "aspect-[4/5]"). Sem ela, a imagem segue a altura natural. */
  proporcao?: string
  /** Vídeos tocam mudos em loop enquanto estão na tela. */
  autoplay?: boolean
  mostrarLegenda?: boolean
}

/** Miniatura clicável de foto ou vídeo que abre o visor em tela cheia. */
export const MidiaTile = ({ lista, indice, className, proporcao, autoplay = true, mostrarLegenda = false }: MidiaTileProps) => {
  const item = lista[indice]
  const { abrir } = useVisor()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el || !autoplay) return
    const obs = new IntersectionObserver(([entrada]) => setVisivel(entrada.isIntersecting), { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [autoplay])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (visivel) el.play().catch(() => undefined)
    else el.pause()
  }, [visivel])

  return (
    <button
      type="button"
      onClick={() => abrir(lista, indice)}
      aria-label={`Ampliar: ${item.legenda}`}
      className={cn(
        'group relative block w-full overflow-hidden rounded-2xl bg-mar-800 text-left',
        proporcao,
        className,
      )}
      style={proporcao ? undefined : { aspectRatio: String(item.proporcao) }}
    >
      {item.tipo === 'video' ? (
        <video
          ref={videoRef}
          src={autoplay ? item.video : undefined}
          poster={item.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={cn(
            'h-full w-full object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]',
          )}
        />
      ) : (
        <LazyImage
          src={item.src}
          alt={item.legenda}
          wrapperClassName="h-full"
          className="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]"
        />
      )}

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mar-950/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

      {item.tipo === 'video' && (
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-mar-950/75 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-lona-50 backdrop-blur">
          <IconePlay className="h-3 w-3 text-sinal-400" /> Vídeo
        </span>
      )}

      {mostrarLegenda && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-sm font-medium leading-snug text-lona-50">
          {item.legenda}
        </span>
      )}
    </button>
  )
}
