import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ImgHTMLAttributes } from 'react'

import { IconeSeta, IconeWhatsApp } from '@/components/ui/Icones'
import { LinhaDagua } from '@/components/ui/Ornamentos'
import { company, hero } from '@/data/site'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { midiasDa } from '@/lib/midia'
import { buildWhatsAppLink } from '@/lib/utils'

const destaque = midiasDa('destaque')
/** O trecho do vídeo de abertura é gerado por `npm run videos` a partir do 1º vídeo do Destaque. */
const capaVideo = destaque.find((m) => m.tipo === 'video')
const capaFoto = destaque.find((m) => m.tipo === 'foto')

export const Hero = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const escala = useTransform(scrollYProgress, [0, 1], [1.04, 1.14])
  const opacidade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const prioridade = { fetchpriority: 'high' } as ImgHTMLAttributes<HTMLImageElement>

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden bg-mar-950">
      <motion.div style={{ y, scale: escala }} className="absolute inset-0">
        {capaVideo ? (
          <video
            src={`${import.meta.env.BASE_URL}videos/hero.mp4`}
            poster={`${import.meta.env.BASE_URL}videos/hero.jpg`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          capaFoto && <img src={capaFoto.src} alt="" {...prioridade} className="h-full w-full object-cover" />
        )}
      </motion.div>

      {/* véus para leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-mar-950 via-mar-950/45 to-mar-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-mar-950/75 via-mar-950/20 to-transparent" />

      <motion.div style={{ opacity: opacidade }} className="container-bordo relative z-10 pb-28 pt-36 sm:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="etiqueta flex flex-wrap items-center gap-x-4 gap-y-2 text-latao-300"
        >
          <span className="h-px w-10 bg-latao-300/60" />
          {hero.kicker}
          <span className="text-lona-100/50">{company.coordinates}</span>
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[2.7rem] font-medium leading-[1.02] tracking-tight text-lona-50 sm:text-7xl lg:text-[5.6rem]">
          {hero.title.map((linha, i) => (
            <motion.span
              key={linha}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={i === 1 ? 'block italic text-latao-300' : 'block'}
            >
              {linha}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-lona-100/85 sm:text-lg"
        >
          {hero.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#frota"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#frota')
            }}
            className="btn-latao"
          >
            {hero.primaryCta} <IconeSeta className="h-4 w-4" />
          </a>
          <a
            href={buildWhatsAppLink(company.contact.whatsapp, company.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-contorno"
          >
            <IconeWhatsApp className="h-4 w-4 text-[#25D366]" /> {hero.secondaryCta}
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 sm:flex lg:right-10">
        <span className="etiqueta text-[0.6rem] text-lona-100/60 [writing-mode:vertical-rl]">Role para zarpar</span>
        <span className="h-12 w-px animate-boia bg-gradient-to-b from-latao-300 to-transparent" />
      </div>

      <LinhaDagua className="bottom-0 h-6 text-mar-900" />
    </section>
  )
}
