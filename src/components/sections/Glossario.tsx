import { IconeAncora } from '@/components/ui/Icones'
import { TituloSecao } from '@/components/ui/Ornamentos'
import { Reveal } from '@/components/ui/Reveal'
import { glossary } from '@/data/site'

export const Glossario = () => (
  <section id="glossario" className="trama relative py-24 text-mar-900 sm:py-32">
    <div className="container-bordo">
      <Reveal>
        <TituloSecao claro kicker={glossary.kicker} title={glossary.title} text={glossary.text} />
      </Reveal>

      <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-mar-900/10 bg-mar-900/10 sm:grid-cols-2 lg:grid-cols-3">
        {glossary.terms.map((t, i) => (
          <Reveal key={t.term} delay={(i % 3) * 0.06} className="group bg-lona-50 p-6 transition-colors duration-500 hover:bg-white sm:p-7">
            <dt className="flex items-center gap-3">
              <IconeAncora className="h-5 w-5 shrink-0 text-latao-600 transition-transform duration-500 group-hover:-rotate-12" />
              <span className="font-display text-2xl font-medium">{t.term}</span>
            </dt>
            <dd className="mt-3 text-sm leading-relaxed text-mar-900/70">{t.text}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  </section>
)
