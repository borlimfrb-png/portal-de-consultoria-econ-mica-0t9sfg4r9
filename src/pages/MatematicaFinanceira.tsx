import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calculator,
  Percent,
  Coins,
  TrendingUp,
  FileSpreadsheet,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  CalendarDays,
  Target,
  Compass,
  Tag,
  CircleDollarSign,
  Scale,
  DollarSign,
  Info,
  Check,
  Cpu,
  CornerDownRight,
  Lightbulb,
} from 'lucide-react'

// Tecla estilizada da HP12C para renderização didática
interface HPKeyProps {
  label: string
  sublabel?: string
  color?: 'default' | 'orange' | 'blue' | 'accent' | 'enter'
}

function HPKey({ label, sublabel, color = 'default' }: HPKeyProps) {
  const colorStyles = {
    default:
      'bg-slate-800 text-amber-100 border-slate-700 shadow-[0_3px_0_#0f172a] hover:bg-slate-700',
    orange:
      'bg-amber-600 text-white border-amber-700 shadow-[0_3px_0_#b45309] font-bold hover:bg-amber-500',
    blue: 'bg-sky-600 text-white border-sky-700 shadow-[0_3px_0_#0369a1] font-bold hover:bg-sky-500',
    accent:
      'bg-emerald-700 text-white border-emerald-800 shadow-[0_3px_0_#065f46] font-bold hover:bg-emerald-600',
    enter:
      'bg-slate-900 text-amber-200 border-slate-950 shadow-[0_3px_0_#020617] font-bold px-3 py-1.5 min-w-[56px] text-center',
  }

  return (
    <span
      className={`inline-flex flex-col items-center justify-center min-w-[38px] px-2 py-1 rounded text-xs font-mono font-bold tracking-tight border select-none transition-all ${colorStyles[color]}`}
    >
      {sublabel && (
        <span className="text-[9px] leading-none opacity-80 uppercase font-sans tracking-normal -mb-0.5">
          {sublabel}
        </span>
      )}
      <span>{label}</span>
    </span>
  )
}

