import { MidiaTile } from '@/components/ui/MidiaTile'
import { TituloSecao } from '@/components/ui/Ornamentos'
import { Reveal } from '@/components/ui/Reveal'
import { process } from '@/data/site'
import { midiasDa } from '@/lib/midia'

const bastidores = midiasDa('estaleiro')

export const Estaleiro = () => (
  <section id="estaleiro" className="trama relative overflow-hidden py-24 text-mar-900 sm:py-32">
    <div className="container-bordo">
      <Reveal>
        <TituloSecao claro kicker={process.kicker} title={process.title} text={process.text} />
      </Reveal>

      {/* Etapas como uma "carta de navegação": linha pontilhada ligando os pontos */}
      <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
        <span
          aria-hidden="true"
          className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-px border-l border-dashed border-latao-600/50 md:left-0 md:top-[11px] md:h-px md:w-full md:border-l-0 md:border-t"
        />
        {process.steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 0.08} className="relative pl-10 md:pl-0 md:pt-10">
            <span className="absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full border border-latao-600 bg-lona-100 md:left-0">
              <span className="h-2 w-2 rounded-full bg-sinal-500" />
            </span>
            <p className="etiqueta text-latao-700">
              {s.n} · {s.term}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mar-900/70">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>

    {bastidores.length > 0 && (
      <div className="mt-20">
        <div className="container-bordo flex items-end justify-between gap-6">
          <p className="etiqueta text-latao-700">Bastidores do estaleiro</p>
          <p className="etiqueta hidden text-mar-900/50 sm:block">Arraste para o lado →</p>
        </div>
        <ul
          className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-10"
          aria-label="Fotos e vídeos dos bastidores do estaleiro"
        >
          {bastidores.map((m, i) => (
            <li key={m.id} className="w-[62vw] shrink-0 snap-start sm:w-[300px]">
              <MidiaTile lista={bastidores} indice={i} proporcao="aspect-[3/4]" mostrarLegenda />
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
)
