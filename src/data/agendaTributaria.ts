export interface TributoItem {
  id: string
  nome: string
  sigla: string
  esfera: 'Federal' | 'Estadual' | 'Municipal'
  codigoReceita?: string // Código DARF, DAS, GPS etc.
  diaVencimentoPadrao: string // ex: "Dia 20", "Dia 07", "Último dia útil", "Varia conforme UF"
  regraAntecipacaoPostergacao: 'Antecipa' | 'Prorroga' | 'Conforme UF' | 'Sem alteração'
  quemPaga: string
  oQueE: string
  comoApurarEPagar: string
  regime: ('Simples Nacional' | 'Lucro Presumido' | 'Lucro Real' | 'MEI' | 'Geral' | 'PF/PJ')[]
  alertaMes?: string // Observações específicas daquele mês (ex: DIRPF em maio, encerramento de trimestre em abril/julho/out/jan, etc.)
  periodicidade: 'Mensal' | 'Trimestral' | 'Anual' | 'Variável'
}

export interface MesAgenda {
  numero: number // 1 a 12
  nome: string
  nomeCompleto: string
  anoReferencia: number
  destaqueMes?: string
  tributos: {
    dia: number | string // Dia nominal ou texto descritivo
    diaExtenso: string
    tributoId: string
    notaEspecifica?: string
  }[]
}

