import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  TrendingUp,
  Newspaper,
  Info,
  Home,
  Mail,
  CalendarDays,
  Landmark,
  FileSpreadsheet,
  ExternalLink,
  Coins,
  Compass,
  Tag,
  Target,
  ChevronDown,
  Briefcase,
  Scale,
  Globe,
  Phone,
  MessageCircle,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setServicesDropdownOpen(false)
  }, [location.pathname])

  // Accessible click outside and Escape key handling for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setServicesDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 150)
  }

  // 4 serviços agrupados no dropdown
  const serviceItems = [
    {
      label: 'Valuation',
      path: '/valuation',
      aliasPaths: ['/avaliacao-de-empresas'],
      description: 'Avaliação patrimonial, fluxo de caixa descontado e múltiplos',
      icon: Coins,
    },
    {
      label: 'Planejamento',
      path: '/planejamento-economico-financeiro',
      aliasPaths: ['/planejamento'],
      description: 'Fluxo de caixa, capital de giro e sustentabilidade do lucro real',
      icon: Compass,
    },
    {
      label: 'Formação de Preço',
      path: '/formacao-de-preco',
      aliasPaths: ['/formacao-preco'],
      description: 'Markup seguro, margem de contribuição e ponto de equilíbrio',
      icon: Tag,
    },
    {
      label: 'Balanced Scorecard',
      path: '/balanced-scorecard',
      aliasPaths: ['/bsc'],
      description: 'Gestão estratégica nas 4 perspectivas para não perder negócios',
      icon: Target,
    },
  ]

  const isServiceActive = serviceItems.some(
    (item) => location.pathname === item.path || item.aliasPaths.includes(location.pathname),
  )

  // Direct nav links ordenados conforme especificação para a Linha 2:
  // Início, Indicadores, Notícias, [Serviços dropdown], Agenda Tributária, Reforma Tributária, Tributação (direto para as 3 formas de tributação), Bolsa de Valores, Sobre
  const directNavLinksLine2 = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Indicadores', path: '/indicadores', icon: TrendingUp },
    { label: 'Notícias', path: '/noticias', icon: Newspaper },
    // Serviços entra aqui no desktop
    {
      label: 'Agenda Tributária',
      path: '/agenda-tributaria',
      aliasPaths: ['/agenda'],
      icon: CalendarDays,
    },
    {
      label: 'Reforma Tributária',
      path: '/reforma-tributaria',
      aliasPaths: ['/reforma'],
      icon: Landmark,
    },
    {
      label: 'Tributação',
      path: '/reforma-tributaria#formas-de-tributacao',
      aliasPaths: [],
      icon: Scale,
      hash: '#formas-de-tributacao',
    },
    {
      label: 'Bolsa de Valores',
      path: '/bolsa-de-valores',
      aliasPaths: ['/bolsa'],
      icon: Globe,
    },
    { label: 'Sobre', path: '/sobre', icon: Info },
  ]

  // Para o menu mobile (ordem confortável para navegação touch)
  const mobileNavLinks = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Indicadores', path: '/indicadores', icon: TrendingUp },
    { label: 'Notícias', path: '/noticias', icon: Newspaper },
    {
      label: 'Agenda Tributária',
      path: '/agenda-tributaria',
      aliasPaths: ['/agenda'],
      icon: CalendarDays,
    },
    {
      label: 'Reforma Tributária',
      path: '/reforma-tributaria',
      aliasPaths: ['/reforma'],
      icon: Landmark,
    },
    {
      label: 'Tributação',
      path: '/reforma-tributaria#formas-de-tributacao',
      aliasPaths: [],
      icon: Scale,
      hash: '#formas-de-tributacao',
    },
    {
      label: 'Bolsa de Valores',
      path: '/bolsa-de-valores',
      aliasPaths: ['/bolsa'],
      icon: Globe,
    },
    { label: 'Sobre', path: '/sobre', icon: Info },
  ]

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'

  // Helper para renderizar um link de navegação padrão com underline animado
  const renderNavLink = (link: {
    label: string
    path: string
    aliasPaths?: string[]
    icon: typeof Home
    hash?: string
  }) => {
    const targetPath = link.path.split('#')[0]
    const targetHash = link.hash || (link.path.includes('#') ? '#' + link.path.split('#')[1] : '')
    const isActive = targetHash
      ? location.pathname === targetPath && location.hash === targetHash
      : location.pathname === link.path ||
        Boolean(link.aliasPaths && link.aliasPaths.includes(location.pathname))

    return (
      <Link
        key={link.path}
        to={link.path}
        className={`group relative px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold tracking-normal transition-colors whitespace-nowrap rounded-md hover:bg-stone-100/80 shrink-0 ${
          isActive ? 'text-[#0B3B7A] font-bold' : 'text-slate-700 hover:text-[#0B3B7A]'
        }`}
      >
        <span>{link.label}</span>
        {/* Brand Green animated underline */}
        <span
          className={`absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#16A34A] transition-all duration-200 ${
            isActive
              ? 'opacity-100 scale-x-100'
              : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
          }`}
        />
      </Link>
    )
  }

  // Componente de Dropdown de Serviços
  const renderServicesDropdown = () => (
    <div
      ref={dropdownRef}
      className="relative shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setServicesDropdownOpen((prev) => !prev)}
        aria-expanded={servicesDropdownOpen}
        aria-haspopup="true"
        aria-label="Menu de Serviços da Borlim"
        className={`group relative inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold tracking-normal transition-colors whitespace-nowrap rounded-md hover:bg-stone-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] shrink-0 ${
          isServiceActive ? 'text-[#0B3B7A] font-bold' : 'text-slate-700 hover:text-[#0B3B7A]'
        }`}
      >
        <span>Serviços</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            servicesDropdownOpen
              ? 'rotate-180 text-[#16A34A]'
              : 'text-slate-500 group-hover:text-[#0B3B7A]'
          }`}
        />
        {/* Brand Green animated underline */}
        <span
          className={`absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#16A34A] transition-all duration-200 ${
            isServiceActive
              ? 'opacity-100 scale-x-100'
              : servicesDropdownOpen
                ? 'opacity-100 scale-x-100'
                : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      {servicesDropdownOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 xl:w-[380px] rounded-xl bg-white p-2 shadow-xl ring-1 ring-stone-900/5 border border-stone-200 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-2 border-b border-stone-100 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Soluções em Consultoria
            </span>
            <span className="text-[10px] font-semibold text-[#16A34A] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
              4 Especialidades
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {serviceItems.map((service) => {
              const Icon = service.icon
              const isCurrent =
                location.pathname === service.path || service.aliasPaths.includes(location.pathname)

              return (
                <Link
                  key={service.path}
                  to={service.path}
                  role="menuitem"
                  onClick={() => setServicesDropdownOpen(false)}
                  className={`group flex items-start gap-3 p-2.5 rounded-lg transition-all duration-150 text-left ${
                    isCurrent
                      ? 'bg-emerald-50/80 border border-emerald-200/80 text-[#0B3B7A]'
                      : 'hover:bg-[#F5F3EC]/70 text-slate-700 hover:text-[#0B3B7A]'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isCurrent
                        ? 'bg-[#16A34A] text-white shadow-xs'
                        : 'bg-stone-100 text-[#0B3B7A] group-hover:bg-[#0B3B7A] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs xl:text-[13px] font-bold ${
                          isCurrent ? 'text-[#0B3B7A]' : 'text-slate-800 group-hover:text-[#0B3B7A]'
                        }`}
                      >
                        {service.label}
                      </span>
                      {isCurrent && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      )}
                    </div>
                    <p className="text-[11px] xl:text-xs text-slate-500 leading-snug line-clamp-1 mt-0.5">
                      {service.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F3EC]/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm'
          : 'bg-[#F5F3EC]/90 backdrop-blur-sm border-b border-stone-200/80'
      }`}
    >
      {/* LINHA 1 (Desktop) / Barra Única (Mobile/Tablet): Logotipo + CTA + Contato */}
      <div className="w-full max-w-[1780px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 xl:gap-6">
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
                className="h-9 sm:h-11 lg:h-12 xl:h-14 2xl:h-16 w-auto max-w-[170px] sm:max-w-[220px] lg:max-w-[240px] xl:max-w-[300px] 2xl:max-w-[340px] object-contain transition-all"
              />
            </div>
          </Link>
        </div>

        {/* Linha 1: CTA Verde "GESTÃO EMPRESARIAL" + Contato WhatsApp / E-mail à Direita (Desktop >=1024px) */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 2xl:gap-4 shrink-0">
          {/* Main Brand CTA: GESTÃO EMPRESARIAL */}
          <a
            href={balanceAnalysisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-2 xl:py-2.5 text-xs xl:text-[13px] 2xl:text-sm font-bold uppercase tracking-wider bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg shadow-md hover:shadow-lg transition-all border border-[#15803D] hover:scale-[1.02] active:scale-[0.99] shrink-0 font-mono group"
            title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white group-hover:scale-110 transition-transform" />
            <span>GESTÃO EMPRESARIAL</span>
            <ExternalLink className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-emerald-100" />
          </a>

          {/* WhatsApp Direct Contact */}
          <a
            href="https://wa.me/5517997650672"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-[#16A34A] bg-white hover:bg-stone-50 border border-stone-200/90 hover:border-[#16A34A]/50 rounded-lg shadow-2xs transition-all shrink-0"
            title="Fale conosco via WhatsApp: (17) 99765-0672"
          >
            <MessageCircle className="w-4 h-4 text-[#16A34A]" />
            <span className="font-mono font-medium text-slate-800">(17) 99765-0672</span>
          </a>

          {/* Email Contact Button */}
          <a
            href="mailto:flavio@borlim.com.br?subject=Consulta%20Econ%C3%B4mica%20-%20Contato"
            className="inline-flex items-center gap-1.5 px-3 xl:px-3.5 py-2 xl:py-2.5 text-xs xl:text-[13px] font-semibold uppercase tracking-wider bg-[#0B3B7A] text-white hover:bg-[#1557A6] transition-colors rounded-lg shadow-xs border border-[#0B3B7A] hover:border-[#16A34A] shrink-0"
            title="Enviar e-mail para flavio@borlim.com.br"
          >
            <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Contato</span>
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
      {/* LINHA 2 (Desktop): Links de Navegação com altura confortável, centralizados e espaçados */}
      <div className="hidden lg:block border-t border-stone-200/80 bg-white/70">
        <nav
          className="w-full max-w-[1780px] mx-auto px-4 lg:px-6 xl:px-8 py-1.5 flex items-center justify-center"
          aria-label="Navegação principal"
        >
          <div className="flex items-center justify-center flex-wrap gap-x-1 xl:gap-x-2 2xl:gap-x-3 gap-y-1">
            {/* 1. Início */}
            {renderNavLink(directNavLinksLine2[0])}

            {/* 2. Indicadores */}
            {renderNavLink(directNavLinksLine2[1])}

            {/* 3. Notícias */}
            {renderNavLink(directNavLinksLine2[2])}

            {/* 4. Dropdown Serviços */}
            {renderServicesDropdown()}

            {/* 5. Agenda Tributária */}
            {renderNavLink(directNavLinksLine2[3])}

            {/* 6. Reforma Tributária */}
            {renderNavLink(directNavLinksLine2[4])}

            {/* 7. Tributação */}
            {renderNavLink(directNavLinksLine2[5])}

            {/* 8. Bolsa de Valores */}
            {renderNavLink(directNavLinksLine2[6])}

            {/* 9. Sobre */}
            {renderNavLink(directNavLinksLine2[7])}
          </div>
        </nav>
      </div>
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[105px] z-50 lg:hidden bg-[#082852]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-b border-stone-200 shadow-xl p-6 flex flex-col space-y-4 animate-slide-down max-h-[calc(100vh-110px)] overflow-y-auto">
            <div className="flex flex-col divide-y divide-slate-100">
              {/* Páginas principais no Mobile */}
              {mobileNavLinks.slice(0, 3).map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
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

              {/* Seção de Serviços no Mobile */}
              <div className="py-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2 px-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Serviços de Consultoria</span>
                </div>
                <div className="flex flex-col space-y-1 pl-2">
                  {serviceItems.map((service) => {
                    const Icon = service.icon
                    const isActive =
                      location.pathname === service.path ||
                      service.aliasPaths.includes(location.pathname)

                    return (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 py-2.5 px-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-50 text-[#16A34A] font-bold border-l-2 border-[#16A34A]'
                            : 'text-[#0B3B7A] hover:bg-stone-50'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${isActive ? 'text-[#16A34A]' : 'text-slate-400'}`}
                        />
                        <div className="flex flex-col">
                          <span>{service.label}</span>
                          <span className="text-[11px] text-slate-500 font-normal line-clamp-1">
                            {service.description}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Demais links no Mobile */}
              {mobileNavLinks.slice(3).map((link) => {
                const Icon = link.icon
                const targetPath = link.path.split('#')[0]
                const targetHash =
                  link.hash || (link.path.includes('#') ? '#' + link.path.split('#')[1] : '')
                const isActive = targetHash
                  ? location.pathname === targetPath && location.hash === targetHash
                  : location.pathname === link.path ||
                    Boolean(link.aliasPaths && link.aliasPaths.includes(location.pathname))

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
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
                href="https://wa.me/5517997650672"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-stone-200 rounded-lg shadow-xs hover:bg-stone-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span className="font-mono">WhatsApp: (17) 99765-0672</span>
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
      )}{' '}
    </header>
  )
}
