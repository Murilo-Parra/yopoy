/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Users, 
  FileText, 
  Sparkles, 
  UploadCloud, 
  Check, 
  X, 
  AlertCircle, 
  Loader2, 
  Trash2, 
  UserPlus, 
  Briefcase, 
  Calendar,
  Banknote,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarDays,
  Percent,
  Scale,
  Coins,
  PiggyBank,
  Sliders,
  ShieldCheck,
  Zap,
  Info,
  Download,
  FileCode as FileSpreadsheet,
  Smartphone,
  Phone
} from 'lucide-react';
import { Transaction, Employee, TransactionCategory, Product, isTransactionRevenue } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { exportTransactionsCSV, exportTransactionsPDF } from '../utils/exportUtils';
import {
  readTaskCanvasSnapshot,
  subscribeTaskCanvasUpdates,
  writeTaskCanvasSnapshot,
  type TaskCanvasSnapshot,
} from '../features/yopoy-central-do-dia/taskCanvasStorage';
import type { SmartCardItem, SmartCardKind } from '../features/yopoy-central-do-dia/types';

const DESK_FINANCE_KINDS: SmartCardKind[] = ['payment', 'expense'];

function isDeskSmartCardItem(value: unknown): value is SmartCardItem {
  return typeof value === 'object' && value !== null
    && typeof (value as Record<string, unknown>).id === 'string'
    && typeof (value as Record<string, unknown>).kind === 'string'
    && typeof (value as Record<string, unknown>).status === 'string'
    && typeof (value as Record<string, unknown>).title === 'string'
    && typeof (value as Record<string, unknown>).description === 'string';
}

function getDeskFallbackDate(snapshot: TaskCanvasSnapshot | null) {
  return snapshot?.updatedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
}

function getDeskTransactionCategory(item: SmartCardItem): TransactionCategory {
  if (item.tags.some((tag) => tag === 'Funcionários' || tag === 'Serviços' || tag === 'Tecnologia')) {
    const category = item.tags.find((tag): tag is TransactionCategory => (
      tag === 'Suprimentos'
      || tag === 'Logística'
      || tag === 'Serviços'
      || tag === 'Funcionários'
      || tag === 'Impostos'
      || tag === 'Alimentação'
      || tag === 'Tecnologia'
      || tag === 'Faturamento Misto'
      || tag === 'Outros'
    ));

    if (category) return category;
  }

  return item.kind === 'expense' ? 'Suprimentos' : 'Outros';
}

function deskCardToTransaction(item: SmartCardItem, fallbackDate: string): Transaction | null {
  if (item.archived || !DESK_FINANCE_KINDS.includes(item.kind)) {
    return null;
  }

  const amount = typeof item.amount === 'number' && Number.isFinite(item.amount) ? item.amount : 0;

  return {
    id: item.id,
    establishmentName: item.title,
    amount,
    date: item.sourceDate ?? fallbackDate,
    category: getDeskTransactionCategory(item),
    status: item.status === 'resolved' ? 'Confirmado' : 'Pendente',
    notes: item.description,
    type: item.kind === 'expense' ? 'Despesa' : 'Receita',
  };
}

function createDeskCardFromTransaction(transaction: Transaction, kind: SmartCardKind, sourceDate?: string): SmartCardItem {
  return {
    id: transaction.id,
    kind,
    title: transaction.establishmentName,
    description: transaction.notes || transaction.establishmentName,
    amount: transaction.amount,
    timeLabel: transaction.date,
    status: transaction.status === 'Confirmado' ? 'ready' : 'pending',
    archived: false,
    linked: false,
    hasPreInvoice: false,
    sourceDate: sourceDate ?? transaction.date,
    tags: [
      kind === 'payment' ? 'Recebimento local' : kind === 'expense' ? 'Despesa local' : 'Registro local',
      transaction.category,
    ],
  };
}

function writeDeskCardFromTransaction(transaction: Transaction, kind: SmartCardKind, sourceDate?: string) {
  const currentSnapshot = readTaskCanvasSnapshot();
  const nextSnapshot: TaskCanvasSnapshot = {
    ...(currentSnapshot ?? {
      version: 1,
      items: [],
      connections: [],
      positions: {},
      activeFilter: 'all',
    }),
    updatedAt: new Date().toISOString(),
    items: [
      ...((currentSnapshot?.items as SmartCardItem[] | undefined) ?? []).filter((item) => !isDeskSmartCardItem(item) || item.id !== transaction.id),
      createDeskCardFromTransaction(transaction, kind, sourceDate),
    ],
  };

  writeTaskCanvasSnapshot(nextSnapshot);
}

function removeDeskCardById(cardId: string) {
  const currentSnapshot = readTaskCanvasSnapshot();
  if (!currentSnapshot || !Array.isArray(currentSnapshot.items)) return;

  const nextItems = currentSnapshot.items.filter((item) => !isDeskSmartCardItem(item) || item.id !== cardId);
  if (nextItems.length === currentSnapshot.items.length) return;

  writeTaskCanvasSnapshot({
    ...currentSnapshot,
    items: nextItems,
    updatedAt: new Date().toISOString(),
  });
}

interface FinanceToolProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  cashBalance: number;
  setCashBalance: React.Dispatch<React.SetStateAction<number>>;
  products?: Product[];
  selectedPlan?: 'micro' | 'pequena' | 'media' | 'corporativo';
  theme?: 'light' | 'dark';
}

