// Exportação em PDF e Excel das calculadoras de simulação tributária.
// 100% no navegador: jspdf + jspdf-autotable + xlsx são carregados sob demanda
// (dynamic import) e NADA é gravado no banco nem enviado a servidores.
// PDF: valores formatados em R$ (pt-BR), cabeçalho, memória de cálculo em
// tabelas, ranking dos regimes e rodapé com a identidade Borlim.
// Excel: números crus (não texto) para permitir fórmulas do usuário, com
// formatação pt-BR ("R$" #.##0,00 e %) aplicada nas células numéricas.

import { FileDown, FileSpreadsheet } from 'lucide-react'
import { toast } from 'sonner'

export interface LinhaExport {
  rotulo: string
  valor: string
  destaque?: boolean
}

export interface SecaoExport {
  titulo: string
  linhas: readonly LinhaExport[]
}

export interface TabelaExport {
  titulo: string
  colunas: string[]
  linhas: readonly (string | number)[][]
}

export interface RankingExport {
  nome: string
  total: string
  detalhe?: string
}

export interface DadosExportacao {
  titulo: string
  nomeArquivo: string
  empresa: readonly LinhaExport[]
  secoes: readonly SecaoExport[]
  ranking?: readonly RankingExport[]
  tabelas?: readonly TabelaExport[]
  notaExtra?: string
}

const CONTATO = 'Borlim Consultoria Empresarial  ·  flavio@borlim.com.br  ·  (17) 99765-0672'
const NOTA_EDUCATIVA =
  'Simulação de caráter exclusivamente educativo — os valores não substituem a apuração contábil oficial (PGDAS-D, EFD, PER/DCOMP) nem a calculadora oficial do piloto CBS/IBS da Receita Federal.'

const COR_AZUL: [number, number, number] = [8, 40, 82]
const COR_CINZA: [number, number, number] = [100, 116, 139]

