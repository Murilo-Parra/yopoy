/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  LayoutDashboard, 
  Users, 
  Scan, 
  ShoppingCart,
  MapPin, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  AlertTriangle,
  FileSpreadsheet,
  FileText,
  Settings,
  LogOut,
  ChevronUp,
  Briefcase,
  Layers,
  Banknote,
  Sun,
  Moon,
  Workflow,
  Maximize2,
  Minimize2,
  Info,
  ArrowLeft,
  X,
  Check,
  CheckCircle2,
  CreditCard,
  Shield,
  Menu
} from 'lucide-react';
import { Product, Employee, Transaction, Task, isTransactionRevenue } from './types';
import { YopoyCentralDashboard } from './features/yopoy-central-do-dia/YopoyCentralDashboard';
import FinanceTool from './components/FinanceTool';
import LogisticsTool from './components/LogisticsTool';
import ChatAssistant from './components/ChatAssistant';
import HierarchyTool from './components/HierarchyTool';
import InvoiceTool from './components/InvoiceTool';
import NfseTool from './components/NfseTool';
import MonthlyFinanceChart from './components/MonthlyFinanceChart';
import SettingsTool from './components/SettingsTool';
import OnboardingTutorial from './components/OnboardingTutorial';
import ElparrarLandingPage from './components/ElparrarLandingPage';
import MasterAdminTool from './components/MasterAdminTool';
import NfcePosTool from './components/NfcePosTool';
import YopoyLogo from './components/YopoyLogo';
import { useAuth } from './frontend/auth/AuthContext';
import ProtectedModule from './frontend/auth/ProtectedModule';
import PermissionGate from './frontend/auth/PermissionGate';
import { MODULE_PERMISSIONS } from './frontend/auth/modulePermissions';

