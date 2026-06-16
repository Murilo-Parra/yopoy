import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Layers, 
  AlertCircle, 
  Check, 
  ChevronRight,
  Sparkles,
  Maximize2,
  Minimize2,
  Smartphone,
  Phone,
  CheckCircle2,
  CheckSquare,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Employee, Task } from '../types';

interface HierarchyToolProps {
  employees: Employee[];
  theme: 'light' | 'dark';
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  setSimulatedInvoices?: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface CentralTask {
  id: string;
  title: string;
  description?: string;
  status: 'Pendente' | 'Em Execução' | 'Concluído' | 'Estagnado';
  createdAt: string;
  // Passo 3: Dados de Nota Fiscal (Opcionais)
  invoiceCustomerName?: string;
  invoiceCustomerTaxId?: string;
  invoiceTotalValue?: number;
  invoiceNature?: string;
  invoiceDescription?: string;
  // Passo 5: Funcionário Encaminhado (Opcional)
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  hasCreatedInvoiceDraft?: boolean;
}

export default function HierarchyTool({ 
  employees, 
  theme, 
  tasks, 
  setTasks, 
  isExpanded, 
  onToggleExpand, 
  setSimulatedInvoices 
}: HierarchyToolProps) {
  const isDark = theme === 'dark';

  // --- ESTADO DA CENTRAL DE TAREFAS CORPORATIVAS (PERSISTENCIA EM LOCALSTORAGE) ---
  const [centralTasks, setCentralTasks] = useState<CentralTask[]>(() => {
    const saved = localStorage.getItem('biz_central_tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Erro ao fazer parse de biz_central_tasks:", e);
      }
    }
    return [
      {
        id: 'ctask-init-1',
        title: 'Verificação Contábil Trimestral',
        description: 'Realizar a verificação sistemática do faturamento dos novos lotes alimentícios e organizar relatórios com a equipe.',
        status: 'Em Execução',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        invoiceCustomerName: 'Macedo Alimentos S/A',
        invoiceCustomerTaxId: '12.345.678/0001-99',
        invoiceTotalValue: 1540.90,
        invoiceNature: 'Venda Geral de Distribuição',
        invoiceDescription: 'Serviço de entrega em massa e faturamento comercial lotes 4B',
        assignedEmployeeId: 'e2',
        assignedEmployeeName: 'Carlos Supervisor',
        hasCreatedInvoiceDraft: true
      },
      {
        id: 'ctask-init-2',
        title: 'Triagem de Lote Alimentício Corredor D',
        description: 'Retirar os produtos avariados ou próximos ao vencimento do setor de distribuição D para triagem contábil.',
        status: 'Pendente',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        assignedEmployeeId: 'e1',
        assignedEmployeeName: 'Juliana Caixa',
        hasCreatedInvoiceDraft: false
      }
    ];
  });

  // Salva no localStorage quando centralTasks altera
  useEffect(() => {
    localStorage.setItem('biz_central_tasks', JSON.stringify(centralTasks));
  }, [centralTasks]);

  // Selección de interlocutor para el chat (now used for employee detail overlay context)
  const [activeEmployeeId, setActiveEmployeeId] = useState<string>('e2'); // Carlos Supervisor default

  // Estado para controle do fluxo de criação "Nova Tarefa" (Passo 1)
  const [isCreating, setIsCreating] = useState(false);
  
  // States do formulário da nova tarefa
  const [taskTitle, setTaskTitle] = useState(''); // Passo 2
  const [taskDescription, setTaskDescription] = useState(''); // Passo 2 (Explicação)
  
  // Toast informativo
  const [toastMessage, setToastMessage] = useState('');

  // Expandir detalhes de qualquer tarefa na central
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const activeEmployee = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Cálculo de nível de hierarquia para Column 1
  const getHierarchyLevel = (emp: { id: string; name: string; role: string }) => {
    const roleLower = emp.role.toLowerCase();
    if (emp.id === 'admin') return { label: 'Nível 1: Diretoria Geral', color: 'bg-indigo-600 border-indigo-700 text-white', order: 1 };
    if (roleLower.includes('supervisor') || roleLower.includes('gerente')) {
      return { label: 'Nível 2: Supervisão / Líder de Equipe', color: 'bg-emerald-600 border-emerald-700 text-white', order: 2 };
    }
    if (roleLower.includes('analista') || roleLower.includes('coordenador')) {
      return { label: 'Nível 3: Coordenação Técnica', color: 'bg-blue-600 border-blue-700 text-white', order: 3 };
    }
    return { label: 'Nível 4: Operação & Apoio', color: 'bg-slate-600 border-slate-700 text-white', order: 4 };
  };

  // --- POSTAR NOVA TAREFA (SÓ TÍTULO E EXPLICAÇÃO MULTI-LINHA) ---
  const handleCreateCentralTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const taskId = `ctask-${Date.now()}`;
    const dateStr = new Date().toLocaleDateString('pt-BR');

