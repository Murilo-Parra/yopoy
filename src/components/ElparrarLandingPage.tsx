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
  Phone,
  MapPin,
  Building,
  CreditCard,
  QrCode,
  Barcode,
  CheckCircle2,
  ArrowLeft,
  Shield,
  FileText,
  AlertCircle
} from 'lucide-react';

interface ElparrarLandingPageProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onSelectPlan: (plan: 'micro' | 'pequena' | 'media' | 'corporativo') => void;
  onLoginSuccess: (user: any) => void;
}

export default function ElparrarLandingPage({ theme, toggleTheme, onSelectPlan, onLoginSuccess }: ElparrarLandingPageProps) {
  const { login, registerCompany } = useAuth();
  const [mode, setMode] = useState<'landing' | 'login' | 'register' | 'forgot' | 'reset'>('landing');
  const [registerStep, setRegisterStep] = useState<1 | 2 | 3>(1);

  // Estados dos novos campos robustos e seguros de empresa (Módulo 48.2-H)
  const [companyRazaoSocial, setCompanyRazaoSocial] = useState('');
  const [companyNomeFantasia, setCompanyNomeFantasia] = useState('');
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyTelefone, setCompanyTelefone] = useState('');
  const [companyRua, setCompanyRua] = useState('');
  const [companyNumero, setCompanyNumero] = useState('');
  const [companyCidade, setCompanyCidade] = useState('');
  const [companyUf, setCompanyUf] = useState('');
  const [companyRegimeTributario, setCompanyRegimeTributario] = useState('simples_nacional');

  const [adminNomeCompleto, setAdminNomeCompleto] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminSenha, setAdminSenha] = useState('');
  const [adminConfirmarSenha, setAdminConfirmarSenha] = useState('');

  // Estados dos novos campos simplificados para cadastro multi-tenant (compatibilidade)
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regAdminName, setRegAdminName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

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

  // States for Signup Wizard (Pessoa Física vs Jurídica)
  const [userType, setUserType] = useState<'pf' | 'pj'>('pf');
  
  // Pessoa Física fields
  const [pfNome, setPfNome] = useState('');
  const [pfCpf, setPfCpf] = useState('');
  const [pfEmail, setPfEmail] = useState('');
  const [pfTelefone, setPfTelefone] = useState('');
  const [pfEndereco, setPfEndereco] = useState('');
  const [pfSenha, setPfSenha] = useState('');

  // Pessoa Jurídica fields
  const [pjRazaoSocial, setPjRazaoSocial] = useState('');
  const [pjNomeFantasia, setPjNomeFantasia] = useState('');
  const [pjCnpj, setPjCnpj] = useState('');
  const [pjIe, setPjIe] = useState('');
  const [pjEndereco, setPjEndereco] = useState('');
  const [pjEmail, setPjEmail] = useState('');
  const [pjSenha, setPjSenha] = useState('');

  // Step 2 & 3: Plan selection
  const [selectedPlanId, setSelectedPlanId] = useState<'micro' | 'pequena' | 'media' | 'corporativo' | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Payment method: 'card' | 'pix' | 'boleto'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [pixChecked, setPixChecked] = useState(false);
  const [boletoChecked, setBoletoChecked] = useState(false);

  // Loading States and Verification
  const [processingAuth, setProcessingAuth] = useState(false);
  const [loadingStepLabel, setLoadingStepLabel] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // States for Login form
  const [loginCompanyId, setLoginCompanyId] = useState('');
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

  // Helper para força de senha do administrador (Módulo 48.2-H)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: 'bg-transparent', textColor: 'text-gray-400' };
    if (pass.length < 6) return { score: 1, text: 'Senha Fraca (mínimo 6 caracteres)', color: 'bg-red-500 w-1/3', textColor: 'text-red-400' };
    
    const hasNumbers = /\d/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
    if (hasNumbers && (hasUpper || hasSpecial)) {
      return { score: 3, text: 'Senha Forte (Excelente!)', color: 'bg-emerald-500 w-full', textColor: 'text-emerald-400' };
    }
    return { score: 2, text: 'Senha Média (adicione letras maiúsculas/números/especiais)', color: 'bg-amber-500 w-2/3', textColor: 'text-amber-400' };
  };

  // Validation Checks for Page 1 of Signup (Módulo 48.2-H)
  const isRobustStep1Valid = 
    companyRazaoSocial.trim() !== '' &&
    companyCnpj.replace(/\D/g, '').length === 14 &&
    companyEmail.trim().includes('@') &&
    companyRua.trim() !== '' &&
    companyNumero.trim() !== '' &&
    companyCidade.trim() !== '' &&
    companyUf.trim().length === 2 &&
    adminNomeCompleto.trim() !== '' &&
    adminEmail.trim().includes('@') &&
    adminSenha.trim().length >= 6 &&
    adminSenha === adminConfirmarSenha;

  // Manter para compatibilidade legada se necessário
  const isSimplifiedStep1Valid = isRobustStep1Valid;

  // Validation Checks for Page 3 Payment Form
  const isPaymentValid = () => {
    if (paymentMethod === 'card') {
      return cardNum.trim().length >= 14 && cardName.trim().length > 3 && cardExpiry.trim().length >= 4 && cardCvv.trim().length >= 3;
    }
    if (paymentMethod === 'pix') {
      return pixChecked;
    }
    if (paymentMethod === 'boleto') {
      return boletoChecked;
    }
    return false;
  };

  // Click on a plan from Landing
  const handleSelectPlanLaunch = (planId: 'micro' | 'pequena' | 'media' | 'corporativo') => {
    setSelectedPlanId(planId);
    setMode('register');
    setRegisterStep(1); // Page 1 comes first anyway
  };

  // UUID Validation helper
  const isUuid = (str: string) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(str);
  };

  // Submit Sign In Form (unified custom check + backend postgres verification)
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginCompanyId.trim()) {
      setLoginError('ID da empresa é obrigatório.');
      return;
    }

    if (!isUuid(loginCompanyId.trim())) {
      setLoginError('O ID da empresa deve ser um UUID válido (ex: 88888888-4444-4444-4444-121212121212).');
      return;
    }

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
      await login(loginCompanyId.trim(), loginEmail.trim(), loginPass);
      setProcessingAuth(false);
      onLoginSuccess({
        companyId: loginCompanyId.trim(),
        email: loginEmail.trim()
      });
    } catch (err: any) {
      setProcessingAuth(false);
      setLoginError(err.message || 'Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  // Submit Sign Up & Checkout (Page 3 Final Validation to register)
  const handleCheckoutSubmit = async () => {
    setErrorMessage('');
    setProcessingAuth(true);
    setLoadingStepLabel('Criando empresa multi-tenant no PostgreSQL...');

    // Front-end Validations
    if (!companyRazaoSocial.trim()) {
      setErrorMessage('Razão social é obrigatória.');
      setProcessingAuth(false);
      return;
    }
    if (!companyCnpj.trim() || companyCnpj.replace(/\D/g, '').length !== 14) {
      setErrorMessage('CNPJ inválido. Digite 14 números.');
      setProcessingAuth(false);
      return;
    }
    if (!companyEmail.trim() || !companyEmail.includes('@')) {
      setErrorMessage('E-mail principal da empresa é obrigatório e deve ser válido.');
      setProcessingAuth(false);
      return;
    }
    if (!companyRua.trim() || !companyNumero.trim() || !companyCidade.trim() || companyUf.trim().length !== 2) {
      setErrorMessage('Preencha todo o endereço corretamente (UF com 2 letras).');
      setProcessingAuth(false);
      return;
    }
    if (!adminNomeCompleto.trim()) {
      setErrorMessage('Nome completo do administrador é obrigatório.');
      setProcessingAuth(false);
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

    try {
      await registerCompany({
        company: {
          razaoSocial: companyRazaoSocial.trim(),
          nomeFantasia: companyNomeFantasia.trim() || companyRazaoSocial.trim(),
          cnpj: companyCnpj.replace(/\D/g, ''),
          email: companyEmail.trim(),
          telefone: companyTelefone.trim() || undefined,
          endereco: {
            rua: companyRua.trim(),
            numero: companyNumero.trim(),
            cidade: companyCidade.trim(),
            uf: companyUf.trim().toUpperCase()
          },
          regimeTributario: companyRegimeTributario
        },
        admin: {
          nomeCompleto: adminNomeCompleto.trim(),
          email: adminEmail.trim(),
          senha: adminSenha,
          confirmarSenha: adminConfirmarSenha
        }
      });

      setLoadingStepLabel('Configurando módulos de faturamento e estoque...');
      setTimeout(() => {
        setLoadingStepLabel('Tabelas relacionais prontas. Iniciando sessão segura...');
        setTimeout(() => {
          setProcessingAuth(false);
          // O próprio AuthContext atualizará o estado para autenticado,
          // mas chamamos onLoginSuccess por segurança / compatibilidade.
          onLoginSuccess({
            cnpj: companyCnpj.replace(/\D/g, ''),
            corporateName: companyRazaoSocial.trim()
          });
        }, 650);
      }, 650);

    } catch (err: any) {
      setProcessingAuth(false);
      setErrorMessage(err.message || 'Erro ao realizar o cadastro. Por favor verifique.');
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
    } catch (err: any) {
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
    } catch (err: any) {
      setProcessingAuth(false);
      setResetError('Erro de conexão ao redefinir a senha.');
    }
  };

  // Helper template info for contracted design view
  const currentPlanObj = plans.find(p => p.id === selectedPlanId) || plans[2];

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
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setMode('landing'); setRegisterStep(1); }}>
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
            onClick={() => { setMode('register'); setRegisterStep(1); setShowPaymentForm(false); }}
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
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1.5">ID da Empresa (UUID)</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        required
                        value={loginCompanyId}
                        onChange={(e) => setLoginCompanyId(e.target.value)}
                        placeholder="Ex: 88888888-4444-4444-4444-121212121212"
                        className={`w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border focus:outline-hidden transition-all ${
                          theme === 'dark'
                            ? 'bg-[#18181c] border-slate-800 focus:border-red-500 text-white'
                            : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900'
                        }`}
                      />
                    </div>
                    {loginCompanyId && !isUuid(loginCompanyId) && (
                      <p className="text-[9px] text-[#f87171] font-semibold mt-1">
                        ⚠️ Formato UUID inválido. Digite um ID padrão.
                      </p>
                    )}
                  </div>

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
                      onClick={() => { setMode('register'); setRegisterStep(1); }} 
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

          {/* MODE 3: MULTI-STEP CADASTRO WIZARD */}
          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl"
            >
              {/* Wizard Status Bar */}
              <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
                <div className="flex flex-col items-center gap-1.5 relative w-1/3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    registerStep >= 1 
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-955'
                      : 'bg-slate-200 dark:bg-slate-805 text-gray-500'
                  }`}>
                    1
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider ${registerStep >= 1 ? 'text-rose-500' : 'text-gray-500'}`}>Dados</span>
                </div>
                
                <div className="w-10 h-0.5 bg-slate-350 dark:bg-slate-800 shrink-0"></div>

                <div className="flex flex-col items-center gap-1.5 relative w-1/3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    registerStep >= 2
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-955'
                      : 'bg-slate-200 dark:bg-slate-805 text-gray-500'
                  }`}>
                    2
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider ${registerStep >= 2 ? 'text-rose-500' : 'text-gray-500'}`}>Plano</span>
                </div>

                <div className="w-10 h-0.5 bg-slate-350 dark:bg-slate-800 shrink-0"></div>

                <div className="flex flex-col items-center gap-1.5 relative w-1/3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    registerStep >= 3
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-955'
                      : 'bg-slate-200 dark:bg-slate-805 text-gray-500'
                  }`}>
                    3
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider ${registerStep >= 3 ? 'text-rose-500' : 'text-gray-500'}`}>Pagamento</span>
                </div>
              </div>

              {/* Box Content Cards */}
              <div className={`p-8 rounded-3xl border shadow-2xl relative ${
                theme === 'dark' ? 'bg-[#0f0f13] border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {/* Visual Top Accent header bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-red-650"></div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight">
                      {registerStep === 1 && 'PÁGINA 1: DADOS CADASTRAIS'}
                      {registerStep === 2 && 'PÁGINA 2: ESCOLHER SEU PLANO'}
                      {registerStep === 3 && 'PÁGINA 3: CONFIRMAÇÃO & PAGAMENTO'}
                    </h2>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-extrabold tracking-wider">
                      {registerStep === 1 && 'Preencha suas informações cadastrais para emissão e conta'}
                      {registerStep === 2 && 'Selecione o limite corporativo recomendado para seu faturamento'}
                      {registerStep === 3 && 'Ative sua conta e libere o painel principal do ERP'}
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (registerStep > 1) {
                        setRegisterStep((step) => (step - 1) as any);
                      } else {
                        setMode('landing');
                      }
                    }}
                    className="p-1 px-3 rounded-lg border text-[10px] font-bold uppercase transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-100 cursor-pointer flex items-center gap-1"
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

                {/* STEP 1: DADOS CADASTRAIS (COMPLETO E SEGURO - MÓDULO 48.2-H) */}
                {registerStep === 1 && (
                  <div className="space-y-6">
                    {/* SEÇÃO 1: DADOS DA EMPRESA */}
                    <div>
                      <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                        1. Dados da Empresa
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Razão Social *</label>
                          <input 
                            type="text" 
                            required
                            value={companyRazaoSocial}
                            onChange={(e) => setCompanyRazaoSocial(e.target.value)}
                            placeholder="Ex: Minha Empresa Distribuidora Ltda"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Nome Fantasia (Opcional)</label>
                          <input 
                            type="text" 
                            value={companyNomeFantasia}
                            onChange={(e) => setCompanyNomeFantasia(e.target.value)}
                            placeholder="Ex: Yopoy Alimentos"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">CNPJ (14 dígitos) *</label>
                          <input 
                            type="text" 
                            required
                            maxLength={18}
                            value={companyCnpj}
                            onChange={(e) => {
                              // Simple CNPJ formatting suggestion
                              const raw = e.target.value.replace(/\D/g, '');
                              setCompanyCnpj(raw);
                            }}
                            placeholder="Apenas números (ex: 12345678000100)"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                          {companyCnpj && companyCnpj.replace(/\D/g, '').length !== 14 && (
                            <p className="text-[9px] text-red-400 font-semibold mt-1">⚠️ CNPJ deve conter exatamente 14 números.</p>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">E-mail Principal da Empresa *</label>
                          <input 
                            type="email" 
                            required
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            placeholder="Ex: financeiro@suaempresa.com"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Telefone de Contato</label>
                          <input 
                            type="text" 
                            value={companyTelefone}
                            onChange={(e) => setCompanyTelefone(e.target.value)}
                            placeholder="Ex: 11999999999"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Regime Tributário *</label>
                          <select
                            value={companyRegimeTributario}
                            onChange={(e) => setCompanyRegimeTributario(e.target.value)}
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          >
                            <option value="simples_nacional">Simples Nacional</option>
                            <option value="lucro_presumido">Lucro Presumido</option>
                            <option value="lucro_real">Lucro Real</option>
                          </select>
                        </div>
                      </div>

                      {/* ENDEREÇO */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Logradouro / Rua *</label>
                          <input 
                            type="text" 
                            required
                            value={companyRua}
                            onChange={(e) => setCompanyRua(e.target.value)}
                            placeholder="Ex: Avenida Paulista"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Número *</label>
                          <input 
                            type="text" 
                            required
                            value={companyNumero}
                            onChange={(e) => setCompanyNumero(e.target.value)}
                            placeholder="Ex: 1000"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">UF (Estado) *</label>
                          <input 
                            type="text" 
                            required
                            maxLength={2}
                            value={companyUf}
                            onChange={(e) => setCompanyUf(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                            placeholder="SP"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border text-center focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Cidade *</label>
                        <input 
                          type="text" 
                          required
                          value={companyCidade}
                          onChange={(e) => setCompanyCidade(e.target.value)}
                          placeholder="Ex: São Paulo"
                          className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                            theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* SEÇÃO 2: ADMINISTRADOR PRINCIPAL */}
                    <div>
                      <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                        2. Administrador Principal da Conta
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Nome Completo *</label>
                          <input 
                            type="text" 
                            required
                            value={adminNomeCompleto}
                            onChange={(e) => setAdminNomeCompleto(e.target.value)}
                            placeholder="Seu nome completo"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">E-mail Administrativo *</label>
                          <input 
                            type="email" 
                            required
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            placeholder="Ex: admin@seuemail.com"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Senha de Acesso *</label>
                          <input 
                            type="password" 
                            required
                            value={adminSenha}
                            onChange={(e) => setAdminSenha(e.target.value)}
                            placeholder="Mínimo de 6 caracteres"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                          {/* Visual Indicator of strength */}
                          {adminSenha && (
                            <div className="mt-2 space-y-1">
                              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-300 ${getPasswordStrength(adminSenha).color}`} />
                              </div>
                              <p className={`text-[10px] font-bold ${getPasswordStrength(adminSenha).textColor}`}>
                                {getPasswordStrength(adminSenha).text}
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-1">Confirmar Senha *</label>
                          <input 
                            type="password" 
                            required
                            value={adminConfirmarSenha}
                            onChange={(e) => setAdminConfirmarSenha(e.target.value)}
                            placeholder="Digite novamente a senha"
                            className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border focus:outline-hidden transition-all ${
                              theme === 'dark' ? 'bg-[#18181c] border-slate-800 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-rose-500'
                            }`}
                          />
                          {adminSenha && adminConfirmarSenha && adminSenha !== adminConfirmarSenha && (
                            <p className="text-[10px] text-red-400 font-bold mt-1">⚠️ As senhas não conferem.</p>
                          )}
                          {adminSenha && adminConfirmarSenha && adminSenha === adminConfirmarSenha && adminSenha.length >= 6 && (
                            <p className="text-[10px] text-emerald-400 font-bold mt-1">✓ Senhas idênticas.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* DYNAMIC PROGRESS BUTTON */}
                    {isRobustStep1Valid && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-4"
                      >
                        <button
                          type="button"
                          onClick={() => setRegisterStep(2)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-[#f8fafc] text-xs font-black uppercase py-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transform hover:scale-[1.01] transition-all animate-bounce"
                        >
                          Ir para o Passo 2: Escolha de Planos
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* STEP 2: ESCOLHER SEU PLANO */}
                {registerStep === 2 && (
                  <div className="space-y-6">
                    <p className="text-xs text-gray-400 font-semibold mb-4 text-center">
                      Clique em um dos três planos comerciais listados abaixo para selecioná-lo e prosseguir.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {plans.map((p) => {
                        const isSelected = selectedPlanId === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => setSelectedPlanId(p.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/20'
                                : 'bg-[#131318]/50 border-slate-900/60 hover:border-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] font-black ${
                                isSelected ? 'bg-rose-600 border-rose-550 text-white' : 'border-gray-500 text-transparent'
                              }`}>
                                <Check className="w-3 h-3" />
                              </span>
                              <div>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${p.color}`}>
                                  {p.name}
                                </span>
                                <h3 className="text-sm font-extrabold mt-1">{p.description}</h3>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-black font-mono leading-none">{p.price}</p>
                              <p className="text-[10px] text-gray-550 block mt-0.5">{p.period}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* DYNAMIC NEXT BUTTON */}
                    {selectedPlanId && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-4"
                      >
                        <button
                          type="button"
                          onClick={() => setRegisterStep(3)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-[#f8fafc] text-xs font-black uppercase py-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transform hover:scale-[1.01] transition-all"
                        >
                          Confirmar Plano Selecionado &amp; Avançar
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* STEP 3: PAGAMENTO E CONVENIÊNCIA */}
                {registerStep === 3 && (
                  <div className="space-y-6">
                    {/* Nota do que está contratando */}
                    <div className={`p-5 rounded-2xl border ${
                      theme === 'dark' ? 'bg-[#15151c]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-[#94a3b8] mb-2 block">Nota de Contratação</h4>
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <p className="font-extrabold text-sm uppercase text-rose-500">
                            {currentPlanObj.name}
                          </p>
                          <p className="text-gray-500 mt-0.5">{currentPlanObj.description}</p>
                        </div>
                        <div className="text-right bg-rose-550/10 border border-rose-500/20 p-2.5 rounded-xl">
                          <span className="text-lg font-mono font-black">{currentPlanObj.price}</span>
                          <span className="text-[10px] block font-semibold text-gray-500">{currentPlanObj.period}</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-800/80 mt-4 pt-3 text-[11px] space-y-1 text-gray-400">
                        <p>🔹 <b>Ciclo:</b> Cobrança Mensal no cartão ou PIX</p>
                        <p>🔹 <b>Benefícios:</b> Licença de teste imediata grátis sem carência</p>
                      </div>
                    </div>

                    {/* CONFIRMAÇÃO DE COMPRA BUTTON */}
                    {!showPaymentForm ? (
                      <button
                        type="button"
                        onClick={() => setShowPaymentForm(true)}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase py-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transform hover:scale-[1.01] transition-all"
                      >
                        Confirmar Compra
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      /* APÓS CLICADO EM CONFIRMAR COMPRA, APARECE A FORMA DE PAGAMENTO ABAIXO */
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-6 border-t border-slate-800/80 pt-6"
                      >
                        <div>
                          <h3 className="text-xs uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-emerald-500 animate-bounce" />
                            Preencha as Informações de Pagamento
                          </h3>

                          {/* PAYMENT TABS SELECTOR */}
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('card')}
                              className={`py-2.5 px-3 rounded-lg border text-[10px] font-extrabold uppercase transition-all flex items-center justify-center gap-1 ${
                                paymentMethod === 'card'
                                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 font-black'
                                  : 'border-slate-800 hover:border-slate-700 text-gray-450'
                              }`}
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              Cartão
                            </button>

                            <button
                              type="button"
                              onClick={() => setPaymentMethod('pix')}
                              className={`py-2.5 px-3 rounded-lg border text-[10px] font-extrabold uppercase transition-all flex items-center justify-center gap-1 ${
                                paymentMethod === 'pix'
                                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 font-black'
                                  : 'border-slate-800 hover:border-slate-700 text-gray-450'
                              }`}
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              Pix
                            </button>

                            <button
                              type="button"
                              onClick={() => setPaymentMethod('boleto')}
                              className={`py-2.5 px-3 rounded-lg border text-[10px] font-extrabold uppercase transition-all flex items-center justify-center gap-1 ${
                                paymentMethod === 'boleto'
                                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 font-black'
                                  : 'border-slate-800 hover:border-slate-700 text-gray-450'
                              }`}
                            >
                              <Barcode className="w-3.5 h-3.5" />
                              Boleto
                            </button>
                          </div>

                          {/* PAYMENT METHOD DETAILED CONTENT */}
                          <div className="space-y-4">
                            
                            {/* PAYMENT OPTION A: CREDIT CARD */}
                            {paymentMethod === 'card' && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="sm:col-span-2">
                                  <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Número do Cartão de Crédito</label>
                                  <input 
                                    type="text" 
                                    required
                                    maxLength={19}
                                    value={cardNum}
                                    onChange={(e) => setCardNum(e.target.value)}
                                    placeholder="4444 4444 4444 4444"
                                    className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-hidden transition-all ${
                                      theme === 'dark' ? 'bg-[#18181c] border-slate-800' : 'bg-slate-50 border-slate-200'
                                    }`}
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Nome Impresso no Cartão</label>
                                  <input 
                                    type="text" 
                                    required
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="JOÃO S SILVA"
                                    className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-hidden transition-all ${
                                      theme === 'dark' ? 'bg-[#18181c] border-slate-800' : 'bg-slate-50 border-slate-200'
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Data de Validade (MM/AA)</label>
                                  <input 
                                    type="text" 
                                    required
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    placeholder="12/29"
                                    className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-hidden transition-all ${
                                      theme === 'dark' ? 'bg-[#18181c] border-slate-800' : 'bg-slate-50 border-slate-200'
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Código CVV</label>
                                  <input 
                                    type="text" 
                                    required
                                    maxLength={4}
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value)}
                                    placeholder="123"
                                    className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-hidden transition-all ${
                                      theme === 'dark' ? 'bg-[#18181c] border-slate-800' : 'bg-slate-50 border-slate-200'
                                    }`}
                                  />
                                </div>
                              </div>
                            )}

                            {/* PAYMENT OPTION B: PIX WITH QR CODE */}
                            {paymentMethod === 'pix' && (
                              <div className="flex flex-col items-center gap-3 p-4 bg-emerald-950/10 border border-emerald-900/25 rounded-2xl">
                                <QrCode className="w-24 h-24 text-emerald-400 p-2 border border-emerald-500/25 rounded-xl bg-[#0e1610]" />
                                <div className="text-center">
                                  <p className="text-xs font-bold text-emerald-400 uppercase">PIX GERADO COM SUCESSO</p>
                                  <p className="text-[10px] text-gray-400 mt-1 max-w-[280px]">Copie a chave aleatória abaixo ou leia o QR Code no seu aplicativo do banco.</p>
                                </div>
                                <code className="block text-[9px] bg-slate-900/60 p-2 py-1.5 rounded border border-slate-800 font-mono text-center select-all w-full truncate text-slate-300">
                                  00020126580014br.gov.bcb.pix0136elparrar_erp_mock_uuid_3929424_pay
                                </code>
                                <div className="flex items-center gap-2 mt-2">
                                  <input
                                    type="checkbox"
                                    id="pix-check"
                                    checked={pixChecked}
                                    onChange={(e) => setPixChecked(e.target.checked)}
                                    className="w-4 h-4 border border-rose-500 rounded text-rose-500 focus:ring-0 cursor-pointer"
                                  />
                                  <label htmlFor="pix-check" className="text-[10px] font-black uppercase text-gray-300 select-none cursor-pointer">
                                    Simulei o pagamento do Pix pelo app bancário
                                  </label>
                                </div>
                              </div>
                            )}

                            {/* PAYMENT OPTION C: BOLETO */}
                            {paymentMethod === 'boleto' && (
                              <div className="flex flex-col items-center gap-3 p-4 bg-slate-950/20 border border-slate-900 rounded-2xl">
                                <Barcode className="w-24 h-12 text-gray-300 p-1 bg-white rounded" />
                                <div className="text-center">
                                  <p className="text-xs font-bold text-gray-300 uppercase">BOLETO BANCÁRIO DIGITAL</p>
                                  <p className="text-[10px] text-gray-500 mt-1 max-w-[280px]">Utilize a numeração copiada abaixo para registrar a quitação no internet banking.</p>
                                </div>
                                <code className="block text-[9px] bg-slate-900 p-2 py-1.5 rounded border border-slate-800 font-mono text-center select-all w-full text-slate-305">
                                  34191.79001 01043.513184 91020.150008 7 98250000029990
                                </code>
                                <div className="flex items-center gap-2 mt-2">
                                  <input
                                    type="checkbox"
                                    id="boleto-check"
                                    checked={boletoChecked}
                                    onChange={(e) => setBoletoChecked(e.target.checked)}
                                    className="w-4 h-4 border border-rose-500 rounded text-rose-505 focus:ring-0 cursor-pointer"
                                  />
                                  <label htmlFor="boleto-check" className="text-[10px] font-black uppercase text-gray-300 select-none cursor-pointer">
                                    Simulei a quitação do boleto no banco
                                  </label>
                                </div>
                              </div>
                            )}

                          </div>

                          {/* FINAL SUBMISSION ACCORDING TO BANK CONFER CHECK */}
                          <div className="pt-6">
                            <button
                              type="button"
                              onClick={handleCheckoutSubmit}
                              disabled={processingAuth}
                              className={`w-full text-xs font-black uppercase py-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md group ${
                                isPaymentValid()
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                                  : 'bg-slate-300/20 text-gray-500 cursor-not-allowed border border-slate-850'
                              }`}
                            >
                              {processingAuth ? (
                                <span className="flex items-center gap-2">
                                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                  {loadingStepLabel}
                                </span>
                              ) : signupSuccess ? (
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                                  CONFIRMADO! REDIRECIONANDO PARA O ERP...
                                </span>
                              ) : (
                                <>
                                  Concluir Pagamento &amp; Licenciar ERP
                                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
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
            <span className="cursor-pointer hover:text-amber-500" onClick={() => { setMode('register'); setRegisterStep(1); }}>Cadastro Rápido</span>
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
