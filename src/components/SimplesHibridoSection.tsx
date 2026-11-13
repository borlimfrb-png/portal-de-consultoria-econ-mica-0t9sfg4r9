// Seção "Simples Nacional — Híbrido" da página Reforma Tributária.
// Explicação, passo a passo, tabs Vantagens × Cuidados, exemplo numérico
// auditável, calculadora interativa e CTAs Borlim.

import { useState } from 'react'
import {
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Mail,
  MessageCircle,
  RefreshCcw,
  ShieldAlert,
  ThumbsUp,
  TriangleAlert,
} from 'lucide-react'
import { formatarBRL, formatarPercentual } from './calculadora/cbsIbsCalc'
import {
  anexoPorId,
  entradaHibridoInicial,
  calcularHibrido,
  PCT_PIS_NAO_CUMULATIVO,
  PCT_COFINS_NAO_CUMULATIVO,
} from './calculadora/simplesHibridoCalc'
import CalculadoraSimplesHibrido from './calculadora/CalculadoraSimplesHibrido'

const GESTAO_EMPRESARIAL_URL =
  'https://wa.me/5517997650672?text=' +
  encodeURIComponent('Olá! Vim do portal Borlim e quero saber mais sobre a Gestão Empresarial.')

const WHATSAPP_URL = 'https://wa.me/5517997650672'
const EMAIL_BORLIM = 'flavio@borlim.com.br'

const cardPapel = 'bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8'

const VANTAGENS = [
  {
    titulo: 'Créditos de insumos para indústria e comércio',
    texto:
      'No regime não cumulativo, compras de insumos, mercadorias para revenda, energia elétrica, aluguéis e outros geram crédito de PIS/Cofins que reduz o valor a pagar — vantagem maior quanto maior a carga de insumos da operação.',
  },
  {
    titulo: 'Clientes B2B se abastecem de créditos',
    texto:
      'Empresas do Lucro Real que compram de você podem aproveitar o crédito destacado na nota, o que pode se transformar em argumento comercial relevante em cadeias industriais e de distribuição.',
  },
  {
    titulo: 'Redução efetiva quando a margem de crédito supera a diferença de alíquota',
    texto:
      'Se os créditos aproveitados superam a diferença entre a alíquota não cumulativa (9,25%) e a parcela de PIS/Cofins que saía do DAS, a carga tributária total cai — em alguns casos de forma significativa.',
  },
  {
    titulo: 'Alíquota final pode cair bastante',
    texto:
      'Para indústrias e comércios com alta absorção de insumos creditáveis, a combinação de DAS menor + créditos relevantes costuma entregar um tributo mensal inferior ao do Simples puro.',
  },
]

const CUIDADOS = [
  {
    titulo: 'EFD Contribuições mensal',
    texto:
      'A empresa passa a entregar a Escrituração Fiscal Digital de PIS/Cofins todos os meses — uma obrigação acessória própria, com prazos, códigos de crédito e bloqueios próprios (CST 01, 02, 49...).',
  },
  {
    titulo: 'Necessidade de escrituração separada',
    texto:
      'É preciso segregação contábil entre as receitas e os tributos que seguem no DAS e a parcela de PIS/Cofins apurada por fora — mais trabalho de rotina e maior dependência de uma contabilidade organizada.',
  },
  {
    titulo: 'Margem pequena pode não compensar',
    texto:
      'Se a operação tem pouca compra creditável ou trabalha com margem estreita, o custo extra da apuração e a diferença de alíquota podem consumir (ou superar) a economia obtida com os créditos.',
  },
  {
    titulo: 'Risco de fiscalização do aproveitamento de créditos',
    texto:
      'Créditos de insumos têm conceito discutido e exigem amparo documental. Aproveitamento indevido ou falta de segregação pode gerar autuação — e o que já foi recolhido a menos no DAS não pode ser simplesmente estornado.',
  },
]

