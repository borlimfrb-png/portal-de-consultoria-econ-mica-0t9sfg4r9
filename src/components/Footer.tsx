import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
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
    <footer className="bg-[#EDE9DE] border-t border-[#E5E0D6] text-[#0B1F3A] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Disclaimer */}
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              aria-label="BORLIM Consultoria Empresarial - Início"
            >
              <div className="bg-white px-3 py-1.5 rounded border border-[#D5CFBF] shadow-xs inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-102">
                <img
                  src="https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/d4ee3ea1-6f11-4694-81f4-064bcd12d76e/logotipo-borlim-73de3.jpg"
                  alt="BORLIM Consultoria Empresarial"
                  className="h-10 sm:h-12 w-auto max-w-[210px] object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inteligência macroeconômica, monitoramento regulatório da Reforma Tributária e suporte
              analítico para decisões estratégicas corporativas.
            </p>
            <p className="text-[11px] text-slate-500 italic pt-1 border-t border-[#E0DBCF]">
              Dados obtidos de fontes públicas (Banco Central do Brasil e agências de notícias) —
              valores sujeitos a atualização periódica.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#0B1F3A] border-b border-[#E0DBCF] pb-2">
              Navegação do Portal
            </h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#B8892F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B8892F] text-xs">›</span> Início
                </Link>
              </li>
              <li>
                <Link
                  to="/indicadores"
                  className="hover:text-[#B8892F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B8892F] text-xs">›</span> Indicadores Econômicos
                </Link>
              </li>
              <li>
                <Link
                  to="/noticias"
                  className="hover:text-[#B8892F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B8892F] text-xs">›</span> Notícias & Reforma Tributária
                </Link>
              </li>
              <li>
                <Link
                  to="/noticias?categoria=reforma_tributaria"
                  className="hover:text-[#B8892F] transition-colors flex items-center gap-1.5 text-xs text-slate-500 pl-3"
                >
                  • Especial Reforma Tributária
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-[#B8892F] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B8892F] text-xs">›</span> Sobre a Consultoria
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#0B1F3A] border-b border-[#E0DBCF] pb-2">
              Contato & Consultoria
            </h4>
            <div className="space-y-3 text-sm text-slate-700">
              <a
                href="mailto:flavio@borlim.com.br"
                className="flex items-start gap-2.5 hover:text-[#B8892F] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#B8892F] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Atendimento Técnico:</span>
                  <span className="font-mono text-xs font-semibold">flavio@borlim.com.br</span>
                </div>
              </a>

              <a
                href="https://wa.me/5517997650672"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-[#B8892F] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#B8892F] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Telefone / WhatsApp:</span>
                  <span className="font-mono text-xs font-semibold">(17) 99765-0672</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8892F] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Localização:</span>
                  <span className="text-xs font-medium">São Paulo — SP, Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#0B1F3A] border-b border-[#E0DBCF] pb-2">
              Boletim Econômico
            </h4>
            <p className="text-xs text-slate-600">
              Receba nossos relatórios síntese de indicadores e impactos tributários corporativos.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5CFBF] rounded focus:outline-none focus:border-[#B8892F] text-[#0B1F3A] placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0B1F3A] hover:bg-[#183863] text-[#F6F4EE] text-xs font-semibold rounded uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  <span>{loading ? 'Cadastrando...' : 'Assinar'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B8892F]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DED7C8] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div>© {currentYear} BORLIM Consultoria Empresarial. Todos os direitos reservados.</div>
          <div className="text-center md:text-right italic">
            Este portal tem caráter informativo e não constitui recomendação direta de investimento
            ou consultoria jurídica individualizada.
          </div>
        </div>
      </div>
    </footer>
  )
}
