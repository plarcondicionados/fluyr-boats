import { AnimatePresence, motion } from 'framer-motion'

import { IconeInstagram, IconeWhatsApp } from '@/components/ui/Icones'
import { company } from '@/data/site'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { buildWhatsAppLink } from '@/lib/utils'

/** WhatsApp e Instagram flutuantes — aparecem assim que o visitante passa do hero. */
export const BotoesFlutuantes = () => {
  const visivel = useScrollPosition(420)
  const whatsapp = buildWhatsAppLink(company.contact.whatsapp, company.whatsappMessage)

  const botoes = [
    {
      href: company.contact.instagramUrl,
      rotulo: `Instagram @${company.contact.instagram}`,
      dica: 'Siga no Instagram',
      classe: 'bg-gradient-to-tr from-[#f9a03f] via-[#e1306c] to-[#833ab4] h-12 w-12',
      icone: <IconeInstagram className="h-6 w-6 text-white" />,
    },
    {
      href: whatsapp,
      rotulo: 'Falar com a Fluyr Boats no WhatsApp',
      dica: 'Fale no WhatsApp',
      classe: 'bg-[#25D366] h-14 w-14',
      icone: <IconeWhatsApp className="h-7 w-7 text-white" />,
    },
  ]

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-8 sm:right-8"
        >
          {botoes.map((b) => (
            <motion.a
              key={b.dica}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.rotulo}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`group relative grid place-items-center rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] ${b.classe}`}
            >
              {b.icone}
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-mar-950 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-lona-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
                {b.dica}
              </span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
