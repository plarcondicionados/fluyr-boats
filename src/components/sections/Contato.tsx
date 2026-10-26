import { useState, type FormEvent } from 'react'

import { IconeInstagram, IconeMapa, IconeWhatsApp } from '@/components/ui/Icones'
import { TituloSecao } from '@/components/ui/Ornamentos'
import { Reveal } from '@/components/ui/Reveal'
import { company, contactCopy, mapsEmbedUrl, mapsRouteUrl, modelOptions, useOptions } from '@/data/site'
import { buildWhatsAppLink, cn } from '@/lib/utils'

type Campos = {
  nome: string
  telefone: string
  modelo: string
  uso: string
  local: string
  cidade: string
  detalhes: string
}

const vazio: Campos = { nome: '', telefone: '', modelo: '', uso: '', local: '', cidade: '', detalhes: '' }

/** Máscara de telefone brasileiro: (16) 99999-9999 */
const mascaraTelefone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Monta a mensagem do WhatsApp (negrito com asteriscos; campos opcionais vazios são omitidos). */
export const montarMensagem = (c: Campos) => {
  const dados = [
    `*Nome:* ${c.nome.trim()}`,
    `*Telefone:* ${c.telefone}`,
    `*Modelo de interesse:* ${c.modelo}`,
    c.uso && `*Uso principal:* ${c.uso}`,
    c.local.trim() && `*Onde vai navegar:* ${c.local.trim()}`,
    c.cidade.trim() && `*Cidade/UF:* ${c.cidade.trim()}`,
  ].filter(Boolean)

  const detalhes = c.detalhes.trim() ? ['', '*Detalhes:*', c.detalhes.trim()] : []
  return ['*Pedido — site Fluyr Boats*', '', ...dados, ...detalhes].join('\n')
}

