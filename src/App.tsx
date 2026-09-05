/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import Indicadores from './pages/Indicadores'
import Noticias from './pages/Noticias'
import NoticiaDetalhe from './pages/NoticiaDetalhe'
import Sobre from './pages/Sobre'
import Valuation from './pages/Valuation'
import Planejamento from './pages/Planejamento'
import FormacaoPreco from './pages/FormacaoPreco'
import BalancedScorecard from './pages/BalancedScorecard'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/avaliacao-de-empresas" element={<Valuation />} />
          <Route path="/planejamento" element={<Planejamento />} />
          <Route path="/planejamento-economico-financeiro" element={<Planejamento />} />
          <Route path="/formacao-de-preco" element={<FormacaoPreco />} />
          <Route path="/formacao-preco" element={<FormacaoPreco />} />
          <Route path="/balanced-scorecard" element={<BalancedScorecard />} />
          <Route path="/bsc" element={<BalancedScorecard />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
