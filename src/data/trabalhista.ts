/**
 * Dados educativos da página Trabalhista (/trabalhista) — Escala 5x2.
 * Conteúdo de caráter informativo, sem valor de consultoria jurídica.
 */

export const WHATSAPP_URL_TRABALHISTA =
  'https://wa.me/5517997650672?text=Ol%C3%A1%2C%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20gest%C3%A3o%20de%20escala%205x2%20e%20custo%20de%20folha%20com%20a%20Borlim.'

export const GESTAO_EMPRESARIAL_URL = 'https://analise-de-balanco-6514f.goskip.app'

export interface EscalaComparada {
  nome: string
  ritmo: string
  diasTrabalhados: string
  descanso: string
  horasSemanais: string
  destaque: string
}

export const ESCALAS_COMPARATIVAS: EscalaComparada[] = [
  {
    nome: '5x2',
    ritmo: '5 dias de trabalho + 2 de descanso',
    diasTrabalhados: '~21 a 23 dias/mês',
    descanso: 'RSR de 1 dia + DSR (sábado e/ou domingo)',
    horasSemanais: '44h (8h/dia seg a sex)',
    destaque: 'Escala mais comum do Brasil — padrão CLT',
  },
  {
    nome: '6x1',
    ritmo: '6 dias de trabalho + 1 de descanso',
    diasTrabalhados: '~25 a 26 dias/mês',
    descanso: '1 domingo em cada semana (regra geral)',
    horasSemanais: '44h (8h/dia, 7h+5h no sábado ou 8h/dia)',
    destaque: 'Comum em comércio e indústria — exige cuidado com DSR',
  },
  {
    nome: '12x36',
    ritmo: '12 horas de trabalho + 36 horas de descanso',
    diasTrabalhados: '~15 turnos/mês (varia)',
    descanso: '36 horas ininterruptas após cada plantão',
    horasSemanais: 'Jornada 12h em turnos ininterruptos de revezamento',
    destaque: 'Prevista na CLT — comum em saúde, segurança e vigilância',
  },
  {
    nome: '4x2',
    ritmo: '4 dias de trabalho + 2 de descanso',
    diasTrabalhados: '~20 a 22 dias/mês',
    descanso: '2 dias consecutivos após 4 de trabalho',
    horasSemanais: 'Varia conforme carga diária (8h ou 12h)',
    destaque: 'Escala alternada — exige controle rigoroso de horas',
  },
]

export interface PontoAtencao {
  titulo: string
  icone: string
  descricao: string
  risco: string
}

export const PONTOS_ATENCAO: PontoAtencao[] = [
  {
    titulo: 'Controle de jornada (registro de ponto)',
    icone: 'Clock',
    descricao:
      'A CLT exige controle de jornada para empresas com mais de 20 empregados, com marcação de entrada, intervalo e saída. A Portaria 671/2021 do Ministério do Trabalho regulamenta os sistemas de registro eletrônico de ponto (REP-P, REP-A, PCT e nonolog), inclusive o registro por aplicativo.',
    risco:
      'Jornada sem registro ou com "horas esquecidas" é a principal causa de condenações por horas extras na Justiça do Trabalho.',
  },
  {
    titulo: 'Adicional noturno',
    icone: 'Moon',
    descricao:
      'O trabalho entre 22h e 5h recebe adicional de, no mínimo, 20% sobre a hora diurna (art. 73 da CLT), e a hora noturna urbana tem duração reduzida: 52 minutos e 30 segundos por hora de relógio. Em escalas alternadas (12x36, 4x2 com noite), o cálculo muda.',
    risco:
      'Não pagar o adicional ou ignorar a hora reduzida gera passivo trabalhista acumulado em cada turno noturno.',
  },
  {
    titulo: 'Aviso prévio e proporcionalidade',
    icone: 'FileWarning',
    descricao:
      'Na rescisão, o aviso prévio é de 30 dias mais 3 dias por ano de serviço (Lei 12.506/2011), até 90 dias. Durante o aviso, o empregado tem redução de 2 horas diárias ou 7 dias corridos na rescisão sem justa causa.',
    risco:
      'Descumprir prazos ou integrar incorretamente médias (comissões, horas extras) no aviso prévio gera verbas rescisórias em atraso e multas.',
  },
  {
    titulo: 'Risco de ação trabalhista',
    icone: 'Gavel',
    descricao:
      'Os processos trabalhistas concentram-se em horas extras, intervalo intrajornada (1h em jornada acima de 6h — art. 71 da CLT) e DSR incorreto. A escala 5x2 com folgas fixas facilita a prova, mas não substitui o controle correto.',
    risco:
      'Um único processo perdido pode alcançar todo o período de 2 anos + 2 (prescrição quinquenal) da folha inteira.',
  },
]

