/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Layers,
  Package,
  Boxes,
  Maximize2,
  X,
  Search,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface StockDistributionChartProps {
  products: Product[];
  theme: 'light' | 'dark';
}

export default function StockDistributionChart({ products, theme }: StockDistributionChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Calcula a distribuição por categoria de mercadoria focado em quantidade total (qty)
  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    let grandTotal = 0;

    products.forEach(p => {
      const cat = p.category || 'Outros';
      const qty = Number(p.qty) || 0;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + qty;
      grandTotal += qty;
    });

    if (grandTotal === 0) return [];

    return Object.entries(categoryTotals).map(([category, qty]) => {
      const percentage = (qty / grandTotal) * 100;
      return {
        name: category,
        value: qty,
        percentage: parseFloat(percentage.toFixed(1))
      };
    }).sort((a, b) => b.value - a.value); // Ordena decrescente pela quantidade
  }, [products]);

  // Paleta de cores premium e contrastante para as fatias da rosca
  const COLORS = {
    light: [
      '#10b981', // Emerald 500
      '#6366f1', // Indigo 500
      '#0ea5e9', // Sky 500
      '#f59e0b', // Amber 550
      '#f43f5e', // Rose 500
      '#a855f7', // Purple 500
      '#ec4899', // Pink 500
      '#14b8a6', // Teal 500
    ],
    dark: [
      '#34d399', // Emerald 400
      '#818cf8', // Indigo 400
      '#38bdf8', // Sky 400
      '#fbbf24', // Amber 400
      '#fb7185', // Rose 400
      '#c084fc', // Purple 400
      '#f472b6', // Pink 400
      '#2dd4bf', // Teal 400
    ]
  };

  const activeColors = theme === 'dark' ? COLORS.dark : COLORS.light;

  const totalStockItems = useMemo(() => {
    return products.reduce((sum, p) => sum + (Number(p.qty) || 0), 0);
  }, [products]);

  // Tooltip customizado com visual refinado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-xl border shadow-xl text-xs ${
          theme === 'dark' 
            ? 'bg-[#121215] border-[#2c2c35] text-slate-105' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <p className="font-bold border-b pb-1.5 mb-1.5 border-slate-200/10 uppercase tracking-wider text-slate-400">
            {data.name}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Unidades:</span>
              <span className="font-bold font-mono text-slate-200 dark:text-white">
                {data.value.toLocaleString('pt-BR')} un.
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500">Frações:</span>
              <span className="font-bold font-mono text-emerald-505 dark:text-emerald-400">
                {data.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return (
      <div className={`border p-5 rounded-2xl animate-pulse min-h-[350px] flex flex-col justify-between ${
        theme === 'dark' ? 'bg-[#1c1c24] border-[#222228]' : 'bg-white border-slate-250/90'
      }`}>
        <div className="space-y-2">
          <div className="h-4 bg-slate-350 dark:bg-slate-700 rounded w-1/3"></div>
          <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded w-1/2"></div>
        </div>
        <div className="flex-1 flex items-center justify-center mt-6">
          {/* Animated placeholder circle for the pie chart */}
          <div className="w-40 h-40 rounded-full border-8 border-slate-205 dark:border-[#131317]"></div>
        </div>
        <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded w-1/4 mt-4"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`border p-5 rounded-2xl transition-all duration-200 shadow-sm flex flex-col justify-between ${
        theme === 'dark' 
          ? 'bg-[#1c1c24] border-[#222228] hover:border-slate-800' 
          : 'bg-white border-slate-250/90 hover:border-slate-300'
      }`}
    >
      <div>
        <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-200/10">
          <h3 className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-2 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-705'
          }`}>
            <Layers className="w-4 h-4 text-emerald-500" />
            Distribuição de Estoque
          </h3>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              theme === 'dark' ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {chartData.length} categorias
            </span>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              title="Expandir Distribuição de Estoque"
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

        {chartData.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center p-4">
            <Package className="w-8 h-8 text-slate-400 animate-pulse mb-2" />
            <p className={`text-xs italic ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              Nenhuma mercadoria ativa registrada para calcular distribuição.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
            
            {/* Lançador da Rosca Real */}
            <div className="sm:col-span-4 h-44 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={activeColors[index % activeColors.length]} 
                        fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                        style={{ cursor: 'pointer', outline: 'none' }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Centro da Rosca: Total de unidades estilizado super premium */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total</span>
                <span className={`text-sm font-bold font-mono tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {totalStockItems}
                </span>
                <span className="text-[8px] text-slate-500">unidades</span>
              </div>
            </div>

            {/* Lista dos rótulos inteligentes com scroll discreto */}
            <div className="sm:col-span-8 space-y-1.5 max-h-[170px] overflow-y-auto pr-1">
              {chartData.map((entry, index) => {
                const color = activeColors[index % activeColors.length];
                const isHovered = activeIndex === index;

                return (
                  <div 
                    key={entry.name}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => {
                      setSelectedCategory(entry.name);
                      setIsModalOpen(true);
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-2.5 transition-all duration-150 cursor-pointer ${
                      isHovered
                        ? theme === 'dark' ? 'bg-[#151519] border-[#222228]' : 'bg-slate-50 border-slate-200'
                        : 'bg-transparent border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      <span className={`text-[11px] font-semibold truncate ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-705'
                      }`}>
                        {entry.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                        {entry.value}
                      </span>
                      <span className="text-emerald-500 text-[9px]">
                        ({entry.percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </div>

      {chartData.length > 0 && (
        <div className={`mt-3 pt-3 border-t text-[10px] flex items-center gap-1.5 ${
          theme === 'dark' ? 'border-[#222228] text-gray-500' : 'border-slate-100 text-slate-450'
        }`}>
          <Boxes className="w-3.5 h-3.5 text-emerald-500" />
          <span>Fração baseada em quantidades reais em inventário físico. Clique para focar detalhes.</span>
        </div>
      )}

      {/* MODAL DE TELA INTEIRA (ZOOM DO QUADRADO DE DISTRIBUIÇÃO) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col my-8 ${
              theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            {/* Header do Modal */}
            <div className={`p-6 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/15 rounded-2xl text-emerald-500">
                  <Layers className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-base uppercase tracking-wider">Explorador Detalhado de Estoque</h3>
                  <p className="text-xs text-gray-400">Análise expandida da distribuição de categorias e catálogo de mercadorias.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-2 rounded-xl transition-all border cursor-pointer active:scale-95 ${
                  theme === 'dark' 
                    ? 'hover:bg-red-500/10 hover:text-red-400 border-slate-700 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Principal do Modal (Grade de 2 Colunas) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto max-h-[70vh]">
              
              {/* Lado Esquerdo: Distribuição Física (Gráfico em Detalhes) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                
                <div className={`border p-5 rounded-2xl ${
                  theme === 'dark' ? 'bg-[#141419]/70 border-[#222228]' : 'bg-slate-50/50 border-slate-150'
                }`}>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <Boxes className="w-3.5 h-3.5 text-emerald-500" />
                    Gráfico de Rosca de Volumes
                  </h4>

                  <div className="h-64 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={68}
                          outerRadius={88}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell 
                              key={`cell-large-${index}`} 
                              fill={activeColors[index % activeColors.length]} 
                              style={{ cursor: 'pointer', outline: 'none' }}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Centro da Rosca Expandido */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Total Físico</span>
                      <span className={`text-2xl font-black font-mono tracking-tight mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {totalStockItems}
                      </span>
                      <span className="text-[10px] text-[#94a3b8] font-bold">UNIDADES</span>
                    </div>
                  </div>
                </div>

                {/* Lista Geral de Categorias */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">Selecione uma Categoria para Filtrar:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedCategory === null 
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                          : theme === 'dark' ? 'bg-[#141419] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>Ver Todas</span>
                      <span className="opacity-75 font-mono">{products.length}</span>
                    </button>
                    {chartData.map((entry, index) => {
                      const isSelected = selectedCategory === entry.name;
                      return (
                        <button
                          key={entry.name}
                          onClick={() => setSelectedCategory(entry.name)}
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between truncate cursor-pointer ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                              : theme === 'dark' ? 'bg-[#141419] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{entry.name}</span>
                          <span className="opacity-75 font-mono ml-1">{entry.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Lado Direito: Listagem Detalhada das Mercadorias Integradas */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Filtro e Buscador */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className={`relative flex-1 rounded-xl border flex items-center px-3 ${
                    theme === 'dark' ? 'bg-[#141419]/90 border-slate-850' : 'bg-white border-slate-200'
                  }`}>
                    <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                    <input 
                      type="text"
                      placeholder="Pesquisar produto pelo nome, lote ou código..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent py-2.5 text-xs focus:outline-none dark:text-white"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-[10px] text-gray-500 hover:text-white">Limpar</button>
                    )}
                  </div>
                </div>

                {/* Tabela Interativa */}
                <div className={`border rounded-2xl overflow-hidden flex-1 ${
                  theme === 'dark' ? 'bg-[#141419] border-[#22222c]' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className={`p-3 border-b text-[10px] font-black uppercase tracking-wider flex items-center justify-between ${
                    theme === 'dark' ? 'bg-[#1c1c24] border-[#222228] text-[#94a3b8]' : 'bg-slate-50 border-slate-150 text-slate-500'
                  }`}>
                    <span>Mercadorias no Filtro Ativo ({
                      products.filter(p => {
                        const matchCat = !selectedCategory || p.category === selectedCategory;
                        const sQuery = searchQuery.toLowerCase();
                        const matchSearch = !searchQuery || 
                          p.name.toLowerCase().includes(sQuery) ||
                          p.batch.toLowerCase().includes(sQuery) ||
                          p.barcode.toLowerCase().includes(sQuery) ||
                          (p.location || '').toLowerCase().includes(sQuery);
                        return matchCat && matchSearch;
                      }).length
                    })</span>
                    {selectedCategory && (
                      <span className="text-emerald-500 font-bold">Filtro: {selectedCategory}</span>
                    )}
                  </div>

                  <div className="max-h-[350px] overflow-y-auto divided-y divide-slate-100 dark:divide-[#222228]/40">
                    {products
                      .filter(p => {
                        const matchCat = !selectedCategory || p.category === selectedCategory;
                        const sQuery = searchQuery.toLowerCase();
                        const matchSearch = !searchQuery || 
                          p.name.toLowerCase().includes(sQuery) ||
                          p.batch.toLowerCase().includes(sQuery) ||
                          p.barcode.toLowerCase().includes(sQuery) ||
                          (p.location || '').toLowerCase().includes(sQuery);
                        return matchCat && matchSearch;
                      })
                      .map((p, idx) => {
                        return (
                          <div 
                            key={p.id}
                            className={`p-3 text-xs flex items-center justify-between gap-4 transition-colors ${
                              theme === 'dark' ? 'hover:bg-[#1c1c24]/50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="truncate flex-1">
                              <h5 className={`font-bold truncate ${theme === 'dark' ? 'text-slate-205' : 'text-slate-800'}`}>{p.name}</h5>
                              <div className="flex flex-wrap gap-x-2 gap-y-0.5 items-center text-[10px] text-gray-500 mt-1">
                                <span className="font-semibold px-1 rounded bg-slate-200 text-slate-800 dark:bg-[#2c2c36]/60 dark:text-gray-400">{p.category || 'Outros'}</span>
                                <span>Lote: <strong className="font-mono">{p.batch}</strong></span>
                                <span>Endereço: <strong className="font-mono text-emerald-505 dark:text-emerald-400">{p.location || 'Sem prateleira'}</strong></span>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className={`font-bold font-mono text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                                {p.qty} un.
                              </span>
                              <p className="text-[9px] text-gray-500 mt-0.5">Vencimento: {p.expirationDate}</p>
                            </div>
                          </div>
                        );
                      })}

                    {products.filter(p => {
                        const matchCat = !selectedCategory || p.category === selectedCategory;
                        const sQuery = searchQuery.toLowerCase();
                        const matchSearch = !searchQuery || 
                          p.name.toLowerCase().includes(sQuery) ||
                          p.batch.toLowerCase().includes(sQuery) ||
                          p.barcode.toLowerCase().includes(sQuery) ||
                          (p.location || '').toLowerCase().includes(sQuery);
                        return matchCat && matchSearch;
                      }).length === 0 && (
                        <div className="p-8 text-center text-xs text-gray-500 italic">
                          Nenhum produto corresponde aos critérios do filtro.
                        </div>
                      )}
                  </div>
                </div>

                {/* Dica de Ação rápida */}
                <div className={`p-4 rounded-xl border text-[11px] leading-relaxed flex items-center gap-2.5 ${
                  theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-305' : 'bg-indigo-50 border-indigo-100 text-indigo-900'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>
                  <p>Para adicionar novos produtos, simular escaneamentos ou ditar movimentações de entrada, use o <strong>Módulo de Logística & Estoque</strong> no painel de navegação lateral.</p>
                </div>

              </div>

            </div>

            {/* Footer do Modal */}
            <div className={`p-4 border-t flex items-center justify-end gap-3 ${
              theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
            }`}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                Voltar ao Painel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
