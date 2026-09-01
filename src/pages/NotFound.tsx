import { Link } from 'react-router-dom'
import { ArrowLeft, Home, TrendingUp, Newspaper } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F6F4EE] px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0B1F3A] text-[#B8892F] font-serif text-3xl font-bold shadow-md">
          404
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#0B1F3A]">Página não encontrada</h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          O link acessado pode estar desatualizado, ter sido removido ou o endereço digitado pode
          conter algum erro.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#183863] text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
          >
            <Home className="w-4 h-4 text-[#B8892F]" />
            <span>Voltar ao Início</span>
          </Link>

          <Link
            to="/indicadores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#D5CFBF] hover:border-[#B8892F] text-[#0B1F3A] text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-[#B8892F]" />
            <span>Ver Indicadores</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
