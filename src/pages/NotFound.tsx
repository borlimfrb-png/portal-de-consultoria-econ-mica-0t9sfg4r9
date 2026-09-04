import { Link } from 'react-router-dom'
import { ArrowLeft, Home, TrendingUp, Newspaper } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F3EC] px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/90 shadow-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#082852] text-[#22C55E] font-serif text-3xl font-bold shadow-md">
          404
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#082852]">Página não encontrada</h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          O link acessado pode estar desatualizado, ter sido removido ou o endereço digitado pode
          conter algum erro.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B3B7A] hover:bg-[#082852] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
          >
            <Home className="w-4 h-4 text-[#22C55E]" />
            <span>Voltar ao Início</span>
          </Link>

          <Link
            to="/indicadores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F5F3EC] border border-stone-300 hover:border-[#16A34A] text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
            <span>Ver Indicadores</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