export default function FinanceTool({
  transactions,
  setTransactions,
  employees,
  setEmployees,
  cashBalance,
  setCashBalance,
  products = [],
  selectedPlan = 'media',
  theme = 'dark'
}: FinanceToolProps) {
  // Controle de Tabs Internas: 'caixa' ou 'funcionarios' ou 'planejamento'
  const [financeTab, setFinanceTab] = useState<'caixa' | 'funcionarios' | 'planejamento'>('caixa');

  // Estados do Filtro de Data (Calendário) e Controle de Navegação do Calendário
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarMonth, setCalendarMonth] = useState<number>(4); // Maio de 2026 por padrão (0-indexado)

  // Controle de Tabs das Tabelas de Dados Correspondentes aos Filtros
  const [selectedTableTab, setSelectedTableTab] = useState<'geral' | 'recebimentos' | 'debitos' | 'categorias_todas'>('geral');

  // Estados para Ajuda Contábil e Planejamento Tributário
  const [taxRegime, setTaxRegime] = useState<'simples' | 'presumido' | 'real'>('simples');
  const [simplesRate, setSimplesRate] = useState<number>(6.5); // % Simples Nacional média nacional para comércio de pequeno porte
  
  // Alíquotas de ICMS ajustáveis por tipo/categoria de produto
  const [icmsAlimentos, setIcmsAlimentos] = useState<number>(18.0);
  const [icmsEletronicos, setIcmsEletronicos] = useState<number>(25.0);
  const [icmsLimpeza, setIcmsLimpeza] = useState<number>(12.0);
  const [icmsBebidas, setIcmsBebidas] = useState<number>(25.0);
  const [icmsMedicamento, setIcmsMedicamento] = useState<number>(12.0);
  const [icmsOutros, setIcmsOutros] = useState<number>(18.0);

  // Encargos trabalhistas e previdenciários sobre a folha
  const [inssPatronalRate, setInssPatronalRate] = useState<number>(20.0);
  const [fgtsRate, setFgtsRate] = useState<number>(8.0);
  
  // Sem reservas fictícias/adicionais automáticas

  // Estados de Formulário de Nova Transação Manual
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [manualType, setManualType] = useState<'Receita' | 'Despesa'>('Despesa');
  const [manualCategory, setManualCategory] = useState<TransactionCategory>('Suprimentos');
  const [manualDate, setManualDate] = useState('2026-05-31');
  const [manualNotes, setManualNotes] = useState('');

  // Estados de Edição do Calendário Interativo por Data Selecionada (Adicionar / Editar Transações)
  const [isCalendarEditModalOpen, setIsCalendarEditModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  const [calFormType, setCalFormType] = useState<'Receita' | 'Despesa'>('Despesa');
  const [calFormName, setCalFormName] = useState('');
  const [calFormAmount, setCalFormAmount] = useState('');
  const [calFormCategory, setCalFormCategory] = useState<TransactionCategory>('Suprimentos');
  const [calFormNotes, setCalFormNotes] = useState('');

  // Estados do Scanner de Recibos por IA (Gemini)
  const [isAIScanOpen, setIsAIScanOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiAnalysisError, setAiAnalysisError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<Partial<Transaction> | null>(null);
  
  // Estados de Controle de Edição do Saldo Inicial de Caixa
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [tempBalance, setTempBalance] = useState(cashBalance.toString());
  const [deskSnapshot, setDeskSnapshot] = useState<TaskCanvasSnapshot | null>(() => readTaskCanvasSnapshot());

  // Manter tempBalance sincronizado com cashBalance externo
  useEffect(() => {
    setTempBalance(cashBalance.toString());
  }, [cashBalance]);

  useEffect(() => {
    const refreshDeskSnapshot = () => {
      setDeskSnapshot(readTaskCanvasSnapshot());
    };

    refreshDeskSnapshot();
    return subscribeTaskCanvasUpdates(refreshDeskSnapshot);
  }, []);

  const handleSaveStartingBalance = () => {
    const val = parseFloat(tempBalance);
    if (!isNaN(val) && val >= 0) {
      setCashBalance(val);
      localStorage.setItem('biz_simulated_cash_balance', val.toString());
      window.dispatchEvent(new Event('storage'));
    }
    setIsEditingBalance(false);
  };

  // Estados de Formulário de Novo Funcionário
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [employeeSalary, setEmployeeSalary] = useState('');
  const [employeeHiredDate, setEmployeeHiredDate] = useState('2026-05-31');
  const [employeePhone, setEmployeePhone] = useState('');

  // Filtros de Lançamento
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  // Ajustes de acessibilidade de fonte e modais para detalhamento sob clique
  const [globalFontSize, setGlobalFontSize] = useState<'normal' | 'large' | 'xlarge'>('large'); // default to 'large' as requested to increase size, but user can toggle
  const [selectedTransactionDetail, setSelectedTransactionDetail] = useState<Transaction | null>(null);
  const [selectedEmployeeDetail, setSelectedEmployeeDetail] = useState<Employee | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<any | null>(null);

  // Dynamic font sizing mapper for responsiveness and accessibility
  const getFontSize = (baseSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl') => {
    if (globalFontSize === 'normal') {
      switch (baseSize) {
        case 'xs': return 'text-xs';
        case 'sm': return 'text-sm';
        case 'base': return 'text-base';
        case 'lg': return 'text-lg';
        case 'xl': return 'text-xl';
        case '2xl': return 'text-2xl';
      }
    } else if (globalFontSize === 'large') {
      switch (baseSize) {
        case 'xs': return 'text-sm';
        case 'sm': return 'text-base';
        case 'base': return 'text-lg';
        case 'lg': return 'text-xl';
        case 'xl': return 'text-2xl';
        case '2xl': return 'text-3xl';
      }
    } else { // 'xlarge'
      switch (baseSize) {
        case 'xs': return 'text-base';
        case 'sm': return 'text-lg';
        case 'base': return 'text-xl';
        case 'lg': return 'text-2xl';
        case 'xl': return 'text-3xl';
        case '2xl': return 'text-4xl';
      }
    }
    return 'text-sm';
  };

  // Helper para identificar se uma transação constitui Entrada / Recebimento
  const isRevenue = isTransactionRevenue;
  const financeSourceTransactions = useMemo(() => {
    if (deskSnapshot !== null) {
      const fallbackDate = getDeskFallbackDate(deskSnapshot);
      return Array.isArray(deskSnapshot.items)
        ? deskSnapshot.items
            .filter(isDeskSmartCardItem)
            .map((item) => deskCardToTransaction(item, fallbackDate))
            .filter((item): item is Transaction => item !== null)
        : [];
    }

    return transactions;
  }, [deskSnapshot, transactions]);

  // Cálculos de Caixa baseados no Helper IsRevenue
  const totalRevenues = financeSourceTransactions
    .filter(isRevenue)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = financeSourceTransactions
    .filter(t => !isRevenue(t))
    .reduce((sum, t) => sum + t.amount, 0);

  const calculatedBalance = cashBalance + totalRevenues - totalExpenses;

  // Cálculo Detalhado do Custo de Imposto segundo o Regime Tributário ativo da distribuidora
  const estimatedActiveTax = useMemo(() => {
    if (taxRegime === 'simples') {
      return totalRevenues * (simplesRate / 100);
    } else if (taxRegime === 'presumido') {
      return totalRevenues * 0.0743; // consolidado legal de presumido
    } else {
      const netMarginBeforeTaxes = totalRevenues - totalExpenses;
      const irpjCSLLReal = netMarginBeforeTaxes > 0 ? netMarginBeforeTaxes * 0.24 : 0;
      const servicesAmount = financeSourceTransactions
        .filter(t => t.category === 'Serviços' || t.category === 'Tecnologia')
        .reduce((sum, t) => sum + t.amount, 0);
      const estimatedIssTaxOnServices = servicesAmount * 0.05;
      const pisCofinsReal = totalRevenues * 0.0450;
      return irpjCSLLReal + pisCofinsReal + estimatedIssTaxOnServices;
    }
  }, [taxRegime, simplesRate, totalRevenues, totalExpenses, financeSourceTransactions]);

  // Receita Líquida (Gross Revenues minus active regime sales taxes)
  const totalNetRevenue = totalRevenues - estimatedActiveTax;

  // Handler de Lançamento Manual
  const handleAddManualTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualAmount) return;

    const parsedAmount = parseFloat(manualAmount);
    if (isNaN(parsedAmount)) return;
    const transactionKind: SmartCardKind = manualType === 'Receita' ? 'payment' : 'expense';
    const transactionId = 'desk_fin_' + Date.now();

    const newTrans: Transaction = {
      id: transactionId,
      establishmentName: manualName,
      amount: parsedAmount,
      date: manualDate,
      category: manualCategory,
      status: 'Confirmado',
      notes: manualNotes + (manualType === 'Receita' ? ' (Entrada manual)' : ' (Saída manual)'),
      type: manualType
    };

    // Atualizar transações e saldo
    setTransactions(prev => [newTrans, ...prev]);
    writeDeskCardFromTransaction(newTrans, transactionKind, manualDate);

    // Reset formulário
    setManualName('');
    setManualAmount('');
    setManualNotes('');
    setIsManualModalOpen(false);
  };

  // Salvar ou Adicionar Lançamento no Calendário (Data Selecionada)
  const handleSaveCalendarTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calFormName || !calFormAmount || !selectedDateFilter) return;

    const parsedAmount = parseFloat(calFormAmount);
    if (isNaN(parsedAmount)) return;

    if (editingTransactionId) {
      // Editar transação existente
      const updatedTransaction: Transaction = {
        id: editingTransactionId,
        establishmentName: calFormName,
        amount: parsedAmount,
        date: selectedDateFilter,
        category: calFormCategory,
        type: calFormType,
        notes: calFormNotes,
        status: 'Confirmado',
      };
      setTransactions(prev => prev.map(t => (t.id === editingTransactionId ? updatedTransaction : t)));
      writeDeskCardFromTransaction(updatedTransaction, calFormType === 'Receita' ? 'payment' : 'expense', selectedDateFilter);
      setEditingTransactionId(null);
    } else {
      // Adicionar nova transação
      const newId = 'desk_fin_' + Date.now();
      const newTrans: Transaction = {
        id: newId,
        establishmentName: calFormName,
        amount: parsedAmount,
        date: selectedDateFilter,
        category: calFormCategory,
        status: 'Confirmado',
        notes: calFormNotes,
        type: calFormType
      };
      setTransactions(prev => [newTrans, ...prev]);
      writeDeskCardFromTransaction(newTrans, calFormType === 'Receita' ? 'payment' : 'expense', selectedDateFilter);
    }

    // Reset dos campos do formulário
    setCalFormName('');
    setCalFormAmount('');
    setCalFormNotes('');
  };

  const handleDeleteCalendarTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    removeDeskCardById(id);
    if (editingTransactionId === id) {
      setEditingTransactionId(null);
      setCalFormName('');
      setCalFormAmount('');
      setCalFormNotes('');
    }
  };

  // Conversão de arquivo para Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
      setAiAnalysisError(null);
    };
    reader.readAsDataURL(file);
  };

  // Invoca endpoint da API do Gemini para analisar recibo
  const handleProcessReceiptWithAI = async () => {
    if (!imageBase64 && !pastedText.trim()) {
      setAiAnalysisError('Por favor, carregue uma imagem ou insira o texto do cupom fiscal.');
      return;
    }

    setIsAIAnalyzing(true);
    setAiAnalysisError(null);
    setAiResult(null);

    try {
      const response = await fetch('/api/gemini/parse-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imageBase64,
          textContent: pastedText.trim() || undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido ao processar o recibo.');
      }

      const parsedJSON = await response.json();
      setAiResult(parsedJSON);
    } catch (err: any) {
      console.error(err);
      setAiAnalysisError(err.message || 'Falha de comunicação com o servidor Gemini. Verifique a chave de API nos Secrets.');
    } finally {
      setIsAIAnalyzing(false);
    }
  };

  // Confirmação de lançamento extraído pela IA
  const handleConfirmAIReceipt = () => {
    if (!aiResult) return;

    const newTrans: Transaction = {
      id: 'trans_ai_' + Date.now(),
      establishmentName: aiResult.establishmentName || 'Recibo Escaneado Coorporativo',
      amount: aiResult.amount || 0,
      date: aiResult.date || '2026-05-31',
      category: (aiResult.category as TransactionCategory) || 'Suprimentos',
      status: 'Confirmado',
      notes: `Lançamento automatizado via IA Gemini do recibo.`,
      items: aiResult.items?.map((it: any, index: number) => ({
        id: `it_${index}`,
        name: it.name || '',
        qty: it.qty || 1,
        price: it.price || 0
      })),
      type: 'Despesa'
    };

    setTransactions(prev => [newTrans, ...prev]);
    writeDeskCardFromTransaction(newTrans, 'expense', aiResult.date || '2026-05-31');

    // Reset e fechamento
    setAiResult(null);
    setImageBase64(null);
    setPastedText('');
    setIsAIScanOpen(false);
  };

  // Excluir Lançamento
  const handleDeleteTransaction = (id: string, amount: number, isRevenue: boolean) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    removeDeskCardById(id);
  };

  // Registrar Funcionário
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName || !employeeRole || !employeeSalary) return;

    const parsedSal = parseFloat(employeeSalary);
    if (isNaN(parsedSal)) return;

    const newEmp: Employee = {
      id: 'emp_' + Date.now(),
      name: employeeName,
      role: employeeRole,
      salary: parsedSal,
      dateHired: employeeHiredDate,
      status: 'Ativo',
      phone: employeePhone.trim() || undefined
    };

    setEmployees(prev => [...prev, newEmp]);
    setEmployeeName('');
    setEmployeeRole('');
    setEmployeeSalary('');
    setEmployeePhone('');
    setIsEmployeeModalOpen(false);
  };

  // Modificar status de funcionário
  const handleToggleEmployeeStatus = (empId: string, currentStatus: Employee['status']) => {
    const nextStatus: Employee['status'] = 
      currentStatus === 'Ativo' ? 'Afastado' : 
      currentStatus === 'Afastado' ? 'Desligado' : 'Ativo';

    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) {
        return { ...emp, status: nextStatus };
      }
      return emp;
    }));
  };

  // Registra saída salarial local (gera transação na aba de caixa e subtrai saldo visual)
  const handlePaySalary = (employee: Employee) => {
    const payTrans: Transaction = {
      id: 'pay_' + Date.now() + '_' + employee.id,
      establishmentName: `Salário Geral: ${employee.name}`,
      amount: employee.salary,
      date: '2026-05-31',
      category: 'Funcionários',
      status: 'Confirmado',
      notes: `Registro local mensal do cargo de ${employee.role}, status: ${employee.status}.`,
      type: 'Despesa'
    };

    setTransactions(prev => [payTrans, ...prev]);
    writeDeskCardFromTransaction(payTrans, 'expense', '2026-05-31');
    
    alert(`Sucesso! Saída local de salário no valor de R$ ${employee.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para ${employee.name} foi registrada na organização local.`);
  };

  const filteredTransactions = financeSourceTransactions.filter(t => {
    // 1. Filtro do Calendário por Data
    if (selectedDateFilter && t.date !== selectedDateFilter) {
      return false;
    }

    // 2. Filtro de Categorias / Fluxo Geral
    if (categoryFilter === 'todos') return true;
    if (categoryFilter === 'receitas') {
      return isRevenue(t);
    }
    if (categoryFilter === 'despesas') {
      return !isRevenue(t);
    }
    return t.category === categoryFilter;
  });

  return (
    <div id="finance-module-root" className="space-y-6">
      {/* Tab Navegation interna */}
      <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          id="btn-tab-caixa"
          onClick={() => setFinanceTab('caixa')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-all flex items-center gap-2 ${
            financeTab === 'caixa'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-655" />
          Organização local de entradas e saídas
        </button>
        <button
          id="btn-tab-func"
          onClick={() => setFinanceTab('funcionarios')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-all flex items-center gap-2 ${
            financeTab === 'funcionarios'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-655" />
          Quadro de Funcionários ({employees.filter(e => e.status === 'Ativo').length} Ativos)
        </button>
        <button
          id="btn-tab-planejamento"
          onClick={() => setFinanceTab('planejamento')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-all flex items-center gap-2 ${
            financeTab === 'planejamento'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Scale className="w-4 h-4 text-orange-600" />
          Ajuda Contábil & Planejamento Tributário
        </button>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-xs font-medium leading-relaxed text-emerald-900">
        Organização local e visual do MVP. Sem banco real, sem integração bancária, sem pagamento real, sem PIX, sem boleto, sem conciliação real com banco e sem valor contábil oficial. Não substitui contador.
      </div>

      {/* RENDER TAB 1: FLUXO DE CAIXA */}
      {financeTab === 'caixa' && (
        <div className="space-y-6">
          
          {/* Bento Grid de Indicadores Financeiros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Saldo Inicial de Caixa (Abertura) */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Saldo de Abertura</span>
                  <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg">
                    <PiggyBank className="w-4 h-4" />
                  </div>
                </div>
                
                {isEditingBalance ? (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-xs font-bold text-gray-500">R$</span>
                    <input
                      type="number"
                      value={tempBalance}
                      onChange={(e) => setTempBalance(e.target.value)}
                      className="border border-gray-300 rounded-lg px-1.5 py-0.5 text-xs font-mono font-bold w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveStartingBalance}
                      title="Salvar"
                      className="p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setTempBalance(cashBalance.toString());
                        setIsEditingBalance(false);
                      }}
                      title="Cancelar"
                      className="p-1 bg-gray-150 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 flex items-baseline gap-1.5 justify-between">
                    <span className="text-lg font-extrabold font-mono text-gray-900 leading-tight">
                      R$ {cashBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => setIsEditingBalance(true)}
                      className="text-[10px] text-blue-600 hover:text-blue-700 underline font-semibold flex items-center gap-0.5 transition"
                    >
                      Ajustar
                    </button>
                  </div>
                )}
              </div>
              <p className="text-[9px] text-gray-400 mt-1.5 leading-tight">
                Referência inicial para o saldo visual local.
              </p>
            </div>

            {/* 2. Entradas Locais Registradas */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Entradas locais registradas</span>
                  <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-1">
                  <span className="text-lg font-extrabold font-mono text-emerald-600 leading-tight">
                    + R$ {totalRevenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-emerald-650 mt-1.5 leading-tight flex items-center gap-0.5 font-medium">
                Soma de todas as entradas do ledger.
              </p>
            </div>

            {/* 3. Receita Líquida (solicitado!) */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block">Receita Líquida</span>
                  <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-1">
                  <span className="text-lg font-extrabold font-mono text-indigo-600 leading-tight">
                    R$ {totalNetRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-indigo-500 mt-1.5 leading-tight">
                Deduzido R$ {estimatedActiveTax.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} provisório ({taxRegime === 'simples' ? `${simplesRate}% simples` : taxRegime})
              </p>
            </div>

            {/* 4. Total de Gastos */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total de Gastos</span>
                  <div className="bg-red-50 text-red-650 p-1.5 rounded-lg">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-1">
                  <span className="text-lg font-extrabold font-mono text-red-650 leading-tight">
                    - R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-red-500 mt-1.5 leading-tight">
                Custos de operação, folha e guias.
              </p>
            </div>

            {/* 5. Saldo Visual Local */}
            <div className="bg-gradient-to-br from-emerald-50/70 to-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between min-h-[120px]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest block">Saldo visual local</span>
                  <div className="bg-emerald-500 text-white p-1.5 rounded-lg">
                    <Banknote className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-1">
                  <span className="text-lg font-black font-mono text-emerald-700 leading-tight">
                    R$ {calculatedBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className="text-[8px] text-emerald-600 font-bold mt-1.5 uppercase tracking-wide leading-tight">
                Fórmula: Inicial + Receitas - Gastos
              </div>
            </div>

          </div>

          {/* Botões de Ação para Transações, Filtros do Calendário e IA */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filtro Rápido:</span>
              <select
                id="select-trans-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 rounded-xl py-1.5 px-3 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all shadow-sm"
              >
                <option value="todos">Todos os Lançamentos / Sem Categoria</option>
                <option value="receitas">Apenas Receitas (Entradas)</option>
                <option value="despesas">Apenas Despesas (Saídas / Débitos)</option>
                <option value="Suprimentos">Suprimentos de estoque</option>
                <option value="Logística">Logística / Fretes</option>
                <option value="Serviços">Serviços corporativos</option>
                <option value="Funcionários">Funcionários / Folha</option>
                <option value="Impostos">Encargos / Impostos</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Tecnologia">Ferramentas / ERP</option>
                <option value="Outros">Apenas Outras Categorias</option>
              </select>

              {selectedDateFilter && (
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in font-medium">
                  <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                  Filtrado pelo dia <strong className="font-mono font-bold">{selectedDateFilter.split('-').reverse().join('/')}</strong>
                  <button 
                    onClick={() => setSelectedDateFilter(null)}
                    className="text-emerald-500 hover:text-emerald-800 focus:outline-none font-bold ml-1"
                    title="Limpar filtro de data"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-scan-recibo-ia"
                onClick={() => setIsAIScanOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:tracking-wide text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Auditor de Recibos IA
              </button>

              <button
                id="btn-novo-lancamento-manual"
                onClick={() => setIsManualModalOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Lançamento Manual
              </button>
            </div>
          </div>

          {/* DUAL DASHBOARD: CALENDÁRIO INTERATIVO À ESQUERDA + TABELAS DE DADOS À DIREITA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* GRID COL 1: O CALENDÁRIO INTERATIVO */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                <div className="flex items-center gap-2 text-gray-800">
                  <CalendarDays className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-sm">Calendário de Fluxo</h3>
                </div>
                
                {/* Controles para Mudar de Mês */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (calendarMonth === 0) {
                        setCalendarMonth(11);
                        setCalendarYear(prev => prev - 1);
                      } else {
                        setCalendarMonth(prev => prev - 1);
                      }
                    }}
                    className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                    title="Mês anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-gray-800 font-mono min-w-[75px] text-center">
                    {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][calendarMonth]} / {calendarYear}
                  </span>
                  <button
                    onClick={() => {
                      if (calendarMonth === 11) {
                        setCalendarMonth(0);
                        setCalendarYear(prev => prev + 1);
                      } else {
                        setCalendarMonth(prev => prev + 1);
                      }
                    }}
                    className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                    title="Próximo mês"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Legenda de Auditoria no Calendário */}
              <div className="flex items-center justify-between text-[10px] text-gray-500 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Recebimentos
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Débitos / Contas
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Ambos no Dia
                </span>
              </div>

              {/* Render do Calendário (Mês Ativo) */}
              <div className="space-y-1.5">
                {/* Dias da Semana Header */}
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-gray-400 py-1 uppercase tracking-wider">
                  <div>Dom</div>
                  <div>Seg</div>
                  <div>Ter</div>
                  <div>Qua</div>
                  <div>Qui</div>
                  <div>Sex</div>
                  <div>Sab</div>
                </div>

                {/* Grid de Dias */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Espaços vazios para o primeiro dia de semana do mês */}
                  {Array.from({ length: new Date(calendarYear, calendarMonth, 1).getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-gray-50/20 rounded-lg"></div>
                  ))}

                  {/* Dias Reais do Mês */}
                  {Array.from({ length: new Date(calendarYear, calendarMonth + 1, 0).getDate() }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    
                    // Identifica transações desse dia específico
                    const dayTx = financeSourceTransactions.filter(t => t.date === dateStr);
                    const hasRecebimento = dayTx.some(isRevenue);
                    const hasDebito = dayTx.some(t => !isRevenue(t));
                    
                    const isSelected = selectedDateFilter === dateStr;

                    // Cor do marcador
                    let indicatorClass = "bg-transparent";
                    if (hasRecebimento && hasDebito) {
                      indicatorClass = "bg-indigo-500";
                    } else if (hasRecebimento) {
                      indicatorClass = "bg-emerald-500";
                    } else if (hasDebito) {
                      indicatorClass = "bg-rose-500";
                    }

                    return (
                      <button
                        key={`day-${dayNum}`}
                        onClick={() => setSelectedDateFilter(isSelected ? null : dateStr)}
                        className={`aspect-square relative rounded-xl flex flex-col items-center justify-center transition-all focus:outline-none ${
                          isSelected
                            ? 'bg-slate-900 text-white font-bold ring-2 ring-emerald-500 shadow'
                            : dayTx.length > 0 
                              ? 'bg-slate-100 hover:bg-slate-200 text-gray-800 font-semibold border border-slate-300/40' 
                              : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-100'
                        }`}
                        title={dayTx.length > 0 ? `${dayTx.length} lançamento(s) em ${dateStr}` : `Sem lançamentos`}
                      >
                        <span className="text-xs">{dayNum}</span>
                        
                        {/* Indicador de Status Visual do Dia */}
                        {dayTx.length > 0 && (
                          <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${indicatorClass}`}></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informação Operacional e Resumo do Dia Selecionado */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2 mt-4 text-xs">
                {selectedDateFilter ? (
                  (() => {
                    const matched = financeSourceTransactions.filter(t => t.date === selectedDateFilter);
                    const receiptsSum = matched.filter(isRevenue).reduce((sum, t) => sum + t.amount, 0);
                    const debitsSum = matched.filter(t => !isRevenue(t)).reduce((sum, t) => sum + t.amount, 0);

                    return (
                      <>
                        <p className="font-bold text-gray-700 flex items-center justify-between">
                          <span>Data Selecionada:</span>
                          <span className="font-mono text-emerald-700 font-extrabold">
                            {selectedDateFilter.split('-').reverse().join('/')}
                          </span>
                        </p>
                        <hr className="border-gray-200 my-1" />
                        <div className="space-y-1">
                          <p className="flex justify-between font-medium">
                            <span className="text-gray-500">Monto Recebido:</span>
                            <span className="text-emerald-600 font-mono font-semibold">+ R$ {receiptsSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </p>
                          <p className="flex justify-between font-medium">
                            <span className="text-gray-500">Monto Debitado:</span>
                            <span className="text-rose-500 font-mono font-semibold">- R$ {debitsSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </p>
                          <hr className="border-gray-200 my-1" />
                          <p className="flex justify-between font-bold text-gray-850">
                            <span>Balanço Diário:</span>
                            <span className={`font-mono ${receiptsSum - debitsSum >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              R$ {(receiptsSum - debitsSum).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </p>
                        </div>

                        {/* Botão de Edição do Calendário */}
                        <div className="pt-2">
                          <button
                            type="button"
                            id="btn-edit-cal-day"
                            onClick={() => {
                              setIsCalendarEditModalOpen(true);
                              setEditingTransactionId(null);
                              setCalFormType('Despesa');
                              setCalFormName('');
                              setCalFormAmount('');
                              setCalFormCategory('Suprimentos');
                              setCalFormNotes('');
                            }}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            Editar Lançamentos do Dia
                          </button>
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <p className="text-gray-500 italic text-center font-medium py-2">
                    Clique em qualquer quadrado do calendário para analisar as entradas e saídas físicas daquele dia.
                  </p>
                )}
              </div>
            </div>

            {/* GRID COL 2: TABELAS DE DADOS PARALELAS PARA CADA FILTRO */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Seleção do Filtro Direcional das Tabelas */}
              <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedTableTab('geral')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                    selectedTableTab === 'geral' 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  Registro local de caixa ({financeSourceTransactions.length})
                </button>
                <button
                  onClick={() => setSelectedTableTab('recebimentos')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                    selectedTableTab === 'recebimentos' 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-transparent text-emerald-600 hover:bg-emerald-50/40'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Recebimentos ({financeSourceTransactions.filter(isRevenue).length})
                </button>
                <button
                  onClick={() => setSelectedTableTab('debitos')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                    selectedTableTab === 'debitos' 
                      ? 'bg-rose-600 text-white shadow-sm' 
                      : 'bg-transparent text-rose-600 hover:bg-rose-50/40'
                  }`}
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  Débitos / Contas ({financeSourceTransactions.filter(t => !isRevenue(t)).length})
                </button>
                <button
                  onClick={() => setSelectedTableTab('categorias_todas')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                    selectedTableTab === 'categorias_todas' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-transparent text-indigo-600 hover:bg-indigo-50/40'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Por Categorias
                </button>
              </div>

              {/* RENDER DYNAMIC TABLES */}
              
              {/* TABELA DE DADOS 1: LIVRO CAIXA GERAL */}
              {selectedTableTab === 'geral' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
                  <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">Lista local consolidada</h4>
                      <p className="text-[11px] text-gray-400">Todos os fluxos contábeis correspondentes aos critérios de busca.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => exportTransactionsCSV(filteredTransactions)}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold border border-gray-200 text-slate-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Exportar planilha Excel / CSV"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        CSV
                      </button>
                      <button
                        onClick={() => exportTransactionsPDF(filteredTransactions)}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold border border-rose-100 text-rose-700 hover:bg-rose-50/50 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Exportar documento PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-rose-500" />
                        PDF
                      </button>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-1.5 rounded-lg font-mono">
                        {filteredTransactions.length} itens encontrados
                      </span>
                    </div>
                  </div>

                  {filteredTransactions.length === 0 ? (
                    <div className="p-12 text-center">
                      <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-400">Nenhuma movimentação encontrada.</p>
                      {selectedDateFilter && (
                        <button 
                          onClick={() => setSelectedDateFilter(null)}
                          className="mt-3 text-xs font-semibold text-emerald-600 hover:underline"
                        >
                          Limpar filtro de data
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-400 uppercase text-[9px] tracking-wider font-semibold border-b border-gray-100">
                            <th className="py-3 px-5">Data</th>
                            <th className="py-3 px-5">Descrição / Nota</th>
                            <th className="py-3 px-5">Categoria</th>
                            <th className="py-3 px-5 text-right">Valor</th>
                            <th className="py-3 px-5 text-center">Status</th>
                            <th className="py-3 px-5 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className={`${getFontSize('xs')} divide-y divide-gray-100`}>
                          {filteredTransactions.map((t) => {
                            const isRev = isRevenue(t);
                            return (
                              <tr 
                                key={t.id} 
                                onClick={() => setSelectedTransactionDetail(t)}
                                className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                                title="Clique para ver os detalhes contábeis amplificados"
                              >
                                <td className="py-4 px-5 font-mono text-gray-400 whitespace-nowrap">{t.date}</td>
                                <td className="py-4 px-5">
                                  <div className="space-y-0.5">
                                    <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                      {t.establishmentName}
                                      <span className="ml-2 text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity font-sans font-normal">(Clique para ampliar)</span>
                                    </p>
                                    {t.notes && <p className="text-[11px] text-gray-400 max-w-sm truncate">{t.notes}</p>}
                                    {t.items && t.items.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {t.items.map((it) => (
                                          <span key={it.id} className="bg-slate-100 text-[#475569] font-mono text-[9px] px-1.5 py-0.5 rounded">
                                            {it.name} ({it.qty}x)
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-5">
                                  <span className="bg-slate-100 text-slate-700 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full">
                                    {t.category}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-right font-mono font-bold">
                                  <span className={isRev ? 'text-emerald-600' : 'text-rose-500'}>
                                    {isRev ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-center whitespace-nowrap">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold leading-none px-2 py-1 rounded-full ${
                                    t.status === 'Confirmado' 
                                      ? 'bg-green-50 text-green-700' 
                                      : 'bg-amber-50 text-amber-700'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'Confirmado' ? 'bg-green-600' : 'bg-amber-600'}`}></span>
                                    {t.status}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleDeleteTransaction(t.id, t.amount, isRev)}
                                    className="text-gray-400 hover:text-red-600 p-1 rounded-lg transition-colors"
                                    title="Remover transação"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TABELA DE DADOS 2: APENAS RECEBIMENTOS */}
              {selectedTableTab === 'recebimentos' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in border-l-4 border-l-emerald-500">
                  <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        Tabela de Controle de Recebimentos / Faturamento bruto
                      </h4>
                      <p className="text-[11px] text-gray-400">Entradas locais registradas para conferência visual.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => exportTransactionsCSV(filteredTransactions.filter(isRevenue))}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold border border-emerald-100 text-emerald-700 hover:bg-emerald-50/50 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Exportar Recebimentos em CSV"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        CSV
                      </button>
                      <button
                        onClick={() => exportTransactionsPDF(filteredTransactions.filter(isRevenue))}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold border border-rose-100 text-rose-700 hover:bg-rose-50/50 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Exportar Recebimentos em PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-rose-500" />
                        PDF
                      </button>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1.5 rounded-lg font-mono">
                        Faturamento: + R$ {totalRevenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {(() => {
                    const matchedRevenues = filteredTransactions.filter(isRevenue);
                    if (matchedRevenues.length === 0) {
                      return (
                        <div className="p-12 text-center text-gray-400">
                          <TrendingUp className="w-10 h-10 text-emerald-100 mx-auto mb-2" />
                          <p className="text-xs">Nenhuma entrada local registrada para os filtros indicados.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-emerald-50/30 text-emerald-800 uppercase text-[9px] tracking-wider font-semibold border-b border-emerald-50/50">
                              <th className="py-3 px-5">Data Recebimento</th>
                              <th className="py-3 px-5">Descrição da Fonte</th>
                              <th className="py-3 px-5">Notas de Custódia</th>
                              <th className="py-3 px-5 text-right">Monto Bruto</th>
                              <th className="py-3 px-5 text-right">Ações</th>
                            </tr>
                          </thead>
                          <tbody className={`${getFontSize('xs')} divide-y divide-gray-100`}>
                            {matchedRevenues.map((t) => (
                              <tr 
                                key={t.id} 
                                onClick={() => setSelectedTransactionDetail(t)}
                                className="hover:bg-emerald-50/20 transition-colors cursor-pointer group"
                                title="Clique para ver os detalhes contábeis amplificados"
                              >
                                <td className="py-4 px-5 font-mono text-gray-400">{t.date}</td>
                                <td className="py-4 px-5">
                                  <p className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                                    {t.establishmentName}
                                    <span className="ml-2 text-[10px] text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity font-sans font-normal">(Clique para ampliar)</span>
                                  </p>
                                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded font-mono">
                                    {t.category}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-gray-500 italic max-w-xs truncate">{t.notes || 'Entrada regular direta'}</td>
                                <td className="py-4 px-5 text-right font-mono font-bold text-emerald-600">
                                  + R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleDeleteTransaction(t.id, t.amount, true)}
                                    className="text-gray-400 hover:text-red-600 p-1 rounded-lg transition-colors"
                                    title="Remover venda"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TABELA DE DADOS 3: APENAS DÉBITOS / DESPESAS */}
              {selectedTableTab === 'debitos' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in border-l-4 border-l-rose-500">
                  <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                        <TrendingDown className="w-4 h-4 text-rose-500" />
                        Tabela de Débitos e Obrigações Fiscais
                      </h4>
                      <p className="text-[11px] text-gray-400">Total de saídas de fornecedores, fretes corporativos, tecnologia e folha.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => exportTransactionsCSV(filteredTransactions.filter(t => !isRevenue(t)))}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold border border-rose-100 text-rose-700 hover:bg-rose-50/50 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Exportar Débitos em CSV"
                      >
                        <Download className="w-3.5 h-3.5 text-rose-500" />
                        CSV
                      </button>
                      <button
                        onClick={() => exportTransactionsPDF(filteredTransactions.filter(t => !isRevenue(t)))}
                        className="py-1.5 px-3 rounded-lg text-xs font-bold border border-rose-100 text-rose-700 hover:bg-rose-50/50 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Exportar Débitos em PDF"
                      >
                        <FileText className="w-3.5 h-3.5 text-rose-500" />
                        PDF
                      </button>
                      <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-1.5 rounded-lg font-mono">
                        Débitos: - R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {(() => {
                    const matchedDebits = filteredTransactions.filter(t => !isRevenue(t));
                    if (matchedDebits.length === 0) {
                      return (
                        <div className="p-12 text-center text-gray-400">
                          <TrendingDown className="w-10 h-10 text-rose-100 mx-auto mb-2" />
                          <p className="text-xs">Nenhum débito pendente ou registrado para os filtros indicados.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-rose-50/30 text-rose-800 uppercase text-[9px] tracking-wider font-semibold border-b border-rose-50/50">
                              <th className="py-3 px-5">Vencimento</th>
                              <th className="py-3 px-5">Credor / Beneficiário</th>
                              <th className="py-3 px-5">Categoria Tributária</th>
                              <th className="py-3 px-5 text-right">Monto Líquido</th>
                              <th className="py-3 px-5 text-right">Remover</th>
                            </tr>
                          </thead>
                          <tbody className={`${getFontSize('xs')} divide-y divide-gray-100`}>
                            {matchedDebits.map((t) => (
                              <tr 
                                key={t.id} 
                                onClick={() => setSelectedTransactionDetail(t)}
                                className="hover:bg-rose-50/20 transition-colors cursor-pointer group"
                                title="Clique para ver os detalhes contábeis amplificados"
                              >
                                <td className="py-4 px-5 font-mono text-gray-400">{t.date}</td>
                                <td className="py-4 px-5">
                                  <p className="font-bold text-gray-800 group-hover:text-rose-700 transition-colors">
                                    {t.establishmentName}
                                    <span className="ml-2 text-[10px] text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity font-sans font-normal">(Clique para ampliar)</span>
                                  </p>
                                  {t.notes && <p className="text-[11px] text-gray-400 truncate max-w-xs">{t.notes}</p>}
                                </td>
                                <td className="py-4 px-5">
                                  <span className="bg-rose-50 text-rose-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                                    {t.category}
                                  </span>
                                </td>
                                <td className="py-4 px-5 text-right font-mono font-bold text-rose-600">
                                  - R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    onClick={() => handleDeleteTransaction(t.id, t.amount, false)}
                                    className="text-gray-400 hover:text-rose-650 p-1 rounded-lg transition-colors"
                                    title="Remover débito"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TABELA DE DADOS 4: SEPARADO EM TABELAS PARA CADA UM DOS FILTROS DE CATEGORIA */}
              {selectedTableTab === 'categorias_todas' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div className="bg-white p-4 rounded-xl border border-gray-100 text-xs text-gray-500 font-medium">
                    As transações abaixo estão segmentadas em <strong>tabelas independentes para cada filtro local</strong> cadastrado na organização visual.
                  </div>

                  {(['Suprimentos', 'Logística', 'Serviços', 'Funcionários', 'Impostos', 'Alimentação', 'Tecnologia', 'Outros'] as TransactionCategory[]).map((catName) => {
                    const catTxList = filteredTransactions.filter(t => t.category === catName);
                    
                    return (
                      <div key={catName} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden border-t-2 border-t-indigo-500">
                        <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                          <h5 className="font-extrabold text-xs uppercase text-gray-700 flex items-center gap-1.5 font-mono">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            Tabela de {catName}
                          </h5>
                          <span className="text-xs text-gray-400 font-bold font-mono">
                            {catTxList.length} itens {catTxList.length > 0 && `• R$ ${catTxList.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                          </span>
                        </div>

                        {catTxList.length === 0 ? (
                          <p className="p-5 text-center text-xs text-gray-400 italic">Nenhum registro interno de organização classificado nesta categoria.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-100/40 text-gray-400 uppercase text-[9px] tracking-wider font-semibold border-b border-gray-100">
                                  <th className="py-2.5 px-4">Data</th>
                                  <th className="py-2.5 px-4">Estabelecimento / Nota</th>
                                  <th className="py-2.5 px-4 text-right">Valor Líquido</th>
                                  <th className="py-2.5 px-4 text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody className={`${getFontSize('xs')} divide-y divide-gray-100`}>
                                {catTxList.map((t) => {
                                  const isRev = isRevenue(t);
                                  return (
                                    <tr 
                                      key={t.id} 
                                      onClick={() => setSelectedTransactionDetail(t)}
                                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                      title="Clique para ver os detalhes contábeis amplificados"
                                    >
                                      <td className="py-3 px-4 font-mono text-[11px] text-gray-400 whitespace-nowrap">{t.date}</td>
                                      <td className="py-3 px-4">
                                        <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                          {t.establishmentName}
                                          <span className="ml-2 text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity font-sans font-normal">(Clique para ampliar)</span>
                                        </p>
                                        {t.notes && <p className="text-[11px] text-gray-405 italic">{t.notes}</p>}
                                      </td>
                                      <td className="py-3 px-4 text-right font-mono font-bold">
                                        <span className={isRev ? 'text-emerald-600' : 'text-slate-805'}>
                                          {isRev ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 text-center">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                          t.status === 'Confirmado' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                          {t.status}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* RENDER TAB 2: GESTÃO DE FUNCIONÁRIOS */}
      {financeTab === 'funcionarios' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
              <h3 className="text-base font-semibold text-gray-800">Custo Operacional Mensal de Equipe</h3>
              <p className="text-xs text-gray-500">
                Total consolidado em contratações: R$ {employees.reduce((sum, e) => sum + (e.status === 'Ativo' ? e.salary : 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <button
              id="btn-abrir-func-modal"
              onClick={() => setIsEmployeeModalOpen(true)}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Contratar Funcionário
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {employees.map((emp) => (
              <div 
                key={emp.id} 
                onClick={() => setSelectedEmployeeDetail(emp)}
                className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm hover:shadow-lg hover:border-indigo-200 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden"
                title="Clique para ver a ficha local detalhada do funcionário"
              >
                <div className="absolute right-0 top-0 bg-indigo-50 text-indigo-700 text-[9px] font-bold px-2 py-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity">
                  Clique para ampliar
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                      emp.status === 'Ativo' ? 'bg-green-50 text-green-700' :
                      emp.status === 'Afastado' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {emp.status}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">ID: {emp.id}</span>
                  </div>

                  <h4 className="font-bold text-gray-800 text-base group-hover:text-indigo-600 transition-colors">{emp.name}</h4>
                  
                  <div className={`space-y-2 my-4 ${getFontSize('xs')} text-gray-650`}>
                    <p className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-405" />
                      Cargo: <strong className="text-gray-800 font-bold">{emp.role}</strong>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-444" />
                      Admissão: <span className="font-mono">{emp.dateHired}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      Salário Base: <strong className="text-emerald-700 font-extrabold font-mono">
                        R$ {emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </strong>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                      WhatsApp: <b className="font-mono text-gray-800">{emp.phone || 'Não informado'}</b>
                    </p>
                  </div>
                </div>

                 <div 
                   className="border-t border-gray-100 pt-3 mt-2 flex items-center justify-between gap-2"
                   onClick={(e) => e.stopPropagation()}
                 >
                   <button
                     id={`btn-toggle-status-emp-${emp.id}`}
                     onClick={() => handleToggleEmployeeStatus(emp.id, emp.status)}
                     className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 rounded-lg px-2.5 py-1.5 transition-colors"
                   >
                     Alterar Status
                   </button>

                   <button
                     id={`btn-pay-salary-${emp.id}`}
                     disabled={emp.status !== 'Ativo'}
                     onClick={() => handlePaySalary(emp)}
                     className={`text-xs font-semibold rounded-lg px-3 py-1.5 flex items-center gap-1 transition-colors ${
                       emp.status === 'Ativo' 
                         ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                         : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                     }`}
                   >
                     <Banknote className="w-3.5 h-3.5" />
                     Registrar saída local de salário
                   </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: NOVO LANÇAMENTO MANUAL */}
      {isManualModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200"
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Novo Lançamento Financeiro
              </h4>
              <button onClick={() => setIsManualModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualTransaction} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Tipo de Fluxo</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setManualType('Receita')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      manualType === 'Receita' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    Receita (entrada local)
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualType('Despesa')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      manualType === 'Despesa'
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    Despesa (saída local registrada)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Nome / Estabelecimento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fornecedor de Grãos Ltda, Cemig, etc"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Categoria de Lançamento</label>
                <select
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value as TransactionCategory)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Suprimentos">Suprimentos de estoque</option>
                  <option value="Logística">Logística / Transporte</option>
                  <option value="Serviços">Prestação de serviços</option>
                  <option value="Funcionários">Funcionários / Encargos</option>
                  <option value="Impostos">Impostos / Tarifas</option>
                  <option value="Alimentação">Alimentação corporativa</option>
                  <option value="Tecnologia">Sistemas e TI</option>
                  <option value="Outros">Outras categorias</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Observações adicionais (opcional)</label>
                <textarea
                  placeholder="Ex: Compra urgente para reposição emergencial ou reparo predial"
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="w-1/2 border border-gray-200 text-gray-500 rounded-xl py-2 px-4 text-xs font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-2 px-4 text-xs font-semibold transition"
                >
                  Registrar Lançamento
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: CONTRATAR FUNCIONÁRIO */}
      {isEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-200"
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Novas Contratações (Equipe)
              </h4>
              <button onClick={() => setIsEmployeeModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do colaborador"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Cargo / Função</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Auxiliar de Logística, Técnico Fiscal"
                  value={employeeRole}
                  onChange={(e) => setEmployeeRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Salário Comercial (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Min: 1412.00"
                    value={employeeSalary}
                    onChange={(e) => setEmployeeSalary(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Data de Admissão</label>
                  <input
                    type="date"
                    required
                    value={employeeHiredDate}
                    onChange={(e) => setEmployeeHiredDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">WhatsApp / Telefone (DDI + DDD, Ex: 5511999999999)</label>
                <input
                  type="text"
                  placeholder="Ex: 5511999999999"
                  value={employeePhone}
                  onChange={(e) => setEmployeePhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                />
                <p className="text-[10px] text-gray-400 mt-1">Insira apenas números com código de país e DDD para encaminhar instruções pelo WhatsApp.</p>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEmployeeModalOpen(false)}
                  className="w-1/2 border border-gray-200 text-gray-500 rounded-xl py-2 px-4 text-xs font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-2 px-4 text-xs font-semibold transition"
                >
                  Registrar Colaborador
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL: EDITAR LANÇAMENTOS DO DIA SELECIONADO */}
      {isCalendarEditModalOpen && selectedDateFilter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-sm md:text-base">
                    Gestão de Fluxo Diário: {selectedDateFilter.split('-').reverse().join('/')}
                  </h4>
                  <p className="text-[10px] text-slate-300">
                    Insira receitas ou débitos para esta data (passada ou futura) com persistência multiusuário.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsCalendarEditModalOpen(false);
                  setEditingTransactionId(null);
                  setCalFormName('');
                  setCalFormAmount('');
                  setCalFormNotes('');
                }} 
                className="text-slate-300 hover:text-white transition-colors p-1"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body: Split layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 max-h-[70vh] overflow-y-auto">
              
              {/* Left Column: List of existing transactions on this day */}
              <div className="p-5 space-y-4">
                <h5 className="font-bold text-xs uppercase text-gray-500 tracking-wider flex items-center justify-between">
                  <span>Lançamentos Registrados ({financeSourceTransactions.filter(t => t.date === selectedDateFilter).length})</span>
                  <span className="font-mono text-xs text-gray-400">Ativos no dia</span>
                </h5>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {(() => {
                    const matched = financeSourceTransactions.filter(t => t.date === selectedDateFilter);
                    if (matched.length === 0) {
                      return (
                        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl px-4">
                          <p className="text-gray-400 italic text-xs">
                            Nenhum recebimento ou débito registrado para este dia.
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            Preencha o formulário ao lado para fazer o lançamento.
                          </p>
                        </div>
                      );
                    }

                    return matched.map(tx => {
                      const isRev = isRevenue(tx);
                      return (
                        <div 
                          key={tx.id} 
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                            editingTransactionId === tx.id 
                              ? 'bg-indigo-50 border-indigo-200' 
                              : 'bg-slate-50/50 hover:bg-slate-50 border-gray-100'
                          }`}
                        >
                          <div className="space-y-0.5 overflow-hidden">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                isRev 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isRev ? 'Receita' : 'Débito'}
                              </span>
                              <span className="text-[10px] text-gray-400 uppercase font-semibold">
                                {tx.category}
                              </span>
                            </div>
                            <p className="font-bold text-xs truncate text-gray-800" title={tx.establishmentName}>
                              {tx.establishmentName}
                            </p>
                            {tx.notes && (
                              <p className="text-[10px] text-gray-400 truncate max-w-xs">{tx.notes}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`font-mono text-xs font-extrabold ${isRev ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {isRev ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingTransactionId(tx.id);
                                  setCalFormType(isRev ? 'Receita' : 'Despesa');
                                  setCalFormName(tx.establishmentName);
                                  setCalFormAmount(tx.amount.toString());
                                  setCalFormCategory(tx.category);
                                  setCalFormNotes(tx.notes || '');
                                }}
                                className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                title="Editar lançamento"
                              >
                                <Sliders className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCalendarTransaction(tx.id)}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Excluir lançamento"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Right Column: Form to Add/Edit */}
              <form onSubmit={handleSaveCalendarTransaction} className="p-5 space-y-4">
                <h5 className="font-bold text-xs uppercase text-gray-500 tracking-wider flex items-center justify-between">
                  <span>
                    {editingTransactionId ? '✏️ Editando Lançamento' : '✨ Novo Lançamento'}
                  </span>
                  {editingTransactionId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTransactionId(null);
                        setCalFormName('');
                        setCalFormAmount('');
                        setCalFormNotes('');
                      }}
                      className="text-[10px] font-bold text-red-500 hover:underline hover:text-red-700"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </h5>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Tipo de Lançamento</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalFormType('Receita')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        calFormType === 'Receita' 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Recebimento / Entrada
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalFormType('Despesa')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        calFormType === 'Despesa' 
                          ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Débito / Saída
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                    Nome / Estabelecimento / Origem
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cemig, Venda Cliente X, Fornecedor Sabor"
                    value={calFormName}
                    onChange={(e) => setCalFormName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                      Valor Comercial (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={calFormAmount}
                      onChange={(e) => setCalFormAmount(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                      Categoria do Fluxo
                    </label>
                    <select
                      value={calFormCategory}
                      onChange={(e) => setCalFormCategory(e.target.value as TransactionCategory)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white font-bold"
                    >
                      <option value="Suprimentos">Suprimentos</option>
                      <option value="Logística">Logística / Fretes</option>
                      <option value="Serviços">Serviços corporativos</option>
                      <option value="Funcionários">Funcionários / Folha</option>
                      <option value="Impostos">Encargos / Impostos</option>
                      <option value="Alimentação">Alimentação</option>
                      <option value="Tecnologia">Ferramentas / ERP</option>
                      <option value="Faturamento Misto">Faturamento Misto</option>
                      <option value="Outros">Outras categorias</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                    Detalhes / Notas
                  </label>
                  <textarea
                    placeholder="Ex: referência local de cobrança"
                    rows={2}
                    value={calFormNotes}
                    onChange={(e) => setCalFormNotes(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 ${
                      editingTransactionId 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : calFormType === 'Receita' 
                          ? 'bg-emerald-600 hover:bg-emerald-700' 
                          : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    {editingTransactionId ? 'Salvar Alterações' : 'Confirmar & Lançar no Dia'}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsCalendarEditModalOpen(false);
                  setEditingTransactionId(null);
                  setCalFormName('');
                  setCalFormAmount('');
                  setCalFormNotes('');
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl py-2 px-6 text-xs transition"
              >
                Concluir & Atualizar Painéis
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* RENDER TAB 3: AJUDA CONTÁBIL E PLANEJAMENTO TRIBUTÁRIO */}
      {financeTab === 'planejamento' && (
        <div className="space-y-6 animate-fade-in text-gray-800">
          
          {selectedPlan !== 'media' && selectedPlan !== 'corporativo' ? (
            <div className={`p-10 border rounded-3xl text-center space-y-4 ${
              theme === 'dark' ? 'bg-[#15151a] border-[#222228]' : 'bg-white border-slate-200'
            }`}>
              <div className="inline-flex justify-center p-4 bg-indigo-500/10 rounded-full mb-2">
                <Scale className="w-10 h-10 text-indigo-500" />
              </div>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Conselheiro Contábil e Planejamento Tributário
              </h3>
              <p className={`max-w-xl mx-auto text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Este módulo avançado com Inteligência Artificial simula lembretes internos de organização, IRPJ de referência, folha salarial local e saúde financeira em visual local.
              </p>
              <div className="pt-4">
                <span className={`inline-block mb-3 px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest ${theme === 'dark' ? 'bg-indigo-900/40 text-indigo-400' : 'bg-indigo-100 text-indigo-700'}`}>
                  Disponível apenas no Plano Premium
                </span>
              </div>
              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.pathname = '/';
                  window.location.href = url.toString();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl transition cursor-pointer"
              >
                Fazer Upgrade
              </button>
            </div>
          ) : (
            <>
          {/* Banner de Apresentação Educativa */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 max-w-2xl">
              <span className="bg-orange-100 text-orange-850 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Conselheiro Contábil Inteligente
              </span>
              <h3 className="text-base font-extrabold text-orange-950">Módulo de Organização e Planejamento de Impostos</h3>
              <p className="text-xs text-orange-900/80 leading-relaxed">
                Este assistente analisa os recebimentos atuais de <strong>R$ {totalRevenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> lançados na organização local e o quadro de equipe para estimar lembretes internos de organização, referências tributárias de estoque (ICMS) e preparar a folha subsequente para contador.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-orange-200/50 flex-shrink-0">
              <Scale className="w-5 h-5 text-orange-600 animate-pulse" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-sans font-bold">Saúde Fiscal</p>
                <p className="text-xs font-bold text-gray-850">Painel Ativo</p>
              </div>
            </div>
          </div>

          {/* Cálculos Prévios Auxiliares */}
          {(() => {
            // Helper de Preços Recomendados Est.
            const getProductEstimatedPrice = (productName: string) => {
              const name = productName.toLowerCase();
              if (name.includes('leite')) return 6.50;
              if (name.includes('farinha')) return 5.80;
              if (name.includes('molho')) return 4.20;
              if (name.includes('arroz')) return 29.90;
              if (name.includes('iogurte')) return 3.80;
              if (name.includes('azeite')) return 42.00;
              return 15.00;
            };

            // Helper de Alíquota Base por Categoria
            const getProductIcmsRateByCatName = (category: string) => {
              const cat = (category || '').toLowerCase();
              if (cat.includes('latic') || cat.includes('queijo') || cat.includes('iog')) return icmsAlimentos;
              if (cat.includes('grão') || cat.includes('arroz') || cat.includes('cere') || cat.includes('farinha')) return icmsAlimentos;
              if (cat.includes('eletr') || cat.includes('tecn') || cat.includes('comput')) return icmsEletronicos;
              if (cat.includes('limp') || cat.includes('hig') || cat.includes('deter') || cat.includes('conservas') || cat.includes('sach')) return icmsLimpeza;
              if (cat.includes('bebida') || cat.includes('refre') || cat.includes('alco') || cat.includes('suco')) return icmsBebidas;
              if (cat.includes('med') || cat.includes('farm') || cat.includes('saud')) return icmsMedicamento;
              return icmsOutros;
            };

            // Folha e custos trabalhistas
            const activeEmployees = employees.filter(e => e.status === 'Ativo');
            const totalActiveSalaries = activeEmployees.reduce((sum, e) => sum + e.salary, 0);
            const computedInssCost = totalActiveSalaries * (inssPatronalRate / 100);
            const computedFgtsCost = totalActiveSalaries * (fgtsRate / 100);
            const totalStaffCostWithTaxes = totalActiveSalaries + computedInssCost + computedFgtsCost;

            // Faturamento de Serviços da Categoria Serviços/Tecnologia para ISS
            const servicesAmount = financeSourceTransactions
              .filter(t => t.category === 'Serviços' || t.category === 'Tecnologia')
              .reduce((sum, t) => sum + t.amount, 0);
            const estimatedIssTaxOnServices = servicesAmount * 0.05; // ISS fixado em 5%

            // CUSTO DO IMPOSTO DE ESTABELECIMENTO EM CADA UM DOS TRÊS REGIMES BRASILEIROS:
            const simplesTotal = totalRevenues * (simplesRate / 100);
            
            // Lucro Presumido Estimado
            const pisPresumido = totalRevenues * 0.0065;
            const cofinsPresumido = totalRevenues * 0.0300;
            const irpjPresumido = totalRevenues * 0.0120; // 15% sobre a presunção legal de 8% de margem
            const csllPresumido = totalRevenues * 0.0108; // 9% sobre a presunção legal de 12% de margem
            const issIcmsPresumido = totalRevenues * 0.0150; // ICMS/ISS médio estimado sob presumido
            const presumidoTotal = pisPresumido + cofinsPresumido + irpjPresumido + csllPresumido + issIcmsPresumido;

            // Regime de referência local
            const netMarginBeforeTaxes = totalRevenues - totalExpenses;
            let irpjCSLLReal = 0;
            if (netMarginBeforeTaxes > 0) {
              irpjCSLLReal = netMarginBeforeTaxes * 0.24; // IRPJ (15%) + CSLL (9%) sobre a referência local apurada
            }
            const pisCofinsReal = totalRevenues * 0.0450; // Alíquota sob referência local considerando 50% de crédito compensatório
            const realTotal = irpjCSLLReal + pisCofinsReal + estimatedIssTaxOnServices;

            // Regime recomendado
            let recommendedRegimeName = "Simples Nacional";
            let recommendedAmountValue = simplesTotal;
            if (presumidoTotal < recommendedAmountValue) {
              recommendedRegimeName = "Lucro Presumido";
              recommendedAmountValue = presumidoTotal;
            }
            if (realTotal < recommendedAmountValue) {
              recommendedRegimeName = "Regime de referência local (menor referência calculada)";
              recommendedAmountValue = realTotal;
            }

            // Imposto ativo selecionado
            let activeRegimeTaxCalculated = simplesTotal;
            if (taxRegime === 'presumido') activeRegimeTaxCalculated = presumidoTotal;
            if (taxRegime === 'real') activeRegimeTaxCalculated = realTotal;

            // Estatísticas de Imposto de Produtos em estoque
            const productsValuationList = products.map(p => {
              const estimatedUnitPrice = getProductEstimatedPrice(p.name);
              const val = p.qty * estimatedUnitPrice;
              const rate = getProductIcmsRateByCatName(p.category);
              const taxVal = val * (rate / 100);
              return { ...p, estimatedUnitPrice, val, rate, taxVal };
            });

            const totalStockValue = productsValuationList.reduce((sum, p) => sum + p.val, 0);
            const totalStockTaxesSimulated = productsValuationList.reduce((sum, p) => sum + p.taxVal, 0);

            // Planejamento de Provisões para Junho de 2026
            const totalRequiredUpcomingCompromises = totalActiveSalaries + computedFgtsCost + computedInssCost + activeRegimeTaxCalculated;
            const grandTotalPlanningThresholdWithReserve = totalRequiredUpcomingCompromises;

            // Porcentagem de saúde do caixa
            const walletLiquidityPercentage = grandTotalPlanningThresholdWithReserve > 0 
              ? Math.min(100, Math.round((calculatedBalance / grandTotalPlanningThresholdWithReserve) * 100))
              : 100;

            return (
              <>
                {/* 1. BENTO-GRID DE DIAGNÓSTICO INTEGRADO */}
                <div className={`grid grid-cols-1 ${((selectedPlan as string) === 'micro' || (selectedPlan as string) === 'pequena') ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-5`}>
                  
                  {/* Card Faturamento Tributável */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Faturamento Sujeito a ISS/ICMS</span>
                      <p className="text-2xl font-extrabold font-mono text-slate-900">
                        R$ {totalRevenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] text-gray-405 flex items-center gap-1">
                        <Info className="w-3 h-3 text-sky-500" /> Calculado sobre recebimentos
                      </p>
                    </div>
                    <div className="bg-slate-50 text-slate-700 p-3 rounded-xl border border-gray-100">
                      <Coins className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>

                  {!((selectedPlan as string) === 'micro' || (selectedPlan as string) === 'pequena') && (
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Valor do ICMS Retido em Estoque</span>
                        <p className="text-2xl font-extrabold font-mono text-orange-600">
                          R$ {totalStockTaxesSimulated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-gray-405">
                          Sobre <strong>R$ {totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> de mercadorias
                        </p>
                      </div>
                      <div className="bg-orange-50 text-orange-700 p-3 rounded-xl border border-orange-100">
                        <Percent className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  )}

                  {/* Card Regime de Menor Alíquota por IA */}
                  <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-sm flex items-center justify-between relative overflow-hidden">
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                      <Scale className="w-24 h-24" />
                    </div>
                    <div className="space-y-1 z-10">
                      <span className="text-[9px] text-indigo-300 font-extrabold uppercase tracking-widest block flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400 animate-bounce" /> Recomendação Contábil
                      </span>
                      <h4 className="text-xs font-bold text-white uppercase font-mono max-w-[140px] truncate">{recommendedRegimeName}</h4>
                      <p className="text-lg font-black font-mono text-emerald-400">
                        R$ {recommendedAmountValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <span className="text-[9px] text-indigo-200 block">Menor referência fiscal projetada em visual local</span>
                    </div>
                    <div className="bg-indigo-950 p-3 rounded-xl border border-indigo-700 text-yellow-400 font-bold">
                      ★
                    </div>
                  </div>

                </div>

                {/* 2. AREA DE CONFIGURAÇÃO INTERATIVA */}
                <div className={`grid grid-cols-1 ${((selectedPlan as string) === 'micro' || (selectedPlan as string) === 'pequena') ? '' : 'lg:grid-cols-2'} gap-6 items-start`}>
                  
                  {/* COLUNA ESQUERDA: TAXA REGIME & PAINEL DE AJUSTES */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <h4 className="font-extrabold text-sm text-gray-800">1. Alíquotas Globais do Estabelecimento</h4>
                        <p className="text-[11px] text-gray-400">Regule as variáveis contábeis para projetar cenários diferentes.</p>
                      </div>
                      <Sliders className="w-4 h-4 text-slate-500" />
                    </div>

                    {/* Seleção de Regime Tributário */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase text-gray-500">Regime Tributário Ativo do Estabelecimento</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setTaxRegime('simples')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                            taxRegime === 'simples'
                              ? 'bg-slate-900 text-white border-slate-905 shadow'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          Simples Nacional
                        </button>
                        <button
                          onClick={() => setTaxRegime('presumido')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                            taxRegime === 'presumido'
                              ? 'bg-slate-900 text-white border-slate-905 shadow'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          Lucro Presumido
                        </button>
                        <button
                          onClick={() => setTaxRegime('real')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                            taxRegime === 'real'
                              ? 'bg-slate-900 text-white border-slate-905 shadow'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          Regime de referência local
                        </button>
                      </div>
                    </div>

                    {/* Sliders Interativos Globais */}
                    <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      
                      {/* Simples Nacional Slider */}
                      {taxRegime === 'simples' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-600">Alíquota Média DAS (Simples Nacional)</span>
                            <span className="font-mono font-bold text-indigo-600">{simplesRate.toFixed(2)}%</span>
                          </div>
                          <input
                            type="range"
                            min="4.0"
                            max="15.0"
                            step="0.05"
                            value={simplesRate}
                            onChange={(e) => setSimplesRate(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                          <p className="text-[10px] text-gray-400">Padrão do Anexo I (Comércio de até R$ 180k/ano começa em 4.0%).</p>
                        </div>
                      )}

                      {/* Lucro Presumido Detalhes Informativos */}
                      {taxRegime === 'presumido' && (
                        <div className="bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-600 space-y-1.5 font-medium leading-relaxed">
                          <p className="font-bold text-gray-700">Abertura Fiscal Operacional do Lucro Presumido:</p>
                          <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-gray-500">
                            <li><strong>COFINS:</strong> 3,00% (Não cumulativo de entrada)</li>
                            <li><strong>PIS:</strong> 0,65% (Tributação cumulativa)</li>
                            <li><strong>IRPJ Estimado:</strong> 1,20% das entradas locais</li>
                            <li><strong>CSLL Estimada:</strong> 1,08% das entradas locais</li>
                            <li><strong>ICMS/ISS Proporcional:</strong> 1,50% fixado na lista local</li>
                          </ul>
                        </div>
                      )}

                      {/* Regime de referência local */}
                      {taxRegime === 'real' && (
                        <div className="bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-600 space-y-2 font-medium">
                          <p className="font-bold text-gray-750">Parâmetros Ativos de Margem Líquida:</p>
                          <p className="text-[11px] text-gray-500 leading-relaxed">
                            Este regime de referência local simula 15% de IRPJ e 9% de CSLL sobre o resultado líquido visual (entrada - saída local). Se a janela estiver negativa, o lembrete interno de IRPJ/CSLL fica em R$ 0,00.
                          </p>
                          <div className="bg-slate-50 p-2 rounded text-[11px] font-mono flex justify-between">
                            <span>Resultado Líquido Atual:</span>
                            <span className={netMarginBeforeTaxes >= 0 ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>
                              R$ {netMarginBeforeTaxes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Sliders Trabalhistas constantes */}
                      <hr className="border-gray-200" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* INSS Slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-500">INSS Patronal</span>
                            <span className="font-mono font-bold text-slate-700">{inssPatronalRate.toFixed(1)}%</span>
                          </div>
                          <input
                            type="range"
                            min="10.0"
                            max="25.0"
                            step="0.5"
                            value={inssPatronalRate}
                            onChange={(e) => setInssPatronalRate(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                          />
                          <p className="text-[9px] text-gray-400">Regularidade previdenciária de folha.</p>
                        </div>

                        {/* FGTS Slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-500">FGTS Trabalhista</span>
                            <span className="font-mono font-bold text-slate-700">{fgtsRate.toFixed(1)}%</span>
                          </div>
                          <input
                            type="range"
                            min="4.0"
                            max="12.0"
                            step="0.5"
                            value={fgtsRate}
                            onChange={(e) => setFgtsRate(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                          />
                          <p className="text-[9px] text-gray-400">Recolhimento compulsório individual.</p>
                        </div>

                      </div>

                    </div>

                    {/* Relatório Analítico Adicional */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-extrabold uppercase text-gray-400">Detalhamento Previsto de Impostos do Mês</h5>
                      <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 font-mono text-slate-700 text-xs">
                        
                        <div className="p-3 flex justify-between bg-gray-50/50">
                          <span>DAS Simples Nacional ({simplesRate}% sobre Faturamento):</span>
                          <span className="font-semibold">R$ {simplesTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        
                        <div className="p-3 flex justify-between bg-gray-50/50">
                          <span>Lucro Presumido Consolidado (Tabela Fixa):</span>
                          <span className="font-semibold">R$ {presumidoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className="p-3 flex justify-between bg-gray-50/50">
                          <span>Regime de referência local estimado:</span>
                          <span className="font-semibold">R$ {realTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <div className="p-3 bg-indigo-50/40 text-indigo-900 font-bold flex justify-between border-t border-indigo-100">
                          <span>Imposto de Estabelecimento Ativo ({taxRegime.toUpperCase()}):</span>
                          <span>R$ {activeRegimeTaxCalculated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* COLUNA DIREITA: IMPOSTO DE CADA PRODUTO (ALÍQUOTAS DINÂMICAS) */}
                  {!((selectedPlan as string) === 'micro' || (selectedPlan as string) === 'pequena') && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div>
                          <h4 className="font-extrabold text-sm text-gray-800">2. Imposto Subjacente de Cada Produto (Estoque)</h4>
                          <p className="text-[11px] text-gray-400">Ajuste as alíquotas de ICMS da prateleira e simule seu ativo tributário.</p>
                        </div>
                        <Percent className="w-4 h-4 text-orange-655" />
                      </div>

                      {/* Sliders para Ajustar Alíquotas de ICMS por Categoria de Produto */}
                      <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100 space-y-3.5">
                        <p className="text-[10px] text-orange-950 font-bold uppercase tracking-wider block">Sliders de Ajuste de ICMS por Segmento:</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          
                          {/* ICMS Laticínios / Grãos (Alimentos) */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-semibold text-gray-655">Alimentos / Laticínios</span>
                              <span className="font-mono font-bold text-orange-700">{icmsAlimentos}%</span>
                            </div>
                            <input
                              type="range" min="0" max="30" step="1" value={icmsAlimentos}
                              onChange={(e) => setIcmsAlimentos(parseInt(e.target.value))}
                              className="w-full h-1 bg-gray-200 rounded accent-orange-500 cursor-pointer"
                            />
                          </div>

                          {/* ICMS Bebidas */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-semibold text-gray-655">Bebidas e Energéticos</span>
                              <span className="font-mono font-bold text-orange-700">{icmsBebidas}%</span>
                            </div>
                            <input
                              type="range" min="0" max="30" step="1" value={icmsBebidas}
                              onChange={(e) => setIcmsBebidas(parseInt(e.target.value))}
                              className="w-full h-1 bg-gray-200 rounded accent-orange-500 cursor-pointer"
                            />
                          </div>

                          {/* ICMS Limpeza */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-semibold text-gray-655">Limpeza & Higiene</span>
                              <span className="font-mono font-bold text-orange-700">{icmsLimpeza}%</span>
                            </div>
                            <input
                              type="range" min="0" max="30" step="1" value={icmsLimpeza}
                              onChange={(e) => setIcmsLimpeza(parseInt(e.target.value))}
                              className="w-full h-1 bg-gray-200 rounded accent-orange-500 cursor-pointer"
                            />
                          </div>

                          {/* ICMS Eletrônicos / Tecnologia */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="font-semibold text-gray-655">Eletrônicos & Equip.</span>
                              <span className="font-mono font-bold text-orange-700">{icmsEletronicos}%</span>
                            </div>
                            <input
                              type="range" min="0" max="30" step="1" value={icmsEletronicos}
                              onChange={(e) => setIcmsEletronicos(parseInt(e.target.value))}
                              className="w-full h-1 bg-gray-200 rounded accent-orange-500 cursor-pointer"
                            />
                          </div>

                        </div>
                      </div>

                      {/* Listagem Dinâmica de Produtos com Estimativa Contábil */}
                      <div className="space-y-2">
                        <span className="text-xs font-extrabold uppercase text-gray-400">Listagem de Mercadorias no Ativo</span>
                        
                        <div className="border border-gray-100 rounded-xl overflow-hidden max-h-[240px] overflow-y-auto">
                          {productsValuationList.length === 0 ? (
                            <p className="p-6 text-center text-xs text-gray-400 italic">Nenhum produto cadastrado nos arquivos de logística do armazém.</p>
                          ) : (
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-gray-50 text-gray-400 uppercase text-[9px] font-bold border-b border-gray-100">
                                  <th className="py-2.5 px-4 font-sans font-semibold">Produto / Segmento</th>
                                  <th className="py-2.5 px-4 text-center font-sans font-semibold">Estoque</th>
                                  <th className="py-2.5 px-4 text-right font-sans font-semibold">Custo Est. (Uni)</th>
                                  <th className="py-2.5 px-4 text-center font-sans font-semibold">Alíquota ICMS</th>
                                  <th className="py-2.5 px-4 text-right font-sans font-semibold">Vlr Imposto</th>
                                </tr>
                              </thead>
                              <tbody className={`${getFontSize('xs')} divide-y divide-gray-100 font-sans text-gray-700`}>
                                {productsValuationList.map((p) => (
                                  <tr 
                                    key={p.id} 
                                    onClick={() => setSelectedProductDetail(p)}
                                    className="hover:bg-slate-100/80 cursor-pointer transition-colors group"
                                    title="Clique para ver os detalhes da tributação e do produto"
                                  >
                                    <td className="py-3 px-4">
                                      <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                        {p.name}
                                        <span className="ml-2 text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity font-sans font-normal">(Ver detalhes)</span>
                                      </p>
                                      <span className="text-[10px] text-gray-400 italic block">{p.category}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center font-mono font-semibold">{p.qty} un</td>
                                    <td className="py-3 px-4 text-right font-mono text-gray-505">
                                      R$ {p.estimatedUnitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="bg-orange-50 text-orange-700 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        {p.rate}%
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-mono text-orange-600 font-bold">
                                      R$ {p.taxVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>

                        {/* Totais de Estoque */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-gray-150 flex justify-between text-xs font-mono">
                          <span className="font-semibold text-gray-500">Imposto Total Projetado Integrado no Estoque:</span>
                          <strong className="text-orange-700 font-extrabold text-xs">
                            R$ {totalStockTaxesSimulated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </strong>
                        </div>

                      </div>

                    </div>
                  )}

                </div>

                {/* 3. CRONOGRAMA INTERATIVO & SIMULADOR DE COBERTURA DE LIQUIDEZ */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                  
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-indigo-600" />
                      3. Calendário local de saídas e teste visual de caixa
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Veja os dias de desembolso para o restante de suas despesas e simule se o capital consolidado em caixa é suficiente.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Linha do Tempo de Desembolsos Planejados */}
                    <div className="lg:col-span-5 space-y-3">
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">Lista de Vencimentos em Junho/2026:</span>
                      
                      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-100">
                        
                        {/* 05/Jun: Folha salarial local */}
                        <div className="flex items-start gap-4 relative">
                          <span className="w-7 h-7 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold font-mono">
                            05
                          </span>
                          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-150 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-gray-800">Folha de Salário Líquido</p>
                              <p className="text-[10px] text-gray-400">{activeEmployees.length} colaboradores ativos cadastrados</p>
                            </div>
                            <span className="font-mono font-bold text-gray-800">- R$ {totalActiveSalaries.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* 07/Jun: FGTS */}
                        <div className="flex items-start gap-4 relative">
                          <span className="w-7 h-7 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold font-mono">
                            07
                          </span>
                          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-150 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-gray-800">Guia Trabalhista: FGTS</p>
                              <p className="text-[10px] text-gray-400">Proporcional de {fgtsRate}% da folha</p>
                            </div>
                            <span className="font-mono font-bold text-slate-700">- R$ {computedFgtsCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* 20/Jun: INSS Patronal */}
                        <div className="flex items-start gap-4 relative">
                          <span className="w-7 h-7 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold font-mono">
                            20
                          </span>
                          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-150 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-gray-800">INSS / GPS Previdenciária</p>
                              <p className="text-[10px] text-gray-400">Encargos de {inssPatronalRate}% sobre folha ativa</p>
                            </div>
                            <span className="font-mono font-bold text-slate-700">- R$ {computedInssCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* 20/Jun: DAS / XML do Estado */}
                        <div className="flex items-start gap-4 relative">
                          <span className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold font-mono">
                            20
                          </span>
                          <div className="flex-1 bg-indigo-50/20 p-3 rounded-xl border border-indigo-100 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-indigo-950">Lembrete local para contador</p>
                              <p className="text-[10px] text-indigo-501 font-medium">Referência sobre entradas locais ({taxRegime.toUpperCase()})</p>
                            </div>
                            <span className="font-mono font-bold text-indigo-600">- R$ {activeRegimeTaxCalculated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Caixa de Entrada / Provisão Slider e Gauge */}
                    <div className="lg:col-span-7 bg-slate-50/60 p-5 rounded-2xl border border-slate-150 space-y-4">
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest block">Análise de Liquidez de Caixa</span>
                        <h5 className="font-bold text-sm text-slate-800">Diagnóstico sobre Compromissos do Mês</h5>
                        <p className="text-[11px] text-slate-500">Comparativo dos lembretes internos calculados (salários, encargos trabalhistas e tributos de referência) contra o saldo visual local registrado.</p>
                      </div>

                      {/* Resumo da Equação */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                        <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-sans font-bold">Saldo Livre de Caixa Atual</span>
                          <strong className="text-gray-900 font-extrabold">R$ {calculatedBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-sans font-bold">Obrigações Contábeis Junho-2026</span>
                          <strong className="text-slate-800 font-extrabold">R$ {grandTotalPlanningThresholdWithReserve.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                        </div>
                      </div>

                      {/* Visual Liquidity Indicator (Progress Bar) */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Índice de Cobertura de Caixa para Desembolsos</span>
                          <span className="font-mono">{walletLiquidityPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3.5 rounded-full overflow-hidden border border-gray-300 flex">
                          <div
                            style={{ width: `${walletLiquidityPercentage}%` }}
                            className={`h-full transition-all duration-500 font-mono text-[9px] text-white flex items-center justify-center font-bold ${
                              walletLiquidityPercentage >= 100 
                                ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                                : walletLiquidityPercentage >= 60 
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                                  : 'bg-gradient-to-r from-red-500 to-rose-600'
                            }`}
                          >
                            {walletLiquidityPercentage >= 30 && `${walletLiquidityPercentage}%`}
                          </div>
                        </div>

                        {/* Text Advice de acordo com cobertura */}
                        <div className="mt-2 text-xs leading-relaxed font-sans font-medium">
                          {walletLiquidityPercentage >= 100 ? (
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <p>
                                <strong>Referência local saudável!</strong> O saldo visual local cobre 100% dos lembretes planejados de June/2026. Use como apoio interno antes de registrar novas entradas ou saídas locais.
                              </p>
                            </div>
                          ) : walletLiquidityPercentage >= 65 ? (
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start gap-2">
                              <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <p>
                                <strong>Atenção local provisiva!</strong> O saldo visual local cobre parcialmente os lembretes internos do mês. Registre mais <strong>R$ {(grandTotalPlanningThresholdWithReserve - calculatedBalance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> em entradas locais para simular folga nominal.
                              </p>
                            </div>
                          ) : (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-850 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-650 flex-shrink-0 mt-0.5" />
                              <p>
                                <strong>Alerta visual de caixa restrito!</strong> As entradas locais registradas são insuficientes para simular a folha e os lembretes internos de tributos. Use a visão como apoio antes de registrar novas saídas e projete <strong>R$ {(grandTotalPlanningThresholdWithReserve - calculatedBalance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> em entradas locais.
                              </p>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Dicas e Práticas Contábeis Recomendadas */}
                <div className="bg-gray-50 rounded-2xl border border-gray-150 p-5 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-gray-505 font-medium leading-relaxed">
                  <div className="space-y-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Planejamento de ICMS
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Garantir guias fiscais em dia na compra de suprimentos do comércio permite creditar sua empresa sobre impostos redundantes. Se planeje para compensar créditos no varejo.
                    </p>
                  </div>
                  <div className="space-y-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Provisão de 13º e Férias
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Adicionalmente ao salário mensal, provisione mensalmente 1/12 avos sobre a renda bruta para quitar o 13º e as férias dos seus funcionários no final de ano sem gargalos.
                    </p>
                  </div>
                  <div className="space-y-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      Atrasar Guias Custa Caro
                    </p>
                    <p className="text-[11px] text-gray-500">
                      O Simples Nacional (DAS) atrasado incide multa moratória diária de 0.33% até limite de 20%, mais taxa SELIC acumulada. O planejamento antecipado do dia 20 evita prejuízo de juros passivos.
                    </p>
                  </div>
                </div>

              </>
            );
          })()}
          </>
          )}

        </div>
      )}

      {/* MODAL 3: SCANNER INTELIGENTE DE RECIBOS POR IA */}
      {isAIScanOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]"
          >
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <div>
                  <h4 className="font-bold text-base">Auditor de Transações Inteligente</h4>
                  <p className="text-[10px] text-teal-100 font-medium">Equipado com Inteligência Artificial Gemini 3.5 Flash</p>
                </div>
              </div>
              <button onClick={() => setIsAIScanOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {!aiResult ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Left Column: Upload visual do recibo */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-gray-500 uppercase block">Opção A: Upload de Imagem (Cupom / Recibo)</span>
                    <div className="border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-2xl p-5 text-center flex flex-col items-center justify-center min-h-[180px] bg-gray-50 transition-colors relative">
                      {imageBase64 ? (
                        <div className="relative w-full h-[180px]">
                          <img src={imageBase64} alt="Recibo carregado" className="absolute inset-0 w-full h-full object-contain rounded-xl" />
                          <button 
                            onClick={() => setImageBase64(null)} 
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="w-10 h-10 text-gray-300 mb-2" />
                          <p className="text-xs font-medium text-gray-500">Arraste a foto do cupom fiscal ou clique</p>
                          <p className="text-[10px] text-gray-400 mt-1">Formatos suportados: PNG, JPG, WEBP</p>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Inserir texto ou notas coladas */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-gray-500 uppercase block">Opção B: Texto bruto extraído da Nota</span>
                    <textarea
                      placeholder="Cole aqui o texto se tiver o cupom fiscal eletrônico já copiado (Ex: Estabelecimento X, CNPJ, Data, Valor total)"
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      rows={7}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Submit AI analysis */}
                  <div className="md:col-span-2 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <p className="text-xs text-gray-500 max-w-sm">
                      A IA de conferência local processará a imagem ou texto para identificar valores e gerar uma sugestão de conferência local.
                    </p>
                    <button
                      id="btn-processar-recibo-gemini"
                      type="button"
                      disabled={isAIAnalyzing || (!imageBase64 && !pastedText.trim())}
                      onClick={handleProcessReceiptWithAI}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 "
                    >
                      {isAIAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processando com Gemini...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Conferir e Extrair Dados com IA
                        </>
                      )}
                    </button>
                  </div>

                  {aiAnalysisError && (
                    <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-600">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Erro de Parsing Contábil:</p>
                        <p>{aiAnalysisError}</p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                
                // Exposição do Resultado da extração para verificação do Auditor antes de gravar
                <div className="space-y-5">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Extração efetuada com sucesso! Revise os valores antes de registrar na organização local.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-gray-800 border-b pb-2 mb-2">Dados do registro local</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400">Estabelecimento</span>
                          <input
                            type="text"
                            value={aiResult.establishmentName || ''}
                            onChange={(e) => setAiResult(prev => ({ ...prev, establishmentName: e.target.value }))}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400">Data Declarada</span>
                          <input
                            type="date"
                            value={aiResult.date || ''}
                            onChange={(e) => setAiResult(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs font-mono focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400">Categoria Sugerida</span>
                          <select
                            value={aiResult.category || 'Suprimentos'}
                            onChange={(e) => setAiResult(prev => ({ ...prev, category: e.target.value as TransactionCategory }))}
                            className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs focus:outline-none"
                          >
                            <option value="Suprimentos">Suprimentos</option>
                            <option value="Logística">Logística</option>
                            <option value="Serviços">Serviços</option>
                            <option value="Funcionários">Funcionários</option>
                            <option value="Impostos">Impostos</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Outros">Outros</option>
                          </select>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400">Valor Total Extraído</span>
                          <div className="relative">
                            <span className="absolute left-2.5 top-2.5 text-[10px] font-bold text-gray-400">R$</span>
                            <input
                              type="number"
                              step="0.01"
                              value={aiResult.amount || 0}
                              onChange={(e) => setAiResult(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                              className="w-full bg-white border border-gray-200 rounded-lg p-2 pl-7 text-xs font-bold font-mono focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-gray-800 border-b pb-2 mb-2">Itens Solicitados na Nota</h4>
                      
                      {aiResult.items && aiResult.items.length > 0 ? (
                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                          {aiResult.items.map((it, i) => (
                            <div key={i} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-100 text-xs text-gray-700">
                              <span className="font-medium truncate max-w-[160px]">{it.name}</span>
                              <span className="font-mono text-gray-500">{it.qty || 1}x R$ {it.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">Nenhum item discriminado individualmente no recibo.</p>
                      )}

                      <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-[11px] text-emerald-800">
                        <strong className="block mb-1">Impacto Financeiro Estimado:</strong>
                        Este registro ajustará visualmente <strong>R$ {aiResult.amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> no resumo visual local de caixa.
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => { setAiResult(null); setImageBase64(null); setPastedText(''); }}
                      className="border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl py-2 px-4 text-xs font-semibold"
                    >
                      Anular Extração
                    </button>
                    <button
                      id="btn-confirmar-recibo-ia"
                      type="button"
                      onClick={handleConfirmAIReceipt}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-2 px-6 text-xs font-bold"
                    >
                      Registrar movimentação local
                    </button>
                  </div>
                </div>

              )}

            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL DETALHE: TRANSAÇÃO CONTÁBIL AMPLIFICADA */}
      {selectedTransactionDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200"
          >
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-750">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">Ficha Contábil de Lançamento</h3>
                  <p className="text-xs text-slate-500 font-mono">ID Único: {selectedTransactionDetail.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTransactionDetail(null)} 
                className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full border border-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-150">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nome da Fonte / Estabelecimento</span>
                  <p className="text-xl font-extrabold text-indigo-900 leading-tight">{selectedTransactionDetail.establishmentName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Valor do Movimento</span>
                  <p className="text-2xl font-black font-mono">
                    <span className={isRevenue(selectedTransactionDetail) ? 'text-emerald-600' : 'text-rose-600'}>
                      {isRevenue(selectedTransactionDetail) ? 'R$ +' : 'R$ -'} {selectedTransactionDetail.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2 border-t border-slate-200 pt-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Nota de Respaldo Contábil ou Discriminação</span>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100 italic">
                    "{selectedTransactionDetail.notes || 'Nenhuma nota declarada durante este registro interno de organização.'}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Categoria</span>
                  <span className="bg-indigo-100 text-indigo-850 px-2.5 py-1 rounded text-xs font-mono font-bold uppercase">
                    {selectedTransactionDetail.category}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Data Efetiva</span>
                  <span className="font-mono text-xs font-bold text-slate-805">
                    {selectedTransactionDetail.date}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Status</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    selectedTransactionDetail.status === 'Confirmado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedTransactionDetail.status}
                  </span>
                </div>
              </div>

              {selectedTransactionDetail.items && selectedTransactionDetail.items.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide flex items-center gap-1.5 border-b pb-2">
                    <ClipboardList className="w-4 h-4 text-indigo-500" />
                    Itens Identificados na Nota Fiscal ou Recibo ({selectedTransactionDetail.items.length})
                  </h4>
                  <div className="divide-y divide-gray-100 max-h-[180px] overflow-y-auto pr-1">
                    {selectedTransactionDetail.items.map((it) => (
                      <div key={it.id} className="flex justify-between items-center py-2 text-xs font-sans">
                        <div>
                          <p className="font-extrabold text-slate-850">{it.name}</p>
                          <p className="text-[10px] text-gray-400">ID de Estoque Correspondente: {it.id}</p>
                        </div>
                        <div className="text-right font-mono text-slate-800">
                          <strong className="text-slate-900">{it.qty} un</strong> • R$ {(it.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guia fiscal */}
              <div className="bg-indigo-50/65 border border-indigo-150 p-4 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-700 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h5 className="font-bold text-indigo-950 text-xs sm:text-sm">Conselho Fiscal Para Planejamento</h5>
                  <p className="text-xs text-indigo-900/80 leading-relaxed">
                    {isRevenue(selectedTransactionDetail) 
                      ? `Como este registro é um RECEBIMENTO de R$ ${selectedTransactionDetail.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, tome nota sobre o imposto de regime aplicável: se no Simples Nacional (${simplesRate}%), o tributo estimado DAS será de R$ ${(selectedTransactionDetail.amount * simplesRate / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`
                      : `Este registro constitui uma saída local de R$ ${selectedTransactionDetail.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. Em regime de referência local, o valor pode ser usado como apoio interno para estimar IRPJ e CSLL, sem valor contábil oficial.`
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-slate-150 flex justify-end">
              <button 
                onClick={() => setSelectedTransactionDetail(null)}
                className="bg-slate-900 hover:bg-slate-850 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md"
              >
                Fechar Ficha
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL DETALHE: FICHA TRABALHISTA COMPLETA */}
      {selectedEmployeeDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200"
          >
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-805">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Ficha do Funcionário & Provisão</h3>
                  <p className="text-xs text-slate-500 font-mono">Registo ID: {selectedEmployeeDetail.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEmployeeDetail(null)} 
                className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full border border-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-1">
                <span className={`inline-flex items-center gap-1 text-xs font-bold leading-none px-2.5 py-1 rounded-full ${
                  selectedEmployeeDetail.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  Fucionário {selectedEmployeeDetail.status}
                </span>
                <p className="text-2xl font-black text-gray-805">{selectedEmployeeDetail.name}</p>
                <p className="text-sm text-indigo-600 font-bold">{selectedEmployeeDetail.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Admissão</span>
                  <span className="font-mono text-sm font-semibold text-gray-800">{selectedEmployeeDetail.dateHired}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Salário Bruto Mensal</span>
                  <span className="font-mono text-sm font-bold text-emerald-700">R$ {selectedEmployeeDetail.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">WhatsApp Cadastrado</span>
                  <span className="font-mono text-sm font-bold text-indigo-650">{selectedEmployeeDetail.phone || 'Não informado'}</span>
                </div>
                {selectedEmployeeDetail.phone && (
                  <a
                    href={`https://wa.me/${selectedEmployeeDetail.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-605 hover:bg-emerald-700 text-white text-xs font-extrabold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Conversar via WhatsApp
                  </a>
                )}
              </div>

              <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-150">
                <div className="flex items-center gap-1 border-b pb-2 mb-2">
                  <Scale className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-extrabold uppercase text-gray-700 tracking-wider">Detalhamento Trabalhista / Provisão Contábil</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">FGTS Estimado ({fgtsRate}%)</span>
                    <span className="font-mono text-slate-800 font-bold">R$ {(selectedEmployeeDetail.salary * fgtsRate / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">INSS Patronal ({inssPatronalRate}%)</span>
                    <span className="font-mono text-slate-800 font-bold">R$ {(selectedEmployeeDetail.salary * inssPatronalRate / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2 font-bold text-sm">
                    <span className="text-slate-900">Total Provisão da Equipe</span>
                    <span className="font-mono text-slate-900">
                      R$ {(selectedEmployeeDetail.salary + (selectedEmployeeDetail.salary * (fgtsRate + inssPatronalRate) / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-150 p-4 rounded-xl flex items-start gap-2.5">
                <Info className="w-5 h-5 text-orange-650 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-950 font-medium leading-relaxed">
                  Para preparação local para contador, mantenha uma referência mensal correspondente aos lembretes sindicais e contratuais. O total projetado para este empregado na próxima janela de referência é de <strong>R$ {(selectedEmployeeDetail.salary * (fgtsRate + inssPatronalRate) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> adicionais.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-slate-150 flex justify-end">
              <button 
                onClick={() => setSelectedEmployeeDetail(null)}
                className="bg-slate-900 hover:bg-slate-850 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md"
              >
                Sair da Ficha
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL DETALHE: DETALHAMENTO DE TRIBUTAÇÃO DO PRODUTO */}
      {selectedProductDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200"
          >
            <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="bg-orange-100 p-2 rounded-xl text-orange-700">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Demonstrativo Fiscal Tributário do Estoque</h3>
                  <p className="text-xs text-slate-500 font-mono">Produto ID: {selectedProductDetail.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProductDetail(null)} 
                className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full border border-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 space-y-1 text-center">
                <span className="text-[10px] uppercase font-bold text-orange-700 tracking-wider font-mono">Substituição Tributária de Estoque</span>
                <p className="text-2xl font-black text-slate-900">{selectedProductDetail.name}</p>
                <span className="bg-indigo-100 text-indigo-850 text-[10px] font-bold px-2.5 py-0.5 rounded font-mono uppercase">
                  Segmento: {selectedProductDetail.category}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Unidades em Almoxarifado</span>
                  <span className="font-sans text-sm font-bold text-neutral-855">{selectedProductDetail.qty} unidades</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Custo Estimado Unitário</span>
                  <span className="font-mono text-sm font-bold text-gray-800">R$ {selectedProductDetail.estimatedUnitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center col-span-2 md:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Valor Total de Custódia</span>
                  <span className="font-mono text-sm font-bold text-gray-900">R$ {selectedProductDetail.val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-150">
                <div className="flex justify-between border-b pb-2 font-bold mb-2">
                  <span className="text-slate-800 text-xs uppercase font-extrabold tracking-wide">Base de ICMS Calculada</span>
                  <span className="text-orange-705 font-mono text-xs">{selectedProductDetail.rate}% de alíquota interna</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base de Cálculo</span>
                    <span className="font-mono text-slate-700">R$ {selectedProductDetail.val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Imposto Estadual Apurado (ST)</span>
                    <span className="font-mono text-orange-650 font-black">R$ {selectedProductDetail.taxVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-xl flex items-start gap-2.5">
                <Info className="w-5 h-5 text-indigo-700 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  Para mercadorias no segmento de <strong>{selectedProductDetail.category}</strong>, esta referência fiscal futura projeta margem de valor agregado apenas para apoio interno. Mantenha uma lista local de referências para revisão do contador.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-slate-150 flex justify-end">
              <button 
                onClick={() => setSelectedProductDetail(null)}
                className="bg-slate-900 hover:bg-slate-850 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md"
              >
                Concluir Guia
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
