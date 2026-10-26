import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import logo from '@/assets/marca/logo-fluyr-clara.webp'
import { IconeInstagram, IconeWhatsApp } from '@/components/ui/Icones'
import { company, navItems, trackedSections } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { buildWhatsAppLink, cn } from '@/lib/utils'

export const Header = () => {
  const condensado = useScrollPosition(40)
  const ativo = useActiveSection(trackedSections)
  const { scrollTo, setScrollLocked } = useSmoothScroll()
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    setScrollLocked(menuAberto)
  }, [menuAberto, setScrollLocked])

  const ir = (id: string) => {
    // destrava já: o Lenis ignora scrollTo enquanto a rolagem está parada pelo menu
    setScrollLocked(false)
    setMenuAberto(false)
    scrollTo(`#${id}`)
  }

  const whatsapp = buildWhatsAppLink(company.contact.whatsapp, company.whatsappMessage)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe',
          condensado || menuAberto
            ? 'border-b border-latao-500/15 bg-mar-900/90 py-2 backdrop-blur-md'
            : 'bg-gradient-to-b from-mar-950/70 to-transparent py-4',
        )}
      >
        <div className="container-bordo flex items-center justify-between gap-6">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault()
              ir('inicio')
            }}
            className="shrink-0"
            aria-label="Fluyr Boats — voltar ao início"
          >
            <img
              src={logo}
              alt="Fluyr Boats by Voa Menina"
              width={640}
              height={381}
              className={cn('w-auto transition-all duration-700 ease-luxe', condensado ? 'h-11' : 'h-14 sm:h-16')}
            />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      ir(item.id)
                    }}
                    aria-current={ativo === item.id ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                      ativo === item.id ? 'text-latao-300' : 'text-lona-100/80 hover:text-lona-50',
                    )}
                  >
                    {item.label}
                    {ativo === item.id && (
                      <motion.span
                        layoutId="nav-ativo"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-latao-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Fluyr Boats"
              className="hidden h-10 w-10 place-items-center rounded-full border border-lona-100/20 text-lona-50 transition-colors hover:border-latao-300 hover:text-latao-300 sm:grid"
            >
              <IconeInstagram className="h-[18px] w-[18px]" />
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-latao hidden px-5 py-2.5 sm:inline-flex">
              <IconeWhatsApp className="h-4 w-4" /> WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuAberto((v) => !v)}
              aria-expanded={menuAberto}
              aria-controls="menu-mobile"
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-lona-100/25 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={cn('absolute left-0 top-0 h-px w-5 bg-lona-50 transition-all duration-500', menuAberto && 'top-1.5 rotate-45')} />
                <span className={cn('absolute bottom-0 left-0 h-px w-5 bg-lona-50 transition-all duration-500', menuAberto && 'bottom-1.5 -rotate-45')} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o backdrop-blur dele viraria o contêiner do painel fixo */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            id="menu-mobile"
            data-lenis-prevent
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="chapa fixed inset-x-0 bottom-0 top-[60px] z-40 overflow-y-auto bg-mar-900 lg:hidden"
          >
            <nav aria-label="Menu" className="container-bordo flex min-h-full flex-col justify-between gap-10 py-10">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.5 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        ir(item.id)
                      }}
                      className="flex items-baseline gap-4 border-b border-lona-100/10 py-4"
                    >
                      <span className="etiqueta text-latao-400">{String(i + 1).padStart(2, '0')}</span>
                      <span className={cn('font-display text-3xl', ativo === item.id ? 'text-latao-300' : 'text-lona-50')}>
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-latao">
                  <IconeWhatsApp className="h-4 w-4" /> {company.contact.whatsappDisplay}
                </a>
                <a href={company.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-contorno">
                  <IconeInstagram className="h-4 w-4" /> @{company.contact.instagram}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
