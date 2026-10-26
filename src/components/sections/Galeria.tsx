import { useMemo, useState } from 'react'

import { MidiaTile } from '@/components/ui/MidiaTile'
import { TituloSecao } from '@/components/ui/Ornamentos'
import { Reveal } from '@/components/ui/Reveal'
import { midiasDa, type Midia } from '@/lib/midia'
import { cn } from '@/lib/utils'

/** A galeria reúne tudo o que foi organizado para o site, com filtros por assunto. */
const filtros: { id: string; rotulo: string; itens: Midia[] }[] = [
  { id: 'fluyr-x', rotulo: 'Fluyr X 850', itens: midiasDa('fluyr-x') },
  { id: 'fluyr-950', rotulo: 'Fluyr 950', itens: midiasDa('fluyr-950') },
  { id: 'acessorios', rotulo: 'Convés', itens: midiasDa('acessorios') },
  { id: 'estaleiro', rotulo: 'Estaleiro', itens: midiasDa('estaleiro') },
  { id: 'galeria', rotulo: 'Extras', itens: midiasDa('galeria') },
]

const todos = filtros.flatMap((f) => f.itens)

export const Galeria = () => {
  const [ativo, setAtivo] = useState('todos')
  const [tipo, setTipo] = useState<'tudo' | 'foto' | 'video'>('tudo')

  const lista = useMemo(() => {
    const base = ativo === 'todos' ? todos : (filtros.find((f) => f.id === ativo)?.itens ?? [])
    return tipo === 'tudo' ? base : base.filter((m) => m.tipo === tipo)
  }, [ativo, tipo])

  const botao = (selecionado: boolean) =>
    cn(
      'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
      selecionado ? 'border-latao-400 bg-latao-500 text-mar-900' : 'border-lona-100/20 text-lona-100/80 hover:border-latao-300 hover:text-latao-200',
    )

  return (
    <section id="galeria" className="chapa relative bg-mar-900 py-24 sm:py-32">
      <div className="container-bordo">
        <Reveal>
          <TituloSecao
            kicker="Nº 04 — Galeria"
            title="Fotos de verdade, do galpão à represa."
            text="Nada de imagem de catálogo: tudo aqui foi registrado no nosso estaleiro e na água, com os barcos que construímos."
          />
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por assunto">
            <button type="button" aria-pressed={ativo === 'todos'} onClick={() => setAtivo('todos')} className={botao(ativo === 'todos')}>
              Tudo <span className="ml-1 opacity-60">{todos.length}</span>
            </button>
            {filtros
              .filter((f) => f.itens.length)
              .map((f) => (
                <button key={f.id} type="button" aria-pressed={ativo === f.id} onClick={() => setAtivo(f.id)} className={botao(ativo === f.id)}>
                  {f.rotulo} <span className="ml-1 opacity-60">{f.itens.length}</span>
                </button>
              ))}
          </div>
          <div className="flex gap-2" role="group" aria-label="Filtrar por tipo">
            {(['tudo', 'foto', 'video'] as const).map((t) => (
              <button key={t} type="button" aria-pressed={tipo === t} onClick={() => setTipo(t)} className={botao(tipo === t)}>
                {t === 'tudo' ? 'Fotos e vídeos' : t === 'foto' ? 'Fotos' : 'Vídeos'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {lista.map((m, i) => (
            <div key={`${ativo}-${tipo}-${m.id}`} className="mb-3 break-inside-avoid sm:mb-4">
              <MidiaTile lista={lista} indice={i} autoplay={false} />
            </div>
          ))}
        </div>
        {!lista.length && <p className="mt-10 text-nevoa">Nenhum item neste filtro.</p>}
      </div>
    </section>
  )
}
