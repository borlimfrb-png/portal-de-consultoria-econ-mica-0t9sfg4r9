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
    { label: 'Sobre', path: '/sobre', icon: Info },
  ]

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white border-b border-slate-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group shrink-0"
          aria-label="BORLIM Consultoria Empresarial - Início"
        >
          <div className="bg-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border border-slate-200 shadow-xs flex items-center justify-center transition-transform duration-200 group-hover:scale-102 hover:border-[#16A34A]/50">
            <img
              src={logoBorlim}
              alt="BORLIM Consultoria Empresarial"
              className="h-10 sm:h-14 lg:h-16 w-auto max-w-[220px] sm:max-w-[280px] lg:max-w-[340px] object-contain transition-all"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#0B3B7A] font-bold' : 'text-slate-600 hover:text-[#0B3B7A]'
                }`}
              >
                {link.label}
                {/* Brand Green animated underline */}
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#16A34A] transition-all duration-200 ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* CTA Buttons (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          {/* Main Brand CTA: Análise de Balanço */}
          <a
            href={balanceAnalysisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-md hover:shadow-lg transition-all border border-[#15803D] hover:scale-[1.02] active:scale-[0.99] shrink-0 font-mono group"
            title="Acessar o Sistema de Análise de Balanço da Borlim (abre em nova aba)"
          >
            <FileSpreadsheet className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Análise de Balanço</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-100" />
          </a>

          <a
            href="mailto:flavio@borlim.com.br?subject=Consulta%20Econômica%20-%20Contato"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0B3B7A] text-white hover:bg-[#1557A6] transition-colors rounded-lg shadow-sm border border-[#0B3B7A] hover:border-[#16A34A] shrink-0"
          >
            <span>Fale com especialista</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#22C55E]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0B3B7A] hover:bg-slate-100 rounded focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[105px] z-50 lg:hidden bg-[#082852]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-b border-slate-200 shadow-xl p-6 flex flex-col space-y-4 animate-slide-down">
            <div className="flex flex-col divide-y divide-slate-100">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path
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
                    <Icon className="w-5 h-5 text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}

              {/* Mobile Highlighted Link to Análise de Balanço */}
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
                  <span>Análise de Balanço</span>
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
                <span>Análise de Balanço</span>
                <ExternalLink className="w-4 h-4 text-emerald-100" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Consulta%20Econômica%20-%20Contato"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider bg-[#0B3B7A] hover:bg-[#1557A6] text-white rounded-lg shadow-sm transition-colors"
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
