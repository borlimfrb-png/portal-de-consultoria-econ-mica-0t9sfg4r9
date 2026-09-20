import { Link } from 'react-router-dom'
import { ArrowLeft, Home, TrendingUp, Newspaper } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F0F4F8] px-4 py-20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 tech-dots-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-xl relative z-10 card-hover-lift">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-[#082852] text-[#22C55E] font-serif text-4xl font-extrabold shadow-lg border border-[#22C55E]/30 relative overflow-hidden group">
          <div className="absolute inset-0 tech-grid-pattern opacity-30" />
          <span className="relative z-10 tabular-nums">404</span>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#15803D] bg-emerald-50 border border-emerald-200">
            Página Não Localizada
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#082852]">Página não encontrada</h1>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          O link acessado pode estar desatualizado, ter sido movido ou o endereço digitado pode
          conter algum erro.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg border border-[#22C55E]/40"
          >
            <Home className="w-4 h-4 text-emerald-100" />
            <span>Voltar ao Início</span>
          </Link>

          <Link
            to="/indicadores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
          >
            <TrendingUp className="w-4 h-4 text-[#22C55E]" />
            <span>Ver Indicadores</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
