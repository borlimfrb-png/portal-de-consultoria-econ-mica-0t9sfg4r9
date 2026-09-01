import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, TrendingUp, Newspaper, Info, Home, Mail } from 'lucide-react'
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
          ? 'bg-[#F6F4EE]/95 backdrop-blur-md border-b border-[#E5E0D6] shadow-sm py-3'
          : 'bg-[#F6F4EE] border-b border-[#EDE9DE] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0B1F3A] rounded flex items-center justify-center text-[#B8892F] font-serif text-2xl font-bold shadow-sm transition-transform duration-200 group-hover:scale-105">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-[#0B1F3A] leading-tight">
              Portal de Consultoria
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#B8892F] uppercase font-semibold">
              Econômica & Negócios
            </span>
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
                  isActive ? 'text-[#0B1F3A] font-semibold' : 'text-slate-600 hover:text-[#0B1F3A]'
                }`}
              >
                {link.label}
                {/* Brass animated underline */}
                <span
                  className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#B8892F] transition-all duration-200 ${
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
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B1F3A] text-[#F6F4EE] hover:bg-[#183863] transition-colors rounded shadow-sm border border-[#0B1F3A] hover:border-[#B8892F]"
          >
            <span>Fale com um especialista</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892F]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0B1F3A] hover:bg-slate-200/60 rounded focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[105px] z-50 md:hidden bg-[#0B1F3A]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F6F4EE] border-b border-[#E5E0D6] shadow-xl p-6 flex flex-col space-y-4 animate-slide-down">
            <div className="flex flex-col divide-y divide-[#EDE9DE]">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 py-3 text-base font-serif font-medium ${
                      isActive
                        ? 'text-[#B8892F] font-bold pl-2 border-l-2 border-[#B8892F]'
                        : 'text-[#0B1F3A]'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="pt-4 border-t border-[#EDE9DE]">
              <a
                href="mailto:flavio@borlim.com.br?subject=Consulta%20Econômica%20-%20Contato"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider bg-[#0B1F3A] text-[#F6F4EE] rounded shadow"
              >
                <Mail className="w-4 h-4 text-[#B8892F]" />
                <span>Fale com um especialista</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