export default function App() {
  const { authenticated, loading: authLoading, user: authUser, companyId, logout: apiLogout, refreshSession } = useAuth();

  // Controle de Tela Ativa: 'landing' (Página Inicial de Planos de Elparrar) ou 'erp' (Sistema Integrado)
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [viewMode, setViewMode] = useState<'landing' | 'erp'>('landing');

  const [selectedPlan, setSelectedPlan] = useState<'micro' | 'pequena' | 'media' | 'corporativo'>('media');

  // Controle de Abas Principais da Barra Lateral
  // 'dashboard' (Central), 'finance' (Contábil), 'logistics' (Estoque), 'advisor' (ChatGPT do Negócio), 'hierarchy' (Organograma), 'invoice' (Emitir Nota), 'settings' (Configurações), 'master_admin' (Super Administrador)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'finance' | 'logistics' | 'advisor' | 'hierarchy' | 'invoice' | 'settings' | 'master_admin' | 'nfce_pos'>('dashboard');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [expandedCard, setExpandedCard] = useState<'cash' | 'alerts' | 'team' | 'activity' | 'critical_product' | null>(null);

  // Estado do Tutorial de Onboarding (Boas-vindas primeiro acesso)
  const [showTutorial, setShowTutorial] = useState<boolean>(() => {
    return localStorage.getItem('biz_onboarding_tutorial_viewed') !== 'true';
  });

  // Modo Claro e Escuro com persistência local
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('biz_app_theme') as 'light' | 'dark') || 'dark';
  });

  // Estados para Gestão de Planos da Assinatura (Upgrade/Navegação Interativa de Planos)
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<'micro' | 'pequena' | 'media' | 'corporativo' | null>(null);
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState('');
  const [showCelebrateScreen, setShowCelebrateScreen] = useState(false);
  const [checkoutPayMethod, setCheckoutPayMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [checkoutCardNum, setCheckoutCardNum] = useState('');
  const [checkoutCardName, setCheckoutCardName] = useState('');
  const [checkoutCardExpiry, setCheckoutCardExpiry] = useState('');
  const [checkoutCardCvv, setCheckoutCardCvv] = useState('');
  const [adminNotification, setAdminNotification] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sincronização automatizada e reativa do estado de autenticação real (Módulo 48.2-H)
  useEffect(() => {
    if (authenticated && authUser) {
      setViewMode('erp');
      setCurrentUser(authUser);
      setSelectedPlan(authUser.plan || 'media');

      const corpName = authUser.tradeName || authUser.corporateName || authUser.name || 'Empresa Distribuidora';
      setCorporateName(authUser.corporateName || corpName);
      setTradeName(authUser.tradeName || corpName);
      setCnpj(authUser.cnpj || '00.000.000/0000-00');
    } else if (!authLoading && !authenticated) {
      setViewMode('landing');
      setCurrentUser(null);
    }
  }, [authenticated, authUser, authLoading]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('biz_app_theme', nextTheme);
  };

  const handleLoginSuccess = (user: any) => {
    localStorage.setItem('biz_current_user', JSON.stringify(user));
    let corpName = '';
    let tName = '';
    let docCnpj = '';

    if (user.type === 'pj') {
      corpName = user.corporateName || '';
      tName = user.tradeName || '';
      docCnpj = user.cnpj || '';
    } else if (user.type === 'pf') {
      corpName = user.name || '';
      tName = (user.name || '').split(' ')[0] + ' MEI';
      docCnpj = user.cpf || '';
    } else if (user.isAdmin) {
      corpName = 'YOPOY ADMIN CORP DIRECT';
      tName = 'YOPOY ADMIN';
      docCnpj = '00.000.000/0001-99';
    }

    localStorage.setItem('cfg_corporate_name', corpName);
    localStorage.setItem('cfg_trade_name', tName);
    localStorage.setItem('cfg_cnpj', docCnpj);

    // Transição suave em memória para evitar a tela branca temporária do reload
    setCurrentUser(user);
    setSelectedPlan(user.plan || 'media');
    setCorporateName(corpName);
    setTradeName(tName);
    setCnpj(docCnpj);
    setViewMode('erp');
    setActiveTab('dashboard');

    const savedProducts = localStorage.getItem('biz_simulated_products');
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { setProducts([]); }
    } else {
      setProducts([]);
    }

    const savedEmployees = localStorage.getItem('biz_simulated_employees');
    if (savedEmployees) {
      try { setEmployees(JSON.parse(savedEmployees)); } catch (e) { setEmployees([]); }
    } else {
      setEmployees([]);
    }

    const savedTransactions = localStorage.getItem('biz_simulated_transactions');
    if (savedTransactions) {
      try { setTransactions(JSON.parse(savedTransactions)); } catch (e) { setTransactions([]); }
    } else {
      setTransactions([]);
    }

    const savedCash = localStorage.getItem('biz_simulated_cash_balance');
    setCashBalance(savedCash ? Number(savedCash) : 0);

    const savedInvoices = localStorage.getItem('biz_simulated_invoices');
    if (savedInvoices) {
      try { setSimulatedInvoices(JSON.parse(savedInvoices)); } catch (e) { setSimulatedInvoices([]); }
    } else {
      setSimulatedInvoices([]);
    }

    const savedTasks = localStorage.getItem('biz_simulated_tasks');
    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks)); } catch (e) { setTasks([]); }
    } else {
      setTasks([]);
    }

    const reg = localStorage.getItem('cfg_tax_regime');
    if (reg) setTaxRegime(reg);
    const rate = localStorage.getItem('cfg_tax_rate');
    if (rate) setTaxRate(Number(rate));
    const exp = localStorage.getItem('cfg_exp_days');
    if (exp) setExpiringWarningDays(Number(exp));
    const minS = localStorage.getItem('cfg_min_stock');
    if (minS) setMinStockLimit(Number(minS));

    setShowTutorial(localStorage.getItem('biz_onboarding_tutorial_viewed') !== 'true');
  };

  const handleLogout = () => {
    // Chamar logout da API segura via cookie HTTP-Only (Módulo 48.2-H)
    apiLogout().catch(err => {
      console.warn("Erro ao deslogar sessão segura no backend:", err);
    });

    localStorage.removeItem('biz_current_user');
    
    // Retorna e restaura os estados ao inicial do landing sem recarregar a página
    setCurrentUser(null);
    setSelectedPlan('media');
    setViewMode('landing');
    setActiveTab('dashboard');
    setCorporateName('AUXILIAR BIZ DISTRIBUIDORA LTDA');
    setTradeName('AUXILIAR BIZ');
    setCnpj('48.174.526/0001-85');
    setTaxRegime('Simples Nacional');
    setTaxRate(4.5);
    setExpiringWarningDays(7);
    setMinStockLimit(10);
    
    setProducts([]);
    setEmployees([]);
    setTransactions([]);
    setCashBalance(0);
    setSimulatedInvoices([]);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsExpanded(false);
    setIsMobileMenuOpen(false);

    // Atualizar as Notas Fiscais ao navegar
    const savedInvoices = localStorage.getItem('biz_simulated_invoices');
    if (savedInvoices) {
      try {
        setSimulatedInvoices(JSON.parse(savedInvoices));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePlanUpgrade = (targetPlan: 'micro' | 'pequena' | 'media' | 'corporativo') => {
    setSelectedPlan(targetPlan);
    
    // Updates local storage current user
    const savedUser = localStorage.getItem('biz_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        u.plan = targetPlan;
        setCurrentUser(u);
        localStorage.setItem('biz_current_user', JSON.stringify(u));
      } catch (e) {
        console.error(e);
      }
    }

    // Updates user inside registered users list (persistence)
    const listRaw = localStorage.getItem('biz_registered_users');
    if (listRaw) {
      try {
        const list = JSON.parse(listRaw);
        const savedUserParsed = savedUser ? JSON.parse(savedUser) : null;
        if (savedUserParsed) {
          const emailToFind = savedUserParsed.email || savedUserParsed.pjEmail;
          const updatedList = list.map((u: any) => {
            const uEmail = u.email || u.pjEmail;
            if (uEmail && uEmail === emailToFind) {
              return { ...u, plan: targetPlan };
            }
            return u;
          });
          localStorage.setItem('biz_registered_users', JSON.stringify(updatedList));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const startSimulatedUpgrade = (targetPlan: 'micro' | 'pequena' | 'media' | 'corporativo') => {
    setIsProcessingUpgrade(true);
    setUpgradeMessage('Iniciando comunicação segura com gateway de pagamentos Yopoy Pay...');
    
    setTimeout(() => {
      setUpgradeMessage('Validando sua forma de pagamento e provendo fundos autorizados...');
    }, 1000);

    setTimeout(() => {
      setUpgradeMessage('Atualizando licenças corporativas do sistema...');
    }, 2200);

    setTimeout(() => {
      handlePlanUpgrade(targetPlan);
      setIsProcessingUpgrade(false);
      setShowCelebrateScreen(true);
    }, 3500);
  };

  // Helper de acesso às abas (por plano e por permissão de funcionário)
  const isTabAllowed = (tab: string): boolean => {
    if (tab === 'master_admin') {
      const email = currentUser?.login || currentUser?.email;
      return email === 'admin@elparrar.com';
    }

    // Plano Restrições (Aplicam-se a todos, inclusive admins)
    if (selectedPlan === 'micro') {
      const allowed = ['dashboard', 'finance', 'invoice', 'settings', 'nfce_pos'];
      if (!allowed.includes(tab)) return false;
    } else if (selectedPlan === 'pequena') {
      const allowed = ['dashboard', 'finance', 'invoice', 'hierarchy', 'settings', 'nfce_pos', 'logistics'];
      if (!allowed.includes(tab)) return false;
    }

    if (currentUser?.isAdmin) return true;

    // Sub-unidades e Funcionários
    if (currentUser?.isSubUser && currentUser?.allowedTabs) {
      if (!currentUser.allowedTabs.includes(tab)) {
        return false;
      }
    }

    return true;
  };

  // Garante que o usuário não permaneça em uma aba não permitida
  useEffect(() => {
    if (!isTabAllowed(activeTab)) {
      const fallbackList = ['dashboard', 'finance', 'logistics', 'invoice', 'hierarchy', 'advisor', 'settings', 'nfce_pos', 'master_admin'];
      const firstAllowed = fallbackList.find(t => isTabAllowed(t)) || 'dashboard';
      setActiveTab(firstAllowed as any);
    }
  }, [selectedPlan, activeTab, currentUser]);

  // Estados reativos baseados nas configurações locais
  const [corporateName, setCorporateName] = useState(() => {
    const savedUser = localStorage.getItem('biz_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.type === 'pj') return u.corporateName || 'Yopoy Ltda';
        if (u.type === 'pf') return u.name || 'Empresa Individual';
        if (u.isAdmin) return 'YOPOY ADMIN CORP DIRECT';
      } catch (e) {}
    }
    return localStorage.getItem('cfg_corporate_name') || 'AUXILIAR YOPOY DISTRIBUIDORA LTDA';
  });

  const [tradeName, setTradeName] = useState(() => {
    const savedUser = localStorage.getItem('biz_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.type === 'pj') return u.tradeName || 'Yopoy';
        if (u.type === 'pf') return (u.name || '').split(' ')[0] + ' MEI';
        if (u.isAdmin) return 'YOPOY ADMIN';
      } catch (e) {}
    }
    return localStorage.getItem('cfg_trade_name') || 'AUXILIAR YOPOY';
  });

  const [cnpj, setCnpj] = useState(() => {
    const savedUser = localStorage.getItem('biz_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.type === 'pj') return u.cnpj || '00.000.000/0001-00';
        if (u.type === 'pf') return u.cpf || '000.000.000-00';
        if (u.isAdmin) return '00.000.000/0001-99';
      } catch (e) {}
    }
    return localStorage.getItem('cfg_cnpj') || '48.174.526/0001-85';
  });
  const [taxRegime, setTaxRegime] = useState(() => localStorage.getItem('cfg_tax_regime') || 'Simples Nacional');
  const [taxRate, setTaxRate] = useState(() => Number(localStorage.getItem('cfg_tax_rate')) || 4.5);
  const [expiringWarningDays, setExpiringWarningDays] = useState(() => Number(localStorage.getItem('cfg_exp_days')) || 7);
  const [minStockLimit, setMinStockLimit] = useState(() => Number(localStorage.getItem('cfg_min_stock')) || 10);

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setCorporateName(localStorage.getItem('cfg_corporate_name') || 'AUXILIAR YOPOY DISTRIBUIDORA LTDA');
      setTradeName(localStorage.getItem('cfg_trade_name') || 'AUXILIAR YOPOY');
      setCnpj(localStorage.getItem('cfg_cnpj') || '48.174.526/0001-85');
      setTaxRegime(localStorage.getItem('cfg_tax_regime') || 'Simples Nacional');
      setTaxRate(Number(localStorage.getItem('cfg_tax_rate')) || 4.5);
      setExpiringWarningDays(Number(localStorage.getItem('cfg_exp_days')) || 7);
      setMinStockLimit(Number(localStorage.getItem('cfg_min_stock')) || 10);
    };
    window.addEventListener('storage', handleSettingsUpdate);
    return () => window.removeEventListener('storage', handleSettingsUpdate);
  }, []);

  // Estados Integrados do Sistema (Fonte de Verdade Única)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('biz_simulated_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    const isLogged = !!localStorage.getItem('biz_current_user');
    return [];
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('biz_simulated_employees');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    const isLogged = !!localStorage.getItem('biz_current_user');
    return [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('biz_simulated_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    const isLogged = !!localStorage.getItem('biz_current_user');
    return [];
  });

  const [cashBalance, setCashBalance] = useState<number>(() => {
    const saved = localStorage.getItem('biz_simulated_cash_balance');
    return saved ? Number(saved) : 0;
  });

  // Estado das Notas Fiscais Simuladas para o plano Micro
  const [simulatedInvoices, setSimulatedInvoices] = useState<any[]>(() => {
    const saved = localStorage.getItem('biz_simulated_invoices');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Estado de tarefas compartilhado e persistido
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('biz_simulated_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Persistência de dados integrados
  useEffect(() => {
    localStorage.setItem('biz_simulated_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('biz_simulated_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('biz_simulated_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('biz_simulated_cash_balance', cashBalance.toString());
  }, [cashBalance]);

  // Persistência de tarefas
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('biz_simulated_tasks');
      if (saved) {
        try { setTasks(JSON.parse(saved)); } catch (e) { console.error(e); }
      }
      const savedProducts = localStorage.getItem('biz_simulated_products');
      if (savedProducts) {
        try { setProducts(JSON.parse(savedProducts)); } catch (e) { console.error(e); }
      }
      const savedEmployees = localStorage.getItem('biz_simulated_employees');
      if (savedEmployees) {
        try { setEmployees(JSON.parse(savedEmployees)); } catch (e) { console.error(e); }
      }
      const savedTransactions = localStorage.getItem('biz_simulated_transactions');
      if (savedTransactions) {
        try { setTransactions(JSON.parse(savedTransactions)); } catch (e) { console.error(e); }
      }
      const savedCash = localStorage.getItem('biz_simulated_cash_balance');
      if (savedCash) {
        setCashBalance(Number(savedCash) || 0);
      }
      const savedInvoices = localStorage.getItem('biz_simulated_invoices');
      if (savedInvoices) {
        try { setSimulatedInvoices(JSON.parse(savedInvoices)); } catch (e) { console.error(e); }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('biz_simulated_tasks', JSON.stringify(tasks));
  }, [tasks]);


  const REFERENCE_DATE = new Date('2026-05-31');

  // Cálculo Dinâmico do Caixa baseado em Receitas e Despesas faturadas
  const totalRevenues = transactions
    .filter(isTransactionRevenue)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => !isTransactionRevenue(t))
    .reduce((sum, t) => sum + t.amount, 0);

  const currentCash = cashBalance + totalRevenues - totalExpenses;

  // Alerta de validade: verifica se expira em até expiringWarningDays dias
  const checkIsExpiringInOneWeek = (expirationStr: string): boolean => {
    const expDate = new Date(expirationStr);
    const timeDiff = expDate.getTime() - REFERENCE_DATE.getTime();
    return timeDiff >= 0 && timeDiff <= expiringWarningDays * 24 * 3600 * 1000;
  };

  const checkIsExpired = (expirationStr: string): boolean => {
    const expDate = new Date(expirationStr);
    return expDate.getTime() < REFERENCE_DATE.getTime();
  };

  // Contagem de alertas e lotes críticos baseados em dados reais do produtos
  const expiredCount = products.filter(p => new Date(p.expirationDate).getTime() < REFERENCE_DATE.getTime()).length;
  const expiringCount = products.filter(p => {
    const timeDiff = new Date(p.expirationDate).getTime() - REFERENCE_DATE.getTime();
    return timeDiff >= 0 && timeDiff <= expiringWarningDays * 24 * 3600 * 1000;
  }).length;
  const totalAlerts = expiredCount + expiringCount;

  // Precalcula o produto com validade mais crítica
  const sortedProducts = [...products].sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
  const worstProduct = sortedProducts[0] || null;
  const isWorstExpired = worstProduct ? new Date(worstProduct.expirationDate).getTime() < REFERENCE_DATE.getTime() : false;
  const isWorstExpiringSoon = worstProduct && !isWorstExpired ? (new Date(worstProduct.expirationDate).getTime() - REFERENCE_DATE.getTime()) <= expiringWarningDays * 24 * 3600 * 1000 : false;

  const getSidebarBtnClass = (tab: typeof activeTab) => {
    const isActive = activeTab === tab;
    if (theme === 'dark') {
      return isActive 
        ? 'bg-[#1e293b] text-[#f8fafc] shadow-xs flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all'
        : 'text-[#94a3b8] hover:bg-[#1e1e24] hover:text-[#e2e8f0] flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all';
    } else {
      return isActive
        ? 'bg-indigo-600 text-white shadow-md flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-medium tracking-wide transition-all';
    }
  };

  const currentThemeTextClass = theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-900';
  const currentThemeSubtextClass = theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500';

  return (
    <AnimatePresence mode="wait">
      {viewMode === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          <ElparrarLandingPage 
            theme={theme}
            toggleTheme={toggleTheme}
            onSelectPlan={(plan) => {
              setSelectedPlan(plan);
              setViewMode('erp');
            }}
            onLoginSuccess={handleLoginSuccess}
          />
        </motion.div>
      ) : (
        <motion.div
          key="erp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-[#0a0a0c] text-[#e2e8f0]' : 'bg-[#f4f7fa] text-slate-800'} font-sans flex flex-col overflow-x-hidden w-full`}
        >
          <div className="bg-red-600/90 text-white text-center py-1.5 text-xs font-bold w-full uppercase tracking-wider z-50 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            FLUXO LEGADO VISUAL. AÇÕES FISCAIS REAIS ESTÃO BLOQUEADAS E NÃO CONECTADAS AO BACKEND V2.
          </div>
          
          {/* Layout de Sidebar de Grade de 2 Colunas */}
          <div className="flex flex-1 min-h-screen">
        
        {/* BARRA LATERAL (SIDEBAR) RESPONSIVA COM SUPORTE MOBILE */}
        {isMobileMenuOpen && (
          <div 
            id="backdrop-mobile-menu"
            className="fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {!isExpanded && (
          <aside 
            id="sidebar-main"
            className={`transition-all duration-300 p-6 flex flex-col justify-between shrink-0 
              ${isMobileMenuOpen 
                ? 'fixed inset-y-0 left-0 bg-[#111114] border-r border-[#222228] w-64 z-[60] shadow-2xl flex' 
                : 'w-64 hidden md:flex'
              } 
              ${theme === 'dark' ? 'bg-[#111114] border-r border-[#222228]' : 'bg-white border-r border-slate-200/95 text-slate-700'}
            `}
          >
            <div className="space-y-8">
                         {/* Logotipo do Sistema */}
              <div className="flex items-center gap-3">
                <YopoyLogo size={36} theme={theme} />
              </div>

              {/* Plano de Licenciamento Ativo */}
              <div className={`p-3 rounded-xl border flex flex-col gap-1 ${
                theme === 'dark' ? 'bg-[#15151a] border-[#222228]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Licença Yopoy</span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded ${
                    selectedPlan === 'media' 
                      ? 'bg-rose-500/10 text-rose-500' 
                      : selectedPlan === 'pequena' 
                      ? 'bg-indigo-500/10 text-indigo-500'
                      : selectedPlan === 'micro'
                      ? 'bg-slate-500/10 text-slate-500'
                      : 'bg-purple-500/10 text-purple-500'
                  }`}>Ativa</span>
                </div>
                <p className={`text-xs font-bold leading-tight uppercase ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {selectedPlan === 'media' && 'Plano Premium'}
                  {selectedPlan === 'pequena' && 'Plano Médio'}
                  {selectedPlan === 'micro' && 'Plano Básico'}
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-[10px] text-indigo-550 dark:text-indigo-400 hover:underline text-left mt-0.5 font-bold cursor-pointer"
                >
                  Sair do ERP (Desconectar) &larr;
                </button>
              </div>

              {/* Menu de Navegação */}
              <nav className="flex flex-col gap-1.5 font-sans">
                {isTabAllowed('dashboard') && (
                  <button
                    id="sidebar-nav-dashboard"
                    onClick={() => handleTabChange('dashboard')}
                    className={getSidebarBtnClass('dashboard')}
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-550" />
                    Painel de Controle
                  </button>
                )}

                {isTabAllowed('finance') && (
                  <button
                    id="sidebar-nav-finance"
                    onClick={() => handleTabChange('finance')}
                    className={getSidebarBtnClass('finance')}
                  >
                    <DollarSign className="w-4 h-4 text-emerald-550" />
                    Módulo Contábil
                  </button>
                )}

                {isTabAllowed('logistics') && (
                  <button
                    id="sidebar-nav-logistics"
                    onClick={() => handleTabChange('logistics')}
                    className={getSidebarBtnClass('logistics')}
                  >
                    <Scan className="w-4 h-4 text-emerald-550" />
                    Logística & Estoque
                  </button>
                )}

                {isTabAllowed('invoice') && (
                  <button
                    id="sidebar-nav-invoice"
                    onClick={() => handleTabChange('invoice')}
                    className={getSidebarBtnClass('invoice')}
                  >
                    <FileText className="w-4 h-4 text-indigo-500" />
                    Emitir Nota (Sebrae)
                  </button>
                )}

                {isTabAllowed('nfce_pos') && (
                  <button
                    id="sidebar-nav-nfce-pos"
                    onClick={() => handleTabChange('nfce_pos')}
                    className={getSidebarBtnClass('nfce_pos')}
                  >
                    <ShoppingCart className="w-4 h-4 text-[#eab308]" />
                    Terminal NFC-e (PDV)
                  </button>
                )}

                {isTabAllowed('hierarchy') && (
                  <button
                    id="sidebar-nav-hierarchy"
                    onClick={() => handleTabChange('hierarchy')}
                    className={getSidebarBtnClass('hierarchy')}
                  >
                    <Users className="w-4 h-4 text-indigo-505" />
                    Hierarquia & Tarefas
                  </button>
                )}

                {isTabAllowed('advisor') && (
                  <button
                    id="sidebar-nav-advisor"
                    onClick={() => handleTabChange('advisor')}
                    className={getSidebarBtnClass('advisor')}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Orientação IA
                  </button>
                )}

                {isTabAllowed('settings') && (
                  <button
                    id="sidebar-nav-settings-main"
                    onClick={() => handleTabChange('settings')}
                    className={getSidebarBtnClass('settings')}
                  >
                    <Settings className="w-4 h-4 text-indigo-400" />
                    Configurações
                  </button>
                )}

                {isTabAllowed('master_admin') && (
                  <button
                    id="sidebar-nav-master-admin"
                    onClick={() => handleTabChange('master_admin')}
                    className={getSidebarBtnClass('master_admin')}
                  >
                    <Shield className="w-4 h-4 text-rose-500 animate-pulse" />
                    <span className="text-rose-400 font-extrabold">Painel SaaS Master</span>
                  </button>
                )}
              </nav>
            </div>

            {/* Rodapé da Barra Lateral */}
            <div className={`pt-6 border-t ${theme === 'dark' ? 'border-[#222228]' : 'border-slate-200'} space-y-4`}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Consola Online v1.2</span>
              </div>
              
              {/* Quick light/dark indicator in bottom of sidebar */}
              <button 
                onClick={toggleTheme}
                className={`w-full py-2 px-3 text-[11px] font-bold rounded-lg transition-all flex items-center justify-between border ${
                  theme === 'dark' 
                    ? 'bg-[#18181c] hover:bg-[#202028] text-[#ccd6e0] border-[#222228]' 
                    : 'bg-slate-50 hover:bg-slate-105 text-slate-700 border-slate-200/80 shadow-xs'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                  Modo {theme === 'dark' ? 'Escuro' : 'Claro'}
                </span>
                <span className="text-[8px] tracking-wider uppercase opacity-60">Alterar</span>
              </button>

              <div className="flex flex-col gap-1">
                <button
                  id="sidebar-nav-settings-footer"
                  onClick={() => handleTabChange('settings')}
                  className={`flex items-center justify-between text-[11px] font-bold py-2 px-3 rounded-lg cursor-pointer transition-colors text-left w-full ${
                    activeTab === 'settings' 
                      ? (theme === 'dark' ? 'bg-[#1e293b] text-[#f8fafc]' : 'bg-slate-100 text-slate-900') 
                      : 'text-[#94a3b8] hover:text-emerald-400'
                  }`}
                >
                  <span className="flex items-center gap-2"><Settings className="w-3.5 h-3.5" /> Definições</span>
                </button>
                <div 
                  onClick={handleLogout}
                  className="flex items-center justify-between text-[11px] text-[#94a3b8] font-medium hover:text-red-400 cursor-pointer mt-0.5 px-3"
                >
                  <span className="flex items-center gap-2"><LogOut className="w-3.5 h-3.5" /> Encerrar Sessão</span>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* CONTAINER CONTEÚDO PRINCIPAL + TOPBAR */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* CABEÇALHO SUPERIOR (TOP-BAR) */}
          {!isExpanded && (
            <header className={`h-16 transition-colors duration-200 border-b ${theme === 'dark' ? 'bg-[#0a0a0c] border-[#1c1c24]/60' : 'bg-white border-slate-200'} px-6 flex items-center justify-between sticky top-0 z-40`}>
              <div className="flex items-center gap-3">
                {/* BOTÃO BURGER DO MENU MOBILE */}
                <button
                  type="button"
                  id="btn-mobile-sidebar-toggle"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  title="Abrir Menu Lateral"
                  className={`p-2 rounded-xl border flex md:hidden items-center justify-center transition-all hover:scale-95 active:scale-90 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-[#121217] text-[#10b981] border-[#22222a] hover:bg-[#181822] hover:text-[#34d399]' 
                      : 'bg-white text-emerald-600 border-slate-200 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* BOTÃO VOLTAR PARA A AÇÃO ANTERIOR (PLANOS) */}
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sair da Conta - Logout do Sistema"
                  className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all hover:scale-95 active:scale-90 cursor-pointer text-xs font-bold ${
                    theme === 'dark' 
                      ? 'bg-[#121217] text-gray-300 border-[#22222a] hover:bg-[#181822] hover:text-white' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 text-rose-500 dark:text-orange-400" />
                  <span className="hidden md:inline">Sair do ERP</span>
                </button>

                <div className="h-6 w-px bg-slate-300 dark:bg-slate-800"></div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-[#94a3b8] font-medium">
                      Bem-vindo, <b className={`${theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-800'} font-semibold`}>
                        {currentUser?.isAdmin ? "Administrador Master" : (currentUser?.type === 'pj' ? (currentUser.tradeName || currentUser.corporateName) : (currentUser?.name || "Administrador"))}
                      </b>
                    </p>
                    <button
                      type="button"
                      id="btn-trigger-plan-modal"
                      onClick={() => {
                        setIsPlanModalOpen(true);
                        setSelectedUpgradePlan(null);
                        setUpgradeMessage('');
                        setShowCelebrateScreen(false);
                      }}
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                        selectedPlan === 'media' ? 'bg-rose-500/15 text-rose-655 dark:text-orange-400 border border-rose-500/35 hover:bg-rose-500/25' :
                        selectedPlan === 'pequena' ? 'bg-indigo-500/15 text-indigo-650 dark:text-indigo-400 border border-indigo-500/35 hover:bg-indigo-500/25' :
                        selectedPlan === 'micro' ? 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20 hover:bg-slate-500/20' :
                        'bg-[#a855f7]/15 text-[#a855f7] dark:text-[#c084fc] border border-[#a855f7]/30'
                      }`}
                      title={currentUser?.isAdmin ? "Painel Admin: Navegue Livremente Entre os Planos" : "Sua assinatura de plano. Clique para gerenciar ou fazer upgrade"}
                    >
                      <span>
                        {selectedPlan === 'media' && 'Plano Premium ✦'}
                        {selectedPlan === 'pequena' && 'Plano Médio ✦'}
                        {selectedPlan === 'micro' && 'Plano Básico ✦'}
                        {selectedPlan === 'corporativo' && 'Plano Corporativo ✦'}
                      </span>
                      <span className="text-[8px] bg-slate-900/10 dark:bg-white/10 px-1 py-0.5 rounded font-sans uppercase opacity-80 shrink-0">
                        {currentUser?.isAdmin ? "MUDAR" : "UPGRADE"}
                      </span>
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Operando em 31 de Maio de 2026</p>
                </div>
              </div>

              {/* Chips de Indicadores ao Vivo no Topbar + Botão Claro/Escuro */}
              <div className="flex items-center gap-3 text-xs">
                
                {/* INTERRUPTOR CLARO/ESCURO INDEPENDENTE NO TOPBAR */}
                <button 
                  onClick={toggleTheme}
                  id="btn-theme-toggle"
                  title={`Mudar para Modo ${theme === 'dark' ? 'Claro' : 'Escuro'}`}
                  className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
                    theme === 'dark' 
                      ? 'bg-[#111114]/80 text-[#e2e8f0] border-[#222228] hover:bg-[#1a1a20]' 
                      : 'bg-slate-50 text-slate-800 border-slate-200 shadow-xs hover:bg-slate-100/70'
                  }`}
                >
                  {theme === 'dark' ? (
                    <div className="flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Claro</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Escuro</span>
                    </div>
                  )}
                </button>

                {/* BOTÃO PARA REABRIR O TUTORIAL DE BEM-VINDO */}
                <button 
                  onClick={() => setShowTutorial(true)}
                  title="Ver Tutorial de Boas-vindas"
                  className={`p-2.5 rounded-xl border transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-[#111114]/80 text-[#e2e8f0] border-[#222228] hover:bg-[#1a1a20]' 
                      : 'bg-slate-50 text-slate-800 border-slate-200 shadow-xs hover:bg-slate-100/70'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-emerald-505 animate-pulse shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Guia</span>
                </button>

                <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                  theme === 'dark' ? 'bg-[#111114]/60 border-[#222228] text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  <span className="text-gray-400 font-medium">Caixa:</span>
                  <span className={`font-mono font-bold ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-900'}`}>
                    R$ {currentCash.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {totalAlerts > 0 ? (
                  <div className="bg-amber-950/20 border border-amber-900/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-amber-400">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                    <span className="font-semibold">{totalAlerts} {totalAlerts === 1 ? 'alerta' : 'alertas'}</span>
                  </div>
                ) : (
                  <div className="bg-emerald-950/20 border border-emerald-950/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span className="font-semibold">Estoque OK</span>
                  </div>
                )}
              </div>
            </header>
          )}

          {/* NAVEGAÇÃO MOBILE (Visível apenas em Mobile) */}
          {!isExpanded && (
            <div className={`md:hidden p-3 flex gap-1 overflow-x-auto border-b ${
              theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'
            }`}>
              {isTabAllowed('dashboard') && (
                <button
                  onClick={() => handleTabChange('dashboard')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-[#94a3b8]'
                  }`}
                >
                  Dashboard
                </button>
              )}
              {isTabAllowed('finance') && (
                <button
                  onClick={() => handleTabChange('finance')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'finance' ? 'bg-indigo-600 text-white' : 'text-[#94a3b8]'
                  }`}
                >
                  Contas/Equipe
                </button>
              )}
              {isTabAllowed('logistics') && (
                <button
                  onClick={() => handleTabChange('logistics')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'logistics' ? 'bg-indigo-600 text-white' : 'text-[#94a3b8]'
                  }`}
                >
                  Logística
                </button>
              )}
              {isTabAllowed('invoice') && (
                <button
                  onClick={() => handleTabChange('invoice')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'invoice' ? 'bg-indigo-600 text-white' : 'text-[#94a3b8]'
                  }`}
                >
                  Emitir NF-e (Mercadoria)
                </button>
              )}
              {isTabAllowed('nfse_module') && (
                <button
                  onClick={() => handleTabChange('nfse_module')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'nfse_module' ? 'bg-emerald-600 text-white' : 'text-emerald-400'
                  }`}
                >
                  NFS-e (Serviços)
                </button>
              )}
              {isTabAllowed('nfce_pos') && (
                <button
                  onClick={() => handleTabChange('nfce_pos')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'nfce_pos' ? 'bg-indigo-600 text-white font-extrabold' : 'text-amber-400'
                  }`}
                >
                  NFC-e (PDV)
                </button>
              )}
              {isTabAllowed('hierarchy') && (
                <button
                  onClick={() => handleTabChange('hierarchy')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'hierarchy' ? 'bg-indigo-600 text-white' : 'text-[#94a3b8]'
                  }`}
                >
                  Hierarquia/Tarefas
                </button>
              )}
              {isTabAllowed('advisor') && (
                <button
                  onClick={() => handleTabChange('advisor')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'advisor' ? 'bg-indigo-600 text-white' : 'text-emerald-400'
                  }`}
                >
                  IA
                </button>
              )}
              {isTabAllowed('settings') && (
                <button
                  onClick={() => handleTabChange('settings')}
                  className={`py-2 px-3 text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-indigo-400'
                  }`}
                >
                  Configs
                </button>
              )}
            </div>
          )}

          {/* ÁREA DE CONTEÚDO PRINCIPAL DINÂMICO */}
          <main className="p-6 md:p-8 flex-1 space-y-8">
            
            {/* BANNER DE MODO FOCO ATIVO */}
            {isExpanded && (
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg animate-fade-in ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-indigo-950/20 to-[#111114] border-indigo-500/20 text-white' 
                  : 'bg-indigo-50/85 border-indigo-150 text-indigo-950 shadow-indigo-100/40'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Modo de Foco Ativo (Tela Expandida)</h4>
                    <p className="text-[10px] opacity-75 mt-0.5">As barras de ferramentas laterais e cabeçalhos redundantes foram camuflados para maximizar seu espaço de uso.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  Recolher Tela Cheia
                </button>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div id="central-dashboard-view" className="space-y-8 w-full">
                
                <YopoyCentralDashboard theme={theme} />

                {/* Cabeçalho Minimalista com Boas-vindas */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-[#f8fafc]' : 'text-slate-800'} mb-1`}>Visão Geral</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Controle estratégico simplificado de caixa, equipe e estoque sem limites de espaço.</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
                      className={`border py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        theme === 'dark' 
                          ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
                      }`}
                    >
                      {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
                    </button>

                    {isTabAllowed('advisor') && (
                      <button
                        onClick={() => handleTabChange('advisor')}
                        className={`border py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          theme === 'dark' 
                            ? 'bg-[#111114] text-[#94a3b8] hover:text-[#f8fafc] border-[#222228]' 
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        Consultar IA
                      </button>
                    )}
                  </div>
                </div>

                {/* Banner de Diagnóstico Operativo Rápido */}
                <div className={`border p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-[#111114] to-[#16161a] border-[#222228]' 
                    : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase font-bold">
                        {(selectedPlan === 'micro' || selectedPlan === 'pequena') ? 'Diagnóstico de Saúde Fiscal e Contábil' : 'Diagnóstico de Saúde Fiscal e Logística'}
                      </span>
                    </div>
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                      {(selectedPlan === 'micro' || selectedPlan === 'pequena')
                        ? "Operação de fluxo de caixa e notas fiscais regularizada." 
                        : totalAlerts > 0 ? "Atenção recomendada para lotes de validade próxima." : "Todas as frentes operando em estado seguro."}
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} max-w-2xl leading-relaxed`}>
                      O saldo atual consolidado em caixa é de <strong className="text-emerald-600 font-bold">R$ {currentCash.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>. {(selectedPlan === 'micro' || selectedPlan === 'pequena') ? `Você possui ${simulatedInvoices.length} documentos fiscais de faturamento registrados.` : totalAlerts === 0 ? "Nenhum lote comercial requer movimentação ou descarte nesta semana." : `Existem ${totalAlerts} lotes de mercadoria com vencimento próximo ou vencidos recomendados para inspeção.`}
                    </p>
                  </div>
                  {isTabAllowed('advisor') && (
                    <button
                      onClick={() => setActiveTab('advisor')}
                      className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-405 border border-emerald-500/25 py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all self-stretch md:self-auto text-center cursor-pointer"
                    >
                      Ver Diagnóstico de IA
                    </button>
                  )}
                </div>

                {/* Perfil Corporativo Ativo Integrado */}
                <div className={`border p-5 rounded-2xl transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-[#111114]/60 border-indigo-500/10' 
                    : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 bg-indigo-500/10 rounded-md flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-350' : 'text-slate-700'}`}>Ficha Cadastral Ativa da Empresa</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Razão Social / CNPJ</span>
                      <strong className={`block mt-1 font-semibold truncate ${theme === 'dark' ? 'text-gray-100' : 'text-slate-800'}`} title={corporateName}>{corporateName}</strong>
                      <span className="text-[10px] font-mono text-gray-500 mt-0.5 block">CNPJ: {cnpj}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Regime / Alíquota</span>
                      <strong className={`block mt-1 font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-slate-800'}`}>{taxRegime}</strong>
                      <span className="text-[10px] text-gray-500 block mt-0.5 font-mono">Alíquota: {taxRate}% (DAS/ICMS)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Emissor SEFAZ</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-slate-800'}`}>
                          Certificado A1 Ativo
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-500 block mt-0.5 font-mono">UF: {localStorage.getItem('cfg_state_uf') || 'GO'} ({localStorage.getItem('cfg_sefaz_env') || 'Homologação'})</span>
                    </div>
                  </div>
                </div>

                {/* Grade de Métricas da Aplicação - Full Width Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Caixa Líquido */}
                  <div className={`border p-6 rounded-2xl flex flex-col justify-between transition-colors relative group ${
                    theme === 'dark' 
                      ? 'bg-[#111114]/40 border-[#222228] hover:border-emerald-500/30' 
                      : 'bg-white border-slate-250/90 shadow-xs hover:border-emerald-400/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-450'}`}>Saldo de Caixa</p>
                      <button
                        onClick={() => setExpandedCard('cash')}
                        title="Expandir Caixa Líquido"
                        className={`p-1 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                          theme === 'dark' 
                            ? 'bg-[#15151d] hover:bg-[#1a1a24] text-emerald-405 border-[#2b2b35]' 
                            : 'bg-slate-50 hover:bg-slate-100 text-indigo-750 border-slate-250'
                        }`}
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <h3 className={`text-2xl font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                        R$ {currentCash.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </h3>
                      <p className="text-[11px] text-[#16a34a] dark:text-emerald-400 flex items-center gap-1.5 mt-2 font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> caixa operacional regularizado
                      </p>
                    </div>
                  </div>

                  {/* Alertas de Vencimento / Notas Emitidas */}
                  {selectedPlan === 'micro' || selectedPlan === 'pequena' ? (
                    <div className={`border p-6 rounded-2xl flex flex-col justify-between transition-colors relative group ${
                      theme === 'dark' 
                        ? 'bg-[#111114]/40 border-[#222228] hover:border-indigo-500/30' 
                        : 'bg-white border-slate-250/90 shadow-xs hover:border-indigo-400/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <p className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-455'}`}>Notas Emitidas (Sebrae)</p>
                        <button
                          onClick={() => handleTabChange('invoice')}
                          title="Ir para Emissão de Notas"
                          className={`p-1 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                            theme === 'dark' 
                              ? 'bg-[#15151d] hover:bg-[#1a1a24] text-indigo-400 border-[#2b2b35]' 
                              : 'bg-slate-50 hover:bg-slate-100 text-indigo-750 border-slate-250'
                          }`}
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="mt-4">
                        <h3 className={`text-2xl font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {simulatedInvoices.length} Emitidas
                        </h3>
                        <p className="text-[11px] text-gray-405 mt-2 font-medium">
                          Total faturado: R$ {simulatedInvoices.reduce((sum, item) => sum + (item.totalValue || 0), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`border p-6 rounded-2xl flex flex-col justify-between transition-colors relative group ${
                      theme === 'dark' 
                        ? 'bg-[#111114]/40 border-[#222228] hover:border-amber-500/30' 
                        : 'bg-white border-slate-250/90 shadow-xs hover:border-amber-400/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <p className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-455'}`}>Resumos de Validade</p>
                        <button
                          onClick={() => setExpandedCard('alerts')}
                          title="Expandir Alertas de Validade"
                          className={`p-1 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                            theme === 'dark' 
                              ? 'bg-[#15151d] hover:bg-[#1a1a24] text-[#eab308] border-[#2b2b35]' 
                              : 'bg-slate-50 hover:bg-slate-100 text-indigo-750 border-slate-250'
                          }`}
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="mt-4">
                        <h3 className={`text-2xl font-bold font-mono ${totalAlerts > 0 ? (expiredCount > 0 ? 'text-red-500' : 'text-amber-500') : 'text-emerald-600'}`}>
                          {totalAlerts > 0 ? `${totalAlerts} ${totalAlerts === 1 ? 'Lote Crítico' : 'Lotes Críticos'}` : "Operação Segura"}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-2 font-medium">
                          {totalAlerts > 0 ? `${expiringCount} vencendo hoje/em breve • ${expiredCount} vencidos` : "Nenhuma validade programada"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Funcionários Registrados */}
                  <div className={`border p-6 rounded-2xl flex flex-col justify-between transition-colors relative group ${
                    theme === 'dark' 
                      ? 'bg-[#111114]/40 border-[#222228] hover:border-indigo-500/30' 
                      : 'bg-white border-slate-250/90 shadow-xs hover:border-indigo-400/50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-455'}`}>Equipe Contratada</p>
                      <button
                        onClick={() => setExpandedCard('team')}
                        title="Expandir Quadrado de Colaboradores"
                        className={`p-1 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                          theme === 'dark' 
                            ? 'bg-[#15151d] hover:bg-[#1a1a24] text-indigo-400 border-[#2b2b35]' 
                            : 'bg-slate-50 hover:bg-slate-100 text-indigo-750 border-slate-250'
                        }`}
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <h3 className={`text-2xl font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {employees.filter(e => e.status === 'Ativo').length} Ativos
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">
                        De um contingente total de {employees.length} colaboradores
                      </p>
                    </div>
                  </div>

                </div>

                {/* Grafico Comparativo de Receitas vs Despesas Mensal */}
                <MonthlyFinanceChart transactions={transactions} theme={theme} />

                {/* Atalhos Rápidos com Elevado Espaçamento Vazio (Clean Center) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Bloco 1: Último lançamento integrado */}
                  <section className={`border rounded-2xl p-6 transition-colors flex flex-col justify-between min-h-[160px] relative ${
                    theme === 'dark' ? 'bg-[#111114]/40 border-[#222228] hover:border-gray-800' : 'bg-white border-slate-250/90 shadow-xs hover:border-slate-300'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <h3 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Atividade Contábil</h3>
                          <button
                            onClick={() => setExpandedCard('activity')}
                            title="Expandir Atividade Contábil"
                            className={`p-1 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                              theme === 'dark' 
                                ? 'text-slate-400 hover:text-white border-slate-800 bg-[#15151d]' 
                                : 'text-slate-600 hover:bg-slate-150 border-slate-250 bg-slate-50/50'
                            }`}
                          >
                            <Maximize2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => setActiveTab('finance')}
                          className="text-xs text-indigo-600 dark:text-emerald-400 hover:opacity-80 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          Módulo de Caixa <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} mb-4`}>Acompanhamento imediato do último fluxo financeiro cadastrado.</p>
                    </div>

                    {transactions.length > 0 ? (
                      <div className={`border p-4 rounded-xl flex items-center justify-between ${
                        theme === 'dark' ? 'bg-[#16161a]/60 border-[#222228]/60' : 'bg-slate-50 border-slate-200 text-slate-805'
                      }`}>
                        <div>
                          <p className={`text-xs font-bold truncate max-w-[200px] ${theme === 'dark' ? 'text-slate-250' : 'text-slate-800'}`}>{transactions[0].establishmentName}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{transactions[0].category} &bull; {transactions[0].date}</p>
                        </div>
                        <span className={`text-xs font-mono font-bold ${
                          transactions[0].category === 'Outros' && transactions[0].establishmentName.toLowerCase().includes('vendas') 
                            ? 'text-emerald-650' 
                            : 'text-red-600'
                        }`}>
                          {transactions[0].category === 'Outros' && transactions[0].establishmentName.toLowerCase().includes('vendas') ? '+' : '-'} R$ {transactions[0].amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic text-center py-2">Nenhuma transação registrada.</p>
                    )}
                  </section>

                  {/* Lote Crítico de Estoque / Última Transmissão SEFAZ */}
                  {selectedPlan === 'micro' || selectedPlan === 'pequena' ? (
                    <section className={`border rounded-2xl p-6 transition-colors flex flex-col justify-between min-h-[160px] relative ${
                      theme === 'dark' ? 'bg-[#111114]/40 border-[#222228] hover:border-gray-800' : 'bg-white border-slate-250/90 shadow-xs hover:border-slate-300'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Último Documento Fiscal</h3>
                          </div>
                          <button
                            onClick={() => setActiveTab('invoice')}
                            className="text-xs text-indigo-600 dark:text-emerald-400 hover:opacity-80 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            Módulo Fiscal <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} mb-4`}>Acompanhamento do último faturamento ou manifesto transmitido.</p>
                      </div>

                      {simulatedInvoices.length > 0 ? (
                        <div className={`border p-4 rounded-xl flex items-center justify-between ${
                          theme === 'dark' ? 'bg-[#16161a]/60 border-[#222228]/60' : 'bg-slate-50 border-slate-200 text-slate-805'
                        }`}>
                          <div>
                            <p className={`text-xs font-bold truncate max-w-[200px] ${theme === 'dark' ? 'text-slate-250' : 'text-slate-800'}`}>
                              {simulatedInvoices[simulatedInvoices.length - 1].customerName}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1">
                              Nº {simulatedInvoices[simulatedInvoices.length - 1].invoiceNumber} &bull; Emissão: {simulatedInvoices[simulatedInvoices.length - 1].issueDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                              simulatedInvoices[simulatedInvoices.length - 1].status === 'transmitida' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400' :
                              simulatedInvoices[simulatedInvoices.length - 1].status === 'cancelada' ? 'bg-red-200 text-red-800 dark:bg-red-950/60 dark:text-red-400' :
                              'bg-gray-150 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {simulatedInvoices[simulatedInvoices.length - 1].status}
                            </span>
                            <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 mt-1">
                              R$ {simulatedInvoices[simulatedInvoices.length - 1].totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className={`border p-4 rounded-xl flex items-center justify-between ${
                          theme === 'dark' ? 'bg-[#16161a]/60 border-[#222228]/60' : 'bg-slate-50 border-slate-200 text-slate-805'
                        }`}>
                          <div>
                            <p className={`text-xs font-bold truncate max-w-[200px] ${theme === 'dark' ? 'text-slate-250' : 'text-slate-800'}`}>Sem Emissões Recentes</p>
                            <p className="text-[10px] text-gray-500 mt-1">Aguardando geração de faturamento fiscal.</p>
                          </div>
                          <p className="text-xs font-bold text-gray-400 italic">R$ 0,00</p>
                        </div>
                      )}
                    </section>
                  ) : (
                    <section className={`border rounded-2xl p-6 transition-colors flex flex-col justify-between min-h-[160px] relative ${
                      theme === 'dark' ? 'bg-[#111114]/40 border-[#222228] hover:border-gray-800' : 'bg-white border-slate-250/90 shadow-xs hover:border-slate-300'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <h3 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Lote Crítico de Estoque</h3>
                            <button
                              onClick={() => setExpandedCard('critical_product')}
                              title="Expandir Lote Crítico"
                              className={`p-1 rounded-lg border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                                theme === 'dark' 
                                  ? 'text-slate-400 hover:text-white border-slate-800 bg-[#15151d]' 
                                  : 'text-slate-600 hover:bg-slate-150 border-slate-250 bg-slate-50/50'
                              }`}
                            >
                              <Maximize2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => setActiveTab('logistics')}
                            className="text-xs text-indigo-600 dark:text-emerald-400 hover:opacity-80 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            Visão Logística <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} mb-4`}>O produto em estoque físico com validade mais antiga ou expiração iminente.</p>
                      </div>

                      {worstProduct ? (
                        <div className={`border p-4 rounded-xl flex items-center justify-between ${
                          theme === 'dark' ? 'bg-[#16161a]/60 border-[#222228]/60' : 'bg-slate-50 border-slate-200 text-slate-805'
                        }`}>
                          <div>
                            <p className={`text-xs font-bold truncate max-w-[200px] ${theme === 'dark' ? 'text-slate-250' : 'text-slate-800'}`}>{worstProduct.name}</p>
                            <p className="text-[10px] text-gray-500 mt-1">Lote: {worstProduct.batch} &bull; Setor: {worstProduct.location}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                              isWorstExpired ? 'bg-red-200 text-red-088 dark:bg-red-950/60 dark:text-red-400' :
                              isWorstExpiringSoon ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400' : 'bg-gray-150 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {isWorstExpired ? 'Vencido' : isWorstExpiringSoon ? '7 Dias' : 'Status OK'}
                            </span>
                            <p className="text-[9px] text-gray-500 mt-1 font-mono">{worstProduct.expirationDate}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 italic text-center py-2 text-slate-400">Nenhum lote cadastrado.</p>
                      )}
                    </section>
                  )}

                </div>

                {/* MODAL DETALHADO DIÁRIO DE CAIXA ('cash') */}
                {expandedCard === 'cash' && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col mobile-fullscreen-modal ${
                        theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`p-6 border-b flex items-center justify-between ${
                        theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-emerald-500/15 rounded-2xl text-emerald-500">
                            <DollarSign className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm uppercase tracking-wider">Painel Analítico de Caixa</h3>
                            <p className="text-[11px] text-gray-400">Consolidação e conciliação de faturamentos de vendas simuladas e custos operacionais.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCard(null)}
                          className="p-1.5 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-450 cursor-pointer"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                        {/* Estatísticas Gerais */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-50'}`}>
                            <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Receitas de Vendas (+)</span>
                            <span className="block text-lg font-black font-mono text-emerald-500 mt-1">R$ {totalRevenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-50'}`}>
                            <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Custos Operacionais (-)</span>
                            <span className="block text-lg font-black font-mono text-rose-500 mt-1">R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#141419]/50 border-slate-850' : 'bg-slate-55'}`}>
                            <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Saldo Final Líquido</span>
                            <span className="block text-lg font-black font-mono text-white mt-1">R$ {currentCash.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        {/* Livro de registros diários */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Extrato de Fluxos Financeiros ({transactions.length} registros)</h4>
                          <div className={`border rounded-2xl overflow-hidden font-mono ${theme === 'dark' ? 'bg-[#141419]/50 border-[#22222c]' : 'bg-white border-slate-200'}`}>
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className={theme === 'dark' ? 'bg-[#1c1c24]/90 text-slate-400' : 'bg-slate-100 text-slate-600'}>
                                  <th className="p-3 font-semibold uppercase text-[9px]">Lançamento / Histórico</th>
                                  <th className="p-3 font-semibold uppercase text-[9px]">Ref. Categoria</th>
                                  <th className="p-3 font-semibold uppercase text-[9px] text-right">Data</th>
                                  <th className="p-3 font-semibold uppercase text-[9px] text-right">Valor Líquido</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-[#222228]/40">
                                {transactions.map((t, idx) => {
                                  const isRevenue = t.category === 'Outros' && t.establishmentName.toLowerCase().includes('vendas');
                                  return (
                                    <tr key={idx} className={theme === 'dark' ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                                      <td className="p-3 font-semibold font-sans">{t.establishmentName}</td>
                                      <td className="p-3 text-slate-405 font-sans"><span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-gray-300">{t.category}</span></td>
                                      <td className="p-3 text-right text-slate-500">{t.date}</td>
                                      <td className={`p-3 text-right font-bold ${isRevenue ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {isRevenue ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </td>
                                    </tr>
                                  );
                                })}
                                {transactions.length === 0 && (
                                  <tr>
                                    <td colSpan={4} className="p-8 text-center text-xs text-gray-500 italic">Nenhum lançamento de caixa registrado ainda. Complete simulações no Módulo Fiscal.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 border-t flex justify-end ${theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'}`}>
                        <button onClick={() => setExpandedCard(null)} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer">
                          Fechar Análise
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* MODAL EXPANDIDO DE ALERTAS DE VENCIMENTO ('alerts') */}
                {expandedCard === 'alerts' && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col mobile-fullscreen-modal ${
                        theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`p-6 border-b flex items-center justify-between ${
                        theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-amber-500/15 rounded-2xl text-amber-500">
                            <Info className="w-6 h-6 animate-bounce" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm uppercase tracking-wider">Controle Crítico de Validade</h3>
                            <p className="text-[11px] text-gray-400">Listagem de todas as mercadorias vencidas ou sob atenção imediata nesta semana de verificação.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCard(null)}
                          className="p-1.5 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-450 cursor-pointer"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                        <div className={`border rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#141419]/50 border-[#22222c]' : 'bg-white border-slate-200'}`}>
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-400' : 'bg-slate-100 text-slate-600'}>
                                <th className="p-3">Nome / Categoria</th>
                                <th className="p-3">Lote</th>
                                <th className="p-3">Data Vencimento</th>
                                <th className="p-3">Localização Física</th>
                                <th className="p-3 text-right">Unidades</th>
                                <th className="p-3 text-right">Gravidade</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150/10">
                              {products
                                .filter(p => {
                                  const exp = new Date(p.expirationDate).getTime();
                                  const now = REFERENCE_DATE.getTime();
                                  return exp < now || (exp - now <= expiringWarningDays * 24 * 3600 * 1000);
                                })
                                .map((p) => {
                                  const expired = new Date(p.expirationDate).getTime() < REFERENCE_DATE.getTime();
                                  return (
                                    <tr key={p.id} className={theme === 'dark' ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                                      <td className="p-3 font-semibold">
                                        <div>{p.name}</div>
                                        <div className="text-[10px] text-gray-500 font-normal">{p.category}</div>
                                      </td>
                                      <td className="p-3 font-mono">{p.batch}</td>
                                      <td className="p-3 font-mono">{p.expirationDate}</td>
                                      <td className="p-3">{p.location || 'Sem prateleira'}</td>
                                      <td className="p-3 text-right font-bold">{p.qty} un</td>
                                      <td className="p-3 text-right">
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                          expired ? 'bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-400' : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-400'
                                        }`}>
                                          {expired ? 'Vencido (Urgente!)' : 'Próximo do Fim'}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              {products.filter(p => {
                                  const exp = new Date(p.expirationDate).getTime();
                                  const now = REFERENCE_DATE.getTime();
                                  return exp < now || (exp - now <= expiringWarningDays * 24 * 3600 * 1000);
                                }).length === 0 && (
                                  <tr>
                                    <td colSpan={6} className="p-8 text-center text-xs text-gray-500 italic">Nenhum lote crítico no filtro do sistema de vigência. Todos os produtos estão com data de expiração distante!</td>
                                  </tr>
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className={`p-4 border-t flex justify-end ${theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'}`}>
                        <button onClick={() => setExpandedCard(null)} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer">
                          Fechar Validades
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* MODAL EXPANDIDO DE EQUIPE CONTRATADA ('team') */}
                {expandedCard === 'team' && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col mobile-fullscreen-modal ${
                        theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`p-6 border-b flex items-center justify-between ${
                        theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-indigo-550/15 rounded-2xl text-indigo-550">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm uppercase tracking-wider">Quadro Físico de Colaboradores</h3>
                            <p className="text-[11px] text-gray-405">Quadro completo de pessoal simulado, salários e situação operacional do regime ativo.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCard(null)}
                          className="p-1.5 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-450 cursor-pointer"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                        <div className={`border rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#141419]/50 border-[#22222c]' : 'bg-white border-slate-200'}`}>
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className={theme === 'dark' ? 'bg-[#1c1c24] text-slate-400' : 'bg-slate-100 text-slate-600'}>
                                <th className="p-3">Nome do Colaborador</th>
                                <th className="p-3">Cargo / Função</th>
                                <th className="p-3">Departamento</th>
                                <th className="p-3 text-right">Data de Admissão</th>
                                <th className="p-3 text-right">Salário Base (CLT)</th>
                                <th className="p-3 text-right">Situação</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150/10">
                              {employees.map((e) => (
                                <tr key={e.id} className={theme === 'dark' ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
                                  <td className="p-3 font-semibold">{e.name}</td>
                                  <td className="p-3 text-[#94a3b8]">{e.role}</td>
                                  <td className="p-3">{e.department}</td>
                                  <td className="p-3 text-right text-gray-500">{e.admissionDate}</td>
                                  <td className="p-3 text-right font-bold font-mono">R$ {e.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                  <td className="p-3 text-right">
                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                                      e.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-450'
                                    }`}>
                                      {e.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                              {employees.length === 0 && (
                                  <tr>
                                    <td colSpan={6} className="p-8 text-center text-xs text-gray-500 italic">Nenhum funcionário ativo cadastrado. Crie e simule contratações no Módulo Contábil!</td>
                                  </tr>
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className={`p-4 border-t flex justify-end ${theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'}`}>
                        <button onClick={() => setExpandedCard(null)} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer">
                          Fechar Quadro
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* MODAL EXPANDIDO DE ATIVIDADE CONTÁBIL ('activity') */}
                {expandedCard === 'activity' && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col mobile-fullscreen-modal ${
                        theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`p-6 border-b flex items-center justify-between ${
                        theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-emerald-500/15 rounded-2xl text-emerald-500">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm uppercase tracking-wider">Histórico de Movimentações Contábeis</h3>
                            <p className="text-[11px] text-gray-400">Linha do tempo consolidando todas as notas faturadas e ordens de pagamentos no mês.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCard(null)}
                          className="p-1.5 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-450 cursor-pointer"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                        <div className="space-y-2">
                          {transactions.map((t, idx) => {
                            const isRevenue = t.category === 'Outros' && t.establishmentName.toLowerCase().includes('vendas');
                            return (
                              <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                                theme === 'dark' ? 'bg-[#15151a] border-slate-850' : 'bg-slate-50 border-slate-150'
                              }`}>
                                <div>
                                  <strong className={`block text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t.establishmentName}</strong>
                                  <span className="text-[10px] text-gray-400 mt-0.5 block">Categoria: <span className="font-semibold text-gray-400">{t.category}</span> &bull; Data: {t.date}</span>
                                </div>
                                <span className={`text-xs font-mono font-bold ${isRevenue ? 'text-emerald-500': 'text-rose-500'}`}>
                                  {isRevenue ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            );
                          })}
                          {transactions.length === 0 && (
                            <p className="p-8 text-center text-xs text-gray-500 italic">Nenhum evento registrado.</p>
                          )}
                        </div>
                      </div>

                      <div className={`p-4 border-t flex justify-end ${theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'}`}>
                        <button onClick={() => setExpandedCard(null)} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer">
                          Fechar Histórico
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* MODAL EXPANDIDO DE LOTE CRÍTICO DE ESTOQUE ('critical_product') */}
                {expandedCard === 'critical_product' && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-9999 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col mobile-fullscreen-modal ${
                        theme === 'dark' ? 'bg-[#0f0f12] text-slate-100 border-[#22222c]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`p-6 border-b flex items-center justify-between ${
                        theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-red-500/15 rounded-2xl text-red-500">
                            <Info className="w-6 h-6 animate-pulse" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm uppercase tracking-wider">Inspeção Detalhada de Lote Crítico</h3>
                            <p className="text-[11px] text-gray-405">Análise fiscal e de validade física do suprimento marcado por criticidade de expiração no galpão.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedCard(null)}
                          className="p-1.5 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-450 cursor-pointer"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-6 overflow-y-auto space-y-6">
                        {worstProduct ? (
                          <div className="space-y-4">
                            <div className={`p-6 rounded-2xl border text-center ${
                              theme === 'dark' ? 'bg-[#15151a] border-slate-850' : 'bg-slate-50 border-slate-150'
                            }`}>
                              <span className="text-[10px] font-black uppercase text-[#ef4444] tracking-widest block mb-2">🚨 PRODUTO SOB ATENÇÃO IMEDIATA</span>
                              <h4 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-850'}`}>{worstProduct.name}</h4>
                              <p className="text-xs text-gray-400 mt-1">Categoria: <strong className="font-semibold">{worstProduct.category}</strong> &bull; Código EAN: <span className="font-mono">{worstProduct.barcode}</span></p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#1c1c24] border-slate-800' : 'bg-white border-slate-205'}`}>
                                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Endereço de Estoque</span>
                                  <strong className="block text-base mt-1 font-mono text-indigo-505 dark:text-[#a5b4fc]">{worstProduct.location || 'Sem prateleira'}</strong>
                                </div>
                                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#1c1c24] border-slate-800' : 'bg-white border-slate-205'}`}>
                                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Volume Físico</span>
                                  <strong className="block text-base mt-1 font-mono">{worstProduct.qty} unidades</strong>
                                </div>
                              </div>
                            </div>

                            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-red-950/20 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
                              <h5 className="font-extrabold uppercase text-[10px] tracking-wide text-red-500 flex items-center gap-1.5">
                                <Info className="w-4 h-4" /> FISCALIZAÇÃO DO LOTE: {worstProduct.batch || 'REGULADO'}
                              </h5>
                              <p className={`text-xs mt-2 leading-relaxed ${theme === 'dark' ? 'text-red-300' : 'text-red-950'}`}>
                                Data Limite para Comercialização: <strong className="font-mono font-bold">{worstProduct.expirationDate}</strong>. 
                                {isWorstExpired 
                                  ? " ATENÇÃO: O lote deste produto ultrapassou a vigência legal sanitária. Mova a mercadoria imediatamente para a área de devoluções / perdas."
                                  : " SUGESTÃO: O lote está há poucos dias de expirar. Promova liquidação, priorização nos canais de saída ou rebaixe margem no Módulo de Notas do painel."}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-8 text-xs text-gray-500 italic">
                            Nenhum produto cadastrado no painel.
                          </div>
                        )}
                      </div>

                      <div className={`p-4 border-t flex justify-end ${theme === 'dark' ? 'border-[#22222c] bg-[#141419]' : 'border-slate-100 bg-slate-50'}`}>
                        <button onClick={() => setExpandedCard(null)} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer">
                          Fechar Inspeção
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: AUXILIAR DE CONTABILIDADE E CAIXA */}
            {activeTab === 'finance' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.finance.view}>
                <div id="finance-tab-view" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>Módulo de Organização Contábil & Caixa</h2>
                      <p className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Gerenciamento de contas a pagar, faturamento de notas fiscais, controle de equipe e faturamento de salários.</p>
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
                      className={`border py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto ${
                        theme === 'dark' 
                          ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
                      }`}
                    >
                      {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
                    </button>
                  </div>
                  <FinanceTool 
                    transactions={transactions}
                    setTransactions={setTransactions}
                    employees={employees}
                    setEmployees={setEmployees}
                    cashBalance={cashBalance}
                    setCashBalance={setCashBalance}
                    products={products}
                    selectedPlan={selectedPlan}
                  />
                </div>
              </ProtectedModule>
            )}

            {/* TAB 3: CONTROLE DE LOGÍSTICA DE MERCADORIAS */}
            {activeTab === 'logistics' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.logistics.view}>
                <div id="logistics-tab-view" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>Logística de Cadastro & Endereçamento Físico</h2>
                      <p className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Simule escaneamentos de produtos, localize endereços de prateleiras físicas no armazém e emita alertas automáticos.</p>
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
                      className={`border py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto ${
                        theme === 'dark' 
                          ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
                      }`}
                    >
                      {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
                    </button>
                  </div>
                  <LogisticsTool 
                    products={products}
                    setProducts={setProducts}
                    theme={theme}
                    employees={employees}
                    tasks={tasks}
                    setTasks={setTasks}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    userPlan={selectedPlan}
                  />
                </div>
              </ProtectedModule>
            )}

            {/* TAB EXTRA: EMISSÃO DE NOTAS FISCAIS (SEBRAE INTEGRADO) */}
            {activeTab === 'invoice' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.fiscal.view}>
                <div id="invoice-tab-view" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>Emissão de Notas Fiscais (NF-e)</h2>
                      <p className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Emita e controle guias fiscais para mercadorias (NF-e), formate o DANFE para produtos e direcione suas emissões oficiais.</p>
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
                      className={`border py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto ${
                        theme === 'dark' 
                          ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
                      }`}
                    >
                      {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
                    </button>
                  </div>
                  <InvoiceTool 
                    products={products}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    theme={theme}
                    selectedPlan={selectedPlan}
                  />
                </div>
              </ProtectedModule>
            )}

            {/* TAB NOVA: MÓDULO DE SERVIÇOS MUNICIPAL NFS-E */}
            {activeTab === 'nfse_module' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.fiscal.view}>
                <div id="nfse-tab-view" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className={`text-xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>Emissão de Notas Fiscais de Serviço (NFS-e)</h2>
                      <p className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Módulo profissional de faturamento de serviços municipais, suportando integração com diversos provedores de tecnologia.</p>
                    </div>
                  </div>
                  <NfseTool theme={theme} />
                </div>
              </ProtectedModule>
            )}

            {/* TAB 4: MÓDULO DE ORIENTAÇÃO E CONSULTORIA FISCAL IA (CHAT) */}
            {activeTab === 'advisor' && (
              <div id="advisor-tab-view" className="space-y-4 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className={`text-xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-1`}>Assistente de Finanças & Gestão de Estoque IA</h2>
                    <p className={`text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Pergunte ao Gemini 3.5 Flash sobre fluxo de caixa, DRE faturadas, estratégias tributárias de PMEs brasileiras, ou catalogação lógica.</p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
                    className={`border py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto ${
                      theme === 'dark' 
                        ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                        : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
                    }`}
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
                  </button>
                </div>
                <ChatAssistant />
              </div>
            )}

            {/* TAB 5: GUIA DE HIERARQUIA & BATE-PAPO DE EQUIPE COM CHECKLIST DE SERVIÇOS */}
            {activeTab === 'hierarchy' && (
              <div id="hierarchy-tab-view" className="space-y-4 w-full">
                <HierarchyTool 
                  employees={employees}
                  theme={theme}
                  tasks={tasks}
                  setTasks={setTasks}
                  isExpanded={isExpanded}
                  onToggleExpand={() => setIsExpanded(!isExpanded)}
                  setSimulatedInvoices={setSimulatedInvoices}
                />
              </div>
            )}

            {/* TAB 6: ABA DE CONFIGURAÇÕES CADASTRAIS, REGIME FISCAL, CERTIFICADOS E SÓCIOS */}
            {activeTab === 'settings' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.settings.view}>
                <div id="settings-tab-view" className="space-y-4 w-full">
                  <SettingsTool 
                    theme={theme} 
                    isExpanded={isExpanded}
                    onToggleExpand={() => setIsExpanded(!isExpanded)}
                    selectedPlan={selectedPlan}
                    currentUser={currentUser}
                  />
                </div>
              </ProtectedModule>
            )}

            {activeTab === 'nfce_pos' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.fiscal.view}>
                <div id="nfce-pos-tab-view" className="space-y-4 w-full">
                  <NfcePosTool 
                    theme={theme}
                    currentUser={currentUser}
                    corporateName={corporateName || 'Yopoy Ltda'}
                    cnpj={cnpj || '00.000.000/0001-99'}
                    onNfceIssued={(doc) => {
                      const amt = parseFloat(doc.total_value);
                      const newTransaction: Transaction = {
                        id: `t_nfce_${Date.now()}`,
                        establishmentName: `Venda Consumidor NFC-e Nº ${doc.number}`,
                        amount: amt,
                        date: new Date().toISOString().substring(0, 10),
                        category: 'Outros',
                        status: 'Confirmado',
                        notes: `NFC-e autorizada e emitida de forma integrada pelo PDV. Chave: ${doc.access_key}`,
                        type: 'Receita'
                      };
                      const updatedTxList = [newTransaction, ...transactions];
                      setTransactions(updatedTxList);
                      localStorage.setItem('biz_simulated_transactions', JSON.stringify(updatedTxList));
                      
                      const nextCash = cashBalance + amt;
                      setCashBalance(nextCash);
                      localStorage.setItem('biz_simulated_cash_balance', String(nextCash));
                    }}
                  />
                </div>
              </ProtectedModule>
            )}

            {activeTab === 'master_admin' && (
              <ProtectedModule permission={MODULE_PERMISSIONS.admin.view}>
                <div id="master-admin-tab-view" className="space-y-4 w-full">
                  <MasterAdminTool theme={theme} />
                </div>
              </ProtectedModule>
            )}

          </main>
        </div>

      </div>

      <OnboardingTutorial 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        theme={theme} 
      />

      {isPlanModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className={`w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border ${
              theme === 'dark' ? 'bg-[#101014] border-[#22222a] text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 dark:border-zinc-805/40 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                <div>
                  <h3 className="font-bold text-sm md:text-base">Módulo de Upgrade & Gestão Corporativa</h3>
                  <p className="text-[10px] text-slate-350">Eleve a maturidade operacional e gerencial de sua distribuidora</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPlanModalOpen(false);
                  setSelectedUpgradePlan(null);
                  setShowCelebrateScreen(false);
                }}
                className="text-slate-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {adminNotification && (
                <div className="mb-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs py-2 px-3 rounded-lg font-bold flex items-center justify-between">
                  <span>{adminNotification}</span>
                  <button onClick={() => setAdminNotification('')} className="hover:text-white text-[10px]">&times;</button>
                </div>
              )}

              {showCelebrateScreen ? (
                /* Celebração */
                <div className="text-center py-10 space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                  </div>
                  <h4 className="text-xl font-extrabold text-emerald-500">Upgrade Concluído com Sucesso! 🎉</h4>
                  <p className="max-w-md mx-auto text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Parabéns! Sua distribuidora agora está operando sob os termos do{' '}
                    <strong className="text-indigo-400 font-bold uppercase">
                      {selectedUpgradePlan === 'media' && 'Plano Premium'}
                      {selectedUpgradePlan === 'pequena' && 'Plano Médio'}
                      {selectedUpgradePlan === 'micro' && 'Plano Básico'}
                      {selectedUpgradePlan === 'corporativo' && 'Plano Corporativo'}
                    </strong>
                    . Os novos módulos e recursos de inteligência já foram carregados e habilitados em tempo de execução.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsPlanModalOpen(false);
                        setSelectedUpgradePlan(null);
                        setShowCelebrateScreen(false);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition"
                    >
                      Acessar ERP Completo
                    </button>
                  </div>
                </div>
              ) : isProcessingUpgrade ? (
                /* Loader de Processamento */
                <div className="text-center py-16 space-y-4">
                  <div className="flex justify-center flex-col items-center gap-4">
                    <div className="animate-spin border-4 border-indigo-500 border-t-transparent rounded-full h-12 w-12"></div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Sincronizando</h4>
                  </div>
                  <p className="text-xs text-indigo-400 font-mono font-bold">{upgradeMessage}</p>
                </div>
              ) : selectedUpgradePlan ? (
                /* Tela do Checkout simulado */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resumo do Plano Escolhido */}
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-[#141418] border-[#22222a]' : 'bg-slate-50 border-gray-150'
                  }`}>
                    <h4 className="font-extrabold text-xs text-indigo-400 uppercase tracking-wider mb-2">Resumo da Assinatura</h4>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-black">
                        {selectedUpgradePlan === 'media' && 'R$ 299,90'}
                        {selectedUpgradePlan === 'pequena' && 'R$ 129,90'}
                        {selectedUpgradePlan === 'micro' && 'R$ 49,90'}
                        {selectedUpgradePlan === 'corporativo' && 'R$ 599,90'}
                      </span>
                      <span className="text-xs text-gray-400">/ mês</span>
                    </div>
                    <ul className="space-y-3.5 pt-2">
                      <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Abertura total dos recursos contratados adicionais</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Isolamento e segurança multiusuário de seus dados</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Integração com emissor auxiliar Sebrae e ERP</span>
                      </li>
                    </ul>
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() => setSelectedUpgradePlan(null)}
                        className="text-xs text-indigo-500 font-bold hover:underline flex items-center gap-1.5"
                      >
                        &larr; Voltar para planos
                      </button>
                    </div>
                  </div>

                  {/* Informações de checkout */}
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Escolha o Método de Pagamento</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setCheckoutPayMethod('pix')}
                          className={`py-2 rounded-xl text-xs font-bold transition border ${
                            checkoutPayMethod === 'pix' 
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                              : 'bg-transparent border-gray-300 dark:border-zinc-800 hover:bg-[#18181c]'
                          }`}
                        >
                          ⚡ PIX
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutPayMethod('card')}
                          className={`py-2 rounded-xl text-xs font-bold transition border ${
                            checkoutPayMethod === 'card' 
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' 
                              : 'bg-transparent border-gray-300 dark:border-zinc-800 hover:bg-[#18181c]'
                          }`}
                        >
                          💳 Cartão
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutPayMethod('boleto')}
                          className={`py-2 rounded-xl text-xs font-bold transition border ${
                            checkoutPayMethod === 'boleto' 
                              ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                              : 'bg-transparent border-gray-300 dark:border-zinc-800 hover:bg-[#18181c]'
                          }`}
                        >
                          📄 Boleto
                        </button>
                      </div>
                    </div>

                    {checkoutPayMethod === 'pix' && (
                      <div className="p-4 bg-slate-50 dark:bg-[#111114] border border-gray-200 dark:border-zinc-800 rounded-xl text-center space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Escaneie o QR Code simulado para efetivar a transação comercial:</p>
                        <div className="mx-auto w-32 h-32 bg-white flex items-center justify-center p-2 rounded-lg border border-gray-150">
                          {/* Simulação de QRCode visual */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full h-full opacity-70">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div key={i} className={`rounded-xs ${i % 3 === 0 || i % 5 === 1 ? 'bg-slate-900' : 'bg-slate-100'}`}></div>
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 select-all truncate">00020126580014br.gov.bcb.pix0136yopoypayupgrade-f2b74051a052</p>
                      </div>
                    )}

                    {checkoutPayMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1 text-left">Número do Cartão Corporativo</label>
                          <input
                            type="text"
                            placeholder="4444 5555 6666 7777"
                            value={checkoutCardNum}
                            onChange={(e) => setCheckoutCardNum(e.target.value)}
                            className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1 text-left">Nome no Cartão</label>
                          <input
                            type="text"
                            placeholder="SUA EMPRESA LTDA"
                            value={checkoutCardName}
                            onChange={(e) => setCheckoutCardName(e.target.value)}
                            className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1 text-left">Validade</label>
                            <input
                              type="text"
                              placeholder="12/29"
                              value={checkoutCardExpiry}
                              onChange={(e) => setCheckoutCardExpiry(e.target.value)}
                              className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1 text-left">CVV</label>
                            <input
                              type="text"
                              placeholder="321"
                              value={checkoutCardCvv}
                              onChange={(e) => setCheckoutCardCvv(e.target.value)}
                              className="w-full border border-gray-200 dark:border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutPayMethod === 'boleto' && (
                      <div className="p-4 bg-slate-50 dark:bg-[#111114] border border-gray-200 dark:border-zinc-800 rounded-xl text-center space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Pague pelo código de barras simulado abaixo:</p>
                        <div className="h-6 bg-slate-800 rounded-md flex items-center justify-around overflow-hidden p-1 gap-0.5 opacity-60">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className="bg-white h-full" style={{ width: `${i % 3 === 0 ? '1px' : i % 5 === 0 ? '3px' : '2px'}` }}></div>
                          ))}
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 select-all truncate">34191.79001 01043.513184 91020.150008 7 98200000029990</p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => startSimulatedUpgrade(selectedUpgradePlan)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <CreditCard className="w-4 h-4" />
                        Confirmar Upgrade e Ativar Plano
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Lista principal de planos de upgrade do sistema */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  {/* Plano Básico */}
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between relative ${
                    selectedPlan === 'micro' 
                      ? 'border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500/20' 
                      : theme === 'dark' ? 'border-[#22222a] bg-[#141418]' : 'border-slate-200 bg-white shadow-xs'
                  }`}>
                    {selectedPlan === 'micro' && (
                      <span className="absolute top-3 right-3 bg-indigo-500 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full">Ativo</span>
                    )}
                    <div>
                      <p className="text-[9px] font-mono font-bold tracking-wider uppercase text-gray-400">Micro Negócio</p>
                      <h4 className="font-extrabold text-[#94a3b8] dark:text-zinc-200 mt-0.5 text-base leading-tight">Plano Básico</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-1.5" style={{ minHeight: '40px' }}>Ideal para MEIs e autônomos iniciando o controle de vendas.</p>
                      <div className="flex items-baseline gap-1 mt-3 py-1.5 border-y border-gray-100/10 mb-4">
                        <span className="text-lg font-extrabold">R$ 49,90</span>
                        <span className="text-[10px] text-gray-400">/ mês</span>
                      </div>
                      <ul className="space-y-2 text-[11px] mb-6">
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Emissão Notas Simplificadas</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Estoque Básico (Sem Lotes)</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>1 Usuário Integrado</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      {currentUser?.isAdmin ? (
                        <button
                          type="button"
                          onClick={() => {
                            handlePlanUpgrade('micro');
                            setAdminNotification('Módulo Admin: Plano alterado para Módulo Básico com sucesso!');
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs transition active:scale-95 duration-100"
                        >
                          Ativar Instantaneamente
                        </button>
                      ) : selectedPlan === 'micro' ? (
                        <button disabled className="w-full bg-slate-350 dark:bg-zinc-800 text-white/50 font-bold py-2 rounded-xl text-xs cursor-not-allowed">
                          Seu Plano Ativo
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedUpgradePlan('micro')}
                          className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs transition duration-100"
                        >
                          Trocar para Plano Básico
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Plano Médio */}
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between relative ${
                    selectedPlan === 'pequena' 
                      ? 'border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500/20' 
                      : theme === 'dark' ? 'border-[#22222a] bg-[#141418]' : 'border-slate-200 bg-white shadow-xs'
                  }`}>
                    {selectedPlan === 'pequena' && (
                      <span className="absolute top-3 right-3 bg-indigo-500 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full">Ativo</span>
                    )}
                    <div>
                      <p className="text-[9px] font-mono font-bold tracking-wider uppercase text-gray-400">Pequenas Distribuidoras</p>
                      <h4 className="font-extrabold text-[#94a3b8] dark:text-zinc-200 mt-0.5 text-base leading-tight">Plano Médio</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-1.5" style={{ minHeight: '40px' }}>Estrutura de relatórios avançados e módulo contábil completo.</p>
                      <div className="flex items-baseline gap-1 mt-3 py-1.5 border-y border-gray-100/10 mb-4">
                        <span className="text-lg font-extrabold">R$ 129,90</span>
                        <span className="text-[10px] text-gray-400">/ mês</span>
                      </div>
                      <ul className="space-y-2 text-[11px] mb-6">
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Livro Caixa Geral Avançado</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Simulador Tributário MEI/SN</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Ator/Usuário de Até 5 Contas</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      {currentUser?.isAdmin ? (
                        <button
                          type="button"
                          onClick={() => {
                            handlePlanUpgrade('pequena');
                            setAdminNotification('Módulo Admin: Plano alterado para Módulo Médio com sucesso!');
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs transition active:scale-95 duration-100"
                        >
                          Ativar Instantaneamente
                        </button>
                      ) : selectedPlan === 'pequena' ? (
                        <button disabled className="w-full bg-slate-350 dark:bg-zinc-800 text-white/50 font-bold py-2 rounded-xl text-xs cursor-not-allowed">
                          Seu Plano Ativo
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedUpgradePlan('pequena')}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs transition duration-100"
                        >
                          Fazer Upgrade para Médio
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Plano Premium */}
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between relative ${
                    selectedPlan === 'media' 
                      ? 'border-indigo-505 bg-indigo-500/5 ring-1 ring-indigo-500/20' 
                      : theme === 'dark' ? 'border-[#22222a] bg-[#141418]' : 'border-slate-200 bg-white shadow-xs'
                  }`}>
                    {selectedPlan === 'media' && (
                      <span className="absolute top-3 right-3 bg-indigo-500 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full">Ativo</span>
                    )}
                    <div>
                      <p className="text-[9px] font-mono font-bold tracking-wider uppercase text-gray-400">Total Integrado com IA</p>
                      <h4 className="font-extrabold text-[#94a3b8] dark:text-zinc-200 mt-0.5 text-base leading-tight">Plano Premium</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug mt-1.5" style={{ minHeight: '40px' }}>Totalidade de automações, orientação em IA e auditorias por lotes.</p>
                      <div className="flex items-baseline gap-1 mt-3 py-1.5 border-y border-gray-100/10 mb-4">
                        <span className="text-lg font-extrabold">R$ 299,90</span>
                        <span className="text-[10px] text-gray-400">/ mês</span>
                      </div>
                      <ul className="space-y-2 text-[11px] mb-6">
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>ChatGPT Advisor (Gemini)</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Auditores de Lotes & Estoque</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Atores Ilimitados na Equipe</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      {currentUser?.isAdmin ? (
                        <button
                          type="button"
                          onClick={() => {
                            handlePlanUpgrade('media');
                            setAdminNotification('Módulo Admin: Plano alterado para Módulo Premium com sucesso!');
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs transition active:scale-95 duration-100"
                        >
                          Ativar Instantaneamente
                        </button>
                      ) : selectedPlan === 'media' ? (
                        <button disabled className="w-full bg-slate-350 dark:bg-zinc-800 text-white/50 font-bold py-2 rounded-xl text-xs cursor-not-allowed">
                          Seu Plano Ativo
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedUpgradePlan('media')}
                          className="w-full bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-xl text-xs transition duration-100 animate-pulse"
                        >
                          Upgrade para Premium 🎉
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-[#111114] border-t border-gray-100 dark:border-zinc-850 flex justify-end gap-2">
              {!showCelebrateScreen && !isProcessingUpgrade && (
                <button
                  onClick={() => {
                    setIsPlanModalOpen(false);
                    setSelectedUpgradePlan(null);
                    setShowCelebrateScreen(false);
                  }}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl py-2 px-6 text-xs transition"
                >
                  Fechar Painel
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <OnboardingTutorial 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        theme={theme} 
      />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
