import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Landmark,
  Scale,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Tag,
  Compass,
  CalendarDays,
  Building2,
  Layers,
  Percent,
  Receipt,
  HelpCircle,
  Boxes,
  ArrowUpRight,
  Flame,
  Wallet,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'
import FormasDeTributacaoSection from '@/components/FormasDeTributacaoSection'

export default function ReformaTributaria() {
  const [activeTransitionTab, setActiveTransitionTab] = useState<number>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeImpactFilter, setActiveImpactFilter] = useState<'todos' | 'vantagens' | 'desafios'>(
    'todos',
  )

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20os%20impactos%20da%20Reforma%20Tribut%C3%A1ria%20na%20minha%20empresa%20com%20a%20Borlim.'

  // 5 tributos extintos vs novo modelo
  const tributosSubstituidos = [
    {
      antigo: 'PIS',
      nomeAntigo: 'Programa de Integração Social',
      esfera: 'Federal',
      destino: 'Substituído pela CBS (Federal)',
      corEsfera: 'bg-blue-100 text-[#082852] border-blue-200',
    },
    {
      antigo: 'COFINS',
      nomeAntigo: 'Contribuição para o Financiamento da Seguridade Social',
      esfera: 'Federal',
      destino: 'Substituído pela CBS (Federal)',
      corEsfera: 'bg-blue-100 text-[#082852] border-blue-200',
    },
    {
      antigo: 'IPI',
      nomeAntigo: 'Imposto sobre Produtos Industrializados',
      esfera: 'Federal',
      destino:
        'Substituído pelo IS (Imposto Seletivo) e IBS/CBS (alíquota zero geral, mantido apenas para ZFM)',
      corEsfera: 'bg-blue-100 text-[#082852] border-blue-200',
    },
    {
      antigo: 'ICMS',
      nomeAntigo: 'Imposto sobre Circulação de Mercadorias e Serviços',
      esfera: 'Estadual',
      destino: 'Substituído pelo IBS (Estados e DF)',
      corEsfera: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      antigo: 'ISS',
      nomeAntigo: 'Imposto sobre Serviços de Qualquer Natureza',
      esfera: 'Municipal',
      destino: 'Substituído pelo IBS (Municípios)',
      corEsfera: 'bg-purple-100 text-purple-900 border-purple-200',
    },
  ]

  // Pilares centrais do novo sistema
  const novosPilares = [
    {
      sigla: 'CBS',
      nome: 'Contribuição sobre Bens e Serviços',
      esfera: 'Federal (União)',
      descricao:
        'Unifica PIS e Cofins sob competência exclusiva da União. Arrecadação direta pela Receita Federal com base de cálculo ampla e cálculo exclusivamente "por fora".',
      destaque: 'Substitui PIS e Cofins a partir de 2027',
    },
    {
      sigla: 'IBS',
      nome: 'Imposto sobre Bens e Serviços',
      esfera: 'Subnacional (Estados e Municípios)',
      descricao:
        'Substitui o ICMS estadual e o ISS municipal. Gerido pelo Comitê Gestor do IBS, com receita partilhada automaticamente entre os 26 estados, DF e 5.570 municípios no destino do consumo.',
      destaque: 'Fim da guerra fiscal entre estados',
    },
    {
      sigla: 'IS',
      nome: 'Imposto Seletivo ("Imposto do Pecado")',
      esfera: 'Federal (União)',
      descricao:
        'Tributo extrafiscal com alíquota específica sobre a produção, comercialização ou importação de bens e serviços prejudiciais à saúde ou ao meio ambiente (cigarros, bebidas alcoólicas, veículos poluentes, mineração e refrigerantes).',
      destaque: 'Desestimula consumo danoso',
    },
    {
      sigla: 'Split Payment',
      nome: 'Retenção Automática no Momento da Liquidação Financeira',
      esfera: 'Sistema Financeiro / Banco Central',
      descricao:
        'Mecanismo tecnológico em que a instituição bancária ou arranjo de pagamento (Pix, cartão, boleto) separa e repassa o imposto devido no exato instante do pagamento da nota fiscal, antes que o dinheiro caia na conta da empresa.',
      destaque: 'Revolução imediata no fluxo de caixa',
    },
  ]

  // Linha do tempo da transição 2026 - 2033
  const timelineTransition = [
    {
      ano: '2026',
      titulo: 'Ano de Teste & Alíquotas Simbólicas',
      fase: 'Início do teste nacional',
      detalhes: [
        'CBS começa a ser cobrada à alíquota de teste de 0,9%.',
        'IBS começa a ser cobrado à alíquota de teste de 0,1%.',
        'Os valores pagos de CBS e IBS serão compensados integralmente com o PIS/Cofins devido.',
        'Sem aumento de carga global no ano de teste: objetivo é calibrar sistemas de NF-e e o split payment.',
      ],
      alerta:
        'Empresas precisam atualizar sistemas ERP e testar a emissão com as novas tags da NF-e.',
    },
    {
      ano: '2027',
      titulo: 'Extinção de PIS/Cofins & Vigência Plena da CBS',
      fase: 'Corte do sistema federal antigo',
      detalhes: [
        'Extinção definitiva do PIS e da COFINS.',
        'Entrada em vigor da alíquota plena da CBS federal (estimada entre 8,5% e 9,5%).',
        'Entrada em vigor do Imposto Seletivo (IS).',
        'Alíquotas de IPI são zeradas para a quase totalidade dos produtos (mantido apenas para itens com similaridade na Zona Franca de Manaus).',
      ],
      alerta:
        'Primeiro grande choque na precificação: recálculo urgente de markups com CBS plena por fora.',
    },
    {
      ano: '2028',
      titulo: 'Calibração & Consolidação do Comitê Gestor',
      fase: 'Ajuste de arrecadação',
      detalhes: [
        'CBS opera em regime estável e Comitê Gestor do IBS valida algoritmos de partilha subnacional.',
        'Regras do split payment passam a operar em ampla escala no sistema bancário.',
        'Avaliação pelo Senado da alíquota de referência para preservar a neutralidade da carga total.',
      ],
      alerta: 'Monitoramento do fluxo de caixa operacional sob split payment bancário ativo.',
    },
    {
      ano: '2029 a 2032',
      titulo: 'Transição Gradual do ICMS e ISS para o IBS',
      fase: 'Convivência dos dois regimes',
      detalhes: [
        '2029: 90% do ICMS/ISS antigo + 10% do IBS novo.',
        '2030: 80% do ICMS/ISS antigo + 20% do IBS novo.',
        '2031: 70% do ICMS/ISS antigo + 30% do IBS novo.',
        '2032: 60% do ICMS/ISS antigo + 40% do IBS novo.',
      ],
      alerta:
        'Fase mais complexa da história tributária: 4 anos mantendo apurações paralelas em cada nota.',
    },
    {
      ano: '2033',
      titulo: 'Vigência Plena do Novo Sistema Tributário Nacional',
      fase: 'Regime definitivo concluído',
      detalhes: [
        'Extinção total e definitiva do ICMS e do ISS.',
        'IBS e CBS passam a operar com alíquotas plenas de equilíbrio (alíquota padrão estimada em ~26,5% a 27,9%).',
        'Princípio do destino 100% implementado em todo o território nacional.',
        'Transição federativa da partilha de receitas entre estados e municípios segue até 2077.',
      ],
      alerta:
        'Modelo unificado pleno com crédito financeiro amplo e fim da guerra fiscal regional.',
    },
  ]

  // Pontos Fortes (Vantagens)
  const pontosFortes = [
    {
      title: 'Simplificação radical: 5 tributos viram 1 modelo IVA Dual',
      desc: 'Elimina dezenas de legislações estaduais e mais de 5.500 códigos municipais concorrentes. O sistema passa a operar sob regras harmonizadas nacionalmente entre IBS e CBS.',
      impacto:
        'Redução drástica de horas gastas com burocracia contábil e obrigações acessórias redundantes.',
    },
    {
      title: 'Crédito financeiro integral e amplo em toda a cadeia',
      desc: 'Diferente do sistema atual (onde só itens físicos diretamente consumidos davam crédito restrito), o novo IVA permite creditar tudo o que a empresa compra para sua atividade, inclusive energia, aluguel, bens de capital, fretes e serviços terceirizados.',
      impacto:
        'Fim do efeito cascata (imposto sobre imposto) e desoneração imediata de investimentos produtivos.',
    },
    {
      title: 'Fim definitivo da guerra fiscal entre Estados',
      desc: 'Com a tributação migrando 100% para o destino (onde o bem ou serviço é consumido), governos estaduais não poderão conceder benefícios fiscais artificiais ou retenções que distorciam a concorrência.',
      impacto:
        'Segurança jurídica para abrir filiais e planejar logística sem medo de glosa de créditos fiscais.',
    },
    {
      title: 'Transparência cristalina: imposto calculado "por fora"',
      desc: 'No ICMS atual, a alíquota de 18% representa na prática mais de 21,95% porque incide sobre ela mesma (cálculo "por dentro"). No novo modelo, o preço da mercadoria é puro e o imposto é destacado claramente por fora.',
      impacto:
        'Clareza exata de custos para formação de preço e transparência total na nota fiscal ao consumidor.',
    },
    {
      title: 'Desoneração total das exportações brasileiras',
      desc: 'Exportações de bens e serviços serão 100% imunes de IBS e CBS, com ressarcimento rápido dos créditos acumulados na cadeia produtiva anterior em prazos estipulados por lei.',
      impacto:
        'Produtos industriais e do agronegócio brasileiro ganham competitividade no mercado internacional.',
    },
    {
      title: 'Redução massiva do contencioso e litígio tributário',
      desc: 'Hoje o Brasil possui mais de R$ 5 trilhões travados em disputas judiciais fiscais (quase 75% do PIB). A unificação de conceitos de bens e serviços acaba com a disputa eterna sobre "se é mercadoria (ICMS) ou serviço (ISS)".',
      impacto:
        'Menos despesas jurídicas, menos risco de autuações surpresa e previsibilidade para o balanço.',
    },
    {
      title: 'Mecanismo de Cashback social (CBS das Famílias)',
      desc: 'Devolução de parte do tributo para a população de baixa renda inscrita no Cadastro Único, garantindo justiça fiscal sem a necessidade de desfigurar a cadeia produtiva com isenções indiscriminadas.',
      impacto:
        'Fortalecimento do poder de compra popular sem gerar buracos de arrecadação na cadeia industrial.',
    },
  ]

  // Pontos Fracos (Desafios e Riscos)
  const pontosFracos = [
    {
      title: 'Carga tributária total NÃO diminui',
      desc: 'A Emenda Constitucional 132/2023 possui premissa explícita de neutralidade de arrecadação: o governo federal, estados e municípios não pretendem arrecadar menos de R$ 1 do que já arrecadam hoje.',
      alerta:
        'A reforma não é corte de impostos: quem hoje paga pouco (como serviços tributados pelo ISS) fatalmente pagará mais.',
    },
    {
      title: 'Alíquota padrão de referência elevada (~26,5% a 27,9%)',
      desc: 'Para compensar as inúmeras exceções concedidas a setores com desconto (saúde, educação, agronegócio e transporte), a alíquota geral brasileira será uma das maiores entre os mais de 170 países que usam IVA.',
      alerta:
        'Negócios que não conseguirem tomar crédito suficiente de compras sofrerão forte pressão de margem.',
    },
    {
      title: 'Impacto severo no setor de Serviços',
      desc: 'Hoje, a maioria das empresas de serviços recolhe ISS (de 2% a 5%) e PIS/Cofins cumulativo (3,65%), totalizando em torno de 8,65%. Sob o novo IVA com alíquota padrão próxima de 27%, como a maior despesa de serviços é a folha de salários (que não gera crédito de IBS/CBS), o aumento de tributação na ponta será significativo.',
      alerta:
        'Prestadores de serviços B2C (consumidor final) precisarão reprecificar ou enfrentar corrosão do lucro líquido.',
    },
    {
      title: 'Split Payment afeta diretamente o capital de giro',
      desc: 'A retenção imediata do imposto na liquidação bancária retira o "fôlego financeiro" que muitas empresas utilizavam entre a emissão da nota fiscal e o dia do recolhimento do tributo no mês seguinte.',
      alerta:
        'O caixa da empresa sentirá o impacto imediato da saída do imposto antes do recebimento líquido das vendas a prazo.',
    },
    {
      title: 'Complexidade de transição: 8 anos convivendo com dois sistemas',
      desc: 'Entre 2026 e 2033, as empresas brasileiras serão obrigadas a calcular, emitir notas e prestar declarações no sistema velho (ICMS, ISS, PIS, Cofins) e no novo (IBS, CBS e IS) simultaneamente.',
      alerta:
        'Aumento temporário de custos com softwares de gestão (ERP), contabilidade e treinamento de equipe fiscal.',
    },
    {
      title: 'Dilema do Simples Nacional nas vendas B2B',
      desc: 'O regime do Simples Nacional e do MEI foi constitucionalmente preservado. Porém, quando uma empresa do Simples vender para outra empresa do regime regular, o comprador só poderá aproveitar o crédito tributário correspondente ao que foi efetivamente recolhido no DAS (fatia muito menor do que o IBS/CBS cheio).',
      alerta:
        'Grandes indústrias e redes corporativas podem dar preferência a fornecedores do regime regular para obter crédito cheio.',
    },
    {
      title: 'Imposto Seletivo (IS) pode encarecer insumos específicos',
      desc: 'Embora criado para desestimular produtos nocivos, a definição ampla de bens prejudiciais à saúde ou ao meio ambiente gerou insegurança sobre bens minerais, combustíveis e insumos industriais.',
      alerta:
        'Risco de repasse de custos em cascata para cadeias automotivas, de logística pesada e bebidas.',
    },
  ]

  // O que a empresa precisa fazer agora
  const planoAcaoEmpresarial = [
    {
      numero: '01',
      titulo: 'Revisar a Formação de Preço e Recalcular o Markup',
      desc: 'O cálculo antigo de markup embutia tributos "por dentro" com regras restritas. No novo modelo "por fora", a matemática do markup divisor muda. É preciso simular margens de contribuição líquidas considerando a alíquota do IVA e a cesta de créditos de insumos.',
      linkServico: '/formacao-de-preco',
      nomeServico: 'Conheça o serviço de Formação de Preço da Borlim',
    },
    {
      numero: '02',
      titulo: 'Auditar a Cadeia de Fornecedores & Regime Tributário',
      desc: 'Mapear de quem sua empresa compra: fornecedores do Simples Nacional passarão a transferir menos crédito do que fornecedores do regime geral. Essa conta redefinirá contratos de fornecimento e parcerias comerciais estratégicas.',
      linkServico: '/planejamento-economico-financeiro',
      nomeServico: 'Avaliar no Planejamento Econômico-Financeiro',
    },
    {
      numero: '03',
      titulo: 'Planejar o Impacto do Split Payment no Capital de Giro',
      desc: 'Com o imposto retido na fonte no momento de cada liquidação bancária, os prazos médios de recebimento e de pagamento precisam ser recalculados para que a empresa não entre em cheque especial ou antecipação cara de duplicatas.',
      linkServico: '/planejamento-economico-financeiro',
      nomeServico: 'Simular Necessidade de Capital de Giro (NCG)',
    },
    {
      numero: '04',
      titulo: 'Acompanhar a Agenda de Vencimentos na Transição',
      desc: 'Durante os anos de convivência entre sistemas (2026 a 2032), o calendário de obrigações tributárias incluirá os DARFs numerados da DCTFWeb atuais somados às guias e retenções do Comitê Gestor do IBS.',
      linkServico: '/agenda-tributaria',
      nomeServico: 'Consultar a Agenda Tributária Mensal da Borlim',
    },
  ]

  // FAQs específicas da Reforma Tributária
  const faqsReforma = [
    {
      q: 'A Reforma Tributária vai diminuir os impostos que a minha empresa paga?',
      a: 'Em regra geral, NÃO. A Emenda Constitucional 132/2023 foi desenhada sob a premissa de manter a carga tributária global do país neutra em relação ao PIB. O objetivo é a simplificação estrutural, o fim da guerra fiscal e a transparência. Setores industriais que hoje sofrem com tributação cumulativa e restrição de créditos tendem a se beneficiar com custos mais baixos. Por outro lado, empresas de prestação de serviços (cuja folha salarial não gera créditos tributários) e itens sujeitos ao Imposto Seletivo sofrerão aumento de alíquota efetiva. O impacto real em cada CNPJ dependerá da proporção entre compras com crédito e faturamento bruto.',
    },
    {
      q: 'O Simples Nacional e o MEI vão acabar com a Reforma?',
      a: 'NÃO. O Simples Nacional (LC 123/2006) e o Microempreendedor Individual (MEI) continuam existindo exatamente com as mesmas faixas de faturamento e guia única DAS. No entanto, as empresas do Simples terão uma escolha opcional crucial: continuar recolhendo o IBS e a CBS dentro do DAS (transferindo crédito reduzido apenas do valor recolhido aos seus clientes) ou optar por recolher o IBS/CBS "por fora" no regime regular, permitindo transferir créditos cheios aos clientes empresariais (B2B). A Borlim avalia com os sócios qual opção maximiza a competitividade nas vendas.',
    },
    {
      q: 'O que é Split Payment e por que ele afeta tão fortemente o fluxo de caixa?',
      a: 'Split Payment é a tecnologia de cobrança em que, no momento exato em que o cliente paga a sua empresa (via Pix, cartão, boleto ou transferência bancária), o sistema financeiro separa automaticamente a parcela correspondente ao IBS e à CBS e a transfere diretamente para os cofres públicos. No modelo antigo, a empresa recebia 100% da venda no caixa e tinha até o dia 20 ou 25 do mês seguinte para recolher o tributo, usando esse saldo temporariamente como capital de giro. Com o split payment, esse fôlego financeiro desaparece, exigindo gestão rigorosa de fluxo de caixa e capital de giro próprio.',
    },
    {
      q: 'Preciso mudar os preços dos meus produtos ou serviços agora?',
      a: 'A vigência com alíquotas de teste começa em 2026 e a CBS federal passa a valer em 2027. Porém, a preparação deve começar imediatamente. Contratos de longo prazo, vendas parceladas, licitações públicas e renegociações com fornecedores já precisam prever cláusulas de reequilíbrio tributário. Além disso, o cálculo do markup deve ser reestruturado da lógica "por dentro" para a lógica "por fora", evitando surpresas e perdas de margem no primeiro dia de vigência das novas alíquotas.',
    },
    {
      q: 'O que acontece com os créditos de ICMS e PIS/Cofins que minha empresa já acumula hoje?',
      a: 'A lei complementar da Reforma estabelece regras de transição e homologação para saldos credores remanescentes de PIS/Cofins e ICMS acumulados sob o regime antigo. Os créditos de PIS/Cofins poderão ser compensados com a CBS ou ressarcidos. Já os saldos de ICMS homologados pelos estados serão compensados com o IBS em parcelas anuais ao longo do período de transição. Empresas que possuem créditos fiscais pendentes devem auditá-los e pleitear a homologação fiscal o quanto antes para não sofrerem perdas patrimoniais.',
    },
    {
      q: 'Qual é a diferença real entre IBS e CBS?',
      a: 'Ambos compõem o chamado IVA Dual brasileiro e possuem a mesma base de cálculo (o valor da operação de bens ou serviços). A diferença é federativa: a CBS (Contribuição sobre Bens e Serviços) é de competência EXCLUSIVA DA UNIÃO (substitui PIS e Cofins) e é recolhida pela Receita Federal. O IBS (Imposto sobre Bens e Serviços) é de competência COMPARTILHADA ENTRE ESTADOS E MUNICÍPIOS (substitui ICMS e ISS) e será gerido por um órgão público colegiado independente, o Comitê Gestor do IBS, que distribuirá a arrecadação conforme o destino de cada consumo.',
    },
    {
      q: 'Como a BORLIM Consultoria apoia as empresas durante toda a transição da Reforma?',
      a: 'A Borlim oferece suporte prático, econômico e gerencial de ponta a ponta: recalibramos a Formação de Preço para Vendas da sua empresa no novo modelo "por fora"; recalculamos as projeções de Lucro Mensal e Capital de Giro no Planejamento Econômico-Financeiro; monitoramos os 48 indicadores financeiros para prevenir problemas de liquidez gerados pelo split payment; e orientamos a governança dos vencimentos na transição por meio da nossa Agenda Tributária Mensal. De empresário para empresário, garantimos que sua empresa atravesse a transição fortalecida e protegida.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO INSTITUCIONAL (Fintech Regulatory Architecture) */}
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
              <Landmark className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especial Regulatório & Tributário — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Reforma Tributária Brasileira
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Guia executivo completo sobre o IVA Dual (IBS e CBS), Imposto Seletivo e Split
              Payment: pontos fortes, desafios reais e os impactos diretos na gestão do seu negócio.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Instituída pela <strong>Emenda Constitucional 132/2023</strong> e regulamentada pela{' '}
              <strong>Lei Complementar 214/2025</strong>, a Reforma Tributária representa a maior
              reestruturação fiscal do Brasil em mais de cinco décadas. Cinco tributos históricos (
              <strong>PIS, COFINS, IPI, ICMS e ISS</strong>) dão lugar a um sistema moderno de{' '}
              <strong>Imposto sobre Valor Agregado Dual (IBS e CBS)</strong> com tributação no
              destino, cálculo &ldquo;por fora&rdquo; e retenção automática via split payment.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-3xl">
              Na <strong>BORLIM Consultoria Empresarial</strong>, analisamos essas mudanças de
              empresário para empresário: sem jargões jurídicos desnecessários, com foco na proteção
              da margem de lucro, na revisão do markup de venda, na sustentabilidade do capital de
              giro e na conexão com os nossos <strong>48 indicadores econômico-financeiros</strong>.
            </p>

            {/* CTAs Oficiais do Hero */}
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

              <a
                href="mailto:flavio@borlim.com.br?subject=D%C3%BAvidas%20sobre%20Reforma%20Tribut%C3%A1ria%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>

              <a
                href="#formas-de-tributacao"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Scale className="w-4 h-4 text-[#22C55E]" />
                <span>Comparar 3 Formas de Tributação</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO & POSICIONAMENTO ESTRATÉGICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-stone-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Diagnóstico Estratégico Borlim
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                &ldquo;A Reforma Tributária não reduz a carga total de impostos do Brasil: ela
                redistribui o peso da arrecadação. Quem não reprecificar tecnicamente e não
                controlar o fluxo de caixa sob o split payment pagará a conta da
                concorrência.&rdquo;
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                A transição entre 2026 e 2033 exigirá que sua empresa conviva com dois sistemas
                tributários simultâneos por oito anos. Entender com antecedência a mecânica do
                crédito integral, o impacto no Simples Nacional e a nova matemática de markup é a
                única forma de defender as margens de contribuição e manter a empresa
                financeiramente saudável.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#E5EDF5]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Orientação Técnica Especializada
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

      {/* 3. O QUE MUDA: DE 5 TRIBUTOS PARA O NOVO MODELO (IVA DUAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Estrutura da Transformação
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            O Que Muda: Da Complexidade Histórica ao IVA Dual
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Cinco tributos cumulativos e com legislações pulverizadas são gradativamente extintos,
            dando lugar a três novos tributos e a um novo modelo financeiro de recolhimento.
          </p>
        </div>

        {/* Tabela Comparativa de Extinção */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 bg-[#082852] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="w-5 h-5 text-[#22C55E]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Os 5 Tributos Extintos e Seu Destino no Novo Sistema
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono font-bold bg-[#16A34A] text-white px-3 py-1 rounded">
              EC 132/2023 & LC 214/2025
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {tributosSubstituidos.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="w-20 sm:w-24 font-mono text-base sm:text-lg font-bold text-[#082852] shrink-0">
                    {item.antigo}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-800 font-sans">
                        {item.nomeAntigo}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${item.corEsfera}`}
                      >
                        {item.esfera}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:text-right flex items-center md:justify-end gap-2 text-xs sm:text-sm">
                  <ArrowRight className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="font-sans font-semibold text-[#082852]">{item.destino}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Os 4 Novos Pilares Técnicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {novosPilares.map((pilar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-bold text-[#0B3B7A] tracking-wider">
                    {pilar.sigla}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200">
                    {pilar.esfera}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#082852] mb-2 leading-snug">
                  {pilar.nome}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                  {pilar.descricao}
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-mono text-[#15803D] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>{pilar.destaque}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LINHA DO TEMPO DA TRANSIÇÃO (2026 - 2033) */}
      <section className="bg-white py-16 sm:py-24 border-y border-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Cronograma Oficial da Transição
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Linha do Tempo da Reforma: 2026 a 2033
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              A transição foi desenhada em etapas graduais para permitir a adaptação dos sistemas de
              emissão de notas, calibração das alíquotas pelo Senado e sustentação das finanças de
              estados e municípios.
            </p>
          </div>

          {/* Navegação por Tabs de Anos */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
            {timelineTransition.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTransitionTab(idx)}
                className={`py-3 px-3 rounded-xl text-center transition-all border ${
                  activeTransitionTab === idx
                    ? 'bg-[#082852] text-white border-[#082852] shadow-md'
                    : 'bg-[#F0F4F8]/70 hover:bg-stone-200/80 text-slate-700 border-stone-200'
                }`}
              >
                <span className="font-mono text-base sm:text-lg font-bold block">{step.ano}</span>
                <span
                  className={`text-[10px] font-sans truncate block mt-0.5 ${
                    activeTransitionTab === idx ? 'text-emerald-300' : 'text-slate-500'
                  }`}
                >
                  {step.fase}
                </span>
              </button>
            ))}
          </div>

          {/* Painel do Ano Ativo */}
          {(() => {
            const currentStep = timelineTransition[activeTransitionTab]
            return (
              <div className="bg-[#F0F4F8]/50 p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm animate-in fade-in-50 duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#082852] text-[#22C55E] flex items-center justify-center font-mono text-xl font-bold shadow-md shrink-0">
                      {currentStep.ano}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#15803D] font-bold">
                        {currentStep.fase}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                        {currentStep.titulo}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-stone-200 self-start md:self-auto">
                    <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Fase {activeTransitionTab + 1} de 5</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-700">
                      Principais Marcos e Alterações no Ano:
                    </h4>
                    <ul className="space-y-2.5">
                      {currentStep.detalhes.map((det, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{det}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-amber-200 shadow-xs">
                    <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-bold uppercase mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Atenção do Empresário</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {currentStep.alerta}
                    </p>
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <Link
                        to="/agenda-tributaria"
                        className="text-xs font-mono font-bold text-[#0B3B7A] hover:text-[#16A34A] flex items-center gap-1 transition-colors"
                      >
                        <span>Acompanhar na Agenda Tributária</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* 4.5. NOVA SEÇÃO: AS 3 FORMAS DE TRIBUTAÇÃO (SIMPLES, PRESUMIDO, REAL) */}
      <FormasDeTributacaoSection />

      {/* 5. ANÁLISE COMPARATIVA: PONTOS FORTES vs PONTOS FRACOS (DESAFIOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Balanço Crítico e Realista
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Pontos Fortes e Pontos Fracos das Mudanças
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Sem viés político ou ilusões: uma radiografia técnica e honesta dos ganhos operacionais
            e dos riscos financeiros que a nova legislação impõe sobre as empresas brasileiras.
          </p>

          {/* Filtro Rápido */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-xl mt-6">
            <button
              type="button"
              onClick={() => setActiveImpactFilter('todos')}
              className={`px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeImpactFilter === 'todos'
                  ? 'bg-[#082852] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#082852]'
              }`}
            >
              Todos ({pontosFortes.length + pontosFracos.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveImpactFilter('vantagens')}
              className={`px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeImpactFilter === 'vantagens'
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#16A34A]'
              }`}
            >
              Vantagens ({pontosFortes.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveImpactFilter('desafios')}
              className={`px-4 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                activeImpactFilter === 'desafios'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-amber-700'
              }`}
            >
              Desafios & Riscos ({pontosFracos.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Coluna 1: Pontos Fortes (Vantagens) */}
          {(activeImpactFilter === 'todos' || activeImpactFilter === 'vantagens') && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#15803D] font-mono text-xs font-bold uppercase">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  <span>Pontos Fortes (Ganhos Estruturais)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#16A34A] text-white">
                  {pontosFortes.length} Vantagens
                </span>
              </div>

              <div className="space-y-3.5">
                {pontosFortes.map((ponto, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-[#16A34A] transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-emerald-100 text-[#16A34A] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          {ponto.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          {ponto.desc}
                        </p>
                        <div className="pt-2 text-xs font-sans text-[#15803D] font-medium flex items-center gap-1">
                          <span className="font-mono font-bold">Impacto real:</span>
                          <span>{ponto.impacto}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coluna 2: Pontos Fracos (Desafios e Riscos) */}
          {(activeImpactFilter === 'todos' || activeImpactFilter === 'desafios') && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 font-mono text-xs font-bold uppercase">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Pontos Fracos (Desafios & Riscos Críticos)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                  {pontosFracos.length} Desafios
                </span>
              </div>

              <div className="space-y-3.5">
                {pontosFracos.map((ponto, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-serif text-base font-bold text-[#082852]">
                          {ponto.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          {ponto.desc}
                        </p>
                        <div className="pt-2 text-xs font-sans text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60 leading-snug">
                          <strong className="font-mono uppercase text-[10px] block text-amber-900 mb-0.5">
                            Ponto de Atenção:
                          </strong>
                          {ponto.alerta}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. O QUE SUA EMPRESA PRECISA FAZER AGORA (PLANO DE AÇÃO) */}
      <section className="bg-white py-16 sm:py-24 border-y border-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Plano de Ação Executivo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              O Que o Empresário Precisa Fazer Agora
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Esperar o ano de 2026 para agir é o erro mais caro que uma empresa pode cometer. Estas
              são as quatro frentes imediatas de trabalho recomendadas pela consultoria da Borlim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planoAcaoEmpresarial.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F0F4F8]/60 p-7 rounded-2xl border border-stone-200 flex flex-col justify-between hover:border-[#16A34A] transition-all group"
              >
                <div>
                  <span className="font-mono text-3xl font-bold text-[#16A34A] block mb-3 group-hover:scale-105 transition-transform">
                    {item.numero}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#082852] mb-3 leading-snug">
                    {item.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <Link
                    to={item.linkServico}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B3B7A] hover:text-[#16A34A] transition-colors group-hover:translate-x-1 duration-150"
                  >
                    <span>{item.nomeServico}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#16A34A]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMO A BORLIM PODE AJUDAR (SINERGIA COM OS SERVIÇOS REAIS DO PORTAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Sinergia Integrada BORLIM
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Como a Consultoria Borlim Prepara o Seu Negócio
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Apoiamos sua diretoria através dos nossos serviços consolidados de consultoria
            econômica, garantindo que cada decisão tributária fortaleça o lucro líquido e a liquidez
            da empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Formação de Preço */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Tag className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Recálculo de Markup
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Formação de Preço para Vendas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                Adequação do modelo de markup divisor para o cálculo tributário &ldquo;por
                fora&rdquo; do IBS e da CBS. Simuladores sob medida para Indústria, Comércio e
                Serviços com auditoria de margem de contribuição.
              </p>
            </div>
            <Link
              to="/formacao-de-preco"
              className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg bg-[#F0F4F8] hover:bg-[#16A34A] text-[#082852] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Acessar Formação de Preço</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Planejamento Econômico-Financeiro */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Foco no Lucro Mensal
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Planejamento Econômico e Financeiro
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                Simulações de DRE gerencial, diagnóstico dos nossos 48 indicadores e projeção da
                Necessidade de Capital de Giro (NCG) sob as retenções automáticas do split payment
                bancário.
              </p>
            </div>
            <Link
              to="/planejamento"
              className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg bg-[#F0F4F8] hover:bg-[#16A34A] text-[#082852] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Acessar Planejamento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Agenda Tributária Mensal */}
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
                <CalendarDays className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 mb-3 inline-block">
                Controle de Vencimentos
              </span>
              <h3 className="font-serif text-xl font-bold text-[#082852] mb-3">
                Agenda Tributária Mensal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6">
                Acompanhamento mensal com as regras de vencimento dos tributos do regime atual (DAS,
                DCTFWeb, PIS/Cofins, IRPJ/CSLL, ICMS e ISS) enquanto os prazos da nova transição
                entram em vigor.
              </p>
            </div>
            <Link
              to="/agenda-tributaria"
              className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-lg bg-[#F0F4F8] hover:bg-[#16A34A] text-[#082852] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Acessar Agenda Tributária</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ EM ACORDEÃO — DÚVIDAS REAIS DE EMPRESÁRIOS */}
      <section className="bg-white py-16 sm:py-24 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Esclarecimentos Práticos
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre a Reforma Tributária
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-sans">
              Respostas diretas e sem juridiquês para as principais dúvidas dos empresários e
              gestores financeiros.
            </p>
          </div>

          <div className="space-y-3">
            {faqsReforma.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-[#F0F4F8]/40 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#082852]">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#16A34A] text-white rotate-180'
                          : 'bg-stone-200 text-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans border-t border-stone-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. SEÇÃO INSTITUCIONAL FINAL COM CTAs OFICIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Consultoria Econômica & Governança Fiscal
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Prepare a sua empresa para a Reforma Tributária com a BORLIM Consultoria.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o nosso economista para diagnosticar a estrutura de custos
                do seu negócio, recalcular o markup de venda no modelo IVA Dual e planejar a
                sustentabilidade do seu capital de giro durante toda a transição 2026–2033.
              </p>

              <div className="space-y-3 font-mono text-xs pt-2">
                <a
                  href="mailto:flavio@borlim.com.br"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    flavio@borlim.com.br
                  </span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-[#22C55E] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span className="font-bold underline underline-offset-4 decoration-[#16A34A]/60">
                    (17) 99765-0672 (WhatsApp)
                  </span>
                </a>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <Building2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>BORLIM Consultoria Empresarial Ltda. — São Paulo / SP</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0B3B7A] p-8 sm:p-10 rounded-2xl border border-slate-700 text-center shadow-inner">
              <div className="bg-white p-4 rounded-2xl border border-white/20 shadow-lg mb-4 w-full max-w-[260px] flex items-center justify-center">
                <img
                  src={logoBorlim}
                  alt="BORLIM Consultoria Empresarial"
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>

              <h3 className="font-serif text-lg font-bold text-white">
                Inteligência Tributária & Gestão
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Acesse o nosso sistema completo ou converse com o especialista.
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
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Falar no WhatsApp (17) 99765-0672</span>
                </a>

                <Link
                  to="/agenda-tributaria"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all border border-white/20"
                >
                  <span>Ver Agenda Tributária Mensal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
