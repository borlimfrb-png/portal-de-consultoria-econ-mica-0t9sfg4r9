import { useEffect, useState } from 'react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

const STORAGE_KEY = 'borlim_intro_splash_seen_v1'

interface LogoIntroSplashProps {
  /** Permite forçar exibição para testes se necessário */
  forceShow?: boolean
}

export default function LogoIntroSplash({ forceShow = false }: LogoIntroSplashProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [logoEntered, setLogoEntered] = useState(false)

  useEffect(() => {
    // 1. Verificar se o usuário já viu o splash nesta sessão
    if (!forceShow) {
      try {
        const seen = sessionStorage.getItem(STORAGE_KEY)
        if (seen === 'true') {
          return
        }
      } catch {
        // sessionStorage bloqueada ou privada: fallback seguro
      }
    }

    // 2. Verificar preferência por movimento reduzido (prefers-reduced-motion)
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Se tiver reduced motion, não mostra splash ou encerra instantaneamente
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        /* ignore */
      }
      return
    }

    // Marca imediatamente na sessionStorage para que navegações ou cliques não repitam
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      /* ignore */
    }

    setIsVisible(true)

    // Inicia a animação de entrada do logo
    const animTimer = setTimeout(() => {
      setLogoEntered(true)
    }, 80)

    // Inicia o fade-out do overlay aos ~1.7s (elegante e ágil)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 1700)

    // Remove do DOM aos ~2.1s
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2150)

    // Timeout de segurança absoluto (2.8s) para nunca prender a tela
    const safetyTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2800)

    return () => {
      clearTimeout(animTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      clearTimeout(safetyTimer)
    }
  }, [forceShow])

  if (!isVisible) return null

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Carregando Portal Borlim Consultoria"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#082852] select-none pointer-events-auto transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Malha Tecnológica de Fundo Intensificada com Animação */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 tech-grid-animated pointer-events-none" />

      {/* 2. Orbes de Luz Tecnológicos em Pulso Lento */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#1557A6]/35 rounded-full blur-2xl pointer-events-none animate-float-slow-2" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#082852_85%)] pointer-events-none" />

      {/* 3. Container Central do Logotipo com Glow Verde Vivo */}
      <div
        className={`relative z-10 flex flex-col items-center max-w-sm sm:max-w-md px-6 text-center transition-all duration-700 ease-out transform ${
          logoEntered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-3'
        }`}
      >
        {/* Glow halo pulsante atrás do card da marca */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#1557A6] rounded-3xl opacity-50 blur-xl animate-pulse" />

        {/* Card Branco Elegante preservando as cores oficiais da marca */}
        <div className="relative bg-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 border-[#22C55E] shadow-[0_0_50px_rgba(34,197,94,0.45),0_0_20px_rgba(22,163,74,0.6)] flex items-center justify-center">
          <img
            src={logoBorlim}
            alt="BORLIM Consultoria Empresarial"
            className="h-14 sm:h-20 w-auto max-w-[260px] sm:max-w-[340px] object-contain"
          />
        </div>

        {/* Terminal Subtitle / Status */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3B7A]/80 border border-[#22C55E]/40 text-[#22C55E] text-[11px] font-mono font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E] shadow-[0_0_8px_#22C55E]"></span>
            </span>
            <span>Consultoria Econômica & Empresarial</span>
          </div>

          <p className="text-[11px] font-mono text-slate-300 tracking-wider">
            Carregando inteligência macroeconômica...
          </p>
        </div>

        {/* Linha de progresso sutil */}
        <div className="mt-4 w-48 sm:w-56 h-[3px] bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
          <div
            className={`h-full bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-teal-300 transition-all duration-[1500ms] ease-out rounded-full shadow-[0_0_10px_#22C55E] ${
              logoEntered ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </aside>
  )
}
