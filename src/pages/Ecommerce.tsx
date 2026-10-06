import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  Store,
  Truck,
  Percent,
  CreditCard,
  Package,
  RotateCcw,
  Boxes,
  AlertTriangle,
  CheckCircle2,
  Check,
  ArrowRight,
  Phone,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  Layers,
  DollarSign,
  TrendingUp,
  Tag,
  Scale,
  CalendarDays,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Calculator,
  SearchCheck,
  Zap,
  Info,
  Megaphone,
  MousePointerClick,
  Target,
  BarChart3,
  Flame,
  XCircle,
} from 'lucide-react'
import logoBorlim from '@/assets/logo-borlim-debb0.png'

export default function Ecommerce() {
  const [activeTab, setActiveTab] = useState<
    'comissao' | 'pagamento' | 'frete' | 'impostos' | 'resultado'
  >('comissao')
  const [activeAdsTab, setActiveAdsTab] = useState<
    'cpc' | 'roas_acos' | 'comissao_extra' | 'leilao'
  >('cpc')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20a%20consultoria%20para%20E-commerce%20da%20minha%20empresa.'

  // 1. Pilares da Metodologia Borlim para E-commerce
  const borlimPillars = [
    {
      icon: DollarSign,
      badge: 'Margem & Precificação Real',
      title: 'Markup Reverso & Custo Efetivo de Venda',
      desc: 'No e-commerce, cada canal tem comissões, taxas fixas por item, desconto de antecipação de cartão e frete grátis compulsório. Calculamos o markup seguro para você saber exatamente quanto sobra no bolso antes de publicar qualquer anúncio.',
    },
    {
      icon: Clock,
      badge: 'Fluxo de Caixa & Ciclo',
      title: 'Ciclo Financeiro do Marketplace',
      desc: 'O cliente passa o cartão em 12 vezes e você paga o fornecedor em 28 dias. Auditamos o ciclo de liberação dos marketplaces (D+14, D+30 ou liberação pós-entrega) e calculamos a Necessidade de Capital de Giro (NCG) para que o crescimento não quebre seu caixa.',
    },
    {
      icon: ShieldCheck,
      badge: 'Diagnóstico 360° & Solvência',
      title: '48 Indicadores & Insolvência em 12 Meses',
      desc: 'Aplicamos o diagnóstico financeiro completo da Borlim nas operações online e físicas: liquidez, giro de estoque, custo do FULL parado e teste preventivo de insolvência imediata e em 12 meses, garantindo que o volume de pedidos se converta em patrimônio real.',
    },
  ]

  // 2. Como Funciona o E-commerce: Etapas e Mecânica Operacional
  const ecommerceSteps = [
    {
      icon: Store,
      step: '01',
      title: 'Loja Própria vs. Marketplace',
      subtitle: 'Onde o seu cliente encontra seu produto',
      desc: 'No marketplace (Mercado Livre, Amazon, Shopee), você aproveita milhões de compradores já navegando e paga comissão sobre cada venda concretizada. Na loja própria (Nuvemshop, Shopify), você paga uma mensalidade fixa de software e não paga comissão de canal, mas é 100% responsável por atrair o público por meio de anúncios e redes sociais.',
    },
    {
      icon: Package,
      step: '02',
      title: 'Catálogo, Estoque & Sincronização',
      subtitle: 'O coração do inventário em múltiplos canais',
      desc: 'Cada produto requer anúncio otimizado, código EAN/GTIN, tributação configurada (NCM) e fotos de alta conversão. Um erro frequente de pequenas empresas é vender o mesmo item simultaneamente no balcão físico e no marketplace sem um ERP integrador com sincronização em tempo real, gerando cancelamento de pedidos e penalidades na conta.',
    },
    {
      icon: CreditCard,
      step: '03',
      title: 'Pedido, Checkout & Meios de Pagamento',
      subtitle: 'A liquidação financeira da transação',
      desc: 'No checkout, o cliente escolhe pagar via Cartão de Crédito (com taxa da operadora de ~3,0% a 5,0% e prazo de liberação), PIX (taxa menor de ~0,99% e dinheiro na hora) ou Boleto Bancário. O intermediador de pagamento também faz análise de risco anti-fraude antes de aprovar a transação.',
    },
    {
      icon: Truck,
      step: '04',
      title: 'Logística de Despacho & Etiquetas',
      subtitle: 'Da embalagem ao centro de triagem da transportadora',
      desc: 'Aprovado o pagamento e emitida a Nota Fiscal Eletrônica (NF-e), gera-se a etiqueta de envio com código de rastreamento. As plataformas exigem despacho no mesmo dia ou em até 24 horas úteis para manter a reputação verde e a exposição dos anúncios nos primeiros lugares da busca.',
    },
    {
      icon: RotateCcw,
      step: '05',
      title: 'Pós-Venda, Garantia & Devoluções',
      subtitle: 'O Código de Defesa do Consumidor na internet',
      desc: 'Pelo artigo 49 do CDC brasileiro, o consumidor tem o Direito de Arrependimento: até 7 dias corridos após o recebimento para devolver o produto sem justificativa, com frete reverso obrigatório pago pelo lojista. Em marketplaces, taxas de devolução de 3% a 8% são rotineiras e precisam estar embutidas na planilha de custos.',
    },
    {
      icon: DollarSign,
      step: '06',
      title: 'Margem Líquida Real no Bolso',
      subtitle: 'A sobra que decide a sobrevivência do negócio',
      desc: 'Faturamento de e-commerce é uma métrica de vaidade; margem líquida é métrica de sobrevivência. Deduzidas a mercadoria (CMV), comissão do canal, taxa de gateway, frete, devoluções previstas e os impostos da NF-e, a margem líquida saudável costuma oscilar entre 8% e 18%. Vender muito sem calcular isso é trabalhar para os marketplaces.',
    },
  ]

  // 3. Ranking das Plataformas de Vendas no Brasil
  const platformRanking = [
    {
      rank: 1,
      name: 'Mercado Livre',
      type: 'Marketplace',
      typeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      commission: '11% a 19%',
      extraCosts:
        'Frete grátis compulsório p/ itens > R$ 79 (~R$ 15 a R$ 35) + taxa fixa de ~R$ 6,00 a R$ 6,50 para itens < R$ 79',
      idealFor:
        'Maior tráfego do Brasil; essencial para produtos de giro rápido, autopeças, casa, eletrônicos e moda.',
      pros: 'Volume gigantesco de compradores, ecossistema Mercado Envios/FULL com entrega no mesmo dia ou dia seguinte.',
      cons: 'Comissões altas no plano Premium (até ~19%), exigência severa de reputação e concorrência direta de preços.',
      score: '9.5 / 10',
    },
    {
      rank: 2,
      name: 'Amazon Brasil',
      type: 'Marketplace',
      typeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      commission: '8% a 15%',
      extraCosts:
        'Plano Profissional R$ 19,00/mês (ou taxa por item no individual) + tarifas de FBA/Logística da Amazon',
      idealFor:
        'Livros, eletrônicos, informática, ferramentas, suplementos e produtos de marca com código EAN.',
      pros: 'Comissões médias competitivas (~11% a 13%), base Prime qualificada e programa FBA (Fulfillment by Amazon) de alta conversão.',
      cons: 'Rigor extremo no Buy Box, regras rígidas de catálogo e políticas pró-consumidor com devoluções facilitadas.',
      score: '9.2 / 10',
    },
    {
      rank: 3,
      name: 'Nuvemshop',
      type: 'Loja Própria',
      typeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      commission: '0% com Nuvem Pago',
      extraCosts:
        'Mensalidade de R$ 0 a R$ 99-299/mês dependendo do plano + taxas de pagamento de cartão/PIX (~3% a 4%)',
      idealFor:
        'Pequenos e médios negócios que desejam marca própria, fidelização direta de clientes e margem livre de comissões.',
      pros: 'Plataforma brasileira líder, sem comissão por venda ao usar Nuvem Pago, integração nativa com Correios, Melhor Envio e ERPs.',
      cons: 'Você precisa gerar 100% do tráfego (investir em Instagram, Google Ads, SEO e influenciadores).',
      score: '9.0 / 10',
    },
    {
      rank: 4,
      name: 'Shopee',
      type: 'Marketplace',
      typeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      commission: '14% (ou 20% com Frete Grátis Extra)',
      extraCosts:
        'Taxa fixa por item de R$ 4,00 a R$ 4,50 + limite máximo de comissão por unidade (~R$ 105)',
      idealFor:
        'Produtos de ticket médio baixo a médio (R$ 20 a R$ 150), utilidades, moda, cosméticos e importados.',
      pros: 'Apelo massivo a cupons e frete grátis subsidiado pela plataforma, aplicativo com maior tempo de retenção do usuário.',
      cons: 'Guerra de preços acirrada, comissão total subiu para ~20% no programa de frete e margens unitárias mais apertadas.',
      score: '8.8 / 10',
    },
    {
      rank: 5,
      name: 'Magazine Luiza (Magalu)',
      type: 'Marketplace',
      typeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      commission: '12% a 16%',
      extraCosts:
        'Coparticipação em frete + antecipação de recebíveis no MagaluPay + taxa fixa em itens de valor baixo',
      idealFor:
        'Eletrodomésticos, móveis, telefonia, ferramentas, itens para o lar e público das classes B, C e D.',
      pros: 'Rede física de centenas de lojas que servem como ponto de retirada/devolução (Retira na Loja) e forte presença nacional.',
      cons: 'Painel do lojista menos intuitivo que Mercado Livre, suporte comercial burocrático e taxas de repasse financeiro.',
      score: '8.4 / 10',
    },
    {
      rank: 6,
      name: 'Shopify',
      type: 'Loja Própria',
      typeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      commission: '0% a 2% (taxa de gateway externo)',
      extraCosts:
        'Mensalidade internacional de US$ 29 a US$ 39/mês (cobrada em dólar) + aplicativos pagos + taxas de checkout',
      idealFor:
        'Marcas consolidadas com foco em design refinado, vendas internacionais ou escala global com tecnologia de ponta.',
      pros: 'Melhor ecossistema de checkout do mundo, alta velocidade, estabilidade inquestionável e milhares de integrações.',
      cons: 'Custo mensal atrelado à oscilação do dólar, necessita de gateway de pagamento brasileiro integrado e tráfego próprio.',
      score: '8.3 / 10',
    },
    {
      rank: 7,
      name: 'Loja Integrada / Tray',
      type: 'Loja Própria',
      typeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      commission: '0% sobre as vendas',
      extraCosts:
        'Planos a partir de R$ 59 a R$ 249/mês + taxas de gateway de pagamento local + temas visuais',
      idealFor:
        'Lojistas brasileiros que buscam facilidade de suporte nacional em português e integração pronta com marketplaces.',
      pros: 'Tray se destaca pela integração nativa (hub de marketplaces) para vender na loja e no Mercado Livre simultaneamente.',
      cons: 'Limitação de pageviews ou produtos cadastrados nos planos de entrada; layouts avançados exigem compra à parte.',
      score: '8.0 / 10',
    },
    {
      rank: 8,
      name: 'Shein & TikTok Shop',
      type: 'Marketplace Emergente',
      typeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      commission: '8% a 16% (comissões promocionais de entrada)',
      extraCosts:
        'Campanhas obrigatórias de desconto + exigência de prazos de expedição agressivos',
      idealFor:
        'Vestuário, calçados, bolsas, acessórios de moda feminina e produtos virais com demonstração em vídeo.',
      pros: 'Crescimento explosivo entre o público jovem, taxas de entrada atrativas para cadastrar vendedores nacionais.',
      cons: 'Exigência extrema de preço baixo, suporte operacional ainda em amadurecimento no Brasil e dependência de algoritmos.',
      score: '7.8 / 10',
    },
    {
      rank: 9,
      name: 'Americanas / Via (Casas Bahia)',
      type: 'Marketplace Tradicional',
      typeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      commission: '13% a 18%',
      extraCosts: 'Tarifa fixa de envio + comissão financeira sobre repasse parcelado',
      idealFor:
        'Distribuidoras e marcas consolidadas buscando canais secundários de desova de estoque.',
      pros: 'Marca ainda reconhecida pelo grande público consumidor em categorias de móveis e eletro.',
      cons: 'Recuperação judicial e reestruturações reduziram sensivelmente o volume de tráfego orgânico e a pontualidade.',
      score: '6.8 / 10',
    },
  ]

  // 4. Os 5 Erros Clássicos do Vendedor de E-commerce
  const classicMistakes = [
    {
      num: '01',
      title: 'Copiar o preço do concorrente sem saber a estrutura de custos',
      desc: 'O erro mais comum: ver um concorrente vendendo a R$ 149,00 e colocar o anúncio a R$ 145,00 para "ganhar o Buy Box". Muitas vezes o concorrente tem regime tributário diferente (Lucro Real com crédito de PIS/Cofins), compra de fábrica com lote 10x maior ou pior: está quebrando sem saber.',
      solucao:
        'Como a Borlim resolve: Montamos a planilha de Markup Reverso por SKU, definindo o preço mínimo inegociável para garantir sua margem líquida real.',
    },
    {
      num: '02',
      title: 'Ignorar a taxa de devolução e frete reverso na precificação',
      desc: 'No e-commerce, o cliente compra 3 pares de sapato para escolher um e devolve dois. Em categorias como vestuário e calçados, a taxa de devolução pode atingir 15% a 25%. Quem não embutir a provisão de frete reverso no preço unitário consome todo o lucro das vendas boas.',
      solucao:
        'Como a Borlim resolve: Dimensionamos o percentual histórico de devoluções no CMV e na DRE Gerencial, criando uma provisão técnica por família de produtos.',
    },
    {
      num: '03',
      title: 'Estocar produtos de baixo giro no FULL e pagar tarifa de armazenagem prolongada',
      desc: 'Mandar 300 unidades de um item que vende 5 peças por mês para o centro de distribuição FULL do Mercado Livre ou FBA da Amazon. Após 60 ou 90 dias sem giro, a plataforma cobra tarifa diária de ocupação por metro cúbico, que destrói a margem do produto.',
      solucao:
        'Como a Borlim resolve: Calculamos o lote econômico de envio (EOQ) e o giro ideal de 30 a 45 dias para abastecer o FULL com rotação perfeita.',
    },
    {
      num: '04',
      title: 'Descuidar da reputação do canal e sofrer bloqueio repentino',
      desc: 'Atrasar envios na segunda-feira ou ter reclamações de compradores sem resposta em 24h joga a reputação do Mercado Livre para a faixa amarela ou vermelha. O algoritmo desce seus anúncios na busca e o faturamento desaba 80% do dia para a noite.',
      solucao:
        'Como a Borlim resolve: Integramos o Balanced Scorecard (BSC) com indicadores de nível de serviço logístico (SLA), cancelamento e tempo de resposta.',
    },
    {
      num: '05',
      title: 'Misturar o caixa da loja física com o caixa das vendas online',
      desc: 'Usar o recebimento das vendas de balcão para cobrir o rombo de capital de giro do e-commerce, ou vice-versa. Por ter ciclos financeiros totalmente distintos, a empresa perde a rastreabilidade do lucro real de cada operação.',
      solucao:
        'Como a Borlim resolve: Segregação de centros de custo e fluxo de caixa independente para o e-commerce, com apuração mensal de rentabilidade por canal.',
    },
  ]

  // 5. Perguntas Frequentes (FAQ)
  const faqs = [
    {
      q: 'Quanto devo gastar em ADS nas plataformas e qual o limite saudável?',
      a: 'A regra de ouro ensinada pela Borlim é: o ACOS máximo tolerável (Target ACOS) é rigorosamente igual à margem de contribuição líquida que o produto teria sem anúncio. Se após pagar a mercadoria (CMV), comissão do marketplace, frete compulsório e impostos sobrarem 22% do preço de venda, você NUNCA pode operar com ACOS acima de 22% de forma sustentada — caso contrário, estará pagando do próprio bolso para vender. Para produtos maduros, recomendamos manter o ACOS entre 8% e 15%, preservando de 7% a 14% de margem no bolso. Já em lançamentos estratégicos, aceita-se temporariamente empatar (ACOS = margem de contribuição) durante 15 a 30 dias apenas para conquistar as primeiras vendas, avaliações 5 estrelas e tracionar o algoritmo orgânico.',
    },
    {
      q: 'Qual a diferença entre CPC, ROAS e ACOS no Mercado Ads e Amazon Ads?',
      a: 'O CPC (Custo por Clique) é a moeda do leilão: quanto a plataforma desconta do seu saldo toda vez que um comprador clica no seu anúncio patrocinado (geralmente entre R$ 0,35 e R$ 2,50). O ROAS (Return On Advertising Spend) mede o multiplicador de receita gerada por real gasto (ex.: gastou R$ 100 e faturou R$ 500 = ROAS 5,0x). Já o ACOS (Advertising Cost of Sales) é exatamente o inverso percentual do ROAS e a métrica favorita da gestão financeira: representa quanto da receita da venda foi consumida pelo anúncio (no mesmo exemplo, R$ 100 ÷ R$ 500 = 20% de ACOS). No Mercado Ads chama-se ACOS objetivo; na Amazon Ads é o ACOS padrão da campanha.',
    },
    {
      q: 'Vale a pena começar vendendo no marketplace ou montando loja própria?',
      a: 'Para quem está começando, o marketplace (Mercado Livre, Amazon, Shopee) é o caminho mais rápido para validar o produto e gerar as primeiras vendas, porque o público já está lá comprando todos os dias — você não precisa gastar rios de dinheiro em anúncios no Google ou Instagram. Por outro lado, a longo prazo, depender 100% de marketplaces deixa o empresário refém de aumentos de comissão e bloqueios de conta. A recomendação da Borlim é um modelo híbrido: usar os marketplaces para capturar clientes e gerar caixa de curto prazo, enquanto constrói sua loja própria (como na Nuvemshop ou Shopify) para criar marca própria, recomprar com custo zero de comissão e preservar margens elevadas.',
    },
    {
      q: 'Quanto sobra de margem líquida real de uma venda no e-commerce?',
      a: 'A margem líquida saudável no e-commerce brasileiro costuma oscilar entre 8% e 18% da receita bruta. Uma venda de R$ 200,00 onde o custo da mercadoria é R$ 85,00, a comissão do canal é R$ 26,00 (13%), a taxa do cartão/gateway é R$ 6,00 (3%), o frete ou coparticipação é R$ 18,00, a provisão de devoluções é R$ 6,00 (3%) e o Simples Nacional consome R$ 18,00 (9%), deixa limpo no caixa aproximadamente R$ 41,00 (20,5% de margem de contribuição). Se deduzirmos os custos fixos da empresa (aluguel, equipe, software ERP), sobram entre R$ 20,00 e R$ 30,00 de lucro líquido real. Quem acha que colocar 100% de markup (dobrar o custo) é suficiente costuma ter prejuízo se não fizer a conta de trás para frente.',
    },
    {
      q: 'O que é o FULL e quando vale a pena aderir?',
      a: 'O FULL (Fulfillment) é o serviço onde você despacha seus produtos em lotes para os armazéns da plataforma (como o Mercado Livre FULL ou a Amazon FBA). A partir daí, a plataforma cuida de todo o processo operacional: estocagem, separação (picking), embalagem (packing), expedição ultrarrápida (geralmente com entrega no dia seguinte ou em até 24h) e gestão de devoluções. Vale muito a pena para produtos de ALTO GIRO, peso e volume padronizados, pois o selo FULL melhora radicalmente a taxa de conversão do anúncio e ganha prioridade no algoritmo. Contudo, NÃO vale a pena para produtos de giro lento, pois a cobrança de taxa de armazenagem por volume e o risco de estoque parado consomem a margem.',
    },
    {
      q: 'Quem paga o frete grátis nos marketplaces?',
      a: 'O frete grátis NUNCA é grátis para quem vende: quem paga é o próprio vendedor (lojista), com possíveis descontos graduais concedidos pela plataforma conforme sua reputação. No Mercado Livre, por exemplo, para produtos acima de R$ 79,00, o frete grátis é obrigatório para o comprador, e o valor do frete é descontado diretamente do saldo do lojista (com descontos de 40% a 50% para vendedores com reputação verde). Se o lojista não embutir esse custo fixo no preço de venda do anúncio, ele estará pagando para o cliente receber o pacote.',
    },
    {
      q: 'Preciso ter CNPJ para vender online profissionalmente?',
      a: 'Sim, a formalização é indispensável para construir um negócio viável. Embora algumas plataformas permitam cadastro inicial de Pessoa Física (CPF), há limites severos de faturamento mensal (geralmente até ~R$ 12.000/ano no ML), os anúncios têm menos relevância e os programas de logística avançada (FULL, coleta diária e parcerias com transportadoras) exigem emissão obrigatória de Nota Fiscal Eletrônica (NF-e). Além disso, operar com CPF faz o empresário cair nas alíquotas do Imposto de Renda Pessoa Física (até 27,5%), enquanto no CNPJ (como Simples Nacional) a tributação inicial sobre o comércio começa em 4,0%.',
    },
    {
      q: 'Qual a melhor plataforma para o pequeno empresário começar?',
      a: 'Depende da categoria e do tíquete médio. Se você vende produtos físicos de consumo geral, autopeças, bazar ou ferramentas com ticket entre R$ 50 e R$ 400, o Mercado Livre é a porta de entrada com maior tração imediata. Se o foco são produtos de moda, acessórios, utilidades com apelo visual e ticket até R$ 120, a Shopee oferece excelente volume. Se você tem produtos de marca registrada e código de barras formal, a Amazon Brasil entrega um público mais qualificado. Para quem tem produto exclusivo de fabricação própria, a recomendação é abrir simultaneamente uma loja na Nuvemshop para criar presença digital própria.',
    },
    {
      q: 'Como a consultoria da Borlim ajuda meu e-commerce a lucrar mais?',
      a: 'A maioria dos donos de e-commerce sabe embalar caixas e cadastrar anúncios, mas não tem clareza matemática da rentabilidade por canal. A Borlim entra como a retaguarda financeira do empresário: calculamos o markup reverso por SKU, projetamos o fluxo de caixa semanal com o ciclo real de repasse dos canais, diagnosticamos a Necessidade de Capital de Giro (NCG) para expansão, saneamos custos tributários e aplicamos o teste de insolvência imediata e em 12 meses. O resultado é parar de girar mercadoria no prejuízo e focar nos produtos e canais que realmente geram caixa e constroem patrimônio.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO INSTITUCIONAL (Fundo Azul-Marinho #082852 + Grid Tecnológico + Orbes) */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[450px] h-[450px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Eyebrow / Tag institucional verde */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <ShoppingCart className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especialidade Técnica — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              E-commerce & Vendas Online: <br className="hidden sm:inline" />
              <span className="text-emerald-300">Margem Real, Taxas e Logística FULL</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-slate-200 mt-4 font-normal leading-snug">
              Vender online não é o mesmo que lucrar: aprenda como operam as maiores plataformas,
              desvende cada percentual de comissão e garanta dinheiro limpo no caixa da sua empresa.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na <strong>Borlim Consultoria</strong>, conectamos o universo dinâmico das vendas
              digitais à solidez da engenharia financeira. Explicamos com rigor e linguagem direta
              de empresário para empresário o funcionamento dos marketplaces e lojas virtuais, o
              ranking das melhores plataformas do Brasil, o impacto cumulativo de comissões, fretes,
              taxas de cartão e tributos, além do funcionamento detalhado do modelo{' '}
              <strong>FULL</strong> de armazenagem. Com o nosso diagnóstico de{' '}
              <strong>48 indicadores financeiros</strong> e o teste preventivo de{' '}
              <strong>insolvência em 12 meses</strong>, sua empresa cresce nas vendas online sem
              sufocar o capital de giro.
            </p>

            {/* CTAs Oficiais Obrigatórios */}
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
                href="mailto:flavio@borlim.com.br?subject=Consulta%20E-commerce%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>

            {/* Barra de Atalhos Internos da Página (Quick Navigation) */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              <span className="text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                Navegar na página:
              </span>
              <a
                href="#visao-operacional"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                Como Funciona
              </a>
              <a
                href="#ranking-plataformas"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                Ranking Plataformas
              </a>
              <a
                href="#custos-margem"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                Custos & Margem
              </a>
              <a
                href="#ads-plataformas"
                className="px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-500/25 to-emerald-600/30 hover:from-emerald-500/40 hover:to-emerald-600/45 text-emerald-200 hover:text-white border border-[#22C55E]/40 transition-all font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Megaphone className="w-3 h-3 text-[#22C55E]" />
                ADS nas Plataformas
              </a>
              <a
                href="#logistica-full"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                Logística FULL
              </a>
              <a
                href="#erros-classicos"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                Erros Clássicos
              </a>
              <a
                href="#faq"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL & O ALERTA DA BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Alerta Central para o Empresário
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “Vender bem na internet não é o mesmo que lucrar bem — a margem do e-commerce se
                decide na ponta do lápis antes de anunciar o produto.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Milhares de empresários celebram recordes de vendas e de caixas despachadas no fim
                do mês, mas ao conciliar o extrato bancário não encontram o lucro prometido. A causa
                é sempre a mesma: comissões cumulativas, frete grátis compulsório pago pelo
                vendedor, taxa fixa por unidade, custo de antecipação e devoluções que corroem
                silenciosamente a operação. Na Borlim, reestruturamos sua esteira de precificação e
                fluxo de recebíveis para que cada pedido represente ganho real para o seu negócio.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#E5EDF5]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Suporte Financeiro Direto
                </span>
                <p className="font-serif text-lg font-bold text-[#082852]">Flávio Bordignon</p>
                <p className="text-xs text-slate-600 font-sans">
                  Economista e consultor sênior da BORLIM Consultoria Empresarial.
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

      {/* 3. OS 3 PILARES DA BORLIM PARA E-COMMERCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Fundamentos de Gestão
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            A Tríade da Borlim para E-commerce Rentável
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Diferente de cursos de marketing que ensinam apenas a "fazer anúncios", nossa
            consultoria cuida do que mantém a empresa de pé: margem líquida, fluxo de caixa e
            capital de giro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {borlimPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-sm hover:border-[#16A34A] card-hover-lift transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#16A34A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0B3B7A] text-[#22C55E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
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
      </section>

      {/* 4. COMO FUNCIONA O E-COMMERCE NA PRÁTICA (6 ETAPAS DA OPERAÇÃO) */}
      <section id="visao-operacional" className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Mecânica Operacional
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              Como Funciona o E-commerce na Prática
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Do momento em que o consumidor pesquisa no celular até o dinheiro cair limpo na sua
              conta bancária: entenda as engrenagens de tecnologia, meios de pagamento e logística
              que determinam o sucesso ou o fracasso de uma operação online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommerceSteps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-[#F0F4F8]/50 hover:bg-white hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xl font-bold text-[#16A34A]">
                        {step.step}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#082852] leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#15803D] mt-0.5 font-bold">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Destaque Comparativo: Loja Própria vs Marketplace */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#082852] text-white border border-[#0B3B7A] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Decisão Estrutural
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Marketplace vs. Loja Própria: Qual o Melhor Caminho?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                No <strong>Marketplace</strong>, você "aluga" uma vitrine no maior shopping do país:
                ganha fluxo imediato de milhões de compradores, mas paga comissão alta sobre cada
                venda (11% a 20%) e concorre lado a lado com dezenas de outros vendedores. Na{' '}
                <strong>Loja Própria</strong>, você constrói sua loja na rua principal: paga uma
                mensalidade fixa e não paga comissão de canal, mas precisa trazer seus próprios
                clientes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="text-amber-400 font-bold block uppercase tracking-wider">
                  Marketplace
                </span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Tráfego imediato e massivo</li>
                  <li>• Comissão alta (11% a 20%)</li>
                  <li>• O cliente é da plataforma</li>
                  <li>• Concorrência feroz no Buy Box</li>
                </ul>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="text-[#22C55E] font-bold block uppercase tracking-wider">
                  Loja Própria
                </span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• Mensalidade fixa de software</li>
                  <li>• 0% de comissão sobre a venda</li>
                  <li>• O cliente e a base são seus</li>
                  <li>• Você financia o tráfego e mídia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RANKING DAS MELHORES PLATAFORMAS DE VENDAS */}
      <section
        id="ranking-plataformas"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Análise Comparativa de Mercado
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Ranking das Melhores Plataformas de Vendas no Brasil
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Avaliamos e ranqueamos os principais canais de e-commerce do país sob a ótica de
            custo-benefício para o pequeno e médio empresário. Percentuais públicos médios
            praticados no mercado brasileiro:
          </p>
          <p className="text-xs text-slate-500 italic mt-2 font-mono">
            * Aviso técnico: Comissões e tarifas variam por categoria de produto, plano de reputação
            e modalidade de frete. Consulte sempre a tabela vigente de cada plataforma.
          </p>
        </div>

        {/* Cards Ranqueados com Tabela Resumida */}
        <div className="space-y-4">
          {platformRanking.map((p) => (
            <div
              key={p.rank}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-[#16A34A] transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Cabeçalho da Plataforma */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#082852] text-[#22C55E] flex items-center justify-center font-mono font-bold text-sm">
                      #{p.rank}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#082852] group-hover:text-[#0B3B7A] transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${p.typeColor}`}
                    >
                      {p.type}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#15803D]">
                      Nota: {p.score}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed pt-2">
                    <strong>Público Ideal:</strong> {p.idealFor}
                  </p>
                </div>

                {/* Comissões e Taxas */}
                <div className="lg:col-span-4 bg-[#F0F4F8]/80 p-4 rounded-xl border border-slate-200/80 space-y-2 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      Comissão Principal
                    </span>
                    <span className="text-sm font-bold text-[#082852]">{p.commission}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      Outras Taxas & Fretes
                    </span>
                    <span className="text-[11px] text-slate-700 leading-snug">{p.extraCosts}</span>
                  </div>
                </div>

                {/* Prós e Contras */}
                <div className="lg:col-span-4 space-y-2 text-xs font-sans">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      <strong>Prós:</strong> {p.pros}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-slate-600">
                      <strong>Atenção:</strong> {p.cons}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ABAS INTERATIVAS: PERCENTUAIS QUE COMEM A MARGEM */}
      <section id="custos-margem" className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Calculator className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Engenharia de Custos
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              Os Percentuais que Comem a Margem
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Exemplo numérico detalhado em uma empresa fictícia brasileira vendendo um produto por{' '}
              <strong>R$ 200,00</strong> no e-commerce. Acompanhe abaixo cada percentual deduzido e
              veja quanto realmente sobra no bolso:
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
            <button
              onClick={() => setActiveTab('comissao')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'comissao'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Percent className="w-4 h-4 text-[#22C55E]" />
              <span>1. Comissão do Canal</span>
            </button>

            <button
              onClick={() => setActiveTab('pagamento')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'pagamento'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#22C55E]" />
              <span>2. Cartão & PIX</span>
            </button>

            <button
              onClick={() => setActiveTab('frete')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'frete'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Truck className="w-4 h-4 text-[#22C55E]" />
              <span>3. Frete & Devoluções</span>
            </button>

            <button
              onClick={() => setActiveTab('impostos')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'impostos'
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-4 h-4 text-[#22C55E]" />
              <span>4. Impostos da Venda</span>
            </button>

            <button
              onClick={() => setActiveTab('resultado')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === 'resultado'
                  ? 'bg-[#16A34A] text-white shadow-md'
                  : 'bg-emerald-50 text-[#15803D] hover:bg-emerald-100 border border-emerald-300'
              }`}
            >
              <DollarSign className="w-4 h-4 text-white" />
              <span>5. Resultado Final Líquido</span>
            </button>
          </div>

          {/* Conteúdo das Abas */}
          {activeTab === 'comissao' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-[#E5EDF5]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Aba 1 — Comissão do Marketplace
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      A taxa cobrada pela plataforma sobre o valor bruto do pedido
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Ao vender em um marketplace (ex.: Mercado Livre, Amazon, Magazine Luiza), a
                      plataforma desconta sua comissão sobre o{' '}
                      <strong>valor total pago pelo comprador</strong> (incluindo o frete, quando
                      aplicável). No Mercado Livre Clássico, a comissão gira em torno de 11% a 14%;
                      no plano Premium (que permite parcelamento sem juros para o comprador), sobe
                      para 16% a 19%.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Além do percentual, para produtos abaixo de R$ 79,00 a maioria das plataformas
                      adiciona uma <strong>taxa fixa por unidade</strong> (geralmente entre R$ 6,00
                      e R$ 6,50), o que destrói a margem percentual de produtos de tíquete baixo.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#082852] flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#16A34A]" />
                      Exemplo Numérico — Venda de R$ 200,00
                    </h4>
                    <div className="font-mono text-sm space-y-1.5 text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Preço de Venda ao Consumidor:</span>
                        <span className="font-bold text-[#082852]">R$ 200,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-rose-600">
                        <span>(-) Comissão Mercado Livre Clássico (11%):</span>
                        <span className="font-bold">- R$ 22,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-500 text-xs">
                        <span>(Cenário Alternativo Premium a 16%):</span>
                        <span>- R$ 32,00</span>
                      </div>
                      <div className="flex justify-between py-1 font-bold text-[#15803D] pt-1">
                        <span>Saldo após a comissão (Clássico):</span>
                        <span>R$ 178,00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                    Dica do Consultor Borlim
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Parcelamento sem Juros: Quem Paga?
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Quando o anúncio diz "em 10x sem juros", os juros NÃO sumiram: o lojista pagou a
                    comissão Premium (5% a mais) para que a plataforma ofereça o parcelamento. Em
                    produtos com margem de contribuição apertada (menor que 20%), anunciar no
                    Premium pode levar a operação diretamente para o prejuízo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pagamento' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-[#E5EDF5]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Aba 2 — Taxas de Cartão de Crédito e PIX
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      O custo do intermediador financeiro e a antecipação de recebíveis
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Em loja própria (Nuvemshop, Shopify, WooCommerce), você contrata um gateway de
                      pagamento (ex.: Mercado Pago, PagSeguro, Asaas, Cielo). O cartão de crédito
                      costuma cobrar entre <strong>3,5% e 4,99%</strong> da transação, com
                      recebimento em 30 dias. Se o empresário optar por receber em D+2
                      (antecipação), a taxa total pode passar de <strong>6,0%</strong>.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Já nas vendas pagas via <strong>PIX</strong>, o custo despenca para ~0,99%
                      (com teto fixo em muitos casos) e a liberação é imediata no caixa, aliviando
                      diretamente a Necessidade de Capital de Giro (NCG).
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#082852] flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#16A34A]" />
                      Exemplo Numérico — Taxa de Cartão em Venda de R$ 200,00
                    </h4>
                    <div className="font-mono text-sm space-y-1.5 text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Preço de Venda do Produto:</span>
                        <span className="font-bold text-[#082852]">R$ 200,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-rose-600">
                        <span>(-) Taxa Gateway Cartão 1x (4,5%):</span>
                        <span className="font-bold">- R$ 9,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-500 text-xs">
                        <span>(Cenário Alternativo se o cliente pagar via PIX a 0,99%):</span>
                        <span className="text-emerald-700 font-semibold">
                          - R$ 1,98 (Economia de R$ 7,02)
                        </span>
                      </div>
                      <div className="flex justify-between py-1 font-bold text-[#15803D] pt-1">
                        <span>Saldo após o meio de pagamento (Cartão):</span>
                        <span>R$ 191,00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                    Impacto no Capital de Giro
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Ciclo de Recebimento vs. Boleto do Fornecedor
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Se o lojista paga a matéria-prima ou o fornecedor em 28 dias e a plataforma de
                    pagamento demora 30 dias para liberar o dinheiro das vendas parceladas, gera-se
                    um buraco no caixa. A Borlim calcula seu ciclo financeiro para evitar
                    antecipações desesperadas com juros bancários.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'frete' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-[#E5EDF5]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Aba 3 — Frete Grátis, Tabela de Peso e Devoluções
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      A ilusão do "frete grátis" e o custo do frete reverso obrigatório
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Nos principais marketplaces, todo produto anunciado por mais de R$ 79,00 tem
                      frete grátis compulsório para o cliente. A plataforma cobra esse frete da sua
                      conta com base no <strong>peso real ou peso cúbico (o que for maior)</strong>.
                      Em produtos de médio porte (1kg a 2kg), esse desconto fica entre R$ 18,00 e R$
                      32,00 por venda.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Além do envio inicial, o{' '}
                      <strong>artigo 49 do Código de Defesa do Consumidor</strong> garante 7 dias
                      para devolução por arrependimento. O lojista é obrigado a pagar o frete de
                      volta (frete reverso), absorvendo perda de embalagem e avarias eventuais.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#082852] flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#16A34A]" />
                      Exemplo Numérico — Frete e Devolução em Venda de R$ 200,00
                    </h4>
                    <div className="font-mono text-sm space-y-1.5 text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Preço de Venda do Produto:</span>
                        <span className="font-bold text-[#082852]">R$ 200,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-rose-600">
                        <span>
                          (-) Coparticipação no Frete Obrigatório (ML Líder c/ 50% desc.):
                        </span>
                        <span className="font-bold">- R$ 18,50</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-rose-600">
                        <span>(-) Provisão Técnica de Devolução (3,0% médio):</span>
                        <span className="font-bold">- R$ 6,00</span>
                      </div>
                      <div className="flex justify-between py-1 font-bold text-[#15803D] pt-1">
                        <span>Total de custos logísticos absorvidos:</span>
                        <span>- R$ 24,50 (12,25% do preço)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                    Cuidado com Cubagem
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    O Perigo do Peso Cúbico
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Um travesseiro pesa 600 gramas, mas ocupa o volume de uma caixa de 5kg. As
                    transportadoras cobram pelo espaço no caminhão (peso volumétrico). Se você
                    precificar olhando apenas a balança, a taxa de frete cobrada no extrato do
                    marketplace será o triplo do planejado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impostos' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-[#E5EDF5]/60 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#15803D]">
                      Aba 4 — Impostos sobre a Venda Online
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#082852]">
                      A tributação incide sobre o preço BRUTO da nota fiscal
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      Um dos erros fiscais mais graves cometidos por vendedores iniciantes é
                      calcular o imposto sobre o valor líquido que caiu na conta.{' '}
                      <strong>
                        A Receita Federal e a Secretaria da Fazenda (Sefaz) tributam o valor TOTAL
                        da Nota Fiscal emitida
                      </strong>
                      .
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
                      No <strong>Simples Nacional (Anexo I — Comércio)</strong>, a alíquota efetiva
                      começa em 4,0% e sobe gradativamente até 11,5% conforme o faturamento anual
                      acumulado. No <strong>Lucro Presumido</strong>, os tributos federais e ICMS
                      somam frequentemente entre 10% e 18%. Na transição da nova Reforma Tributária
                      (IBS/CBS), o Split Payment automático recolherá o imposto direto na liquidação
                      do pedido.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-serif text-base font-bold text-[#082852] flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#16A34A]" />
                      Exemplo Numérico — Imposto Simples Nacional (Faixa 3 ~ 8,5%)
                    </h4>
                    <div className="font-mono text-sm space-y-1.5 text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Valor Total da NF-e Emitida:</span>
                        <span className="font-bold text-[#082852]">R$ 200,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-rose-600">
                        <span>(-) Simples Nacional Anexo I (~8,5% efetivo):</span>
                        <span className="font-bold">- R$ 17,00</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-500 text-xs">
                        <span>(Cenário em início de operação a 4,0%):</span>
                        <span>- R$ 8,00</span>
                      </div>
                      <div className="flex justify-between py-1 font-bold text-[#15803D] pt-1">
                        <span>Saldo da venda após o imposto:</span>
                        <span>R$ 183,00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#082852] text-white p-6 sm:p-7 rounded-2xl border border-[#0B3B7A] space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                    Integração Tributária Borlim
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Conexão com a Reforma Tributária
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Acompanhe em tempo real as novidades do IBS e CBS e as formas de tributação na
                    seção dedicada do nosso portal. Planejar o enquadramento fiscal correto é o que
                    separa o lojista que lucra do que fecha as portas.
                  </p>
                  <Link
                    to="/reforma-tributaria"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#22C55E] hover:underline uppercase tracking-wider"
                  >
                    <span>Ver Reforma Tributária</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resultado' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#082852] text-white p-6 sm:p-10 rounded-2xl border border-[#0B3B7A] shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                      Aba 5 — Demonstração da Margem Líquida Real
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                      Quanto Sobra de Fato de uma Venda de R$ 200,00?
                    </h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-[#22C55E] border border-emerald-500/40 font-mono text-xs font-bold uppercase tracking-wider">
                    DRE Unitária do Produto
                  </span>
                </div>

                {/* Tabela do Resultado Final */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 bg-[#0B3B7A]/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700 space-y-2.5 font-mono text-xs sm:text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-600/60 font-bold text-white text-sm sm:text-base">
                      <span>(=) Preço de Venda Bruto (NF-e):</span>
                      <span className="text-emerald-300">R$ 200,00 (100,0%)</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                      <span>(-) Custo da Mercadoria / CMV (compra/fabricação):</span>
                      <span className="text-rose-300">- R$ 85,00 (42,5%)</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                      <span>(-) Comissão do Marketplace (11,0% Clássico):</span>
                      <span className="text-rose-300">- R$ 22,00 (11,0%)</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                      <span>(-) Taxa de Pagamento / Gateway Cartão (3,0%):</span>
                      <span className="text-rose-300">- R$ 6,00 (3,0%)</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                      <span>(-) Frete Grátis Compulsório (coparticipação):</span>
                      <span className="text-rose-300">- R$ 18,50 (9,25%)</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                      <span>(-) Provisão para Devoluções & Avarias (3,0%):</span>
                      <span className="text-rose-300">- R$ 6,00 (3,0%)</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                      <span>(-) Imposto Simples Nacional (~8,5% efetivo):</span>
                      <span className="text-rose-300">- R$ 17,00 (8,5%)</span>
                    </div>

                    <div className="flex justify-between py-2 border-t-2 border-[#22C55E] font-bold text-white text-sm sm:text-base pt-2">
                      <span className="text-[#22C55E]">(=) Margem de Contribuição Líquida:</span>
                      <span className="text-[#22C55E]">R$ 45,50 (22,75%)</span>
                    </div>

                    <div className="flex justify-between py-1 text-slate-400 text-xs">
                      <span>(-) Rateio dos Custos Fixos (equipe, software, aluguel ~10%):</span>
                      <span>- R$ 20,00 (10,0%)</span>
                    </div>

                    <div className="flex justify-between py-2 bg-[#16A34A]/20 px-3 rounded-lg border border-[#22C55E]/40 font-bold text-base text-white mt-1">
                      <span>(=) LUCRO LÍQUIDO REAL NO BOLSO:</span>
                      <span className="text-[#22C55E] text-lg">R$ 25,50 (12,75%)</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3">
                      <h4 className="font-serif text-lg font-bold text-[#22C55E]">
                        A Revelação Matemática
                      </h4>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        De uma venda de <strong>R$ 200,00</strong>, o empresário que comprou por{' '}
                        <strong>R$ 85,00</strong> achou que teria R$ 115,00 de lucro. Na realidade
                        das taxas online, sobram <strong>R$ 25,50 de lucro líquido</strong>.
                      </p>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        Se esse mesmo empresário der um cupom de 10% de desconto (R$ 20,00) para
                        vender mais, o lucro líquido despenca de R$ 25,50 para míseros R$ 5,50 por
                        venda. É por isso que promoções cegas quebram empresas de e-commerce.
                      </p>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg border border-[#22C55E]/40"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Auditar a Precificação do Meu E-commerce</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEÇÃO NOVA: COMO FUNCIONAM OS ADS DENTRO DAS PLATAFORMAS */}
      <section
        id="ads-plataformas"
        className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden"
      >
        {/* Glows e Grid Tecnológico */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[450px] h-[450px] bg-[#1557A6]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header da Seção de ADS */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 mb-4 backdrop-blur-sm">
              <Megaphone className="w-4 h-4 text-[#22C55E]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                Mídia Paga & Anúncios Patrocinados
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Como Funcionam os <span className="text-emerald-300">ADS</span> Dentro das
              Plataformas?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-4 font-sans leading-relaxed">
              O termo correto do setor é <strong>ADS</strong> (anúncios patrocinados/mídia de
              performance). São os espaços publicitários pagos vendidos pelas próprias plataformas —
              como <strong>Mercado Ads</strong> (Mercado Livre), <strong>Amazon Ads</strong>{' '}
              (Sponsored Products), <strong>Shopee Ads</strong> e, fora dos marketplaces, o Google
              Shopping e o Meta Ads.
            </p>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-sans leading-relaxed">
              A lógica de negócio das plataformas é direta:{' '}
              <em>quem não anuncia fica escondido nas últimas páginas da busca</em>. Com anúncio
              ativo e lance competitivo no leilão, seu produto ganha o topo imediato das pesquisas e
              das páginas dos concorrentes. Porém, sem engenharia financeira por trás, o empresário
              acaba <strong>comprando venda no prejuízo</strong>.
            </p>
          </div>

          {/* Abas Interativas de Modelos de Cobrança */}
          <div className="bg-[#0B3B7A]/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700/80 mb-12 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                  Mecânica Econômica da Publicidade
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  Os 4 Modelos de Cobrança e Métricas Essenciais de ADS
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                Clique nas abas para detalhar
              </span>
            </div>

            {/* Navegação das Abas de ADS */}
            <div className="flex flex-wrap gap-2 pb-2 mb-6">
              <button
                onClick={() => setActiveAdsTab('cpc')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                  activeAdsTab === 'cpc'
                    ? 'bg-[#16A34A] text-white shadow-md border border-[#22C55E]'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15 border border-white/10'
                }`}
              >
                <MousePointerClick className="w-4 h-4 text-emerald-200" />
                <span>1. CPC (Custo por Clique)</span>
              </button>

              <button
                onClick={() => setActiveAdsTab('roas_acos')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                  activeAdsTab === 'roas_acos'
                    ? 'bg-[#16A34A] text-white shadow-md border border-[#22C55E]'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15 border border-white/10'
                }`}
              >
                <Target className="w-4 h-4 text-emerald-200" />
                <span>2. ROAS & ACOS na Prática</span>
              </button>

              <button
                onClick={() => setActiveAdsTab('comissao_extra')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                  activeAdsTab === 'comissao_extra'
                    ? 'bg-[#16A34A] text-white shadow-md border border-[#22C55E]'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15 border border-white/10'
                }`}
              >
                <Percent className="w-4 h-4 text-emerald-200" />
                <span>3. % de Comissão Extra Embutida</span>
              </button>

              <button
                onClick={() => setActiveAdsTab('leilao')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                  activeAdsTab === 'leilao'
                    ? 'bg-[#16A34A] text-white shadow-md border border-[#22C55E]'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15 border border-white/10'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-200" />
                <span>4. Leilão & Orçamento Diário</span>
              </button>
            </div>

            {/* Conteúdo Aba: CPC */}
            {activeAdsTab === 'cpc' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-7 space-y-4 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[#22C55E] font-mono font-bold uppercase text-xs block">
                      Como funciona o CPC (Custo por Clique)
                    </span>
                    <p>
                      Você só paga quando um comprador de fato clica no seu anúncio. A simples
                      exibição na tela (impressão) não é cobrada. Ao clicar, o cliente é direcionado
                      à sua página de produto.
                    </p>
                    <p className="text-slate-300">
                      Entretanto, <strong>clique não é venda</strong>: se o anúncio tiver fotos
                      ruins, descrição pobre ou frete caro, o cliente clica, gasta o seu saldo de
                      publicidade e vai embora sem comprar.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-white font-mono font-bold text-xs uppercase tracking-wider block">
                      Valores Típicos de CPC no Brasil por Categoria:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                      <div className="p-3 bg-[#082852] rounded-lg border border-slate-700">
                        <span className="text-slate-400 block text-[10px] uppercase">
                          Baixa Concorrência
                        </span>
                        <span className="text-emerald-300 text-sm font-bold">
                          R$ 0,30 a R$ 0,70
                        </span>
                        <p className="text-[11px] text-slate-300 font-sans mt-1">
                          Nicho artesanal, peças técnicas específicas.
                        </p>
                      </div>
                      <div className="p-3 bg-[#082852] rounded-lg border border-slate-700">
                        <span className="text-slate-400 block text-[10px] uppercase">
                          Média Concorrência
                        </span>
                        <span className="text-amber-300 text-sm font-bold">R$ 0,75 a R$ 1,80</span>
                        <p className="text-[11px] text-slate-300 font-sans mt-1">
                          Casa e utilidades, autopeças, calçados e vestuário.
                        </p>
                      </div>
                      <div className="p-3 bg-[#082852] rounded-lg border border-slate-700">
                        <span className="text-slate-400 block text-[10px] uppercase">
                          Alta Concorrência
                        </span>
                        <span className="text-rose-300 text-sm font-bold">R$ 2,00 a R$ 5,00+</span>
                        <p className="text-[11px] text-slate-300 font-sans mt-1">
                          Smartphones, eletrônicos, cosméticos e suplementos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#082852] p-5 sm:p-6 rounded-xl border border-emerald-500/30 space-y-3 font-sans">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <MousePointerClick className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      A Matemática da Taxa de Conversão
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Se sua taxa de conversão for de <strong>2%</strong> (2 vendas a cada 100
                    cliques) e o seu CPC médio for de <strong>R$ 1,20</strong>:
                  </p>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-xs space-y-1.5 text-slate-200">
                    <div className="flex justify-between">
                      <span>Custo de 100 cliques:</span>
                      <span className="text-amber-300 font-bold">R$ 120,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vendas geradas (2%):</span>
                      <span className="text-white font-bold">2 pedidos</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-700 text-[#22C55E] font-bold">
                      <span>Custo de Aquisição por Venda (CPA):</span>
                      <span>R$ 60,00 / venda</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    * Se o produto for vendido a R$ 200,00, o custo de anúncio comeu R$ 60,00 (30,0%
                    da receita bruta).
                  </p>
                </div>
              </div>
            )}

            {/* Conteúdo Aba: ROAS e ACOS */}
            {activeAdsTab === 'roas_acos' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-7 space-y-4 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                    <span className="text-[#22C55E] font-mono font-bold uppercase text-xs block">
                      A Diferença Conceitual: ROAS vs. ACOS
                    </span>
                    <p>
                      <strong>ROAS (Return On Advertising Spend):</strong> É a métrica do
                      profissional de marketing. Mede a receita bruta gerada por cada real
                      investido:
                      <br />
                      <span className="font-mono text-emerald-300 font-bold">
                        ROAS = Receita de Vendas Gerada ÷ Gasto em ADS
                      </span>
                    </p>
                    <p>
                      <strong>ACOS (Advertising Cost of Sales):</strong> É a métrica da gestão
                      financeira e a adotada pelo <strong>Mercado Ads</strong> e pela{' '}
                      <strong>Amazon</strong>. Mede o percentual do faturamento consumido pela
                      publicidade:
                      <br />
                      <span className="font-mono text-emerald-300 font-bold">
                        ACOS = (Gasto em ADS ÷ Receita de Vendas Gerada) × 100
                      </span>
                    </p>
                  </div>

                  <div className="p-4 bg-[#082852] rounded-xl border border-slate-700 space-y-2">
                    <span className="text-white font-mono font-bold text-xs uppercase tracking-wider block">
                      A Conta na Prática (Exemplo Real):
                    </span>
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-slate-400 text-[10px] block">
                          Investimento no mês
                        </span>
                        <span className="text-rose-300 font-bold text-sm">R$ 100,00 em ADS</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-slate-400 text-[10px] block">Vendas geradas</span>
                        <span className="text-emerald-300 font-bold text-sm">
                          R$ 500,00 faturados
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 font-mono text-xs text-slate-300 space-y-1">
                      <div className="flex justify-between">
                        <span>• ROAS correspondente:</span>
                        <span className="font-bold text-white">5,0x (R$ 500 ÷ R$ 100)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• ACOS correspondente:</span>
                        <span className="font-bold text-[#22C55E]">20,0% (R$ 100 ÷ R$ 500)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#082852] p-5 sm:p-6 rounded-xl border border-emerald-500/30 space-y-3 font-sans">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Target className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      Tabela de Conversão ROAS ⇄ ACOS
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Como o empresário deve traduzir as duas linguagens para a sua DRE:
                  </p>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between p-2 rounded bg-white/5 border border-white/10">
                      <span className="text-slate-300">ROAS 10,0x</span>
                      <span className="text-emerald-400 font-bold">ACOS = 10% (Excelente)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white/5 border border-white/10">
                      <span className="text-slate-300">ROAS 6,67x</span>
                      <span className="text-emerald-400 font-bold">ACOS = 15% (Saudável)</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white/5 border border-white/10">
                      <span className="text-slate-300">ROAS 5,00x</span>
                      <span className="text-amber-400 font-bold">
                        ACOS = 20% (Atenção à Margem)
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-white/5 border border-white/10">
                      <span className="text-slate-300">ROAS 3,33x</span>
                      <span className="text-rose-400 font-bold">
                        ACOS = 30% (Risco de Prejuízo)
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-300 pt-2 border-t border-slate-700">
                    * Quanto MAIOR o ROAS, MENOR o ACOS e mais margem fica no bolso.
                  </div>
                </div>
              </div>
            )}

            {/* Conteúdo Aba: Comissão Extra Embutida */}
            {activeAdsTab === 'comissao_extra' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-7 space-y-4 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[#22C55E] font-mono font-bold uppercase text-xs block">
                      A Exposição "Gratuita" que já Vem Cobrada na Comissão
                    </span>
                    <p>
                      Muitos marketplaces vendem planos diferenciados de anúncio cujo valor não é
                      cobrado por clique (CPC), mas sim como uma{' '}
                      <strong>comissão percentual extra adicionada à taxa padrão</strong> da venda.
                    </p>
                    <p className="text-slate-300">
                      O maior exemplo brasileiro é o plano <strong>Mercado Livre Premium</strong>: a
                      comissão sobe de ~11% (Clássico) para ~16% a 19%. Essa diferença de 5% a 8%
                      paga duas coisas: o parcelamento sem juros para o comprador e maior relevância
                      no algoritmo de busca da plataforma.
                    </p>
                  </div>

                  <div className="p-4 bg-[#082852] rounded-xl border border-slate-700 space-y-3 font-mono text-xs">
                    <span className="text-white font-bold text-xs uppercase tracking-wider block">
                      Programas de Destaque por Comissão Adicional:
                    </span>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">•</span>
                        <span>
                          <strong>Shopee Frete Grátis Extra:</strong> Adiciona +6% de comissão (sobe
                          de 14% para 20%) em troca de selo de destaque e cupons pagos pela
                          plataforma.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">•</span>
                        <span>
                          <strong>Magalu Destaque / Campanhas Black:</strong> Redução ou acréscimo
                          de comissão condicionado à participação em ofertas relâmpago.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#22C55E] font-bold">•</span>
                        <span>
                          <strong>Amazon Buy Box Promotions:</strong> Tarifas específicas de
                          visibilidade para vendedores certificados.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#082852] p-5 sm:p-6 rounded-xl border border-emerald-500/30 space-y-3 font-sans">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Percent className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      A Armadilha da Sobreposição
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Um dos erros contábeis mais graves é pagar o{' '}
                    <strong>plano Premium (16%)</strong> E TAMBÉM ligar o{' '}
                    <strong>Mercado Ads com ACOS de 15%</strong>.
                  </p>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span>Comissão Premium ML:</span>
                      <span className="font-bold">16,0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Custo de Mercado Ads:</span>
                      <span className="font-bold">15,0%</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-rose-500/30 font-bold text-rose-300">
                      <span>Total consumido em canal + ads:</span>
                      <span>31,0% do faturamento</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Se a mercadoria (CMV) custar 45% e o frete + imposto custarem 20%, o empresário
                    acabou de acumular 96% de custos — restando míseros 4% de margem antes dos
                    custos fixos.
                  </p>
                </div>
              </div>
            )}

            {/* Conteúdo Aba: Leilão e Orçamento Diário */}
            {activeAdsTab === 'leilao' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
                <div className="lg:col-span-7 space-y-4 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <span className="text-[#22C55E] font-mono font-bold uppercase text-xs block">
                      Como Funciona o Leilão em Tempo Real (RTB)
                    </span>
                    <p>
                      Toda vez que um consumidor digita uma busca (ex.: "tênis de corrida masculino"
                      ou "furadeira 500w"), ocorre um{' '}
                      <strong>leilão automático em milissegundos</strong>. Os critérios
                      determinantes para quem aparece em 1º lugar são:
                    </p>
                    <ul className="space-y-1.5 text-slate-300 pl-4 list-disc font-mono text-xs">
                      <li>
                        <strong>Lance máximo de CPC ou ACOS Objetivo:</strong> Quanto você aceita
                        pagar por clique ou por venda.
                      </li>
                      <li>
                        <strong>Qualidade do Anúncio (Ad Rank):</strong> Título relevante, fotos
                        profissionais, ficha técnica preenchida.
                      </li>
                      <li>
                        <strong>Histórico de Conversão:</strong> Anúncios que já vendem muito ganham
                        desconto no leilão.
                      </li>
                      <li>
                        <strong>Reputação e Prazo de Entrega:</strong> Vendedores com reputação
                        verde e no FULL pagam menos por clique para ganhar a mesma posição.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#082852] rounded-xl border border-slate-700 space-y-2 font-mono text-xs">
                    <span className="text-white font-bold text-xs uppercase tracking-wider block">
                      Gestão do Orçamento Diário (Daily Budget):
                    </span>
                    <p className="text-slate-300 font-sans">
                      Você define um teto diário de gastos (ex.: R$ 50,00/dia). Assim que os cliques
                      atingirem R$ 50,00, a campanha pausa automaticamente até o dia seguinte. O
                      perigo: se o orçamento acabar às 11h da manhã, você perde todo o horário nobre
                      de compras (19h às 23h).
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#082852] p-5 sm:p-6 rounded-xl border border-emerald-500/30 space-y-3 font-sans">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      A Regra da Visibilidade
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs font-mono text-slate-300">
                    <div className="text-amber-300 font-bold uppercase text-[11px]">
                      Sem Anúncio (Apenas Orgânico):
                    </div>
                    <p className="font-sans text-[11px] leading-relaxed">
                      Seu produto aparece na 4ª ou 5ª página da busca. Menos de 5% dos compradores
                      rolam a página além dos primeiros 10 resultados. Volume de vendas rastejante.
                    </p>
                    <div className="text-[#22C55E] font-bold uppercase text-[11px] pt-2 border-t border-slate-700">
                      Com Anúncio Ativo (ADS):
                    </div>
                    <p className="font-sans text-[11px] leading-relaxed">
                      Seu produto aparece nas 4 primeiras posições do topo da busca com a tag
                      "Patrocinado". A taxa de cliques (CTR) sobe até 8x, gerando escala rápida.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    Conclusão Borlim: O anúncio é o acelerador do motor; a margem de contribuição é
                    o combustível. Acelerar sem combustível quebra a empresa.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Comparativo Numérico em Cascata: COM ADS vs. SEM ADS (Produto R$ 200,00) */}
          <div className="p-6 sm:p-10 rounded-2xl bg-white text-slate-800 border border-slate-200 shadow-2xl space-y-6 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
                  Simulação Numérica em Cascata — Produto de R$ 200,00
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-1">
                  Venda Orgânica (Sem Anúncio) vs. Venda Impulsionada por ADS
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#15803D] border border-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                Comparativo de Margem Líquida
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Veja o que acontece com o mesmo produto vendido a <strong>R$ 200,00</strong> no
              Mercado Livre (plano Clássico 11%): no lado esquerdo, a venda 100% orgânica (sem gasto
              com publicidade); no lado direito, a venda gerada através do{' '}
              <strong>Mercado Ads</strong> com ACOS alvo de 15% (R$ 30,00 por venda).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Lado A: SEM ADS (Orgânico) */}
              <div className="p-6 rounded-2xl bg-[#F0F4F8] border border-slate-300 space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-slate-300 pb-2">
                  <span className="font-bold text-[#082852] text-sm uppercase">
                    Cenário A: SEM ADS (Orgânico)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-[#082852] text-[10px] font-bold">
                    Margem Alta
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>Preço de Venda (NF-e):</span>
                  <span className="font-bold text-[#082852]">R$ 200,00 (100%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                  <span>(-) CMV (compra/fabricação):</span>
                  <span className="text-rose-600 font-semibold">- R$ 85,00 (42,5%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                  <span>(-) Comissão Marketplace (11%):</span>
                  <span className="text-rose-600 font-semibold">- R$ 22,00 (11,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-500 font-semibold">
                  <span>(-) Custo de ADS / Mídia Paga:</span>
                  <span className="text-emerald-700">R$ 0,00 (0,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                  <span>(-) Gateway de Cartão (3,0%):</span>
                  <span className="text-rose-600 font-semibold">- R$ 6,00 (3,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                  <span>(-) Frete Compulsório Líder:</span>
                  <span className="text-rose-600 font-semibold">- R$ 18,50 (9,25%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                  <span>(-) Provisão Devoluções (3%):</span>
                  <span className="text-rose-600 font-semibold">- R$ 6,00 (3,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                  <span>(-) Imposto Simples (~8,5%):</span>
                  <span className="text-rose-600 font-semibold">- R$ 17,00 (8,5%)</span>
                </div>
                <div className="flex justify-between py-1.5 border-t-2 border-[#16A34A] text-[#15803D] font-bold">
                  <span>(=) Margem de Contribuição:</span>
                  <span>R$ 45,50 (22,75%)</span>
                </div>
                <div className="flex justify-between py-1 text-slate-500 text-xs">
                  <span>(-) Rateio Custos Fixos (10%):</span>
                  <span>- R$ 20,00 (10,0%)</span>
                </div>
                <div className="flex justify-between py-2.5 bg-emerald-100 px-3 rounded-lg border border-emerald-300 font-bold text-[#15803D] text-sm sm:text-base mt-2">
                  <span>LUCRO LÍQUIDO / UNIDADE:</span>
                  <span>R$ 25,50 (12,75%)</span>
                </div>

                <div className="pt-2 text-[11px] font-sans text-slate-600 space-y-1">
                  <p>
                    <strong>Volume Típico:</strong> ~30 unidades/mês (baixo giro sem exposição).
                  </p>
                  <p>
                    <strong>Lucro Total no Mês:</strong> 30 × R$ 25,50 ={' '}
                    <strong className="text-[#15803D]">R$ 765,00</strong>
                  </p>
                </div>
              </div>

              {/* Lado B: COM ADS (Patrocinado ACOS 15%) */}
              <div className="p-6 rounded-2xl bg-[#082852] text-white border border-[#0B3B7A] space-y-3 font-mono text-xs sm:text-sm shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="font-bold text-emerald-300 text-sm uppercase">
                    Cenário B: COM ADS (ACOS 15%)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[#22C55E] border border-emerald-500/40 text-[10px] font-bold">
                    Volume Alto
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-700/60">
                  <span>Preço de Venda (NF-e):</span>
                  <span className="font-bold text-white">R$ 200,00 (100%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span>(-) CMV (compra/fabricação):</span>
                  <span className="text-rose-300">- R$ 85,00 (42,5%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span>(-) Comissão Marketplace (11%):</span>
                  <span className="text-rose-300">- R$ 22,00 (11,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 bg-amber-500/10 px-1 rounded text-amber-300 font-bold">
                  <span>(-) Custo do Anúncio (ACOS 15%):</span>
                  <span className="text-amber-300">- R$ 30,00 (15,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span>(-) Gateway de Cartão (3,0%):</span>
                  <span className="text-rose-300">- R$ 6,00 (3,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span>(-) Frete Compulsório Líder:</span>
                  <span className="text-rose-300">- R$ 18,50 (9,25%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span>(-) Provisão Devoluções (3%):</span>
                  <span className="text-rose-300">- R$ 6,00 (3,0%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span>(-) Imposto Simples (~8,5%):</span>
                  <span className="text-rose-300">- R$ 17,00 (8,5%)</span>
                </div>
                <div className="flex justify-between py-1.5 border-t-2 border-amber-400 text-amber-300 font-bold">
                  <span>(=) Margem de Contribuição:</span>
                  <span>R$ 15,50 (7,75%)</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400 text-xs">
                  <span>(-) Rateio Custos Fixos (diluído ~5%):</span>
                  <span>- R$ 10,00 (5,0%)</span>
                </div>
                <div className="flex justify-between py-2.5 bg-[#16A34A]/25 px-3 rounded-lg border border-[#22C55E]/50 font-bold text-white text-sm sm:text-base mt-2">
                  <span>LUCRO LÍQUIDO / UNIDADE:</span>
                  <span className="text-[#22C55E]">R$ 5,50 (2,75%)</span>
                </div>

                <div className="pt-2 text-[11px] font-sans text-slate-300 space-y-1">
                  <p>
                    <strong>Volume Aumentado:</strong> ~250 unidades/mês (topo da busca e alta
                    escala).
                  </p>
                  <p>
                    <strong>Lucro Total no Mês:</strong> 250 × R$ 5,50 ={' '}
                    <strong className="text-emerald-300">R$ 1.375,00</strong> (+79,7% no bolso!)
                  </p>
                </div>
              </div>
            </div>

            {/* Síntese do Trade-Off de Negócio */}
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs font-sans text-amber-950">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Scale className="w-4 h-4 text-amber-700" />
                <span>O Trade-Off de Empresário para Empresário:</span>
              </div>
              <p className="leading-relaxed">
                Com <strong>ADS</strong>, a margem unitária cai de 12,75% (R$ 25,50) para 2,75% (R$
                5,50) por peça. Contudo, você vende <strong>8 vezes mais volume</strong>, ganha
                poder de negociação de compra com o fornecedor e gera mais dinheiro absoluto no fim
                do mês.
                <strong> Mas atenção:</strong> se o seu ACOS subir de 15% para 23%, o lucro líquido
                se anula e a empresa quebra faturando milhões.
              </p>
            </div>
          </div>

          {/* Quando o ADS Vale a Pena x Quando Não Vale (Matriz Estratégica) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Quando Vale a Pena */}
            <div className="bg-white/5 border border-emerald-500/40 p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Quando o ADS Vale a Pena
                </h3>
              </div>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-1" />
                  <span>
                    <strong>
                      Produto com Margem Saudável (&gt; 25% de margem de contribuição):
                    </strong>{' '}
                    Há folga matemática suficiente para absorver o custo de aquisição do cliente
                    (CAC) e ainda sobrar lucro limpo.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-1" />
                  <span>
                    <strong>Lançamento de Produto (Fase de Tração):</strong> Para um produto novo
                    sair do zero, ele precisa de avaliações, fotos de compradores e volume inicial.
                    Aqui, aceita-se operar com lucro zero durante 15 a 30 dias para destravar o
                    algoritmo orgânico.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-1" />
                  <span>
                    <strong>Produto no FULL com Alta Reputação:</strong> A conversão de anúncio em
                    produtos com selo FULL é até 3 vezes maior, derrubando o custo por clique
                    efetivo e maximizando o ROAS.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-1" />
                  <span>
                    <strong>Desova de Estoque Parado:</strong> É preferível queimar o estoque com
                    ADS a preço de custo do que pagar meses de taxa de armazenagem prolongada no
                    armazém da plataforma.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quando Não Vale a Pena */}
            <div className="bg-white/5 border border-rose-500/40 p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex items-center gap-3 text-rose-300">
                <XCircle className="w-6 h-6 text-rose-400" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Quando o ADS Não Vale a Pena (Perigo)
                </h3>
              </div>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  <span>
                    <strong>Produto com Margem-Raspada (&lt; 10% a 12%):</strong> Qualquer anúncio
                    ativado levará a venda diretamente para o território de prejuízo. A regra
                    prática:{' '}
                    <em>o ACOS máximo tolerável é rigorosamente igual à margem de contribuição</em>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  <span>
                    <strong>Produto sem Estoque Estável ou Fornecedor Inseguro:</strong> Ligar
                    anúncio, gastar para posicionar e pausar por falta de estoque derruba o Ad Rank
                    e desperdiça todo o dinheiro investido.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  <span>
                    <strong>Conta com Reputação Amarela ou Laranja:</strong> Compradores desconfiam,
                    a taxa de conversão desaba e o leilão cobra CPC mais caro do vendedor
                    negativado.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  <span>
                    <strong>Anúncio sem Engenharia de Conversão:</strong> Fotos amadoras, sem ficha
                    técnica completa e sem vídeo. Anúncio ruim com tráfego pago vira ralo de
                    dinheiro.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Os 4 Erros Clássicos com ADS nas Plataformas */}
          <div className="bg-[#0B3B7A]/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700/80 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Os 4 Erros Críticos que Queimam Caixa em ADS de Marketplace
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-xs">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="font-mono text-amber-300 font-bold block text-sm">
                  #1 Anunciar sem Margem
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Ligar o anúncio sem ter a planilha de custos aberta. Se o produto deixa R$ 15,00
                  de margem e o anúncio gasta R$ 18,00 por venda, quanto mais você vende, mais
                  rápido a empresa quebra.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="font-mono text-amber-300 font-bold block text-sm">
                  #2 Não Auditar o ACOS Semanalmente
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Colocar a campanha no modo automático e nunca mais olhar. A concorrência entra no
                  leilão, o CPC sobe, o ACOS dispara de 12% para 35% e consome todo o faturamento da
                  loja.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="font-mono text-amber-300 font-bold block text-sm">
                  #3 Achar que ADS Conserta Produto Ruim
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Anúncio só compra tráfego, não compra desejo. Se o preço estiver fora do mercado,
                  as fotos forem borradas ou as avaliações forem de 1 ou 2 estrelas, o clique não
                  converte.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="font-mono text-amber-300 font-bold block text-sm">
                  #4 Tratar Campanha como Custo Fixo
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Não pausar campanhas de produtos esgotados ou deixar palavras-chave negativas
                  descontroladas, pagando por cliques de buscas que nada têm a ver com o item
                  vendido.
                </p>
              </div>
            </div>
          </div>

          {/* Box de Conexão com a Borlim: Como a Consultoria Calcula o ACOS Máximo */}
          <div className="bg-gradient-to-br from-[#082852] via-[#0B3B7A] to-[#082852] p-8 sm:p-10 rounded-3xl border-2 border-[#22C55E]/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[#22C55E] text-xs font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Metodologia Borlim de Gestão de Mídia
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Calculamos o <span className="text-emerald-300">ACOS Máximo Permitido</span> de
                  Cada Produto Antes de Você Ligar o Anúncio
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  Na <strong>Borlim Consultoria Empresarial</strong>, integramos a estratégia de ADS
                  diretamente com a nossa metodologia de{' '}
                  <Link
                    to="/formacao-de-preco"
                    className="text-emerald-300 underline underline-offset-4 hover:text-white font-semibold"
                  >
                    Formação de Preço
                  </Link>{' '}
                  e{' '}
                  <Link
                    to="/gestao-financeira"
                    className="text-emerald-300 underline underline-offset-4 hover:text-white font-semibold"
                  >
                    Gestão Financeira
                  </Link>
                  .
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Para cada SKU do seu catálogo, calculamos a margem de contribuição exata após
                  comissões, gateways, fretes e impostos. Com esse número na mão, configuramos o
                  teto inegociável de ACOS nas suas campanhas de Mercado Ads, Amazon Ads e Shopee
                  Ads. O resultado é uma esteira de crescimento previsível: você ganha escala de
                  vendas sem correr o risco de comprar faturamento às custas do seu patrimônio.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs text-slate-200">
                  <a
                    href="https://wa.me/5517997650672"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#22C55E] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#22C55E]" />
                    <span>(17) 99765-0672 (WhatsApp)</span>
                  </a>
                  <a
                    href="mailto:flavio@borlim.com.br"
                    className="flex items-center gap-2 hover:text-[#22C55E] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#22C55E]" />
                    <span>flavio@borlim.com.br</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 flex flex-col justify-between space-y-4 text-center">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E]">
                  Diagnóstico Financeiro de ADS
                </span>
                <p className="font-serif text-lg font-bold text-white">
                  Audite Agora os Anúncios do Seu E-commerce
                </p>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Descubra quais produtos estão gerando lucro real e quais campanhas estão drenando
                  o seu caixa.
                </p>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg border border-[#22C55E]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Falar no WhatsApp com o Flávio</span>
                  </a>

                  <a
                    href={balanceAnalysisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                    title="Acessar o Sistema de Gestão Empresarial da Borlim"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" />
                    <span>GESTÃO EMPRESARIAL</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEÇÃO "O QUE É O FULL" (DESTAQUE GRANDE) */}
      <section
        id="logistica-full"
        className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden"
      >
        <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 mb-3">
              <Boxes className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                Fulfillment Descomplicado
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              O que é o FULL e Como Funciona Dentro das Plataformas?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              O modelo <strong>FULL (Fulfillment)</strong> do Mercado Livre e equivalentes de
              mercado (como a <strong>Amazon FBA — Fulfilled by Amazon</strong> e Magalu Entregas)
              revolucionou a logística do e-commerce brasileiro. Entenda como funciona a operação,
              suas vantagens estratégicas e os riscos ocultos que podem quebrar sua margem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Como Funciona a Operação FULL */}
            <div className="lg:col-span-7 bg-[#0B3B7A]/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-slate-700/80 space-y-5">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#22C55E]" />
                Como o FULL Opera Passo a Passo
              </h3>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Envio em Lotes com NF-e de Remessa:</strong> Você
                    emite uma Nota Fiscal Eletrônica de simples remessa para depósito
                    fechado/armazém e envia seus produtos etiquetados individualmente com código de
                    barras próprio para o centro de distribuição da plataforma (ex.: Louveira,
                    Cajamar).
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Recebimento, Conferência & Estocagem:</strong> O
                    armazém confere lote, integridade e dimensões e guarda os produtos em suas
                    prateleiras robotizadas. O anúncio ganha imediatamente o{' '}
                    <span className="text-emerald-300 font-bold">selo verde FULL</span>.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Picking, Packing & Expedição Expressa:</strong>{' '}
                    Assim que o cliente compra, o próprio funcionário da plataforma separa o produto
                    (picking), embala na caixa oficial (packing) e despacha na frota própria com
                    entrega garantida no mesmo dia ou no dia seguinte.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-white">Gestão Centralizada de Devoluções:</strong> Se o
                    cliente devolver, o produto volta para o centro de distribuição deles, onde é
                    reavaliado e volta para o estoque disponível sem você precisar fazer nada.
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#082852] border border-emerald-500/30 rounded-xl">
                <span className="text-[11px] font-mono text-[#22C55E] font-bold block mb-1 uppercase">
                  Equivalente em Outras Plataformas
                </span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Na <strong>Amazon Brasil</strong>, o modelo chama-se <strong>Amazon FBA</strong>{' '}
                  (Fulfilled by Amazon). Os produtos ganham o selo Prime com frete grátis nacional e
                  prioridade absoluta no Buy Box. O Magalu opera o{' '}
                  <strong>Magalu Entregas Full</strong>, e a Shopee vem implantando seus centros
                  próprios de triagem rápida.
                </p>
              </div>
            </div>

            {/* Custos, Prós e Contras do FULL */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#22C55E] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Vantagens do FULL
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>
                      <strong>Conversão 2x a 3x maior:</strong> O comprador online dá preferência
                      absoluta a itens com entrega para o dia seguinte.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>
                      <strong>Prioridade no Algoritmo:</strong> Anúncios no FULL aparecem antes nas
                      páginas de resultado de busca.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>
                      <strong>Menos custo com equipe interna:</strong> Você não precisa de galpão
                      próprio nem de dezenas de embaladores.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <h4 className="font-serif text-lg font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Riscos e Desvantagens do FULL
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tarifa de Armazenagem Prolongada:</strong> Se o produto ficar mais de
                      60 dias sem vender, a plataforma cobra aluguel diário do espaço.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Devoluções sem inspeção sua:</strong> O armazém pode aceitar devolução
                      com embalagem rasgada sem você conferir pessoalmente.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Custo de retirada de estoque:</strong> Retirar produtos não vendidos
                      do FULL para o seu estoque gera tarifa de descarte ou coleta.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Exemplo Numérico de Produto Parado no FULL */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-800 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-[#0B3B7A]">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                Alerta Prático com Exemplo Numérico
              </span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
              O que Acontece com um Produto Parado 3 Meses no Armazém FULL?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Imagine que você enviou um lote de 100 unidades de um item volumoso (caixa de 40×30×20
              cm = 0,024 m³) com margem líquida planejada de R$ 30,00 por unidade. Se as vendas
              forem lentas e 40 unidades ficarem estocadas por mais de 90 dias, a plataforma aplica
              a <strong>tarifa de armazenagem prolongada</strong> (cobrada por decímetro
              cúbico/mês). Em 3 meses, cada unidade acumulou entre R$ 14,00 e R$ 22,00 em custos de
              armazenagem extra. Ao final, mais de 60% do lucro que sobraria no bolso foi consumido
              simplesmente por ter estocado demais no canal errado.
            </p>
            <div className="pt-2 font-mono text-xs text-[#15803D] font-bold">
              • Regra de Ouro da Borlim: Só envie para o FULL produtos com giro comprovado de 30 a
              45 dias. Para novidades ou itens de cauda longa, mantenha no estoque próprio
              (FBM/Envios Coleta).
            </div>
          </div>
        </div>
      </section>

      {/* 8. OS 5 ERROS CLÁSSICOS DO VENDEDOR DE E-COMMERCE */}
      <section
        id="erros-classicos"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Prevenção de Erros Críticos
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Os 5 Erros Clássicos do Vendedor de E-commerce
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            As armadilhas mais comuns que fazem operações de e-commerce faturarem alto enquanto os
            donos empobrecem — e a solução técnica que a Borlim aplica:
          </p>
        </div>

        <div className="space-y-6">
          {classicMistakes.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:border-[#16A34A] transition-all flex flex-col md:flex-row gap-6 items-start group"
            >
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#16A34A] shrink-0">
                {m.num}
              </span>
              <div className="space-y-3 flex-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852]">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {m.desc}
                </p>
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-sans text-[#15803D] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                  <span>
                    <strong>{m.solucao}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SINERGIA COM OS SERVIÇOS DA BORLIM */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Visão Holística & Integração
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Sinergia do E-commerce com Outros Serviços da Borlim
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O e-commerce não vive isolado. Ele precisa estar perfeitamente integrado à
              precificação, ao fluxo de caixa global e ao planejamento fiscal da sua empresa:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/formacao-de-preco"
              className="p-6 rounded-2xl bg-[#F0F4F8] hover:bg-white border border-slate-200 hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#082852] group-hover:text-[#0B3B7A]">
                  Formação de Preço
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Cálculo do markup real do produto para e-commerce, eliminando a ilusão de que
                  dobrar o CMV é garantia de lucro.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs font-mono font-bold text-[#15803D]">
                <span>Ver Formação de Preço</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/gestao-financeira"
              className="p-6 rounded-2xl bg-[#F0F4F8] hover:bg-white border border-slate-200 hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#082852] group-hover:text-[#0B3B7A]">
                  Gestão Financeira
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Fluxo de caixa projetado alinhado ao ciclo de recebimento das plataformas
                  (D+14/D+30) e Necessidade de Capital de Giro (NCG).
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs font-mono font-bold text-[#15803D]">
                <span>Ver Gestão Financeira</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/planejamento"
              className="p-6 rounded-2xl bg-[#F0F4F8] hover:bg-white border border-slate-200 hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#082852] group-hover:text-[#0B3B7A]">
                  Planejamento Econômico
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Planejamento dos três eixos (Financeiro, Econômico e BSC) com teste preventivo de
                  insolvência em 12 meses para vendas online.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs font-mono font-bold text-[#15803D]">
                <span>Ver Planejamento</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/agenda-tributaria"
              className="p-6 rounded-2xl bg-[#F0F4F8] hover:bg-white border border-slate-200 hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#082852] group-hover:text-[#0B3B7A]">
                  Agenda Tributária
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Calendário mensal dos vencimentos fiscais (DAS, ICMS, PIS/Cofins) para sua empresa
                  nunca pagar juros ou ter certidão travada.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs font-mono font-bold text-[#15803D]">
                <span>Ver Agenda Tributária</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FAQ - PERGUNTAS FREQUENTES EM ACORDEÃO */}
      <section id="faq" className="bg-white py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas com o Consultor
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre E-commerce & Vendas Online
            </h2>
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

      {/* 11. RODAPÉ INSTITUCIONAL & CTAs OFICIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Consultoria Especializada em E-commerce
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Transforme o volume de vendas do seu e-commerce em lucro líquido real no caixa.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o economista Flávio Bordignon e faça o diagnóstico de 48
                indicadores do sistema financeiro da sua operação online, audite suas taxas de
                comissão e frete no Mercado Livre, Amazon ou loja própria e previna riscos de
                insolvência imediata e em 12 meses.
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
                Gestão Empresarial & E-commerce
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-6 font-sans">
                Acesse o nosso sistema completo ou agende uma conversa diagnóstica.
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
                  <span>Falar sobre E-commerce no WhatsApp</span>
                </a>

                <Link
                  to="/sobre"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-mono uppercase tracking-wider rounded-lg transition-all border border-white/20"
                >
                  <span>Ver Página Sobre a Consultoria</span>
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
