import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  BadgeDollarSign,
  Info,
  Layers,
  Percent,
  Compass,
  Tag,
  ShieldCheck,
  Check,
  Phone,
  Coins,
} from 'lucide-react'

export interface RegimeTributario {
  id: 'simples' | 'presumido' | 'real'
  nome: string
  subtitulo: string
  tag: string
  limiteFaturamento: {
    valor: string
    detalhe: string
    sublimite?: string
  }
  comoFunciona: {
    resumo: string
    pontos: { titulo: string; texto: string }[]
  }
  vantagens: string[]
  cuidados: string[]
  conexaoReforma: {
    titulo: string
    impacto: string
    alertaPratico: string
  }
  perfilIdeal: string
}

export const REGIMES_DATA: RegimeTributario[] = [
  {
    id: 'simples',
    nome: 'Simples Nacional',
    subtitulo: 'Regime Simplificado e Unificado para Micro e Pequenas Empresas (LC 123/2006)',
    tag: 'Até R$ 4,8 milhões/ano',
    limiteFaturamento: {
      valor: 'R$ 4,8 milhões / ano',
      detalhe:
        'Equivale à média de R$ 400.000,00 por mês (calculado proporcionalmente no ano de início de atividade).',
      sublimite:
        'Sublimite de R$ 3,6 milhões / ano para recolhimento unificado de ICMS (estadual) e ISS (municipal). Ultrapassando R$ 3,6 mi, a empresa recolhe os tributos federais no DAS e o ICMS/ISS por fora nas regras estaduais/municipais.',
    },
    comoFunciona: {
      resumo:
        'Regime tributário simplificado que reúne até 8 tributos (IRPJ, CSLL, PIS, Cofins, IPI, CPP, ICMS e ISS) em uma única guia mensal de recolhimento, o DAS (Documento de Arrecadação do Simples Nacional). As alíquotas são progressivas e calculadas com base na Receita Bruta Acumulada nos últimos 12 meses (RBT12).',
      pontos: [
        {
          titulo: 'Guia Única DAS (Documento de Arrecadação do Simples)',
          texto:
            'Unifica tributos federais, estaduais e municipais em um único vencimento mensal (geralmente dia 20), reduzindo burocracia contábil e de emissão.',
        },
        {
          titulo: 'Tabelas por Anexos (I ao V) conforme a atividade',
          texto:
            'A empresa é enquadrada em um anexo de acordo com seu CNAE: Anexo I (Comércio), Anexo II (Indústria), Anexo III (Serviços gerais como manutenção e instalação), Anexo IV (Serviços com INSS patronal recolhido à parte, como advocacia e vigilância) e Anexo V (Serviços intelectuais, engenharia, consultoria e tecnologia).',
        },
        {
          titulo: 'Alíquotas Progressivas por Faixa de Faturamento',
          texto:
            'Cada anexo possui 6 faixas de receita bruta. Conforme o faturamento anual cresce, a alíquota nominal aumenta, mas aplica-se uma parcela a deduzir para encontrar a alíquota efetiva real da nota fiscal.',
        },
        {
          titulo: 'Regra do Fator R (Folha de Salários / Receita Bruta)',
          texto:
            'Mecanismo decisivo para prestadores de serviços: se a razão entre a folha de pagamento (salários, pró-labore e encargos) dos últimos 12 meses e a receita bruta for igual ou superior a 28% (Fator R ≥ 0,28), a empresa pode tributar no Anexo III (alíquotas iniciais de 6%), em vez do Anexo V (alíquotas a partir de 15,5%). Uma economia expressiva.',
        },
      ],
    },
    vantagens: [
      'Recolhimento unificado de até 8 tributos em um único documento (DAS), simplificando a rotina administrativa.',
      'Carga tributária frequentemente menor nas faixas iniciais de faturamento (a partir de 4% no Comércio e 6% em Serviços com Fator R).',
      'Dispensa do recolhimento da cota patronal previdenciária de 20% do INSS na folha da maioria dos anexos (incluso na guia DAS, exceto Anexo IV).',
      'Menor volume de obrigações acessórias complexas em comparação aos regimes de Lucro Presumido e Real.',
      'Facilidade de abertura, regularização e parcelamentos especiais perante o Comitê Gestor do Simples Nacional (CGSN).',
    ],
    cuidados: [
      'Tributação sobre o Faturamento Bruto: se a empresa operar no prejuízo em determinado mês, continuará obrigada a recolher o imposto integral sobre as notas emitidas.',
      'Restrição de créditos para clientes B2B (empresas): o Simples transfere apenas uma fração mínima de crédito fiscal de ICMS/PIS/Cofins, o que pode afastar clientes industriais e grandes corporações.',
      'Monitoramento rigoroso do Fator R: se a folha cair abaixo de 28% do faturamento, a tributação salta automaticamente do Anexo III para o pesado Anexo V.',
      'Sublimite de R$ 3,6 milhões: ao ultrapassar essa marca, a empresa continua no Simples Federal, mas passa a apurar ICMS e ISS no regime normal com toda a burocracia estadual e municipal (dupla rotina).',
    ],
    conexaoReforma: {
      titulo: 'Como a Reforma Tributária (IBS e CBS) impacta o Simples Nacional:',
      impacto:
        'A Emenda Constitucional 132/2023 manteve o Simples Nacional integralmente resguardado. No entanto, cria uma encruzilhada estratégica: quando uma empresa do Simples vende para outra empresa (B2B), o comprador só pode aproveitar como crédito de IBS e CBS o valor efetivamente recolhido no DAS — que é muito baixo. Para não perder grandes clientes, a lei permite que a empresa do Simples opte por recolher o IBS e a CBS "por fora", transferindo crédito integral de 100% como se estivesse no regime geral.',
      alertaPratico:
        'A Borlim simula se vale a pena para o seu negócio manter o DAS integral ou segregar o IBS/CBS por fora a partir de 2027, preservando sua competitividade comercial.',
    },
    perfilIdeal:
      'Micro e pequenas empresas (comércio varejista, serviços locais e indústrias leves) com faturamento até R$ 4,8 milhões/ano, margens de lucro saudáveis e foco de vendas prioritariamente no consumidor final (B2C) ou em clientes que não demandam alto crédito fiscal.',
  },
  {
    id: 'presumido',
    nome: 'Lucro Presumido',
    subtitulo: 'Tributação Simplificada com Base em Margens de Lucro Fixadas por Lei (IRPJ e CSLL)',
    tag: 'Até R$ 78 milhões/ano',
    limiteFaturamento: {
      valor: 'R$ 78 milhões / ano',
      detalhe:
        'Limite máximo de receita total no ano-calendário anterior (ou R$ 6,5 milhões multiplicado pelos meses de atividade no ano de início).',
      sublimite:
        'Vedações legais: não podem optar bancos comerciais, financeiras, cooperativas de crédito, seguradoras, factoring, empresas com rendimentos do exterior ou que usufruam de benefícios fiscais específicos.',
    },
    comoFunciona: {
      resumo:
        'A Receita Federal não exige a comprovação contábil do lucro efetivo da empresa para apurar os impostos federais de renda. O fisco "presume" qual foi o seu lucro a partir de percentuais pré-definidos em lei sobre o faturamento bruto, aplicando sobre essa base presumida as alíquotas de IRPJ (15% + adicional de 10% sobre o que exceder R$ 20 mil/mês) e CSLL (9%). PIS e Cofins são apurados no regime cumulativo (alíquota conjunta de 3,65%), sem apropriação de créditos de insumos.',
      pontos: [
        {
          titulo: 'Tabela de Margens de Presunção de Lucro',
          texto:
            'Comércio, indústria, transporte de cargas e atividade imobiliária: presunção de 8% da receita para o IRPJ e 12% para a CSLL. Serviços em geral e locação de bens móveis: presunção de 32% tanto para IRPJ quanto para CSLL. Serviços hospitalares e transportes de passageiros possuem presunções diferenciadas (8% a 16%).',
        },
        {
          titulo: 'Alíquotas de IRPJ e CSLL (Apuração Trimestral)',
          texto:
            'IRPJ: 15% sobre o lucro presumido + adicional de 10% sobre a parcela do lucro presumido que superar R$ 60.000,00 no trimestre (R$ 20 mil/mês). CSLL: 9% sobre a base de presunção (ou 15% a 20% para instituições financeiras). Vencem no último dia útil do mês seguinte a cada trimestre civil (abril, julho, outubro e janeiro).',
        },
        {
          titulo: 'PIS e COFINS no Regime Cumulativo (3,65%)',
          texto:
            'PIS (0,65%) e COFINS (3,00%) incidem diretamente sobre a receita bruta mensal sem permitir desconto de créditos das compras, mercadorias ou insumos. A vantagem é a alíquota nominal baixa (3,65% no total).',
        },
        {
          titulo: 'Tributos Estaduais e Municipais por Fora',
          texto:
            'Diferente do Simples, no Lucro Presumido o ICMS (estadual) e o ISS (municipal, de 2% a 5%) são apurados e recolhidos separadamente em guias próprias segundo as regras de cada localidade.',
        },
      ],
    },
    vantagens: [
      'Grande vantagem econômica quando a margem de lucro real da empresa for SUPERIOR ao percentual legal presumido (exemplo: empresa de serviços com 45% de margem real só paga IRPJ/CSLL sobre 32%; indústria com 15% de margem real só paga sobre 8%). O lucro excedente é distribuído aos sócios 100% isento de imposto de renda.',
      'Apuração contábil mais simples do que o Lucro Real, com menor risco de glosa de despesas operacionais pela fiscalização da Receita Federal.',
      'Alíquotas nominais baixas de PIS e Cofins (3,65% total), favoráveis para empresas com baixas compras e poucas despesas dedutíveis.',
      'Previsibilidade tributária: os custos com tributos federais são diretamente proporcionais à receita auferida.',
    ],
    cuidados: [
      'Tributação cega: se a empresa operar com margem de lucro baixa ou registrar prejuízo contábil no trimestre, pagará o IRPJ e CSLL como se tivesse tido lucro presumido normalmente.',
      'Presunção alta de 32% para serviços: para empresas de serviços com custos elevados de operação ou folha expressiva, a presunção de 32% pode representar uma carga excessiva em relação ao Lucro Real.',
      'Impossibilidade de tomar créditos de PIS/Cofins sobre compras de mercadorias, insumos, aluguel, energia ou serviços tomados.',
      'Obrigações acessórias federais rigorosas: SPED ECF, EFD Contribuições, DCTF e EFD-Reinf com penalidades severas por atraso ou inconsistência.',
    ],
    conexaoReforma: {
      titulo: 'Como a Reforma Tributária (IBS e CBS) impacta o Lucro Presumido:',
      impacto:
        'O Lucro Presumido sofrerá uma das maiores transformações estruturais da reforma. O regime cumulativo de PIS/Cofins a 3,65% será COMPLETAMENTE EXTINTO a partir de 2027, sendo substituído pela CBS federal (prevista em cerca de 8,5% a 9% com não cumulatividade plena). Para empresas de serviços que hoje pagam 3,65% de PIS/Cofins e 2% a 5% de ISS (total de 5,65% a 8,65%), a alíquota combinada de IBS + CBS poderá saltar para perto de 27%. Como a folha de salários não gera créditos no IVA, a carga sobre serviços no Lucro Presumido terá pressão substancial.',
      alertaPratico:
        'Empresas no Lucro Presumido devem reavaliar urgentemente seus markups de preço e planejar a viabilidade de migração para o Lucro Real ou reestruturação societária antes de 2027.',
    },
    perfilIdeal:
      'Empresas com faturamento anual de até R$ 78 milhões, margens operacionais elevadas (superiores a 8% no comércio/indústria ou superiores a 32% em serviços), folha salarial moderada e poucos insumos dedutíveis.',
  },
  {
    id: 'real',
    nome: 'Lucro Real',
    subtitulo:
      'Tributação sobre o Resultado Efetivo da Contabilidade (Lucro Líquido Ajustado no LALUR)',
    tag: 'Obrigatório acima de R$ 78 mi/ano ou facultativo',
    limiteFaturamento: {
      valor: 'Sem limite de teto (ilimitado)',
      detalhe:
        'É o regime geral e definitivo. Obrigatório para empresas com faturamento superior a R$ 78 milhões no ano anterior.',
      sublimite:
        'Obrigatoriedade por atividade: instituições financeiras, cooperativas de crédito, seguradoras, entidades de previdência aberta, empresas de factoring, empresas que obtiverem lucros, rendimentos ou ganhos de capital no exterior e empresas que usufruam de benefícios fiscais de isenção ou redução de tributos federais.',
    },
    comoFunciona: {
      resumo:
        'A base de cálculo do IRPJ e da CSLL é o Lucro Líquido apurado pela contabilidade comercial societária, ajustado pelas adições (despesas não dedutíveis por lei) e exclusões (receitas isentas) registradas no Livro de Apuração do Lucro Real (LALUR/LACS). Se a empresa registrar prejuízo fiscal contábil, fica dispensada de pagar IRPJ e CSLL no período. PIS e Cofins operam no regime não cumulativo (alíquota conjunta de 9,25%), permitindo amplo abatimento de créditos fiscais sobre insumos, mercadorias, fretes, energia e depreciação.',
      pontos: [
        {
          titulo: 'Apuração Trimestral ou Anual por Estimativa',
          texto:
            'A empresa escolhe a apuração Trimestral (definitiva a cada encerramento de trimestre) ou Anual (recolhimentos mensais por estimativa ou balancetes de suspensão/redução, com ajuste definitivo em 31 de dezembro). A sistemática anual confere maior flexibilidade de caixa.',
        },
        {
          titulo: 'Alíquotas de IRPJ (15% + 10%) e CSLL (9% a 20%)',
          texto:
            'IRPJ: 15% sobre o Lucro Real apurado + adicional de 10% sobre o excedente a R$ 20 mil por mês. CSLL: 9% geral (15% para cooperativas de crédito e até 20% para bancos comerciais). Vigorando apenas se houver lucro tributável.',
        },
        {
          titulo: 'Compensação de Prejuízos Fiscais Acumulados',
          texto:
            'Prejuízos fiscais apurados em trimestres ou anos anteriores podem ser compensados em períodos futuros com lucros tributáveis, limitados à trava legal de 30% do lucro real do período (a trava dos 30%), sem prazo de decadência.',
        },
        {
          titulo: 'PIS e COFINS Não Cumulativos (9,25%) com Crédito Pleno',
          texto:
            'PIS (1,65%) e COFINS (7,60%) incidem sobre o faturamento, mas a empresa tem o direito legal de descontar créditos calculados nas mesmas alíquotas sobre matérias-primas, insumos industriais, energia elétrica do processo produtivo, aluguéis de prédios e máquinas, fretes e depreciação de bens do ativo imobilizado.',
        },
      ],
    },
    vantagens: [
      'Justiça tributária em momentos adversos: se a empresa não tiver lucro ou registrar prejuízo em períodos de crise ou investimentos vultosos, o recolhimento de IRPJ e CSLL é ZERO.',
      'Possibilidade de compensar até 30% do lucro de cada período com prejuízos fiscais anteriores (LALUR).',
      'Aproveitamento amplo de créditos de PIS (1,65%) e Cofins (7,60%) sobre insumos, compras de mercadorias para revenda, aluguéis, fretes, armazenagem e ativos produtivos.',
      'Permite deduções de despesas operacionais comprovadas (pesquisa, tecnologia, juros sobre capital próprio - JCP, perdas com créditos incobráveis).',
      'Total conformidade com governança corporativa, auditorias externas (Big Four), atração de investidores de Private Equity e processos de M&A (fusões e aquisições).',
    ],
    cuidados: [
      'Exigência máxima de controle contábil: cada despesa da empresa precisa ter nota fiscal hábil, comprovante bancário e aderência às regras do RIR (Regulamento do Imposto de Renda). Glosas fiscais geram autos de infração com multas de 75% a 150%.',
      'Alíquotas elevadas de PIS (1,65%) e Cofins (7,60%) = 9,25%: se o negócio tiver poucos insumos ou custos concentrados em folha de pagamento e mão de obra humana (que não geram créditos de PIS/Cofins), o recolhimento será muito pesado.',
      'Custo operacional e de honorários contábeis significativamente maior devido à complexidade da escrituração do LALUR/LACS e do SPED Contábil/Fiscal (ECD, ECF).',
      'Risco de trava nos balancetes de suspensão caso a documentação financeira não seja fechada tempestivamente mês a mês.',
    ],
    conexaoReforma: {
      titulo: 'Como a Reforma Tributária (IBS e CBS) impacta o Lucro Real:',
      impacto:
        'As empresas que já operam com excelência no Lucro Real são as MAIS BEM PREPARADAS para a nova Reforma Tributária. Como a espinha dorsal do novo IVA Dual (IBS e CBS) é a NÃO CUMULATIVIDADE PLENA com crédito financeiro irrestrito sobre tudo o que a empresa consome, quem já tem cultura de auditar notas fiscais de entrada, controlar créditos de insumos e gerenciar o SPED Fiscal terá enorme vantagem competitiva. Além disso, a CBS extingue o litígio sobre o "conceito de insumo" do PIS/Cofins, ampliando o leque de créditos automáticos.',
      alertaPratico:
        'A Borlim realiza o Planejamento Tributário Integrado para auditar se a transição para o Lucro Real pode reduzir a carga global da sua empresa sob o novo regime do IVA Dual.',
    },
    perfilIdeal:
      'Empresas com faturamento acima de R$ 78 milhões/ano (obrigatórias); empresas com margens de lucro reais baixas (inferiores a 8% no comércio/indústria ou inferiores a 32% em serviços); negócios com alto custo de compras de insumos e mercadorias tributadas; empresas em fase de forte expansão, modernização ou que apresentem prejuízos fiscais a compensar.',
  },
]

