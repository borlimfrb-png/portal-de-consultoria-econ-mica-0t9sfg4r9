import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  ExternalLink,
  FileSpreadsheet,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'
import { subscribeNewsletter } from '@/services/news'
import { toast } from '@/hooks/use-toast'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast({
        title: 'E-mail inválido',
        description: 'Por favor, informe um endereço de e-mail válido.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    const success = await subscribeNewsletter(email)
    setLoading(false)

    if (success) {
      setSubscribed(true)
      setEmail('')
      toast({
        title: 'Inscrição confirmada!',
        description:
          'Você receberá nossos resumos econômicos e análises diretamente na sua caixa de entrada.',
      })
    } else {
      toast({
        title: 'Erro ao cadastrar',
        description: 'Não foi possível completar o cadastro. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#082852] border-t border-[#0B3B7A] text-slate-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Disclaimer */}
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              aria-label="BORLIM Consultoria Empresarial - Início"
            >
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-102">
                <img
                  src={logoBorlim}
                  alt="BORLIM Consultoria Empresarial"
                  className="h-12 sm:h-16 w-auto max-w-[280px] sm:max-w-[320px] object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inteligência macroeconômica, monitoramento regulatório da Reforma Tributária e suporte
              analítico para decisões estratégicas corporativas.
            </p>
            <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-700/60">
              Dados obtidos de fontes públicas (Banco Central do Brasil e agências de notícias) —
              valores sujeitos a atualização periódica.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-white border-b border-slate-700/80 pb-2">
              Navegação do Portal
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#16A34A] text-xs">›</span> Início
                </Link>
              </li>
              <li>
                <Link
                  to="/indicadores"
                  className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#16A34A] text-xs">›</span> Indicadores Econômicos
                </Link>
              </li>
              <li>
                <Link
                  to="/noticias"
                  className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#16A34A] text-xs">›</span> Notícias & Reforma Tributária
                </Link>
              </li>
              <li>
                <Link
                  to="/noticias?categoria=reforma_tributaria"
                  className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5 text-xs text-slate-400 pl-3"
                >
                  • Especial Reforma Tributária
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-[#22C55E] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#16A34A] text-xs">›</span> Sobre a Consultoria
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://analise-de-balanco-6514f.goskip.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg border border-[#22C55E] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md group"
                  title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
                >
                  <FileSpreadsheet className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>GESTÃO EMPRESARIAL</span>
                  <ExternalLink className="w-3 h-3 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-white border-b border-slate-700/80 pb-2">
              Contato & Consultoria
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="mailto:flavio@borlim.com.br"
                className="flex items-start gap-2.5 hover:text-[#22C55E] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Atendimento Técnico:</span>
                  <span className="font-mono text-xs font-semibold text-white">
                    flavio@borlim.com.br
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/5517997650672"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#22C55E] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Telefone / WhatsApp:</span>
                  <span className="font-mono text-xs font-semibold text-white">
                    (17) 99765-0672
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/flavio-bordignon-bordignon-8b1a63b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#22C55E] transition-colors group"
                aria-label="LinkedIn - Flávio Bordignon"
              >
                <Linkedin className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Rede Profissional:</span>
                  <span className="font-mono text-xs font-semibold text-white group-hover:underline">
                    LinkedIn
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Localização:</span>
                  <span className="text-xs font-medium text-slate-200">São Paulo — SP, Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-white border-b border-slate-700/80 pb-2">
              Boletim Econômico
            </h4>
            <p className="text-xs text-slate-300">
              Receba nossos relatórios síntese de indicadores e impactos tributários corporativos.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Obrigado! Seu e-mail foi cadastrado com sucesso.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail corporativo"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-900/90 border border-slate-700 rounded focus:outline-none focus:border-[#16A34A] text-white placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors disabled:opacity-50 shadow"
                >
                  <span>{loading ? 'Cadastrando...' : 'Assinar'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>© {currentYear} BORLIM Consultoria Empresarial. Todos os direitos reservados.</div>
          <div className="text-center md:text-right italic text-slate-400">
            Este portal tem caráter informativo e não constitui recomendação direta de investimento
            ou consultoria jurídica individualizada.
          </div>
        </div>
      </div>
    </footer>
  )
}
