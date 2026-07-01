/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Info, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  X,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { Transaction } from '../types';

interface MonthlyFinanceChartProps {
  transactions: Transaction[];
  theme: 'light' | 'dark';
}

export default function MonthlyFinanceChart({ transactions, theme }: MonthlyFinanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Controle de destaque de coluna selecionada ao passar o mouse
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Helper local para classificar transações como Receita (Entrada) ou Despesa (Saída)
  // Alinhado perfeitamente com os critérios do FinanceTool
  const isRevenue = (t: Transaction) => {
    const nameLower = t.establishmentName.toLowerCase();
    const notesLower = (t.notes || '').toLowerCase();
    const catLower = (t.category || '').toLowerCase();
    return (
      (t.category === 'Outros' && nameLower.includes('vendas')) ||
      notesLower.includes('entrada manual') ||
      notesLower.includes('recebimento') ||
      notesLower.includes('venda') ||
      nameLower.includes('receita') ||
      nameLower.includes('emissão direta') ||
      catLower.includes('vendas') ||
      catLower.includes('receitas') ||
      catLower.includes('serviços')
    );
  };

  // Helper para decodificar data em rotulação formatada Mês/Ano
  const getMonthLabel = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length < 2) return null;
    const yearShort = parts[0].substring(2); // '26'
    const monthIdx = parseInt(parts[1], 10) - 1;
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${labels[monthIdx]}/${yearShort}`;
    }
    return null;
  };

  // Processamento e Agregação Dinâmica das Transações por mês
  const chartData = useMemo(() => {
    const dataMap: Record<string, { receitas: number; despesas: number }> = {};

    transactions.forEach(t => {
      const label = getMonthLabel(t.date);
      if (!label) return;

      // Cria dinamicamente novos meses se fornecidos pelo usuário no futuro
      if (!dataMap[label]) {
        dataMap[label] = { receitas: 0, despesas: 0 };
      }

      const tAmount = Number(t.amount) || 0;
      if (isRevenue(t)) {
        dataMap[label].receitas += tAmount;
      } else {
        dataMap[label].despesas += tAmount;
      }
    });

    const result: Array<{ month: string; receitas: number; despesas: number; saldo: number }> = [];

    // Consolida todos os rótulos detectados
    Object.entries(dataMap).forEach(([label, values]) => {
      result.push({
        month: label,
        receitas: Math.round(values.receitas * 100) / 100,
        despesas: Math.round(values.despesas * 100) / 100,
        saldo: Math.round((values.receitas - values.despesas) * 100) / 100,
      });
    });

    // Ordenador cronológico
    const getSortScore = (label: string) => {
      const [monthName, yearStr] = label.split('/');
      const year = parseInt(yearStr, 10) || 26;
      const MonthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const monthIndex = MonthLabels.indexOf(monthName);
      return year * 12 + (monthIndex >= 0 ? monthIndex : 0);
    };

    return result.sort((a, b) => getSortScore(a.month) - getSortScore(b.month));
  }, [transactions]);

  // Estatísticas comparativas rápidas
  const currentMonthData = chartData.find(d => d.month === 'Mai/26') || { receitas: 0, despesas: 0, saldo: 0 };
  const prevMonthData = chartData.find(d => d.month === 'Abr/26') || { receitas: 0, despesas: 0, saldo: 0 };

  const revenueGrowthPercent = useMemo(() => {
    if (prevMonthData.receitas === 0) return 0;
    return (((currentMonthData.receitas - prevMonthData.receitas) / prevMonthData.receitas) * 100).toFixed(1);
  }, [currentMonthData, prevMonthData]);

  const currentSalValueStr = currentMonthData.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const isSaldoPositive = currentMonthData.saldo >= 0;

  // Renderizador customizado de tooltip para Recharts com visual super premium
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl border shadow-xl ${
          theme === 'dark' 
            ? 'bg-[#121215] border-[#2c2c35] text-slate-105' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <p className="font-bold text-xs border-b pb-2 mb-2 border-slate-200/10 flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {label}
          </p>
          <div className="space-y-2">
            {payload.map((pld: any) => (
              <div key={pld.name} className="flex items-center justify-between gap-6 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pld.color }} />
                  <span className="font-semibold text-slate-400">{pld.name}:</span>
                </div>
                <span className="font-bold font-mono text-right text-slate-200 dark:text-white">
                  R$ {pld.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
            {payload.length >= 2 && (
              <div className="border-t pt-2 mt-1 flex items-center justify-between gap-6 text-[11px] font-bold border-dashed border-slate-200/10">
                <span className="text-slate-400">Saldo visual local:</span>
                <span className={`font-mono font-bold ${
                  payload[0].value - payload[1].value >= 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  R$ {(payload[0].value - payload[1].value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return (
      <div className={`border p-6 rounded-2xl animate-pulse min-h-[350px] flex flex-col justify-between ${
        theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-2">
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
        </div>
        <div className="flex-1 flex items-end gap-3 mt-8">
          <div className="h-24 bg-slate-205 dark:bg-[#1a1a20] rounded flex-1"></div>
          <div className="h-32 bg-slate-205 dark:bg-[#1a1a20] rounded flex-1"></div>
          <div className="h-16 bg-slate-205 dark:bg-[#1a1a20] rounded flex-1"></div>
          <div className="h-40 bg-slate-205 dark:bg-[#1a1a20] rounded flex-1"></div>
          <div className="h-28 bg-slate-205 dark:bg-[#1a1a20] rounded flex-1"></div>
        </div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mt-4"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`border p-6 rounded-2xl transition-all duration-200 shadow-sm ${
        theme === 'dark' 
          ? 'bg-[#111114] border-[#222228] hover:border-slate-800' 
          : 'bg-white border-slate-250/90 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6 border-slate-200/10">
        <div>
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
          }`}>
            <DollarSign className="w-4 h-4 text-emerald-500" />
            Evolução visual mensal (entradas vs saídas)
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
            Gráfico demonstrativo local para organização interna, sem valor contábil oficial.
          </p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-500">
            Visual local demonstrativo do MVP. Sem banco real, sem integração bancária, sem pagamento real e não substitui contador.
          </p>
        </div>

        {/* Mini Legendas Fofas e Botão de Expandir */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Receitas (Entradas)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500 inline-block"></span>
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Despesas (Saídas)</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            title="Expandir referência visual local"
            className={`p-1.5 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-[#15151d] hover:bg-[#1a1a24] text-emerald-400 border-[#2b2b35]' 
                : 'bg-slate-50 hover:bg-slate-100 text-indigo-700 border-slate-250'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid Split: Visualizador Recharts (70%) e Resumo Estatístico Premium (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lado Esquerdo: O Gráfico */}
        <div className="lg:col-span-8 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              barGap={4}
              onMouseMove={(state) => {
                if (state.activeTooltipIndex !== undefined) {
                  setFocusIndex(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setFocusIndex(null)}
            >
              <defs>
                {/* Gradients para as barras para um look mais premium e polido */}
                <linearGradient id="colorRevenues" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.85}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.95}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.85}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0.95}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme === 'dark' ? '#222228' : '#cbd5e1'} 
                vertical={false}
              />
              
              <XAxis 
                dataKey="month" 
                stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                dy={8}
              />
              
              <YAxis 
                stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} 
                fontSize={9}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `R$ ${Math.round(val / 1000)}k`}
                dx={-8}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ 
                  fill: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  radius: 8 
                }} 
              />
              
              <Bar 
                name="Receitas" 
                dataKey="receitas" 
                fill="url(#colorRevenues)" 
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`revenue-cell-${index}`} 
                    fillOpacity={focusIndex === null || focusIndex === index ? 1 : 0.6}
                  />
                ))}
              </Bar>

              <Bar 
                name="Despesas" 
                dataKey="despesas" 
                fill="url(#colorExpenses)" 
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`expense-cell-${index}`} 
                    fillOpacity={focusIndex === null || focusIndex === index ? 1 : 0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lado Direito: Resumos Financeiros Relacionados */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          
          <div className="space-y-4">
            <h4 className={`text-xs font-extrabold uppercase tracking-widest ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Resumo do Mês Vigente (Mai/26)
            </h4>

            {/* Cartão Mini 1: Total Recebido */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              theme === 'dark' ? 'bg-[#151519] border-[#222228]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Receitas</span>
                <span className={`text-base font-bold font-mono block mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  R$ {currentMonthData.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[9px] text-[#22c55e] flex items-center gap-0.5 mt-0.5 font-bold">
                  <ArrowUpRight className="w-3 h-3" /> {prevMonthData.receitas > 0 ? (currentMonthData.receitas > prevMonthData.receitas ? `+${revenueGrowthPercent}% vs Abr` : `${revenueGrowthPercent}% vs Abr`) : 'Estável'}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            {/* Cartão Mini 2: Total Gasto */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              theme === 'dark' ? 'bg-[#151519] border-[#222228]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Despesas</span>
                <span className={`text-base font-bold font-mono block mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  R$ {currentMonthData.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[9px] text-slate-550 dark:text-gray-500 block mt-0.5">
                  Suprimentos, Logística e Pessoal
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Cartão de Alerta Fiscal / Saúde */}
          <div className={`p-4 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2.5 ${
            isSaldoPositive
              ? theme === 'dark' ? 'bg-emerald-950/10 border-emerald-550/20 text-emerald-305' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : theme === 'dark' ? 'bg-rose-950/10 border-rose-550/20 text-rose-305' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSaldoPositive ? 'text-emerald-550' : 'text-rose-550'}`} />
            <div>
              <p className="font-extrabold uppercase text-[10px] tracking-wide">
                Diagnóstico de Rentabilidade
              </p>
              <p className="mt-1 opacity-90">
                Este mês encerrou com saldo visual parcial de <strong className="font-bold">R$ {currentSalValueStr}</strong>.
                {isSaldoPositive 
                  ? " A organização local está positiva nesta referência demonstrativa. Use apenas como apoio interno."
                  : " Alerta visual: as entradas locais estão abaixo do acumulado de saídas. Revise os registros internos do mês."}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL DE GOVERNO FINANCEIRO E ZOOM DE FLUXO MENUAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-9999 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-8 ${
              theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            {/* Header */}
            <div className={`p-6 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-550/15 rounded-2xl text-emerald-500">
                  <DollarSign className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-base uppercase tracking-wider">Conferência visual mensal</h3>
                  <p className="text-xs text-slate-400">Inspeção visual de entradas, saídas e registros gerados sobre datas de referência local.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-2 rounded-xl transition-all border cursor-pointer active:scale-95 ${
                  theme === 'dark' 
                    ? 'hover:bg-red-500/10 hover:text-red-400 border-slate-700 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-605 border-slate-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Principal do Modal */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto max-h-[70vh]">
              
              {/* Gráfico Gigante na Esquerda */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`border p-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-[#141419]/70 border-[#222228]' : 'bg-slate-50/50 border-slate-150'
                }`}>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#94a3b8] mb-4 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Comparação Trimestral & Consolidado Anual (Expansão)
                  </h4>
                  <div className="h-80 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -5, bottom: 0 }}
                        barGap={6}
                      >
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke={theme === 'dark' ? '#222228' : '#e2e8f0'} 
                          vertical={false}
                        />
                        <XAxis 
                          dataKey="month" 
                          stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          dy={8}
                        />
                        <YAxis 
                          stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} 
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => `R$ ${val.toLocaleString('pt-BR')}`}
                          dx={-8}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar name="Receitas" dataKey="receitas" fill="url(#colorRevenues)" radius={[6, 6, 0, 0]} />
                        <Bar name="Despesas" dataKey="despesas" fill="url(#colorExpenses)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* mini legendas e notas do conselho */}
                <div className={`p-4 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2.5 ${
                  theme === 'dark' ? 'bg-[#141419] border-indigo-500/10 text-gray-400' : 'bg-indigo-50 border-indigo-100 text-indigo-900'
                }`}>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mt-1.5 shrink-0"></div>
                  <p>Os meses de Janeiro a Abril representam uma <strong>referência local demonstrativa</strong> do negócio. O mês corrente incorpora registros internos, compras simuladas e referências locais de folha e tributos.</p>
                </div>
              </div>

              {/* Resumo visual local de entradas e saídas na direita */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#94a3b8] px-1">
                    Registro visual local do período
                  </h4>

                  <div className={`border rounded-2xl overflow-hidden ${
                    theme === 'dark' ? 'bg-[#141419] border-[#22222c]' : 'bg-white border-slate-200'
                  }`}>
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className={`text-[10px] font-black uppercase tracking-wider ${
                          theme === 'dark' ? 'bg-[#1c1c24] text-slate-400' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <th className="p-3">Mês/Ref</th>
                          <th className="p-3 text-right">Faturamento</th>
                          <th className="p-3 text-right">Despesas</th>
                          <th className="p-3 text-right">Resultado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-[#22222c]/40 font-mono">
                        {chartData.map((d) => {
                          const isPos = d.saldo >= 0;
                          return (
                            <tr key={d.month} className={theme === 'dark' ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                              <td className="p-3 font-semibold font-sans">{d.month}</td>
                              <td className="p-3 text-right text-emerald-600 dark:text-emerald-400">R$ {d.receitas.toLocaleString('pt-BR')}</td>
                              <td className="p-3 text-right text-rose-650 dark:text-rose-400">R$ {d.despesas.toLocaleString('pt-BR')}</td>
                              <td className={`p-3 text-right font-bold ${isPos ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {isPos ? '+' : ''} R$ {d.saldo.toLocaleString('pt-BR')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Scorecards Extras */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`p-4 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#141419] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Média Mensal Receitas</span>
                    <strong className={`block text-sm font-bold font-mono mt-1 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                      R$ {Math.round(chartData.reduce((acc, cr) => acc + cr.receitas, 0) / chartData.length).toLocaleString('pt-BR')}
                    </strong>
                  </div>
                  <div className={`p-4 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#141419] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Resultado visual acumulado</span>
                    <strong className="block text-sm font-bold font-mono text-emerald-500 mt-1">
                      R$ {Math.round(chartData.reduce((acc, cr) => acc + cr.saldo, 0)).toLocaleString('pt-BR')}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className={`p-4 border-t flex items-center justify-end gap-3 ${
              theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
            }`}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                Fechar Investigação
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
