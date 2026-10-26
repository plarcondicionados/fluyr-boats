import { MidiaTile } from '@/components/ui/MidiaTile'
import { TituloSecao } from '@/components/ui/Ornamentos'
import { Reveal } from '@/components/ui/Reveal'
import { midiasDa } from '@/lib/midia'
import { cn } from '@/lib/utils'

const lista = midiasDa('acessorios')

/** Grade em "mosaico": alguns itens ocupam duas linhas para quebrar a monotonia. */
const altos = new Set([0, 3, 6])

export const Conves = () => (
  <section id="conves" className="chapa relative bg-mar-900 py-24 sm:py-32">
    <div className="container-bordo">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <TituloSecao
            kicker="Nº 02 — Convés & acessórios"
            title="O que vai a bordo é você quem escolhe."
            text="Bar em acrílico com porta-copos iluminados, cooler embutido, churrasqueira em inox, garrafeiro, sofás náuticos e o console com timão. Peças feitas para a vida na água."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="etiqueta max-w-xs text-nevoa lg:text-right">Toque em qualquer item para ampliar · vídeos tocam sozinhos</p>
        </Reveal>
      </div>

      <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-4">
        {lista.map((m, i) => (
          <Reveal key={m.id} delay={(i % 4) * 0.06} className={cn(altos.has(i) && 'row-span-2')}>
            <MidiaTile lista={lista} indice={i} proporcao="h-full" mostrarLegenda />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