const PASSOS = [
  {
    titulo: 'Requerimento de exclusão do PIS/Cofins do Simples',
    texto:
      'A empresa optante formaliza à Receita Federal a exclusão do PIS/Pasep e da Cofins do seu DAS, passando a recolhê-los na forma do regime não cumulativo (art. 52 da LC 123/2006 e art. 55 da Lei 11.196/2005).',
  },
  {
    titulo: 'PGDAS-D separa as receitas',
    texto:
      'No PGDAS-D, o faturamento declarado continua alimentando os demais tributos do DAS (IRPJ, CSLL, CPP, ICMS/ISS, IPI), mas sai da base de PIS/Cofins — essas receitas deixam de compor a guia única.',
  },
  {
    titulo: 'Apuração mensal não cumulativa',
    texto:
      'Todo mês a empresa apura PIS (1,65%) e Cofins (7,6%) sobre a receita, deduzindo os créditos aproveitáveis: insumos, mercadorias revendidas, energia elétrica, aluguéis, entre outros.',
  },
  {
    titulo: 'Obrigações acessórias próprias',
    texto:
      'Passa a ser obrigatória a EFD Contribuições (Sped Fiscal de PIS/Cofins), com escrituração documental e de créditos separada da apuração do Simples.',
  },
]

function TabsVantagensCuidados() {
  const [tab, setTab] = useState<'vantagens' | 'cuidados'>('vantagens')
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      <div className="flex border-b border-stone-200">
        <button
          type="button"
          onClick={() => setTab('vantagens')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-3.5 text-left font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
            tab === 'vantagens'
              ? 'text-[#16A34A] border-b-2 border-[#16A34A] bg-[#F0F4F8]'
              : 'text-slate-500 hover:text-[#082852]'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
          Vantagens
        </button>
        <button
          type="button"
          onClick={() => setTab('cuidados')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-3.5 text-left font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
            tab === 'cuidados'
              ? 'text-amber-600 border-b-2 border-amber-600 bg-[#F0F4F8]'
              : 'text-slate-500 hover:text-[#082852]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
          Cuidados
        </button>
      </div>
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(tab === 'vantagens' ? VANTAGENS : CUIDADOS).map((item) => (
            <div
              key={item.titulo}
              className={`rounded-xl p-4 border ${
                tab === 'vantagens'
                  ? 'border-emerald-200 bg-emerald-50/60'
                  : 'border-amber-200 bg-amber-50/60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {tab === 'vantagens' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                ) : (
                  <TriangleAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-[#082852] mb-1">
                    {item.titulo}
                  </h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{item.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExemploNumerico() {
  // Exemplo: Anexo II, RBT12 R$ 1.500.000 (4ª faixa: 11,20% nominal, dedução R$ 22.500,
  // PIS+Cofins = 14% da alíquota efetiva), receita R$ 150.000, insumos R$ 60.000.
  const r = calcularHibrido(entradaHibridoInicial)
  const anexo = anexoPorId(entradaHibridoInicial.anexoId)
  const faixa = anexo.faixas[r.indiceFaixa]

  const LinhaExemplo = ({
    rotulo,
    valor,
    destaque = false,
    sub = false,
  }: {
    rotulo: string
    valor: string
    destaque?: boolean
    sub?: boolean
  }) => (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2.5 border-b border-stone-100 last:border-b-0 ${
        sub ? 'pl-4' : ''
      }`}
    >
      <span
        className={`text-[13px] leading-snug ${
          destaque ? 'font-bold text-[#082852]' : 'text-slate-600'
        }`}
      >
        {rotulo}
      </span>
      <span
        className={`font-mono tabular-nums text-sm whitespace-nowrap ${
          destaque ? 'font-extrabold text-[#082852]' : 'text-slate-700'
        }`}
      >
        {valor}
      </span>
    </div>
  )

  return (
    <div className="space-y-5">
      <div className={cardPapel}>
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#16A34A] mb-4 flex items-center gap-2">
          <ClipboardList className="w-4 h-4" />
          Cenário
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          <LinhaExemplo rotulo="Atividade" valor={`${anexo.nome} (indústria da transformação)`} />
          <LinhaExemplo rotulo="Receita do mês" valor={formatarBRL(r.receitaMes)} />
          <LinhaExemplo rotulo="RBT12" valor={formatarBRL(r.rbt12)} />
          <LinhaExemplo
            rotulo="Faixa localizada"
            valor={`${r.indiceFaixa + 1}ª faixa — ${formatarPercentual(faixa.aliquotaNominal)} nominal, dedução ${formatarBRL(faixa.parcelaDeduzir)}`}
          />
          <LinhaExemplo rotulo="Receita de insumos" valor={formatarBRL(r.receitaInsumos)} />
          <LinhaExemplo
            rotulo="Aproveitamento de crédito"
            valor={formatarPercentual(r.pctAproveitamento)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className={cardPapel}>
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#082852] mb-4">
            Cenário A — Simples puro
          </h4>
          <LinhaExemplo
            rotulo="Alíquota efetiva = (RBT12 × 11,20% − R$ 22.500) ÷ RBT12"
            valor={formatarPercentual(r.aliquotaEfetiva)}
          />
          <LinhaExemplo
            rotulo="DAS = receita × alíquota efetiva"
            valor={formatarBRL(r.dasPuro)}
            destaque
          />
          <LinhaExemplo
            rotulo={`Desse DAS, parcela de PIS/Cofins (${formatarPercentual(r.pctPisCofinsAliquota)})`}
            valor={formatarBRL(r.parcelaPisCofinsNoDas)}
            sub
          />
        </div>

        <div className={cardPapel}>
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#16A34A] mb-4">
            Cenário B — Simples híbrido
          </h4>
          <LinhaExemplo
            rotulo={`Alíquota sem PIS/Cofins = efetiva × (1 − ${formatarPercentual(r.pctPisCofinsAliquota)})`}
            valor={formatarPercentual(r.aliquotaSemPisCofins)}
          />
          <LinhaExemplo rotulo="DAS sem PIS/Cofins" valor={formatarBRL(r.dasHibrido)} />
          <LinhaExemplo
            rotulo={`PIS/Cofins por fora = receita × ${formatarPercentual(PCT_PIS_NAO_CUMULATIVO)} + ${formatarPercentual(PCT_COFINS_NAO_CUMULATIVO)}`}
            valor={formatarBRL(r.pisCofinsBruto)}
          />
          <LinhaExemplo
            rotulo="(−) Créditos = insumos × aproveitamento"
            valor={formatarBRL(r.creditos)}
            sub
          />
          <LinhaExemplo rotulo="PIS/Cofins líquido" valor={formatarBRL(r.pisCofinsLiquido)} sub />
          <LinhaExemplo rotulo="Total do cenário B" valor={formatarBRL(r.totalHibrido)} destaque />
        </div>
      </div>

      <div
        className={`rounded-2xl border p-6 ${
          r.hibridoCompensa
            ? 'border-emerald-300 bg-emerald-50/70'
            : 'border-amber-300 bg-amber-50/70'
        }`}
      >
        <p className="font-mono text-[11px] font-bold uppercase tracking-wider mb-1.5 text-[#082852]">
          Resultado comparativo
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          No cenário B o tributo total do mês é{' '}
          <strong className="tabular-nums">{formatarBRL(r.totalHibrido)}</strong>, contra{' '}
          <strong className="tabular-nums">{formatarBRL(r.dasPuro)}</strong> no Simples puro — uma
          diferença de{' '}
          <strong className="tabular-nums">{formatarBRL(Math.abs(r.diferenca))}</strong> (
          {formatarPercentual(Math.abs(r.diferencaPct))}{' '}
          {r.hibridoCompensa ? 'de economia' : 'de custo adicional'}).{' '}
          {r.hibridoCompensa
            ? 'Neste cenário, o híbrido compensa: a economia vem dos créditos de insumos, que superam a diferença de alíquota.'
            : 'Neste cenário, o híbrido não compensa: a diferença de alíquota consome (ou supera) a economia dos créditos.'}
        </p>
      </div>
    </div>
  )
}

function BoxBorlim() {
  return (
    <div className="rounded-2xl border-2 border-[#082852]/15 bg-gradient-to-br from-white via-white to-[#F0F4F8] p-6 sm:p-8">
      <h3 className="font-mono text-base sm:text-lg font-extrabold uppercase tracking-wide text-[#082852] mb-3 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-[#16A34A]" />
        Como a Borlim ajuda
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-5">
        A decisão entre Simples puro e híbrido depende de margem, carga de insumos e perfil de
        clientes — não de intuição. A Borlim analisa a viabilidade do regime híbrido com seus{' '}
        <strong className="text-[#082852]">48 indicadores econômicos</strong>, recalcula a margem
        pós-tributos e conecta a decisão com a{' '}
        <strong className="text-[#082852]">Formação de Preço</strong> e a{' '}
        <strong className="text-[#082852]">Gestão Financeira</strong>, para que a escolha apareça no
        resultado da empresa — não só na apuração do mês.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={GESTAO_EMPRESARIAL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#082852] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0B3B7A] transition-colors"
        >
          Gestão Empresarial
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#16A34A] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#15803D] transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp (17) 99765-0672
        </a>
        <a
          href={`mailto:${EMAIL_BORLIM}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-300 text-[#082852] font-mono text-xs font-bold uppercase tracking-wider hover:bg-stone-50 transition-colors"
        >
          <Mail className="w-4 h-4" />
          flavio@borlim.com.br
        </a>
      </div>
    </div>
  )
}

export default function SimplesHibridoSection() {
  return (
    <section id="simples-hibrido" className="scroll-mt-24 py-12 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
          Simples Nacional × Reforma Tributária
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082852] tracking-tight">
          Simples Nacional — Híbrido
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          A empresa optante pelo Simples Nacional pode, <strong>por opção</strong>, excluir o PIS e
          a Cofins do DAS e passá-los a recolher “por fora”, no regime{' '}
          <strong>não cumulativo</strong>. É a chamada{' '}
          <strong className="text-[#082852]">operação híbrida</strong>: dois regimes convivendo ao
          mesmo tempo. Abaixo, a lógica, o passo a passo, as vantagens e os cuidados — e uma
          calculadora para simular.
        </p>
      </div>

      {/* 1. O que é */}
      <div className={cardPapel + ' mb-6'}>
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#082852] mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#16A34A]" />
          O que é o Simples Híbrido
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          O art. 52 da LC 123/2006 e o art. 55 da Lei 11.196/2005 permitem que a empresa optante
          pelo Simples Nacional <strong>exclua PIS e Cofins do seu DAS</strong>. Essas contribuições
          passam a ser recolhidas à parte, no regime <strong>não cumulativo</strong> — hoje{' '}
          <strong className="tabular-nums">{formatarPercentual(PCT_PIS_NAO_CUMULATIVO)}</strong> de
          PIS e{' '}
          <strong className="tabular-nums">{formatarPercentual(PCT_COFINS_NAO_CUMULATIVO)}</strong>{' '}
          de Cofins sobre a receita —, mas com direito a crédito sobre insumos, mercadorias
          revendidas, energia elétrica, aluguéis e outros itens previstos em lei.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Todo o restante (IRPJ, CSLL, CPP, ICMS/ISS, IPI) continua dentro do DAS, na faixa e no
          anexo normalmente aplicados pela RBT12 e pelo fator R. É “híbrido” justamente porque a
          empresa convive com <strong>dois regimes ao mesmo tempo</strong>: a guia única
          simplificada para a maior parte dos tributos e uma apuração regular de PIS/Cofins por
          fora.
        </p>
      </div>

      {/* 2. Passo a passo */}
      <div className={cardPapel + ' mb-6'}>
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#082852] mb-4 flex items-center gap-2">
          <RefreshCcw className="w-4 h-4 text-[#16A34A]" />
          Como funciona na prática (passo a passo)
        </h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#082852] text-white font-mono text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-[#082852] mb-1">
                  {p.titulo}
                </h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-xl border border-[#082852]/15 bg-[#F0F4F8] p-4">
          <p className="text-[13px] text-slate-700 leading-relaxed">
            <strong className="text-[#082852]">Quando costuma valer a pena:</strong> indústrias e
            comércios com alta carga de insumos e clientes B2B que aproveitam créditos — inclusive,
            no futuro, de CBS/IBS. <strong className="text-amber-700">Cuidados:</strong> perde-se a
            alíquota reduzida do DAS nessas contribuições, a complexidade contábil aumenta (EFD
            Contribuições mensal) e não é possível estornar o que já foi recolhido a menos.
          </p>
        </div>
      </div>

      {/* 3. Tabs */}
      <div className="mb-6">
        <TabsVantagensCuidados />
      </div>

      {/* 4. Exemplo numérico */}
      <div className="mb-6">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#082852] mb-4 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#16A34A]" />
          Exemplo numérico — indústria no Anexo II, R$ 150.000/mês
        </h3>
        <ExemploNumerico />
      </div>

      {/* 5. Calculadora */}
      <div className="mb-6">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#082852] mb-4 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#16A34A]" />
          Calculadora — Simples PURO × Simples HÍBRIDO
        </h3>
        <CalculadoraSimplesHibrido />
      </div>

      {/* 6. Box Borlim */}
      <BoxBorlim />
    </section>
  )
}