// Catálogo base de tributos com explicações didáticas, códigos e regras
export const CATALOGO_TRIBUTOS: Record<string, TributoItem> = {
  das_simples: {
    id: 'das_simples',
    nome: 'DAS — Simples Nacional (Documento de Arrecadação do Simples Nacional)',
    sigla: 'DAS',
    esfera: 'Federal',
    codigoReceita: '0099 (código de arrecadação do DAS gerado pelo PGDAS-D)',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Prorroga', // Art. 21 da LC 123/2006: prorroga para o 1º dia útil subsequente
    quemPaga:
      'Microempresas (ME) e Empresas de Pequeno Porte (EPP) optantes pelo Simples Nacional.',
    oQueE:
      'Guia única que unifica o recolhimento de até 8 tributos: IRPJ, CSLL, PIS/Pasep, COFINS, IPI, ICMS, ISS e a Contribuição Previdenciária Patronal (CPP).',
    comoApurarEPagar:
      'Apurado mensalmente no portal do Simples Nacional (PGDAS-D) até o vencimento. Pago via código de barras ou Pix QR Code emitido no próprio DAS.',
    regime: ['Simples Nacional'],
    periodicidade: 'Mensal',
  },
  das_mei: {
    id: 'das_mei',
    nome: 'DAS-MEI — Simples Nacional Microempreendedor Individual',
    sigla: 'DAS-MEI',
    esfera: 'Federal',
    codigoReceita: 'Arrecadação direta pelo PGMEI',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Prorroga',
    quemPaga: 'Microempreendedores Individuais com faturamento até o teto anual do MEI.',
    oQueE:
      'Valor fixo mensal destinado à previdência social (INSS do empresário) e valores simbólicos de ICMS (R$ 1) e/ou ISS (R$ 5), garantindo cobertura previdenciária e regularidade fiscal.',
    comoApurarEPagar:
      'Gerado no Portal do Empreendedor ou aplicativo MEI. Pago via Pix, débito automático ou boleto bancário.',
    regime: ['MEI'],
    periodicidade: 'Mensal',
  },
  dctfweb_inss: {
    id: 'dctfweb_inss',
    nome: 'INSS Previdenciário / Contribuição Patronal (DCTFWeb)',
    sigla: 'INSS / DCTFWeb',
    esfera: 'Federal',
    codigoReceita: 'DARF Único Previdenciário emitido via DCTFWeb',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Antecipa', // Vencimento antecipado se cair em dia não útil
    quemPaga:
      'Todas as empresas com empregados CLT, contribuintes individuais (pró-labore de sócios) e tomadores de serviços de cooperativas/terceirizados.',
    oQueE:
      'Recolhe a previdência social retida dos funcionários, a cota patronal previdenciária da empresa (CPP, 20% sobre folha no Lucro Presumido/Real), RAT/FAP e contribuições para terceiros (Sistema S).',
    comoApurarEPagar:
      'Transmitido pelo eSocial e EFD-Reinf, consolidado na DCTFWeb no portal e-CAC da Receita Federal. O pagamento é feito exclusivamente via DARF numerado com código de barras/Pix emitido pela DCTFWeb.',
    regime: ['Lucro Presumido', 'Lucro Real', 'Simples Nacional'],
    periodicidade: 'Mensal',
  },
  fgts_digital: {
    id: 'fgts_digital',
    nome: 'FGTS Digital (Fundo de Garantia do Tempo de Serviço)',
    sigla: 'FGTS',
    esfera: 'Federal',
    codigoReceita: 'Guia do FGTS Digital (GFD / Pix Caixa)',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Antecipa', // Pela Lei do FGTS Digital, antecipa-se para o dia útil imediatamente anterior
    quemPaga:
      'Todos os empregadores que contratam profissionais regidos pela CLT, inclusive empregadores domésticos e rurais.',
    oQueE:
      'Depósito obrigatório de 8% da remuneração mensal bruta de cada trabalhador (ou 2% para menor aprendiz) em conta vinculada na Caixa Econômica Federal. Não é desconto do trabalhador, é custo da empresa.',
    comoApurarEPagar:
      'Apurado automaticamente no portal do FGTS Digital integrado aos dados do eSocial. O recolhimento é feito exclusivamente via Pix.',
    regime: ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  irrf_folha: {
    id: 'irrf_folha',
    nome: 'IRRF — Folha de Pagamento e Pró-Labore (Código 0561)',
    sigla: 'IRRF 0561',
    esfera: 'Federal',
    codigoReceita: '0561 (Rendimentos do Trabalho Assalariado)',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Fontes pagadoras (empresas) que remuneram funcionários CLT, diretores e administradores com salários/pró-labore acima do limite de isenção da tabela progressiva da Receita Federal.',
    oQueE:
      'Imposto de Renda Retido na Fonte descontado diretamente do salário ou pró-labore do colaborador. A empresa atua como responsável tributária e repassa o valor aos cofres federais.',
    comoApurarEPagar:
      'Consolidado na folha via eSocial e recolhido junto com a DCTFWeb mensal ou DARF com código 0561.',
    regime: ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  irrf_servicos: {
    id: 'irrf_servicos',
    nome: 'IRRF — Serviços Prestados por Pessoas Jurídicas (Código 1708)',
    sigla: 'IRRF 1708',
    esfera: 'Federal',
    codigoReceita: '1708 (Remuneração de Serviços Prestados por PJ)',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Pessoas jurídicas que contratam serviços profissionais qualificados de outras empresas (consultoria, advocacia, contabilidade, assessoria econômica, engenharia, informática, medicina etc.).',
    oQueE:
      'Alíquota de 1,5% retida na fonte pagadora sobre o valor bruto das notas fiscais de serviços profissionais emitidas entre empresas. O prestador deduz esse valor em sua apuração definitiva de IRPJ.',
    comoApurarEPagar:
      'Informado na EFD-Reinf e gerado no DARF consolidado da DCTFWeb da empresa tomadora do serviço.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  irrf_alugueis_pf: {
    id: 'irrf_alugueis_pf',
    nome: 'IRRF — Rendimentos do Trabalho sem Vínculo e Aluguéis pagos a PF (Código 0588 / 3208)',
    sigla: 'IRRF 0588 / 3208',
    esfera: 'Federal',
    codigoReceita: '0588 (Trabalho sem vínculo) / 3208 (Aluguéis pagos a PF)',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Empresas que pagam autônomos (RPA) ou que pagam aluguel de imóveis para proprietários pessoa física.',
    oQueE:
      'Retenção na fonte calculada pela tabela progressiva do IR sobre a remuneração de autônomos ou sobre o valor do aluguel pago a pessoa física.',
    comoApurarEPagar: 'Apurado no eSocial/EFD-Reinf e quitado no DARF numerado da DCTFWeb mensal.',
    regime: ['Simples Nacional', 'Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  csrf_retencoes: {
    id: 'csrf_retencoes',
    nome: 'CSRF — Retenções de Contribuições Sociais (PIS, COFINS e CSLL retidos - Código 5952)',
    sigla: 'CSRF 5952',
    esfera: 'Federal',
    codigoReceita: '5952 (Retenção 4,65% - CSLL / COFINS / PIS)',
    diaVencimentoPadrao: 'Dia 20',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Empresas tomadoras de serviços de limpeza, conservação, segurança, vigilância, locação de mão de obra e serviços profissionais em geral.',
    oQueE:
      'Retenção de 4,65% (1% CSLL, 3% COFINS e 0,65% PIS) aplicada sobre notas fiscais de serviços prestados por pessoas jurídicas, conforme Lei 10.833/2003.',
    comoApurarEPagar: 'Declarado na EFD-Reinf e integrado na DCTFWeb mensal da empresa compradora.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  pis_faturamento: {
    id: 'pis_faturamento',
    nome: 'PIS/Pasep sobre Faturamento (Código 8109 Cumulativo / 6912 Não Cumulativo)',
    sigla: 'PIS',
    esfera: 'Federal',
    codigoReceita: '8109 (Lucro Presumido - Cumulativo) / 6912 (Lucro Real - Não Cumulativo)',
    diaVencimentoPadrao: 'Dia 25',
    regraAntecipacaoPostergacao: 'Antecipa', // Art. 18 da MP 2.158-35/2001: antecipa se dia 25 não for útil
    quemPaga:
      'Pessoas jurídicas tributadas pelo Lucro Presumido (alíquota de 0,65%) ou Lucro Real (alíquota geral de 1,65% com apropriação de créditos de insumos).',
    oQueE:
      'Contribuição para o Programa de Integração Social que financia o abono salarial, seguro-desemprego e programas de desenvolvimento econômico.',
    comoApurarEPagar:
      'Apurado na EFD-Contribuições e pago via DARF numerado emitido na DCTFWeb ou DARF comum até o dia 25 do mês subsequente aos fatos geradores.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  cofins_faturamento: {
    id: 'cofins_faturamento',
    nome: 'COFINS sobre Faturamento (Código 2172 Cumulativo / 5856 Não Cumulativo)',
    sigla: 'COFINS',
    esfera: 'Federal',
    codigoReceita: '2172 (Lucro Presumido - 3%) / 5856 (Lucro Real - 7,6%)',
    diaVencimentoPadrao: 'Dia 25',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Empresas enquadradas no Lucro Presumido (3,0% cumulativo sobre o faturamento) e Lucro Real (7,6% não cumulativo, descontando créditos operacionais).',
    oQueE:
      'Contribuição para o Financiamento da Seguridade Social, destinada à saúde pública, previdência e assistência social.',
    comoApurarEPagar:
      'Apurado na EFD-Contribuições e recolhido mensalmente via DCTFWeb/DARF até o dia 25.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  ipi_mensal: {
    id: 'ipi_mensal',
    nome: 'IPI — Imposto sobre Produtos Industrializados (Códigos 5123 / 1092)',
    sigla: 'IPI',
    esfera: 'Federal',
    codigoReceita: '5123 (Industrialização geral) / 1092 / 0668 (conforme capítulo TIPI)',
    diaVencimentoPadrao: 'Dia 25',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Indústrias e estabelecimentos equiparados a industrial (como importadores de mercadorias estrangeiras).',
    oQueE:
      'Tributo federal não-cumulativo incidente sobre a saída de produtos transformados ou montados em fábrica e sobre o desembaraço aduaneiro de importados.',
    comoApurarEPagar:
      'Apurado na EFD-ICMS/IPI e recolhido via DCTFWeb/DARF no dia 25 do mês subsequente às saídas dos produtos.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  irpj_trimestral: {
    id: 'irpj_trimestral',
    nome: 'IRPJ — Imposto de Renda Pessoa Jurídica (Trimestral - Código 2089)',
    sigla: 'IRPJ 2089',
    esfera: 'Federal',
    codigoReceita: '2089 (Lucro Presumido) / 0220 (Lucro Real Trimestral) / 5993 (Real Estimativa)',
    diaVencimentoPadrao: 'Último dia útil do mês subsequente ao encerramento do trimestre',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Empresas do Lucro Presumido e Lucro Real que recolhem por apuração trimestral (1º Tri: Jan-Mar vence em Abril; 2º Tri: Abr-Jun vence em Julho; 3º Tri: Jul-Set vence em Outubro; 4º Tri: Out-Dez vence em Janeiro).',
    oQueE:
      'Tributo incidente sobre o lucro da empresa. Alíquota de 15% sobre o lucro apurado (presumido ou real) acrescido do adicional de 10% sobre a parcela do lucro que exceder R$ 20.000,00 por mês (R$ 60.000 no trimestre). Pode ser pago em cota única ou parcelado em até 3 quotas com juros SELIC.',
    comoApurarEPagar:
      'Apurado na contabilidade/LACS e recolhido via DCTFWeb ou DARF até o último dia útil de abril, julho, outubro e janeiro.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Trimestral',
  },
  csll_trimestral: {
    id: 'csll_trimestral',
    nome: 'CSLL — Contribuição Social sobre o Lucro Líquido (Trimestral - Código 2372)',
    sigla: 'CSLL 2372',
    esfera: 'Federal',
    codigoReceita: '2372 (Lucro Presumido) / 6012 (Lucro Real Trimestral) / 2484 (Real Estimativa)',
    diaVencimentoPadrao: 'Último dia útil do mês subsequente ao encerramento do trimestre',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga: 'Empresas dos regimes de Lucro Presumido e Lucro Real.',
    oQueE:
      'Contribuição para financiar a Seguridade Social calculada sobre o resultado econômico da empresa. Alíquota geral de 9% sobre a base de cálculo (ou 15% a 20% para instituições financeiras). Também permite divisão em até 3 quotas com juros SELIC.',
    comoApurarEPagar:
      'Apurado junto com o IRPJ e recolhido via DCTFWeb/DARF no último dia útil do mês seguinte ao trimestre.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Trimestral',
  },
  icms_estadual: {
    id: 'icms_estadual',
    nome: 'ICMS — Imposto sobre Circulação de Mercadorias e Serviços (Regra Estadual)',
    sigla: 'ICMS',
    esfera: 'Estadual',
    codigoReceita: 'GARE / DARE estadual (código definido pela SEFAZ de cada estado)',
    diaVencimentoPadrao: 'Geralmente entre os dias 10 e 20 (conforme legislação e CPR de cada UF)',
    regraAntecipacaoPostergacao: 'Conforme UF',
    quemPaga:
      'Empresas comerciais, indústrias, produtoras rurais e prestadoras de transporte interestadual/intermunicipal e de comunicação com inscrição estadual ativa.',
    oQueE:
      'Principal tributo sobre o consumo do Brasil, incidente na movimentação física e jurídica de mercadorias, energia elétrica, telecomunicações e transporte de cargas/passageiros entre cidades ou estados.',
    comoApurarEPagar:
      'Apurado na EFD-ICMS/IPI conforme o Cadastro Positivo / Regime Periódico de Apuração (RPA) da SEFAZ estadual (em SP, o CPR define vencimentos entre dia 10 e 20). Pago via DARE/GARE do estado.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  iss_municipal: {
    id: 'iss_municipal',
    nome: 'ISS / ISSQN — Imposto sobre Serviços de Qualquer Natureza (Regra Municipal)',
    sigla: 'ISSQN',
    esfera: 'Municipal',
    codigoReceita: 'DAM / Guia Municipal (código definido pela Prefeitura de cada município)',
    diaVencimentoPadrao: 'Geralmente entre os dias 10 e 15 (varia por Prefeitura)',
    regraAntecipacaoPostergacao: 'Conforme UF',
    quemPaga:
      'Empresas prestadoras de serviços dos mais variados portes e setores (consultorias, clínicas, tecnologia, escolas, oficinas, etc.) fora do regime simplificado do Simples Nacional.',
    oQueE:
      'Tributo de competência dos municípios e do Distrito Federal incidente sobre serviços constantes da lista anexa da Lei Complementar nº 116/2003, com alíquotas que variam entre o piso de 2% e o teto constitucional de 5%.',
    comoApurarEPagar:
      'Apurado no sistema de Nota Fiscal de Serviços Eletrônica (NFS-e) da Prefeitura local e pago via DAM (Documento de Arrecadação Municipal).',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Mensal',
  },
  dirpf_anual: {
    id: 'dirpf_anual',
    nome: 'DIRPF — Declaração de Ajuste Anual do Imposto de Renda da Pessoa Física',
    sigla: 'DIRPF',
    esfera: 'Federal',
    codigoReceita: 'DARF IRPF Saldo a Pagar (Código 0211)',
    diaVencimentoPadrao: 'Último dia útil de Maio',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Sócios, diretores, investidores e cidadãos obrigados pela regra da Receita Federal (rendimentos tributáveis acima do piso, lucros isentos acima do teto, posse de bens etc.).',
    oQueE:
      'Prestação de contas anual dos ganhos, patrimônio, despesas dedutíveis e imposto já recolhido durante o ano anterior. Eventual saldo a pagar pode ser parcelado em até 8 quotas mensais.',
    comoApurarEPagar:
      'Transmitido pelo programa IRPF ou portal e-CAC. A primeira quota ou cota única vence no último dia do prazo de entrega.',
    regime: ['PF/PJ'],
    periodicidade: 'Anual',
  },
  defis_simples: {
    id: 'defis_simples',
    nome: 'DEFIS — Declaração de Informações Socioeconômicas e Fiscais',
    sigla: 'DEFIS',
    esfera: 'Federal',
    codigoReceita: 'Obrigação acessória (sem código de DARF direto)',
    diaVencimentoPadrao: 'Último dia útil de Março',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga: 'Todas as Microempresas (ME) e EPPs optantes pelo Simples Nacional.',
    oQueE:
      'Declaração anual obrigatória que informa à Receita Federal a distribuição de lucros aos sócios, despesas operacionais, número de funcionários e saldo bancário do ano-calendário anterior.',
    comoApurarEPagar:
      'Transmitida eletronicamente no portal do Simples Nacional até 31 de março. O atraso gera impedimento de emissão de novos DAS.',
    regime: ['Simples Nacional'],
    periodicidade: 'Anual',
  },
  ecf_ecd: {
    id: 'ecf_ecd',
    nome: 'ECD e ECF — Escrituração Contábil Digital e Fiscal (Sped)',
    sigla: 'ECD / ECF',
    esfera: 'Federal',
    codigoReceita: 'Obrigação acessória Sped Contábil/Fiscal',
    diaVencimentoPadrao: 'Último dia útil de Junho (ECD) e Julho (ECF)',
    regraAntecipacaoPostergacao: 'Antecipa',
    quemPaga:
      'Pessoas jurídicas tributadas pelo Lucro Real e Lucro Presumido (conforme regras de distribuição de lucros).',
    oQueE:
      'Envio eletrônico dos livros diário/razão contábeis (ECD) e da apuração das bases de IRPJ e CSLL com cruzamento de dados tributários e societários (ECF).',
    comoApurarEPagar:
      'Gerado pelo software contábil, validado pelo PVA do SPED da Receita Federal e assinado com certificado digital do contador e da empresa.',
    regime: ['Lucro Presumido', 'Lucro Real'],
    periodicidade: 'Anual',
  },
}

// Lista dos 12 meses da agenda com os tributos pertinentes
export const MESES_AGENDA: MesAgenda[] = [
  {
    numero: 1,
    nome: 'Janeiro',
    nomeCompleto: 'Janeiro — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Mês de fechamento do 4º Trimestre do ano anterior (IRPJ e CSLL apurados até dezembro) e adesão/permanência no Simples Nacional até o último dia útil.',
    tributos: [
      {
        dia: '10 a 15',
        diaExtenso: 'Entre dias 10 e 15',
        tributoId: 'iss_municipal',
        notaEspecifica: 'Data base padrão na maioria dos municípios.',
      },
      {
        dia: '10 a 20',
        diaExtenso: 'Entre dias 10 e 20',
        tributoId: 'icms_estadual',
        notaEspecifica: 'Consulte o CPR/Portaria da SEFAZ do seu estado.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Dezembro/ano anterior.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Dezembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Dezembro. Antecipa se 20 for fim de semana.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Dezembro via FGTS Digital (Pix Caixa).',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'irrf_folha',
        notaEspecifica: 'IRRF retido sobre salários pagos em Dezembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Retenção de 1,5% sobre serviços PJ de Dezembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Janeiro',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Retenção 4,65% (PIS/COFINS/CSLL) de Dezembro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Janeiro',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Dezembro. Antecipa se 25 não for útil.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Janeiro',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Dezembro. Antecipa se 25 não for útil.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Janeiro',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Dezembro.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Janeiro (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: 'Fechamento 4º Trimestre (Out/Nov/Dez). Quota única ou 1ª quota.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Janeiro (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: 'Fechamento 4º Trimestre (Out/Nov/Dez). Quota única ou 1ª quota.',
      },
    ],
  },
  {
    numero: 2,
    nome: 'Fevereiro',
    nomeCompleto: 'Fevereiro — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Atenção ao feriado de Carnaval e expediente bancário reduzido: tributos que antecipam não podem ser deixados para a última hora.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'irrf_folha',
        notaEspecifica: 'IRRF retido sobre salários de Janeiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Retenção sobre serviços PJ de Janeiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Fevereiro',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Retenção 4,65% sobre serviços de Janeiro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Fevereiro',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Fevereiro',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Fevereiro',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Janeiro.',
      },
      {
        dia: 28,
        diaExtenso: '28 de Fevereiro (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '2ª Quota do 4º Trimestre (com juros SELIC 1%).',
      },
      {
        dia: 28,
        diaExtenso: '28 de Fevereiro (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '2ª Quota do 4º Trimestre (com juros SELIC 1%).',
      },
    ],
  },
  {
    numero: 3,
    nome: 'Março',
    nomeCompleto: 'Março — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Prazo final para entrega da DEFIS (Simples Nacional) até 31 de março e encerramento do 1º Trimestre contábil do ano.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Março',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Março',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Março',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Março',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Fevereiro.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Março (último dia útil)',
        tributoId: 'defis_simples',
        notaEspecifica: 'Entrega obrigatória da DEFIS Simples Nacional ano-base anterior.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Março (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '3ª e última Quota do 4º Trimestre anterior.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Março (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '3ª e última Quota do 4º Trimestre anterior.',
      },
    ],
  },
  {
    numero: 4,
    nome: 'Abril',
    nomeCompleto: 'Abril — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Vencimento do 1º Trimestre do ano (Jan/Fev/Mar) para IRPJ e CSLL das empresas do Lucro Presumido e Lucro Real.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Abril',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Abril',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Abril',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Abril',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Março.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Abril (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '1º Trimestre (Jan/Fev/Mar) - Quota única ou 1ª quota.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Abril (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '1º Trimestre (Jan/Fev/Mar) - Quota única ou 1ª quota.',
      },
    ],
  },
  {
    numero: 5,
    nome: 'Maio',
    nomeCompleto: 'Maio — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Prazo final da Declaração de Imposto de Renda Pessoa Física (DIRPF) e DASN-SIMEI para microempreendedores.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Maio',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Maio',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Maio',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Maio',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Abril.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Maio (último dia útil)',
        tributoId: 'dirpf_anual',
        notaEspecifica: 'Prazo limite da Declaração Anual PF e vencimento da 1ª quota/cota única.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Maio (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '2ª Quota do 1º Trimestre.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Maio (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '2ª Quota do 1º Trimestre.',
      },
    ],
  },
  {
    numero: 6,
    nome: 'Junho',
    nomeCompleto: 'Junho — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Prazo legal para entrega da ECD (Escrituração Contábil Digital - SPED Contábil) e encerramento do 2º Trimestre fiscal.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Junho',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Junho',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Junho',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Junho',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Maio.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Junho (último dia útil)',
        tributoId: 'ecf_ecd',
        notaEspecifica: 'Prazo limite da ECD (Escrituração Contábil Digital).',
      },
      {
        dia: 30,
        diaExtenso: '30 de Junho (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '3ª e última quota do 1º Trimestre.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Junho (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '3ª e última quota do 1º Trimestre.',
      },
    ],
  },
  {
    numero: 7,
    nome: 'Julho',
    nomeCompleto: 'Julho — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Vencimento do 2º Trimestre (Abr/Mai/Jun) de IRPJ e CSLL e entrega da ECF (Escrituração Contábil Fiscal).',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Julho',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Julho',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Julho',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Julho',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Junho.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Julho (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '2º Trimestre (Abr/Mai/Jun) - Quota única ou 1ª quota.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Julho (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '2º Trimestre (Abr/Mai/Jun) - Quota única ou 1ª quota.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Julho (último dia útil)',
        tributoId: 'ecf_ecd',
        notaEspecifica: 'Prazo limite da ECF (Escrituração Contábil Fiscal).',
      },
    ],
  },
  {
    numero: 8,
    nome: 'Agosto',
    nomeCompleto: 'Agosto — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes: 'Mês de rotina regular e pagamento da 2ª quota do 2º Trimestre de IRPJ/CSLL.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Agosto',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Agosto',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Agosto',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Agosto',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Julho.',
      },
      {
        dia: 29,
        diaExtenso: '29 de Agosto (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '2ª Quota do 2º Trimestre.',
      },
      {
        dia: 29,
        diaExtenso: '29 de Agosto (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '2ª Quota do 2º Trimestre.',
      },
    ],
  },
  {
    numero: 9,
    nome: 'Setembro',
    nomeCompleto: 'Setembro — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Encerramento do 3º Trimestre fiscal do ano e liquidação da 3ª quota de IRPJ/CSLL do trimestre anterior.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Setembro',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Setembro',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Setembro',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Setembro',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Agosto.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Setembro (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '3ª e última quota do 2º Trimestre.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Setembro (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '3ª e última quota do 2º Trimestre.',
      },
    ],
  },
  {
    numero: 10,
    nome: 'Outubro',
    nomeCompleto: 'Outubro — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Vencimento do 3º Trimestre (Jul/Ago/Set) para IRPJ e CSLL no Lucro Presumido e Lucro Real.',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'dctfweb_inss',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Outubro',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Outubro',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Outubro',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Outubro',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Setembro.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Outubro (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '3º Trimestre (Jul/Ago/Set) - Quota única ou 1ª quota.',
      },
      {
        dia: 31,
        diaExtenso: '31 de Outubro (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '3º Trimestre (Jul/Ago/Set) - Quota única ou 1ª quota.',
      },
    ],
  },
  {
    numero: 11,
    nome: 'Novembro',
    nomeCompleto: 'Novembro — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      'Planejamento de folha: pagamento da 1ª parcela do 13º salário até 30 de novembro (sem incidência de INSS/IRRF, recolhidos na 2ª parcela).',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'dctfweb_inss',
        notaEspecifica:
          'Competência Outubro. Feriado da Consciência Negra em vários municípios: antecipa.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Novembro',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Novembro',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Novembro',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 25,
        diaExtenso: '25 de Novembro',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Outubro.',
      },
      {
        dia: 28,
        diaExtenso: '28 de Novembro (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '2ª Quota do 3º Trimestre.',
      },
      {
        dia: 28,
        diaExtenso: '28 de Novembro (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '2ª Quota do 3º Trimestre.',
      },
    ],
  },
  {
    numero: 12,
    nome: 'Dezembro',
    nomeCompleto: 'Dezembro — Calendário Tributário',
    anoReferencia: 2025,
    destaqueMes:
      '2ª parcela do 13º salário até 20 de dezembro e DCTFWeb especial de 13º Salário (recolhimento do INSS sobre 13º até 20 de dezembro com antecipação se dia não útil).',
    tributos: [
      { dia: '10 a 15', diaExtenso: 'Entre dias 10 e 15', tributoId: 'iss_municipal' },
      { dia: '10 a 20', diaExtenso: 'Entre dias 10 e 20', tributoId: 'icms_estadual' },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'das_simples',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'das_mei',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'dctfweb_inss',
        notaEspecifica:
          'Competência Novembro e DCTFWeb 13º Salário (ambos com vencimento em 20/12; antecipa se dia não útil).',
      },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'fgts_digital',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'irrf_folha',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'irrf_servicos',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 20,
        diaExtenso: '20 de Dezembro',
        tributoId: 'csrf_retencoes',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 23,
        diaExtenso: '23 a 24 de Dezembro',
        tributoId: 'pis_faturamento',
        notaEspecifica: 'Competência Novembro. Antecipa devido ao recesso bancário de fim de ano.',
      },
      {
        dia: 23,
        diaExtenso: '23 a 24 de Dezembro',
        tributoId: 'cofins_faturamento',
        notaEspecifica: 'Competência Novembro. Antecipa devido ao recesso de fim de ano.',
      },
      {
        dia: 23,
        diaExtenso: '23 a 24 de Dezembro',
        tributoId: 'ipi_mensal',
        notaEspecifica: 'Competência Novembro.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Dezembro (último dia útil)',
        tributoId: 'irpj_trimestral',
        notaEspecifica: '3ª e última quota do 3º Trimestre.',
      },
      {
        dia: 30,
        diaExtenso: '30 de Dezembro (último dia útil)',
        tributoId: 'csll_trimestral',
        notaEspecifica: '3ª e última quota do 3º Trimestre.',
      },
    ],
  },
]