function carimboArquivo(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function dataGeracao(): string {
  return new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

function formatarNumeroPdf(valor: string | number): string {
  if (typeof valor === 'number') {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  return valor
}

/** Reconhece texto numérico pt-BR ("1.234,56", "R$ 1.234,56", "26,5%") e devolve número cru + formato de célula. */
function converterNumeroPtBR(texto: string): { v: number; z: string } | null {
  const t = texto.trim()
  if (!t) return null
  const pct = t.endsWith('%')
  const corpo = pct ? t.slice(0, -1).trim() : t
  const limpo = corpo.replace(/^R\$\s?/i, '').replace(/\s/g, '')
  if (pct) {
    if (!/^-?\d+(,\d+)?$/.test(limpo)) return null
  } else if (!/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(limpo) && !/^-?\d+,\d+$/.test(limpo)) {
    // Inteiros puros sem separador (NCM, cClassTrib, anos) permanecem texto.
    return null
  }
  const n = Number(limpo.replace(/\./g, '').replace(',', '.'))
  if (!Number.isFinite(n)) return null
  return { v: n, z: pct ? '0.00"%"' : '"R$" #,##0.00' }
}

export async function exportarPdf(dados: DadosExportacao): Promise<void> {
  try {
    const { jsPDF } = await import('jspdf')
    const autoTable = (await import('jspdf-autotable')).default

    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    doc.setProperties({
      title: dados.titulo,
      author: 'Borlim Consultoria Empresarial',
      subject: 'Simulação tributária de caráter educativo',
    })

    const largura = doc.internal.pageSize.getWidth()
    const altura = doc.internal.pageSize.getHeight()
    const margem = 14
    const larguraUtil = largura - margem * 2

    // Cabeçalho (primeira página)
    doc.setFillColor(...COR_AZUL)
    doc.rect(0, 0, largura, 26, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text(dados.titulo, margem, 10, { maxWidth: larguraUtil })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('Borlim Consultoria Empresarial — simulação tributária', margem, 15.5)
    doc.text(`Gerado em ${dataGeracao()}`, margem, 20.5)

    let y = 33

    const rodape = () => {
      doc.setDrawColor(203, 213, 225)
      doc.setLineWidth(0.2)
      doc.line(margem, altura - 14, largura - margem, altura - 14)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...COR_CINZA)
      doc.text(CONTATO, margem, altura - 10)
      doc.text(NOTA_EDUCATIVA, margem, altura - 6.5, { maxWidth: larguraUtil })
      doc.text(`Página ${doc.getNumberOfPages()}`, largura - margem, altura - 10, {
        align: 'right',
      })
      doc.setTextColor(15, 23, 42)
    }

    const desenhaTabela = (opts: {
      head: string[][]
      body: (string | number)[][]
      destaques?: Set<number>
    }) => {
      autoTable(doc, {
        startY: y,
        head: opts.head,
        body: opts.body.map((r) => r.map(formatarNumeroPdf)),
        margin: { left: margem, right: margem, bottom: 22 },
        styles: {
          font: 'helvetica',
          fontSize: 8.5,
          cellPadding: 1.8,
          textColor: [15, 23, 42],
          lineColor: [226, 232, 240],
          lineWidth: 0.1,
        },
        headStyles: { fillColor: COR_AZUL, textColor: 255, fontStyle: 'bold', fontSize: 8.5 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        didParseCell: (data) => {
          if (data.section === 'body' && opts.destaques?.has(data.row.index)) {
            data.cell.styles.fontStyle = 'bold'
            data.cell.styles.fillColor = [240, 244, 248]
          }
        },
        didDrawPage: () => rodape(),
      })
      const docT = doc as jsPDF & { lastAutoTable?: { finalY: number } }
      y = (docT.lastAutoTable?.finalY ?? y) + 8
    }

    const tituloBloco = (texto: string) => {
      if (y > altura - 42) {
        doc.addPage()
        y = 20
      }
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10.5)
      doc.setTextColor(...COR_AZUL)
      doc.text(texto, margem, y)
      doc.setTextColor(15, 23, 42)
      y += 3.5
    }

    tituloBloco('Dados da empresa')
    desenhaTabela({
      head: [['Campo', 'Valor informado']],
      body: dados.empresa.map((l) => [l.rotulo, l.valor]),
    })

    for (const tabela of dados.tabelas ?? []) {
      tituloBloco(tabela.titulo)
      desenhaTabela({ head: [tabela.colunas], body: tabela.linhas.map((r) => [...r]) })
    }

    for (const secao of dados.secoes) {
      tituloBloco(secao.titulo)
      desenhaTabela({
        head: [['Descrição', 'Valor']],
        body: secao.linhas.map((l) => [l.rotulo, l.valor]),
        destaques: new Set(secao.linhas.map((l, i) => (l.destaque ? i : -1)).filter((i) => i >= 0)),
      })
    }

    if (dados.ranking?.length) {
      tituloBloco('Ranking — menor imposto neste mês')
      desenhaTabela({
        head: [['Posição', 'Regime', 'Total', 'Observação']],
        body: dados.ranking.map((r, i) => [`${i + 1}º`, r.nome, r.total, r.detalhe ?? '']),
      })
    }

    if (dados.notaExtra) {
      if (y > altura - 30) {
        doc.addPage()
        y = 20
      }
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      doc.setTextColor(...COR_CINZA)
      doc.text(dados.notaExtra, margem, y, { maxWidth: larguraUtil })
      doc.setTextColor(15, 23, 42)
    }

    rodape()
    doc.save(`${dados.nomeArquivo}-${carimboArquivo()}.pdf`)
    toast.success('PDF gerado com sucesso.')
  } catch (erro) {
    console.error('Falha ao gerar o PDF da simulação', erro)
    toast.error('Não foi possível gerar o PDF. Tente novamente.')
  }
}

export async function exportarExcel(dados: DadosExportacao): Promise<void> {
  try {
    const XLSX = await import('xlsx')
    const wb = XLSX.utils.book_new()

    const planilha: (string | number)[][] = [
      [dados.titulo],
      [`Gerado em ${dataGeracao()} — Borlim Consultoria Empresarial`],
      [],
      ['DADOS DA EMPRESA'],
      ['Campo', 'Valor informado'],
      ...dados.empresa.map((l) => [l.rotulo, l.valor]),
      [],
    ]

    for (const tabela of dados.tabelas ?? []) {
      planilha.push([tabela.titulo], tabela.colunas, ...tabela.linhas.map((r) => [...r]), [])
    }

    for (const secao of dados.secoes) {
      planilha.push(
        [secao.titulo],
        ['Descrição', 'Valor'],
        ...secao.linhas.map((l) => [l.rotulo, l.valor]),
        [],
      )
    }

    if (dados.ranking?.length) {
      planilha.push(
        ['RANKING — MENOR IMPOSTO NESTE MÊS'],
        ['Posição', 'Regime', 'Total', 'Observação'],
      )
      dados.ranking.forEach((r, i) =>
        planilha.push([`${i + 1}º`, r.nome, r.total, r.detalhe ?? '']),
      )
      planilha.push([])
    }

    planilha.push([NOTA_EDUCATIVA], [CONTATO])
    if (dados.notaExtra) planilha.push([dados.notaExtra])

    const ws = XLSX.utils.aoa_to_sheet(planilha)

    // Converte células de texto numérico pt-BR em NÚMEROS CRUS (não texto),
    // mantendo a formatação R$/% para leitura humana.
    const ref = ws['!ref'] ?? 'A1'
    const faixa = XLSX.utils.decode_range(ref)
    for (let r = faixa.s.r; r <= faixa.e.r; r++) {
      for (let c = faixa.s.c; c <= faixa.e.c; c++) {
        const end = XLSX.utils.encode_cell({ r, c })
        const cel = ws[end]
        if (!cel || cel.t !== 's' || typeof cel.v !== 'string') continue
        const conv = converterNumeroPtBR(cel.v)
        if (conv) ws[end] = { t: 'n', v: conv.v, z: conv.z }
      }
    }

    ws['!cols'] = [{ wch: 46 }, { wch: 22 }, { wch: 24 }, { wch: 26 }]
    XLSX.utils.book_append_sheet(wb, ws, 'Simulação')
    XLSX.writeFile(wb, `${dados.nomeArquivo}-${carimboArquivo()}.xlsx`)
    toast.success('Planilha Excel gerada com sucesso.')
  } catch (erro) {
    console.error('Falha ao gerar a planilha Excel da simulação', erro)
    toast.error('Não foi possível gerar a planilha Excel. Tente novamente.')
  }
}

/** Par de botões discreto (PDF / Excel), no padrão visual do portal. */
export function BotoesExportacao({
  dados,
  className,
}: {
  dados: DadosExportacao
  className?: string
}) {
  const cls =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-[#082852] text-[11px] font-mono font-bold uppercase tracking-wider hover:border-[#16A34A] hover:text-[#15803D] transition-colors cursor-pointer'
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ''}`}>
      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500">
        Exportar:
      </span>
      <button
        type="button"
        onClick={() => void exportarPdf(dados)}
        title="Exportar em PDF"
        aria-label="Exportar simulação em PDF"
        className={cls}
      >
        <FileDown className="w-3.5 h-3.5" />
        <span>PDF</span>
      </button>
      <button
        type="button"
        onClick={() => void exportarExcel(dados)}
        title="Exportar em Excel"
        aria-label="Exportar simulação em Excel"
        className={cls}
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        <span>Excel</span>
      </button>
    </div>
  )
}
