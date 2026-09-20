import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CircleDollarSign,
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
  HelpCircle,
  ChevronDown,
  Layers,
  DollarSign,
  PieChart,
  Coins,
  Repeat,
  Compass,
  Briefcase,
  Users2,
  Sparkles,
  TrendingUp,
  Tag,
  Target,
  Scale,
  CalendarDays,
  Clock,
  ArrowUpRight,
  Calculator,
  Percent,
} from 'lucide-react'

export default function GestaoFinanceira() {
  const [activeToolTab, setActiveToolTab] = useState<
    'fluxo' | 'dre' | 'liquidez' | 'ponto' | 'insolvencia' | 'ncg' | 'indicadores48'
  >('fluxo')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const balanceAnalysisUrl = 'https://analise-de-balanco-6514f.goskip.app'
  const whatsappUrl =
    'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20a%20Gest%C3%A3o%20Financeira%20da%20minha%20empresa.'

  // Os 3 Fundamentos do Diagnóstico Prévio (A Fundação)
  const diagnosticPillars = [
    {
      icon: BarChart3,
      badge: 'Diagnóstico 360°',
      title: '48 Indicadores de Desempenho Financeiro',
      desc: 'Raio-X estrutural do sistema financeiro da sua empresa: liquidez em todas as camadas, giro de estoque, prazos médios de recebimento e de pagamento, capital de giro líquido, necessidade de capital de giro (NCG), rentabilidade sobre ativos e patrimônio. Revela com transparência matemática cada ponto forte e fraco da sua operação.',
    },
    {
      icon: AlertTriangle,
      badge: 'Prevenção de Crise',
      title: 'Teste de Insolvência Imediata e em 12 Meses',
      desc: 'Demonstramos com antecedência se a sua empresa apresenta risco de insolvência imediata ou no período de 12 meses. O teste separa a ilusão do lucro contábil impresso no papel da realidade do saldo bancário disponível para saldar folhas, tributos e fornecedores.',
    },
    {
      icon: ShieldCheck,
      badge: 'Decisões Seguras',
      title: 'Orientação Baseada em Ferramentas e Dados Reais',
      desc: 'Substituímos palpites e achismos por ferramentas gerenciais comprovadas: Fluxo de Caixa Projetado por semana, DRE Gerencial sem distorções fiscais, Ponto de Equilíbrio e Margem de Contribuição por família de produtos ou serviços prestados.',
    },
  ]

  // Como funciona o financeiro na prática (Ciclos e Pilares operacionais)
  const financialMechanics = [
    {
      icon: Repeat,
      title: 'Fluxo de Caixa & Capital de Giro',
      subtitle: 'As entradas e saídas que movem a empresa',
      desc: 'O capital de giro é o oxigênio que mantém as portas abertas. O fluxo de caixa registra cada real que efetivamente entra (vendas à vista, recebimento de duplicatas e cartões) e sai (compras de matéria-prima, folha salarial, aluguel, tributos e água/luz). O segredo não é apenas olhar o passado, mas projetar o futuro semanal.',
    },
    {
      icon: CalendarDays,
      title: 'Contas a Pagar e a Receber',
      subtitle: 'O controle rigoroso dos vencimentos',
      desc: 'Controle sistemático de prazos, cobranças ativas e agendamento de liquidações. A falta de rigor gera multas e juros bancários diários e, no pior cenário, corte de fornecedores essenciais. Cada data deve ser casada com a previsão de entrada para evitar que a empresa recorra a cheques especiais ou antecipação cara de recebíveis.',
    },
    {
      icon: Scale,
      title: 'Conciliação Bancária Diária',
      subtitle: 'A verdade sem filtros entre o extrato e o sistema',
      desc: 'Confronto diário entre o extrato de cada conta corrente/investimento e o ERP gerencial. Elimina desvios, tarifas bancárias indevidas, boletos não computados ou pagamentos duplicados. Sem conciliação diária, qualquer relatório gerencial perde a validade técnica.',
    },
    {
      icon: Clock,
      title: 'Ciclo Operacional vs. Ciclo Financeiro',
      subtitle: 'O intervalo que consome o seu caixa',
      desc: 'O Ciclo Operacional vai da compra do insumo até o recebimento da venda do cliente (compra → estoque → venda → recebimento). O Ciclo Financeiro é o tempo entre pagar o fornecedor e receber do cliente. Quanto maior esse intervalo em dias, mais dinheiro o empresário precisa tirar do bolso ou de bancos para financiar a operação.',
    },
  ]

  // Ferramentas de Tomada de Decisão com Exemplos Didáticos
  const decisionTools = [
    {
      id: 'fluxo',
      title: 'Fluxo de Caixa Projetado',
      shortTitle: 'Fluxo Projetado',
      tag: 'Previsibilidade Semanal',
      icon: DollarSign,
      concept:
        'O Fluxo de Caixa Projetado mapeia as entradas e saídas previstas semana a semana para os próximos 30, 60 ou 90 dias. Permite antecipar descompassos financeiros antes que eles se transformem em juros bancários ou inadimplência.',
      caseExample: {
        company: 'Distribuidora Alvorada Ltda. (Comércio Atacadista)',
        scenario:
          'A empresa fatura R$ 420.000/mês e tinha saldo inicial de R$ 35.000 na conta. Ao projetar as 4 semanas seguintes, a diretoria visualizou exatamente quando a conta ficaria negativa se nada fosse feito.',
        table: [
          {
            semana: 'Semana 1',
            entradas: 'R$ 95.000',
            saidas: 'R$ 82.000',
            saldoFinal: 'R$ 48.000',
            status: 'Positivo',
          },
          {
            semana: 'Semana 2',
            entradas: 'R$ 70.000',
            saidas: 'R$ 138.000',
            saldoFinal: '-R$ 20.000',
            status: 'Aperto Crítico (Fornecedores + Folha)',
          },
          {
            semana: 'Semana 3',
            entradas: 'R$ 130.000',
            saidas: 'R$ 75.000',
            saldoFinal: 'R$ 35.000',
            status: 'Recuperação',
          },
          {
            semana: 'Semana 4',
            entradas: 'R$ 110.000',
            saidas: 'R$ 90.000',
            saldoFinal: 'R$ 55.000',
            status: 'Equilibrado',
          },
        ],
        decision:
          'Tomada de Decisão: Com 12 dias de antecedência, antes de entrar no cheque especial na Semana 2 (juros de 12% a.m.), o empresário renegociou o prazo com dois grandes fornecedores da Semana 2 para a Semana 3 e concedeu desconto à vista para clientes pontuais da Semana 1, mantendo o saldo sempre positivo sem gastar um único centavo com bancos.',
      },
    },
    {
      id: 'dre',
      title: 'DRE Gerencial (Demonstração do Resultado)',
      shortTitle: 'DRE Gerencial',
      tag: 'Lucratividade Real',
      icon: FileSpreadsheet,
      concept:
        'A DRE Gerencial demonstra mês a mês a formação da receita líquida, dos custos variáveis (matéria-prima, mercadorias, comissões e impostos diretos), a Margem de Contribuição, os custos fixos estruturais e o Lucro Líquido Operacional.',
      caseExample: {
        company: 'Metalúrgica Santa Fé Ltda. (Indústria de Peças Usinadas)',
        scenario:
          'A fábrica produzia e vendia muito, mas os sócios não compreendiam para onde ia o dinheiro ao final de cada mês. A DRE Gerencial mensal revelou a composição exata da receita:',
        table: [
          { item: 'Receita Bruta Operacional', valor: 'R$ 500.000', pct: '100,0%' },
          { item: '(-) Impostos s/ Vendas e Devoluções', valor: 'R$ 65.000', pct: '13,0%' },
          { item: '(=) Receita Líquida Operacional', valor: 'R$ 435.000', pct: '87,0%' },
          {
            item: '(-) Custos Variáveis (Matéria-prima, Insumos, Frete)',
            valor: 'R$ 250.000',
            pct: '50,0%',
          },
          { item: '(=) Margem de Contribuição Bruta', valor: 'R$ 185.000', pct: '37,0%' },
          {
            item: '(-) Despesas Fixas (Folha ADM, Aluguel, Pró-labore, TI)',
            valor: 'R$ 130.000',
            pct: '26,0%',
          },
          {
            item: '(=) Resultado Operacional Antes dos Juros (EBITDA)',
            valor: 'R$ 55.000',
            pct: '11,0%',
          },
          {
            item: '(-) Despesas Financeiras Líquidas (Juros de Empréstimos)',
            valor: 'R$ 22.000',
            pct: '4,4%',
          },
          { item: '(=) Lucro Líquido do Mês', valor: 'R$ 33.000', pct: '6,6%' },
        ],
        decision:
          'Tomada de Decisão: A DRE Gerencial evidenciou que a operação fabril gerava R$ 55.000/mês, mas R$ 22.000 (40% do lucro operacional) eram corroídos por dívidas bancárias de curto prazo mal estruturadas. A Borlim orientou o alongamento do passivo e o saneamento das despesas fixas, elevando a margem líquida para 10,4% já no trimestre seguinte.',
      },
    },
    {
      id: 'liquidez',
      title: 'Indicadores de Liquidez (Corrente, Seca e Geral)',
      shortTitle: 'Indicadores de Liquidez',
      tag: 'Capacidade de Pagamento',
      icon: Percent,
      concept:
        'Mede a capacidade real da empresa de honrar seus compromissos financeiros. A Borlim calcula e audita três camadas essenciais de liquidez: Liquidez Corrente, Liquidez Seca e Liquidez Geral.',
      caseExample: {
        company: 'Vanguard Soluções em TI Ltda. (Serviços e Software)',
        scenario:
          'Empresa em expansão com Ativo Circulante de R$ 680.000 (sendo R$ 180.000 em caixa/bancos, R$ 420.000 em contas a receber de clientes e R$ 80.000 em estoques de hardware), Passivo Circulante de R$ 340.000 e Dívidas de Longo Prazo de R$ 160.000.',
        indicators: [
          {
            nome: 'Liquidez Corrente (LC)',
            formula: 'Ativo Circulante / Passivo Circulante',
            calculo: 'R$ 680.000 / R$ 340.000 = 2,00',
            significado:
              'Para cada R$ 1,00 de dívida no curto prazo (até 1 ano), a empresa possui R$ 2,00 em recursos a realizar. Situação confortável.',
          },
          {
            nome: 'Liquidez Seca (LS)',
            formula: '(Ativo Circulante - Estoques) / Passivo Circulante',
            calculo: '(R$ 680.000 - R$ 80.000) / R$ 340.000 = 1,76',
            significado:
              'Mesmo se a empresa não vender uma única unidade do estoque, ela possui R$ 1,76 em dinheiro imediato e recebíveis para cada R$ 1,00 de dívida imediata.',
          },
          {
            nome: 'Liquidez Geral (LG)',
            formula:
              '(Ativo Circulante + Realizável LP) / (Passivo Circulante + Passivo Não Circulante)',
            calculo: '(R$ 680.000 + R$ 60.000) / (R$ 340.000 + R$ 160.000) = 1,48',
            significado:
              'Para cada R$ 1,00 de dívida total (curto + longo prazo), a empresa dispõe de R$ 1,48 em haveres. Solidez estrutural perante credores e bancos.',
          },
        ],
        decision:
          'Tomada de Decisão: Com LC de 2,00 e LS de 1,76, a diretoria pôde comprovar formalmente a bancos que não necessitava oferecer ativos imobilizados como garantia para obter linhas de crédito de fomento para desenvolvimento de novos softwares.',
      },
    },
    {
      id: 'ponto',
      title: 'Ponto de Equilíbrio & Margem de Contribuição',
      shortTitle: 'Ponto de Equilíbrio',
      tag: 'Meta Mínima de Faturamento',
      icon: Target,
      concept:
        'A Margem de Contribuição (MC) é o que sobra da receita após deduzir os custos e despesas variáveis — é o valor que efetivamente paga os custos fixos e gera lucro. O Ponto de Equilíbrio (Break-Even) indica exatamente quanto a empresa precisa faturar no mês para ter lucro zero (custos 100% cobertos). A partir desse marco, cada venda adicional gera lucro líquido.',
      caseExample: {
        company: 'Confecções & Uniformes Modelo Ltda. (Indústria Têxtil)',
        scenario:
          'Custos Fixos Mensais (folha fixa, aluguel, energia base, contabilidade): R$ 60.000/mês. Preço médio do conjunto: R$ 120,00. Custos e impostos variáveis por conjunto (tecido, aviamentos, comissão, impostos diretos): R$ 72,00.',
        steps: [
          { rotulo: 'Preço de Venda Unitário (PV)', valor: 'R$ 120,00' },
          { rotulo: 'Custos e Despesas Variáveis Unitários (CV)', valor: 'R$ 72,00' },
          {
            rotulo: 'Margem de Contribuição Unitária (MC)',
            valor: 'R$ 48,00 por conjunto (40% do preço)',
          },
          { rotulo: 'Custos Fixos da Estrutura (CF)', valor: 'R$ 60.000 por mês' },
          {
            rotulo: 'Ponto de Equilíbrio em Quantidade',
            valor: 'R$ 60.000 / R$ 48,00 = 1.250 conjuntos/mês',
          },
          {
            rotulo: 'Ponto de Equilíbrio em Faturamento',
            valor: '1.250 un × R$ 120,00 = R$ 150.000/mês',
          },
        ],
        decision:
          'Tomada de Decisão: O empresário descobriu que até o dia 18 do mês (quando a empresa atingia R$ 150.000 em vendas), todo o faturamento apenas cobria a estrutura da fábrica. A meta comercial foi reestruturada para ultrapassar 1.250 peças o mais rápido possível no mês — e para cada 100 conjuntos vendidos acima de 1.250, sobram R$ 4.800 de lucro líquido limpo na conta bancária.',
      },
    },
    {
      id: 'insolvencia',
      title: 'Análise de Insolvência Imediata e em 12 Meses',
      shortTitle: 'Análise de Insolvência',
      tag: 'Ferramenta Central Borlim',
      icon: AlertTriangle,
      concept:
        'A ferramenta central da metodologia Borlim: auditamos se a empresa tem fôlego de caixa para honrar seus compromissos imediatos (amanhã, semana que vem) e projetamos cenários de estresse para os próximos 12 meses. Identifica com meses de antecedência se o negócio terá pressões por descasamentos, aumento da taxa de juros ou perdas sazonais de receita.',
      caseExample: {
        company: 'Transportadora & Logística Rodonorte (Serviços de Carga)',
        scenario:
          'A frota operava a pleno vapor faturando R$ 800.000/mês. No entanto, o combustível e a manutenção subiram, os clientes pagavam em 60 dias e as parcelas de financiamento da frota venciam todo dia 10. O teste de insolvência da Borlim disparou alerta amarelo para o 7º mês.',
        insights: [
          'Insolvência Imediata: Índice positivo (saldo de curto prazo suficiente para os próximos 45 dias).',
          'Insolvência em 12 Meses: Risco elevado no 7º mês por acúmulo de IPVA, parcelas de financiamento de caminhões e dissídio coletivo de motoristas, gerando déficit de caixa estimado em R$ 140.000.',
        ],
        decision:
          'Tomada de Decisão com a Borlim: Com 7 meses de antecedência — sem o desespero de bater na porta de bancos na véspera —, a Borlim estruturou a renegociação do leasing de 8 carretas, implementou reajuste de frete com gatilho de diesel e criou uma reserva de liquidez mensal de R$ 20.000. No 7º mês, a empresa superou o período sazonal com R$ 68.000 de sobra no caixa.',
      },
    },
    {
      id: 'ncg',
      title: 'Capital de Giro Líquido & Necessidade de Capital de Giro (NCG)',
      shortTitle: 'Capital de Giro & NCG',
      tag: 'Financiamento da Operação',
      icon: Coins,
      concept:
        'Capital de Giro Líquido (CGL) é a folga financeira de longo prazo que sobra para o curto prazo (Ativo Circulante - Passivo Circulante). Já a Necessidade de Capital de Giro (NCG) calcula o montante de dinheiro que a operação diária consome para manter estoques e financiar clientes antes de receber, descontando o prazo que os fornecedores concedem.',
      caseExample: {
        company: 'Auto Peças e Distribuição Bandeirantes Ltda.',
        scenario:
          'Contas a Receber de Clientes (prazo médio 48 dias): R$ 380.000. Estoque de Peças em Depósito (giro 55 dias): R$ 420.000. Fornecedores a Pagar (prazo médio 28 dias): R$ 260.000.',
        formula: 'NCG = Contas a Receber + Estoques - Fornecedores Operacionais',
        calculo: 'R$ 380.000 + R$ 420.000 - R$ 260.000 = R$ 540.000 de NCG',
        interpretation:
          'A empresa precisa de R$ 540.000 de capital de giro circulando permanentemente para não parar. Se o faturamento subir 30%, a NCG saltará para ~R$ 702.000.',
        decision:
          'Tomada de Decisão: A Borlim demonstrou que expandir as vendas sem caixa próprio levaria a empresa à ruína por NCG descasada. O plano de ação reduziu o estoque parado de 55 para 38 dias (liberando R$ 130.000 em caixa) e renegociou fornecedores para 42 dias, reduzindo a NCG necessária para R$ 370.000 e viabilizando o crescimento sustentável sem empréstimos caros.',
      },
    },
    {
      id: 'indicadores48',
      title: 'Os 48 Indicadores de Desempenho da Borlim',
      shortTitle: '48 Indicadores Borlim',
      tag: 'Raio-X Proprietário',
      icon: BarChart3,
      concept:
        'Metodologia proprietária com 48 indicadores financeiros distribuídos em 6 dimensões analíticas: Liquidez, Endividamento, Ciclos e Prazos Operacionais, Rentabilidade e Margens, Eficiência de Custos e Retorno sobre o Capital. Nenhum ponto cego fica de fora.',
      caseExample: {
        company: 'Grupo Industrial e Comercial Paulista (Faturamento R$ 28M/ano)',
        scenario:
          'A empresa possuía relatórios contábeis padrão que não conversavam entre si. O diagnóstico dos 48 indicadores da Borlim mapeou 31 pontos fortes e 17 pontos fracos críticos.',
        dimensions: [
          {
            nome: 'Dimensão 1: Liquidez & Fôlego (8 indicadores)',
            foco: 'Caixa imediato, seca, corrente, geral e cobertura de despesas em dias.',
          },
          {
            nome: 'Dimensão 2: Endividamento & Estrutura (9 indicadores)',
            foco: 'Participação de capital de terceiros, perfil da dívida (curto vs longo) e dependência bancária.',
          },
          {
            nome: 'Dimensão 3: Prazos e Giro (8 indicadores)',
            foco: 'PMR, PMP, PME, ciclos operacional e financeiro e giro de ativos.',
          },
          {
            nome: 'Dimensão 4: Margens & Resultados (8 indicadores)',
            foco: 'Margem bruta, margem de contribuição, EBITDA, margem operacional e líquida.',
          },
          {
            nome: 'Dimensão 5: Rentabilidade & Capital (8 indicadores)',
            foco: 'ROE (retorno s/ patrimônio), ROA (retorno s/ ativos), ROI e custo médio de capital.',
          },
          {
            nome: 'Dimensão 6: Prevenção & Insolvência (7 indicadores)',
            foco: 'Termômetro de insolvência imediata, em 12 meses e necessidade de capital de giro.',
          },
        ],
        decision:
          'Tomada de Decisão: O diagnóstico dos 48 indicadores da Borlim forneceu à diretoria um plano de ação ordenado por urgência. Em 6 meses, os 17 pontos fracos foram reduzidos a 4, melhorando o lucro mensal e blindando a empresa perante fornecedores e bancos parceiros.',
      },
    },
  ]

  // Cenários práticos reais do empresário brasileiro
  const practicalScenarios = [
    {
      icon: DollarSign,
      title: 'Faturamento alto, mas conta bancária sempre no aperto',
      desc: 'Um dos maiores paradoxos das empresas brasileiras: a empresa vende milhões, o telefone toca o dia todo, mas no dia 20 o empresário não sabe como pagará a folha. Causa real: descasamento brutal entre prazos de recebimento e pagamento, estoque parado sem giro e sangria de juros bancários.',
      solucao:
        'Solução Borlim: Saneamento do fluxo de caixa diário, reprogramação de pagamentos e alinhamento do ciclo financeiro.',
    },
    {
      icon: Users2,
      title: 'Clientes atrasando pagamentos e inadimplência crescente',
      desc: 'Clientes habituais começam a atrasar 10, 20 ou 30 dias. O empresário não quer perder o cliente e flexibiliza, mas seu fornecedor cobra no dia exato sob pena de protesto.',
      solucao:
        'Solução Borlim: Política estruturada de limites de crédito, régua de cobrança preventiva e trava de limite operacional.',
    },
    {
      icon: TrendingUp,
      title: 'Crescimento de vendas que consome todo o capital de giro',
      desc: 'Vender 40% a mais parece ótimo, mas exige comprar mais matéria-prima à vista, contratar mais equipe e financiar clientes a prazo. Se a empresa não tiver folga de capital de giro, ela "morre de sucesso" por sufoco financeiro.',
      solucao:
        'Solução Borlim: Cálculo prévio da Necessidade de Capital de Giro (NCG) por faixa de crescimento antes de aceitar pedidos.',
    },
    {
      icon: PieChart,
      title: 'Dúvidas sobre investimento ou reinvestimento dos lucros',
      desc: 'Quando a empresa fecha o ano no azul: os sócios devem retirar tudo em pró-labore e dividendos ou reinvestir na operação? Onde o retorno é maior? Na compra de máquinas, antecipação a fornecedores ou reserva de liquidez?',
      solucao:
        'Solução Borlim: Estudo técnico de retorno sobre o capital (ROE/ROIC) para indicar as decisões de maior ganho e menor risco.',
    },
  ]

  // 4 Etapas da Gestão Financeira com a Borlim
  const implementationSteps = [
    {
      step: '01',
      title: 'Diagnóstico dos 48 Indicadores & Raio-X Financeiro',
      desc: 'Mapeamento detalhado de extratos, controles de contas a pagar e receber, fluxo passado e balanços para apurar os 48 indicadores e identificar pontos fortes e gargalos.',
    },
    {
      step: '02',
      title: 'Teste de Insolvência Imediata e em 12 Meses',
      desc: 'Auditoria preventiva da capacidade de pagamento da empresa para hoje e para os próximos 12 meses, separando a ficção contábil da realidade de caixa.',
    },
    {
      step: '03',
      title: 'Implantação das Ferramentas de Tomada de Decisão',
      desc: 'Estruturação do Fluxo de Caixa Projetado semanal, DRE Gerencial, Ponto de Equilíbrio, controle de NCG e metas operacionais para o time.',
    },
    {
      step: '04',
      title: 'Reuniões de Acompanhamento Executivo & Resultados',
      desc: 'Suporte direto do consultor sênior Flávio Bordignon: análise mensal dos números, direcionamento para reinvestimento dos lucros e blindagem contínua do caixa.',
    },
  ]

  // FAQ em acordeão (8 dúvidas reais de empresários)
  const faqs = [
    {
      q: 'Qual é a diferença real entre Lucro Contábil e Caixa Real na prática?',
      a: 'Essa é a maior armadilha da vida empresarial: lucro contábil não é dinheiro no banco. O Lucro Contábil (regime de competência) é calculado no momento em que a venda acontece — se você faturou R$ 100.000 parcelados em 5 vezes de R$ 20.000 com custo de R$ 60.000 à vista, a sua contabilidade registrará R$ 40.000 de lucro no papel no primeiro mês. Porém, no seu Caixa Real (regime de caixa), você pagou R$ 60.000 de custos e só recebeu R$ 20.000 da primeira parcela — seu caixa está negativo em R$ 40.000! É por isso que muitas empresas quebram mesmo apresentando lucros expressivos no demonstrativo.',
    },
    {
      q: 'O que são os 48 indicadores de desempenho financeiro da Borlim?',
      a: 'São um conjunto estruturado de métricas econômicas e financeiras divididas em 6 dimensões estratégicas: Liquidez (imediata, seca, corrente e geral), Endividamento (curto vs longo prazo e dependência bancária), Ciclos e Prazos Operacionais (estoques, recebimento e pagamento), Margens e Lucro Real (margem bruta, de contribuição e líquida), Rentabilidade do Capital (ROE e ROIC) e Riscos de Insolvência. Esse diagnóstico 360° aponta exatamente onde a empresa perde dinheiro e onde estão suas maiores fortalezas.',
    },
    {
      q: 'Como funciona o teste de insolvência imediata e no período de 12 meses?',
      a: 'O teste de insolvência da Borlim confronta todas as obrigações financeiras exigíveis da empresa (fornecedores, salários, encargos, tributos e parcelas bancárias) contra o saldo disponível e a capacidade real de geração de caixa operacional. Esse cálculo é feito tanto para o horizonte imediato (próximos 30 a 60 dias) quanto em projeções de estresse para os próximos 12 meses. O teste revela com até um ano de antecedência se o negócio terá pressões de liquidez, permitindo reprogramar prazos com total tranquilidade.',
    },
    {
      q: 'Por que o Ponto de Equilíbrio e a Margem de Contribuição são vitais?',
      a: 'A Margem de Contribuição revela quanto sobra de cada venda após pagar os custos variáveis (matéria-prima, comissão e impostos diretos) para pagar as despesas fixas da estrutura e gerar lucro. O Ponto de Equilíbrio indica o dia do mês e o volume exato de faturamento em que a empresa "empata" suas contas. Sem conhecer esses dois números, o empresário pode aumentar vendas achando que terá lucro, mas na verdade acelerar o prejuízo caso a margem do produto seja insuficiente.',
    },
    {
      q: 'O que é Necessidade de Capital de Giro (NCG) e por que crescer consome caixa?',
      a: 'A NCG é a quantia em dinheiro que fica retida na operação diária entre o pagamento dos fornecedores e o recebimento das vendas dos clientes. Quando uma empresa decide dobrar de tamanho, ela precisa estocar o dobro de matéria-prima e conceder prazo para o dobro de clientes. Se esse crescimento não for precedido de planejamento financeiro, a empresa consome todo o seu caixa e é forçada a tomar empréstimos caros, entrando em uma espiral de endividamento.',
    },
    {
      q: 'Como a Borlim ajuda a empresa a reinvestir os lucros no próprio negócio?',
      a: 'A Borlim demonstra tecnicamente para os sócios quais decisões trazem maior retorno econômico: quitar empréstimos bancários que cobram juros de 2% a.m., obter desconto de 5% à vista em compras grandes de fornecedores estratégicos, automatizar um processo produtivo para reduzir desperdício ou constituir reserva de liquidez remunerada para oportunidades de mercado. Cada decisão é apresentada com o cálculo comparativo de retorno sobre o capital (ROIC).',
    },
    {
      q: 'Qual o formato de atendimento e a dedicação exigida da minha equipe?',
      a: 'O trabalho da Borlim é consultivo e respeita o ritmo da sua operação. Não travamos a rotina produtiva nem demandamos sistemas caros. Coletamos os dados já existentes na empresa (extratos, relatórios de contas, DRE contábil ou planilhas) e nossos economistas processam os 48 indicadores, o teste de insolvência e as ferramentas de decisão. As reuniões executivas são diretas e focadas na tomada de decisão dos sócios e líderes.',
    },
    {
      q: 'Como contratar o serviço de Gestão Financeira ou solicitar uma proposta?',
      a: 'Como cada empresa tem seu porte, segmento e desafios específicos, não trabalhamos com pacotes engessados. Realizamos uma primeira conversa diagnóstica, sigilosa e sem compromisso, para conhecer a estrutura do seu negócio. Basta falar diretamente com o economista Flávio Bordignon pelo WhatsApp (17) 99765-0672 ou e-mail flavio@borlim.com.br.',
    },
  ]

  // Sinergia com outros serviços
  const synergyServices = [
    {
      title: 'Planejamento Econômico-Financeiro',
      desc: 'Estruturação dos três planejamentos da Borlim (Financeiro, Econômico e BSC) para maximizar o lucro mensal e a competitividade.',
      link: '/planejamento-economico-financeiro',
      tag: 'Lucro & Estratégia',
      icon: Compass,
    },
    {
      title: 'Valuation & Avaliação de Empresas',
      desc: 'Avaliação patrimonial com indicador seguro, múltiplos e fluxo de caixa descontado para venda, fusão ou entrada de sócios.',
      link: '/valuation',
      tag: 'Valor de Mercado',
      icon: Coins,
    },
    {
      title: 'Formação de Preço para Vendas',
      desc: 'Markup seguro, margem de contribuição e ponto de equilíbrio calibrados para Indústria, Comércio e Serviços.',
      link: '/formacao-de-preco',
      tag: 'Pricing & Margens',
      icon: Tag,
    },
    {
      title: 'Balanced Scorecard (BSC)',
      desc: 'Gestão estratégica nas 4 perspectivas para a empresa ser muito mais competitiva no mercado e não perder negócios.',
      link: '/balanced-scorecard',
      tag: 'Competitividade',
      icon: Target,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8]">
      {/* 1. HERO INSTITUCIONAL (Fintech Financial Intelligence Terminal) */}
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
              <CircleDollarSign className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E] font-bold">
                Especialidade Central — BORLIM Consultoria
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Gestão Financeira Empresarial
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-emerald-300 mt-4 font-normal leading-snug">
              Controle prático do caixa, ferramentas reais de tomada de decisão e blindagem contra a
              insolvência de empresário para empresário.
            </p>

            <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed font-sans max-w-3xl">
              Na <strong>Borlim Consultoria Empresarial</strong>, desmistificamos a complexidade do
              setor financeiro para você governar o seu negócio com segurança. Explicamos na prática
              o funcionamento do caixa: as entradas e saídas do capital de giro, a conciliação
              bancária, o ciclo financeiro e a{' '}
              <strong>diferença vital entre lucro contábil e dinheiro real no banco</strong>.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-sans max-w-3xl">
              Somos especializados em{' '}
              <strong>diagnosticar e planejar o sistema financeiro da empresa</strong>: demonstramos
              seus pontos fortes e fracos por meio de <strong>48 indicadores de desempenho</strong>{' '}
              e avaliamos se há{' '}
              <strong>risco de insolvência imediata ou no período de 12 meses</strong>. Entregamos
              ferramentas práticas com exemplos numéricos — como Fluxo de Caixa Projetado, DRE
              Gerencial, Ponto de Equilíbrio e controle da Necessidade de Capital de Giro (NCG) —
              para que você tome decisões seguras de crescimento e reinvestimento dos lucros.
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
                <span>Falar no WhatsApp (17) 99765-0672</span>
                <ArrowRight className="w-4 h-4 text-[#082852] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="mailto:flavio@borlim.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20Gest%C3%A3o%20Financeira%20-%20Borlim"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-mono font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>flavio@borlim.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CITAÇÃO CENTRAL & COMPROMISSO METODOLÓGICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
                  Diagnóstico Estratégico Borlim
                </span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#082852] leading-snug">
                “A Borlim é especializada em diagnosticar e planejar o sistema financeiro da sua
                empresa: demonstra pontos fortes e fracos com 48 indicadores de desempenho e avalia
                se há risco de insolvência imediata ou em 12 meses.”
              </blockquote>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Não adianta ter sistemas caros se os números não respondem às dúvidas essenciais do
                dono:
                <em>
                  {' '}
                  Quanto vai sobrar no fim do mês? Podemos dar mais prazo ao cliente? Há risco de
                  aperto bancário? Onde devemos investir os lucros gerados?
                </em>{' '}
                Criamos rotinas claras, controles semanais e métricas visuais para que o financeiro
                seja o motor do crescimento, e não uma fonte constante de dor de cabeça.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#E5EDF5]/70 p-6 rounded-xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                  Atendimento Direto com o Consultor
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

      {/* 3. A FUNDAÇÃO: OS 3 PILARES DO DIAGNÓSTICO BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Fundamentos do Sistema Financeiro
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            A Base Sólida da Gestão Financeira Borlim
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Antes de qualquer tomada de decisão, colocamos o sistema financeiro sob auditoria
            rigorosa. Conheça os três pilares que sustentam a gestão profissional da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diagnosticPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#16A34A] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#16A34A]/5 rounded-bl-full pointer-events-none group-hover:bg-[#16A34A]/10 transition-colors" />
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

      {/* 4. COMO FUNCIONA O FINANCEIRO DENTRO DA EMPRESA (EXPLICADO NA PRÁTICA) */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Engrenagens Operacionais
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Como Funciona o Financeiro na Prática Dentro da Empresa
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              O departamento financeiro não existe para emitir notas fiscais ou boletos no piloto
              automático. Ele é a central de comando que garante que a operação nunca pare por falta
              de capital de giro e que cada venda contribua com dinheiro novo no saldo bancário.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {financialMechanics.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#F0F4F8]/60 rounded-2xl border border-stone-200 flex flex-col justify-between hover:border-[#16A34A] transition-all"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#082852] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Destaque Didático: LUCRO CONTÁBIL VS. CAIXA REAL & CICLOS */}
          <div className="bg-gradient-to-br from-[#082852] via-[#0B3B7A] to-[#082852] text-white p-8 sm:p-10 rounded-2xl border border-[#0B3B7A] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#22C55E]">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
                    O Paradoxo Fatal do Empresário
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  A Diferença Crucial: Uma Empresa Pode Lucrar no Papel e Quebrar por Falta de Caixa
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <strong>Lucro Contábil (Regime de Competência):</strong> Se uma empresa vende R$
                  300.000 em mercadorias com custo de R$ 180.000, ela registra R$ 120.000 de lucro
                  operacional no mês. Os impostos (como IRPJ/CSLL ou DAS) e as comissões incidem
                  imediatamente sobre esse valor.
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <strong>Caixa Real (Regime de Caixa):</strong> Se os clientes pagam em 4 parcelas
                  a perder de vista (R$ 75.000 por mês) e o fornecedor dos R$ 180.000 exige
                  pagamento à vista em 30 dias, o caixa da empresa sofre um rombo de{' '}
                  <strong>R$ 105.000 negativos no mês 1</strong>. Sem capital de giro planejado, a
                  empresa busca antecipação bancária, paga juros escorchantes e pode quebrar mesmo
                  sendo considerada "altamente lucrativa" na contabilidade.
                </p>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/15 space-y-4">
                <h4 className="font-serif text-base font-bold text-emerald-300 flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-[#22C55E]" />
                  A Dinâmica dos Ciclos Empresariais
                </h4>

                <div className="space-y-3 font-sans text-xs">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-mono text-[#22C55E] font-bold block mb-1">
                      1. Ciclo Operacional:
                    </span>
                    <span className="text-slate-300">
                      Compra de Matéria-prima → Permanência no Estoque → Venda ao Cliente →
                      Recebimento da Duplicata. (Ex.: 45 dias no estoque + 40 dias para receber ={' '}
                      <strong>85 dias de ciclo operacional</strong>).
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="font-mono text-[#22C55E] font-bold block mb-1">
                      2. Ciclo Financeiro (Caixa Descoberto):
                    </span>
                    <span className="text-slate-300">
                      Ciclo Operacional (85 dias) menos o Prazo Concedido pelos Fornecedores (30
                      dias) = <strong>55 dias de buraco no caixa</strong>. Nesses 55 dias, o
                      empresário precisa bancar a empresa do próprio bolso ou de capital de giro
                      estruturado.
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
                  >
                    <span>Calcular os Ciclos da Minha Empresa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FERRAMENTAS DE TOMADA DE DECISÃO COM EXEMPLOS NUMÉRICOS (TABS INTERATIVAS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#15803D]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#15803D]">
              Instrumentos de Decisão com Casos Didáticos
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] leading-tight">
            Quais Ferramentas São Usadas para as Tomadas de Decisões?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            Veja a seguir cada ferramenta financeira explicada de empresário para empresário,
            acompanhada de um exemplo numérico prático em empresas fictícias brasileiras
            (distribuidora, metalúrgica, empresa de TI, confecção e transportadora).
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
          {decisionTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveToolTab(tool.id as typeof activeToolTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeToolTab === tool.id
                  ? 'bg-[#0B3B7A] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tool.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          {decisionTools.map((tool) => {
            if (activeToolTab !== tool.id) return null
            const Icon = tool.icon

            return (
              <div key={tool.id} className="space-y-8 animate-fade-in">
                {/* Header da Ferramenta */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#082852] text-[#22C55E] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200">
                        {tool.tag}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082852] mt-1">
                        {tool.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Conceito Explicado */}
                <div className="bg-[#E5EDF5]/40 p-5 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B3B7A] mb-1">
                    Conceito & Utilidade Prática:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {tool.concept}
                  </p>
                </div>

                {/* Exemplo Didático */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#15803D]">
                      Exemplo Numérico Prático
                    </span>
                    <span className="text-xs font-serif italic text-slate-500">
                      {tool.caseExample.company}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    <strong>Situação da Empresa:</strong> {tool.caseExample.scenario}
                  </p>

                  {/* Renderização condicional conforme tipo de exemplo */}
                  {/* Tabela de Fluxo */}
                  {'table' in tool.caseExample && tool.id === 'fluxo' && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#082852] text-white font-mono text-[11px] uppercase">
                          <tr>
                            <th className="p-3">Período</th>
                            <th className="p-3">Entradas Previstas</th>
                            <th className="p-3">Saídas Previstas</th>
                            <th className="p-3">Saldo Acumulado</th>
                            <th className="p-3">Diagnóstico Borlim</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {(
                            tool.caseExample.table as Array<{
                              semana: string
                              entradas: string
                              saidas: string
                              saldoFinal: string
                              status: string
                            }>
                          ).map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={
                                row.saldoFinal.startsWith('-') ? 'bg-red-50/70 font-semibold' : ''
                              }
                            >
                              <td className="p-3 font-mono font-bold text-[#082852]">
                                {row.semana}
                              </td>
                              <td className="p-3 font-mono text-emerald-700 font-bold">
                                {row.entradas}
                              </td>
                              <td className="p-3 font-mono text-slate-700">{row.saidas}</td>
                              <td
                                className={`p-3 font-mono font-bold ${
                                  row.saldoFinal.startsWith('-') ? 'text-red-600' : 'text-[#082852]'
                                }`}
                              >
                                {row.saldoFinal}
                              </td>
                              <td className="p-3 text-slate-600">{row.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Tabela de DRE Gerencial */}
                  {'table' in tool.caseExample && tool.id === 'dre' && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#082852] text-white font-mono text-[11px] uppercase">
                          <tr>
                            <th className="p-3">Estrutura da DRE Gerencial</th>
                            <th className="p-3">Valor Real (R$)</th>
                            <th className="p-3">Percentual (% s/ Receita)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white font-mono">
                          {(
                            tool.caseExample.table as Array<{
                              item: string
                              valor: string
                              pct: string
                            }>
                          ).map((row, rIdx) => {
                            const isBold =
                              row.item.includes('(=)') ||
                              row.item.includes('Receita Bruta') ||
                              row.item.includes('Lucro Líquido')
                            return (
                              <tr
                                key={rIdx}
                                className={
                                  row.item.includes('Lucro Líquido')
                                    ? 'bg-emerald-50 font-bold text-[#15803D]'
                                    : row.item.includes('Margem de Contribuição')
                                      ? 'bg-slate-50 font-semibold'
                                      : ''
                                }
                              >
                                <td
                                  className={`p-3 font-sans ${isBold ? 'font-bold text-[#082852]' : 'text-slate-600 pl-6'}`}
                                >
                                  {row.item}
                                </td>
                                <td
                                  className={`p-3 font-bold ${row.item.includes('(-)') ? 'text-slate-700' : 'text-[#082852]'}`}
                                >
                                  {row.valor}
                                </td>
                                <td className="p-3 text-slate-500">{row.pct}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Indicadores de Liquidez */}
                  {'indicators' in tool.caseExample && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {tool.caseExample.indicators.map((ind, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-4 bg-[#F0F4F8] rounded-xl border border-slate-200 space-y-2"
                        >
                          <span className="text-[11px] font-mono font-bold uppercase text-[#0B3B7A] block">
                            {ind.nome}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 block">
                            Fórmula: {ind.formula}
                          </span>
                          <div className="p-2 bg-white rounded border border-slate-200 font-mono text-xs font-bold text-[#15803D]">
                            {ind.calculo}
                          </div>
                          <p className="text-xs text-slate-600 font-sans leading-relaxed pt-1">
                            {ind.significado}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ponto de Equilíbrio */}
                  {'steps' in tool.caseExample && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {tool.caseExample.steps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 bg-[#F0F4F8] rounded-xl border border-slate-200"
                        >
                          <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
                            {st.rotulo}
                          </span>
                          <span className="font-mono text-sm font-bold text-[#082852]">
                            {st.valor}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Insolvência */}
                  {'insights' in tool.caseExample && (
                    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 block">
                        Diagnóstico do Termômetro de Insolvência:
                      </span>
                      <ul className="space-y-1.5 text-xs text-amber-950 font-sans">
                        {tool.caseExample.insights.map((ins, inIdx) => (
                          <li key={inIdx} className="flex items-start gap-2">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{ins}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* NCG */}
                  {'formula' in tool.caseExample && (
                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                      <div className="font-mono text-xs font-bold text-[#15803D]">
                        {tool.caseExample.formula}
                      </div>
                      <div className="p-2 bg-white rounded border border-emerald-200 font-mono text-xs font-bold text-[#082852]">
                        {tool.caseExample.calculo}
                      </div>
                      <p className="text-xs text-slate-700 font-sans">
                        {tool.caseExample.interpretation}
                      </p>
                    </div>
                  )}

                  {/* 48 Indicadores */}
                  {'dimensions' in tool.caseExample && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {tool.caseExample.dimensions.map((dim, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs"
                        >
                          <span className="text-xs font-mono font-bold text-[#082852] block mb-1">
                            {dim.nome}
                          </span>
                          <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                            {dim.foco}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Conclusão e Decisão Tomada */}
                  <div className="p-4 bg-emerald-50 border-l-4 border-[#16A34A] rounded-r-xl space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                      Resultado Prático da Tomada de Decisão:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                      {tool.caseExample.decision}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. CENÁRIOS PRÁTICOS DO EMPRESÁRIO BRASILEIRO */}
      <section className="bg-[#E5EDF5]/60 py-16 sm:py-24 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Desafios do Dia a Dia Corporativo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
              Você Reconhece Algum Desses Cenários na Sua Empresa?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
              Situações que tiram o sono de quem empreende no Brasil e que são resolvidas de forma
              definitiva com a metodologia de Gestão Financeira da Borlim.
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
                    <span className="font-semibold text-[#082852]">{scenario.solucao}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. O PROCESSO DE IMPLANTAÇÃO PASSO A PASSO (4 ETAPAS) */}
      <section className="bg-[#082852] text-white py-16 sm:py-24 border-b border-[#0B3B7A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
              Método Conduzido por Economistas
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
              Como Funciona a Gestão Financeira com a BORLIM
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-sans leading-relaxed">
              Trabalho consultivo estruturado, sem travar sua rotina interna e com foco exclusivo em
              fôlego de caixa e tomada de decisões que protegem o seu patrimônio.
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

          <div className="mt-14 text-center flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg border border-[#22C55E]/40"
            >
              <Phone className="w-4 h-4" />
              <span>Solicitar Diagnóstico Financeiro para Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={balanceAnalysisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#082852] hover:bg-slate-100 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md font-mono"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" />
              <span>Acessar Sistema de Gestão Empresarial</span>
              <ExternalLink className="w-4 h-4 text-[#082852]" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. SINERGIA COM OS DEMAIS SERVIÇOS ESTRATÉGICOS DA BORLIM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
            Visão Integrada da Consultoria
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082852] mt-2">
            Sinergia com as Outras Especialidades da Borlim
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-sans leading-relaxed">
            A Gestão Financeira é o alicerce operacional que alimenta todas as demais decisões
            estratégicas da sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {synergyServices.map((service, idx) => {
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
      </section>

      {/* 9. FAQ EM ACORDEÃO (DÚVIDAS REAIS DE EMPRESÁRIOS) */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold">
              Tira-Dúvidas Direto
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082852] mt-2">
              Perguntas Frequentes sobre Gestão Financeira
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Respostas claras de empresário para empresário, sem juridiquês ou termos vazios.
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

      {/* 10. CTA INSTITUCIONAL FINAL COM CANAIS OFICIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-[#082852] text-white rounded-3xl p-8 sm:p-14 border border-[#0B3B7A] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#22C55E] font-bold">
                Atendimento Técnico & Diagnóstico Prévio
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Coloque a Gestão Financeira da sua empresa no rumo certo com a Borlim.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Agende uma conversa confidencial diretamente com o economista Flávio Bordignon.
                Vamos analisar seus indicadores, avaliar o fôlego de caixa da sua empresa e desenhar
                as ferramentas certas para você decidir com segurança.
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
                  href="mailto:flavio@borlim.com.br?subject=Contato%20Gest%C3%A3o%20Financeira%20Borlim"
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
