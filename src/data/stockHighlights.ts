export type StockRecommendationType = 'compra' | 'venda'

export interface StockHighlightItem {
  ticker: string
  name: string
  sector: string
  recommendation: StockRecommendationType
  badgeLabel: string
  referencePrice: number
  variationPercent: number
  dividendYield: number
  peRatio: number // Preço sobre Lucro (P/L)
  sparkline: number[]
  horizonte: string
  perfilRisco: 'Conservador' | 'Moderado' | 'Arrojado'
  explanation: string
  fundamentos: string[]
  pontoAtencao: string
}

export const STOCK_HIGHLIGHTS: StockHighlightItem[] = [
  // ===================== MELHORES PARA COMPRA (OPORTUNIDADES) =====================
  {
    ticker: 'PETR4',
    name: 'Petrobras PN',
    sector: 'Petróleo & Gás',
    recommendation: 'compra',
    badgeLabel: 'COMPRA',
    referencePrice: 38.45,
    variationPercent: 1.32,
    dividendYield: 14.8,
    peRatio: 4.2,
    sparkline: [36.9, 37.2, 37.05, 37.8, 38.1, 37.95, 38.45],
    horizonte: 'Médio / Longo Prazo',
    perfilRisco: 'Moderado',
    explanation:
      'Geração de caixa livre recorde sustentada por custos de extração no pré-sal entre os mais baixos do planeta. Mesmo com volatilidade na cotação do barril Brent e ruídos políticos, o retorno via dividendos extraordinários e múltiplos de valuation descontados conferem ampla margem de segurança patrimonial.',
    fundamentos: [
      'Dividend Yield atrativo acima de 14% a.a.',
      'Custo de extração pré-sal inferior a US$ 6/barril',
      'P/L em torno de 4x, muito abaixo da média histórica global',
    ],
    pontoAtencao:
      'Sensibilidade a decisões de despesas de capital (Capex) e preço dos combustíveis.',
  },
  {
    ticker: 'ITUB4',
    name: 'Itaú Unibanco PN',
    sector: 'Serviços Financeiros',
    recommendation: 'compra',
    badgeLabel: 'COMPRA',
    referencePrice: 35.8,
    variationPercent: 0.85,
    dividendYield: 7.9,
    peRatio: 8.6,
    sparkline: [34.5, 34.8, 35.1, 34.9, 35.3, 35.5, 35.8],
    horizonte: 'Longo Prazo',
    perfilRisco: 'Conservador',
    explanation:
      'Líder absoluto de eficiência operacional entre os grandes bancos privados da América Latina, com índice de inadimplência sob controle e ROE (Retorno sobre Patrimônio) próximo de 21%. O banco se beneficia da Selic elevada sem comprometer a carteira de crédito corporativo e de alta renda.',
    fundamentos: [
      'ROE superior a 20%, o mais consistente entre os grandes bancos',
      'Carteira de crédito defensiva focada em médias e grandes empresas',
      'Payout crescente com distribuição regular de dividendos e JCP',
    ],
    pontoAtencao: 'Concorrência contínua com fintechs em produtos de varejo massificado.',
  },
  {
    ticker: 'BBAS3',
    name: 'Banco do Brasil ON',
    sector: 'Serviços Financeiros / Agro',
    recommendation: 'compra',
    badgeLabel: 'COMPRA',
    referencePrice: 28.9,
    variationPercent: 1.15,
    dividendYield: 9.6,
    peRatio: 4.8,
    sparkline: [27.8, 28.1, 28.0, 28.4, 28.25, 28.65, 28.9],
    horizonte: 'Médio / Longo Prazo',
    perfilRisco: 'Conservador',
    explanation:
      'Monopólio informal do crédito rural no Brasil, financiando a cadeia mais competitiva da economia nacional (o agronegócio). Negocia com desconto severo de governança estatal frente aos pares privados, entregando dividendos robustos de quase dois dígitos e índice de Basileia altamente confortável.',
    fundamentos: [
      'Liderança absoluta no crédito agropecuário com garantias reais sólidas',
      'P/VP abaixo do valor patrimonial contábil (desconto atrativo)',
      'Política formal de distribuição de lucros de 45% a 50%',
    ],
    pontoAtencao:
      'Possíveis pressões políticas para concessão de crédito subsidiado em ciclos eleitorais.',
  },
  {
    ticker: 'WEGE3',
    name: 'WEG S.A. ON',
    sector: 'Bens Industriais',
    recommendation: 'compra',
    badgeLabel: 'COMPRA',
    referencePrice: 52.4,
    variationPercent: 0.58,
    dividendYield: 2.3,
    peRatio: 28.4,
    sparkline: [49.8, 50.4, 51.1, 50.9, 51.6, 51.9, 52.4],
    horizonte: 'Longo Prazo',
    perfilRisco: 'Moderado',
    explanation:
      'Multinacional brasileira de excelência global em motores elétricos, automação industrial e transição energética. Mais de 50% de sua receita é dolarizada com fábricas no exterior. Apresenta ROIC histórico acima de 25% e reinveste lucros com eficiência ímpar, atuando como o ativo de maior resiliência da B3.',
    fundamentos: [
      'Receita dolarizada protegendo o investidor contra volatilidades cambiais',
      'ROIC (Retorno sobre Capital Investido) consistentemente acima de 25%',
      'Crescimento contratado em eletrificação, solar e data centers globais',
    ],
    pontoAtencao:
      'Múltiplos de valuation (P/L) esticados exigem disciplina na formação de preço médio.',
  },
  {
    ticker: 'VALE3',
    name: 'Vale S.A. ON',
    sector: 'Mineração & Siderurgia',
    recommendation: 'compra',
    badgeLabel: 'COMPRA',
    referencePrice: 58.6,
    variationPercent: 1.45,
    dividendYield: 10.2,
    peRatio: 5.5,
    sparkline: [56.2, 57.1, 56.8, 57.5, 57.2, 58.1, 58.6],
    horizonte: 'Médio Prazo',
    perfilRisco: 'Moderado',
    explanation:
      'Maior produtora mundial de minério de ferro de alto teor (Carajás), com prêmio de qualidade essencial para a descarbonização das siderúrgicas. Negociando nos menores múltiplos dos últimos 3 anos, a empresa recompra as próprias ações, tem baixo endividamento líquido e paga dividendos robustos em dólar convertido.',
    fundamentos: [
      'Geração de caixa extraordinária e custo caixa C1 altamente competitivo',
      'Programa contínuo de recompra de ações aumentando participação do acionista',
      'Dividend Yield de dois dígitos suportado pelo caixa operacional',
    ],
    pontoAtencao: 'Dependência do ritmo de estímulos e construção civil na economia chinesa.',
  },

  // ===================== ATENÇÃO / PONTOS DE VENDA (RISCOS) =====================
  {
    ticker: 'MGLU3',
    name: 'Magazine Luiza ON',
    sector: 'Varejo & Consumo Cíclico',
    recommendation: 'venda',
    badgeLabel: 'ATENÇÃO / RISCO',
    referencePrice: 8.95,
    variationPercent: -2.72,
    dividendYield: 0.0,
    peRatio: -18.5,
    sparkline: [10.4, 10.1, 9.8, 9.5, 9.3, 9.1, 8.95],
    horizonte: 'Curto / Médio Prazo',
    perfilRisco: 'Arrojado',
    explanation:
      'Modelo de negócio severamente penalizado por juros reais elevados no Brasil, que encarecem o crédito ao consumidor de eletroeletrônicos e elevam as despesas financeiras com a dívida. A competição predatória com plataformas cross-border internacionais comprime as margens líquidas, mantendo os resultados no prejuízo ou breakeven.',
    fundamentos: [
      'Custo da dívida consumindo a maior parte do Ebitda operacional',
      'Sensibilidade extrema a cortes na taxa Selic e inadimplência das famílias',
      'Margens brutas pressionadas pela concorrência com marketplaces asiáticos',
    ],
    pontoAtencao:
      'Risco de diluição em novos aumentos de capital se a Selic permanecer acima de 12%.',
  },
  {
    ticker: 'ABEV3',
    name: 'Ambev S.A. ON',
    sector: 'Bebidas & Consumo Não Cíclico',
    recommendation: 'venda',
    badgeLabel: 'ATENÇÃO / REALIZAR',
    referencePrice: 11.85,
    variationPercent: -0.65,
    dividendYield: 5.4,
    peRatio: 12.8,
    sparkline: [12.6, 12.4, 12.35, 12.1, 12.0, 11.9, 11.85],
    horizonte: 'Médio Prazo',
    perfilRisco: 'Conservador',
    explanation:
      'Apesar de possuir balanço com caixa líquido impecável e excelente distribuição logística, a companhia enfrenta estagnação estrutural no volume de vendas no Brasil, forte pressão de custos de insumos (alumínio e fretes) e incertezas quanto à tributação de créditos de ICMS na Reforma Tributária sobre bebidas açucaradas e alcoólicas (Imposto Seletivo).',
    fundamentos: [
      'Crescimento orgânico de receita abaixo da inflação acumulada do período',
      'Impacto potencial do Imposto Seletivo (Reforma Tributária) sobre margens',
      'Perda de market share em segmentos premium para cervejarias internacionais',
    ],
    pontoAtencao:
      'Momento propício para realizar lucros e realocar em papéis com maior rendimento de dividendos.',
  },
  {
    ticker: 'B3SA3',
    name: 'B3 S.A. ON',
    sector: 'Serviços Financeiros / Infraestrutura',
    recommendation: 'venda',
    badgeLabel: 'ATENÇÃO / CAUTELA',
    referencePrice: 10.42,
    variationPercent: -1.25,
    dividendYield: 4.8,
    peRatio: 13.9,
    sparkline: [11.5, 11.3, 11.1, 10.9, 10.75, 10.55, 10.42],
    horizonte: 'Médio Prazo',
    perfilRisco: 'Moderado',
    explanation:
      'A infraestrutura da B3 é um monopólio natural, porém a sua receita é diretamente indexada ao volume diário de negociações (ADTV) de ações e à realização de IPOs. Com a Renda Fixa pagando mais de 1% ao mês isenta de risco, o fluxo de pessoa física e fundos de ações continua deprimido, travando o crescimento do lucro líquido.',
    fundamentos: [
      'Volume diário negociado (ADTV) em queda pelo apetite migrado para Renda Fixa',
      'Ausência crônica de novas aberturas de capital (IPOs e follow-ons)',
      'Possível concorrência futura de novas operadoras de bolsa aprovadas pela CVM',
    ],
    pontoAtencao:
      'Reavaliação recomendada se houver ciclo contínuo de afrouxamento monetário global.',
  },
  {
    ticker: 'AZUL4',
    name: 'Azul S.A. PN',
    sector: 'Transporte Aéreo',
    recommendation: 'venda',
    badgeLabel: 'ATENÇÃO / RISCO ALTO',
    referencePrice: 4.15,
    variationPercent: -3.45,
    dividendYield: 0.0,
    peRatio: -2.4,
    sparkline: [5.2, 4.95, 4.8, 4.6, 4.45, 4.3, 4.15],
    horizonte: 'Curto Prazo',
    perfilRisco: 'Arrojado',
    explanation:
      'Setor de alta intensidade de capital, com passivos operacionais atrelados ao dólar (leasing de aeronaves e querosene de aviação) enquanto a maior parte das receitas é em moeda nacional (Real). As renegociações recorrentes com arrendadores e credores evidenciam vulnerabilidade na estrutura de capital para o investidor de perfil empresarial.',
    fundamentos: [
      'Alavancagem financeira elevada (Dívida Líquida / Ebitda acima de 4,5x)',
      'Descompasso cambial agudo entre custos dolarizados e receita em reais',
      'Inexistência de distribuição de dividendos no horizonte visível',
    ],
    pontoAtencao: 'Não recomendada para alocação de reservas estratégicas empresariais.',
  },
]
