// Exportação local (PDF e Excel) das calculadoras tributárias do portal.
// 100% no navegador: nada é gravado ou enviado para servidores/banco.
// PDF: jsPDF + jspdf-autotable (relatório A4 estilo consultoria).
// Excel: SheetJS (xlsx) com valores NUMÉRICOS nas células (fórmulas funcionam).

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

// Paleta do portal (azul-marinho #0B1F3A, verde #1F7A4D, dourado/brass)
const AZUL: [number, number, number] = [8, 40, 82] // #082852 — azul usado nas seções
const VERDE: [number, number, number] = [22, 163, 74] // #16A34A
const DOURADO: [number, number, number] = [183, 146, 74]
const CINZA_TXT: [number, number, number] = [71, 85, 105]

export interface LinhaExport {
  rotulo: string
  /** Valor numérico (R$ ou %) — no Excel vira NÚMERO na célula. null ⇒ usa `texto`. */
  valor: number | null
  /** Texto complementar ou valor pré-formatado (R$ "12.345,67", "45,2%", "Anexo I"...). */
  texto?: string
  /** true ⇒ o valor é percentual (formatação e formato do Excel adequados). */
  percentual?: boolean
  /** true ⇒ linha destacada no PDF (subtotal/total). */
  destaque?: boolean
}

export interface SecaoExport {
  titulo: string
  linhas: LinhaExport[]
}

export interface RankingExport {
  posicao: number
  regime: string
  total: number
  /** 1º lugar (destaque verde no PDF, negrito no Excel). */
  destaque?: boolean
}

export interface AbaExport {
  /** Nome da aba do Excel (máx. 31 caracteres, sem []:*?/\). */
  nome: string
  dadosInformados?: { rotulo: string; texto: string }[]
  ranking?: RankingExport[]
  secoes?: SecaoExport[]
}

export interface DadosExportacao {
  /** Nome do arquivo sem extensão. */
  nomeArquivo: string
  titulo: string
  subtitulo?: string
  abas: AbaExport[]
}