export const Contato = () => {
  const [campos, setCampos] = useState<Campos>(vazio)
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({})
  const [enviado, setEnviado] = useState(false)

  const set = (k: keyof Campos) => (v: string) => {
    setCampos((c) => ({ ...c, [k]: k === 'telefone' ? mascaraTelefone(v) : v }))
    setErros((e) => ({ ...e, [k]: undefined }))
  }

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const novos: typeof erros = {}
    if (campos.nome.trim().length < 2) novos.nome = 'Conte como podemos te chamar.'
    if (campos.telefone.replace(/\D/g, '').length < 10) novos.telefone = 'Informe um telefone com DDD.'
    if (!campos.modelo) novos.modelo = 'Escolha uma opção.'
    setErros(novos)
    if (Object.keys(novos).length) return

    window.open(buildWhatsAppLink(company.contact.whatsapp, montarMensagem(campos)), '_blank', 'noopener,noreferrer')
    setEnviado(true)
  }

  const rotulo = 'mb-1.5 block text-sm font-semibold text-mar-900'
  const erro = (k: keyof Campos) =>
    erros[k] && (
      <p id={`erro-${k}`} className="mt-1.5 text-xs font-semibold text-sinal-600">
        {erros[k]}
      </p>
    )

  return (
    <section id="contato" className="relative overflow-hidden bg-lona-100 text-mar-900">
      <div className="trama py-24 sm:py-32">
        <div className="container-bordo grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <TituloSecao claro kicker={contactCopy.kicker} title={contactCopy.title} text={contactCopy.text} />

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a
                href={buildWhatsAppLink(company.contact.whatsapp, company.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-mar-900/10 bg-white/70 p-4 transition-colors hover:border-[#25D366]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
                  <IconeWhatsApp className="h-6 w-6" />
                </span>
                <span>
                  <span className="etiqueta block text-[0.6rem] text-mar-900/50">WhatsApp</span>
                  <span className="font-semibold">{company.contact.whatsappDisplay}</span>
                </span>
              </a>
              <a
                href={company.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-mar-900/10 bg-white/70 p-4 transition-colors hover:border-[#e1306c]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#f9a03f] via-[#e1306c] to-[#833ab4] text-white">
                  <IconeInstagram className="h-6 w-6" />
                </span>
                <span>
                  <span className="etiqueta block text-[0.6rem] text-mar-900/50">Instagram</span>
                  <span className="font-semibold">@{company.contact.instagram}</span>
                </span>
              </a>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-mar-900/10 bg-white/70">
              <iframe
                title={`Mapa: ${company.address.street}, ${company.address.city}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full grayscale-[35%]"
              />
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-3">
                  <IconeMapa className="mt-0.5 h-5 w-5 shrink-0 text-latao-600" />
                  <span>
                    <span className="etiqueta block text-[0.6rem] text-mar-900/50">Estaleiro</span>
                    <span className="font-semibold">{company.address.street}</span>
                    <br />
                    <span className="text-sm text-mar-900/70">{company.address.city}</span>
                  </span>
                </p>
                <a href={mapsRouteUrl} target="_blank" rel="noopener noreferrer" className="btn-contorno-escuro shrink-0 px-5 py-2.5">
                  Traçar rota
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={enviar}
              noValidate
              className="rounded-3xl border border-mar-900/10 bg-white/80 p-6 shadow-[0_40px_80px_-50px_rgba(11,22,40,0.5)] sm:p-9"
            >
              <p className="etiqueta text-latao-700">Plano de navegação</p>
              <h3 className="mt-2 font-display text-3xl font-medium">Conte o barco dos seus sonhos</h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className={rotulo}>
                    Seu nome *
                  </label>
                  <input
                    id="nome"
                    autoComplete="name"
                    value={campos.nome}
                    onChange={(e) => set('nome')(e.target.value)}
                    aria-invalid={!!erros.nome}
                    aria-describedby={erros.nome ? 'erro-nome' : undefined}
                    className={cn('campo', erros.nome && 'border-sinal-500')}
                    placeholder="Como podemos te chamar?"
                  />
                  {erro('nome')}
                </div>
                <div>
                  <label htmlFor="telefone" className={rotulo}>
                    WhatsApp / telefone *
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={campos.telefone}
                    onChange={(e) => set('telefone')(e.target.value)}
                    aria-invalid={!!erros.telefone}
                    aria-describedby={erros.telefone ? 'erro-telefone' : undefined}
                    className={cn('campo', erros.telefone && 'border-sinal-500')}
                    placeholder="(16) 99999-9999"
                  />
                  {erro('telefone')}
                </div>
                <div>
                  <label htmlFor="modelo" className={rotulo}>
                    Modelo de interesse *
                  </label>
                  <select
                    id="modelo"
                    value={campos.modelo}
                    onChange={(e) => set('modelo')(e.target.value)}
                    aria-invalid={!!erros.modelo}
                    aria-describedby={erros.modelo ? 'erro-modelo' : undefined}
                    className={cn('campo', erros.modelo && 'border-sinal-500', !campos.modelo && 'text-mar-900/45')}
                  >
                    <option value="">Escolha…</option>
                    {modelOptions.map((o) => (
                      <option key={o} value={o} className="text-mar-900">
                        {o}
                      </option>
                    ))}
                  </select>
                  {erro('modelo')}
                </div>
                <div>
                  <label htmlFor="uso" className={rotulo}>
                    Uso principal
                  </label>
                  <select
                    id="uso"
                    value={campos.uso}
                    onChange={(e) => set('uso')(e.target.value)}
                    className={cn('campo', !campos.uso && 'text-mar-900/45')}
                  >
                    <option value="">Opcional</option>
                    {useOptions.map((o) => (
                      <option key={o} value={o} className="text-mar-900">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cidade" className={rotulo}>
                    Cidade / UF
                  </label>
                  <input
                    id="cidade"
                    autoComplete="address-level2"
                    value={campos.cidade}
                    onChange={(e) => set('cidade')(e.target.value)}
                    className="campo"
                    placeholder="Ex.: Ribeirão Preto/SP"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="local" className={rotulo}>
                    Onde pretende navegar?
                  </label>
                  <input
                    id="local"
                    value={campos.local}
                    onChange={(e) => set('local')(e.target.value)}
                    className="campo"
                    placeholder="Represa, rio ou lago — opcional"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="detalhes" className={rotulo}>
                    Detalhes
                  </label>
                  <textarea
                    id="detalhes"
                    rows={4}
                    value={campos.detalhes}
                    onChange={(e) => set('detalhes')(e.target.value)}
                    className="campo resize-y"
                    placeholder="Quantas pessoas a bordo, acessórios que você quer (bar, churrasqueira, som…), prazo…"
                  />
                </div>
              </div>

              <button type="submit" className="btn mt-8 w-full bg-[#25D366] text-base text-white hover:bg-[#1ebe5b] sm:w-auto">
                <IconeWhatsApp className="h-5 w-5" /> Enviar pelo WhatsApp
              </button>
              <p className="mt-4 text-xs leading-relaxed text-mar-900/55">{contactCopy.note}</p>
              {enviado && (
                <p role="status" className="mt-4 rounded-xl bg-lona-200/70 p-3 text-sm text-mar-900">
                  Abrimos o WhatsApp com a sua mensagem pronta. É só tocar em <b>enviar</b> por lá. ⚓
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