    // Criamos a tarefa corporativa centralizada (todas as outras informações serão definidas após postagem)
    const newCentralTask: CentralTask = {
      id: taskId,
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      status: 'Pendente',
      createdAt: dateStr
    };

    setCentralTasks(prev => [newCentralTask, ...prev]);

    setToastMessage(`A tarefa "${taskTitle.substring(0, 20)}..." foi postada como Pendente!`);
    setTimeout(() => setToastMessage(''), 4000);

    // Resetar formulário
    setTaskTitle('');
    setTaskDescription('');
    setIsCreating(false);
  };

  // --- REGRAS DE ALTERAÇÃO DE STATUS DE TAREFA DA CENTRAL IGUAL AO CHECKLIST (CICLO DE STATUS) ---
  const handleToggleCentralTaskStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const currentTask = centralTasks.find(t => t.id === id);
    if (!currentTask) return;

    let nextStatus: 'Pendente' | 'Em Execução' | 'Concluído' | 'Estagnado' = 'Pendente';
    if (currentTask.status === 'Pendente') nextStatus = 'Em Execução';
    else if (currentTask.status === 'Em Execução') nextStatus = 'Concluído';
    else if (currentTask.status === 'Concluído') nextStatus = 'Estagnado';
    else nextStatus = 'Pendente';

    // 1. Atualizar a central de tarefas corporativas
    setCentralTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));

    // 2. Sincronizar com o checklist de funcionários (Coluna 3) se houver tarefa vinculada
    const checklistStatus = nextStatus === 'Concluído' ? 'Concluido' : nextStatus === 'Em Execução' ? 'Em Andamento' : 'Pendente';
    setTasks(prevTasks => prevTasks.map(pt => {
      if (pt.id === `linked-${id}`) {
        return { ...pt, status: checklistStatus };
      }
      return pt;
    }));
  };

  // Designação do funcionário de forma dinâmica pós-postagem
  const handleAssignEmployee = (taskId: string, empId: string) => {
    const emp = employees.find(e => e.id === empId);
    const empName = emp ? emp.name : '';

    const currentTask = centralTasks.find(t => t.id === taskId);
    if (!currentTask) return;

    // 1. Atualizar a central de tarefas corporativas
    setCentralTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { 
          ...t, 
          assignedEmployeeId: empId || undefined, 
          assignedEmployeeName: empName || undefined 
        };
      }
      return t;
    }));

    // 2. Sincroniza com o checklist de funcionários (Coluna 3)
    if (empId) {
      setTasks(prevTasks => {
        const hasValidInvoiceData = !!currentTask.invoiceTotalValue && Number(currentTask.invoiceTotalValue) > 0;
        const title = `[CENTRAL] ${currentTask.title}${hasValidInvoiceData ? ` (Previsão NF: R$ ${Number(currentTask.invoiceTotalValue).toFixed(2)})` : ''}`;
        const mappedStatus = currentTask.status === 'Concluído' ? 'Concluido' : currentTask.status === 'Em Execução' ? 'Em Andamento' : 'Pendente';

        const exists = prevTasks.some(pt => pt.id === `linked-${taskId}`);
        if (exists) {
          return prevTasks.map(pt => {
            if (pt.id === `linked-${taskId}`) {
              return {
                ...pt,
                assigneeId: empId,
                assigneeName: empName,
                title: title,
                status: mappedStatus
              };
            }
            return pt;
          });
        } else {
          const newFwdTask: Task = {
            id: `linked-${taskId}`,
            title: title,
            assignerId: 'admin',
            assignerName: 'Gerente Geral (O Hub)',
            assigneeId: empId,
            assigneeName: empName,
            status: mappedStatus,
            dateCreated: currentTask.createdAt || new Date().toLocaleDateString('pt-BR')
          };
          return [newFwdTask, ...prevTasks];
        }
      });
    } else {
      // Remove tarefa correspondente se desatribuída
      setTasks(prevTasks => prevTasks.filter(pt => pt.id !== `linked-${taskId}`));
    }
  };

  // Atualização dinâmica dos dados de Nota Fiscal pós-postagem
  const handleUpdateCentralTaskInvoiceData = (id: string, fieldName: keyof CentralTask, value: any) => {
    // 1. Atualizar a central de tarefas corporativas
    setCentralTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, [fieldName]: value };
      }
      return t;
    }));

    // 2. Sincroniza o título da tarefa com previsão de NF na Coluna 3 se já atribuído e valor mudou
    if (fieldName === 'invoiceTotalValue' || fieldName === 'title') {
      const currentTask = centralTasks.find(t => t.id === id);
      if (currentTask) {
        const taskTitleVal = fieldName === 'title' ? String(value) : currentTask.title;
        const nValue = fieldName === 'invoiceTotalValue' ? Number(value) : Number(currentTask.invoiceTotalValue || 0);
        const titleText = `[CENTRAL] ${taskTitleVal}${nValue > 0 ? ` (Previsão NF: R$ ${nValue.toFixed(2)})` : ''}`;

        setTasks(prevTasks => prevTasks.map(pt => {
          if (pt.id === `linked-${id}`) {
            return { ...pt, title: titleText };
          }
          return pt;
        }));
      }
    }
  };

  // Gerar Rascunho da Nota Fiscal baseado na tarefa
  const handleGenerateInvoiceFromTask = (task: CentralTask) => {
    const hasValidInvoiceData = 
      task.invoiceCustomerName?.trim() && 
      task.invoiceCustomerTaxId?.trim() && 
      Number(task.invoiceTotalValue) > 0;

    if (!hasValidInvoiceData) {
      setToastMessage("⚠️ Preencha Razão Social, CNPJ/CPF e Valor Total corretamente!");
      setTimeout(() => setToastMessage(''), 4000);
      return;
    }

    const newInvoiceId = `inv-task-${Date.now()}`;
    const nextInvoiceNum = Math.floor(Math.random() * 9000) + 1000;
    const accessKey = Array.from({ length: 44 }, () => Math.floor(Math.random() * 10)).join('');
    const dateStr = new Date().toLocaleDateString('pt-BR');

    const draftInvoice: any = {
      id: newInvoiceId,
      invoiceNumber: nextInvoiceNum.toString(),
      accessKey: accessKey,
      type: 'produto',
      customerName: task.invoiceCustomerName?.trim(),
      customerTaxId: task.invoiceCustomerTaxId?.trim(),
      customerEmail: 'cliente@centraldetarefas.com.br',
      customerAddress: 'Rua Principal, S/N - Gerado via Central de Tarefas',
      customerCity: 'São Paulo',
      customerState: 'SP',
      items: [
        {
          id: `item-${Date.now()}`,
          name: task.invoiceDescription?.trim() || `Faturamento focado comercial - Atividade: ${task.title.trim()}`,
          quantity: 1,
          unitPrice: Number(task.invoiceTotalValue),
          totalPrice: Number(task.invoiceTotalValue),
          taxRatePercent: 4.5,
          taxValue: Number(task.invoiceTotalValue) * 0.045,
          ncm: '8471.30.12',
          cfop: '5.102',
          cst: '0101',
          unity: 'UN'
        }
      ],
      subtotal: Number(task.invoiceTotalValue),
      taxAmount: Number(task.invoiceTotalValue) * 0.045,
      totalValue: Number(task.invoiceTotalValue),
      issueDate: dateStr,
      status: 'rascunho',
      nature: `${(task.invoiceNature || 'Venda de Mercadoria').trim()} (Origem: Central de Tarefas - ID: ${task.id})`,
      certificateUsed: 'Certificado Digital Sincronizado A1 (Nuvem)',
      environment: 'homologacao'
    };

    const savedInvoicesRaw = localStorage.getItem('biz_simulated_invoices') || '[]';
    let parsedInvoices: any[] = [];
    try {
      parsedInvoices = JSON.parse(savedInvoicesRaw);
    } catch (err) {
      parsedInvoices = [];
    }
    const updatedInvoices = [draftInvoice, ...parsedInvoices];
    localStorage.setItem('biz_simulated_invoices', JSON.stringify(updatedInvoices));

    if (setSimulatedInvoices) {
      setSimulatedInvoices(updatedInvoices);
    }

    setCentralTasks(prev => prev.map(t => {
      if (t.id === task.id) {
        return { ...t, hasCreatedInvoiceDraft: true };
      }
      return t;
    }));

    setToastMessage(`🧾 RASCUNHO de Nota Fiscal (R$ ${Number(task.invoiceTotalValue).toFixed(2)}) exportado com sucesso!`);
    setTimeout(() => setToastMessage(''), 5000);
  };

  // Remover tarefa da central
  const handleDeleteCentralTask = (id: string) => {
    setCentralTasks(prev => prev.filter(t => t.id !== id));
    // Remove do checklist de funcionários
    setTasks(prevTasks => prevTasks.filter(pt => pt.id !== `linked-${id}`));
  };

  // --- BARRA TAREFAS DOS FUNCIONÁRIOS ---
  // Alternar status da tarefa de funcionários (Sincronizado de volta com a central se linked)
  const handleToggleTaskStatus = (id: string) => {
    const currentTask = tasks.find(t => t.id === id);
    if (!currentTask) return;

    const nextStatus = currentTask.status === 'Pendente' ? 'Em Andamento' : currentTask.status === 'Em Andamento' ? 'Concluido' : 'Pendente';

    // 1. Atualizar checklist de funcionários
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));

    // 2. Se for um link de centralTask, atualiza o correspondente na central também
    if (id.startsWith('linked-')) {
      const centralId = id.replace('linked-', '');
      const ctStatus = nextStatus === 'Concluido' ? 'Concluído' : nextStatus === 'Em Andamento' ? 'Em Execução' : 'Pendente';

      setCentralTasks(prevCt => prevCt.map(ct => {
        if (ct.id === centralId) {
          return { ...ct, status: ctStatus };
        }
        return ct;
      }));
    }
  };

  // Remover de funcionários
  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(prev => prev.filter(t => t.id !== id));
    
    // Se for linkada, desatribui na central
    if (id.startsWith('linked-')) {
      const centralId = id.replace('linked-', '');
      setCentralTasks(prevCt => prevCt.map(ct => {
        if (ct.id === centralId) {
          return { ...ct, assignedEmployeeId: undefined, assignedEmployeeName: undefined };
        }
        return ct;
      }));
    }
  };

  // Estilos do Tema
  const bgCard = isDark ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200/90 shadow-sm';
  const textTitle = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const bgInput = isDark ? 'bg-[#1e1e24] text-white border-[#2c2c35]' : 'bg-slate-50 text-slate-900 border-slate-200';

  return (
    <div className="space-y-6 w-full text-left">
      {/* Toast informativo de sincronia e faturamento */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full bg-slate-900 dark:bg-zinc-950 text-white border border-indigo-500/40 p-4 rounded-xl shadow-2xl flex items-start gap-2.5"
          >
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-indigo-400 block mb-0.5">Mapeador de Negócios e Notas</span>
              <p className="text-xs font-semibold leading-relaxed">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage('')} className="text-white/40 hover:text-white text-xs font-bold">&times;</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cabeçalho de Controle de Equipe */}
      <div className={`p-6 rounded-2xl border ${bgCard} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-505">Gerenciador Corporativo de Serviços</span>
          </div>
          <h3 className={`text-xl font-extrabold ${textTitle}`}>Diretoria de Tarefas Gerais & Distribuição</h3>
          <p className={`text-xs ${textMuted} leading-relaxed`}>
            Substituímos o bate-papo simulado por uma **Central de Tarefas Corporativas Integrada**. Agora você pode descrever demandas fiscais e materiais (Passos 1 a 4), encaminhá-las para executores específicos (Passo 5) e emitir rascunhos de Notas Fiscais estruturados de forma 100% autônoma (Passo 6).
          </p>
        </div>

        {onToggleExpand && (
          <button
            onClick={onToggleExpand}
            title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
            className={`border py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start md:self-auto ${
              isDark 
                ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
            }`}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        
        {/* COLUNA 1: MAPA DE HIERARQUIA & DETALHE INTEGRADO */}
        <div className={`xl:col-span-1 p-5 rounded-2xl border ${bgCard} flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Estrutura & Cargos de Equipe
              </span>
              <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 font-mono font-bold px-2 py-0.5 rounded-full">
                {employees.length} Integrantes
              </span>
            </div>

            {/* Árvore Organizacional */}
            <div className="space-y-4 relative">
              {/* ADMIN (Você) */}
              <div 
                className={`p-3 rounded-xl border transition-all cursor-pointer relative z-10 ${
                  activeEmployeeId === 'admin' 
                    ? 'border-indigo-500 bg-indigo-500/10' 
                    : isDark ? 'bg-[#1c1c24] border-[#2c2c34] hover:border-gray-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                }`}
                onClick={() => setActiveEmployeeId('admin')}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xs">
                    ADM
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-extrabold truncate ${textTitle}`}>Gerente Geral (Você)</p>
                    <p className="text-[10px] text-indigo-500 font-medium font-mono">Nível 1 &bull; Direção das Notas e Lotes</p>
                  </div>
                  <span className="text-[9px] bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 px-1.5 py-0.5 rounded uppercase font-bold">Líder</span>
                </div>
              </div>

              {/* Conector visual */}
              <div className="w-0.5 h-3 bg-gray-300 dark:bg-slate-700 ml-7"></div>

              {/* SUPERVISORES & OPERADORES */}
              <div className="space-y-2.5 pl-3 border-l-2 border-slate-200 dark:border-slate-850 ml-7">
                {employees.map((emp) => {
                  const level = getHierarchyLevel(emp);
                  const isSelected = activeEmployeeId === emp.id;
                  const isSupervisor = emp.role.toLowerCase().includes('supervisor') || emp.role.toLowerCase().includes('gerente');
                  return (
                    <div 
                      key={emp.id}
                      onClick={() => setActiveEmployeeId(emp.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? isSupervisor ? 'border-emerald-500 bg-emerald-500/10' : 'border-blue-500 bg-blue-500/10'
                          : isDark ? 'bg-[#1c1c24] border-[#2c2c34] hover:border-gray-850' : 'bg-slate-50 border-slate-150 hover:bg-slate-100/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-extrabold text-[10px] font-mono ${
                          isSupervisor ? 'bg-emerald-600' : 'bg-blue-600'
                        }`}>
                          {isSupervisor ? 'SUP' : 'OP'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${textTitle}`}>{emp.name}</p>
                          <p className={`text-[10px] font-mono truncate ${isSupervisor ? 'text-emerald-500' : 'text-blue-500'}`}>{emp.role}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ficha rápida do colaborador selecionado */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-[#18181c] border border-[#262630]' : 'bg-indigo-50/50 border border-indigo-100'} space-y-3`}>
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Colaborador Focado</span>
              <p className={`text-sm font-extrabold ${textTitle}`}>{activeEmployee?.name || 'Diretoria Executiva'}</p>
              <p className="text-xs text-indigo-600 font-bold">{activeEmployee?.role || 'Acompanhamento de Caixa'}</p>
              {activeEmployee?.phone && (
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{activeEmployee.phone}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-white/40 dark:bg-black/20 p-2 rounded-lg border dark:border-slate-850">
                <span className="text-gray-400 block">Demanda Direta</span>
                <strong className={`text-xs ${textTitle}`}>
                  {tasks.filter(t => t.assigneeId === activeEmployeeId && t.status !== 'Concluido').length} tarefas
                </strong>
              </div>
              <div className="bg-white/40 dark:bg-black/20 p-2 rounded-lg border dark:border-slate-850">
                <span className="text-gray-400 block">Salário Base</span>
                <strong className="text-xs text-emerald-600 font-mono">
                  R$ {(activeEmployee?.salary || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA 2: CENTRAL EDITADA DE TAREFAS */}
        <div className={`xl:col-span-1 p-5 rounded-2xl border ${bgCard} flex flex-col h-[600px] justify-between overflow-hidden`}>
          
          {/* Header de Controle da Central */}
          <div className="flex items-center justify-between border-b pb-3 mb-2 shrink-0">
            <div>
              <h4 className={`text-xs font-extrabold ${textTitle} uppercase tracking-wider flex items-center gap-1.5`}>
                <Clock className="w-4 h-4 text-indigo-400" /> Central de Tarefas Gerais
              </h4>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider block mt-0.5">
                {centralTasks.length} Atividades Cadastradas
              </p>
            </div>

            <button
              onClick={() => setIsCreating(!isCreating)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isCreating 
                  ? 'bg-slate-300 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-slate-350' 
                  : 'bg-indigo-650 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              <Plus className="w-3 h-3 shrink-0" />
              <span>{isCreating ? 'Voltar Lista' : 'Nova Tarefa'}</span>
            </button>
          </div>

          {/* Área do Conteúdo: Lista ou Formulário de Criação rápida */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 py-2 scrollbar-none">
            {isCreating ? (
              /* FORMULÁRIO DE CRIAÇÃO RÁPIDA (SOMENTE TÍTULO + EXPLICAÇÃO MULTILINE) */
              <form onSubmit={handleCreateCentralTask} className="space-y-4 text-left">
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl">
                  <span className="text-[9px] uppercase font-mono font-extrabold text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" /> Cadastro de Atividade
                  </span>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    Insira as especificações básicas da tarefa. Você poderá designar responsáveis e preencher dados fiscais diretamente no card correspondente após a postagem.
                  </p>
                </div>

                {/* Título */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 block">
                    Título da Tarefa
                  </label>
                  <input
                    type="text"
                    required
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Ex: Contagem do lote A de bebidas ou entrega técnica"
                    className={`w-full px-3 py-2 rounded-xl text-xs outline-hidden focus:ring-1 focus:ring-indigo-505 bg-white border border-slate-205 ${bgInput}`}
                  />
                </div>

                {/* Explicação */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 block">
                    Explicação (Quantas linhas forem necessárias)
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Descreva detalhadamente as especificações de execução do serviço ou obrigações operacionais..."
                    className={`w-full px-3 py-2 rounded-xl text-xs outline-hidden focus:ring-1 focus:ring-indigo-505 bg-white border border-slate-205 ${bgInput}`}
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setTaskTitle('');
                      setTaskDescription('');
                    }}
                    className="w-1/3 py-2 bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold hover:shadow-lg transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    Postar Tarefa
                  </button>
                </div>
              </form>
            ) : (
              /* LISTA DE TAREFAS CORPORATIVAS DA CENTRAL */
              <div className="space-y-3">
                {centralTasks.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <FileText className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto animate-bounce" />
                    <p className={`text-xs font-bold ${textTitle}`}>Fila da Central Vazia!</p>
                    <p className="text-[10px] text-gray-400 max-w-xs mx-auto">
                      Sua central de controle estratégico está limpa. Clique em "+ Nova Tarefa" no topo para postar obrigações de faturamento e logísticas.
                    </p>
                  </div>
                ) : (
                  centralTasks.map((task) => {
                    const hasNF = !!task.invoiceCustomerName;
                    const isExpanded = expandedTaskId === task.id;
                    const isClosed = task.status === 'Concluído';
                    const isRunning = task.status === 'Em Execução';
                    const isStagnated = task.status === 'Estagnado';

                    return (
                      <div
                        key={task.id}
                        className={`p-3.5 rounded-xl border transition-all relative text-left ${
                          isClosed ? 'bg-emerald-500/5 border-emerald-500/30' :
                          isRunning ? 'bg-amber-500/5 border-amber-500/30' :
                          isStagnated ? 'bg-rose-500/5 border-rose-500/30' :
                          isDark ? 'bg-[#18181c] border-[#222228]' : 'bg-slate-50 border-gray-200'
                        }`}
                      >
                        {/* Status bar left accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                          isClosed ? 'bg-emerald-500' :
                          isRunning ? 'bg-amber-500' :
                          isStagnated ? 'bg-rose-500' : 'bg-slate-400'
                        }`} />

                        {/* Top Line of Task */}
                        <div className="flex items-start gap-2.5 pl-1.5">
                          {/* Circular clickable icon to cycle active status (igual ao checklist) */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleCentralTaskStatus(task.id, e)}
                            className="mt-0.5 shrink-0 select-none cursor-pointer focus:outline-hidden"
                            title="Alternar Situação (Clique para ciclo rápido)"
                          >
                            {isClosed ? (
                              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-500" />
                            ) : isRunning ? (
                              <span className="w-4.5 h-4.5 rounded-full border-2 border-dashed border-amber-500 inline-block animate-spin"></span>
                            ) : isStagnated ? (
                              <AlertCircle className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
                            ) : (
                              <div className="w-4.5 h-4.5 rounded-full border border-slate-400 dark:border-slate-700 hover:border-indigo-500 transition-colors" />
                            )}
                          </button>

                          <div 
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                          >
                            <span className="text-[8px] uppercase font-mono font-bold text-gray-400 block tracking-wider mb-0.5">
                              #{task.id.split('-')[1]} &bull; Postada em {task.createdAt}
                            </span>
                            <h5 className={`text-xs font-bold leading-relaxed pr-2 break-words ${
                              isClosed ? 'line-through text-gray-400 dark:text-gray-505' : textTitle
                            }`}>
                              {task.title}
                            </h5>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteCentralTask(task.id)}
                            className="p-1 rounded-lg text-gray-400 hover:text-red-500 transition-all shrink-0 cursor-pointer"
                            title="Remover da Central"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Summary Badges Panel row */}
                        <div className="mt-2.5 flex flex-wrap gap-1.5 items-center pl-7">
                          {task.assignedEmployeeName ? (
                            <span className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded text-[9px] flex items-center gap-1">
                              <Users className="w-3 h-3" /> Executor: {task.assignedEmployeeName.split(' ')[0]}
                            </span>
                          ) : (
                            <span className="bg-slate-100 dark:bg-black/20 text-slate-400 dark:text-zinc-500 px-2 py-0.5 rounded text-[8px]">
                              Sem designação
                            </span>
                          )}

                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            isClosed ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-430' :
                            isRunning ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-430' :
                            isStagnated ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-430' :
                            'bg-slate-100 dark:bg-black/20 text-slate-500'
                          }`}>
                            {task.status}
                          </span>

                          {task.invoiceTotalValue && Number(task.invoiceTotalValue) > 0 && (
                            <span className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-150 dark:border-emerald-900/30 text-emerald-650 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded text-[9px]">
                              🧾 R$ {Number(task.invoiceTotalValue).toFixed(2)}
                            </span>
                          )}

                          {/* Expand Trigger Button */}
                          <button
                            type="button"
                            onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                            className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer flex items-center gap-0.5 ${
                              isExpanded 
                                ? 'bg-slate-200 dark:bg-zinc-800 border-slate-350 text-slate-700 dark:text-white' 
                                : 'bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 border-indigo-150 text-indigo-700 dark:text-indigo-400'
                            }`}
                          >
                            <span>{isExpanded ? 'Recolher' : 'Expandir'}</span>
                            <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          </button>
                        </div>

                        {/* Expanded detail box */}
                        {isExpanded && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3.5 pt-3 border-t border-slate-200 dark:border-zinc-800 space-y-4 pl-1"
                          >
                            {/* Explanation detail */}
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-bold text-gray-400 block">Explicação da Tarefa</span>
                              <p className={`text-xs p-2.5 rounded-lg whitespace-pre-line leading-relaxed font-medium ${
                                isDark ? 'bg-zinc-900 text-slate-300' : 'bg-slate-100 text-slate-800'
                              }`}>
                                {task.description || "Nenhuma explicação fornecida para esta tarefa."}
                              </p>
                            </div>

                            {/* Designation */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] uppercase font-bold text-gray-400 block">Encaminhar / Designar Executor</span>
                              <select
                                value={task.assignedEmployeeId || ""}
                                onChange={(e) => handleAssignEmployee(task.id, e.target.value)}
                                className={`w-full p-2 border rounded-xl text-xs outline-hidden ${
                                  isDark ? 'bg-[#1c1c20] text-gray-300 border-[#262630]' : 'bg-white text-slate-800 border-slate-200'
                                }`}
                              >
                                <option value="">Não encaminhar (Disponível na lista geral central)</option>
                                {employees.map(emp => (
                                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>
                                ))}
                              </select>
                            </div>

                            {/* Financial / Invoice details */}
                            <div className="space-y-2.5 p-3 rounded-xl border border-dashed border-gray-300 dark:border-zinc-800">
                              <span className="text-[10px] uppercase font-mono font-bold text-gray-400 block mb-0.5">
                                Especificações Contábeis & Faturamento (Opcional)
                              </span>
                              
                              <div className="space-y-2">
                                <div>
                                  <label className="text-[9px] font-mono text-gray-400 block mb-0.5">Nome do Cliente / Razão Social</label>
                                  <input
                                    type="text"
                                    value={task.invoiceCustomerName || ''}
                                    onChange={(e) => handleUpdateCentralTaskInvoiceData(task.id, 'invoiceCustomerName', e.target.value)}
                                    placeholder="EX: Comércio de Alimentos LTDA"
                                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500 ${bgInput}`}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-[9px] font-mono text-gray-400 block mb-0.5">CNPJ / CPF do Cliente</label>
                                    <input
                                      type="text"
                                      value={task.invoiceCustomerTaxId || ''}
                                      onChange={(e) => handleUpdateCentralTaskInvoiceData(task.id, 'invoiceCustomerTaxId', e.target.value)}
                                      placeholder="00.000.000/0001-00"
                                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500 ${bgInput}`}
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-mono text-gray-400 block mb-0.5">Valor Comercial Total (R$)</label>
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={task.invoiceTotalValue?.toString() || ''}
                                      onChange={(e) => handleUpdateCentralTaskInvoiceData(task.id, 'invoiceTotalValue', e.target.value ? Number(e.target.value) : undefined)}
                                      placeholder="1290.00"
                                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500 ${bgInput}`}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[9px] font-mono text-gray-400 block mb-0.5">Natureza da Operação Comercial</label>
                                  <select
                                    value={task.invoiceNature || 'Venda de Mercadoria'}
                                    onChange={(e) => handleUpdateCentralTaskInvoiceData(task.id, 'invoiceNature', e.target.value)}
                                    className={`w-full p-2 border rounded-lg text-xs outline-hidden ${
                                      isDark ? 'bg-[#1c1c20] text-gray-300 border-[#262630]' : 'bg-white text-slate-800 border-slate-200'
                                    }`}
                                  >
                                    <option value="Venda de Mercadoria">Venda de Mercadoria (Padrão)</option>
                                    <option value="Prestação de Serviços">Prestação de Serviços</option>
                                    <option value="Remessa para Conserto">Remessa para Conserto / Armazém</option>
                                    <option value="Devolução de Compra">Devolução de Compra</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[9px] font-mono text-gray-400 block mb-0.5">Descrição do Produto/Serviço na NF</label>
                                  <textarea
                                    rows={2}
                                    value={task.invoiceDescription || ''}
                                    onChange={(e) => handleUpdateCentralTaskInvoiceData(task.id, 'invoiceDescription', e.target.value)}
                                    placeholder="EX: Coca-Cola 2L ou faturamento comercial de serviço"
                                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs outline-hidden focus:ring-1 focus:ring-indigo-500 ${bgInput}`}
                                  />
                                </div>

                                <button
                                  type="button"
                                  disabled={task.hasCreatedInvoiceDraft}
                                  onClick={() => handleGenerateInvoiceFromTask(task)}
                                  className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                                    task.hasCreatedInvoiceDraft 
                                      ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' 
                                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer'
                                  }`}
                                >
                                  <FileText className="w-3.5 h-3.5 shrink-0" />
                                  <span>
                                    {task.hasCreatedInvoiceDraft 
                                      ? "🧾 Rascunho Exportado para o Faturamento" 
                                      : "🧾 Exportar Rascunho de Nota Fiscal"}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Rodapé Dinâmico Dicas Gerais */}
          <div className="shrink-0 pt-2 border-t border-gray-150 dark:border-zinc-850 text-left">
            <div className="bg-slate-50 dark:bg-[#15151a] p-2.5 rounded-xl border border-gray-150 dark:border-zinc-800 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-400 dark:text-slate-400 leading-relaxed font-semibold">
                <b>Fluxo de Notas Fiscais (Passo 6)</b>: Quando preenchidos os dados contábeis em uma tarefa expandida, ao clicar em "Exportar Rascunho", um rascunho oficial de NF correspondente será migrado automaticamente para a aba **Financeiro / Notas Fiscais**.
              </p>
            </div>
          </div>
        </div>

        {/* COLUNA 3: TAREFAS ENCAMINHADAS COMPARTILHADAS (CHECKLIST DE SERVIÇOS REVISADO) */}
        <div className={`xl:col-span-1 p-5 rounded-2xl border ${bgCard} flex flex-col justify-between h-[600px] overflow-hidden`}>
          <div className="space-y-4 flex-1 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 flex items-center gap-1.5 text-left">
                  <CheckSquare className="w-4 h-4" /> Tarefas dos Funcionários
                </span>
                <span className="text-[10px] font-bold text-indigo-650 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-full font-mono shrink-0">
                  {tasks.filter(t => t.status !== 'Concluido').length} Em Execução
                </span>
              </div>
            </div>

            {/* Checklist Viewport Scroll */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-none">
              <AnimatePresence initial={false}>
                {tasks.length === 0 ? (
                  <p className="text-[11px] text-gray-400 italic text-center py-6">Nenhum executor pendente no momento.</p>
                ) : (
                  tasks.map((task) => {
                    const isClosed = task.status === 'Concluido';
                    const isRunning = task.status === 'Em Andamento';
                    const emp = employees.find(e => e.id === task.assigneeId);
                    const hasPhone = !!emp?.phone;
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={() => handleToggleTaskStatus(task.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 group relative ${
                          isClosed 
                            ? 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-900 opacity-60' 
                            : isRunning
                            ? 'bg-amber-500/5 border-amber-500/20'
                            : isDark ? 'bg-[#1c1c24] border-[#2a2a35] hover:border-indigo-650' : 'bg-white border-slate-200 hover:border-indigo-400'
                        }`}
                      >
                        {/* Checkbox Icon */}
                        <div className="mt-0.5 flex-shrink-0">
                          {isClosed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isRunning ? (
                            <span className="w-4 h-4 rounded-full border-2 border-dashed border-amber-500 inline-block animate-spin"></span>
                          ) : (
                            <div className="w-4 h-4 rounded-md border border-slate-400 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-600 transition-colors">
                              <span className="w-2 h-2 rounded-sm bg-indigo-600 opacity-0 group-hover:opacity-30"></span>
                            </div>
                          )}
                        </div>

                        {/* Detalhes da tarefa */}
                        <div className="flex-1 min-w-0 pr-12">
                          <p className={`text-xs font-bold leading-snug break-words ${
                            isClosed ? 'line-through text-gray-400 dark:text-gray-500' : textTitle
                          }`}>
                            {task.title}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[9px] text-gray-400 font-mono">
                            <span className="text-slate-500">Autor: <b className="font-semibold">{task.assignerName.split(' ')[0]}</b></span>
                            <span>&bull;</span>
                            <span className="text-indigo-505 dark:text-indigo-405 font-bold">Executor: {task.assigneeName.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* Ações da Tarefa */}
                        <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-10">
                          <a
                            href={hasPhone ? `https://wa.me/${emp?.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Olá, *${task.assigneeName}*!\n\nVocê recebeu uma tarefa para cumprir no sistema:\n\n📌 *Tarefa:* ${task.title}\n👤 *Designado por:* ${task.assignerName}\n📅 *Data:* ${task.dateCreated}\n\nPor favor, realize a atividade e atualize o status no sistema após concluir. Obrigado!`
                            )}` : '#'}
                            target={hasPhone ? '_blank' : undefined}
                            rel={hasPhone ? 'noopener noreferrer' : undefined}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!hasPhone) {
                                alert(`O executor ${task.assigneeName} não possui número de WhatsApp cadastrado. Acesse o Módulo Contábil > Gestão de Funcionários para adicionar.`);
                              }
                            }}
                            className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
                              hasPhone 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs' 
                                : 'bg-gray-200 dark:bg-gray-850 text-gray-400 hover:text-gray-500 hover:bg-slate-350'
                            }`}
                            title={hasPhone ? "Encaminhar tarefa via WhatsApp" : "Sem WhatsApp cadastrado (Adicione na Gestão de Funcionários)"}
                          >
                            <Phone className="w-3 h-3" />
                          </a>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task.id, e);
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-505 transition-all"
                            title="Remover instrução"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Status Chip overlay */}
                        <div className="absolute right-3 bottom-1.5 text-[8px] font-bold font-sans">
                          {isClosed && <span className="text-emerald-500 uppercase">Concluído</span>}
                          {isRunning && <span className="text-amber-500 uppercase animate-pulse">Fazendo</span>}
                          {!isClosed && !isRunning && <span className="text-gray-450 uppercase">Fila</span>}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 p-2.5 rounded-xl flex items-start gap-2 mt-3 block">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-indigo-950 dark:text-indigo-400 leading-relaxed font-semibold">
              <strong>Painel de Atuação</strong>: Clique ciclicamente sobre qualquer tarefa da equipe para alterar os status (<b>Fila</b> &rarr; <b>Em Andamento</b> &rarr; <b>Concluído</b>).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