export function formatarBRLExport(n: number): string {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarPctExport(n: number): string {
  return `${n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
}

function dataHoraAgora(): string {
  const d = new Date()
  const pad = (x: number) => String(x).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function valorFormatado(l: LinhaExport): string {
  if (l.texto) return l.texto
  if (l.valor === null || Number.isNaN(l.valor)) return '—'
  return l.percentual ? formatarPctExport(l.valor) : formatarBRLExport(l.valor)
}

/* ---------------------------------- PDF ---------------------------------- */

export function baixarPDF(dados: DadosExportacao): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const margem = 14

  // Cabeçalho do relatório
  doc.setFillColor(...AZUL)
  doc.rect(0, 0, pageW, 26, 'F')
  doc.setFillColor(...DOURADO)
  doc.rect(0, 26, pageW, 1.2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('times', 'bold')
  doc.setFontSize(14)
  doc.text(dados.titulo, margem, 12, { maxWidth: pageW - margem * 2 })
  doc.setFont('times', 'normal')
  doc.setFontSize(9)
  const sub = [dados.subtitulo, `Simulação gerada em ${dataHoraAgora()}`]
    .filter(Boolean)
    .join(' — ')
  doc.text(sub, margem, 20)

  let y = 34

  const tituloSecao = (texto: string) => {
    if (y > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage()
      y = 20
    }
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...AZUL)
    doc.text(texto, margem, y)
    doc.setDrawColor(...DOURADO)
    doc.setLineWidth(0.5)
    doc.line(margem, y + 1.5, margem + doc.getTextWidth(texto), y + 1.5)
    y += 6
  }

  const tabelaSimples = (
    cabecalho: string[],
    corpo: (string | number)[][],
    opcoes: { colunasDireita?: number[]; linhasDestaque?: number[] } = {},
  ) => {
    autoTable(doc, {
      startY: y,
      head: [cabecalho],
      body: corpo,
      margin: { left: margem, right: margem },
      theme: 'grid',
      styles: {
        font: 'times',
        fontSize: 9,
        cellPadding: 1.8,
        textColor: CINZA_TXT,
        lineColor: [226, 232, 240],
      },
      headStyles: { fillColor: AZUL, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [244, 247, 251] },
      columnStyles: Object.fromEntries(
        (opcoes.colunasDireita ?? []).map((c) => [c, { halign: 'right' as const }]),
      ),
      didParseCell: (h) => {
        if (h.section === 'body' && (opcoes.linhasDestaque ?? []).includes(h.row.index)) {
          h.cell.styles.fontStyle = 'bold'
          h.cell.styles.fillColor = [236, 253, 245]
          h.cell.styles.textColor = VERDE
        }
      },
    })
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8
  }

  dados.abas.forEach((aba, idxAba) => {
    tituloSecao(idxAba === 0 && dados.abas.length === 1 ? 'Apuração' : aba.nome)

    if (aba.dadosInformados?.length) {
      tituloSecao('Dados informados')
      tabelaSimples(
        ['Campo', 'Valor'],
        aba.dadosInformados.map((d) => [d.rotulo, d.texto]),
        { colunasDireita: [1] },
      )
    }

    if (aba.ranking?.length) {
      tituloSecao('Ranking — menor imposto neste mês')
      tabelaSimples(
        ['#', 'Regime', 'Total de tributos (R$)'],
        aba.ranking.map((r) => [`${r.posicao}º`, r.regime, formatarBRLExport(r.total)]),
        {
          colunasDireita: [2],
          linhasDestaque: aba.ranking.map((r, i) => (r.destaque ? i : -1)).filter((i) => i >= 0),
        },
      )
    }

    aba.secoes?.forEach((secao) => {
      tituloSecao(secao.titulo)
      tabelaSimples(
        ['Lançamento', 'Valor'],
        secao.linhas.map((l) => [l.rotulo, valorFormatado(l)]),
        {
          colunasDireita: [1],
          linhasDestaque: secao.linhas.map((l, i) => (l.destaque ? i : -1)).filter((i) => i >= 0),
        },
      )
    })
  })

  // Rodapé em todas as páginas
  const totalPaginas = doc.getNumberOfPages()
  for (let p = 1; p <= totalPaginas; p++) {
    doc.setPage(p)
    doc.setFont('times', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(...CINZA_TXT)
    doc.text(
      'Portal de Consultoria Econômica — simulação educativa gerada localmente no navegador. Não substitui a apuração contábil.',
      margem,
      doc.internal.pageSize.getHeight() - 8,
    )
    doc.text(
      `Página ${p} de ${totalPaginas}`,
      pageW - margem,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'right' },
    )
  }

  doc.save(`${dados.nomeArquivo}.pdf`)
}

/* --------------------------------- EXCEL --------------------------------- */

function nomeAbaValido(nome: string, usados: Set<string>): string {
  let base =
    nome
      .replace(/[/\\?*:[\]]/g, ' ')
      .trim()
      .slice(0, 31) || 'Aba'
  let candidato = base
  let n = 2
  while (usados.has(candidato.toLowerCase())) {
    candidato = `${base.slice(0, 29)} ${n}`
    n++
  }
  usados.add(candidato.toLowerCase())
  return candidato
}

export function baixarExcel(dados: DadosExportacao): void {
  const wb = XLSX.utils.book_new()
  const usados = new Set<string>()

  dados.abas.forEach((aba) => {
    const linhas: (string | number)[][] = []
    /** índice (linha) ⇒ formato numérico da coluna B */
    const formatos = new Map<number, string>()

    if (aba.dadosInformados?.length) {
      linhas.push(['Dados informados', ''])
      aba.dadosInformados.forEach((d) => linhas.push([d.rotulo, d.texto]))
      linhas.push([])
    }

    if (aba.ranking?.length) {
      linhas.push(['Ranking — menor imposto neste mês', '', ''])
      linhas.push(['Posição', 'Regime', 'Total de tributos (R$)'])
      aba.ranking.forEach((r) => {
        linhas.push([`${r.posicao}º`, r.regime, r.total])
        formatos.set(linhas.length - 1, '#,##0.00')
      })
      linhas.push([])
    }

    aba.secoes?.forEach((secao) => {
      linhas.push([secao.titulo, ''])
      linhas.push(['Lançamento', 'Valor'])
      secao.linhas.forEach((l) => {
        const idx = linhas.length
        if (l.valor === null || Number.isNaN(l.valor)) {
          linhas.push([l.rotulo, l.texto ?? '—'])
        } else {
          linhas.push([l.rotulo, l.valor])
          formatos.set(idx, l.percentual ? '0.00"%"' : '#,##0.00')
        }
      })
      linhas.push([])
    })

    const ws = XLSX.utils.aoa_to_sheet(linhas)
    ws['!cols'] = [{ wch: 52 }, { wch: 20 }, { wch: 22 }]
    for (const [linhaIdx, fmt] of formatos) {
      const cell = ws[XLSX.utils.encode_cell({ r: linhaIdx, c: 1 })]
      if (cell && cell.t === 'n') cell.z = fmt
    }
    XLSX.utils.book_append_sheet(wb, ws, nomeAbaValido(aba.nome, usados))
  })

  XLSX.writeFile(wb, `${dados.nomeArquivo}.xlsx`)
}
