import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { IconePlay, IconeWhatsApp } from '@/components/ui/Icones'
import { MidiaTile } from '@/components/ui/MidiaTile'
import { Corda, TituloSecao } from '@/components/ui/Ornamentos'
import { Reveal } from '@/components/ui/Reveal'
import { modelos, type Modelo } from '@/data/modelos'
import { company } from '@/data/site'
import { midiasDa } from '@/lib/midia'
import { buildWhatsAppLink, cn } from '@/lib/utils'

const Galeria = ({ modelo }: { modelo: Modelo }) => {
  const lista = midiasDa(modelo.id)
  const [atual, setAtual] = useState(0)
  if (!lista.length) return null

  return (
    <div>
      <div className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={lista[atual].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <MidiaTile lista={lista} indice={atual} proporcao="h-full" className="rounded-3xl shadow-[0_30px_60px_-30px_rgba(11,22,40,0.55)]" />
          </motion.div>
        </AnimatePresence>
        {/* reserva a altura do palco */}
        <div className="aspect-[4/3]" />
        <span
          className={cn(
            'etiqueta pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.62rem]',
            modelo.acento === 'sinal' ? 'bg-sinal-500 text-white' : 'bg-latao-500 text-mar-900',
          )}
        >
          {modelo.tipo} · {modelo.comprimento}
        </span>
      </div>

      <ul className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label={`Fotos e vídeos da ${modelo.nome}`}>
        {lista.map((m, i) => (
          <li key={m.id} className="shrink-0">
            <button
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Mostrar: ${m.legenda}`}
              aria-pressed={i === atual}
              className={cn(
                'relative block h-16 w-20 overflow-hidden rounded-lg border-2 transition-all duration-300 sm:h-[4.5rem] sm:w-24',
                i === atual ? 'border-latao-500' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img src={m.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              {m.tipo === 'video' && (
                <span className="absolute inset-0 grid place-items-center bg-mar-950/35">
                  <IconePlay className="h-4 w-4 text-white" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CardModelo = ({ modelo, invertido }: { modelo: Modelo; invertido: boolean }) => {
  const mensagem = `Olá, Fluyr Boats! Vi a ${modelo.nome} (${modelo.tipo.toLowerCase()} de ${modelo.comprimento}) no site e quero saber mais.`

  return (
    <article id={modelo.id} className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
      <Reveal className={cn('min-w-0', invertido && 'lg:order-2')}>
        <Galeria modelo={modelo} />
      </Reveal>

      <Reveal delay={0.1} className={cn('min-w-0', invertido && 'lg:order-1')}>
        <p
          aria-hidden="true"
          className={cn(
            'font-display text-7xl font-semibold leading-none tracking-tighter sm:text-8xl',
            modelo.acento === 'sinal' ? 'text-sinal-500/90' : 'text-latao-600/90',
          )}
        >
          {modelo.registro}
        </p>
        <h3 className="mt-3 font-display text-4xl font-medium text-mar-900 sm:text-5xl">{modelo.nome}</h3>
        <p className="mt-3 font-display text-xl italic text-mar-900/70">{modelo.chamada}</p>
        <p className="mt-6 leading-relaxed text-mar-900/75">{modelo.descricao}</p>

        <div className="mt-8 rounded-2xl border border-mar-900/10 bg-white/60 p-5 sm:p-6">
          <p className="etiqueta text-latao-700">Ficha técnica</p>
          <dl className="mt-3 divide-y divide-dashed divide-mar-900/15">
            {modelo.ficha.map((f) => (
              <div key={f.item} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2.5 text-sm">
                <dt className="text-mar-900/60">{f.item}</dt>
                <dd className="font-semibold text-mar-900">{f.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {modelo.destaques.map((d) => (
            <li key={d} className="rounded-full border border-mar-900/15 px-3.5 py-1.5 text-xs font-semibold text-mar-900/80">
              {d}
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppLink(company.contact.whatsapp, mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-8 bg-mar-900 text-lona-50 hover:bg-mar-700"
        >
          <IconeWhatsApp className="h-4 w-4 text-[#25D366]" /> Quero a {modelo.nome}
        </a>
      </Reveal>
    </article>
  )
}

export const Frota = () => (
  <section id="frota" className="trama relative overflow-x-hidden py-24 text-mar-900 sm:py-32">
    <div className="container-bordo">
      <Reveal>
        <TituloSecao
          claro
          kicker="Nº 01 — A Frota"
          title="Dois cascos, um mesmo jeito de navegar."
          text="Cada modelo nasce no nosso estaleiro e pode ser ajustado ao seu jeito de usar a água. Toque nas miniaturas para ver fotos e vídeos reais de cada barco."
        />
      </Reveal>

      <div className="mt-16 space-y-24 sm:space-y-32">
        {modelos.map((m, i) => (
          <div key={m.id}>
            {i > 0 && <Corda className="mb-24 text-latao-600/35 sm:mb-32" />}
            <CardModelo modelo={m} invertido={i % 2 === 1} />
          </div>
        ))}
      </div>
    </div>
  </section>
)