export const COMPARATIVO_REGIMES = [
  {
    criterio: 'Limite Anual de Faturamento',
    simples: 'Até R$ 4,8 milhões (sublimite de R$ 3,6 mi p/ ICMS/ISS)',
    presumido: 'Até R$ 78 milhões / ano',
    real: 'Sem limite (obrigatório acima de R$ 78 mi/ano)',
  },
  {
    criterio: 'Base de Cálculo (IRPJ / CSLL)',
    simples: 'Receita Bruta (incluso na guia única DAS)',
    presumido: 'Presunção legal sobre a receita (8%, 12% ou 32%)',
    real: 'Lucro Líquido Contábil Efetivo ajustado no LALUR',
  },
  {
    criterio: 'Alíquota PIS / COFINS (Regime Atual)',
    simples: 'Unificado dentro da alíquota do DAS',
    presumido: '3,65% cumulativo (0,65% PIS + 3,00% Cofins, sem crédito)',
    real: '9,25% não cumulativo (1,65% PIS + 7,60% Cofins, com crédito)',
  },
  {
    criterio: 'Tratamento em caso de Prejuízo',
    simples: 'Paga imposto normal sobre o faturamento',
    presumido: 'Paga imposto normal sobre o lucro presumido',
    real: 'IRPJ e CSLL ZERO no trimestre/ano de prejuízo',
  },
  {
    criterio: 'Complexidade e Custo Contábil',
    simples: 'Baixa a Média (obrigações simplificadas)',
    presumido: 'Média (SPED ECF, EFD Contribuições, DCTF)',
    real: 'Alta (contabilidade comercial plena, ECD, ECF, LALUR/LACS)',
  },
  {
    criterio: 'Crédito de IBS e CBS na Reforma',
    simples: 'Reduzido ao valor recolhido no DAS (ou 100% se recolher por fora)',
    presumido: 'PIS/Cofins 3,65% extinto; migra para CBS plena (~8,5% a 9%)',
    real: 'Crédito financeiro amplo e imediato de 100% de IBS e CBS',
  },
  {
    criterio: 'Melhor Indicação Estratégica',
    simples: 'Varejo, pequenas indústrias e serviços com Fator R ≥ 28%',
    presumido: 'Empresas com margem real superior à presunção legal',
    real: 'Margens baixas, grandes insumos, prejuízos ou faturamento > R$ 78 mi',
  },
]

