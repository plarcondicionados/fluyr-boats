import { RosaDosVentos } from '@/components/ui/Icones'
import { Reveal } from '@/components/ui/Reveal'
import { about } from '@/data/site'

export const Sobre = () => (
  <section className="chapa relative overflow-hidden bg-mar-900 py-24 sm:py-32">
    <RosaDosVentos className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] text-latao-500/10 sm:-right-10" />

    <div className="container-bordo relative grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
      <Reveal>
        <p className="etiqueta flex items-center gap-3 text-latao-400">
          <span className="h-px w-8 bg-latao-400/50" />
          {about.kicker}
        </p>
        <h2 className="mt-5 max-w-xl font-display text-[2.1rem] font-medium leading-[1.08] tracking-tight text-lona-50 sm:text-5xl">
          {about.title}
        </h2>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-nevoa sm:text-lg">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-latao-500/20 bg-latao-500/20 sm:grid-cols-3 lg:grid-cols-1">
          {about.stats.map((s) => (
            <div key={s.label} className="bg-mar-900/95 p-6 sm:p-7">
              <dt className="etiqueta text-latao-400/90">{s.label}</dt>
              <dd className="mt-2 font-display text-5xl font-medium text-lona-50">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
)
