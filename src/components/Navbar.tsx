import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ArrowUpRight,
  TrendingUp,
  Newspaper,
  Info,
  Home,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  Coins,
  Compass,
  Tag,
  Target,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Indicadores', path: '/indicadores', icon: TrendingUp },
    { label: 'Notícias', path: '/noticias', icon: Newspaper },
    { label: 'Valuation', path: '/valuation', icon: Coins },
    { label: 'Planejamento', path: '/planejamento', icon: Compass },
    { label: 'Formação de Preço', path: '/formacao-de-preco', icon: Tag },
    { label: 'Balanced Scorecard', path: '/balanced-scorecard', icon: Target },
    { label: 'Sobre', path: '/sobre', icon: Info },
  ]

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-stone-200/80 py-3.5'
      }`}
    >
      <div className="w-full max-w-[1780px] mx-auto px-3 sm:px-4 lg:px-5 xl:px-8 flex items-center justify-between gap-2 xl:gap-4">
        {/* Brand - Left */}
        <div className="flex items-center shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="BORLIM Consultoria Empresarial - Início"
          >
            <div className="bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-stone-200 shadow-xs flex items-center justify-center transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-sm hover:border-[#16A34A]/60">
              <img
                src={logoBorlim}
                alt="BORLIM Consultoria Empresarial"
                className="h-9 sm:h-12 lg:h-12 xl:h-14 2xl:h-16 w-auto max-w-[170px] sm:max-w-[220px] lg:max-w-[240px] xl:max-w-[300px] 2xl:max-w-[340px] object-contain transition-all"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links - Centered & Fully Visible */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-center px-1 xl:px-3 min-w-0"
          aria-label="Navegação principal"
        >
          <div className="flex items-center justify-center gap-x-0.5 xl:gap-x-1 2xl:gap-x-1.5">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/valuation' && location.pathname === '/avaliacao-de-empresas') ||
                (link.path === '/planejamento' &&
                  location.pathname === '/planejamento-economico-financeiro') ||
                (link.path === '/formacao-de-preco' && location.pathname === '/formacao-preco') ||
                (link.path === '/balanced-scorecard' && location.pathname === '/bsc')
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative px-1.5 xl:px-2 2xl:px-2.5 py-1.5 text-[11px] xl:text-[13px] 2xl:text-sm font-medium tracking-tight xl:tracking-normal transition-colors whitespace-nowrap rounded-md hover:bg-stone-100/70 shrink-0 ${
                    isActive ? 'text-[#0B3B7A] font-bold' : 'text-slate-700 hover:text-[#0B3B7A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Brand Green animated underline */}
                  <span
                    className={`absolute bottom-0.5 left-1.5 right-1.5 xl:left-2 xl:right-2 h-[2px] bg-[#16A34A] transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </div>
        </nav>

        {/* CTA Buttons - Right (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
          {/* Main Brand CTA: GESTÃO EMPRESARIAL */}
          <a
            href={balanceAnalysisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3.5 2xl:px-4 py-2 xl:py-2.5 text-[11px] xl:text-xs 2xl:text-sm font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-md hover:shadow-lg transition-all border border-[#15803D] hover:scale-[1.02] active:scale-[0.99] shrink-0 font-mono group"
            title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white group-hover:scale-110 transition-transform" />
            <span>GESTÃO EMPRESARIAL</span>
            <ExternalLink className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-emerald-100" />
          </a>

          <a
            href="mailto:flavio@borlim.com.br?subject=Consulta%20Econ%C3%B4mica%20-%20Contato"
            className="inline-flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 2xl:px-3.5 py-2 xl:py-2.5 text-[11px] xl:text-xs font-semibold uppercase tracking-wider bg-[#0B3B7A] text-white hover:bg-[#1557A6] transition-colors rounded-lg shadow-xs border border-[#0B3B7A] hover:border-[#16A34A] shrink-0"
          >
            <span className="hidden xl:inline">Fale com especialista</span>
            <span className="xl:hidden">Contato</span>
            <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#22C55E]" />
          </a>
        </div>

        {/* Mobile / Tablet Buttons + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick GESTÃO EMPRESARIAL CTA button for medium tablet screens */}
          <a
            href={balanceAnalysisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-xs font-mono"
            title="Acessar o Sistema de Gestão Empresarial"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="text-[11px]">GESTÃO EMPRESARIAL</span>
            <ExternalLink className="w-3 h-3 text-emerald-100" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0B3B7A] hover:bg-stone-100 rounded-lg focus:outline-none transition-colors border border-stone-200"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[105px] z-50 lg:hidden bg-[#082852]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-b border-stone-200 shadow-xl p-6 flex flex-col space-y-4 animate-slide-down">
            <div className="flex flex-col divide-y divide-slate-100">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive =
                  location.pathname === link.path ||
                  (link.path === '/valuation' && location.pathname === '/avaliacao-de-empresas') ||
                  (link.path === '/planejamento' &&
                    location.pathname === '/planejamento-economico-financeiro') ||
                  (link.path === '/formacao-de-preco' && location.pathname === '/formacao-preco') ||
                  (link.path === '/balanced-scorecard' && location.pathname === '/bsc')
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 py-3 text-base font-serif font-medium ${
                      isActive
                        ? 'text-[#16A34A] font-bold pl-2 border-l-2 border-[#16A34A]'
                        : 'text-[#0B3B7A]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#16A34A]' : 'text-slate-500'}`} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}

              {/* Mobile Highlighted Link to GESTÃO EMPRESARIAL */}
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 px-3 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-base font-bold text-[#15803D] my-1"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#16A34A] text-white rounded-md shadow-xs">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <span>GESTÃO EMPRESARIAL</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-white bg-[#16A34A] px-2.5 py-1 rounded shadow-xs">
                  <span>Acessar</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-md font-mono transition-all border border-[#15803D]"
              >
                <FileSpreadsheet className="w-4 h-4 text-white" />
                <span>GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-4 h-4 text-emerald-100" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Consulta%20Econômica%20-%20Contato"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider bg-[#0B3B7A] hover:bg-[#15803D] text-white rounded-lg shadow-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-[#22C55E]" />
                <span>Fale com um especialista</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