export default function FormasDeTributacaoSection() {
  const [activeTab, setActiveTab] = useState<'simples' | 'presumido' | 'real'>('simples')

  const currentRegime = REGIMES_DATA.find((r) => r.id === activeTab) || REGIMES_DATA[0]
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20an%C3%A1lise%20de%20enquadramento%20tribut%C3%A1rio%20(Simples%20vs%20Presumido%20vs%20Real)%20para%20minha%20empresa%20com%20a%20Borlim.'
  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'

  return (
    <section
      id="formas-de-tributacao"
      className="bg-[#F5F3EC] py-16 sm:py-24 border-b border-stone-200 scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#15803D]">
            <Scale className="w-3.5 h-3.5 text-[#16A34A]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">
              Enquadramento Tributário Estratégico
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#082852] leading-tight">
            As 3 Formas de Tributação no Brasil
          </h2>

          <p className="font-serif text-base sm:text-xl text-slate-700 mt-3 font-normal leading-relaxed">
            Simples Nacional, Lucro Presumido e Lucro Real: entenda as regras de funcionamento, os
            limites legais de faturamento e como cada regime se posiciona diante da Reforma
            Tributária (IBS e CBS).
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans max-w-2xl mx-auto">
            Uma explicação <em>de empresário para empresário</em>, sem jargões desnecessários, com
            foco prático em margem de lucro, fluxo de caixa e competitividade comercial.
          </p>
        </div>

        {/* 3 ABAS INTERATIVAS (Mesmo padrão visual da Linha do Tempo da página) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {REGIMES_DATA.map((regime) => {
            const isActive = activeTab === regime.id
            return (
              <button
                key={regime.id}
                type="button"
                onClick={() => setActiveTab(regime.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 border relative ${
                  isActive
                    ? 'bg-[#082852] text-white border-[#082852] shadow-lg scale-[1.01]'
                    : 'bg-white hover:bg-stone-50 text-slate-700 border-stone-200 shadow-xs hover:border-[#16A34A]/50'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                    }`}
                  >
                    {regime.tag}
                  </span>
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isActive ? 'bg-[#22C55E]' : 'bg-stone-300'
                    }`}
                  />
                </div>

                <h3
                  className={`font-serif text-lg sm:text-xl font-bold ${
                    isActive ? 'text-white' : 'text-[#082852]'
                  }`}
                >
                  {regime.nome}
                </h3>

                <p
                  className={`text-xs mt-1 font-sans line-clamp-2 ${
                    isActive ? 'text-emerald-200' : 'text-slate-500'
                  }`}
                >
                  {regime.subtitulo}
                </p>

                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#082852] rotate-45 hidden sm:block" />
                )}
              </button>
            )
          })}
        </div>

        {/* PAINEL DE CONTEÚDO DETALHADO DO REGIME SELECIONADO */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10 mb-12 animate-in fade-in-50 duration-200">
          {/* Cabeçalho do Card */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#082852] text-white">
                  Regime em Análise
                </span>
                <span className="text-xs font-mono font-bold text-[#15803D] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  {currentRegime.limiteFaturamento.valor}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#082852]">
                {currentRegime.nome}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                {currentRegime.subtitulo}
              </p>
            </div>

            {/* Banner de Limite de Faturamento em Destaque */}
            <div className="bg-[#EDEAE0]/70 p-4 sm:p-5 rounded-2xl border border-stone-200 max-w-md shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#15803D] mb-1">
                <BadgeDollarSign className="w-4 h-4 text-[#16A34A]" />
                <span>Limite Legal de Faturamento</span>
              </div>
              <p className="font-mono text-xl sm:text-2xl font-bold text-[#082852]">
                {currentRegime.limiteFaturamento.valor}
              </p>
              <p className="text-xs text-slate-700 mt-1 font-sans leading-relaxed">
                {currentRegime.limiteFaturamento.detalhe}
              </p>
              {currentRegime.limiteFaturamento.sublimite && (
                <div className="mt-2.5 pt-2 border-t border-stone-300/80 text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                  <strong className="font-mono uppercase font-bold block mb-0.5">
                    Atenção ao Sublimite:
                  </strong>
                  {currentRegime.limiteFaturamento.sublimite}
                </div>
              )}
            </div>
          </div>

          {/* Como Funciona na Prática */}
          <div className="py-8 border-b border-stone-200">
            <div className="flex items-center gap-2 mb-3 text-[#15803D] font-mono text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#16A34A]" />
              <span>Como Funciona na Prática</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans mb-6">
              {currentRegime.comoFunciona.resumo}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentRegime.comoFunciona.pontos.map((ponto, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#F5F3EC]/60 border border-stone-200 hover:border-[#16A34A]/50 transition-colors"
                >
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#082852] mb-1.5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] mt-2 shrink-0" />
                    <span>{ponto.titulo}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pl-3.5">
                    {ponto.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vantagens vs Cuidados (2 Colunas) */}
          <div className="py-8 border-b border-stone-200 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vantagens */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2 text-[#15803D] font-mono text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Vantagens & Benefícios</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#15803D]">
                  {currentRegime.vantagens.length} pontos
                </span>
              </div>

              <ul className="space-y-2.5">
                {currentRegime.vantagens.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start gap-3 shadow-xs hover:border-[#16A34A]/50 transition-colors"
                  >
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuidados e Riscos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-center gap-2 text-amber-800 font-mono text-xs font-bold uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Cuidados & Riscos de Gestão</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-800">
                  {currentRegime.cuidados.length} alertas
                </span>
              </div>

              <ul className="space-y-2.5">
                {currentRegime.cuidados.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-start gap-3 shadow-xs hover:border-amber-300 transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Conexão com a Reforma Tributária (IBS e CBS) */}
          <div className="py-8 border-b border-stone-200">
            <div className="bg-[#082852] text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#16A34A]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16A34A]/30 border border-[#22C55E]/40 text-[#22C55E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                    Conexão com a Reforma Tributária
                  </span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {currentRegime.conexaoReforma.titulo}
                </h4>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentRegime.conexaoReforma.impacto}
                </p>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
                    <strong className="text-white block font-mono uppercase text-[11px] mb-0.5">
                      Recomendação da Borlim Consultoria:
                    </strong>
                    {currentRegime.conexaoReforma.alertaPratico}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Perfil Ideal de Empresa */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                Para quem este regime é mais indicado?
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed max-w-3xl">
                {currentRegime.perfilIdeal}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Simular Enquadramento</span>
              </a>
            </div>
          </div>
        </div>

        {/* MINI-TABELA COMPARATIVA ENTRE OS 3 REGIMES */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 bg-[#082852] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Quadro Comparativo
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold mt-0.5">
                Comparativo Direto: Simples vs. Presumido vs. Real
              </h3>
            </div>
            <span className="text-xs font-mono bg-white/10 border border-white/20 text-slate-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
              Critérios Essenciais de Decisão
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200 font-mono text-[11px] sm:text-xs text-[#082852] uppercase">
                  <th className="p-4 sm:p-5 font-bold w-1/4">Critério de Análise</th>
                  <th className="p-4 sm:p-5 font-bold w-1/4 text-emerald-900 bg-emerald-50/70 border-x border-stone-200">
                    Simples Nacional
                  </th>
                  <th className="p-4 sm:p-5 font-bold w-1/4">Lucro Presumido</th>
                  <th className="p-4 sm:p-5 font-bold w-1/4 bg-blue-50/50">Lucro Real</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-sans text-slate-700">
                {COMPARATIVO_REGIMES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-[#082852] font-mono text-xs sm:text-[13px] bg-stone-50/50">
                      {row.criterio}
                    </td>
                    <td className="p-4 sm:p-5 bg-emerald-50/30 border-x border-stone-200 leading-relaxed font-sans text-slate-800">
                      {row.simples}
                    </td>
                    <td className="p-4 sm:p-5 leading-relaxed font-sans">{row.presumido}</td>
                    <td className="p-4 sm:p-5 bg-blue-50/20 leading-relaxed font-sans text-slate-800">
                      {row.real}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTA INSTITUCIONAL OBRIGATÓRIA BORLIM */}
        <div className="p-7 sm:p-9 bg-white rounded-3xl border-2 border-[#16A34A]/40 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#16A34A]/5 rounded-bl-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Diagnóstico Personalizado por Especialistas
                </span>
              </div>

              <blockquote className="font-serif text-lg sm:text-2xl font-bold text-[#082852] leading-snug">
                &ldquo;A escolha do regime depende de margem, atividade e clientes — a Borlim
                analisa os 48 indicadores da sua empresa para recomendar o regime mais
                eficiente.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Mudar de regime sem simulação prévia é um dos erros mais comuns e onerosos na vida
                empresarial. O enquadramento ideal não considera apenas o faturamento bruto, mas o
                volume de compras tributadas, a folha de salários, os prazos médios de recebimento e
                se seus clientes compram com demanda de crédito de IBS/CBS. Na Borlim, realizamos o
                cálculo comparativo em planilhas detalhadas antes de qualquer tomada de decisão.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={balanceAnalysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg border border-[#15803D] group"
              >
                <TrendingUp className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>GESTÃO EMPRESARIAL</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#082852] hover:bg-[#0B3B7A] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Conversar no WhatsApp</span>
              </a>

              <Link
                to="/planejamento"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono text-slate-600 hover:text-[#0B3B7A] transition-colors"
              >
                <span>Ver Planejamento Econômico-Financeiro</span>
                <ArrowRight className="w-3 h-3 text-[#16A34A]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
