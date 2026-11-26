// Tabela financeira "Apuração do Lucro Real" — demonstração completa abaixo do
// resultado do card: tributos entre débito e crédito (PIS, Cofins, ICMS, IPI),
// demonstração do resultado (lucro contábil APURADO), IRPJ + adicional + CSLL
// sobre o lucro apurado e os totais do período. Usada pelas DUAS calculadoras
// (Tributação dos 3 regimes e Simples Híbrido). Cálculo em tresRegimesCalc.ts.

import { ReceiptText } from 'lucide-react'
import { formatarBRL, formatarPercentual } from './cbsIbsCalc'
import type { ApuracaoLucroReal, SaldoTributo } from './tresRegimesCalc'

const SECAO_CLS =
  'font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#082852]'
const LINHA_CLS = 'flex items-baseline justify-between gap-3'
const ROTULO_CLS = 'text-[11px] sm:text-xs font-mono text-slate-600 leading-snug'
const VALOR_CLS = 'text-xs sm:text-sm tabular-nums whitespace-nowrap text-slate-700 font-semibold'

function Linha({ rotulo, valor, forte }: { rotulo: string; valor: string; forte?: boolean }) {
  return (
    <div className={LINHA_CLS}>
      <span className={`${ROTULO_CLS} ${forte ? 'font-bold text-slate-800' : ''}`}>{rotulo}</span>
      <span className={`${VALOR_CLS} ${forte ? 'font-bold text-[#082852]' : ''}`}>{valor}</span>
    </div>
  )
}

function SecaoTributo({ nome, s, base }: { nome: string; s: SaldoTributo; base?: number }) {
  return (
    <div>
      <div className={LINHA_CLS}>
        <span className={`${ROTULO_CLS} font-bold text-slate-800`}>{nome}</span>
        <span className="sr-only">débito, crédito e saldo</span>
      </div>
      <div className="pl-3 space-y-1">
        {base !== undefined && (
          <Linha
            rotulo="   Base de cálculo (faturamento − ICMS das vendas, ou valor informado)"
            valor={formatarBRL(base)}
          />
        )}
        <Linha
          rotulo={`DÉBITO = base PIS/Cofins × ${formatarPercentual(s.pctDebito)}`}
          valor={formatarBRL(s.debito)}
        />
        <Linha
          rotulo={`(−) CRÉDITO = compras × ${formatarPercentual(s.pctCredito)}`}
          valor={formatarBRL(s.credito)}
        />
        <Linha
          rotulo={
            s.aRecolher
              ? '= SALDO a RECOLHER (débito − crédito)'
              : '= SALDO NEGATIVO — crédito a aproveitar'
          }
          valor={formatarBRL(s.saldo)}
          forte
        />
      </div>
    </div>
  )
}