export interface FaqTrabalhista {
  q: string
  a: string
}

export const FAQ_TRABALHISTA: FaqTrabalhista[] = [
  {
    q: 'A escala 5x2 é obrigatória para todas as empresas?',
    a: 'Não. A CLT estabelece limites máximos de jornada (44h semanais e 8h diárias) e garante o repouso semanal remunerado, mas não impõe uma escala única. A escala 5x2 — de segunda a sexta com folga no sábado e no domingo — é a mais comum, mas a empresa pode adotar escalas alternadas (6x1, 12x36, 4x2), desde que respeitados os limites legais, o DSR e, quando houver, o acordo ou convenção coletiva da categoria.',
  },
  {
    q: 'Quantas horas tem o mês de trabalho na escala 5x2?',
    a: 'O padrão de referência é 220 horas mensais, que equivale a 8 horas por dia durante 5 dias por semana (40h semanais) somadas ao descanso semanal remunerado e calculadas ao longo do ano (2.200 horas anuais divididas por 12). No dia a dia, o número de dias úteis varia entre 21 e 23 por mês, dependendo de feriados e de como os dias caem.',
  },
  {
    q: 'O que é DSR e como ele é calculado?',
    a: 'DSR é o Descanso Semanal Remunerado: o dia (ou dias) de folga que o empregado recebe como se tivesse trabalhado, previsto nos arts. 67 e 70 da CLT e na Constituição Federal (art. 7º, XV). Nas folgas fixas de sábado e domingo da escala 5x2, o sábado é pago como "dia de DSR" e o domingo como repouso. Na prática, se o mês tem 22 dias úteis, cada dia útil remunera também a sua fração de folga: valor do dia útil multiplicado por 1,09 (aproximadamente) dá o valor com DSR embutido.',
  },
  {
    q: 'Quem ganha salário mensal fixo precisa calcular hora e DSR?',
    a: 'Para o salário contratual, não: o mensalista recebe o mesmo valor todo mês, já com a jornada e o DSR incluídos. O cálculo do valor da hora (salário ÷ 220) e do valor do DSR (horas extras ÷ dias úteis × domingos/feriados) entra em cena quando existe hora extra, comissão, adicional ou desconto — porque essas variáveis precisam ser refletidas proporcionalmente no descanso semanal remunerado.',
  },
  {
    q: 'Feriado cai na folga da escala 5x2: perco ou ganho?',
    a: 'Quando o feriado coincide com um dia útil trabalhado, o empregado recebe o valor do dia sem trabalhar (se mensalista, nada muda no contracheque). Quando o feriado cai no sábado ou no domingo de folga, o dia não é remunerado em dobro — ele simplesmente cai no descanso — a menos que a convenção coletiva da categoria preveja benefício adicional. Empresas com escala alternada precisam de mais cuidado: feriado que "cai" em folga alternada pode gerar direito a folga substitutiva.',
  },
  {
    q: 'Banco de horas pode substituir o pagamento de horas extras?',
    a: 'Parcialmente, sim. O banco de horas (art. 59, §2º, da CLT) permite compensar horas extras trabalhadas em um dia com a redução de jornada em outro, no mesmo mês ou conforme acordo individual (até 12 meses por acordo coletivo). Só que o saldo não pode ficar indefinidamente em aberto: se ao fim do período de compensação sobrar saldo positivo, ele deve ser pago como horas extras; se sobrar negativo sem justa causa, é desconto vedado. A gestão de saldo é a parte que mais gera passivo.',
  },
]
