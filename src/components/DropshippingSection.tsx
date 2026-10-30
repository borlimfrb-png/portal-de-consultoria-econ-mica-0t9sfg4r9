import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Boxes,
  Truck,
  ArrowRight,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Check,
  XCircle,
  FileSpreadsheet,
  ExternalLink,
  Phone,
  Mail,
  ShieldAlert,
  HelpCircle,
  Calculator,
  RefreshCw,
  Store,
  Tag,
  CalendarDays,
  Target,
  FlaskConical,
  Receipt,
  Scale,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

export function DropshippingSection() {
  const [activeTab, setActiveTab] = useState<
    'fluxo' | 'cascata' | 'pros_contras' | 'erros' | 'estrategia'
  >('fluxo')

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20Dropshipping%20e%20viabilidade%20financeira%20para%20minha%20empresa.'

  // 1. Etapas do fluxo prático de Dropshipping
  const flowSteps = [
    {
      num: '01',
      title: 'Cadastro no Catálogo com Preço Marcado',
      sub: 'Você publica na vitrine sem comprar uma única peça',
      desc: 'Você seleciona produtos no catálogo do fornecedor (nacional ou internacional), baixa fotos, otimiza descrição e título para SEO e cadastra em sua loja própria (Shopify, Nuvemshop) ou marketplace com o seu preço de venda estipulado (markup de varejo).',
      actor: 'Sua Loja / Você',
      actorColor: 'bg-emerald-50 text-[#15803D] border-emerald-200',
    },
    {
      num: '02',
      title: 'Cliente Compra e Paga a Você',
      sub: 'Liquidação da transação no seu checkout',
      desc: 'O consumidor final navega na sua vitrine, conclui a compra e paga o valor integral (ex.: R$ 200,00) via PIX, Cartão ou Boleto. O intermediador de pagamento processa a transação e o dinheiro cai na sua conta virtual (com prazo D+0 a D+30 conforme a taxa contratada).',
      actor: 'Consumidor Final',
      actorColor: 'bg-blue-50 text-[#0B3B7A] border-blue-200',
    },
    {
      num: '03',
      title: 'Você Compra do Fornecedor pelo Preço de Custo',
      sub: 'Envio do pedido com os dados de entrega do cliente',
      desc: 'Com a venda confirmada e o dinheiro garantido, você entra no painel do fornecedor parceiro e adquire o item pelo preço de atacado/custo (ex.: R$ 90,00), informando o endereço exato do seu cliente como destinatário da remessa.',
      actor: 'Seu Caixa / Fornecedor',
      actorColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      num: '04',
      title: 'Fornecedor Despacha Direto ao Cliente Final',
      sub: 'Você nunca toca fisicamente na mercadoria',
      desc: 'O fornecedor faz a separação (picking), embala o pacote com etiqueta contendo os dados do consumidor (frequentemente em modelo "blind dropshipping", sem notas com preço de custo de atacado na caixa) e despacha via Correios ou transportadora privada.',
      actor: 'Fornecedor Parceiro',
      actorColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      num: '05',
      title: 'Sua Margem é a Diferença Líquida',
      sub: 'O que sobra após custos de canal, frete, mídia e tributos',
      desc: 'A receita bruta da venda menos o preço pago ao fornecedor, deduzidas as comissões de gateway/canal, frete unitário não subsidiado, anúncios patrocinados (ADS) e a Nota Fiscal emitida pela sua empresa, forma o seu lucro líquido real por pedido.',
      actor: 'Resultado no Bolso',
      actorColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
    },
  ]

  // 2. Tabela de cascata numérica: Produto de R$ 200,00
  const costWaterfall = [
    {
      item: 'Preço de Venda Bruto ao Consumidor',
      valor: 'R$ 200,00',
      pct: '100,0%',
      tipo: 'receita',
      nota: 'Valor pago pelo cliente na loja ou marketplace',
    },
    {
      item: '(-) Custo da Mercadoria no Fornecedor (CMV Dropshipping)',
      valor: '- R$ 90,00',
      pct: '- 45,0%',
      tipo: 'custo',
      nota: 'Preço de atacado cobrado pelo fornecedor parceiro por unidade',
    },
    {
      item: '(-) Comissão do Canal / Mensalidade Diluída + Gateway de Pagamento',
      valor: '- R$ 24,00',
      pct: '- 12,0%',
      tipo: 'taxa',
      nota: 'Comissão de marketplace (10%-16%) ou taxa de gateway + taxa fixa de checkout',
    },
    {
      item: '(-) Frete de Envio Unitário (Não Subsidiado)',
      valor: '- R$ 28,00',
      pct: '- 14,0%',
      tipo: 'frete',
      nota: 'Sem o subsídio de centros FULL coletivos, o frete unitário sai mais caro',
    },
    {
      item: '(-) Custo de Aquisição de Cliente com ADS (Meta/Google Ads)',
      valor: '- R$ 26,00',
      pct: '- 13,0%',
      tipo: 'ads',
      nota: 'Custo por aquisição (CPA) com campanhas de tráfego pago para fechar 1 venda',
    },
    {
      item: '(-) Tributação Simples Nacional (Comércio — Anexo I)',
      valor: '- R$ 14,00',
      pct: '- 7,0%',
      tipo: 'imposto',
      nota: 'Nota Fiscal emitida sobre o total da venda (R$ 200,00), alíquota efetiva média',
    },
    {
      item: '(-) Provisão Técnica para Devoluções / Reembolsos / Chargebacks',
      valor: '- R$ 6,00',
      pct: '- 3,0%',
      tipo: 'risco',
      nota: 'Pelo CDC art. 49, o cliente pode devolver em 7 dias com frete reverso por sua conta',
    },
    {
      item: '(=) Margem Líquida Real no Bolso (Resultado Final)',
      valor: '+ R$ 12,00',
      pct: '+ 6,0%',
      tipo: 'lucro',
      nota: 'Sobra líquida real por unidade vendida (necessita de volume e giro contínuo)',
    },
  ]

  // 3. Pontos Fortes e Riscos
  const pros = [
    {
      title: 'Venda sem capital de giro preso em estoque',
      desc: 'Você não precisa empatar R$ 50 mil ou R$ 100 mil comprando contêineres ou caixas antes de saber se o público realmente quer comprar. Reduz drasticamente o risco de insolvência por mercadoria encalhada.',
    },
    {
      title: 'Laboratório de validação com baixo investimento',
      desc: 'Possibilidade de testar dezenas de nichos, modelos e categorias com orçamento enxuto de anúncios, descobrindo campeões de vendas antes de se comprometer com fornecedores locais.',
    },
    {
      title: 'Catálogo amplo e atualização contínua',
      desc: 'Como o espaço físico é do fornecedor, você pode listar centenas de itens no catálogo sem pagar aluguel de galpão, pallet ou taxa de armazenagem prolongada.',
    },
    {
      title: 'Alcance geográfico descentralizado',
      desc: 'Seus pedidos podem ser despachados de centros de distribuição próximos aos polos consumidores, sem a necessidade de manter filiais físicas espalhadas.',
    },
  ]

  const cons = [
    {
      title: 'Margem líquida unitária extremamente apertada',
      desc: 'Por não comprar em lotes industriais de atacado (containers de 1.000 peças), o custo unitário pago ao fornecedor é mais alto. Qualquer variação no preço do anúncio ou do frete pode transformar o lucro em prejuízo.',
    },
    {
      title: 'Dependência total da qualidade e do prazo do fornecedor',
      desc: 'Se o fornecedor atrasar a postagem, enviar produto com defeito ou usar embalagem inadequada, o cliente reclama e abre disputa com VOCÊ, não com a fábrica da qual ele sequer sabe a existência.',
    },
    {
      title: 'Altíssima concorrência com o mesmo catálogo',
      desc: 'Dezenas de outros vendedores têm acesso aos mesmos fornecedores e utilizam as mesmas fotos e vídeos, desencadeando guerras de preços que destroem a rentabilidade do nicho.',
    },
    {
      title: 'Risco fiscal, tributação na venda total e importação',
      desc: 'A venda foi feita pela sua empresa: você é obrigado a emitir NF-e sobre os R$ 200,00 integrais (e não apenas sobre os R$ 12,00 de margem). Em dropshipping internacional, há ainda o risco de pacotes taxados ou retidos na alfândega da Receita Federal.',
    },
  ]

  // 4. Erros clássicos do iniciante
  const beginnerMistakes = [
    {
      num: '01',
      title: 'Escolher produto apenas pelo preço de custo baixo',
      desc: 'Selecionar um item só porque custa R$ 15,00 no catálogo sem analisar se existe busca real, se a taxa de conversão compensa o clique no anúncio e se o frete unitário não supera o próprio preço da peça.',
      alerta:
        'Regra da Borlim: Valide a demanda com volume de busca e elasticidade-preço antes de subir campanhas de mídia.',
    },
    {
      num: '02',
      title: 'Não calcular a margem líquida com todos os custos deduzidos',
      desc: 'Achar que comprar por R$ 90,00 e vender por R$ 200,00 garante R$ 110,00 de lucro. Esquecer de deduzir imposto na emissão da NF-e, comissão do canal, taxa do meio de pagamento, taxa de devolução e o CPA (Custo por Aquisição) dos anúncios.',
      alerta:
        'Regra da Borlim: Faça a conta reversa completa. Margem que não considera ADS e imposto é prejuízo disfarçado.',
    },
    {
      num: '03',
      title: 'Não validar o fornecedor antes de anunciar',
      desc: 'Começar a vender sem fazer compras-teste para checar prazo real de postagem, qualidade da embalagem e comunicação. Em fornecedores internacionais, prazos de 30 a 60 dias geram enxurrada de cancelamentos e chargebacks no cartão.',
      alerta:
        'Regra da Borlim: Compre você mesmo o produto antes de anunciar. Teste o tracking, a embalagem e a velocidade.',
    },
    {
      num: '04',
      title: 'Ignorar a obrigação fiscal e a emissão de NF-e',
      desc: 'Acreditar no mito de que "como não tenho estoque físico, não preciso emitir nota". A operação mercantil para o consumidor final exige NF-e emitida pela sua empresa sob pena de autuação fiscal pelo Fisco estadual e federal.',
      alerta:
        'Regra da Borlim: Integre o checkout ao emissor fiscal da sua empresa. Consulte nossa Agenda Tributária para o Simples.',
    },
    {
      num: '05',
      title: 'Escalar anúncios sem ter equipe ou canal de suporte',
      desc: 'Acertar um anúncio campeão no Meta Ads, receber 300 pedidos no fim de semana e não ter suporte para responder dúvidas sobre código de rastreio, gerando bloqueio de conta de anúncios e retenção de saldo pelo gateway.',
      alerta:
        'Regra da Borlim: A escala operacional precisa andar no mesmo ritmo da capacidade de atendimento e pós-venda.',
    },
  ]

  return (
    <section
      id="dropshipping"
      className="bg-[#082852] text-white py-16 sm:py-24 border-y border-[#0B3B7A] relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#16A34A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#1557A6]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
              Modelo Sem Estoque Descomplicado
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Dropshipping na Prática: <br className="hidden sm:inline" />
            <span className="text-emerald-300">
              Como Funciona, Custos Reais e Viabilidade Financeira
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-4 font-sans leading-relaxed">
            Vender na internet sem precisar investir previamente em galpão ou comprar estoque em
            lotes fechados: entenda a engrenagem operacional completa do dropshipping, as diferenças
            cruciais em relação ao modelo tradicional e ao <strong>FULL</strong>, o cálculo real das
            margens na ponta do lápis e o papel estratégico deste modelo como{' '}
            <strong>laboratório de validação de produtos</strong> para a sua empresa.
          </p>
        </div>

        {/* Comparativo de 1 Frase em Destaque */}
        <div className="mb-12 p-6 sm:p-7 rounded-2xl bg-[#0B3B7A]/80 border border-emerald-500/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#22C55E]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E]">
              Síntese Comparativa em Uma Frase
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#082852]/70 border border-white/10 space-y-1.5">
              <span className="font-mono text-xs uppercase font-bold text-slate-400 block">
                1. Estoque Próprio Tradicional
              </span>
              <p className="text-slate-200">
                <strong>Você compra antes:</strong> investe capital próprio no lote, armazena no seu
                galpão, embala e despacha cada pedido. Margem unitária maior, mas com capital de
                giro empatado e risco de encalhe.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#082852]/70 border border-white/10 space-y-1.5">
              <span className="font-mono text-xs uppercase font-bold text-[#22C55E] block">
                2. Logística FULL (Fulfillment)
              </span>
              <p className="text-slate-200">
                <strong>O estoque é seu, mas a entrega é terceirizada:</strong> você compra a
                mercadoria antecipadamente e remete em lote aos armazéns do Mercado Livre/Amazon
                para envio expresso em até 24h.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#082852]/70 border border-emerald-400/30 space-y-1.5 ring-1 ring-emerald-500/40">
              <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
                3. Dropshipping
              </span>
              <p className="text-white">
                <strong>Você nunca vê o produto:</strong> vende na sua vitrine, o cliente paga a
                você, você encomenda ao fornecedor e este envia direto ao comprador final. Zero
                estoque físico, mas margens bem mais enxutas.
              </p>
            </div>
          </div>
        </div>

        {/* Abas de Navegação Interna da Seção */}
        <div className="flex flex-wrap gap-2 border-b border-slate-700/80 pb-4 mb-8 text-xs sm:text-sm font-mono font-bold">
          <button
            onClick={() => setActiveTab('fluxo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
              activeTab === 'fluxo'
                ? 'bg-[#16A34A] text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>1. Fluxo em 5 Etapas</span>
          </button>

          <button
            onClick={() => setActiveTab('cascata')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
              activeTab === 'cascata'
                ? 'bg-[#16A34A] text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>2. Exemplo Numérico (R$ 200,00)</span>
          </button>

          <button
            onClick={() => setActiveTab('pros_contras')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
              activeTab === 'pros_contras'
                ? 'bg-[#16A34A] text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>3. Pontos Fortes & Riscos</span>
          </button>

          <button
            onClick={() => setActiveTab('erros')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
              activeTab === 'erros'
                ? 'bg-[#16A34A] text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>4. Erros do Iniciante</span>
          </button>

          <button
            onClick={() => setActiveTab('estrategia')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
              activeTab === 'estrategia'
                ? 'bg-[#16A34A] text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>5. Quando Vale a Pena & Borlim</span>
          </button>
        </div>

        {/* CONTEÚDO DAS ABAS */}

        {/* ABA 1: FLUXO EM 5 ETAPAS */}
        {activeTab === 'fluxo' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 bg-[#0B3B7A]/60 rounded-2xl border border-slate-700/80">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-[#22C55E]" />
                O Ciclo Operacional do Dropshipping Passo a Passo
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                No dropshipping tradicional, você atua como a <strong>
                  vitrine comercial
                </strong> e a
                retaguarda de atendimento ao cliente, enquanto o fornecedor atua como o armazém
                logístico e despachante físico da encomenda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {flowSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-[#16A34A]/60 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-[#22C55E] group-hover:scale-105 transition-transform">
                        {step.num}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${step.actorColor}`}
                      >
                        {step.actor}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-white leading-snug">
                      {step.title}
                    </h4>

                    <p className="text-[11px] font-mono text-emerald-300 font-semibold leading-tight">
                      {step.sub}
                    </p>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Infográfico resumido da dinâmica financeira */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B3B7A] to-[#082852] border border-white/15 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase text-[#22C55E] font-bold">
                  Entrada no Caixa
                </span>
                <p className="text-sm font-sans text-slate-200">
                  Cliente paga o preço cheio na sua loja virtual (ex.: <strong>R$ 200,00</strong>).
                  O dinheiro ingressa via gateway ou marketplace.
                </p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/15 md:pl-6 pt-3 md:pt-0">
                <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                  Saída do Caixa
                </span>
                <p className="text-sm font-sans text-slate-200">
                  Você repassa o preço de atacado ao fornecedor (ex.: <strong>R$ 90,00</strong>) +
                  comissões, fretes, ADS e a alíquota fiscal da NF-e.
                </p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/15 md:pl-6 pt-3 md:pt-0">
                <span className="text-[11px] font-mono uppercase text-emerald-300 font-bold">
                  Sua Margem Líquida
                </span>
                <p className="text-sm font-sans text-slate-200">
                  O lucro líquido final (ex.: <strong>R$ 12,00 ou 6%</strong>) exige escala
                  consistente para gerar faturamento expressivo no mês.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: CASCATA NUMÉRICA DETALHADA (PRODUTO R$ 200,00) */}
        {activeTab === 'cascata' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 bg-[#0B3B7A]/60 rounded-2xl border border-slate-700/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#22C55E]" />
                    Cascata Numérica Real: Produto Vendido a R$ 200,00
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                    Exemplo real de engenharia de custos para um produto de consumo vendido sem
                    estoque próprio no Brasil:
                  </p>
                </div>
                <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                    Margem Líquida Final
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                    R$ 12,00 (6,0%)
                  </span>
                </div>
              </div>
            </div>

            {/* Tabela da cascata de custos */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 text-slate-800 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#082852] text-white font-mono text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Etapa de Custo / Receita</th>
                      <th className="py-3.5 px-4 text-right">Valor em Real (R$)</th>
                      <th className="py-3.5 px-4 text-right">% s/ Venda</th>
                      <th className="py-3.5 px-4 sm:px-6">Justificativa Operacional & Regra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans">
                    {costWaterfall.map((row, idx) => {
                      const isLucro = row.tipo === 'lucro'
                      const isReceita = row.tipo === 'receita'
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isLucro
                              ? 'bg-emerald-50/90 font-bold'
                              : isReceita
                                ? 'bg-blue-50/70 font-semibold'
                                : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3.5 px-4 sm:px-6">
                            <span
                              className={
                                isLucro
                                  ? 'text-[#15803D] font-bold'
                                  : isReceita
                                    ? 'text-[#082852]'
                                    : 'text-slate-700'
                              }
                            >
                              {row.item}
                            </span>
                          </td>
                          <td
                            className={`py-3.5 px-4 text-right font-mono font-bold ${
                              isLucro
                                ? 'text-[#15803D] text-base'
                                : isReceita
                                  ? 'text-[#082852]'
                                  : 'text-rose-600'
                            }`}
                          >
                            {row.valor}
                          </td>
                          <td
                            className={`py-3.5 px-4 text-right font-mono font-semibold ${
                              isLucro
                                ? 'text-[#15803D]'
                                : isReceita
                                  ? 'text-[#082852]'
                                  : 'text-slate-600'
                            }`}
                          >
                            {row.pct}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-600 font-sans">
                            {row.nota}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Destaque analítico da Borlim sobre o frete e ADS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
                  <Truck className="w-4 h-4" />
                  <span>O Peso do Frete Unitário no Dropshipping</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  No modelo com estoque próprio ou no FULL coletivo, a empresa despacha centenas de
                  pacotes em rotas otimizadas com tarifas negociadas de R$ 12 a R$ 18. No
                  dropshipping, cada envio é unitário e sai do centro do fornecedor sem subsídio
                  massivo, gerando despesas de <strong>R$ 25 a R$ 35 por envio</strong> que
                  comprimem severamente a margem.
                </p>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-[#22C55E] font-mono text-xs uppercase font-bold">
                  <Target className="w-4 h-4" />
                  <span>A Dependência Crítica de ADS (CPC & ROAS)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Como uma loja de dropshipping não tem marca consolidada e raramente ganha tráfego
                  orgânico no início, cada venda precisa ser comprada com anúncios patrocinados no
                  Meta (Instagram/Facebook) ou Google Ads. Se o seu Custo por Aquisição (CPA) subir
                  de R$ 26,00 para R$ 39,00, a operação{' '}
                  <strong>entra imediatamente no prejuízo</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: PONTOS FORTES & RISCOS */}
        {activeTab === 'pros_contras' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 bg-[#0B3B7A]/60 rounded-2xl border border-slate-700/80">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#22C55E]" />
                Balanço Estratégico: Onde o Dropshipping Ganha e Onde Ele Falha
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Nenhuma modalidade é mágica. Analise com serenidade empresarial os atrativos de
                liquidez e as vulnerabilidades operacionais antes de colocar dinheiro na operação.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pontos Fortes */}
              <div className="bg-white/5 border border-white/10 p-6 sm:p-7 rounded-2xl space-y-5">
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle2 className="w-5 h-5" />
                  <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wide">
                    Pontos Fortes do Dropshipping
                  </h4>
                </div>

                <div className="space-y-4">
                  {pros.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
                        <span className="font-serif text-sm font-bold text-emerald-200">
                          {p.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed pl-6">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Riscos e Pontos Fracos */}
              <div className="bg-white/5 border border-white/10 p-6 sm:p-7 rounded-2xl space-y-5">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wide">
                    Riscos & Pontos Fracos
                  </h4>
                </div>

                <div className="space-y-4">
                  {cons.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-serif text-sm font-bold text-amber-200">
                          {c.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed pl-6">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aviso especial da Nota Fiscal e Tributos */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
                <Receipt className="w-4 h-4" />
                <span>Alerta Fiscal e Tributário Borlim: A Venda é Sua</span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed">
                Muitos novos empreendedores imaginam equivocadamente que a nota fiscal deve ser
                emitida apenas pelo fornecedor ou sobre o valor líquido que sobra.{' '}
                <strong>Atenção:</strong> perante o Fisco brasileiro, quem realizou a venda
                mercantil ao consumidor final foi a sua empresa. A Nota Fiscal Eletrônica (NF-e)
                deve ser emitida sobre o <strong>valor total pago pelo cliente (R$ 200,00)</strong>.
                Emissão incorreta gera risco de autuação com multas pesadas. Conecte sua operação à
                nossa{' '}
                <Link
                  to="/agenda-tributaria"
                  className="text-emerald-300 underline font-bold hover:text-white"
                >
                  Agenda Tributária
                </Link>{' '}
                para manter o Simples Nacional em dia.
              </p>
            </div>
          </div>
        )}

        {/* ABA 4: ERROS CLÁSSICOS DO INICIANTE */}
        {activeTab === 'erros' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 bg-[#0B3B7A]/60 rounded-2xl border border-slate-700/80">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Os 5 Erros Críticos que Fazem Iniciantes Perderem Dinheiro
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                A ilusão de "abrir loja sem dinheiro" faz milhares de pessoas anunciarem sem
                planejamento matemático básico. Conheça as armadilhas mais comuns diagnosticadas
                pela Borlim:
              </p>
            </div>

            <div className="space-y-4">
              {beginnerMistakes.map((m) => (
                <div
                  key={m.num}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row gap-5 items-start hover:border-[#16A34A]/50 transition-all group"
                >
                  <span className="font-mono text-3xl font-bold text-[#22C55E] shrink-0">
                    {m.num}
                  </span>

                  <div className="space-y-2 flex-1">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      {m.desc}
                    </p>
                    <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-sans text-emerald-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                      <span>
                        <strong>{m.alerta}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 5: QUANDO VALE A PENA & COMO A BORLIM AJUDA */}
        {activeTab === 'estrategia' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 bg-[#0B3B7A]/60 rounded-2xl border border-slate-700/80">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#22C55E]" />
                A Regra Prática da Borlim: O Dropshipping como Laboratório de Produtos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Para a Borlim Consultoria, o dropshipping raramente deve ser o modelo definitivo de
                longo prazo de uma marca forte, mas sim um{' '}
                <strong>extraordinário laboratório de testes</strong> com risco de capital quase
                zero.
              </p>
            </div>

            {/* A Estratégia de Migração: Laboratório → Estoque Próprio / FULL */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-800 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#082852]">
                <Target className="w-5 h-5 text-[#16A34A]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Metodologia da Borlim para Escala Segura
                </span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
                A Esteira de Maturação: Validar no Dropshipping e Migrar para o FULL
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-mono text-xs uppercase font-bold text-[#15803D] block">
                    Fase 1: Laboratório (Dropshipping)
                  </span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Você lista 20 itens diferentes sem gastar capital de compra. Roda anúncios de
                    baixo orçamento para testar aceitação, taxa de clique e conversão.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-mono text-xs uppercase font-bold text-[#0B3B7A] block">
                    Fase 2: Gatilho de Volume (Meta de Vendas)
                  </span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Quando 2 ou 3 produtos atingem vendas recorrentes consistentes (ex.: 50 a 100
                    unidades/mês), a demanda está comprovada e o risco comercial cai a quase zero.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                  <span className="font-mono text-xs uppercase font-bold text-[#15803D] block">
                    Fase 3: Compra em Lote & FULL
                  </span>
                  <p className="text-xs text-slate-700 font-sans leading-relaxed">
                    Você negocia direto com a fábrica em atacado (comprando por R$ 50 em vez de R$
                    90) e envia para o FULL. Sua margem salta de 6% para mais de 22% com frete
                    expresso.
                  </p>
                </div>
              </div>
            </div>

            {/* BOX: COMO A BORLIM AJUDA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0B3B7A] to-[#082852] border border-[#22C55E]/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#22C55E]/40 font-mono text-[11px] font-bold uppercase tracking-wider text-[#22C55E]">
                    Retaguarda Financeira Borlim
                  </span>
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Como a Consultoria Econômica da Borlim Blinda sua Operação
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
                  Não deixamos sua empresa operar no escuro. Nossos consultores atuam nos 3 pontos
                  de maior vulnerabilidade do dropshipping:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs uppercase font-bold">
                      <Tag className="w-4 h-4" />
                      <span>Formação de Preço Real</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Cálculo de markup reverso por SKU com todas as comissões de gateway, canais e
                      fretes unitários deduzidos. Conheça nossa página de{' '}
                      <Link
                        to="/formacao-de-preco"
                        className="text-emerald-300 underline font-semibold hover:text-white"
                      >
                        Formação de Preço
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs uppercase font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>Fluxo de Caixa & NCG</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Planejamento do descasamento financeiro: se você paga o fornecedor em D+0 (no
                      cartão de crédito) e recebe do marketplace em D+14/D+30, você precisa de
                      capital de giro. Veja{' '}
                      <Link
                        to="/gestao-financeira"
                        className="text-emerald-300 underline font-semibold hover:text-white"
                      >
                        Gestão Financeira
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs uppercase font-bold">
                      <CalendarDays className="w-4 h-4" />
                      <span>Agenda Tributária & NF-e</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Enquadramento correto no Simples Nacional para evitar bitributação indevida e
                      multas por falta de emissão de NF-e na venda mercantil. Consulte a{' '}
                      <Link
                        to="/agenda-tributaria"
                        className="text-emerald-300 underline font-semibold hover:text-white"
                      >
                        Agenda Tributária
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* CTAs Oficiais na Seção */}
                <div className="pt-4 flex flex-wrap gap-3 items-center">
                  <a
                    href={balanceAnalysisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md border border-[#22C55E]/40"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>GESTÃO EMPRESARIAL</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-100" />
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-[#082852] text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow"
                  >
                    <Phone className="w-4 h-4 text-[#16A34A]" />
                    <span>(17) 99765-0672 (WhatsApp)</span>
                  </a>

                  <a
                    href="mailto:flavio@borlim.com.br?subject=Consulta%20Dropshipping%20-%20Borlim"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-mono"
                  >
                    <Mail className="w-4 h-4 text-emerald-300" />
                    <span>flavio@borlim.com.br</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
