/**
 * Dados da empresa e textos gerais do site.
 * Edite aqui telefone, Instagram, endereço e mensagens — os componentes leem tudo deste arquivo.
 */

export const company = {
  name: 'Fluyr Boats',
  signature: 'by Voa Menina',
  tagline: 'Chalanas e pontoons feitos sob medida',
  city: 'Ribeirão Preto',
  state: 'SP',
  /** Coordenadas aproximadas de Ribeirão Preto — usadas como "posição" decorativa no diário de bordo. */
  coordinates: '21°10′S · 47°48′O',
  contact: {
    whatsapp: '5516997153724',
    whatsappDisplay: '(16) 99715-3724',
    instagram: 'fluyrboats',
    instagramUrl: 'https://instagram.com/fluyrboats',
  },
  address: {
    street: 'Rua João Guião, 133',
    city: 'Ribeirão Preto — SP',
    mapsQuery: 'Rua João Guião, 133, Ribeirão Preto - SP',
  },
  whatsappMessage: 'Olá, Fluyr Boats! Vim pelo site e quero saber mais sobre as embarcações.',
}

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(company.address.mapsQuery)}&output=embed`
export const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(company.address.mapsQuery)}`

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'frota', label: 'A Frota' },
  { id: 'conves', label: 'Convés' },
  { id: 'estaleiro', label: 'Estaleiro' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'glossario', label: 'Glossário' },
  { id: 'contato', label: 'Contato' },
]

/** Todas as seções rastreadas pelo menu (inclui as que não aparecem nele). */
export const trackedSections = ['inicio', ...navItems.map((n) => n.id)]

export const hero = {
  kicker: 'Estaleiro · Ribeirão Preto/SP',
  title: ['Feitos para singrar.', 'Desenhados para reunir.'],
  text:
    'Chalanas e pontoons construídos peça a peça no nosso estaleiro — do primeiro traço do projeto ao dia em que o barco toca a água pela primeira vez.',
  primaryCta: 'Conhecer a frota',
  secondaryCta: 'Chamar no WhatsApp',
}

export const about = {
  kicker: 'Nº 00 — Diário de bordo',
  title: 'Um estaleiro no interior, com a cabeça na água.',
  paragraphs: [
    'A Fluyr Boats nasceu da Voa Menina com uma ideia simples: barco bom é aquele que junta gente. Por isso cada chalana e cada pontoon que sai do nosso galpão em Ribeirão Preto é pensado para conversa, música, churrasco e fim de tarde na represa.',
    'Aqui não existe linha de montagem anônima. Os flutuadores são calandrados e soldados à mão, a estrutura é montada no nosso próprio galpão e cada acabamento — estofado, iluminação, bar, guarda-corpo — é escolhido junto com quem vai navegar.',
  ],
  stats: [
    { value: '23', label: 'Pessoas a bordo da Fluyr X 850 (8,5 m)' },
    { value: '30', label: 'Pessoas a bordo da Fluyr 950 (9,5 m)' },
    { value: '100%', label: 'Construído no nosso estaleiro' },
  ],
}

export const process = {
  kicker: 'Nº 03 — Do estaleiro à água',
  title: 'Da prancheta ao bota-fora.',
  text: 'Cada embarcação passa pelas mesmas cinco etapas. Você acompanha tudo de perto — e pode visitar o estaleiro durante a construção.',
  steps: [
    {
      n: '01',
      term: 'Prancheta',
      title: 'Projeto sob medida',
      text: 'Ouvimos onde você vai navegar, quantas pessoas vão a bordo e como imagina o convés. O projeto ganha forma em 3D antes do primeiro corte.',
    },
    {
      n: '02',
      term: 'Flutuadores',
      title: 'Casco e flutuadores',
      text: 'As chapas de alumínio são calandradas e soldadas no estaleiro para formar os tubos que sustentam a embarcação com estabilidade.',
    },
    {
      n: '03',
      term: 'Convés',
      title: 'Estrutura e convés',
      text: 'Montamos a plataforma, o guarda-corpo e o toldo. É aqui que o desenho do barco aparece — como o X que assina a Fluyr X 850.',
    },
    {
      n: '04',
      term: 'Acabamento',
      title: 'Acabamento e elétrica',
      text: 'Estofados náuticos, iluminação em LED, bar, churrasqueira, som e painel do timão. Cada detalhe escolhido com você.',
    },
    {
      n: '05',
      term: 'Bota-fora',
      title: 'Entrega na água',
      text: 'O batismo: a embarcação toca a água, passa pelos testes e é entregue pronta para zarpar.',
    },
  ],
}

export const glossary = {
  kicker: 'Nº 05 — Glossário de bordo',
  title: 'Fale a língua do mar.',
  text: 'Vai comprar sua primeira embarcação? Estas são as palavras que você mais vai ouvir no estaleiro e no píer.',
  terms: [
    { term: 'Chalana', text: 'Embarcação de fundo chato, larga e estável, tradicional nos rios e represas brasileiros. Ideal para passeio e lazer em grupo.' },
    { term: 'Pontoon', text: 'Barco apoiado sobre flutuadores tubulares. O convés amplo e plano vira uma verdadeira sala de estar sobre a água.' },
    { term: 'Flutuadores', text: 'Os tubos que ficam sob o convés e garantem a flutuação e a estabilidade de um pontoon.' },
    { term: 'Proa e popa', text: 'Proa é a frente da embarcação; popa, a parte de trás — onde normalmente fica o motor de popa.' },
    { term: 'Bombordo e boreste', text: 'Bombordo é o lado esquerdo de quem olha para a proa; boreste (ou estibordo), o lado direito.' },
    { term: 'Convés', text: 'O piso principal da embarcação, onde as pessoas circulam, sentam e se reúnem.' },
    { term: 'Bimini', text: 'Toldo de lona sobre armação metálica que protege o convés do sol e pode ser recolhido.' },
    { term: 'Timão', text: 'O volante da embarcação. Fica no console de comando, junto ao painel.' },
    { term: 'Calado', text: 'A profundidade que o casco ocupa abaixo da linha d’água. Chalanas e pontoons têm calado pequeno — navegam em águas rasas.' },
    { term: 'Boca', text: 'A largura máxima da embarcação. Junto com o comprimento, define o espaço útil a bordo.' },
    { term: 'Bota-fora', text: 'O momento em que a embarcação recém-construída é lançada na água pela primeira vez.' },
    { term: 'Zarpar', text: 'Soltar as amarras e partir. O que você vai fazer assim que receber a sua Fluyr.' },
  ],
}

export const contactCopy = {
  kicker: 'Nº 06 — Rumo ao contato',
  title: 'Vamos traçar a rota do seu barco?',
  text: 'Conte um pouco do que você imagina. Montamos a mensagem e abrimos o WhatsApp com tudo escrito — é só tocar em enviar.',
  note: 'Seus dados não ficam guardados no site: eles vão direto para a conversa com a gente no WhatsApp.',
}

export const modelOptions = ['Fluyr X 850 (chalana, 8,5 m, até 23 pessoas)', 'Fluyr 950 (pontoon, 9,5 m, até 30 pessoas)', 'Projeto sob medida', 'Ainda não sei']

export const useOptions = ['Lazer com a família e amigos', 'Passeios / turismo', 'Eventos a bordo', 'Pesca', 'Outro']