// Consequências do atraso no recolhimento
export const CONSEQUENCIAS_ATRASO = [
  {
    titulo: 'Multa de Mora Automática (até 20%)',
    descricao:
      'Nos tributos administrados pela Receita Federal, o atraso gera multa de mora de 0,33% por dia de atraso, limitada ao teto de 20% sobre o valor principal do tributo devido.',
    impacto: 'Encarece imediatamente o passivo tributário a curto prazo.',
  },
  {
    titulo: 'Juros SELIC Acumulados',
    descricao:
      'Além da multa de mora, incidem juros equivalentes à taxa SELIC acumulada a partir do mês seguinte ao vencimento até o mês anterior ao pagamento, mais 1% relativo ao mês do efetivo recolhimento.',
    impacto: 'Com a SELIC em patamares elevados, o custo financeiro da dívida cresce com rapidez.',
  },
  {
    titulo: 'Perda da CND (Certidão Negativa de Débitos)',
    descricao:
      'Débitos vencidos impedem a emissão da CND ou Certidão Positiva com Efeito de Negativa na Receita Federal, Previdência e PGFN.',
    impacto:
      'Bloqueio imediato em licitações públicas, renovação de financiamentos bancários e contratos com grandes corporações.',
  },
  {
    titulo: 'Exclusão do Simples Nacional',
    descricao:
      'Empresas inadimplentes com a Receita Federal ou com o INSS são notificadas por Termo de Exclusão e podem ser desenquadradas compulsoriamente do regime simplificado.',
    impacto:
      'Salto brusco na carga tributária com incidência das alíquotas do Lucro Presumido e cota patronal de 20% sobre a folha.',
  },
  {
    titulo: 'Inscrição em Dívida Ativa da União e Protesto',
    descricao:
      'Débitos não regularizados são encaminhados para a Procuradoria-Geral da Fazenda Nacional (PGFN), com acréscimo de encargos legais de até 20% para cobrança judicial (Execução Fiscal) e protesto em cartório.',
    impacto:
      'Penhora de contas bancárias (SisbaJud), indisponibilidade de veículos e imóveis dos sócios administradores.',
  },
  {
    titulo: 'Risco de Crime contra a Ordem Tributária (Apropriação Indébita)',
    descricao:
      'Retenções na fonte (como IRRF descontado do salário de empregados ou INSS retido de colaboradores) que a empresa deixa de repassar ao fisco configuram apropriação indébita previdenciária e tributária.',
    impacto:
      'Responsabilização penal direta dos sócios e gestores (Lei 8.137/1990 e Código Penal).',
  },
]
