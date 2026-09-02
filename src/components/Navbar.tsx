import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, TrendingUp, Newspaper, Info, Home, Mail } from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'
import { Button } from '@/components/ui/button'

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

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white border-b border-slate-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="BORLIM Consultoria Empresarial - Início"
        >
          <div className="bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-xs flex items-center justify-center transition-transform duration-200 group-hover:scale-102 hover:border-[#16A34A]/50">
            <img
              src={logoBorlim}
              alt="BORLIM Consultoria Empresarial"
              className="h-12 sm:h-16 w-auto max-w-[280px] sm:max-w-[340px] object-contain transition-all"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#0B3B7A] font-bold' : 'text-slate-600 hover:text-[#0B3B7A]'
                }`}
              >
                {link.label}
                {/* Brand Green animated underline */}
                <span
                  className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#16A34A] transition-all duration-200 ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="mailto:flavio@borlim.com.br?subject=Consulta%20Econômica%20-%20Contato"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#0B3B7A] text-white hover:bg-[#1557A6] transition-colors rounded shadow-sm border border-[#0B3B7A] hover:border-[#16A34A]"
          >
            <span>Fale com um especialista</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#22C55E]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
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
        <div className="fixed inset-0 top-[115px] z-50 md:hidden bg-[#082852]/60 backdrop-blur-sm animate-fade-in">
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
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="mailto:flavio@borlim.com.br?subject=Consulta%20Econômica%20-%20Contato"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider bg-[#0B3B7A] hover:bg-[#1557A6] text-white rounded shadow transition-colors"
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
