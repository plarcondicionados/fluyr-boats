type IconProps = { className?: string }

export const IconeWhatsApp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.94 11.94 0 005.71 1.454h.006c6.585 0 11.946-5.36 11.949-11.945a11.86 11.86 0 00-3.48-8.408" />
  </svg>
)

export const IconeInstagram = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const IconeAncora = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 6.5V21M8 10h8M4 14c1 4 4 7 8 7s7-3 8-7M2.5 15.5 4 13.5l2 2M21.5 15.5 20 13.5l-2 2" />
  </svg>
)

export const IconeSeta = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconePlay = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
)

export const IconeMapa = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

/** Rosa dos ventos — motivo decorativo. */
export const RosaDosVentos = ({ className }: IconProps) => (
  <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none" stroke="currentColor">
    <circle cx="100" cy="100" r="96" strokeWidth="1" />
    <circle cx="100" cy="100" r="78" strokeWidth="0.6" strokeDasharray="2 4" />
    <circle cx="100" cy="100" r="40" strokeWidth="0.8" />
    {Array.from({ length: 72 }, (_, i) => {
      const a = (i * 5 * Math.PI) / 180
      const r1 = i % 6 === 0 ? 84 : 89
      return (
        <line
          key={i}
          x1={100 + Math.sin(a) * r1}
          y1={100 - Math.cos(a) * r1}
          x2={100 + Math.sin(a) * 95}
          y2={100 - Math.cos(a) * 95}
          strokeWidth="0.8"
        />
      )
    })}
    <path d="M100 18 112 100 100 182 88 100Z" fill="currentColor" fillOpacity="0.18" strokeWidth="1" />
    <path d="M18 100 100 88 182 100 100 112Z" fill="currentColor" fillOpacity="0.08" strokeWidth="1" />
    <path d="M100 18 112 100 100 100Z" fill="currentColor" fillOpacity="0.6" stroke="none" />
    <text x="100" y="12" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" fontFamily="JetBrains Mono, monospace">N</text>
  </svg>
)
