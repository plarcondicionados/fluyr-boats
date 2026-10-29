import dimensoes from '@/data/dimensoes.json'
import organizacao from '@/data/organizacao-fotos.json'
import { legendas } from '@/data/legendas'

/** Uma foto ou vídeo do acervo, já com os caminhos prontos para o navegador. */
export type Midia = {
  id: string
  tipo: 'foto' | 'video'
  /** Foto: a própria imagem. Vídeo: o quadro usado como capa. */
  src: string
  video?: string
  legenda: string
  /** Largura/altura, para reservar o espaço antes de carregar (evita a página "crescer" durante a rolagem). */
  proporcao: number
}

export type SecaoMidia = 'destaque' | 'fluyr-x' | 'fluyr-950' | 'acessorios' | 'estaleiro' | 'galeria'

const fotos = import.meta.glob<string>('../assets/fotos/*.webp', { eager: true, import: 'default' })

/** Vídeos ficam em public/videos; BASE_URL ("./") mantém o caminho relativo à página. */
const VIDEOS = `${import.meta.env.BASE_URL}videos`

const urlDaFoto = (id: string): string | undefined => fotos[`../assets/fotos/${id}.webp`]

export const midia = (id: string): Midia | null => {
  const legenda = legendas[id] ?? 'Fluyr Boats'
  const [w, h] = (dimensoes as Record<string, number[]>)[id] ?? [3, 4]
  const proporcao = w / h

  if (id.startsWith('video-')) {
    return { id, tipo: 'video', src: `${VIDEOS}/${id}.jpg`, video: `${VIDEOS}/${id}.mp4`, legenda, proporcao }
  }

  const src = urlDaFoto(id)
  return src ? { id, tipo: 'foto', src, legenda, proporcao } : null
}

/** Itens de uma seção, na ordem definida no organizador. */
export const midiasDa = (secao: SecaoMidia): Midia[] => {
  const ids = (organizacao.secoes as Record<string, string[]>)[secao] ?? []
  return ids.map(midia).filter((m): m is Midia => m !== null)
}
