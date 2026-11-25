// Exportação em PDF e Excel das calculadoras tributárias — 100% no navegador.
// PDF: jsPDF + jspdf-autotable (relatório consultivo A4, memória de cálculo
// linha a linha). Excel: xlsx (SheetJS) com valores NUMÉRICOS nas células.
// Nada é gravado em banco ou enviado a servidores: download local apenas.

import { DocumentText, FileSpreadsheet } from 'lucide-react'
import { toast } from 'sonner'

/** Converte "1.234,56" (formato pt-BR dos inputs) em número. */
export function paraNumero(valorBr: string): number {
  if (!valorBr) return 0
  const limpo = valorBr
    .replace(/\s|R\$/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
  const n = Number(limpo)
  return Number.isFinite(n) ? n : 0
}

/** Linha monetária da memória de exportação. */
export function linhaExport(descricao: string, valor: number, bold = false): LinhaExport {
  return { descricao, valor, bold }
}

/** Linha informativa (sem valor) da memória de exportação. */
export function linhaInfoExport(descricao: string, bold = false): LinhaExport {
  return { descricao, valor: null, bold }
}

// ------------------------------------------------------------------ tipos ----

export interface LinhaExport {
  descricao: string
  valor: number | null // null = linha informativa sem valor (ex.: textos)
  bold?: boolean
}

export interface SecaoExport {
  titulo: string
  linhas: LinhaExport[]
}

export interface DadosEmpresa {
  rotulo: string
  valor: string
}

export interface RankingItem {
  posicao: number
  regime: string
  total: number
  melhor?: boolean
}

export interface ExportacaoPayload {
  tituloCalculadora: string
  subtitulo?: string
  dataHora: Date
  empresa: DadosEmpresa[]
  ranking?: RankingItem[]
  observacao?: string
  secoes: SecaoExport[]
  nomeArquivo: string
}

// ----------------------------------------------------------------- helpers ---

function baixarBlob(blob: Blob, nomeArquivo: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nomeArquivo
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function timestampArquivo(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`
}

function dataHoraLegivel(d: Date): string {
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// --------------------------------------------------------------------- PDF ---

async function gerarPdf(payload: ExportacaoPayload) {
  const [{ jsPDF }, autoTableMod] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  const autoTable = autoTableMod.default

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const largura = doc.internal.pageSize.getWidth()
  const AZUL = '#0B1F3A'
  const VERDE = '#1F7A4D'
  const CINZA = '#6B7280'

  // Cabeçalho editorial
  doc.setFillColor(11, 31, 58)
  doc.rect(0, 0, largura, 26, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('times', 'bold')
  doc.setFontSize(15)
  doc.text('Borlim — Portal de Consultoria Econômica', 14, 11)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('Relatório de simulação tributária — uso educativo', 14, 18)
  doc.text(dataHoraLegivel(payload.dataHora), largura - 14, 18, { align: 'right' })

  let y = 34
  doc.setTextColor(AZUL)
  doc.setFont('times', 'bold')
  doc.setFontSize(14)
  doc.text(payload.tituloCalculadora, 14, y)
  y += 6
  if (payload.subtitulo) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9.5)
    doc.setTextColor(CINZA)
    doc.text(payload.subtitulo, 14, y)
    y += 6
  }

  // Dados informados
  autoTable(doc, {
    startY: y,
    head: [['Dados informados na simulação', 'Valor']],
    body: payload.empresa.map((d) => [d.rotulo, d.valor]),
    theme: 'grid',
    headStyles: { fillColor: [31, 122, 77], textColor: 255, fontSize: 8.5, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8.5, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 14, right: 14 },
  })

  type DocComAuto = typeof doc & { lastAutoTable?: { finalY: number } }
  y = ((doc as DocComAuto).lastAutoTable?.finalY ?? y) + 8

  // Ranking (quando houver)
  if (payload.ranking && payload.ranking.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [['Posição', 'Regime', 'Total de tributos no mês']],
      body: payload.ranking.map((r) => [
        `${r.posicao}º`,
        r.regime + (r.melhor ? '  ★' : ''),
        r.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [11, 31, 58], textColor: 255, fontSize: 8.5, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: [30, 41, 59] },
      didParseCell: (data) => {
        if (
          data.section === 'body' &&
          data.column.index === 1 &&
          data.cell.raw &&
          String(data.cell.raw).includes('★')
        ) {
          data.cell.styles.fontStyle = 'bold'
          data.cell.styles.textColor = [31, 122, 77]
        }
      },
      margin: { left: 14, right: 14 },
    })
    y = ((doc as DocComAuto).lastAutoTable?.finalY ?? y) + 8
  }

  if (payload.observacao) {
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(CINZA)
    const linhas = doc.splitTextToSize(payload.observacao, largura - 28)
    doc.text(linhas, 14, y)
    y += linhas.length * 4 + 4
  }

  // Memória de cálculo — uma tabela por seção
  for (const secao of payload.secoes) {
    if (y > 250) {
      doc.addPage()
      y = 20
      doc.setFont('times', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(AZUL)
      doc.text(secao.titulo, 14, y)
      y += 6
    }
    autoTable(doc, {
      startY: y,
      head: [[secao.titulo, 'Valor']],
      body: secao.linhas.map((l) => [
        l.descricao,
        l.valor === null
          ? ''
          : l.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [31, 122, 77], textColor: 255, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8, textColor: [30, 41, 59] },
      columnStyles: { 1: { halign: 'right', cellWidth: 42 } },
      didParseCell: (data) => {
        if (data.section === 'body' && secao.linhas[data.row.index]?.bold) {
          data.cell.styles.fontStyle = 'bold'
          data.cell.styles.fillColor = [235, 242, 238]
        }
      },
      margin: { left: 14, right: 14 },
    })
    y = ((doc as DocComAuto).lastAutoTable?.finalY ?? y) + 7
  }

  // Rodapé em todas as páginas
  const totalPaginas = doc.getNumberOfPages()
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(140, 148, 160)
    doc.text(
      'Material educativo — não substitui apuração contábil ou orientação profissional.',
      14,
      doc.internal.pageSize.getHeight() - 8,
    )
    doc.text(
      `Página ${i} de ${totalPaginas}`,
      largura - 14,
      doc.internal.pageSize.getHeight() - 8,
      {
        align: 'right',
      },
    )
  }

  baixarBlob(doc.output('blob'), `${payload.nomeArquivo}-${timestampArquivo(payload.dataHora)}.pdf`)
}

// ------------------------------------------------------------------- Excel ---

async function gerarExcel(payload: ExportacaoPayload) {
  const XLSX = await import('xlsx')

  const wb = XLSX.utils.book_new()
  const nomeAbaBase = payload.nomeArquivo.replace(/[^a-zA-Z0-9]/g, '').slice(0, 24) || 'Simulacao'

  const linhasCabecalho: (string | number)[] = [
    payload.tituloCalculadora,
    `Borlim — Portal de Consultoria Econômica`,
    `Simulação gerada em ${dataHoraLegivel(payload.dataHora)}`,
  ]
  if (payload.subtitulo) linhasCabecalho.push(payload.subtitulo)

  const wsResumo: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
    linhasCabecalho,
    [],
    ['Dados informados', 'Valor'],
    ...payload.empresa.map((d) => [d.rotulo, d.valor]),
  ])
  if (payload.ranking && payload.ranking.length > 0) {
    XLSX.utils.sheet_add_aoa(
      wsResumo,
      [
        [],
        ['Ranking — menor imposto no mês', 'Total (R$)'],
        ...payload.ranking.map((r) => [
          `${r.posicao}º — ${r.regime}${r.melhor ? ' ★' : ''}`,
          r.total,
        ]),
      ],
      { origin: -1 },
    )
  }
  if (payload.observacao) {
    XLSX.utils.sheet_add_aoa(wsResumo, [[], [payload.observacao]], { origin: -1 })
  }
  wsResumo['!cols'] = [{ wch: 52 }, { wch: 20 }]
  XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo')

  // Uma aba por seção (regime / memória), valores como NÚMEROS.
  payload.secoes.forEach((secao, i) => {
    const aoa: (string | number)[][] = [[secao.titulo], ['Descrição', 'Valor (R$)']]
    for (const l of secao.linhas) {
      aoa.push([l.descricao, l.valor === null ? '' : l.valor])
    }
    const ws = XLSX.utils.aoa_to_sheet(aoa)
    // Formato monetário na coluna B (linhas com número).
    const rng = XLSX.utils.decode_range(ws['!ref'] ?? 'A1')
    for (let r = 2; r <= rng.e.r; r++) {
      const addr = XLSX.utils.encode_cell({ r, c: 1 })
      const cell = ws[addr]
      if (cell && typeof cell.v === 'number') {
        cell.t = 'n'
        cell.z = '"R$"#,##0.00'
      }
    }
    ws['!cols'] = [{ wch: 56 }, { wch: 18 }]
    const nomeAba = secao.titulo.replace(/[\\/*?:[\]]/g, '').slice(0, 28) || `Secao${i + 1}`
    XLSX.utils.book_append_sheet(wb, ws, nomeAba)
  })

  const saida = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  baixarBlob(
    new Blob([saida], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    `${payload.nomeArquivo}-${timestampArquivo(payload.dataHora)}.xlsx`,
  )
}

// ------------------------------------------------------------------ botões ---

interface BotoesExportacaoProps {
  gerarPayload: () => ExportacaoPayload
  className?: string
}

export function BotoesExportacao({ gerarPayload, className = '' }: BotoesExportacaoProps) {
  const exportar = async (tipo: 'pdf' | 'excel') => {
    const id = toast.loading(tipo === 'pdf' ? 'Gerando PDF…' : 'Gerando Excel…')
    try {
      const payload = gerarPayload()
      if (tipo === 'pdf') await gerarPdf(payload)
      else await gerarExcel(payload)
      toast.success(
        tipo === 'pdf' ? 'PDF baixado com sucesso.' : 'Planilha Excel baixada com sucesso.',
        { id },
      )
    } catch (err) {
      console.error('Falha na exportação:', err)
      toast.error('Não foi possível gerar o arquivo. Tente novamente.', { id })
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => exportar('pdf')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1F3A] text-white text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-[#12305c] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
      >
        <DocumentText className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Baixar PDF</span>
      </button>
      <button
        type="button"
        onClick={() => exportar('excel')}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F7A4D] text-white text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-[#18603C] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F7A4D]"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Baixar Excel</span>
      </button>
      <span className="sr-only">
        A exportação é gerada no seu navegador; nenhum dado é enviado ou gravado.
      </span>
    </div>
  )
}
