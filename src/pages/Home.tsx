import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Contato } from '@/components/sections/Contato'
import { Conves } from '@/components/sections/Conves'
import { Estaleiro } from '@/components/sections/Estaleiro'
import { Frota } from '@/components/sections/Frota'
import { Galeria } from '@/components/sections/Galeria'
import { Glossario } from '@/components/sections/Glossario'
import { Hero } from '@/components/sections/Hero'
import { Sobre } from '@/components/sections/Sobre'
import { BotoesFlutuantes } from '@/components/ui/BotoesFlutuantes'

export const Home = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Sobre />
      <Frota />
      <Conves />
      <Estaleiro />
      <Galeria />
      <Glossario />
      <Contato />
    </main>
    <Footer />
    <BotoesFlutuantes />
  </>
)
