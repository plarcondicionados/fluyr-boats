/**
 * A frota da Fluyr Boats.
 * As fotos e vídeos de cada modelo vêm de organizacao-fotos.json (edite pelo organizador: `npm run organizar`).
 */

export type Modelo = {
  /** Mesmo id da seção no organizador de fotos. */
  id: 'fluyr-x' | 'fluyr-950'
  nome: string
  tipo: string
  comprimento: string
  /** Número grande exibido como "registro de casco". */
  registro: string
  chamada: string
  descricao: string
  ficha: { item: string; valor: string }[]
  destaques: string[]
  /** Cor de destaque do card (classe Tailwind). */
  acento: 'sinal' | 'latao'
}

export const modelos: Modelo[] = [
  {
    id: 'fluyr-x',
    nome: 'Fluyr X 850',
    tipo: 'Flutuante',
    comprimento: '8,5 m',
    registro: 'X·850',
    chamada: 'O flutuante que assina o próprio nome no céu.',
    descricao:
      'O grande X estrutural sustenta o toldo e vira assinatura: contornado por LED, ele acende ao entardecer e transforma o barco num ponto de encontro na represa. A bordo, bar com banquetas, convés amplo e o casco em azul-marinho com a faixa laranja sinalizadora.',
    ficha: [
      { item: 'Comprimento', valor: '8,5 m' },
      { item: 'Tipo', valor: 'Flutuante' },
      { item: 'Toldo', valor: 'Rígido, sustentado pelo X estrutural' },
      { item: 'Iluminação', valor: 'LED no X, no toldo e letreiro Fluyr' },
      { item: 'Capacidade', valor: 'Até 23 pessoas' },
      { item: 'Motorização', valor: 'Sob consulta' },
    ],
    destaques: ['Até 23 pessoas', 'X iluminado em LED', 'Bar com banquetas', 'Letreiro Fluyr Boats luminoso', 'Spots no forro do toldo'],
    acento: 'sinal',
  },
  {
    id: 'fluyr-950',
    nome: 'Fluyr 950',
    tipo: 'Pontoon',
    comprimento: '9,5 m',
    registro: '950',
    chamada: 'Uma sala de estar inteira flutuando.',
    descricao:
      'Nove metros e meio de convés para receber a turma com conforto: sofás em U, mesas, bar com garrafeiro, churrasqueira em inox e toldo bimini para o sol do meio-dia. O casco preto com guarda-corpo em inox dá o tom elegante da Fluyr 950.',
    ficha: [
      { item: 'Comprimento', valor: '9,5 m' },
      { item: 'Tipo', valor: 'Pontoon sobre flutuadores' },
      { item: 'Toldo', valor: 'Bimini em lona com armação' },
      { item: 'Convés', valor: 'Sofás em U, mesas, bar e churrasqueira' },
      { item: 'Capacidade', valor: 'Até 30 pessoas' },
      { item: 'Motorização', valor: 'Sob consulta' },
    ],
    destaques: ['Até 30 pessoas', 'Churrasqueira em inox', 'Bar com garrafeiro', 'Escada de popa para banho', 'Guarda-corpo em inox'],
    acento: 'latao',
  },
]
