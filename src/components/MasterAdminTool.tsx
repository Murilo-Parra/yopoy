import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  ShieldAlert, 
  Server, 
  Activity, 
  Clock, 
  Trash2, 
  Edit, 
  UserPlus, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Plus, 
  Ticket, 
  MessageSquare, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Eye, 
  Check, 
  X,
  CreditCard,
  Percent,
  RefreshCw,
  BookOpen,
  Download
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { authFetch } from '../frontend/auth/authFetch';

interface MasterAdminToolProps {
  theme: 'light' | 'dark';
}

export default function MasterAdminTool({ theme }: MasterAdminToolProps) {
  // Controle de Abas Internas do módulo de Administração
  const [adminTab, setAdminTab] = useState<'overview' | 'companies' | 'users' | 'affiliates' | 'support' | 'security' | 'custom_providers'>('overview');
  
  // Estados para dados reais do Backend
  const [stats, setStats] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [systemResources, setSystemResources] = useState<any>(null);
  const [customProviders, setCustomProviders] = useState<any[]>([]);

  // Estados de Filtro e Busca
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modais de Criação e Edição
  const [editCompanyModal, setEditCompanyModal] = useState<any>(null); // { id, corporate_name, ... }
  const [editUserModal, setEditUserModal] = useState<any>(null); // { id, name, active, ... }
  const [newAffiliateModal, setNewAffiliateModal] = useState(false);
  const [affiliateForm, setAffiliateForm] = useState({ name: '', email: '', code: '', commission_rate: 10, discount_rate: 5 });
  const [replyTicketModal, setReplyTicketModal] = useState<any>(null); // { id, replies: [] }
  const [editProviderModal, setEditProviderModal] = useState<any>(null);
  const [newProviderModal, setNewProviderModal] = useState(false);
  const [providerForm, setProviderForm] = useState({ name: '', city: '', state: '', ibge_code: '', production_url: '', homologation_url: '', communication_type: 'SOAP', authentication_type: 'Certificado', active: true });

  const [supportReplyText, setSupportReplyText] = useState('');
  const [ticketStatusUpdate, setTicketStatusUpdate] = useState('Em Atendimento');

  // Mensagens operacionais rápidos
  const [actionMessage, setActionMessage] = useState({ type: 'success', text: '' });

  // Funções de busca e alimentação de API
  useEffect(() => {
    setLoading(true);
    const headers = { 'Content-Type': 'application/json' };

    Promise.all([
      authFetch('/api/admin/stats', { headers }).then(r => r.json()),
      authFetch('/api/admin/companies', { headers }).then(r => r.json()),
      authFetch('/api/admin/users', { headers }).then(r => r.json()),
      authFetch('/api/admin/affiliates', { headers }).then(r => r.json()),
      authFetch('/api/admin/commissions', { headers }).then(r => r.json()),
      authFetch('/api/admin/support', { headers }).then(r => r.json()),
      authFetch('/api/admin/audit-logs', { headers }).then(r => r.json()),
      authFetch('/api/admin/system', { headers }).then(r => r.json()),
      authFetch('/api/admin/custom-providers', { headers }).then(r => r.json())
    ])
    .then(([statsData, comps, usrs, affs, comms, tickets, logs, sys, providers]) => {
      setStats(statsData);
      setCompanies(Array.isArray(comps) ? comps : []);
      setUsers(Array.isArray(usrs) ? usrs : []);
      setAffiliates(Array.isArray(affs) ? affs : []);
      setCommissions(Array.isArray(comms) ? comms : []);
      setSupportTickets(Array.isArray(tickets) ? tickets : []);
      setAuditLogs(logs && Array.isArray(logs.audit_logs) ? logs.audit_logs : []);
      setSystemLogs(logs && Array.isArray(logs.system_logs) ? logs.system_logs : []);
      setSystemResources(sys);
      setCustomProviders(Array.isArray(providers) ? providers : []);
    })
    .catch(err => {
      console.error("Erro geral buscando dados do Super Admin:", err);
      showBanner('error', 'Falha ao sincronizar dados administrativos reais do PostgreSQL!');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [refreshTrigger]);

  const showBanner = (type: 'success' | 'error', text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => {
      setActionMessage({ type: 'success', text: '' });
    }, 500);
  };

  const handleRefresh = () => {
    setRefreshTrigger(p => p + 1);
  };

  // Mutações: Empresa
  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCompanyModal) return;
    authFetch(`/api/admin/companies/${editCompanyModal.id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editCompanyModal)
    })
    .then(res => {
      if (!res.ok) throw new Error("Falha ao salvar modificações");
      return res.json();
    })
    .then(data => {
      showBanner('success', 'Cadastro corporativo e assinatura atualizados no banco de dados!');
      setEditCompanyModal(null);
      handleRefresh();
    })
    .catch(err => {
      showBanner('error', err.message || 'Erro ao sincronizar modificação de empresa.');
    });
  };

  const handleDeleteCompany = (id: string, name: string) => {
    if (!confirm(`TEM CERTEZA ABSOLUTA que deseja excluir a empresa "${name}" permanente? Todos os produtos, lançamentos financeiros e dados multi-tenant vinculados de forma relacional serão removidos em cascata de forma irrecuperável!`)) return;
    authFetch(`/api/admin/companies/${id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro de deleção");
      return res.json();
    })
    .then(() => {
      showBanner('success', `Empresa "${name}" excluída do PostgreSQL com absoluta sincronia.`);
      handleRefresh();
    })
    .catch(err => {
      showBanner('error', 'Falha ao remover empresa.');
    });
  };

  // Mutações: Usuários
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUserModal) return;
    authFetch(`/api/admin/users/${editUserModal.id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUserModal)
    })
    .then(res => {
      if (!res.ok) throw new Error("Falha ao atualizar");
      return res.json();
    })
    .then(() => {
      showBanner('success', 'Usuário e senha gerenciados com sucesso!');
      setEditUserModal(null);
      handleRefresh();
    })
    .catch(err => {
      showBanner('error', 'Erro ao alterar dados de segurança do usuário.');
    });
  };

  // Mutações: Afiliados
  const handleCreateAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    authFetch('/api/admin/affiliates/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(affiliateForm)
    })
    .then(res => {
      if (!res.ok) throw new Error("Código ou email de afiliado duplicado");
      return res.json();
    })
    .then(() => {
      showBanner('success', 'Novo parceiro afiliado cadastrado. Gerada chave exclusiva de link!');
      setNewAffiliateModal(false);
      setAffiliateForm({ name: '', email: '', code: '', commission_rate: 10, discount_rate: 5 });
      handleRefresh();
    })
    .catch(err => {
      showBanner('error', err.message);
    });
  };

  const handlePayCommission = (id: string) => {
    if (!confirm("Confirmar a realização do pagamento em conta desse afiliado e liquidar comissão pendente?")) return;
    authFetch(`/api/admin/commissions/${id}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      showBanner('success', 'Comissão paga registrada financeiramente no SaaS!');
      handleRefresh();
    })
    .catch(err => {
      showBanner('error', 'Erro ao dar baixa física do comissionamento.');
    });
  };

  // Mutações: Chamados Suporte
  const handleReplyTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyTicketModal || !supportReplyText.trim()) return;
    authFetch(`/api/admin/support/${replyTicketModal.id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: supportReplyText.trim(), status: ticketStatusUpdate })
    })
    .then(res => res.json())
    .then(() => {
      showBanner('success', 'Chamado respondido e atualizado com sucesso nacional!');
      setReplyTicketModal(null);
      setSupportReplyText('');
      handleRefresh();
    })
    .catch(err => {
      showBanner('error', 'Erro ao transmitir resposta comercial.');
    });
  };

  // Gráficos Mocks Inteligentes baseados no MRR e Dados de Teste
  const mrrHistoryData = [
    { name: 'Jan', receita: (stats?.mrr * 0.70) || 1200 },
    { name: 'Fev', receita: (stats?.mrr * 0.85) || 1500 },
    { name: 'Mar', receita: (stats?.mrr * 0.90) || 1900 },
    { name: 'Abr', receita: (stats?.mrr * 0.95) || 2200 },
    { name: 'Mai', receita: (stats?.mrr) || 2900 }
  ];

  return (
    <div className={`space-y-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
      
      {/* Header do Módulo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-900/40 to-slate-900/40 p-6 rounded-xl border border-indigo-500/20 shadow-lg backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
              MASTER ADMIN ACCESS
            </span>
            <div className="text-gray-400 text-xs font-mono">Consola Root Ativa</div>
          </div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-white mt-1">
            Plataforma SaaS Elparrar ERP
          </h2>
          <p className="text-xs text-gray-405 mt-0.5">
            Painel Geral de Tenancy, Faturamento SaaS, Auditoria de Segurança, Controle de Inadimplência e Afiliados.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <a 
            href="/relatorio-nfse.pdf"
            target="_blank"
            download="RELATORIO_NFSE_INTEGRACAO.pdf"
            className="flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-md mr-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Relatório NFS-e Real
          </a>
          <a 
            href="/relatorio-eventos.pdf"
            target="_blank"
            download="RELATORIO_EVENTOS_SEFAZ.pdf"
            className="flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-md mr-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Relatório Eventos
          </a>
          <a 
            href="/manual.pdf"
            target="_blank"
            download="MANUAL_OPERACIONAL.pdf"
            className="flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md mr-2"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar Manual
          </a>
          <button 
            onClick={handleRefresh}
            className={`flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {loading ? 'Sincronizando...' : 'Recarregar Dados'}
          </button>
        </div>
      </div>

      {/* Banner de Mensagem Rápida */}
      {actionMessage.text && (
        <div className={`p-4 rounded-lg text-xs font-bold flex items-center gap-2 justify-between border ${
          actionMessage.type === 'success' 
            ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20' 
            : 'bg-rose-500/10 text-rose-450 border-rose-500/20'
        }`}>
          <div className="flex items-center gap-1.5">
            {actionMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {actionMessage.text}
          </div>
        </div>
      )}

      {/* Barra de Navegação de Ferramentas */}
      <div className="flex flex-wrap gap-2 border-b border-gray-700/50 pb-2">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
            adminTab === 'overview' 
              ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          Indicadores Reais
        </button>
        <button
          onClick={() => setAdminTab('companies')}
          className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
            adminTab === 'companies' 
              ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          Empresas SaaS ({companies.length})
        </button>
        <button
          onClick={() => setAdminTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
            adminTab === 'users' 
              ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          Usuários Globais ({users.length})
        </button>
        <button
          onClick={() => setAdminTab('affiliates')}
          className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
            adminTab === 'affiliates' 
              ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          Afiliados & Indicações ({affiliates.length})
        </button>
        <button
          onClick={() => setAdminTab('support')}
          className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all relative ${
            adminTab === 'support' 
              ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          Chamados Suporte ({supportTickets.filter(t => t.status === 'Aberto').length} Ab)
          {supportTickets.filter(t => t.status === 'Aberto').length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </button>
        <button
          onClick={() => setAdminTab('security')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-2 rounded-lg cursor-pointer transition-all ${
            adminTab === 'security' 
              ? 'bg-[#1e1e24] text-indigo-400 border border-indigo-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Segurança, Logs & Infra
        </button>
        <button
          onClick={() => setAdminTab('custom_providers')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-2 rounded-lg cursor-pointer transition-all ${
            adminTab === 'custom_providers' 
              ? 'bg-[#1e1e24] text-emerald-400 border border-emerald-500/30' 
              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          Provedores NFS-e Custom
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-gray-500">Buscando dados das partições relacionais e memórias...</p>
        </div>
      ) : (
        <>
          {/* ABA 1: OVERVIEW INDICADORES */}
          {adminTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Cards de Métricas do faturamento, empresas e usuários */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Assinantes SaaS Ativos
                    <Building className="w-4 h-4 text-emerald-450" />
                  </div>
                  <div className="text-3xl font-sans font-bold text-white mt-1.5 flex items-baseline gap-1.5">
                    {stats?.activeCompanies || 0}
                    <span className="text-xs font-normal text-gray-500">/ {stats?.totalCompanies || 0} cadastros</span>
                  </div>
                  <div className="flex gap-2 text-[10px] text-gray-500 mt-2">
                    <span className="text-amber-500">{stats?.trialCompanies || 0} em trial</span>
                    <span>•</span>
                    <span className="text-red-500">{stats?.inactiveCompanies || 0} suspensos</span>
                  </div>
                </div>

                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Usuários sob Licença
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-sans font-bold text-white mt-1.5 flex items-baseline gap-1.5">
                    {stats?.activeUsers || 0}
                    <span className="text-xs font-normal text-gray-500">/ {stats?.totalUsers || 0} total</span>
                  </div>
                  <div className="flex gap-2 text-[10px] text-gray-500 mt-2">
                    <span className="text-red-550 font-bold">{stats?.blockedUsers || 0} bloqueados</span>
                    <span>•</span>
                    <span>Consumo flutuante ativo</span>
                  </div>
                </div>

                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Receita Recorrente SaaS (MRR)
                    <DollarSign className="w-4 h-4 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-3xl font-sans font-bold text-emerald-450 mt-1.5">
                    R$ {(stats?.mrr || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2">
                    Com base no faturamento mensal real dos assinantes ativos
                  </div>
                </div>

                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Receita Anual Estimada (ARR)
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-sans font-bold text-indigo-450 mt-1.5">
                    R$ {(stats?.estimatedAnnualRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2">
                    Previsão para os próximos 12 meses (MRR * 12)
                  </div>
                </div>

              </div>

              {/* Seção de Gráficos e Histórico */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Gráfico de Receita */}
                <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs lg:col-span-2">
                  <h3 className="text-sm font-sans font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" /> Receita Líquida Recorrente (MRR) - Histórico Recente
                  </h3>
                  <div className="h-64 pr-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mrrHistoryData}>
                        <defs>
                          <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="name" stroke="#555" fontSize={11} />
                        <YAxis stroke="#555" fontSize={11} tickFormatter={(v) => `R$${v}`} />
                        <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #333' }} labelStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="receita" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorMRR)" name="Receita SaaS" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Resumos Diversos */}
                <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs">
                  <h3 className="text-sm font-sans font-bold text-white mb-4">
                    Métricas de Conversão
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <div className="text-xs font-bold text-gray-300">Cadastros (Últimos 30 dias)</div>
                        <div className="text-[10px] text-gray-500">Sua plataforma está atraindo atenção</div>
                      </div>
                      <div className="text-lg font-bold text-indigo-400">{stats?.newRegistrationsRecent || 0}</div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <div className="text-xs font-bold text-gray-300">Parceiros Afiliados Ativos</div>
                        <div className="text-[10px] text-gray-500">Compartilhamento e canais externos</div>
                      </div>
                      <div className="text-lg font-bold text-amber-500">{stats?.affiliatesCount || 0}</div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <div className="text-xs font-bold text-gray-300">Acessos do Dia (Logins de Sucesso)</div>
                        <div className="text-[10px] text-gray-500">Interatividade em tempo real hoje</div>
                      </div>
                      <div className="text-lg font-bold text-emerald-500">{stats?.accessesToday || 0}</div>
                    </div>

                    <div className="flex justify-between items-center pb-1">
                      <div>
                        <div className="text-xs font-bold text-gray-300">Acessos Acumulados no Mês</div>
                        <div className="text-[10px] text-gray-500">Taxa de engajamento do ERP</div>
                      </div>
                      <div className="text-lg font-bold text-indigo-400">{stats?.accessesMonth || 0}</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ABA 2: LISTA DE EMPRESAS */}
          {adminTab === 'companies' && (
            <div className="bg-[#13131a] p-6 rounded-xl border border-gray-800/70 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4 text-indigo-400" /> Registro Geral de Empresas Assinantes
                </h3>
                
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Filtrar por CNPJ, Nome or Plano..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#18181f] text-xs py-2 pl-9 pr-4 rounded-lg border border-gray-800 focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </div>

              {/* Tabela de Empresas */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#18181f] text-gray-400 uppercase text-[9px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3 rounded-l-lg">ID / Razão Social</th>
                      <th className="p-3">CNPJ</th>
                      <th className="p-3">Plano</th>
                      <th className="p-3">Início / Renovação</th>
                      <th className="p-3">Uso Ativo (Prod / Trans / NF-e)</th>
                      <th className="p-3">Status Assinatura</th>
                      <th className="p-3 text-right rounded-r-lg">Ação de Suporte</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono text-gray-300">
                    {companies
                      .filter(c => 
                        (c.corporate_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (c.trade_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (c.cnpj || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (c.plan || '').toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-[#181823]/30 transition-colors">
                          <td className="p-3">
                            <div className="font-sans font-bold text-white text-xs">{c.corporate_name || 'MATRIZ INDETERMINADA'}</div>
                            <div className="text-[10px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                              <span>ID: {c.id}</span>
                              {c.trade_name && (
                                <>
                                  <span>•</span>
                                  <span className="text-indigo-405 font-bold">"{c.trade_name}"</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-3">{c.cnpj || 'Inexistente'}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-500/10 text-indigo-450 border border-indigo-500/20">
                              {c.plan || 'Média'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="text-[10px]">Trial: {c.trial_ends_at ? new Date(c.trial_ends_at).toLocaleDateString('pt-BR') : 'Exp'}</div>
                            <div className="text-[10px] text-indigo-405">Exp: {c.expires_at ? new Date(c.expires_at).toLocaleDateString('pt-BR') : 'Livre'}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <span className="bg-slate-850 px-1.5 py-0.5 rounded text-[10px]">📦 {c.usage_products ?? 0}</span>
                              <span className="bg-slate-850 px-1.5 py-0.5 rounded text-[10px]">💳 {c.usage_transactions ?? 0}</span>
                              <span className="bg-slate-850 px-1.5 py-0.5 rounded text-[10px]">🧾 {c.usage_invoices ?? 0}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              c.status === 'active' 
                                ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20' 
                                : c.status === 'trial'
                                ? 'bg-amber-500/10 text-amber-450 border border-amber-500/20'
                                : 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-md animate-pulse'
                            }`}>
                              {c.status === 'active' ? 'Pago / Ativo' : c.status === 'trial' ? 'Amostra / Trial' : 'Bloqueado'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditCompanyModal({
                                  id: c.id,
                                  corporate_name: c.corporate_name || '',
                                  trade_name: c.trade_name || '',
                                  cnpj: c.cnpj || '',
                                  plan: c.plan || 'media',
                                  status: c.status || 'trial',
                                  trial_ends_at: c.trial_ends_at ? c.trial_ends_at.substring(0, 10) : '',
                                  expires_at: c.expires_at ? c.expires_at.substring(0, 10) : ''
                                })}
                                className="p-1 px-2 text-[10px] font-bold bg-indigo-600/30 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Edit className="w-3 h-3" /> Editar SaaS
                              </button>
                              <button
                                onClick={() => handleDeleteCompany(c.id, c.corporate_name)}
                                className="p-1 px-2 text-[10px] font-bold bg-red-650/30 hover:bg-red-600 text-red-400 hover:text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" /> Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ABA 3: USUÁRIOS GLOBAIS */}
          {adminTab === 'users' && (
            <div className="bg-[#13131a] p-6 rounded-xl border border-gray-800/70 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" /> Registro Geral de Usuários do Sistema
                </h3>
                
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Filtrar por nome, e-mail ou corporação..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#18181f] text-xs py-2 pl-9 pr-4 rounded-lg border border-gray-800 focus:outline-none focus:border-indigo-500 text-white"
                  />
                </div>
              </div>

              {/* Tabela de Usuários */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#18181f] text-gray-400 uppercase text-[9px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3 rounded-l-lg">Nome Completo</th>
                      <th className="p-3">Acesso / Login</th>
                      <th className="p-3">Empresa Vinculada</th>
                      <th className="p-3">Perfil de Acesso</th>
                      <th className="p-3">Última Entrada</th>
                      <th className="p-3 text-right rounded-r-lg">Controles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono text-gray-300">
                    {users
                      .filter(u => 
                        (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (u.corporate_name || '').toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-[#181823]/30 transition-colors">
                          <td className="p-3">
                            <div className="font-sans font-bold text-white">{u.name}</div>
                            <div className="text-[10px] text-gray-500">ID: {u.id}</div>
                          </td>
                          <td className="p-3">{u.email}</td>
                          <td className="p-3 text-indigo-405 font-bold">{u.corporate_name}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-sans uppercase ${
                              u.is_admin ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-gray-400'
                            }`}>
                              {u.is_admin ? 'Administrador Geral' : 'Funcionário Operacional'}
                            </span>
                          </td>
                          <td className="p-3">
                            {u.last_login ? new Date(u.last_login).toLocaleString('pt-BR') : 'Sem registro'}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditUserModal({
                                  id: u.id,
                                  name: u.name,
                                  active: u.active,
                                  new_password: ''
                                })}
                                className="p-1 px-2.5 text-[10px] font-bold bg-indigo-650/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {u.active ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />} Modificar / Reset
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ABA 4: AFILIADOS */}
          {adminTab === 'affiliates' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Cadastrar Afiliado */}
                <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs h-fit space-y-4">
                  <h3 className="text-sm font-sans font-bold text-white flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-emerald-450" /> Criar Novo Parceiro Master
                  </h3>
                  
                  <form onSubmit={handleCreateAffiliate} className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Nome Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Albuquerque"
                        value={affiliateForm.name}
                        onChange={(e) => setAffiliateForm({...affiliateForm, name: e.target.value})}
                        className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Endereço de E-mail</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: carlos@afilio.com"
                        value={affiliateForm.email}
                        onChange={(e) => setAffiliateForm({...affiliateForm, email: e.target.value})}
                        className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Código Promocional</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: SILVA10"
                          value={affiliateForm.code}
                          onChange={(e) => setAffiliateForm({...affiliateForm, code: e.target.value})}
                          className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white focus:outline-none focus:border-indigo-500 uppercase font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Comissão (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          required
                          value={affiliateForm.commission_rate}
                          onChange={(e) => setAffiliateForm({...affiliateForm, commission_rate: parseFloat(e.target.value) || 10})}
                          className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Desconto para Comprador (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={affiliateForm.discount_rate}
                        onChange={(e) => setAffiliateForm({...affiliateForm, discount_rate: parseFloat(e.target.value) || 5})}
                        className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-650 hover:bg-emerald-600 text-white font-bold text-xs rounded transition-all shadow-md cursor-pointer"
                    >
                      Registrar Estrategicamente
                    </button>
                  </form>
                </div>

                {/* Lista de Afiliados */}
                <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-sans font-bold text-white">
                    Parceiros de Divulgação SaaS Atuais
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#18181f] text-gray-400 text-[10px] font-bold">
                        <tr>
                          <th className="p-2">Nome / Código</th>
                          <th className="p-2">Tráfego (Cliques/Leads)</th>
                          <th className="p-2">Conversão / Vendas</th>
                          <th className="p-2 text-right">Comissões (Pago / Pendente)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60 font-mono text-gray-350">
                        {affiliates.map((a) => (
                          <tr key={a.id} className="hover:bg-slate-900/10">
                            <td className="p-2">
                              <div className="font-sans font-bold text-white text-xs">{a.name}</div>
                              <div className="text-[10px] text-amber-500 font-bold">CÓDIGO: {a.code}</div>
                            </td>
                            <td className="p-2">
                              <div>💡 {a.clicks} Cliques</div>
                              <div className="text-xs text-gray-500">🎯 {a.leads} Indicações</div>
                            </td>
                            <td className="p-2">
                              <span className="bg-indigo-500/10 text-indigo-405 font-bold px-2 py-0.5 rounded text-[10px]">
                                💸 {a.sales_count} Ativações
                              </span>
                            </td>
                            <td className="p-2 text-right">
                              <div className="text-xs text-emerald-450 font-bold">Pago: R$ {parseFloat(a.commission_paid || 0).toFixed(2)}</div>
                              <div className="text-xs text-red-450 font-bold">Pendente: R$ {parseFloat(a.commission_pending || 0).toFixed(2)}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Registro de Comissões Individuais */}
              <div className="bg-[#13131a] p-6 rounded-xl border border-gray-800/70 shadow-xs space-y-4">
                <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-emerald-450" /> Comissionamentos das Ativações de Clientes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#18181f] text-gray-400 text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Afiliado Parceiro</th>
                        <th className="p-3">Empresa Ativada</th>
                        <th className="p-3">Valor da Venda</th>
                        <th className="p-3">Comissão Calculada</th>
                        <th className="p-3">Data Geração</th>
                        <th className="p-3">Estado Líquido</th>
                        <th className="p-3 text-right">Liquidação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60 font-mono text-gray-350">
                      {commissions.map((ac) => (
                        <tr key={ac.id} className="hover:bg-slate-900/10">
                          <td className="p-3 font-sans font-bold text-white">{ac.affiliate_name}</td>
                          <td className="p-3 text-indigo-405 font-bold">{ac.company_name}</td>
                          <td className="p-3">R$ {parseFloat(ac.sale_amount).toFixed(2)}</td>
                          <td className="p-3 text-emerald-450 font-bold">R$ {parseFloat(ac.commission_amount).toFixed(2)}</td>
                          <td className="p-3 text-xs text-gray-500">{new Date(ac.created_at).toLocaleDateString('pt-BR')}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              ac.status === 'Pago' ? 'bg-emerald-500/15 text-emerald-450' : 'bg-red-500/15 text-red-500 animate-pulse'
                            }`}>
                              {ac.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {ac.status !== 'Pago' ? (
                              <button
                                onClick={() => handlePayCommission(ac.id)}
                                className="px-2 py-1 bg-emerald-650 hover:bg-emerald-600 text-white font-bold text-[10px] rounded transition-all cursor-pointer"
                              >
                                Liquidar Pagamento
                              </button>
                            ) : (
                              <span className="text-gray-550 italic text-[10px]">Pago</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ABA 5: SUPORTE */}
          {adminTab === 'support' && (
            <div className="bg-[#13131a] p-6 rounded-xl border border-gray-800/70 shadow-xs space-y-6">
              <h3 className="text-sm font-sans font-bold text-white flex items-center gap-2">
                <Ticket className="w-4 h-4 text-indigo-450 animate-pulse" /> Atendimento de Tickets (Suporte Técnico SaaS)
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-[#18181f] p-5 rounded-xl border border-gray-800/80 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            ticket.priority === 'Alta' || ticket.priority === 'Urgente' 
                              ? 'bg-rose-500/15 text-rose-405 border border-rose-500/25' 
                              : 'bg-indigo-500/15 text-indigo-405 border border-indigo-500/25'
                          }`}>
                            Prioridade: {ticket.priority}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            ticket.status === 'Aberto' 
                              ? 'bg-emerald-500/20 text-emerald-450 border border-emerald-500/30 font-bold' 
                              : ticket.status === 'Em Atendimento'
                              ? 'bg-amber-500/20 text-amber-450 border border-amber-500/30'
                              : 'bg-slate-800 text-gray-500'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-sans font-bold text-white mt-2">
                          {ticket.title}
                        </h4>
                      </div>
                      <div className="text-right text-[10px] text-gray-500">
                        <div>Criado por: <span className="text-gray-300 font-bold">{ticket.user_name}</span></div>
                        <div className="text-indigo-405 font-bold uppercase mt-0.5">{ticket.company_name}</div>
                        <div className="mt-0.5 font-mono">{new Date(ticket.created_at).toLocaleString('pt-BR')}</div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 bg-slate-900/40 p-3 rounded-lg border border-gray-800 font-sans leading-relaxed">
                      {ticket.description}
                    </p>

                    {/* Respostas Anteriores */}
                    {ticket.replies && (typeof ticket.replies === 'string' ? JSON.parse(ticket.replies) : ticket.replies).length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Mensagens de Resposta</div>
                        {(typeof ticket.replies === 'string' ? JSON.parse(ticket.replies) : ticket.replies).map((rep: any, rIdx: number) => (
                          <div key={rIdx} className={`p-3 rounded-lg text-xs leading-relaxed ${
                            rep.sender.includes('Suporte') 
                              ? 'bg-indigo-950/20 border border-indigo-900/30 ml-8' 
                              : 'bg-slate-900/70 border border-gray-800/50 mr-8'
                          }`}>
                            <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase mb-1">
                              <span>{rep.sender}</span>
                              <span className="font-mono font-normal">{new Date(rep.date).toLocaleString('pt-BR')}</span>
                            </div>
                            <span className="text-gray-300">{rep.message}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          setReplyTicketModal(ticket);
                          setTicketStatusUpdate(ticket.status === 'Aberto' ? 'Em Atendimento' : ticket.status);
                        }}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded transition-all flex items-center gap-1 cursor-pointer shadow-md"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Responder Chamado Clientela
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 6: SEGURANÇA, LOGS & INFRA */}
          {adminTab === 'security' && (
            <div className="space-y-6">
              
              {/* Monitor de Recursos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Infraestrutura PostgreSQL
                    <Server className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold mt-1.5 flex items-center gap-2">
                    {systemResources?.postgresActive ? (
                      <>
                        <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-450 font-sans">Ativado / Operacional</span>
                      </>
                    ) : (
                      <>
                        <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                        <span className="text-amber-500 font-sans">Contingência LocalAtiva</span>
                      </>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2 font-mono">
                    {systemResources?.supabaseConfigured ? 'Banco de Nuvem Supabase Ativo' : 'Banco em Partição de Rede Dedicado'}
                  </div>
                </div>

                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Memória Consumida em Node.js
                    <Activity className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1.5 font-mono">
                    {systemResources?.memoryUsedMB || 0} MB <span className="text-xs text-gray-500">/ {systemResources?.memoryTotalMB || 0} MB</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2 font-sans">
                    Uptime de Serviço: {Math.round((systemResources?.uptime || 0) / 60)} minutos acumulados
                  </div>
                </div>

                <div className="bg-[#13131a] p-4 rounded-xl border border-gray-800/70 shadow-xs">
                  <div className="flex justify-between items-center text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                    Latência Latent-Estimated Est
                    <Clock className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-400 mt-1.5 font-mono">
                    {systemResources?.responseTimeEstMs || 0} ms
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2">
                    Varredura reativa de processamento do Host
                  </div>
                </div>

              </div>

              {/* Segundo Fator de Autenticação (2FA) */}
              <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs space-y-3">
                <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-indigo-400" /> Hardening de Segurança (Muti-factor OTP)
                </h3>
                <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
                  Para prevenção contra sequestro de credenciais ou vazamento de banco de dados, o segundo canal OTP de confirmação
                  pode ser exigido para todas as tarefas de alto impacto tais como suspensão de tenants, remoção de banco ou liberação de créditos de afiliados.
                </p>
                <div className="flex gap-4 pt-1">
                  <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded transition-all cursor-pointer">
                    Configurar MFA do Super-Admin
                  </button>
                  <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 text-gray-300 font-bold text-xs rounded transition-all cursor-pointer">
                    Auditar Chaves de Sessões
                  </button>
                </div>
              </div>

              {/* Logs de Sistema & Auditoria Integrada */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Logs de Auditoria */}
                <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs space-y-4">
                  <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-indigo-450" /> Trilha de Auditoria SaaS (Tenant Access)
                  </h3>
                  <div className="max-h-80 overflow-y-auto space-y-2 pr-2 font-mono text-[10px]">
                    {auditLogs.map((lg) => (
                      <div key={lg.id} className="p-2.5 rounded bg-slate-900/60 border border-gray-800/40 text-gray-350 leading-relaxed">
                        <div className="flex justify-between font-bold text-[9px] uppercase tracking-wider text-indigo-405">
                          <span>{lg.action}</span>
                          <span>{lg.ip_address || '127.0.0.1'}</span>
                        </div>
                        <div className="text-white mt-1">{lg.details}</div>
                        <div className="text-gray-500 text-[8px] mt-1 text-right">
                          {new Date(lg.timestamp || lg.created_at).toLocaleString('pt-BR')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Logs Solares de Rede / Erros */}
                <div className="bg-[#13131a] p-5 rounded-xl border border-gray-800/70 shadow-xs space-y-4">
                  <h3 className="text-sm font-sans font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-400" /> Logs de Sistema (Host & Integradores)
                  </h3>
                  <div className="max-h-80 overflow-y-auto space-y-2 pr-2 font-mono text-[10px]">
                    {systemLogs.map((lg, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-slate-900/60 border border-gray-800/40 leading-relaxed">
                        <div className="flex justify-between font-bold text-[9px] uppercase tracking-wider">
                          <span className={lg.log_type === 'warning' || lg.log_type === 'error' ? 'text-amber-500' : 'text-emerald-500'}>
                            [{lg.log_type || 'INFO'}] {lg.module}
                          </span>
                          <span className="text-gray-500 font-normal">{lg.created_at ? new Date(lg.created_at).toLocaleTimeString('pt-BR') : ''}</span>
                        </div>
                        <div className="text-gray-300 mt-1">{lg.message}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ABA 7: PROVEDORES NFS-E CUSTOMIZADOS */}
          {adminTab === 'custom_providers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold font-sans text-white">Provedores Universais</h2>
                  <p className="text-xs text-gray-400 font-mono mt-1">Gerencie integrações não-nativas com prefeituras customizadas</p>
                </div>
                <button 
                  onClick={() => setNewProviderModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 inline-block mr-1" /> Novo Provedor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customProviders.map((p) => (
                  <div key={p.id} className="bg-[#13131a] p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-bold">{p.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-500'}`}>
                          {p.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">{p.city} - {p.state} (IBGE: {p.ibge_code})</p>
                      
                      <div className="text-[10px] text-gray-500 mb-4 space-y-1">
                        <p>Req: {p.communication_type}</p>
                        <p>Auth: {p.authentication_type}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start gap-2 mt-4 pt-4 border-t border-gray-800">
                      <button 
                         onClick={() => setEditProviderModal(p)}
                         className="text-xs px-2 py-1 bg-gray-800 text-white font-bold rounded hover:bg-gray-700 cursor-pointer"
                      >
                         Editar
                      </button>
                      <button className="text-xs px-2 py-1 bg-indigo-600/30 text-indigo-400 font-bold rounded hover:bg-indigo-600/50 cursor-pointer">
                         Mapeamento
                      </button>
                      <button className="text-xs px-2 py-1 bg-amber-600/30 text-amber-500 font-bold rounded hover:bg-amber-600/50 cursor-pointer">
                         XML Template
                      </button>
                      <button 
                         onClick={async () => {
                           if (confirm("Confirmar exclusão?")) {
                             await authFetch(`/api/admin/custom-providers/${p.id}`, { method: 'DELETE', headers: {}});
                             setRefreshTrigger(prev => prev + 1);
                           }
                         }}
                         className="text-xs px-2 py-1 text-red-500 hover:bg-red-500/20 font-bold rounded cursor-pointer ml-auto"
                      >
                         <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {customProviders.length === 0 && (
                   <div className="col-span-3 text-center p-12 text-gray-500 text-sm">
                      Nenhum provedor customizado configurado até o momento.
                   </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* MODAL 1: EDITAR CADASTRO EMPRESA / ASSINATURA */}
      {editCompanyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-55">
          <div className="bg-[#13131a] w-full max-w-md p-6 rounded-xl border border-indigo-500/30 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                Editar Cadastro & Assinatura SaaS
              </h3>
              <button onClick={() => setEditCompanyModal(null)} className="text-gray-500 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateCompany} className="space-y-3">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1 col-span-2">Razão Social</label>
                <input
                  type="text"
                  required
                  value={editCompanyModal.corporate_name}
                  onChange={(e) => setEditCompanyModal({...editCompanyModal, corporate_name: e.target.value})}
                  className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Nome Fantasia</label>
                  <input
                    type="text"
                    value={editCompanyModal.trade_name}
                    onChange={(e) => setEditCompanyModal({...editCompanyModal, trade_name: e.target.value})}
                    className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">CNPJ</label>
                  <input
                    type="text"
                    required
                    value={editCompanyModal.cnpj}
                    onChange={(e) => setEditCompanyModal({...editCompanyModal, cnpj: e.target.value})}
                    className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Plano SaaS</label>
                  <select
                    value={editCompanyModal.plan}
                    onChange={(e) => setEditCompanyModal({...editCompanyModal, plan: e.target.value})}
                    className="w-full bg-[#18181f] text-xs py-2 px-2 rounded border border-gray-800 text-white"
                  >
                    <option value="micro">Plano Micro (R$ 49,90)</option>
                    <option value="pequena">Plano Pequena (R$ 99,00)</option>
                    <option value="media">Plano Média (R$ 199,00)</option>
                    <option value="corporativo">Plano Corporativo (R$ 499,00)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Status Corporativo</label>
                  <select
                    value={editCompanyModal.status}
                    onChange={(e) => setEditCompanyModal({...editCompanyModal, status: e.target.value})}
                    className="w-full bg-[#18181f] text-xs py-2 px-2 rounded border border-gray-800 text-white"
                  >
                    <option value="active">Pago / Ativo</option>
                    <option value="trial">Amostra / Trial</option>
                    <option value="suspended">Suspenso / Inadimplência</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Vencimento Trial</label>
                  <input
                    type="date"
                    value={editCompanyModal.trial_ends_at}
                    onChange={(e) => setEditCompanyModal({...editCompanyModal, trial_ends_at: e.target.value})}
                    className="w-full bg-[#18181f] text-xs py-2 px-2 rounded border border-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Renovação Mensal</label>
                  <input
                    type="date"
                    value={editCompanyModal.expires_at}
                    onChange={(e) => setEditCompanyModal({...editCompanyModal, expires_at: e.target.value})}
                    className="w-full bg-[#18181f] text-xs py-2 px-2 rounded border border-gray-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded transition-all shadow-md cursor-pointer"
                >
                  Confirmar e Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setEditCompanyModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-gray-300 font-bold text-xs rounded transition-all cursor-pointer"
                >
                  Desistir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERVIR NO USUÁRIO / RESET DE SENHA */}
      {editUserModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-55">
          <div className="bg-[#13131a] w-full max-w-sm p-6 rounded-xl border border-indigo-500/30 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                Alterar Usuário / Forçar Redefinição
              </h3>
              <button onClick={() => setEditUserModal(null)} className="text-gray-500 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Nome de Cadastro</label>
                <input
                  type="text"
                  required
                  value={editUserModal.name}
                  onChange={(e) => setEditUserModal({...editUserModal, name: e.target.value})}
                  className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Estado do Login</label>
                <select
                  value={editUserModal.active ? "true" : "false"}
                  onChange={(e) => setEditUserModal({...editUserModal, active: e.target.value === "true"})}
                  className="w-full bg-[#18181f] text-xs py-2 px-2 rounded border border-gray-800 text-white"
                >
                  <option value="true">Conta Ativa / Normal</option>
                  <option value="false">Conta Bloqueada / Ingressos Negados</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Redefinir Senha Direta</label>
                <input
                  type="password"
                  placeholder="Preencha apenas para alterar instantaneamente"
                  value={editUserModal.new_password}
                  onChange={(e) => setEditUserModal({...editUserModal, new_password: e.target.value})}
                  className="w-full bg-[#18181f] text-xs py-2 px-3 rounded border border-gray-800 text-white"
                />
                <p className="text-[9px] text-gray-500 mt-1">
                  Recomenda-se preencher senhas fortes com mínimo 6 dígitos (ex: SilvaPassERP9).
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded transition-all shadow-md cursor-pointer"
                >
                  Confirmar Mudanças
                </button>
                <button
                  type="button"
                  onClick={() => setEditUserModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-755 text-gray-305 font-bold text-xs rounded transition-all cursor-pointer"
                >
                  Abandonar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: RESPONDER TICKET DE CLIENTE */}
      {replyTicketModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-55">
          <div className="bg-[#13131a] w-full max-w-lg p-6 rounded-xl border border-indigo-500/30 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                Tratamento de Ticket de Suporte
              </h3>
              <button onClick={() => setReplyTicketModal(null)} className="text-gray-500 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-gray-800 leading-relaxed text-xs">
                <div className="font-bold text-indigo-405 mb-1 uppercase text-[9px]">Solicitação do Cliente:</div>
                <div className="text-white font-bold mb-1">"{replyTicketModal.title}"</div>
                <span className="text-gray-350">{replyTicketModal.description}</span>
              </div>

              <form onSubmit={handleReplyTicket} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Mudar Status Técnico</label>
                  <select
                    value={ticketStatusUpdate}
                    onChange={(e) => setTicketStatusUpdate(e.target.value)}
                    className="w-full bg-[#18181f] text-xs py-2 px-2 rounded border border-gray-800 text-white font-bold"
                  >
                    <option value="Aberto">Aberto</option>
                    <option value="Em Atendimento">Em Atendimento</option>
                    <option value="Resolvido">Resolvido</option>
                    <option value="Fechado">Fechado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Mensagem de Resposta do SaaS</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Olá, analisamos sua pasta relacional na SEFAZ e..."
                    value={supportReplyText}
                    onChange={(e) => setSupportReplyText(e.target.value)}
                    className="w-full bg-[#18181f] text-xs p-3 rounded border border-gray-800 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded transition-all shadow-md cursor-pointer"
                  >
                    Transmitir Resposta ao Cliente
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyTicketModal(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-755 text-gray-305 font-bold text-xs rounded transition-all cursor-pointer"
                  >
                    Deixar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: NOVO PROVEDOR CUSTOMIZADO */}
      {newProviderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-55">
          <div className="bg-[#13131a] w-full max-w-2xl p-6 rounded-xl border border-indigo-500/30 space-y-4 max-h-[90vh] overflow-y-auto w-[800px]">
             <div className="flex justify-between items-center border-b border-gray-800 pb-3">
               <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                 Novo Provedor Customizado
               </h3>
               <button onClick={() => setNewProviderModal(false)} className="text-gray-500 hover:text-white cursor-pointer">
                 <X className="w-4 h-4" />
               </button>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold mb-1 col-span-2 text-gray-400">Nome do Provedor</label>
                   <input type="text" value={providerForm.name} onChange={e => setProviderForm({...providerForm, name: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white" placeholder="Ex: Ginfes Customizado" />
                 </div>
                 <div className="flex gap-2">
                   <div className="flex-1">
                     <label className="block text-xs font-bold mb-1 text-gray-400">Município</label>
                     <input type="text" value={providerForm.city} onChange={e => setProviderForm({...providerForm, city: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white" placeholder="Ex: São Paulo" />
                   </div>
                   <div className="w-20">
                     <label className="block text-xs font-bold mb-1 text-gray-400">UF</label>
                     <input type="text" value={providerForm.state} onChange={e => setProviderForm({...providerForm, state: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white" placeholder="Ex: SP" maxLength={2} />
                   </div>
                 </div>
                 
                 <div>
                   <label className="block text-xs font-bold mb-1 text-gray-400">Código IBGE</label>
                   <input type="text" value={providerForm.ibge_code} onChange={e => setProviderForm({...providerForm, ibge_code: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white" placeholder="Apenas números" />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold mb-1 text-gray-400">Status Ativação</label>
                    <select value={providerForm.active ? 'Ativo' : 'Inativo'} onChange={e => setProviderForm({...providerForm, active: e.target.value === 'Ativo'})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white">
                        <option>Ativo</option>
                        <option>Inativo</option>
                    </select>
                 </div>
                 
                 <div className="col-span-2">
                   <label className="block text-xs font-bold mb-1 text-gray-400">URL Produção</label>
                   <input type="text" value={providerForm.production_url} onChange={e => setProviderForm({...providerForm, production_url: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white" placeholder="https://..." />
                 </div>
                 
                 <div className="col-span-2">
                   <label className="block text-xs font-bold mb-1 text-gray-400">URL Homologação</label>
                   <input type="text" value={providerForm.homologation_url} onChange={e => setProviderForm({...providerForm, homologation_url: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white" placeholder="https://..." />
                 </div>
                 
                 <div>
                   <label className="block text-xs font-bold mb-1 text-gray-400">Comunicação</label>
                   <select value={providerForm.communication_type} onChange={e => setProviderForm({...providerForm, communication_type: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white">
                      <option value="SOAP">SOAP</option>
                      <option value="REST_XML">REST (XML)</option>
                      <option value="REST_JSON">REST (JSON)</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-xs font-bold mb-1 text-gray-400">Autenticação</label>
                   <select value={providerForm.authentication_type} onChange={e => setProviderForm({...providerForm, authentication_type: e.target.value})} className="w-full text-sm bg-black border border-gray-800 rounded p-2 text-white">
                      <option value="Certificado">Certificado Digital (A1)</option>
                      <option value="Basic">Basic Auth (Usuário/Senha)</option>
                      <option value="Bearer">Bearer Token</option>
                      <option value="ApiKey">API Key Headers</option>
                      <option value="OAuth2">OAuth 2.0</option>
                   </select>
                 </div>
             </div>
             
             <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-800">
                <button 
                  onClick={() => setNewProviderModal(false)}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-lg cursor-pointer transition-colors"
                >Cancelar</button>
                <button 
                  onClick={async () => {
                     try {
                        const res = await authFetch('/api/admin/custom-providers', {
                           method: 'POST',
                           headers: { 'Content-Type': 'application/json' },
                           body: JSON.stringify(providerForm)
                        });
                        const data = await res.json();
                        if (res.ok) {
                           setNewProviderModal(false);
                           setRefreshTrigger(prev => prev + 1);
                           showBanner('success', 'Provedor customizado registrado com sucesso.');
                        } else {
                           showBanner('error', data.error || 'Erro ao registrar provedor');
                        }
                     } catch (e: any) {
                        showBanner('error', 'Erro interno de servidor');
                     }
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 shadow hover:shadow-indigo-500/20 text-white text-sm font-bold rounded-lg cursor-pointer transition-all active:scale-95"
                >Salvar Provedor</button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