export function ApuracaoLucroRealTabela({ apuracao }: { apuracao: ApuracaoLucroReal }) {
  const a = apuracao
  return (
    <div className="mt-4 rounded-xl border border-stone-200 bg-[#F0F4F8]/60 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <ReceiptText className="w-4 h-4 text-[#16A34A]" />
        <span className={SECAO_CLS}>Apuração do Lucro Real — mês</span>
      </div>

      {/* a0. Base de cálculo do PIS/Cofins */}
      <div className="space-y-1">
        <p className={SECAO_CLS}>1. Base de cálculo do PIS/Cofins</p>
        <div className="pl-3 space-y-1">
          <Linha
            rotulo={
              a.basePisCofinsAutomatica
                ? 'Base PIS/Cofins = faturamento − ICMS das vendas (padrão automático, editável no bloco Débitos)'
                : 'Base PIS/Cofins = valor informado manualmente (editável no bloco Débitos)'
            }
            valor={formatarBRL(a.basePisCofins)}
            forte
          />
        </div>
      </div>

      {/* a. Tributos sobre vendas e compras: débito, crédito e saldo */}
      <div className="space-y-3">
        <p className={SECAO_CLS}>
          2. Tributos sobre vendas e compras — débito (base/compras) − crédito (compras)
        </p>
        <div className="pl-3 space-y-3">
          <SecaoTributo nome="PIS" s={a.tributos.pis} base={a.basePisCofins} />
          <SecaoTributo nome="Cofins" s={a.tributos.cofins} base={a.basePisCofins} />
          <SecaoTributo nome="ICMS" s={a.tributos.icms} />
          <SecaoTributo nome="IPI" s={a.tributos.ipi} />
        </div>
      </div>

      {/* b. Total dos tributos líquidos */}
      <div className="border-t border-stone-200 pt-3">
        <Linha
          rotulo="3. Total dos tributos líquidos (PIS + Cofins + ICMS + IPI + ISS)"
          valor={formatarBRL(a.totalTributosLiquidados)}
          forte
        />
      </div>

      {/* c. Demonstração do resultado — lucro apurado */}
      <div className="space-y-1 border-t border-stone-200 pt-3">
        <p className={SECAO_CLS}>4. Demonstração do resultado — lucro contábil do mês</p>
        <div className="pl-3 space-y-1">
          <Linha
            rotulo="Receita bruta total (comércio + serviços)"
            valor={formatarBRL(a.receitaTotal)}
          />
          <Linha rotulo="(−) Custos/despesas dedutíveis" valor={formatarBRL(a.custosDedutiveis)} />
          {a.folhaPagamento > 0 && (
            <Linha rotulo="(−) Folha de pagamento" valor={formatarBRL(a.folhaPagamento)} />
          )}
          <Linha rotulo="(−) Custo das matérias-primas" valor={formatarBRL(a.custoMateriaPrima)} />
          <Linha rotulo="(−) Despesas fixas" valor={formatarBRL(a.despesasFixas)} />
          {a.despesasFinanceiras > 0 && (
            <Linha rotulo="(−) Despesas financeiras" valor={formatarBRL(a.despesasFinanceiras)} />
          )}
          {a.outrasDespesas > 0 && (
            <Linha rotulo="(−) Outras despesas" valor={formatarBRL(a.outrasDespesas)} />
          )}
          <Linha
            rotulo="(−) Tributos líquidos apurados acima"
            valor={formatarBRL(a.totalTributosLiquidados)}
          />
          <Linha
            rotulo={
              a.tevePrejuizo
                ? '= LUCRO APURADO NEGATIVO — prejuízo fiscal'
                : '= LUCRO APURADO (base do IRPJ e da CSLL)'
            }
            valor={formatarBRL(a.lucroApurado)}
            forte
          />
          {a.tevePrejuizo && (
            <p className="pl-3 text-[11px] font-mono leading-snug text-amber-700">
              ⚠ Prejuízo fiscal — sem IRPJ/CSLL no período.
            </p>
          )}
        </div>
      </div>

      {/* d. IRPJ + adicional + CSLL sobre o lucro apurado */}
      <div className="space-y-1 border-t border-stone-200 pt-3">
        <p className={SECAO_CLS}>5. Apuração do IRPJ e da CSLL — sobre o lucro apurado</p>
        <div className="pl-3 space-y-1">
          {a.tevePrejuizo ? (
            <>
              <Linha rotulo="IRPJ (15% do lucro apurado)" valor={formatarBRL(0)} />
              <Linha
                rotulo="Adicional de IRPJ (10% acima de R$ 20.000/mês)"
                valor={formatarBRL(0)}
              />
              <Linha rotulo="CSLL (9% do lucro apurado)" valor={formatarBRL(0)} />
            </>
          ) : (
            <>
              <Linha
                rotulo={`IRPJ = lucro apurado × ${formatarPercentual(a.pctIrpj)}`}
                valor={formatarBRL(a.irpj)}
              />
              <Linha
                rotulo={`(+) Adicional IRPJ = ${formatarPercentual(a.pctAdicionalIrpj)} sobre o que excede R$ 20.000/mês (excedente ${formatarBRL(a.baseAdicional)})`}
                valor={formatarBRL(a.adicionalIrpj)}
              />
              <Linha
                rotulo={`CSLL = lucro apurado × ${formatarPercentual(a.pctCsll)}`}
                valor={formatarBRL(a.csll)}
              />
            </>
          )}
          <Linha rotulo="= TOTAL IRPJ + CSLL do mês" valor={formatarBRL(a.totalIrpjCsll)} forte />
        </div>
      </div>

      {/* e. Totais do período */}
      <div className="space-y-1 border-t border-stone-200 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wide text-[#082852] sm:text-sm">
            6. Impostos totais do período
          </span>
          <span className="whitespace-nowrap text-sm font-extrabold tabular-nums text-[#082852] sm:text-base">
            {formatarBRL(a.totalImpostos)}
          </span>
        </div>
        <Linha
          rotulo="Lucro líquido final após todos os impostos"
          valor={formatarBRL(a.lucroLiquidoFinal)}
          forte
        />
      </div>
    </div>
  )
}
