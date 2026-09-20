import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Check,
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  Building2,
  HelpCircle,
  ChevronDown,
  Layers,
  DollarSign,
  Coins,
  Compass,
  Tag,
  Users2,
  Sparkles,
  Award,
  Zap,
  GraduationCap,
  Workflow,
  Crosshair,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function BalancedScorecard() {
  const [activePerspective, setActivePerspective] = useState<
    'financeira' | 'clientes' | 'processos' | 'aprendizado'
  >('financeira')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20Balanced%20Scorecard%20(BSC)%20para%20minha%20empresa.'

  // Três Fundamentos do Diagnóstico Prévio Borlim
  const diagnosticPillars = [
    {
      icon: BarChart3,
      badge: 'Diagnóstico 360°',
      title: 'Alimentado pelos 48 Indicadores de Desempenho',
      desc: 'O Balanced Scorecard da Borlim não nasce de palpites teóricos. Ele se alimenta diretamente do raio-X de 48 indicadores financeiros: capital de giro, ciclo de recebimento e pagamento, margens e liquidez. O BSC traduz esses números na rotina diária de cada setor da empresa.',
    },
    {
      icon: AlertTriangle,
      badge: 'Prevenção de Crise',
      title: 'Auditoria de Gargalos & Prevenção de Desvios',
      desc: 'Mapeamos com precisão cirúrgica onde a empresa perde clientes e margens: cotações demoradas, falhas no pós-venda, retrabalho produtivo ou descompasso entre vendas e entrega. Blindamos a operação com metas cruzadas.',
    },
    {
      icon: ShieldCheck,
      badge: 'Execução Integrada',
      title: 'Integração dos 3 Planejamentos Estratégicos',
      desc: 'O BSC opera em sinergia absoluta com o Planejamento Financeiro (fluxo e giro) e o Planejamento Econômico (lucro mensal). Ao alinhar equipe, processos, clientes e metas financeiras, nenhum negócio será perdido no mercado.',
    },
  ]

  // As 4 Perspectivas do Balanced Scorecard
  const perspectives = {
    financeira: {
      id: 'financeira',
      title: '1. Perspectiva Financeira',
      subtitle: 'Lucro mensal, fluxo de caixa e retorno sobre o capital',
      icon: DollarSign,
      badge: 'Resultados & Sustentabilidade',
      question:
        'Como devemos aparecer para os sócios e investidores para termos sucesso financeiro?',
      summary:
        'A perspectiva financeira traduz o resultado final de todo o esforço da empresa. No método Borlim, ela se conecta diretamente ao Planejamento Financeiro e ao Planejamento Econômico.',
      kpis: [
        {
          name: 'Lucro Mensal Líquido Real',
          why: 'Garantir que a empresa transforme faturamento em sobra limpa no caixa, sem ilusão contábil.',
        },
        {
          name: 'Fôlego de Capital de Giro',
          why: 'Monitorar a necessidade líquida de giro para sustentar as operações e prazos concedidos aos clientes.',
        },
        {
          name: 'Margem de Contribuição por Linha',
          why: 'Identificar quais produtos e contratos pagam os custos fixos e trazem rentabilidade real.',
        },
        {
          name: 'Retorno sobre o Capital / Reinvestimento',
          why: 'Demonstrar sugestões técnicas de onde reinvestir os lucros no próprio negócio com segurança.',
        },
      ],
      practicalExample:
        'Em vez de focar apenas no faturamento bruto, o empresário acompanha a margem líquida e o prazo médio de recebimento. Se as vendas crescerem 20%, o caixa precisa suportar o giro sem depender de antecipações caras de duplicatas.',
    },
    clientes: {
      id: 'clientes',
      title: '2. Perspectiva de Clientes & Mercado',
      subtitle: 'Retenção, velocidade de cotações e satisfação real',
      icon: Users2,
      badge: 'Blindagem Comercial',
      question:
        'Como devemos ser vistos pelos nossos clientes para alcançar nossa visão de mercado?',
      summary:
        'Aqui mora o coração da promessa da Borlim: nenhum negócio será perdido no mercado. Clientes não compram apenas preço; compram agilidade, confiança e cumprimento de promessas.',
      kpis: [
        {
          name: 'Tempo de Resposta em Orçamentos / Cotações',
          why: 'Reduzir o tempo de envio de propostas de dias para horas — a velocidade fecha até 40% mais vendas.',
        },
        {
          name: 'Taxa de Retenção e Recompra de Clientes',
          why: 'Manter a carteira ativa, medindo quantos clientes continuam comprando mês a mês.',
        },
        {
          name: 'Índice de Perda de Negócios (Loss Rate)',
          why: 'Mapear com exatidão por que cada proposta foi recusada: prazo, especificação técnica ou preço.',
        },
        {
          name: 'Índice de Satisfação e Pós-Venda (NPS)',
          why: 'Avaliar se a entrega atendeu rigorosamente à expectativa para gerar indicações espontâneas.',
        },
      ],
      practicalExample:
        'Uma distribuidora ou prestadora de serviços estabelece como meta responder 100% das cotações em até 4 horas úteis. O resultado imediato é estancar a perda de orçamentos para concorrentes que respondiam mais rápido.',
    },
    processos: {
      id: 'processos',
      title: '3. Perspectiva dos Processos Internos',
      subtitle: 'Prazo de entrega, qualidade na operação e zero retrabalho',
      icon: Workflow,
      badge: 'Eficiência Operacional',
      question:
        'Em quais processos internos da empresa devemos ser excelentes para satisfazer clientes e sócios?',
      summary:
        'Processos desorganizados geram atrasos, erros de expedição e custos ocultos que corroem o lucro. O BSC alinha a operação de ponta a ponta com o setor comercial.',
      kpis: [
        {
          name: 'Prazo Médio de Entrega / Execução (Lead Time)',
          why: 'Cumprir rigorosamente a data combinada com o cliente, eliminando desculpas e atrasos recorrentes.',
        },
        {
          name: 'Índice de Retrabalho, Refugo e Não-Conformidade',
          why: 'Eliminar o custo invisível de refazer pedidos, peças ou serviços mal executados na primeira vez.',
        },
        {
          name: 'Nível de Serviço em Entregas (OTIF — No Prazo e Completo)',
          why: 'Medir se os pedidos chegam no prazo exato e com todos os itens corretos solicitados na proposta.',
        },
        {
          name: 'Giro e Acuracidade de Estoques',
          why: 'Evitar mercadoria encalhada no galpão ou falta de matéria-prima no momento crucial da produção.',
        },
      ],
      practicalExample:
        'Na indústria ou no comércio atacadista, alinhar o setor de compras, almoxarifado e expedição para que pedidos com pronta-entrega saiam em 24h, sem erros na nota fiscal ou na separação.',
    },
    aprendizado: {
      id: 'aprendizado',
      title: '4. Perspectiva de Aprendizado & Crescimento',
      subtitle: 'Capacitação da equipe, retenção de talentos e liderança alinhada',
      icon: GraduationCap,
      badge: 'Pessoas & Cultura',
      question: 'Como a nossa organização deve continuar melhorando, aprendendo e inovando?',
      summary:
        'Máquinas, softwares e metas só funcionam quando as pessoas estão qualificadas, motivadas e cientes de como seu trabalho impacta a meta global da empresa.',
      kpis: [
        {
          name: 'Horas de Treinamento Técnico e Comercial',
          why: 'Capacitar vendedores no valor do produto e operadores no manuseio de equipamentos modernos.',
        },
        {
          name: 'Taxa de Rotatividade da Equipe (Turnover)',
          why: 'Reter profissionais-chave, diminuindo os custos de rescisão e a perda de conhecimento prático.',
        },
        {
          name: 'Clima Organizacional e Engajamento com Metas',
          why: 'Garantir que todos os colaboradores saibam exatamente qual é o seu papel para não perder negócios.',
        },
        {
          name: 'Adoção de Ferramentas de Gestão e Tecnologia',
          why: 'Assegurar que sistemas de gestão e controles financeiros sejam preenchidos com disciplina e precisão.',
        },
      ],
      practicalExample:
        'Treinar a equipe comercial e técnica em negociação baseada em valor, acabando com a cultura de conceder desconto desenfreado na primeira objeção do cliente.',
    },
  }

  // Cenários Práticos de Empresários Brasileiros
  const practicalScenarios = [
    {
      icon: Crosshair,
      title: 'A empresa perde propostas sem entender o real motivo',
      desc: 'Os orçamentos são enviados, mas o cliente fecha com o concorrente. O BSC identifica onde está o gargalo: demora no retorno, falta de flexibilidade no prazo ou proposta mal apresentada.',
      resolution:
        'Solução: Meta de resposta comercial ágil e acompanhamento sistemático de perda de cotações.',
    },
    {
      icon: AlertTriangle,
      title: 'Vendas e Produção vivem em pé de guerra',
      desc: 'O comercial promete prazos agressivos para bater meta, a fábrica ou a equipe de serviços não entrega a tempo, e o cliente cancela o contrato. Falta de metas compartilhadas.',
      resolution:
        'Solução: Alinhamento de KPIs entre capacidade operacional real e compromissos comerciais assumidos.',
    },
    {
      icon: DollarSign,
      title: 'A equipe comercial dá desconto excessivo para fechar',
      desc: 'Vendedores sacrificam a margem de contribuição para bater volume de vendas, comprometendo o lucro mensal e gerando sufoco de caixa no fechamento do mês.',
      resolution:
        'Solução: Indicadores de margem mínima e bonificação atrelada ao lucro real, não só ao volume faturado.',
    },
    {
      icon: Zap,
      title: 'O empresário passa o dia inteiro apagando incêndios operacionais',
      desc: 'Toda decisão depende do dono porque a equipe não sabe quais prioridades seguir. Não há rotina estruturada de acompanhamento de metas.',
      resolution:
        'Solução: Mapa Estratégico visual e painel de bordo executivo para cada líder de setor prestar contas.',
    },
  ]

  // Como a Implantação Funciona na Prática na Borlim
  const implementationSteps = [
    {
      step: '01',
      title: 'Diagnóstico dos 48 Indicadores & Raio-X de Vendas',
      desc: 'Partimos do diagnóstico financeiro de 48 indicadores da Borlim, mapeando o histórico de faturamento, prazos, estoques, perdas de negócios e margem de contribuição por cliente e linha.',
    },
    {
      step: '02',
      title: 'Construção do Mapa Estratégico nas 4 Perspectivas',
      desc: 'Definição dos objetivos de causa e efeito conectando: Aprendizado e Pessoas → Processos Internos → Satisfação e Retenção de Clientes → Lucro Mensal e Caixa Seguro.',
    },
    {
      step: '03',
      title: 'Definição de Metas, Indicadores (KPIs) & Responsáveis',
      desc: 'Escolha de poucos e decisivos indicadores por departamento. Cada líder de setor recebe metas claras, fórmulas de cálculo e a rotina de alimentação dos dados.',
    },
    {
      step: '04',
      title: 'Rotina de Governança, Reuniões Mensais & Ajustes',
      desc: 'Estruturação da reunião mensal de resultados com a diretoria e consultores Borlim: análise de desvios, ações corretivas e garantia de que nenhum negócio seja perdido.',
    },
  ]

  // Benefícios para o Dono do Negócio
  const bscBenefits = [
    {
      title: 'A Empresa Fica Muito Mais Competitiva no Mercado',
      desc: 'Com processos ágeis, cotações rápidas e atendimento impecável, a empresa se posiciona à frente dos concorrentes e ganha autoridade no setor.',
    },
    {
      title: 'Nenhum Negócio Será Perdido por Falha Interna',
      desc: 'Eliminação dos gargalos que fazem propostas esfriarem: demora na resposta, falta de estoque não avisada ou descumprimento de prazos prometidos.',
    },
    {
      title: 'Alinhamento Total entre Comercial, Operação e Finanças',
      desc: 'Fim dos feudos internos. Vendedores, gerentes de produção e setor financeiro trabalham com o mesmo objetivo: lucro saudável e satisfação do cliente.',
    },
    {
      title: 'Decisões Baseadas em Dados Concretos, Não em Achismos',
      desc: 'O empresário acompanha painel claro com indicadores confiáveis, identificando problemas antes que eles impactem o faturamento ou a conta bancária.',
    },
    {
      title: 'Integração Perfeita com os Planejamentos Financeiro e Econômico',
      desc: 'As metas do BSC sustentam o fluxo de capital de giro e o aumento contínuo do lucro mensal calculados pela consultoria Borlim.',
    },
    {
      title: 'Valorização Direta do Valuation da Empresa',
      desc: 'Empresas com gestão orientada pelo Balanced Scorecard apresentam menor dependência do fundador, menor risco de execução e múltiplos muito superiores em avaliações de mercado.',
    },
  ]

  // FAQ Tira-Dúvidas de Empresário para Empresário
  const faqs = [
    {
      q: 'O que é o Balanced Scorecard (BSC) em termos simples para o empresário?',
      a: 'O Balanced Scorecard (BSC, ou Painel Balanceado de Desempenho) é uma metodologia mundial de gestão criada pelos professores Robert Kaplan e David Norton, da Harvard Business School. Na prática de empresário para empresário, o BSC resolve o grande erro das empresas tradicionais: olhar apenas para o retrovisor financeiro (quanto faturou no mês passado). O BSC equilibra quatro perspectivas fundamentais: Financeira (lucro e caixa), Clientes (satisfação e agilidade), Processos Internos (qualidade e prazos) e Aprendizado/Pessoas (treinamento e equipe engajada). Quando essas quatro áreas trabalham em harmonia, a empresa ganha velocidade, atrai os melhores clientes e nenhum negócio é perdido para a concorrência.',
    },
    {
      q: 'Por que a Borlim afirma que "nenhum negócio será perdido com a implantação do Balanced Scorecard"?',
      a: 'Porque a enorme maioria das vendas e clientes perdidos no mercado brasileiro não ocorre por causa do produto ou do preço, mas sim por falhas de processo: demora excessiva para responder uma cotação, falta de produto em estoque por erro de compras, desinformação entre o vendedor e a expedição ou um pós-venda que esquece o comprador. O Balanced Scorecard da Borlim amarra as metas comerciais às metas de entrega e suporte operacional. Com processos rápidos, controle rigoroso de perdas e equipe motivada, a sua empresa atende com precisão cirúrgica antes que o concorrente sequer responda — por isso garantimos que nenhum negócio será perdido.',
    },
    {
      q: 'O Balanced Scorecard serve para pequenas e médias empresas (PMEs)?',
      a: 'Com certeza. Ao contrário do que muitos pensam, o BSC não é exclusivo de multinacionais gigantes. Nas PMEs, onde a margem de erro é estreita e o empresário muitas vezes acumula funções de vendas, cobrança e operação, o BSC é ainda mais transformador: ele organiza as prioridades em um painel simples e objetivo, tira o dono da sobrecarga de apagar incêndios e dá autonomia para a equipe tomar decisões certas no dia a dia com foco em resultado.',
    },
    {
      q: 'Qual é a relação entre o Balanced Scorecard e os 48 indicadores de desempenho da Borlim?',
      a: 'Os 48 indicadores da Borlim formam o diagnóstico econômico e financeiro mais completo do mercado (capital de giro, prazos médios de recebimento e pagamento, margens de contribuição, endividamento e liquidez). O Balanced Scorecard é a ferramenta que coloca esse diagnóstico em movimento diário: os dados dos 48 indicadores alimentam diretamente a perspectiva financeira e orientam quais processos internos precisam ser corrigidos com urgência para estancar perdas de caixa e melhorar o lucro.',
    },
    {
      q: 'Qual é a diferença entre o Balanced Scorecard e um simples plano de metas comercial?',
      a: 'Um plano de metas comercial isolado costuma olhar apenas para uma linha: faturamento bruto. Isso costuma gerar problemas graves: vendedores concedem prazos longos demais que quebram o capital de giro da empresa, vendem produtos com margem de contribuição negativa ou prometem prazos de entrega que a fábrica ou os fornecedores não conseguem cumprir. O BSC é balanceado justamente por isso: a meta comercial só é batida se o pedido for entregue no prazo, com qualidade, satisfação do cliente e margem saudável para o caixa.',
    },
    {
      q: 'Como o Balanced Scorecard se integra aos outros dois planejamentos estratégicos da Borlim?',
      a: 'A Borlim estrutura a gestão da sua empresa sobre três planejamentos complementares: (1) Planejamento Financeiro — que organiza o fluxo de entrada e saída do capital de giro e demonstra sugestões de onde reinvestir os lucros no seu próprio negócio; (2) Planejamento Econômico — que melhora o lucro mensal da empresa alinhando receitas, custos e margem de contribuição; e (3) Balanced Scorecard — que traduz essas metas financeiras na rotina dos setores de atendimento, vendas, compras e equipe para que nenhum negócio seja perdido no mercado. Juntos, eles formam a blindagem completa da sua operação.',
    },
    {
      q: 'Quanto tempo leva para implantar o Balanced Scorecard e qual a dedicação exigida?',
      a: 'O cronograma e o escopo de implantação variam de acordo com o porte da empresa, o número de setores envolvidos e o grau de maturidade dos controles internos já existentes. A metodologia da Borlim é prática e sem burocracia desnecessária: conduzimos reuniões estruturadas com os sócios e líderes de setor para desenhar o Mapa Estratégico e os KPIs sem travar a rotina produtiva do seu negócio. Para receber uma estimativa sob medida para sua realidade, fale diretamente com o economista Flávio Bordignon pelo WhatsApp (17) 99765-0672 ou e-mail flavio@borlim.com.br.',
    },
    {
      q: 'Como é calculada a proposta comercial e o investimento na consultoria?',
      a: 'Na Borlim não trabalhamos com pacotes fechados ou tabelas genéricas de prateleira. O investimento varia conforme a complexidade do negócio, quantidade de unidades ou filiais e a integração requerida entre os três planejamentos (Financeiro, Econômico e BSC). Realizamos uma conversa diagnóstica inicial para entender o momento da sua empresa e apresentamos uma proposta técnica sob medida, clara e transparente. Contate-nos pelo WhatsApp (17) 99765-0672.',
    },
    {
      q: 'Como o Balanced Scorecard ajuda no Valuation da minha empresa?',
      a: 'Empresas geridas com Balanced Scorecard valem significativamente mais no mercado. Quando um investidor, comprador ou banco audita o seu negócio (Due Diligence), ele busca três garantias: previsibilidade de receita, processos documentados que não dependem exclusivamente da presença física do dono e uma equipe que opera sob metas claras. O BSC reduz o risco percebido da empresa, aumentando o fluxo de caixa futuro e elevando a nota da avaliação patrimonial e econômica.',
    },
  ]

  const curPerspective = perspectives[activePerspective]
  const CurIcon = curPerspective.icon

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO INSTITUCIONAL (Fintech BSC Strategic Architecture) */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-[#1557A6]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <Target className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especialidade Estratégica — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Balanced Scorecard (BSC)
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Com essa ferramenta a empresa vai ficar muito mais competitiva no mercado — nenhum
              negócio será perdido com a implantação do Balanced Scorecard.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na <strong>Borlim Consultoria Empresarial</strong>, traduzimos a estratégia
              corporativa em rotina produtiva de empresário para empresário. O{' '}
              <strong>Balanced Scorecard</strong> é um dos{' '}
              <strong>três planejamentos estratégicos</strong> fundamentais que a Borlim estabelece
              para a sua empresa (ao lado do <strong>Planejamento Financeiro</strong> de fluxo e
              capital de giro e do <strong>Planejamento Econômico</strong> para melhoria do lucro
              mensal).
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-3xl">
              Alimentado pelo diagnóstico rigoroso de{' '}
              <strong>48 indicadores de desempenho financeiro</strong> e pelo teste preventivo de
              insolvência, o BSC sincroniza as quatro perspectivas essenciais da sua operação:{' '}
              <strong>Financeira</strong>, <strong>Clientes e Mercado</strong>,{' '}
              <strong>Processos Internos</strong> e <strong>Aprendizado e Pessoas</strong>. Acabamos
              com o descompasso entre vendas e entrega, blindamos sua equipe comercial e asseguramos
              que cada oportunidade de mercado seja convertida com agilidade e margem saudável.
            </p>

            {/* CTAs do Hero */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-2xl border border-[#22C55E]/40 hover:scale-[1.02] active:scale-[0.99] group relative overflow-hidden"
                title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                <span>GESTÃO EMPRESARIAL</span>
                <ExternalLink className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-[#082852] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
              >
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span>Falar com o Especialista</span>
                <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                to="/planejamento"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>Ver Planejamento Econômico-Financeiro</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL & O COMPROMISSO BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Compromisso Estratégico Borlim
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “Balanced Scorecard: com essa ferramenta a empresa vai ficar muito mais competitiva
                no mercado, ou seja, nenhum negócio será perdido com a implantação do Balanced
                Scorecard.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                A maioria das empresas perde propostas valiosas não por causa do preço, mas pela
                demora em responder cotações, por falhas na expedição ou por falta de comunicação
                entre setores. O Balanced Scorecard da Borlim integra suas metas comerciais aos
                processos internos, à qualificação da equipe e à rentabilidade financeira. Apoiado
                no diagnóstico de 48 indicadores, ele transforma intenções em resultados concretos
                no caixa.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#E5EDF5]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Contato Direto com o Consultor
                </span>
                <p className="font-serif text-lg font-bold text-[#082852]">Flávio Bordignon</p>
                <p className="text-xs text-slate-600 font-sans">
                  Economista e consultor sênior na BORLIM Consultoria Empresarial.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-2 font-mono text-xs">
                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#16A34A] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>(17) 99765-0672 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#16A34A] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>flavio@borlim.com.br</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A FUNDAÇÃO: O QUE É O BALANCED SCORECARD E COMO ELE SE CONECTA À BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Fundamentos & Origem
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            O Que É o Balanced Scorecard de Empresário para Empresário
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Desenvolvido pelos professores Robert Kaplan e David Norton, da Harvard Business School,
            o Balanced Scorecard (BSC, ou Painel Balanceado de Gestão) nasceu para superar uma falha
            crítica da gestão tradicional: olhar apenas para os demonstrativos financeiros passados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {diagnosticPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-[#15803D] mb-3 border border-emerald-200">
                    {pillar.badge}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bloco Explicativo de Causa e Efeito */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                A Relação de Causa e Efeito
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                Como as Quatro Perspectivas Constroem Resultados Reais
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                No método Borlim, as quatro perspectivas não funcionam como ilhas isoladas. Elas
                seguem uma lógica encadeada de causa e efeito:
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-sans">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Pessoas Treinadas & Motivadas (Aprendizado):</strong> Dominam seus
                    papéis, atendem com empatia e conhecem as características técnicas do produto ou
                    serviço.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Processos Internos Rápidos e Sem Erros:</strong> Propostas saem em
                    poucas horas, a expedição não falha e o retrabalho na fábrica ou escritório é
                    zerado.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>Clientes Satisfeitos e Fidelizados (Mercado):</strong> Recebem no prazo
                    combinado, não trocam a sua empresa pela concorrência e aceitam pagar preços
                    justos.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong>Lucro Mensal Alto e Caixa Seguro (Financeiro):</strong> Faturamento se
                    converte em dinheiro limpo no banco, o capital de giro fica protegido e nenhum
                    negócio é perdido.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#082852] text-white p-6 sm:p-7 rounded-xl border border-[#0B3B7A] flex flex-col justify-between space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Tríade Estratégica Borlim
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                Os 3 Planejamentos Conduzidos pela Borlim:
              </h4>
              <ul className="space-y-3 font-sans text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">1. Planejamento Financeiro:</strong> Entrada e
                    saída de capital de giro e onde reinvestir os lucros.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">2. Planejamento Econômico:</strong> Melhorar o
                    lucro mensal, margens e DRE gerencial.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">3. Balanced Scorecard (BSC):</strong> Empresa
                    muito mais competitiva para nenhum negócio ser perdido.
                  </span>
                </li>
              </ul>
              <div className="pt-3 border-t border-slate-700/80">
                <Link
                  to="/planejamento"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#22C55E] hover:text-white uppercase tracking-wider"
                >
                  <span>Conhecer os 3 planejamentos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AS 4 PERSPECTIVAS EM ABAS INTERATIVAS */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Painel Interativo de Gestão
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              As 4 Perspectivas do Balanced Scorecard no Dia a Dia da Sua Empresa
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Explore cada perspectiva da metodologia com exemplos práticos adaptados à realidade de
              empresários brasileiros (indústria, comércio e serviços).
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 border-b border-slate-200 pb-3 mb-8">
            {(
              [
                { key: 'financeira', label: '1. Financeira', icon: DollarSign },
                { key: 'clientes', label: '2. Clientes & Mercado', icon: Users2 },
                { key: 'processos', label: '3. Processos Internos', icon: Workflow },
                { key: 'aprendizado', label: '4. Aprendizado & Pessoas', icon: GraduationCap },
              ] as const
            ).map((tab) => {
              const TabIcon = tab.icon
              const isActive = activePerspective === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActivePerspective(tab.key)}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all text-center sm:text-left ${
                    isActive
                      ? 'bg-[#082852] text-white shadow-md border-b-2 border-[#16A34A]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <TabIcon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#22C55E]' : 'text-slate-500'}`}
                  />
                  <span className="truncate">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-[#E5EDF5]/40 rounded-2xl border border-stone-200 p-6 sm:p-10 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details & KPIs */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shadow-xs">
                    <CurIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-[#15803D] border border-emerald-200">
                      {curPerspective.badge}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852] mt-1">
                      {curPerspective.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] mb-1">
                    A Pergunta Estratégica:
                  </p>
                  <p className="font-serif text-base sm:text-lg font-bold text-[#082852] italic">
                    “{curPerspective.question}”
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                  {curPerspective.summary}
                </p>

                {/* KPIs Grid */}
                <div>
                  <h4 className="font-serif text-base font-bold text-[#082852] mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#16A34A]" />
                    Indicadores-Chave (KPIs) Típicos Recomendados pela Borlim:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {curPerspective.kpis.map((kpi, kIdx) => (
                      <div
                        key={kIdx}
                        className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-[#16A34A] transition-all space-y-1"
                      >
                        <span className="font-serif text-sm font-bold text-[#082852] block">
                          {kpi.name}
                        </span>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {kpi.why}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Example Box */}
                <div className="p-5 bg-white rounded-xl border border-emerald-200/80 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Exemplo Prático de Aplicação
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                    {curPerspective.practicalExample}
                  </p>
                </div>
              </div>

              {/* Right Column: Sidebar Insight */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                    A Força do Alinhamento
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Nenhum Negócio Fica pelo Caminho
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Quando a perspectiva {curPerspective.title.split('.')[1]?.trim()} funciona com
                    metas auditadas, a equipe ganha ritmo e a empresa opera com a agilidade que os
                    clientes exigem hoje.
                  </p>
                  <div className="pt-4 border-t border-slate-700/80 space-y-2 text-xs font-mono">
                    <div className="text-emerald-300">✓ Metas mensuráveis</div>
                    <div className="text-emerald-300">✓ Responsável claro por indicador</div>
                    <div className="text-emerald-300">✓ Revisão mensal de desvios</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A]">
                    Conexão com os 48 Indicadores
                  </span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Os dados alimentados nesta perspectiva se cruzam com o teste de insolvência
                    imediata e em 12 meses da Borlim, garantindo que o faturamento conquistado não
                    pressione o capital de giro.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#16A34A] hover:underline"
                  >
                    <span>Falar com o economista</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CENÁRIOS PRÁTICOS: SITUAÇÕES SOLUCIONADAS PELO BSC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Identificação de Gargalos
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Onde a Sua Empresa Pode Estar Perdendo Negócios Hoje?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Dificuldades comuns no dia a dia corporativo que o Balanced Scorecard da Borlim
            soluciona de forma definitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {practicalScenarios.map((scenario, idx) => {
            const Icon = scenario.icon
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 text-[#15803D] border border-emerald-200">
                      Cenário #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852]">
                    {scenario.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {scenario.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-700 font-sans flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="font-semibold text-[#082852]">{scenario.resolution}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. COMO A IMPLANTAÇÃO FUNCIONA NA PRÁTICA NA BORLIM */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-y border-[#0B3B7A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
              Metodologia em 4 Etapas
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
              Como Funciona a Implantação do Balanced Scorecard
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Trabalho consultivo estruturado e direto, conduzido lado a lado com os sócios e a
              diretoria da empresa, sem inventar modelos burocráticos ou engessados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xs flex flex-col justify-between hover:border-[#22C55E]/60 transition-all group"
              >
                <div>
                  <span className="font-mono text-3xl font-bold text-[#22C55E] block mb-3 group-hover:scale-105 transition-transform">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg border border-[#22C55E]/40"
            >
              <Phone className="w-4 h-4" />
              <span>Solicitar Implantação do Balanced Scorecard</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. BENEFÍCIOS PARA O DONO DO NEGÓCIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Vantagens Competitivas
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Por Que Implantar o Balanced Scorecard com a BORLIM?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Benefícios objetivos que transformam desorganização e incerteza comercial em agilidade,
            previsibilidade e retenção de clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bscBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#16A34A] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#082852] mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SINERGIA ENTRE SERVIÇOS (A PONTE ESTRATÉGICA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-[#082852] via-[#0B3B7A] to-[#082852] text-white p-8 sm:p-12 rounded-3xl border border-[#0B3B7A] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#22C55E]">
                <Layers className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
                  Sinergia Estratégica Completa
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Como o Balanced Scorecard se Conecta aos Nossos Outros Serviços
              </h3>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                Na Borlim, nenhuma especialidade anda sozinha. O <strong>Balanced Scorecard</strong>{' '}
                se apoia nas margens apuradas na <strong>Formação de Preço para Vendas</strong> para
                garantir que cada cotação fechada traga margem de contribuição saudável. Ele
                alimenta o <strong>Planejamento Econômico e Financeiro</strong> com previsibilidade
                de receitas e controle de capital de giro. E, ao final, eleva expressivamente o
                valor de mercado no <strong>Valuation</strong> da empresa, pois demonstra governança
                sólida, baixa dependência do dono e processos que garantem que nenhum negócio seja
                perdido.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  to="/planejamento"
                  className="p-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-all text-xs font-sans group/sub"
                >
                  <span className="font-mono text-[#22C55E] text-[10px] uppercase font-bold block mb-1">
                    Planejamento
                  </span>
                  <span className="font-serif font-bold text-white group-hover/sub:text-emerald-200">
                    Econômico & Financeiro ›
                  </span>
                </Link>

                <Link
                  to="/formacao-de-preco"
                  className="p-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-all text-xs font-sans group/sub"
                >
                  <span className="font-mono text-[#22C55E] text-[10px] uppercase font-bold block mb-1">
                    Pricing
                  </span>
                  <span className="font-serif font-bold text-white group-hover/sub:text-emerald-200">
                    Formação de Preço ›
                  </span>
                </Link>

                <Link
                  to="/valuation"
                  className="p-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-all text-xs font-sans group/sub"
                >
                  <span className="font-mono text-[#22C55E] text-[10px] uppercase font-bold block mb-1">
                    Avaliação
                  </span>
                  <span className="font-serif font-bold text-white group-hover/sub:text-emerald-200">
                    Valuation de Empresas ›
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group border border-[#22C55E]/40"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Acessar Gestão Empresarial</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#082852] hover:bg-slate-100 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span>Conversar com Flávio Bordignon</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ - PERGUNTAS FREQUENTES */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas de Empresário para Empresário
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre Balanced Scorecard (BSC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Respostas diretas sobre como a ferramenta funciona, prazo, pequenas empresas e a
              conexão com os 48 indicadores da Borlim.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4.5 bg-[#E5EDF5]/50 hover:bg-stone-100 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-[#082852] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#16A34A]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 py-5 bg-white border-t border-slate-200 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed space-y-2 animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 10. CONTATO & CTA INSTITUCIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Atendimento Técnico Direto
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Vamos tornar sua empresa muito mais competitiva no mercado.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o nosso economista Flávio Bordignon e descubra como o
                Balanced Scorecard, apoiado nos 48 indicadores da Borlim, vai alinhar seus setores,
                blindar suas vendas e garantir que nenhum negócio seja perdido para a concorrência.
              </p>

              <div className="space-y-3 font-mono text-xs pt-2">
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    flavio@borlim.com.br
                  </span>
                </a>
                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#16A34A] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    (17) 99765-0672
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans font-normal">
                    (WhatsApp Direto)
                  </span>
                </a>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <Building2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>BORLIM Consultoria Empresarial Ltda. — São Paulo, SP</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0B3B7A] p-8 rounded-2xl border border-slate-700 text-center shadow-inner">
              <div className="bg-white p-4 rounded-2xl border border-white/20 shadow-lg mb-4 w-full max-w-[260px] flex items-center justify-center">
                <img
                  src={logoBorlim}
                  alt="BORLIM Consultoria Empresarial"
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Consultoria Estratégica</h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Atendimento personalizado para empresários, sócios e diretorias corporativas.
              </p>

              <div className="w-full space-y-3">
                <a
                  href={balanceAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-[#22C55E] group"
                  title="Acessar o Sistema de Gestão Empresarial da Borlim (abre em nova aba)"
                >
                  <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                  <span>GESTÃO EMPRESARIAL</span>
                  <ExternalLink className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow group"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Falar com Flávio Bordignon</span>
                  <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
