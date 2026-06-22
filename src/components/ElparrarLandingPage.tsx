import React, { useState, useEffect, FormEvent } from 'react';
import YopoyLogo from './YopoyLogo';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../frontend/auth/AuthContext';
import { 
  DollarSign, 
  Layers, 
  User, 
  Landmark, 
  TrendingUp, 
  Users, 
  Workflow, 
  Sparkles, 
  Headphones, 
  Check, 
  Moon, 
  Sun, 
  ArrowRight,
  Globe,
  Share2,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

interface ElparrarLandingPageProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onSelectPlan: (plan: 'micro' | 'pequena' | 'media' | 'corporativo') => void;
  onLoginSuccess: (user: Record<string, unknown>) => void;
}

export default function ElparrarLandingPage({ theme, toggleTheme, onSelectPlan, onLoginSuccess }: ElparrarLandingPageProps) {
  const { login, registerCompany } = useAuth();
  const [mode, setMode] = useState<'landing' | 'login' | 'register' | 'forgot' | 'reset'>('landing');
  const [companyRazaoSocial, setCompanyRazaoSocial] = useState('');

  const [adminNomeCompleto, setAdminNomeCompleto] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminSenha, setAdminSenha] = useState('');
  const [adminConfirmarSenha, setAdminConfirmarSenha] = useState('');

  // Estados para recuperação e alteração obrigatória de senha
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [simulatedLink, setSimulatedLink] = useState('');

  const [urlResetToken, setUrlResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');

  // Detectar token de redefinição de senha na URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tok = params.get('resetToken');
    if (tok) {
      setUrlResetToken(tok);
      setMode('reset');
    }
  }, []);

  // Loading States and Verification
  const [processingAuth, setProcessingAuth] = useState(false);
  const [loadingStepLabel, setLoadingStepLabel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // States for Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Load existing registered users on load if not present
  useEffect(() => {
    const list = localStorage.getItem('biz_registered_users');
    if (!list) {
      localStorage.setItem('biz_registered_users', JSON.stringify([]));
    }
  }, []);

  const plans = [
    {
      id: 'micro' as const,
      name: 'PLANO BÁSICO',
      price: 'R$ 49,90',
      period: '/mês',
      description: 'Ideal para MEIs e autônomos iniciando o controle de vendas.',
      tag: 'Iniciante',
      popular: false,
      color: 'bg-slate-500/10 text-slate-500 border-slate-500/20 dark:bg-slate-400/10 dark:text-slate-450',
      btnColor: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100',
      features: [
        { icon: DollarSign, text: 'Emissão de Notas Simplificada' },
        { icon: Layers, text: 'Estoque Básico (Sem Lotes)' },
        { icon: User, text: '1 Usuário Administrador' },
      ]
    },
    {
      id: 'pequena' as const,
      name: 'PLANO MÉDIO',
      price: 'R$ 129,90',
      period: '/mês',
      description: 'Estrutura completa para comércios locais e pequenas distribuidoras.',
      tag: 'Crescimento',
      popular: false,
      color: 'bg-indigo-500/10 text-indigo-650 border-indigo-500/20 dark:bg-indigo-400/10 dark:text-indigo-400',
      btnColor: 'bg-indigo-50/10 hover:bg-indigo-50/15 text-indigo-650 dark:text-indigo-400 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900',
      features: [
        { icon: Landmark, text: 'Gestão Financeira Completa' },
        { icon: TrendingUp, text: 'Relatórios Operacionais' },
        { icon: Users, text: 'Até 5 Usuários Integrados' },
      ]
    },
    {
      id: 'media' as const,
      name: 'PLANO PREMIUM',
      price: 'R$ 299,90',
      period: '/mês',
      description: 'Plataforma ERP Inteligente integrada com IA e auditoria de lotes.',
      tag: 'Mais Popular',
      popular: true,
      color: 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:bg-red-500/10 dark:text-orange-400',
      btnColor: 'bg-rose-600 hover:bg-rose-700 dark:bg-red-650 dark:hover:bg-red-750 text-white shadow-lg shadow-rose-900/10 dark:shadow-red-900/30',
      features: [
        { icon: Workflow, text: 'CRM Vendas & Automação' },
        { icon: Layers, text: 'Estoque Inteligente com Lotes' },
        { icon: Sparkles, text: 'ChatGPT do Negócio (Advisor IA)' },
        { icon: Users, text: 'Múltiplos Usuários Ilimitados' },
        { icon: Headphones, text: 'Suporte Prioritário 24/7' },
      ]
    }
  ];

  // Click on a plan from Landing
  const handleSelectPlanLaunch = (_planId: 'micro' | 'pequena' | 'media' | 'corporativo') => {
    setMode('register');
  };

  // Submit Sign In Form (unified custom check + backend postgres verification)
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setLoginError('Insira um e-mail válido.');
      return;
    }

    if (!loginPass.trim()) {
      setLoginError('A senha é obrigatória.');
      return;
    }

    setProcessingAuth(true);

    try {
      await login(loginEmail.trim(), loginPass);
      setProcessingAuth(false);
      onLoginSuccess({
        email: loginEmail.trim()
      });
    } catch (err: unknown) {
      setProcessingAuth(false);
      setLoginError(err instanceof Error ? err.message : 'Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  const handleMinimalRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!companyRazaoSocial.trim()) {
      setErrorMessage('Nome da empresa é obrigatório.');
      return;
    }
    if (!adminNomeCompleto.trim()) {
      setErrorMessage('Nome completo do administrador é obrigatório.');
      return;
    }
    if (!adminEmail.trim() || !adminEmail.includes('@')) {
      setErrorMessage('E-mail do administrador é obrigatório e deve ser válido.');
      setProcessingAuth(false);
      return;
    }
    if (!adminSenha || adminSenha.length < 6) {
      setErrorMessage('A senha do administrador deve ter no mínimo 6 caracteres.');
      setProcessingAuth(false);
      return;
    }
    if (adminSenha !== adminConfirmarSenha) {
      setErrorMessage('A confirmação de senha não coincide.');
      setProcessingAuth(false);
      return;
    }

    setProcessingAuth(true);
    setLoadingStepLabel('Criando sua conta...');

    try {
      await registerCompany({
        companyName: companyRazaoSocial.trim(),
        adminName: adminNomeCompleto.trim(),
        email: adminEmail.trim(),
        password: adminSenha,
        confirmPassword: adminConfirmarSenha
      });
      setProcessingAuth(false);
      onLoginSuccess({
        corporateName: companyRazaoSocial.trim(),
        email: adminEmail.trim()
      });
    } catch (err: unknown) {
      setProcessingAuth(false);
      setErrorMessage(err instanceof Error ? err.message : 'Erro ao realizar o cadastro. Por favor verifique.');
    }
  };

  // Submit Forgot Password Form
  const handleForgotSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setSimulatedLink('');
    setProcessingAuth(true);

    try {
      const resp = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: forgotEmail })
      });

      const data = await resp.json();
      setProcessingAuth(false);

      if (resp.ok && data.success) {
        setForgotSuccess(data.message);
        if (data.simulated && data.recoverLink) {
          // Exibe o link funcional gerado na própria tela para facilitar teste em tempo real!
          setSimulatedLink(data.recoverLink);
        }
      } else {
        setForgotError(data.error || 'Erro ao processar recuperação de senha.');
      }
    } catch {
      setProcessingAuth(false);
      setForgotError('Não foi possível conectar ao servidor. Tente de novo.');
    }
  };

  // Submit Password Reset Form
  const handleResetSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    setProcessingAuth(true);

    if (newPassword !== confirmNewPassword) {
      setProcessingAuth(false);
      setResetError('A nova senha e a confirmação não coincidem.');
      return;
    }

    try {
      const resp = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: urlResetToken,
          password: newPassword,
          confirmPassword: confirmNewPassword
        })
      });

      const data = await resp.json();
      setProcessingAuth(false);

      if (resp.ok && data.success) {
        setResetSuccess(data.message + ' Redirecionando para login...');
        setTimeout(() => {
          setMode('login');
          setUrlResetToken('');
          setResetSuccess('');
          setNewPassword('');
          setConfirmNewPassword('');
        }, 3000);
      } else {
        setResetError(data.error || 'Token inválido ou expirado. Solicite a redefinição novamente.');
      }
    } catch {
      setProcessingAuth(false);
      setResetError('Erro de conexão ao redefinir a senha.');
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-between overflow-x-hidden transition-colors duration-350 ${
      theme === 'dark' ? 'bg-[#0a0a0d] text-slate-105' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Background Cinematic Visual Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          alt="Professional business environment" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-10 dark:opacity-[0.14] grayscale contrast-125 scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuChAVjytwYiiEhTAj85qlhaC78-jaizRMMfporh1wW_3r7Lfs4mu-zhec1wk4d8rG-dGvCmSK9OaNhGZw0CoIKoMDVjECR_k93z0R56S3v3xDhze5fGttZsBdF9AXqCO8EwbjZQq0s7Vf4txr_6YL8yauiSSwXv6_TlYGqjyjnqkd5s6_Kg8lb4NdsWFnm_Uki_V4VQliFSh6qXNUx4mzycITSebYHV6H8h-ofYLIHrVeoDDeFMFrGRGAsC1KvmHHMEveMSw46rVlET"
        />
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-[#0a0a0d]/60 via-[#0a0a0d]/90 to-[#0a0a0d]' 
            : 'bg-gradient-to-b from-slate-50/70 via-slate-50/95 to-slate-50'
        }`}></div>
      </div>

      {/* Top Header Menu Bar with requested options */}
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-5 border-b backdrop-blur-md transition-colors ${
        theme === 'dark' ? 'bg-[#0a0a0d]/80 border-slate-900/60' : 'bg-white/85 border-slate-200'
      }`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode('landing')}>
          <YopoyLogo size={36} theme={theme} />
        </div>

        <div className="flex items-center gap-4">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
              theme === 'dark' ? 'bg-[#15151b] border-slate-800 text-amber-400 hover:text-amber-300' : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Entrar Button */}
          <button 
            type="button"
            onClick={() => { setMode('login'); setLoginError(''); }}
            className={`text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-all ${
              mode === 'login'
                ? 'text-rose-500 dark:text-red-400 underline font-extrabold'
                : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-705 hover:text-indigo-805')
            }`}
          >
            Entrar
          </button>

          {/* Cadastrar Button */}
          <button 
            type="button"
            onClick={() => setMode('register')}
            className={`font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
              mode === 'register'
                ? 'bg-gradient-to-r from-orange-550 to-rose-600 text-white'
                : (theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white')
            }`}
          >
            Cadastrar
          </button>
        </div>
      </nav>

      {/* Main Container Area */}
      <main className="relative z-10 flex-grow pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center items-center w-full">
        <AnimatePresence mode="wait">
          
          {/* MODE 1: LANDING PAGE HERO AND PLANS */}
          {mode === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="max-w-3xl space-y-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  theme === 'dark' ? 'bg-red-955/45 text-red-100 border border-red-900/40' : 'bg-indigo-50/90 text-indigo-705 border border-indigo-150'
                }`}>
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  GERENCIADOR MULTIPLATAFORMA ERP v4.8
                </span>

                <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Gestão completa para sua empresa crescer.
                </h1>

                <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  Automatize processos, emita notas fiscais (Sebrae), controle estoque inteligente por lote e regule sua contabilidade de forma impecável.
                </p>
              </div>

              {/* Plans Section */}
              <div className="w-full mt-16 md:mt-20">
                <h2 className={`text-xs uppercase font-extrabold tracking-widest text-center mb-10 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Selecione seu plano para começar a simulação imediatamente
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full text-left">
                  {plans.map((p, index) => (
                    <div
                      key={p.id}
                      className={`p-6 rounded-3xl border flex flex-col justify-between transition-all relative cursor-pointer hover:-translate-y-2 group ${
                        p.popular 
                          ? (theme === 'dark' ? 'bg-[#121217] border-red-500 shadow-xl shadow-red-950/20' : 'bg-white border-rose-450 shadow-xl shadow-rose-100/60')
                          : (theme === 'dark' ? 'bg-[#0f0f13]/85 border-slate-900/80 hover:border-slate-800' : 'bg-white border-slate-205 shadow-sm hover:border-slate-350')
                      }`}
                      onClick={() => handleSelectPlanLaunch(p.id)}
                    >
                      {p.popular && (
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          theme === 'dark' ? 'bg-red-650 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          Mais Escolhido
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${p.color}`}>
                            {p.name}
                          </span>
                          <span className="text-xs text-gray-500 font-mono font-medium">{p.tag}</span>
                        </div>

                        <div className="py-2">
                          <div className="flex items-baseline">
                            <span className={`text-2xl sm:text-3xl font-black font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              {p.price}
                            </span>
                            <span className="text-xs text-gray-500 font-medium ml-1">
                              {p.period}
                            </span>
                          </div>
                          <p className={`text-[11px] mt-2 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            {p.description}
                          </p>
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-900/65 pt-4 space-y-3">
                          <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 block">Recursos Inclusos</span>
                          {p.features.map((feat, idx) => {
                            const Icon = feat.icon;
                            return (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                <div className={`p-1 rounded-md ${theme === 'dark' ? 'bg-[#181822] text-emerald-400' : 'bg-emerald-55 border border-emerald-250 text-emerald-800'}`}>
                                  <Icon className="w-3.5 h-3.5 animate-pulse" />
                                </div>
                                <span className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                  {feat.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-8 pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPlanLaunch(p.id);
                          }}
                          className={`w-full py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${p.btnColor}`}
                        >
                          Assinar &amp; Criar Cadastro
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* MODE 2: LOGIN CONSOLE (ENTRAR) */}
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md"
            >
              <div className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
                theme === 'dark' ? 'bg-[#0f0f13] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {/* Visual Accent glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-red-600"></div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-5 h-5 text-rose-500" />
                    <h2 className="text-lg font-black tracking-tight font-sans uppercase">Acessar yopoy ERP</h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setMode('landing')}
                    className="p-1 px-2.5 rounded-lg border text-[10px] font-bold uppercase transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-100 cursor-pointer"
                  >
                    Voltar
                  </button>
                </div>

                {loginError && (
                  <div className="p-3 mb-4 rounded-xl text-xs bg-red-950/20 text-red-400 border border-red-500/10 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1.5">E-mail de Trabalho</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input 
                        type="email" 
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Ex: adm@empresa.com"
                        className={`w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                          theme === 'dark'
                            ? 'bg-[#18181c] border-slate-800 focus:border-red-500 text-white'
                            : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1.5">Senha de Segurança</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input 
                        type="password" 
                        required
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="Preencha sua senha"
                        className={`w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                          theme === 'dark'
                            ? 'bg-[#18181c] border-slate-800 focus:border-red-500 text-white'
                            : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                        }`}
                      />
                    </div>
                    <div className="flex justify-end text-[10px] uppercase font-bold text-rose-500 hover:underline cursor-pointer mt-1.5">
                      <span onClick={() => { setMode('forgot'); setForgotSuccess(''); setForgotError(''); setSimulatedLink(''); }}>
                        Esqueci minha senha
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processingAuth}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase py-3.5 px-4 rounded-xl cursor-pointer shadow-lg shadow-red-950/20 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {processingAuth ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Buscando credenciais...
                      </span>
                    ) : (
                      <>
                        Entrar no Sistema ERP
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center text-[11px]">
                  <p className="text-gray-500">
                    Não possui uma licença?{' '}
                    <span 
                      onClick={() => setMode('register')}
                      className="text-rose-500 hover:underline font-bold cursor-pointer"
                    >
                      Criar conta e contratar plano de teste
                    </span>
                  </p>
                </div>

                {/* Notice instructing user to use the independent sign up */}
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/5 text-emerald-500 border border-emerald-500/10 text-[9px] font-mono leading-relaxed">
                  💡 <b>CONTA DE TESTE INDEPENDENTE:</b><br />
                  Utilize o link "Criar conta" acima para gerar uma empresa e usuário administrador exclusivos para testes.
                </div>
              </div>
            </motion.div>
          )}

          {/* MODE 4: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md"
            >
              <div className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
                theme === 'dark' ? 'bg-[#0f0f13] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {/* Visual Accent glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-rose-600"></div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
                    <h2 className="text-lg font-black tracking-tight font-sans uppercase">Recuperar Senha</h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setMode('login')}
                    className="p-1 px-2.5 rounded-lg border text-[10px] font-bold uppercase transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-100 cursor-pointer"
                  >
                    Voltar ao Login
                  </button>
                </div>

                {forgotError && (
                  <div className="p-3 mb-4 rounded-xl text-xs bg-red-950/20 text-red-400 border border-red-500/10 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{forgotError}</span>
                  </div>
                )}

                {forgotSuccess && (
                  <div className="p-3 mb-4 rounded-xl text-xs bg-emerald-950/20 text-emerald-400 border border-emerald-500/10 flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{forgotSuccess}</span>
                    </div>
                  </div>
                )}

                {simulatedLink && (
                  <div className="p-4 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-500 space-y-2">
                    <p className="font-extrabold uppercase text-[10px] tracking-wider text-amber-400">🔗 Link de Recuperação Gerado via PostgreSQL:</p>
                    <p className="font-mono break-all bg-black/40 p-2 rounded text-[10px] leading-relaxed select-all">
                      {simulatedLink}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      <i>Para fins de teste e auditoria em tempo real, clique no link abaixo para simular a alteração da sua senha no banco de dados.</i>
                    </p>
                    <a 
                      href={simulatedLink} 
                      className="inline-block w-full text-center bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-lg font-bold text-[11px] uppercase tracking-wide transition-all"
                    >
                      Acessar Tela de Redefinição
                    </a>
                  </div>
                )}

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1.5">Insira seu E-mail Cadastrado</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input 
                        type="email" 
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Ex: adm@suaempresa.com"
                        className={`w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                          theme === 'dark'
                            ? 'bg-[#18181c] border-slate-800 focus:border-red-500 text-white'
                            : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processingAuth}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold uppercase py-3.5 px-4 rounded-xl cursor-pointer shadow-lg flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {processingAuth ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Buscando empresa no Postgres...
                      </span>
                    ) : (
                      <>
                        Enviar Instruções de Redefinição
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* MODE 5: RESET PASSWORD */}
          {mode === 'reset' && (
            <motion.div
              key="reset"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md"
            >
              <div className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
                theme === 'dark' ? 'bg-[#0f0f13] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {/* Visual Accent glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-rose-500 to-rose-650"></div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-lg font-black tracking-tight font-sans uppercase text-emerald-400">Alterar Senha ERP</h2>
                  </div>
                </div>

                {resetError && (
                  <div className="p-3 mb-4 rounded-xl text-xs bg-red-950/20 text-red-400 border border-red-500/10 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{resetError}</span>
                  </div>
                )}

                {resetSuccess && (
                  <div className="p-3 mb-4 rounded-xl text-xs bg-emerald-950/20 text-emerald-400 border border-emerald-500/10 flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{resetSuccess}</span>
                  </div>
                )}

                <div className="p-3 mb-4 rounded-xl bg-slate-800/20 text-[11px] text-gray-400 font-medium leading-relaxed">
                  🔒 Você está usando um token de redefinição seguro. Sua nova senha será reescrita de forma criptografada no banco de dados.
                </div>

                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1.5">Nova Senha de Acesso</label>
                    <input 
                      type="password" 
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo de 6 caracteres desejados"
                      className={`w-full text-xs font-semibold px-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                        theme === 'dark'
                          ? 'bg-[#18181c] border-[#222228] focus:border-emerald-500 text-white'
                          : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1.5">Confirmar Nova Senha</label>
                    <input 
                      type="password" 
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Repita exatamente a nova senha"
                      className={`w-full text-xs font-semibold px-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                        theme === 'dark'
                          ? 'bg-[#18181c] border-[#222228] focus:border-emerald-500 text-white'
                          : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processingAuth}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase py-3.5 px-4 rounded-xl cursor-pointer shadow-lg flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {processingAuth ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Reescrevendo no PostgreSQL...
                      </span>
                    ) : (
                      <>
                        Confirmar e Redefinir Senha
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* MODE 3: CADASTRO INICIAL MÍNIMO */}
          {mode === 'register' && (
            <motion.div
              key="register-minimal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-xl"
            >
              <div className={`p-8 rounded-3xl border shadow-2xl relative ${
                theme === 'dark' ? 'bg-[#0f0f13] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-red-650" />
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">Criar conta</h2>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-extrabold tracking-wider">
                      Comece com os dados essenciais
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMode('landing')}
                    className="p-1 px-3 rounded-lg border text-[10px] font-bold uppercase text-gray-400 cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Voltar
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-3 mb-4 rounded-xl text-xs bg-red-950/20 text-red-400 border border-red-500/10 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleMinimalRegisterSubmit} className="space-y-4">
                  {[
                    { label: 'Nome da empresa / workspace', type: 'text', value: companyRazaoSocial, setter: setCompanyRazaoSocial, autocomplete: 'organization' },
                    { label: 'Nome completo', type: 'text', value: adminNomeCompleto, setter: setAdminNomeCompleto, autocomplete: 'name' },
                    { label: 'E-mail', type: 'email', value: adminEmail, setter: setAdminEmail, autocomplete: 'email' },
                    { label: 'Senha', type: 'password', value: adminSenha, setter: setAdminSenha, autocomplete: 'new-password' },
                    { label: 'Confirmar senha', type: 'password', value: adminConfirmarSenha, setter: setAdminConfirmarSenha, autocomplete: 'new-password' }
                  ].map((field) => (
                    <label key={field.label} className="block">
                      <span className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">{field.label}</span>
                      <input
                        type={field.type}
                        required
                        value={field.value}
                        onChange={(event) => field.setter(event.target.value)}
                        autoComplete={field.autocomplete}
                        className={`w-full text-xs font-semibold px-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                          theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                        }`}
                      />
                    </label>
                  ))}

                  <button
                    type="submit"
                    disabled={processingAuth}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {processingAuth ? loadingStepLabel : 'Criar conta e entrar'}
                    {!processingAuth && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </motion.div>
          )}


        </AnimatePresence>
      </main>

      {/* Footer bar */}
      <footer className={`w-full py-10 px-4 md:px-8 border-t z-10 transition-colors ${
        theme === 'dark' ? 'bg-[#08080b]/90 border-slate-900' : 'bg-slate-100/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className={`text-sm font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              yopoy Business Solutions Ltd.
            </span>
            <p className="text-[11px] text-gray-500 mt-1">
              Soluções inteligentes de ERP, fiscalidade simplificada e escala logística integrados com IA para comércios e cooperativas.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
            <span className="cursor-pointer hover:text-amber-500" onClick={() => setMode('landing')}>Início</span>
            <span>&bull;</span>
            <span className="cursor-pointer hover:text-amber-500" onClick={() => { setMode('login'); setLoginError(''); }}>Acessar</span>
            <span>&bull;</span>
            <span className="cursor-pointer hover:text-amber-500" onClick={() => setMode('register')}>Cadastro Rápido</span>
          </div>

          <div className="flex gap-3 text-gray-500 text-slate-500">
            <Globe className="w-4 h-4 cursor-pointer hover:text-emerald-500" />
            <Share2 className="w-4 h-4 cursor-pointer hover:text-emerald-500" />
          </div>
        </div>
      </footer>

    </div>
  );
}
