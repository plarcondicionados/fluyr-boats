import { VisorProvider } from '@/components/ui/Visor'
import { SmoothScrollProvider } from '@/hooks/useSmoothScroll'
import { Home } from '@/pages/Home'

export const App = () => (
  <SmoothScrollProvider>
    <VisorProvider>
      <Home />
    </VisorProvider>
  </SmoothScrollProvider>
)
