import { cn } from '@/lib/utils'

/** Corda torcida em SVG — separador entre blocos. */
export const Corda = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 240 12" preserveAspectRatio="none" aria-hidden="true" className={cn('h-3 w-full', className)}>
    <defs>
      <pattern id="corda" width="12" height="12" patternUnits="userSpaceOnUse">
        <path d="M0 9 Q3 1 6 3 T12 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M0 3 Q3 11 6 9 T12 9" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      </pattern>
    </defs>
    <rect width="240" height="12" fill="url(#corda)" />
  </svg>
)

/** Linha d'água ondulada no rodapé de uma seção. */
export const LinhaDagua = ({ className, cor = 'currentColor' }: { className?: string; cor?: string }) => (
  <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 overflow-hidden', className)}>
    <svg viewBox="0 0 2400 60" preserveAspectRatio="none" className="h-full w-[200%] animate-mare" fill={cor}>
      <path d="M0 30 C 150 0 300 0 450 30 S 750 60 900 30 S 1200 0 1350 30 S 1650 60 1800 30 S 2100 0 2250 30 S 2400 45 2400 45 V60 H0Z" />
    </svg>
  </div>
)

type TituloSecaoProps = {
  kicker: string
  title: string
  text?: string
  claro?: boolean
  className?: string
  centro?: boolean
}

/** Cabeçalho padrão das seções: carimbo numerado + título serifado. */
export const TituloSecao = ({ kicker, title, text, claro = false, className, centro = false }: TituloSecaoProps) => (
  <div className={cn('max-w-2xl', centro && 'mx-auto text-center', className)}>
    <p className={cn('etiqueta flex items-center gap-3', centro && 'justify-center', claro ? 'text-latao-700' : 'text-latao-400')}>
      <span className={cn('h-px w-8', claro ? 'bg-latao-700/50' : 'bg-latao-400/50')} />
      {kicker}
    </p>
    <h2
      className={cn(
        'mt-4 font-display text-[2.1rem] font-medium leading-[1.08] tracking-tight sm:text-5xl',
        claro ? 'text-mar-900' : 'text-lona-50',
      )}
    >
      {title}
    </h2>
    {text && (
      <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', claro ? 'text-mar-900/70' : 'text-nevoa')}>{text}</p>
    )}
  </div>
)