export default function MatematicaFinanceira() {
  const [activeTab, setActiveTab] = useState<
    | 'simples-composto'
    | 'tvm'
    | 'taxa'
    | 'prazo'
    | 'pmt'
    | 'pv'
    | 'sac-price'
    | 'vpl-tir'
    | 'percentual'
  >('tvm')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20Matem%C3%A1tica%20Financeira%20e%20Gest%C3%A3o%20Financeira%20com%20a%20Borlim.'

  // Teclas essenciais da HP12C
  const essentialKeys = [
    {
      key: 'f',
      type: 'orange' as const,
      name: 'Funções Laranjas (Tecla f)',
      desc: 'Habilita a função impressa em dourado/laranja acima de cada tecla, como f CLEAR FIN (limpar registros financeiros), f NPV (VPL), f IRR (TIR) e arredondamentos de casas decimais (f 2).',
    },
    {
      key: 'g',
      type: 'blue' as const,
      name: 'Funções Azuis (Tecla g)',
      desc: 'Habilita a função impressa em azul na face inferior de cada tecla, como g CFo e g CFj (fluxos de caixa), g 12÷ (dividir taxa anual por 12 meses) e g 12× (multiplicar anos por 12).',
    },
    {
      key: 'ENTER',
      type: 'enter' as const,
      name: 'Tecla ENTER (Pilha RPN)',
      desc: 'Empilha o valor digitado na memória de cálculo (Stack RPN). Na HP12C não existe tecla de igual (=): você digita o primeiro número, pressiona ENTER, digita o segundo e então aciona a operação (+, -, ×, ÷).',
    },
    {
      key: 'CHS',
      type: 'default' as const,
      name: 'CHS — Change Sign (Trocar Sinal)',
      desc: 'Alterna entre positivo e negativo. Na matemática financeira de fluxo de caixa, toda saída de dinheiro (como aplicar ou pagar) deve ser inserida como valor negativo.',
    },
    {
      key: 'CLX',
      type: 'default' as const,
      name: 'CLX / f CLEAR (Limpar)',
      desc: 'CLX limpa apenas o visor atual. A combinação f CLEAR FIN (ou f FIN) limpa as memórias financeiras (n, i, PV, PMT, FV), evitando que cálculos anteriores contaminem o novo resultado.',
    },
    {
      key: 'STO / RCL',
      type: 'default' as const,
      name: 'STO & RCL (Armazenar e Recuperar)',
      desc: 'STO seguido de um dígito (0 a 9) armazena um número em uma memória específica. RCL seguido do dígito recupera esse valor a qualquer instante da rotina.',
    },
  ]

  // Teclas do módulo financeiro (TVM)
  const tvmKeys = [
    {
      symbol: 'n',
      nome: 'Prazo / Período',
      desc: 'Número de períodos (dias, meses, trimestres ou anos). Deve estar sempre na mesma base de tempo da taxa de juros (i).',
    },
    {
      symbol: 'i',
      nome: 'Taxa de Juros (Interest)',
      desc: 'Taxa de juros expressa em porcentagem por período (se o prazo está em meses, a taxa deve ser ao mês).',
    },
    {
      symbol: 'PV',
      nome: 'Present Value (Valor Presente)',
      desc: 'Valor inicial de um investimento, valor à vista de um bem ou montante financiado no presente (momento zero).',
    },
    {
      symbol: 'PMT',
      nome: 'Payment (Prestação / Parcela)',
      desc: 'Valor das parcelas periódicas e constantes de uma anuidade, empréstimo, financiamento ou retirada regular.',
    },
    {
      symbol: 'FV',
      nome: 'Future Value (Valor Futuro)',
      desc: 'Montante acumulado ao final do prazo, incluindo o capital original mais todos os juros compostos auferidos.',
    },
  ]

  // Exemplos Didáticos Passo a Passo
  const exampleFunctions = [
    {
      id: 'simples-composto',
      title: 'Juros Simples vs. Juros Compostos',
      shortTitle: 'Simples vs Composto',
      badge: 'Conceito Fundamental',
      intro:
        'Nos juros simples, a taxa incide apenas sobre o capital inicial durante todo o período. Já nos juros compostos ("juros sobre juros"), a taxa de cada período incide sobre o saldo acumulado (capital + juros anteriores). O mercado financeiro e a economia real operam quase que exclusivamente em regime composto.',
      scenario:
        'Empresa aplica R$ 10.000,00 por 12 meses à taxa de 1,5% ao mês. Vamos comparar o montante final nos dois regimes.',
      comparativo: [
        {
          regime: 'Juros Simples',
          formula: 'M = C × (1 + i × n)',
          calculo: 'R$ 10.000 × (1 + 0,015 × 12) = R$ 10.000 × 1,18',
          resultado: 'R$ 11.800,00',
          juros: 'R$ 1.800,00 de juros totais',
          nota: 'Rendimento linear fixo de R$ 150,00 por mês.',
        },
        {
          regime: 'Juros Compostos (Padrão HP12C)',
          formula: 'M = C × (1 + i)^n',
          calculo: 'R$ 10.000 × (1 + 0,015)^12 = R$ 10.000 × 1,195618',
          resultado: 'R$ 11.956,18',
          juros: 'R$ 1.956,18 de juros totais (+R$ 156,18)',
          nota: 'Cada mês o rendimento cresce porque incide sobre o saldo anterior.',
        },
      ],
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa as memórias financeiras residuais',
        },
        { key: '10000', color: 'default' as const, action: 'Digita o capital inicial aplicado' },
        {
          key: 'CHS',
          color: 'default' as const,
          action: 'Inverte o sinal (saída de caixa no momento zero)',
        },
        {
          key: 'PV',
          color: 'default' as const,
          action: 'Registra o valor no registrador PV (-10.000,00)',
        },
        { key: '1.5', color: 'default' as const, action: 'Digita a taxa mensal' },
        { key: 'i', color: 'default' as const, action: 'Registra a taxa de 1,5% a.m.' },
        { key: '12', color: 'default' as const, action: 'Digita o número de meses' },
        { key: 'n', color: 'default' as const, action: 'Registra o prazo de 12 períodos' },
        { key: 'FV', color: 'accent' as const, action: 'Calcula o Valor Futuro: exibe 11.956,18' },
      ],
      decisao:
        'Visão do Empresário: Conhecer essa diferença impede aceitar taxas lineares mascaradas em financiamentos ou subestimar o crescimento exponencial de uma dívida atrasada ou reserva de liquidez.',
    },
    {
      id: 'tvm',
      title: 'TVM: Valor Futuro (FV) de uma Aplicação',
      shortTitle: 'Valor Futuro (FV)',
      badge: 'Cálculo Clássico',
      intro:
        'O módulo TVM (Time Value of Money — Valor do Dinheiro no Tempo) é o coração da HP12C. O cálculo de FV projeta quanto valerá no futuro uma quantia aplicada hoje, considerando uma taxa periódica.',
      scenario:
        'Sua empresa tem uma sobra de caixa de R$ 10.000,00 e decide aplicar em um CDB de liquidez diária que rende líquido 1,00% ao mês por 12 meses. Quanto você resgatará no vencimento?',
      formula: 'FV = PV × (1 + i)^n',
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa qualquer resíduo financeiro das teclas n, i, PV, PMT, FV',
        },
        { key: '10000', color: 'default' as const, action: 'Digita o capital aplicado' },
        {
          key: 'CHS',
          color: 'default' as const,
          action:
            'Inverte o sinal para negativo (o dinheiro sai do caixa da empresa para a aplicação)',
        },
        { key: 'PV', color: 'default' as const, action: 'Grava -10.000,00 em Present Value' },
        { key: '1', color: 'default' as const, action: 'Digita a taxa mensal de 1%' },
        { key: 'i', color: 'default' as const, action: 'Grava 1,00 em Interest' },
        { key: '12', color: 'default' as const, action: 'Digita o período de 12 meses' },
        { key: 'n', color: 'default' as const, action: 'Grava 12 em n' },
        { key: 'FV', color: 'accent' as const, action: 'Pressiona FV → O visor exibe 11.268,25' },
      ],
      resultado: 'R$ 11.268,25 (rendimento de R$ 1.268,25 no ano)',
      decisao:
        'Visão do Empresário: A sobra de caixa remunerada a 1% ao mês gerou 12,68% no ano (efeito da taxa efetiva composta). Conecte isso com a seção de Indicadores Econômicos do portal para monitorar a Selic e o CDI vigentes.',
    },
    {
      id: 'taxa',
      title: 'Cálculo da Taxa de Juros Efetiva (Resolver para i)',
      shortTitle: 'Calcular Taxa (i)',
      badge: 'Auditoria de Custo',
      intro:
        'Muitas instituições ou fornecedores propõem: "Pague R$ 20.000 à vista ou R$ 24.000 daqui a 6 meses". Qual é a taxa real de juros mensal embutida nessa proposta? A HP12C descobre instantaneamente.',
      scenario:
        'Um fornecedor de matéria-prima cobra R$ 20.000,00 à vista ou R$ 23.500,00 em parcela única após 5 meses. Qual é a taxa mensal de juros que ele está cobrando da sua empresa?',
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa os registradores financeiros',
        },
        { key: '20000', color: 'default' as const, action: 'Valor do bem hoje se pago à vista' },
        { key: 'PV', color: 'default' as const, action: 'Grava 20.000,00 no Valor Presente' },
        { key: '23500', color: 'default' as const, action: 'Valor a ser pago no futuro' },
        {
          key: 'CHS',
          color: 'default' as const,
          action: 'Inverte para negativo (-23.500,00 é o desembolso futuro)',
        },
        { key: 'FV', color: 'default' as const, action: 'Grava -23.500,00 no Valor Futuro' },
        { key: '5', color: 'default' as const, action: 'Prazo em meses' },
        { key: 'n', color: 'default' as const, action: 'Grava 5 em n' },
        { key: 'i', color: 'accent' as const, action: 'Pressiona i → O visor exibe 3,28' },
      ],
      resultado: '3,28% ao mês de juros embutidos',
      decisao:
        'Visão do Empresário: A taxa cobrada pelo fornecedor (3,28% a.m.) equivale a mais de 47% ao ano! Se a sua empresa conseguir crédito bancário de capital de giro a 1,8% a.m., vale muito mais a pena pegar o crédito bancário, pagar o fornecedor à vista com desconto e economizar caixa líquido.',
    },
    {
      id: 'prazo',
      title: 'Cálculo de Prazo (Resolver para n) & Regra dos 72',
      shortTitle: 'Calcular Prazo (n)',
      badge: 'Horizonte de Tempo',
      intro:
        'Em quanto tempo um capital dobra de valor a uma determinada taxa de juros? Na HP12C, resolve-se inserindo PV negativo, FV com o dobro do valor e a taxa i.',
      scenario:
        'Você quer saber em quantos meses uma aplicação de R$ 50.000,00 acumulada a 1,2% ao mês alcançará R$ 100.000,00 (o dobro do capital).',
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa as memórias financeiras',
        },
        { key: '50000', color: 'default' as const, action: 'Digita o valor presente aplicado' },
        { key: 'CHS', color: 'default' as const, action: 'Inverte o sinal' },
        { key: 'PV', color: 'default' as const, action: 'Grava -50.000,00 em PV' },
        { key: '100000', color: 'default' as const, action: 'Meta futura a atingir' },
        { key: 'FV', color: 'default' as const, action: 'Grava 100.000,00 em FV' },
        { key: '1.2', color: 'default' as const, action: 'Taxa mensal' },
        { key: 'i', color: 'default' as const, action: 'Grava 1,20 em i' },
        { key: 'n', color: 'accent' as const, action: 'Pressiona n → O visor exibe 59 (meses)' },
      ],
      resultado: '58,11 meses (arredondado na tela para 59 meses)',
      decisao:
        'Dica Prática (A Regra dos 72): Divida 72 pela taxa periódica para ter uma estimativa mental instantânea do tempo para dobrar o capital. Exemplo: 72 ÷ 1,2% ≈ 60 meses. A HP12C entrega a precisão exata de 58,11 meses.',
    },
    {
      id: 'pmt',
      title: 'Financiamento Empresarial & Tabela Price (PMT)',
      shortTitle: 'Financiamento (PMT)',
      badge: 'Parcela de Empréstimo',
      intro:
        'A Tabela Price (sistema francês de amortização) é o modelo mais utilizado em financiamentos de veículos, maquinários e empréstimos bancários de capital de giro: as prestações (PMT) são fixas e periódicas.',
      scenario:
        'A empresa vai financiar R$ 50.000,00 para compra de equipamentos em 24 parcelas mensais fixas à taxa de 2,00% ao mês. Qual será o valor da parcela mensal (PMT) e quanto pagará de juros totais?',
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa os registradores financeiros',
        },
        {
          key: '50000',
          color: 'default' as const,
          action: 'Valor do crédito concedido (dinheiro que entra na conta)',
        },
        { key: 'PV', color: 'default' as const, action: 'Grava 50.000,00 em PV' },
        { key: '2', color: 'default' as const, action: 'Taxa de juros do contrato' },
        { key: 'i', color: 'default' as const, action: 'Grava 2,00 em i' },
        { key: '24', color: 'default' as const, action: 'Número de prestações mensais' },
        { key: 'n', color: 'default' as const, action: 'Grava 24 em n' },
        {
          key: '0',
          color: 'default' as const,
          action: 'Ao final do financiamento o saldo devedor zera',
        },
        { key: 'FV', color: 'default' as const, action: 'Grava 0 em FV' },
        { key: 'PMT', color: 'accent' as const, action: 'Pressiona PMT → O visor exibe -2.643,55' },
      ],
      resultado: 'Parcela fixa de R$ 2.643,55 por mês',
      detalhes: [
        { label: 'Total pago em 24 meses', valor: '24 × R$ 2.643,55 = R$ 63.445,20' },
        {
          label: 'Juros totais pagos ao banco',
          valor: 'R$ 63.445,20 - R$ 50.000,00 = R$ 13.445,20',
        },
      ],
      decisao:
        'Visão do Empresário: Antes de assinar o contrato, compare a parcela de R$ 2.643,55 com a geração operacional de caixa da nova máquina. Se a máquina gerar mais de R$ 3.500/mês de margem de contribuição, o financiamento se paga e sobra lucro.',
    },
    {
      id: 'pv',
      title: 'Valor Presente (PV): Quanto Vale Hoje uma Renda Futura?',
      shortTitle: 'Valor Presente (PV)',
      badge: 'Desconto a Valor Presente',
      intro:
        'R$ 100.000 a receber daqui a dois anos não valem R$ 100.000 hoje. A inflação e o custo de oportunidade reduzem o poder de compra. O cálculo de PV desconstrói fluxos futuros para a data presente.',
      scenario:
        'Sua empresa fez uma venda a prazo e tem a receber R$ 80.000,00 daqui a 8 meses. Se a taxa de oportunidade da empresa é 1,2% ao mês, qual é o valor presente desse recebível hoje?',
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa as memórias financeiras',
        },
        { key: '80000', color: 'default' as const, action: 'Valor que será recebido no futuro' },
        { key: 'FV', color: 'default' as const, action: 'Grava 80.000,00 em FV' },
        { key: '1.2', color: 'default' as const, action: 'Taxa de desconto/oportunidade' },
        { key: 'i', color: 'default' as const, action: 'Grava 1,20 em i' },
        { key: '8', color: 'default' as const, action: 'Prazo em meses até o recebimento' },
        { key: 'n', color: 'default' as const, action: 'Grava 8 em n' },
        { key: 'PV', color: 'accent' as const, action: 'Pressiona PV → O visor exibe -72.719,53' },
      ],
      resultado: 'R$ 72.719,53 na data presente',
      decisao:
        'Visão do Empresário: Se um banco ou factoring oferecer antecipar esse recebível pagando R$ 73.500, a proposta é vantajosa. Se oferecerem menos de R$ 72.719,53, o custo da antecipação é superior à taxa de oportunidade do seu negócio.',
    },
    {
      id: 'sac-price',
      title: 'Amortização SAC vs. Price: Comparativo Prático',
      shortTitle: 'SAC vs Price',
      badge: 'Sistemas de Amortização',
      intro:
        'Compreender como o banco cobra as parcelas é essencial para gerenciar o fluxo de caixa da empresa ao longo dos anos.',
      scenario:
        'Financiamento de R$ 120.000,00 em 12 meses a 1,5% ao mês. Veja o comportamento das parcelas no SAC vs. na Tabela Price.',
      comparativoAmortizacao: {
        sac: {
          nome: 'SAC — Sistema de Amortização Constante',
          conceito:
            'A amortização da dívida é igual em todos os meses (R$ 120.000 ÷ 12 = R$ 10.000/mês). Como a dívida diminui mês a mês, os juros caem e a parcela total vai decrescendo.',
          parcelaInicial: 'R$ 11.800,00 (1ª parcela)',
          parcelaFinal: 'R$ 10.150,00 (12ª parcela)',
          totalPago: 'R$ 131.700,00 (Juros totais: R$ 11.700,00)',
          vantagem: 'Juros totais ligeiramente menores ao longo de todo o contrato.',
        },
        price: {
          nome: 'Price — Sistema Francês de Parcelas Fixas',
          conceito:
            'Todas as prestações mensais têm o mesmo valor. No início paga-se quase só juros; com o tempo, a parcela de amortização cresce.',
          parcelaInicial: 'R$ 11.002,15 (fixa do 1º ao 12º mês)',
          parcelaFinal: 'R$ 11.002,15',
          totalPago: 'R$ 132.025,80 (Juros totais: R$ 12.025,80)',
          vantagem:
            'Previsibilidade orçamentária: o empresário sabe exatamente o valor de cada mês no fluxo de caixa.',
        },
      },
      decisao:
        'Quando usar qual? Escolha a Price quando sua empresa precisa de parcelas iniciais menores para acomodar a entrada em operação de um ativo. Escolha o SAC quando você tiver caixa inicial confortável e preferir pagar menos juros totais no somatório dos anos.',
    },
    {
      id: 'vpl-tir',
      title: 'Fluxo de Caixa Descontado: VPL (NPV) e TIR (IRR)',
      shortTitle: 'VPL & TIR',
      badge: 'Viabilidade de Projetos',
      intro:
        'O Valor Presente Líquido (VPL / NPV) e a Taxa Interna de Retorno (TIR / IRR) são as réguas máximas para avaliar se um projeto de investimento, abertura de filial ou compra de máquina deve ser aprovado.',
      scenario:
        'Sua empresa planeja investir R$ 100.000,00 hoje na modernização de uma linha de produção. Estima-se que ela gerará entradas líquidas de R$ 30.000,00 por ano durante 5 anos. A taxa mínima de atratividade (TMA) da empresa é de 10% ao ano. Vale a pena investir?',
      steps: [
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR FIN',
          action: 'Limpa memórias financeiras',
        },
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'CLEAR REG',
          action: 'Limpa todos os registradores estatísticos e de fluxo de caixa',
        },
        { key: '100000', color: 'default' as const, action: 'Investimento inicial no ano zero' },
        {
          key: 'CHS',
          color: 'default' as const,
          action: 'Inverte o sinal (-100.000,00 é desembolso)',
        },
        {
          key: 'g',
          color: 'blue' as const,
          sub: 'CFo',
          action: 'Registra o fluxo no instante zero (Cash Flow 0)',
        },
        { key: '30000', color: 'default' as const, action: 'Fluxo anual líquido esperado' },
        {
          key: 'g',
          color: 'blue' as const,
          sub: 'CFj',
          action: 'Registra o primeiro fluxo periódico (CF1)',
        },
        {
          key: '5',
          color: 'default' as const,
          action: 'Número de repetições consecutivas desse fluxo',
        },
        {
          key: 'g',
          color: 'blue' as const,
          sub: 'Nj',
          action: 'Indica à HP12C que R$ 30.000 se repete por 5 anos',
        },
        {
          key: '10',
          color: 'default' as const,
          action: 'Taxa Mínima de Atratividade (TMA de 10% a.a.)',
        },
        { key: 'i', color: 'default' as const, action: 'Grava a taxa i em 10%' },
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'NPV',
          action: 'Calcula o VPL: Visor exibe 13.723,60',
        },
        {
          key: 'f',
          color: 'orange' as const,
          sub: 'IRR',
          action: 'Calcula a TIR: Visor exibe 15,24%',
        },
      ],
      resultado: 'VPL = +R$ 13.723,60 | TIR = 15,24% ao ano',
      decisao:
        'Diagnóstico Técnico: O VPL é maior que zero (+R$ 13.723,60) e a TIR de 15,24% a.a. supera com folga a TMA de 10% a.a. O projeto agrega valor real ao patrimônio da empresa e deve ser aprovado. Conecte esse cálculo ao serviço de Valuation da Borlim para avaliar empresas inteiras por esse mesmo princípio.',
    },
    {
      id: 'percentual',
      title: 'Percentagens na Prática: Variação (Δ%) e Margem (%)',
      shortTitle: 'Variação % e Margem',
      badge: 'Cálculos Rápidos de Venda',
      intro:
        'A HP12C possui teclas dedicadas para percentuais que eliminam erros comuns de markup e reajuste: % (percentual simples), Δ% (diferença percentual entre dois números) e %T (percentual sobre o total).',
      scenario:
        'Exemplo 1: O custo do insumo subiu de R$ 45,00 para R$ 58,50. Qual foi o aumento percentual exato? Exemplo 2: Sua empresa fatura R$ 180.000 e quer dar 12% de comissão/desconto.',
      exemplosPercentual: [
        {
          titulo: 'Variação Percentual (Δ%)',
          subtitulo: 'Aumento de custo de R$ 45,00 para R$ 58,50',
          teclas: ['45', 'ENTER', '58.5', 'Δ%'],
          resultado: '+30,00%',
          explicacao:
            'O insumo encareceu exatamente 30%. Seu preço de venda precisará ser recalculado.',
        },
        {
          titulo: 'Percentagem Direta (%)',
          subtitulo: '12% de comissão sobre uma venda de R$ 180.000,00',
          teclas: ['180000', 'ENTER', '12', '%'],
          resultado: 'R$ 21.600,00',
          explicacao: 'Cálculo rápido sem precisar converter manualmente para 0,12.',
        },
        {
          titulo: 'Percentual do Total (%T)',
          subtitulo: 'Um produto fatura R$ 35.000 em uma empresa que fatura R$ 140.000',
          teclas: ['140000', 'ENTER', '35000', '%T'],
          resultado: '25,00%',
          explicacao: 'O produto responde exatamente por 25% do faturamento global da empresa.',
        },
      ],
      decisao:
        'Visão do Empresário: Conecte o domínio das percentagens à página de Formação de Preço para Vendas da Borlim para calibrar markups multiplicadores sem corroer sua margem de contribuição.',
    },
  ]

  // Dicas de uso no dia a dia do empresário
  const dailyTips = [
    {
      icon: DollarSign,
      title: 'Avaliar Parcelamento e Desconto à Vista de Clientes',
      tag: 'Decisão Comercial',
      desc: 'O cliente pede 30, 60 e 90 dias sem juros ou 5% de desconto à vista. Com a HP12C em mãos, o empresário calcula em segundos a taxa implícita concedida e decide se vale a pena financiar o cliente com o caixa da empresa.',
    },
    {
      icon: Cpu,
      title: 'Comparar Financiamento vs. Leasing de Máquinas',
      tag: 'Decisão de Ativo',
      desc: 'Compare as propostas bancárias sem se iludir com a taxa nominal do panfleto. Calcule o Custo Efetivo Total (CET) real inserindo tarifas de abertura de crédito (TAC), seguros e parcelas na HP12C.',
    },
    {
      icon: TrendingUp,
      title: 'Calcular Rendimento da Sobra de Caixa no Tesouro/CDB',
      tag: 'Decisão de Liquidez',
      desc: 'Sobra de caixa não pode ficar parada na conta corrente perdendo poder de compra. Projete quanto renderá no CDI/Selic a 30, 60 ou 90 dias e compare com as oportunidades de negociar desconto com fornecedores.',
    },
    {
      icon: Scale,
      title: 'Auditar se o Banco Está Cobrando a Taxa Contratada',
      tag: 'Blindagem Bancária',
      desc: 'Coloque o valor liberado líquido em PV, o número de meses em n e a parcela debitada em PMT. Aperte i: descubra se a taxa real debitada bate com a taxa que o gerente prometeu verbalmente.',
    },
  ]

  // Conexão com os outros serviços Borlim
  const relatedServices = [
    {
      title: 'Gestão Financeira Empresarial',
      desc: 'Fluxo de caixa projetado, 48 indicadores de desempenho, controle de NCG e teste de insolvência imediata e em 12 meses.',
      link: '/gestao-financeira',
      tag: 'Especialidade Central',
      icon: CircleDollarSign,
    },
    {
      title: 'Valuation & Avaliação de Empresas',
      desc: 'Avaliação patrimonial por fluxo de caixa descontado (VPL/TIR) e múltiplos para fusões, aquisições e entrada de sócios.',
      link: '/valuation',
      tag: 'Valor de Mercado',
      icon: Coins,
    },
    {
      title: 'Planejamento Econômico-Financeiro',
      desc: 'Estruturação dos três planejamentos da Borlim para maximizar o lucro real, capital de giro e perenidade.',
      link: '/planejamento-economico-financeiro',
      tag: 'Lucro & Estratégia',
      icon: Compass,
    },
    {
      title: 'Formação de Preço para Vendas',
      desc: 'Markup seguro, margem de contribuição e ponto de equilíbrio calibrados para Indústria, Comércio e Serviços.',
      link: '/formacao-de-preco',
      tag: 'Pricing & Margens',
      icon: Tag,
    },
  ]

  // FAQ em acordeão (6 dúvidas reais)
  const faqs = [
    {
      q: 'Preciso ter uma calculadora HP12C física ou posso usar o aplicativo no celular?',
      a: 'Você não precisa comprar uma calculadora física para dominar ou aplicar os cálculos. Existem aplicativos oficiais e emuladores fiéis da HP12C para iPhone, Android, tablets e versões para navegador web, muitos deles gratuitos ou de baixo custo. O teclado, os comandos e a lógica RPN funcionam exatamente da mesma forma. No entanto, muitos empresários e executivos mantêm uma HP12C física na mesa de trabalho pela agilidade tátil inigualável durante reuniões de negociação.',
    },
    {
      q: 'O que é RPN (Notação Polonesa Reversa) e por que ela é diferente das calculadoras comuns?',
      a: 'Nas calculadoras comuns (lógica algébrica), você digita "5 + 3 =". Na HP12C (Notação Polonesa Reversa), você digita primeiro os números e depois a operação: "5 ENTER 3 +". Não existe tecla de igual (=) nem parênteses. Essa lógica utiliza uma pilha de quatro memórias (X, Y, Z, T), permitindo resolver cálculos longos em cadeia sem perder resultados intermediários e com muito menos toques de tecla. Uma vez que você se acostuma, voltar para uma calculadora tradicional parece lento e truncado.',
    },
    {
      q: 'A HP12C serve para qual tipo de cálculo na rotina de uma empresa?',
      a: 'Ela é a ferramenta de bolso mais completa para cálculos econômico-financeiros: cálculo de juros simples e compostos, conversão e comparação de taxas nominais e efetivas, valor presente e futuro de investimentos, valor da parcela de empréstimos (Tabela Price), saldo devedor de financiamentos, fluxo de caixa descontado (VPL e TIR), amortização de dívidas, depreciação de bens do ativo imobilizado e variações percentuais com markup.',
    },
    {
      q: 'Como limpo a memória da calculadora para não errar no próximo cálculo?',
      a: 'O erro mais comum ao usar a HP12C é calcular com "lixo" deixado por contas anteriores nas memórias. Para limpar com segurança: acione a tecla laranja "f" seguida de "CLEAR FIN" (na tecla PV) para limpar os registradores financeiros (n, i, PV, PMT, FV). Para limpar todas as memórias e registradores estatísticos de uma vez, aperte "f" e depois "CLEAR REG" (na tecla CLX). Para limpar apenas o número que está no visor sem alterar as memórias, aperte simplesmente a tecla "CLX".',
    },
    {
      q: 'A HP12C serve para calcular tributos da empresa?',
      a: 'A calculadora é excelente para aplicar alíquotas percentuais, apurar variações de carga tributária e descontar a valor presente parcelamentos fiscais (como Refis e transações tributárias federais). No entanto, a determinação de bases de cálculo do Simples Nacional, Lucro Presumido, Lucro Real e as novas regras da Reforma Tributária (IBS e CBS) exigem regras jurídicas e contábeis específicas. Visite as abas de Reforma Tributária e Agenda Tributária no nosso portal para ver a legislação completa.',
    },
    {
      q: 'A Borlim Consultoria ensina os sócios e gestores a usarem essas ferramentas no atendimento?',
      a: 'Sim. Em todos os nossos projetos de Gestão Financeira, Planejamento e Formação de Preço, nós capacitamos os sócios, diretores e a equipe financeira a interpretar os números com clareza. Não entregamos relatórios herméticos: demonstramos passo a passo as premissas de taxa, prazo, margem de contribuição e retorno sobre o investimento, para que a liderança da empresa tenha total autonomia para negociar com bancos, fornecedores e clientes.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO INSTITUCIONAL */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern opacity-35 tech-grid-animated pointer-events-none" />
        <div className="absolute -top-28 -right-28 w-[450px] h-[450px] bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none animate-float-slow-1" />
        <div className="absolute -bottom-28 -left-28 w-[450px] h-[450px] bg-[#1557A6]/35 rounded-full blur-3xl pointer-events-none animate-float-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Tag / Breadcrumb */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#16A34A]/15 border border-[#22C55E]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <Calculator className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Capacitação Técnica — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Matemática Financeira & Calculadora HP12C
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              O guia prático para dominar a calculadora padrão do mercado financeiro brasileiro e
              tomar decisões seguras de investimento, financiamento e preço.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Há mais de quatro décadas, a <strong>Calculadora Financeira HP12C</strong> é a
              ferramenta padrão de bancos, corretoras, auditorias e diretorias corporativas no
              Brasil. Dominar suas funções financeiras é o divisor de águas entre o empresário que
              aceita taxas bancárias às cegas e o líder que audita cada centavo do seu custo de
              capital.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-3xl">
              Neste guia exclusivo da <strong>Borlim Consultoria Empresarial</strong>, ensinamos de
              forma direta, "de empresário para empresário", como funciona a notação RPN, o módulo
              financeiro TVM (n, i, PV, PMT, FV), amortização SAC vs. Price, VPL, TIR e
              percentagens, com{' '}
              <strong>exemplos numéricos resolvidos passo a passo em formato de teclas</strong>.
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
                <span>Falar no WhatsApp (17) 99765-0672</span>
                <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Matem%C3%A1tica%20Financeira%20-%20Consulta%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL / COMPROMISSO EDUCATIVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Padrão do Mercado Financeiro
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “Quem não domina a matemática financeira da HP12C vira passageiro das taxas que os
                bancos e fornecedores decidem cobrar. Conhecer a calculadora devolve o volante do
                caixa ao empresário.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                A HP12C não foi projetada para fazer continhas escolares. Ela é um mini-computador
                especializado em finanças corporativas: calcula o valor do dinheiro no tempo,
                amortiza empréstimos, descobre a taxa implícita de um contrato e avalia a
                viabilidade de investimentos de milhões em segundos.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#E5EDF5]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Consultoria & Capacitação
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

      {/* 3. SEÇÃO: CONHECENDO A HP12C & A LÓGICA RPN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Fundamentos Operacionais
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Conhecendo a HP12C: O que é a Notação RPN?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            A primeira barreira que assusta quem vê a HP12C pela primeira vez é a ausência da tecla
            de igual (=). Entenda por que a <strong>Notação Polonesa Reversa (RPN)</strong> foi
            adotada e como ela torna os cálculos corporativos dez vezes mais rápidos.
          </p>
        </div>

        {/* Card Explicativo RPN vs Algébrico */}
        <div className="bg-gradient-to-br from-[#082852] via-[#0B3B7A] to-[#082852] text-white p-8 sm:p-10 rounded-2xl border border-[#0B3B7A] shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#22C55E]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
                  A Pilha Operacional RPN
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Primeiro o número, depois a operação: por que a HP12C é rápida e precisa
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                Nas calculadoras comuns (lógica algébrica), você digita{' '}
                <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-emerald-300">
                  5 + 3 =
                </code>
                . Na HP12C (lógica RPN), você digita:
              </p>
              <div className="flex flex-wrap items-center gap-2 py-2">
                <HPKey label="5" />
                <HPKey label="ENTER" color="enter" />
                <HPKey label="3" />
                <HPKey label="+" />
                <span className="text-slate-300 font-sans text-xs">
                  → Visor exibe instantaneamente:
                </span>
                <span className="font-mono font-bold text-lg text-emerald-400 bg-slate-900/80 px-2.5 py-1 rounded border border-emerald-500/40">
                  8.00
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                A tecla <strong className="text-white">ENTER</strong> "empilha" o número em uma
                memória interna chamada <em>Stack</em> (formada pelos registradores X, Y, Z e T). Ao
                pressionar a tecla de operação (+, -, ×, ÷), a calculadora processa os dois números
                da base da pilha e substitui pelo resultado. Não há parênteses, não há perda de
                memória intermediária e você economiza até 40% dos toques de tecla em cálculos
                encadeados.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/15 space-y-4">
              <h4 className="font-serif text-base font-bold text-emerald-300 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#22C55E]" />
                As 4 Camadas da Memória RPN (Stack)
              </h4>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 bg-slate-900/60 rounded border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Registrador T (Topo):</span>
                  <span className="text-emerald-300 font-bold">Armazena o 4º valor</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Registrador Z:</span>
                  <span className="text-emerald-300 font-bold">Armazena o 3º valor</span>
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Registrador Y:</span>
                  <span className="text-emerald-300 font-bold">Armazena o 2º valor</span>
                </div>
                <div className="p-2.5 bg-emerald-950/80 rounded border border-emerald-500/40 flex items-center justify-between text-white">
                  <span className="font-bold flex items-center gap-1.5">
                    <CornerDownRight className="w-3.5 h-3.5 text-[#22C55E]" />
                    Registrador X (Visor):
                  </span>
                  <span className="text-emerald-300 font-bold">Número visível na tela</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic pt-1">
                Ao fazer qualquer operação, a pilha "cai" (drop) automaticamente, trazendo o próximo
                número guardado para o visor.
              </p>
            </div>
          </div>
        </div>

        {/* Teclas Essenciais da HP12C (Grid) */}
        <div className="mb-14">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#16A34A]" />
            Teclas Essenciais de Controle e Memória
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {essentialKeys.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#16A34A] transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <HPKey label={item.key} color={item.type} />
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#082852]">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teclas Financeiras: O Módulo TVM */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D] block mb-1">
              Time Value of Money (TVM)
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852]">
              As 5 Teclas de Ouro da Matemática Financeira
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-2">
              Na primeira fileira da HP12C estão as cinco variáveis financeiras. Se você conhecer
              quatro delas (ou três, em casos específicos), a calculadora calcula a quinta variável
              automaticamente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tvmKeys.map((keyItem, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F0F4F8] rounded-xl border border-slate-200 hover:border-[#16A34A] transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <HPKey label={keyItem.symbol} color="accent" />
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    Reg. #{idx + 1}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#082852]">{keyItem.nome}</h4>
                <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                  {keyItem.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-[#16A34A] rounded-r-xl flex items-start gap-3 text-xs text-slate-700 font-sans">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#082852] font-mono uppercase text-[11px] block">
                Regra Fundamental do Fluxo de Caixa na HP12C:
              </strong>
              Entradas e saídas de caixa precisam ter sinais opostos. Se você aplica dinheiro (sai
              da sua conta), digite o valor e pressione{' '}
              <strong className="font-mono text-slate-900">CHS</strong> antes de apertar{' '}
              <strong className="font-mono text-slate-900">PV</strong>. Se não inverter o sinal, a
              HP12C retornará o erro <em>Error 5</em> nos cálculos de taxa ou fluxo.
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO: FUNÇÕES ESSENCIAIS COM EXEMPLOS NUMÉRICOS RESOLVIDOS (TABS INTERATIVAS) */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
              <Calculator className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                Passo a Passo com Sequência de Teclas
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
              Funções Essenciais com Exemplos Práticos Resolvidos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Clique nas abas abaixo para ver cada função financeira explicada com um caso prático
              real do mercado brasileiro e a sequência exata de teclas na HP12C.
            </p>
          </div>

          {/* Abas Interativas */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
            {exampleFunctions.map((fn) => (
              <button
                key={fn.id}
                onClick={() => setActiveTab(fn.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  activeTab === fn.id
                    ? 'bg-[#0B3B7A] text-white shadow-md'
                    : 'bg-[#F0F4F8] text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span>{fn.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Conteúdo da Aba Ativa */}
          {exampleFunctions.map((fn) => {
            if (activeTab !== fn.id) return null

            return (
              <div key={fn.id} className="space-y-8 animate-fade-in">
                {/* Header do Exemplo */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200">
                      {fn.badge}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-1.5">
                      {fn.title}
                    </h3>
                  </div>
                </div>

                {/* Explicação Conceitual */}
                <div className="bg-[#E5EDF5]/40 p-5 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] mb-1">
                    Conceito & Lógica Financeira:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {fn.intro}
                  </p>
                </div>

                {/* Cenário Proposto */}
                <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 block mb-1">
                    Cenário Prático da Empresa:
                  </span>
                  <p className="text-xs sm:text-sm text-amber-950 font-sans leading-relaxed">
                    {fn.scenario}
                  </p>
                </div>

                {/* Comparativo de Juros (se houver) */}
                {'comparativo' in fn && fn.comparativo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fn.comparativo.map((comp, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-5 bg-[#F0F4F8] rounded-xl border border-slate-200 space-y-2"
                      >
                        <span className="text-xs font-mono font-bold uppercase text-[#0B3B7A] block">
                          {comp.regime}
                        </span>
                        <div className="text-[11px] font-mono text-slate-500">
                          Fórmula: {comp.formula}
                        </div>
                        <div className="p-2 bg-white rounded border border-slate-200 font-mono text-xs text-slate-700">
                          {comp.calculo}
                        </div>
                        <div className="text-sm font-mono font-bold text-[#15803D]">
                          Montante: {comp.resultado}
                        </div>
                        <p className="text-xs text-slate-600 font-sans">
                          {comp.juros} — {comp.nota}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sequência de Teclas na HP12C (se houver steps) */}
                {'steps' in fn && fn.steps && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                        Sequência Exata de Teclas na HP12C
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Execute da esquerda para a direita
                      </span>
                    </div>

                    <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto">
                      <div className="flex flex-wrap items-center gap-3">
                        {fn.steps.map((st, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <div className="flex flex-col items-center">
                              <HPKey label={st.key} color={st.color} sublabel={st.sub} />
                              <span className="text-[9px] font-mono text-slate-400 mt-1 max-w-[90px] text-center leading-tight">
                                {st.action.split(':')[0]}
                              </span>
                            </div>
                            {sIdx < fn.steps.length - 1 && (
                              <span className="text-slate-600 text-sm font-bold">›</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explicação detalhada de cada tecla */}
                    <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs font-sans">
                      {fn.steps.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 flex items-start gap-3">
                          <span className="font-mono text-slate-400 font-bold shrink-0 w-6">
                            #{sIdx + 1}
                          </span>
                          <div className="shrink-0">
                            <HPKey label={st.key} color={st.color} sublabel={st.sub} />
                          </div>
                          <span className="text-slate-700 pt-1 leading-relaxed">{st.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resultado em Destaque */}
                {'resultado' in fn && fn.resultado && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#15803D]">
                      Resultado Apurado no Visor:
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-[#082852]">
                      {fn.resultado}
                    </span>
                  </div>
                )}

                {/* Detalhes Adicionais (se houver) */}
                {'detalhes' in fn && fn.detalhes && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fn.detalhes.map((det, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 bg-[#F0F4F8] rounded-lg border border-slate-200 text-xs"
                      >
                        <span className="text-slate-500 font-mono block">{det.label}:</span>
                        <span className="font-mono font-bold text-[#082852] text-sm">
                          {det.valor}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparativo Amortização SAC vs Price */}
                {'comparativoAmortizacao' in fn && fn.comparativoAmortizacao && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#F0F4F8] rounded-2xl border border-slate-200 space-y-3">
                      <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded bg-sky-100 text-[#0369a1] inline-block">
                        Amortização Decrescente
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#082852]">
                        {fn.comparativoAmortizacao.sac.nome}
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {fn.comparativoAmortizacao.sac.conceito}
                      </p>
                      <div className="space-y-1.5 font-mono text-xs pt-2 border-t border-slate-200">
                        <div className="flex justify-between">
                          <span className="text-slate-500">1ª Parcela:</span>
                          <span className="font-bold text-[#082852]">
                            {fn.comparativoAmortizacao.sac.parcelaInicial}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Última Parcela:</span>
                          <span className="font-bold text-[#082852]">
                            {fn.comparativoAmortizacao.sac.parcelaFinal}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#15803D]">
                          <span>Total Pago:</span>
                          <span className="font-bold">
                            {fn.comparativoAmortizacao.sac.totalPago}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-[#F0F4F8] rounded-2xl border border-slate-200 space-y-3">
                      <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded bg-emerald-100 text-[#15803D] inline-block">
                        Prestações Fixas
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#082852]">
                        {fn.comparativoAmortizacao.price.nome}
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {fn.comparativoAmortizacao.price.conceito}
                      </p>
                      <div className="space-y-1.5 font-mono text-xs pt-2 border-t border-slate-200">
                        <div className="flex justify-between">
                          <span className="text-slate-500">1ª Parcela:</span>
                          <span className="font-bold text-[#082852]">
                            {fn.comparativoAmortizacao.price.parcelaInicial}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Última Parcela:</span>
                          <span className="font-bold text-[#082852]">
                            {fn.comparativoAmortizacao.price.parcelaFinal}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#082852]">
                          <span>Total Pago:</span>
                          <span className="font-bold">
                            {fn.comparativoAmortizacao.price.totalPago}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exemplos de Percentual */}
                {'exemplosPercentual' in fn && fn.exemplosPercentual && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {fn.exemplosPercentual.map((pEx, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-5 bg-[#F0F4F8] rounded-xl border border-slate-200 space-y-3"
                      >
                        <span className="text-xs font-mono font-bold uppercase text-[#0B3B7A] block">
                          {pEx.titulo}
                        </span>
                        <p className="text-xs text-slate-600 font-sans">{pEx.subtitulo}</p>
                        <div className="flex items-center gap-1.5 py-1">
                          {pEx.teclas.map((t, tIdx) => (
                            <HPKey
                              key={tIdx}
                              label={t}
                              color={
                                t === 'ENTER' ? 'enter' : t.includes('%') ? 'accent' : 'default'
                              }
                            />
                          ))}
                        </div>
                        <div className="font-mono text-sm font-bold text-[#15803D]">
                          Resultado: {pEx.resultado}
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans leading-snug">
                          {pEx.explicacao}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Visão / Tomada de Decisão do Empresário */}
                <div className="p-4 bg-emerald-50 border-l-4 border-[#16A34A] rounded-r-xl space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                    Aplicação na Tomada de Decisão:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                    {fn.decisao}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. SEÇÃO: DICAS DE USO NO DIA A DIA DO EMPRESÁRIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Finanças Aplicadas
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Como Conectar a HP12C com as Decisões Reais do Negócio
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            A teoria da matemática financeira ganha vida quando resolve dilemas concretos da
            empresa: parcelar ou dar desconto, financiar máquina ou fazer leasing e quanto aplicar
            da sobra de caixa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {dailyTips.map((tip, idx) => {
            const Icon = tip.icon
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
                      {tip.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#082852]">
                    {tip.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {tip.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-700 font-sans flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span className="font-semibold text-[#082852]">
                    Decisão embasada em taxa de retorno real, sem achismo.
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Banner de Conexão com os Indicadores Econômicos */}
        <div className="bg-[#082852] text-white p-8 rounded-2xl border border-[#0B3B7A] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Sinergia com o Portal de Indicadores</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Acompanhe a Selic, o CDI e a Inflação vigentes no Portal da Borlim
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Para alimentar a taxa <strong className="font-mono text-emerald-300">i</strong> da sua
              HP12C com dados oficiais do Banco Central e comparar com CDB, Tesouro Selic e LCI/LCA,
              consulte o nosso monitor de indicadores econômicos em tempo real.
            </p>
          </div>

          <Link
            to="/indicadores"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 shadow"
          >
            <span>Ver Indicadores do Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. SEÇÃO: CONEXÃO COM OS SERVIÇOS BORLIM */}
      <section className="bg-[#E5EDF5]/60 py-16 sm:py-24 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Visão Integrada da Consultoria
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Da Matemática Financeira à Gestão Estratégica
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O domínio das taxas e dos prazos é o combustível que alimenta todas as soluções de
              consultoria empresarial da Borlim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((service, idx) => {
              const Icon = service.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#16A34A] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#082852] text-[#22C55E] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#082852] mb-2 leading-snug group-hover:text-[#0B3B7A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] hover:text-[#16A34A] transition-colors"
                  >
                    <span>Acessar especialidade</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#16A34A]" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. FAQ EM ACORDEÃO (6 DÚVIDAS REAIS) */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas Direto
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre Matemática Financeira e HP12C
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Respostas práticas de empresário para empresário, sem complicação acadêmica.
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

      {/* 8. AVISO INSTITUCIONAL SUTIL (CONTEÚDO EDUCATIVO) */}
      <section className="bg-[#F0F4F8] py-8 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 font-sans">
            <Info className="w-4 h-4 text-[#0B3B7A] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Aviso Institucional Educativo:</strong> As simulações, fórmulas e sequências
              de teclas apresentadas nesta página têm finalidade estritamente didática e de
              capacitação empresarial. Taxas de juros, encargos, impostos (como IOF) e tarifas
              operacionais reais praticadas por bancos e instituições financeiras variam conforme
              contrato e perfil de crédito de cada empresa. Para diagnósticos e estruturação
              financeira individualizada da sua empresa, consulte a equipe técnica da Borlim
              Consultoria Empresarial.
            </p>
          </div>
        </div>
      </section>

      {/* 9. CTA INSTITUCIONAL FINAL COM CANAIS OFICIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Atendimento Técnico & Diagnóstico Prévio
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Leve a precisão da matemática financeira para a gestão do seu negócio.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Converse diretamente com o economista Flávio Bordignon. Vamos analisar seus
                contratos bancários, calcular o custo real de capital da sua empresa e desenhar
                ferramentas para decisões seguras de crescimento.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={balanceAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-[#22C55E] group"
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#082852] hover:bg-slate-100 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md group"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>Falar no WhatsApp: (17) 99765-0672</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 block">
                Canais de Atendimento Oficial
              </span>

              <div className="space-y-4 text-xs font-mono">
                <a
                  href="https://wa.me/5517997650672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#22C55E] shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-300 block">WhatsApp Consultoria:</span>
                    <span className="font-bold text-white text-sm">(17) 99765-0672</span>
                  </div>
                </a>

                <a
                  href="mailto:flavio@borlim.com.br?subject=Contato%20Matem%C3%A1tica%20Financeira%20Borlim"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#22C55E] shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-300 block">E-mail Direto:</span>
                    <span className="font-bold text-white text-sm">flavio@borlim.com.br</span>
                  </div>
                </a>

                <a
                  href={balanceAnalysisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg border border-emerald-400/40 transition-colors"
                >
                  <FileSpreadsheet className="w-5 h-5 text-emerald-300 shrink-0" />
                  <div>
                    <span className="text-[10px] text-emerald-200 block">Sistema Borlim:</span>
                    <span className="font-bold text-white text-xs">
                      Gestão Empresarial (Online)
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
