import React, { useState, useEffect } from 'react';
import PermissionGate from '../frontend/auth/PermissionGate';
import { MODULE_PERMISSIONS } from '../frontend/auth/modulePermissions';
import AccessDenied from '../frontend/auth/AccessDenied';
import { 
  Building, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Trash2, 
  Plus, 
  Percent, 
  Scale, 
  Truck, 
  DollarSign, 
  FileText,
  KeyRound,
  ShieldAlert,
  Sliders,
  Users,
  Database,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  Clock,
  Activity,
  Globe
} from 'lucide-react';
import { authFetch } from '../frontend/auth/authFetch';

interface Partner {
  id: string;
  name: string;
  role: string;
  equity: number;
  capital: number;
}

interface SettingsToolProps {
  theme: 'light' | 'dark';
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  selectedPlan?: 'micro' | 'pequena' | 'media' | 'corporativo';
  currentUser?: any;
}

export default function SettingsTool({ 
  theme, 
  isExpanded, 
  onToggleExpand,
  selectedPlan = 'media',
  currentUser
}: SettingsToolProps) {
  // 1. Dados da Empresa
  const [corporateName, setCorporateName] = useState(() => localStorage.getItem('cfg_corporate_name') || 'EMPRESA FICTÍCIA LOCAL LTDA');
  const [tradeName, setTradeName] = useState(() => localStorage.getItem('cfg_trade_name') || 'Empresa Fictícia Local');
  const [cnpj, setCnpj] = useState(() => localStorage.getItem('cfg_cnpj') || '00.000.000/0000-00');
  const [ie, setIe] = useState(() => localStorage.getItem('cfg_ie') || 'IE FICTÍCIA LOCAL');
  const [im, setIm] = useState(() => localStorage.getItem('cfg_im') || 'IM FICTÍCIA LOCAL');
  const [cnae, setCnae] = useState(() => localStorage.getItem('cfg_cnae') || 'CNAE fictício/local demonstrativo');
  const [email, setEmail] = useState(() => localStorage.getItem('cfg_email') || 'contato@empresa-ficticia.local');
  const [phone, setPhone] = useState(() => localStorage.getItem('cfg_phone') || '(00) 0000-0000');

  // Endereço
  const [street, setStreet] = useState(() => localStorage.getItem('cfg_street') || 'Logradouro Fictício Local');
  const [number, setNumber] = useState(() => localStorage.getItem('cfg_number') || '000');
  const [neighborhood, setNeighborhood] = useState(() => localStorage.getItem('cfg_neighborhood') || 'Bairro Fictício');
  const [city, setCity] = useState(() => localStorage.getItem('cfg_city') || 'Cidade Fictícia');
  const [stateUf, setStateUf] = useState(() => localStorage.getItem('cfg_state_uf') || 'UF');
  const [cep, setCep] = useState(() => localStorage.getItem('cfg_cep') || '00000-000');

  // 2. Regime Tributário & Alíquotas
  const [taxRegime, setTaxRegime] = useState(() => localStorage.getItem('cfg_tax_regime') || 'Simples Nacional');
  const [taxRate, setTaxRate] = useState(() => Number(localStorage.getItem('cfg_tax_rate')) || 4.5);
  const [businessActivity, setBusinessActivity] = useState(() => localStorage.getItem('cfg_business_activity') || 'Comércio');

  // 3. Emissor & Certificado
  const [certificateType, setCertificateType] = useState(() => localStorage.getItem('cfg_cert_type') || 'A1');
  const [certSubject, setCertSubject] = useState(() => localStorage.getItem('cfg_cert_subject') || 'Referência fictícia local - CNPJ: 00.000.000/0000-00');
  const [certValidUntil, setCertValidUntil] = useState(() => localStorage.getItem('cfg_cert_valid') || '2027-05-18');
  const [sefazEnvironment, setSefazEnvironment] = useState(() => localStorage.getItem('cfg_sefaz_env') || 'Homologação');
  const [nextNfeNum, setNextNfeNum] = useState(() => Number(localStorage.getItem('cfg_next_nfe')) || 1024);

  // 4. Parâmetros Industriais / Logísticos
  const [expiringWarningDays, setExpiringWarningDays] = useState(() => Number(localStorage.getItem('cfg_exp_days')) || 7);
  const [minStockLimit, setMinStockLimit] = useState(() => Number(localStorage.getItem('cfg_min_stock')) || 10);

  // 5. quadro de Sócios (Partners)
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('cfg_partners');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: '1', name: 'Sócio Fictício 1', role: 'Sócio-Administrador', equity: 50, capital: 1000 },
      { id: '2', name: 'Sócia Fictícia 2', role: 'Sócio Investidor', equity: 25, capital: 500 },
      { id: '3', name: 'Sócia Fictícia 3', role: 'Sócio Operacional', equity: 25, capital: 500 }
    ];
  });

  // Partner edit placeholders
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerRole, setNewPartnerRole] = useState('Sócio-Administrador');
  const [newPartnerEquity, setNewPartnerEquity] = useState(25);
  const [newPartnerCapital, setNewPartnerCapital] = useState(500);

  // Success alert
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'cadastro' | 'fiscal' | 'certificado' | 'regra' | 'societario' | 'backup' | 'reset' | 'usuarios'>('cadastro');
  const [partnerError, setPartnerError] = useState<string | null>(null);

  // Estados para Gestão de Usuários (Funcionários)
  const [subUsers, setSubUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('biz_sub_users');
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

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserAllowedTabs, setNewUserAllowedTabs] = useState<string[]>(['dashboard', 'invoice']);
  const [userAdminError, setUserAdminError] = useState<string | null>(null);
  const [userAdminSuccess, setUserAdminSuccess] = useState<string | null>(null);

  const parentEmail = currentUser?.email || currentUser?.pjEmail || localStorage.getItem('cfg_email') || 'contato@empresa-ficticia.local';

  // Estados de Backup & Restauração
  const [backupError, setBackupError] = useState<string | null>(null);
  const [backupSuccess, setBackupSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Estados de preparação futura de certificados digitais
  const [certificatesList, setCertificatesList] = useState<any[]>(() => {
    const saved = localStorage.getItem('biz_certificates');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'cert-1',
        alias: 'Preparação futura - Matriz',
        companyName: 'EMPRESA FICTÍCIA LOCAL LTDA',
        cnpj: '00.000.000/0000-00',
        type: 'A1',
        fileName: 'referencia_ficticia_local_sem_certificado_real.txt',
        password: 'valor_ficticio_local_sem_uso_real',
        issuer: 'Autoridade Fictícia Local sem uso real',
        subject: 'EMPRESA FICTICIA LOCAL:00000000000000',
        validFrom: '2025-06-01',
        validUntil: '2027-06-01',
        scopes: ['Pré-nota interna', 'Pacote do contador', 'Dados internos', 'Preparação futura'],
        status: 'Somente cadastro'
      },
      {
        id: 'cert-2',
        alias: 'Referência futura Filial RJ',
        companyName: 'Empresa Fictícia de Apoio Local',
        cnpj: '00.000.000/0000-00',
        type: 'A1',
        fileName: 'mock_local_sem_certificado_real.txt',
        password: 'referencia_ficticia_sem_uso_operacional',
        issuer: 'Autoridade Fictícia Local sem uso real',
        subject: 'EMPRESA FICTICIA DE APOIO LOCAL:00000000000000',
        validFrom: '2024-03-10',
        validUntil: '2025-03-10',
        scopes: ['Dados internos', 'Preparação futura'],
        status: 'Somente cadastro'
      }
    ];
  });

  const [isAddingCert, setIsAddingCert] = useState(false);
  const [certAlias, setCertAlias] = useState('');
  const [certCompanyName, setCertCompanyName] = useState('EMPRESA FICTÍCIA LOCAL LTDA');
  const [certCnpjForm, setCertCnpjForm] = useState('00.000.000/0000-00');
  const [certTypeForm, setCertTypeForm] = useState<'A1' | 'A3'>('A1');
  const [certPasswordForm, setCertPasswordForm] = useState('');
  const [certValidForm, setCertValidForm] = useState('2027-06-03');
  const [certScopesForm, setCertScopesForm] = useState<string[]>(['Pré-nota interna', 'Pacote do contador', 'Dados internos']);
  const [certFileName, setCertFileName] = useState('');
  const [certTestingId, setCertTestingId] = useState<string | null>(null);
  const [certTestLogs, setCertTestLogs] = useState<string[]>([]);
  const [certAuditLogs, setCertAuditLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('biz_cert_audits');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: '1', date: '2026-06-03 10:14:02', action: 'Cadastro de referência', detail: 'Arquivo de referência registrado para preparação futura. Sem transmissão fiscal no MVP.', user: 'admin@empresa-ficticia.local' },
      { id: '2', date: '2026-06-03 10:15:20', action: 'Conferir dados internos', detail: 'Dados internos conferidos para preparação local do contador.', user: 'admin@empresa-ficticia.local' },
      { id: '3', date: '2026-06-03 10:16:11', action: 'Marcar como preparação futura', detail: 'Recurso fiscal real não disponível no MVP.', user: 'sistema' }
    ];
  });

  const [certSuccessMessage, setCertSuccessMessage] = useState<string | null>(null);
  const [certErrorMessage, setCertErrorMessage] = useState<string | null>(null);

  const handleExportBackup = () => {
    try {
      const data: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          data[key] = localStorage.getItem(key) || '';
        }
      }
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `backup-auxiliar-biz-${dateStr}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setBackupSuccess("Backup exportado com sucesso! Salve o arquivo .json em um local seguro.");
      setBackupError(null);
      setTimeout(() => setBackupSuccess(null), 6000);
    } catch (err: any) {
      setBackupError("Falha ao exportar backup de dados.");
      setBackupSuccess(null);
    }
  };

  const handleImportBackup = (file: File) => {
    if (!file.name.endsWith('.json')) {
      setBackupError("Formato de arquivo inválido. Por favor, envie um arquivo .json de backup.");
      setBackupSuccess(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const parsed = JSON.parse(result);
        
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error('O arquivo enviado não contém um formato de objeto JSON válido.');
        }

        // Validate that there is some data inside
        const keys = Object.keys(parsed);
        if (keys.length === 0) {
          throw new Error('O arquivo de backup está vazio.');
        }

        // Clean-up present keys inside localStorage or fully reset before restoring
        localStorage.clear();
        
        // Restore each key
        Object.entries(parsed).forEach(([key, val]) => {
          if (typeof val === 'string') {
            localStorage.setItem(key, val);
          } else {
            localStorage.setItem(key, JSON.stringify(val));
          }
        });

        setBackupError(null);
        setBackupSuccess("Backup importado com sucesso! O sistema atualizará os dados e recarregará a página em instantes...");
        
        // Dispatch storage event so overall app catches it
        window.dispatchEvent(new Event('storage'));
        
        // Reload page to apply changes gracefully
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      } catch (err: any) {
        setBackupError(err.message || 'Erro ao processar o arquivo de backup.');
        setBackupSuccess(null);
      }
    };
    reader.onerror = () => {
      setBackupError("Falha na leitura física do arquivo de backup.");
      setBackupSuccess(null);
    };
    reader.readAsText(file);
  };

  // Estados do Reset do Sistema (Integrado para Iframe Sandbox)
  const [resetConfirmState, setResetConfirmState] = useState<'idle' | 'warning' | 'success'>('idle');
  const [resetCountdown, setResetCountdown] = useState(3);

  useEffect(() => {
    if (resetConfirmState === 'success') {
      const interval = setInterval(() => {
        setResetCountdown(c => {
          if (c <= 1) {
            clearInterval(interval);
            localStorage.clear();
            window.location.reload();
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resetConfirmState]);

  // Procedimento de reinicialização total
  const handleSystemResetStep1 = () => {
    setResetConfirmState('warning');
  };

  const handleSystemResetStep2Execute = () => {
    setResetConfirmState('success');
  };

  const handleCancelReset = () => {
    setResetConfirmState('idle');
  };

  // Funções para controle avançado de Certificados Digitais
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certAlias || !certCompanyName || !certCnpjForm || (certTypeForm === 'A1' && !certFileName)) {
      setCertErrorMessage('Por favor, preencha todos os campos obrigatórios do cadastro de preparação futura.');
      return;
    }

    const newId = `cert-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newCert = {
      id: newId,
      alias: certAlias,
      companyName: certCompanyName,
      cnpj: certCnpjForm,
      type: certTypeForm,
      fileName: certFileName || 'referencia_ficticia_local_sem_certificado_real.txt',
      password: certPasswordForm,
      issuer: 'Autoridade Fictícia Local sem uso real',
      subject: `${certCompanyName.toUpperCase()}:${certCnpjForm.replace(/\D/g, '')}`,
      validFrom: today,
      validUntil: certValidForm,
      scopes: certScopesForm,
      status: new Date(certValidForm) > new Date() ? 'Ativo' : 'Expirado'
    };

    const updatedList = [...certificatesList, newCert];
    setCertificatesList(updatedList);
    localStorage.setItem('biz_certificates', JSON.stringify(updatedList));

    // Audit Log
    const newAuditLog = {
      id: `${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Cadastro de referência',
      detail: `Arquivo ${newCert.fileName} registrado para "${newCert.alias}" (${newCert.cnpj}). Sem transmissão fiscal no MVP.`,
      user: parentEmail
    };
    const updatedAudits = [newAuditLog, ...certAuditLogs];
    setCertAuditLogs(updatedAudits);
    localStorage.setItem('biz_cert_audits', JSON.stringify(updatedAudits));

    // Reset Form
    setCertAlias('');
    setCertPasswordForm('');
    setCertFileName('');
    setIsAddingCert(false);
    setCertSuccessMessage('Cadastro de preparação futura salvo. Emissão real não disponível no MVP.');
    setCertErrorMessage(null);
    setTimeout(() => setCertSuccessMessage(null), 4000);
  };

  const handleDeleteCertificate = (certId: string) => {
    const cert = certificatesList.find(c => c.id === certId);
    if (!cert) return;

    const updatedList = certificatesList.filter(c => c.id !== certId);
    setCertificatesList(updatedList);
    localStorage.setItem('biz_certificates', JSON.stringify(updatedList));

    // Audit Log
    const newAuditLog = {
      id: `${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Remoção de cadastro futuro',
      detail: `Cadastro "${cert.alias}" removido do painel de preparação futura.`,
      user: parentEmail
    };
    const updatedAudits = [newAuditLog, ...certAuditLogs];
    setCertAuditLogs(updatedAudits);
    localStorage.setItem('biz_cert_audits', JSON.stringify(updatedAudits));
    
    setCertSuccessMessage('Cadastro de preparação futura removido.');
    setTimeout(() => setCertSuccessMessage(null), 4500);
  };

  const handleTestCertificate = (certId: string) => {
    const cert = certificatesList.find(c => c.id === certId);
    if (!cert) return;

    setCertTestingId(certId);
    setCertTestLogs([`[${new Date().toLocaleTimeString()}] Conferindo cadastro interno. Sem transmissão fiscal no MVP.`]);

    setTimeout(() => {
      setCertTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Lendo referência de arquivo "${cert.fileName}" para preparação futura...`]);
    }, 450);

    setTimeout(() => {
      setCertTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Conferindo metadados internos. Nenhum envelope externo é enviado.`]);
    }, 900);

    setTimeout(() => {
      setCertTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Preparando checklist para contador. Recurso fiscal real bloqueado.`]);
    }, 1350);

    setTimeout(() => {
      const isExpired = new Date(cert.validUntil) < new Date();
      if (isExpired) {
        setCertTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Atenção: referência vencida em ${cert.validUntil}. Atualize antes de uma preparação futura.`]);
      } else {
        setCertTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Conferência interna concluída. Sem transmissão fiscal e sem valor fiscal.`]);
        
        // Save test audit
        const newAuditLog = {
          id: `${Date.now()}`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19),
          action: 'Conferir preparação futura',
          detail: `Conferidos dados internos de "${cert.alias}". Emissão real não disponível no MVP.`,
          user: parentEmail
        };
        const updatedAudits = [newAuditLog, ...certAuditLogs];
        setCertAuditLogs(updatedAudits);
        localStorage.setItem('biz_cert_audits', JSON.stringify(updatedAudits));
      }
    }, 1800);
  };

  // Persistir Dados Base ao alterar
  const handleSaveSettings = () => {
    localStorage.setItem('cfg_corporate_name', corporateName);
    localStorage.setItem('cfg_trade_name', tradeName);
    localStorage.setItem('cfg_cnpj', cnpj);
    localStorage.setItem('cfg_ie', ie);
    localStorage.setItem('cfg_im', im);
    localStorage.setItem('cfg_cnae', cnae);
    localStorage.setItem('cfg_email', email);
    localStorage.setItem('cfg_phone', phone);

    localStorage.setItem('cfg_street', street);
    localStorage.setItem('cfg_number', number);
    localStorage.setItem('cfg_neighborhood', neighborhood);
    localStorage.setItem('cfg_city', city);
    localStorage.setItem('cfg_state_uf', stateUf);
    localStorage.setItem('cfg_cep', cep);

    localStorage.setItem('cfg_tax_regime', taxRegime);
    localStorage.setItem('cfg_tax_rate', taxRate.toString());
    localStorage.setItem('cfg_business_activity', businessActivity);

    localStorage.setItem('cfg_cert_type', certificateType);
    localStorage.setItem('cfg_cert_subject', certSubject);
    localStorage.setItem('cfg_cert_valid', certValidUntil);
    localStorage.setItem('cfg_sefaz_env', sefazEnvironment);
    localStorage.setItem('cfg_next_nfe', nextNfeNum.toString());

    localStorage.setItem('cfg_exp_days', expiringWarningDays.toString());
    localStorage.setItem('cfg_min_stock', minStockLimit.toString());

    localStorage.setItem('cfg_partners', JSON.stringify(partners));

    // Salvar no Postgres remoto de forma multi-tenant segura se logado
    authFetch('/api/auth/company-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          corporate_name: corporateName,
          trade_name: tradeName,
          cnpj: cnpj,
          ie: ie,
          im: im,
          address_street: street,
          address_number: number,
          address_neighborhood: neighborhood,
          city: city,
          state_uf: stateUf,
          cep: cep,
          phone: phone,
          tax_regime: taxRegime,
          tax_rate: Number(taxRate),
          digital_certificate: certificateType,
          cert_valid_until: certValidUntil,
          sefaz_env: sefazEnvironment,
          next_nfe: Number(nextNfeNum)
        })
      })
      .then(res => {
        if (!res.ok) {
          console.warn("Retorno inesperado ao atualizar parâmetros no PostgreSQL.");
        }
      })
      .catch(err => {
        console.error("Falha ao salvar especificações corporativas no backend:", err);
      });

    // Despachar evento para notificar o resto do sistema
    window.dispatchEvent(new Event('storage'));

    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 4000);
  };

  const handleAddPartner = () => {
    if (!newPartnerName) {
      setPartnerError("Por favor, preencha o nome do sócio ou acionista!");
      setTimeout(() => setPartnerError(null), 5000);
      return;
    }

    const currentEquitySum = partners.reduce((sum, p) => sum + p.equity, 0);
    if (currentEquitySum + newPartnerEquity > 100) {
      setPartnerError(`Erro: A participação total dos sócios não pode exceder 100%. Restam apenas ${100 - currentEquitySum}% disponíveis.`);
      setTimeout(() => setPartnerError(null), 5000);
      return;
    }

    setPartnerError(null);
    const nextPartner: Partner = {
      id: `partner-${Date.now()}`,
      name: newPartnerName,
      role: newPartnerRole,
      equity: Number(newPartnerEquity),
      capital: Number(newPartnerCapital)
    };

    setPartners(prev => [...prev, nextPartner]);
    setNewPartnerName('');
    setNewPartnerEquity(25);
    setNewPartnerCapital(500);
  };

  const handleRemovePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const totalCapitalInjected = partners.reduce((sum, p) => sum + p.capital, 0);
  const totalEquityCalculated = partners.reduce((sum, p) => sum + p.equity, 0);

  return (
    <div className="space-y-6">
      
      {/* HEADER E TÍTULO */}
      <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
        theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Módulo Administrativo
          </span>
          <h2 className={`text-base font-extrabold tracking-tight mt-1 ${theme === 'dark' ? 'text-gray-150' : 'text-slate-900'}`}>
            Registro Central da Empresa & Definições Gerais
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure dados fiscais da sua empresa, regime de tributação simplificada, alertas industriais de estoque de segurança e quadro de sócios.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              title={isExpanded ? "Recolher Tela Cheia" : "Maximizar para Tela Cheia"}
              className={`border py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                theme === 'dark' 
                  ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/25 hover:bg-indigo-650/20' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-150 hover:bg-indigo-100'
              }`}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isExpanded ? "Recolher Foco" : "Expandir Tela"}</span>
            </button>
          )}

          <button
            onClick={handleSaveSettings}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
          >
            <CheckCircle className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {showSavedToast && (
        <div className="p-4 bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-xl animate-fade-in">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Configurações armazenadas e sincronizadas com sucesso nos módulos core!</span>
        </div>
      )}

      {/* NAVEGAÇÃO INTERNA ENTRE SEÇÕES */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200/10 pb-2">
        <button
          onClick={() => setActiveSubTab('cadastro')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'cadastro'
              ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
              : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          Cadastro / CNPJ
        </button>

        <button
          onClick={() => setActiveSubTab('fiscal')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'fiscal'
              ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
              : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          Referência fiscal local
        </button>

        <button
          onClick={() => setActiveSubTab('certificado')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'certificado'
              ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
              : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          Referência fiscal futura
        </button>

        <button
          onClick={() => setActiveSubTab('regra')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'regra'
              ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
              : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Parâmetros do Sistema
        </button>

        <button
          onClick={() => setActiveSubTab('societario')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'societario'
              ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
              : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Quadro de Sócios (QSA)
        </button>

        {!currentUser?.isSubUser && (
          <button
            onClick={() => setActiveSubTab('usuarios')}
            className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'usuarios'
                ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
                : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Usuários locais {selectedPlan === 'micro' && '🔒'}
          </button>
        )}

        <button
          onClick={() => setActiveSubTab('backup')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'backup'
              ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-500/20'
              : theme === 'dark' ? 'text-slate-400 hover:bg-[#1e1e24]' : 'text-slate-650 hover:bg-slate-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          Backup local e restauração
        </button>

        <button
          onClick={() => setActiveSubTab('reset')}
          className={`py-2 px-4 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ml-auto border ${
            activeSubTab === 'reset'
              ? 'bg-rose-500/15 text-rose-500 border-rose-500/30'
              : theme === 'dark' 
                ? 'text-rose-450 hover:bg-rose-950/15 border-rose-500/10' 
                : 'text-red-650 hover:bg-red-50 border-red-200'
          }`}
          title="Resetar todos os dados e configurações para o padrão inicial"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-reverse" />
          Resetar Dados (Primeiro Acesso)
        </button>
      </div>

      {/* ÁREA DE CONTEÚDO DA SUB-ABA */}
      <div className={`border p-6 rounded-2xl shadow-xs transition-colors ${
        theme === 'dark' ? 'bg-[#111114] border-[#222228]' : 'bg-white border-slate-200'
      }`}>
        
        {/* SUBTAB 1: CADASTRO COMERCIAL */}
        {activeSubTab === 'cadastro' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/10">
              <Building className="w-4.5 h-4.5 text-indigo-500" />
              <div>
                <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  Dados da Matriz e Registros Comerciais
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Use dados fictícios ou internos de teste no MVP local. Não use dados reais de empresa nesta simulação local.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Razão Social</label>
                <input
                  type="text"
                  value={corporateName}
                  onChange={(e) => setCorporateName(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Nome Fantasia</label>
                <input
                  type="text"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">CNPJ (Matriz)</label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Inscrição Estadual (IE)</label>
                <input
                  type="text"
                  value={ie}
                  onChange={(e) => setIe(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Inscrição Municipal (IM)</label>
                <input
                  type="text"
                  value={im}
                  onChange={(e) => setIm(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Código CNAE Principal</label>
                <input
                  type="text"
                  value={cnae}
                  onChange={(e) => setCnae(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Email Corporativo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Telefone de Contato</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 pb-3 border-b border-slate-200/10">
              <MapPin className="w-4.5 h-4.5 text-indigo-500" />
              <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Endereço Fiscal de Enlace / Sede
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Logradouro / Rua / Alameda</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Número / Quadra</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="md:col-span-4 space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Bairro</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="md:col-span-5 space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Cidade de registro</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Estado / UF</label>
                <input
                  type="text"
                  value={stateUf}
                  onChange={(e) => setStateUf(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>

              <div className="md:col-span-4 space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">CEP Postal</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: REGIME FISCAL */}
        {activeSubTab === 'fiscal' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/10">
              <Scale className="w-4.5 h-4.5 text-indigo-500" />
              <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Regime Tributário do Negócio e Atividade Comercial
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Regime de Apuração Contábil</label>
                <select
                  value={taxRegime}
                  onChange={(e) => setTaxRegime(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                >
                  <option value="Simples Nacional">Simples Nacional (Regime Consolidado DAS)</option>
                  <option value="Lucro Presumido">Lucro Presumido (Alíquotas IRPJ / CSLL fixadas)</option>
                  <option value="Lucro Real">Lucro Real (Apuração com base na DRE Auditoria)</option>
                </select>
                <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                  Define apenas um cadastro de referência para preparação futura. Não há transmissão fiscal no MVP.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Alíquota Efetiva Incidentária (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-10 font-mono font-bold ${
                      theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Percent className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                  Taxa simplificada para demonstrativo interno e preparação futura.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Segmento da Atividade Econômica</label>
                <select
                  value={businessActivity}
                  onChange={(e) => setBusinessActivity(e.target.value)}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                >
                  <option value="Comércio">Comércio de Bens (pré-nota interna)</option>
                  <option value="Serviços">Prestação de Serviços (dados internos para contador)</option>
                  <option value="Indústria">Atividade Industrial (organização visual de produtos)</option>
                </select>
                <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                  Configura o enquadramento de anexo específico para geração automática de relatórios.
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex gap-3 text-[11px] items-start ${
              theme === 'dark' ? 'bg-[#18181c] border-indigo-500/10' : 'bg-indigo-50/50 border-indigo-100'
            }`}>
              <AlertTriangle className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-xs text-indigo-500">Organização tributária interna:</p>
                <p className="text-[10px] text-gray-550 leading-relaxed">
                  Ao salvar, essas alíquotas servem apenas para demonstrativos internos, conciliação possível e preparação para contador. Não há transmissão fiscal, emissão real ou documento com valor fiscal no MVP.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: PREPARAÇÃO FUTURA */}
        {activeSubTab === 'certificado' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header com título */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/10">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-indigo-500" />
                <div>
                  <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    Preparação futura de dados fiscais
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Cadastro demonstrativo para checklist local, não operacional no MVP, sem emissão real, XML fiscal ou transmissão fiscal.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingCert(!isAddingCert)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all cursor-pointer shadow-sm shadow-indigo-600/20"
              >
                <Plus className="w-4 h-4" />
                {isAddingCert ? 'Voltar para Lista' : 'Novo Cadastro Futuro'}
              </button>
            </div>

            {/* Toasts / Feedback */}
            {certSuccessMessage && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{certSuccessMessage}</span>
              </div>
            )}
            {certErrorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-lg text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{certErrorMessage}</span>
              </div>
            )}

            {!isAddingCert ? (
              <>
                {/* Painel de Monitoramento (KPIs) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-slate-800' : 'bg-slate-50 border-slate-200'} transition-all`}>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Cadastros futuros</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        {certificatesList.length}
                      </span>
                      <span className="text-[10px] text-gray-400">Somente internos</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-slate-800' : 'bg-slate-50 border-slate-200'} transition-all`}>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Referências válidas</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-emerald-500">
                        {certificatesList.filter(c => new Date(c.validUntil) > new Date()).length}
                      </span>
                      <span className="text-[10px] text-gray-400">Não disponível no MVP</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-slate-800' : 'bg-slate-50 border-slate-200'} transition-all`}>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Alertas críticos</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-amber-500">
                        {certificatesList.filter(c => {
                          const diff = Math.ceil((new Date(c.validUntil).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                          return diff > 0 && diff <= expiringWarningDays;
                        }).length}
                      </span>
                      <span className="text-[10px] text-gray-400">Expira em 30 dias</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-slate-800' : 'bg-slate-50 border-slate-200'} transition-all`}>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Referências vencidas</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-red-500">
                        {certificatesList.filter(c => new Date(c.validUntil) <= new Date()).length}
                      </span>
                      <span className="text-[10px] text-gray-400">Atualizar para contador</span>
                    </div>
                  </div>
                </div>

                {/* Lista de Certificados Multiempresa */}
                <div className={`rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-[#222228]' : 'bg-white border-slate-200'} overflow-hidden`}>
                  <div className="p-4 border-b border-slate-200/10 flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-indigo-400" />
                      Cadastros de preparação futura por empresa
                    </h4>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono">
                      Sem transmissão fiscal
                    </span>
                  </div>

                  <div className="overflow-x-auto min-h-[180px]">
                    <scroll-container>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className={`border-b text-[10px] tracking-wider uppercase ${theme === 'dark' ? 'border-[#222228] text-gray-500 bg-slate-900/40' : 'border-slate-200 text-gray-600 bg-slate-50'}`}>
                            <th className="p-3">Apelido (ERP)</th>
                            <th className="p-3">Titular / CNPJ</th>
                            <th className="p-3">Tipo / Arquivo</th>
                            <th className="p-3">Validade Restante</th>
                            <th className="p-3">Usos internos</th>
                            <th className="p-3 text-right">Controles operacionais</th>
                          </tr>
                        </thead>
                        <tbody>
                          {certificatesList.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-gray-500">
                                Nenhum cadastro de preparação futura registrado. Adicione um novo no botão superior.
                              </td>
                            </tr>
                          ) : (
                            certificatesList.map((cert) => {
                              const isPast = new Date(cert.validUntil) <= new Date();
                              const diffDays = Math.ceil((new Date(cert.validUntil).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                              const isWarning = diffDays > 0 && diffDays <= expiringWarningDays;
                              
                              let statusBadge = (
                                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                                  Ativo
                                </span>
                              );
                              if (isPast) {
                                statusBadge = (
                                  <span className="bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold">
                                    Vencido
                                  </span>
                                );
                              } else if (isWarning) {
                                statusBadge = (
                                  <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[10px] font-bold">
                                    Expirando ({diffDays}d)
                                  </span>
                                );
                              }

                              return (
                                <tr key={cert.id} className={`border-b transition-colors hover:bg-slate-500/5 ${theme === 'dark' ? 'border-[#222228]' : 'border-slate-200'}`}>
                                  <td className="p-3 align-middle">
                                    <div className="flex items-center gap-1.5">
                                      <KeyRound className={`w-3.5 h-3.5 ${isPast ? 'text-rose-500' : 'text-emerald-500'}`} />
                                      <span className="font-bold">{cert.alias}</span>
                                    </div>
                                  </td>
                                  <td className="p-3 align-middle">
                                    <div>
                                      <p className="font-bold">{cert.companyName}</p>
                                      <p className="text-[10px] text-gray-500 mt-0.5 font-mono">CNPJ: {cert.cnpj}</p>
                                    </div>
                                  </td>
                                  <td className="p-3 align-middle">
                                    <div className="space-y-0.5">
                                      <p className="font-mono text-[10px]">Modelo {cert.type}</p>
                                      <p className="text-[10px] text-gray-500 underline truncate max-w-[140px]">{cert.fileName}</p>
                                    </div>
                                  </td>
                                  <td className="p-3 align-middle">
                                    <div className="space-y-1">
                                      {statusBadge}
                                      <p className="text-[10px] text-gray-500 font-mono">Venc: {cert.validUntil}</p>
                                    </div>
                                  </td>
                                  <td className="p-3 align-middle">
                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                      {cert.scopes.map((scope: string) => (
                                        <span key={scope} className="bg-indigo-500/10 text-indigo-400 text-[9px] font-bold px-1 rounded-sm scale-95 origin-left">
                                          {scope}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="p-3 align-middle text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => handleTestCertificate(cert.id)}
                                        title="Conferir dados internos"
                                        className="p-1 px-2 text-[10px] font-bold flex items-center gap-1 rounded bg-[#312e81]/30 hover:bg-[#312e81]/50 text-indigo-400 border border-indigo-500/20 cursor-pointer"
                                      >
                                        <Activity className="w-3 h-3" />
                                        Conferir
                                      </button>
                                      <a
                                        href="#download"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          alert(`Relatório de referência salvo para ${cert.alias}. Sem uso operacional de certificado e sem transmissão fiscal no MVP.`);
                                        }}
                                        title="Baixar Chave Pública"
                                        className={`p-1 rounded cursor-pointer ${theme === 'dark' ? 'bg-[#1b1b1f] hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}
                                      >
                                        <Download className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
                                      </a>
                                      <button
                                        onClick={() => handleDeleteCertificate(cert.id)}
                                        title="Revogar do ERP"
                                        className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </scroll-container>
                  </div>
                </div>

                {/* Console de conferência interna */}
                {certTestingId && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/25 font-mono text-[11px] text-slate-300 space-y-2 max-w-full animate-pulse-once">
                    <div className="flex items-center justify-between border-b border-indigo-500/25 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        <span className="font-extrabold text-[#818cf8] uppercase tracking-wider text-[10px]">
                          Conferência interna de preparação futura
                        </span>
                      </div>
                      <button
                        onClick={() => setCertTestingId(null)}
                        className="text-[10px] text-gray-500 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        [Fechar Console]
                      </button>
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[140px] pr-2 scrollbar-thin">
                      {certTestLogs.map((log, i) => (
                        <p key={i} className="leading-relaxed whitespace-pre-wrap">{log}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registro de auditoria dos cadastros internos */}
                <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-[#222228]' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <h4 className={`text-xs font-extrabold uppercase ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                        Trilha local demonstrativa e preparação para contador
                      </h4>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Checklist local sem transmissão fiscal</span>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    Esta trilha local registra alterações demonstrativas usadas para pré-nota interna, rascunho sem valor fiscal e preparação local para contador.
                  </p>
                  
                  <div className="space-y-2 mt-4">
                    {certAuditLogs.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[10px] p-2 rounded bg-slate-900/30 border border-slate-800/20 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{item.date}</span>
                          <span className="text-indigo-400 uppercase font-bold text-[9px] border border-indigo-400/20 px-1 rounded">
                            {item.action}
                          </span>
                          <span className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{item.detail}</span>
                        </div>
                        <div className="text-gray-400 text-right">
                          User: <span className="text-gray-300">{item.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Formulário demonstrativo de preparação futura */
              <form onSubmit={handleAddCertificate} className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#111115] border-[#222228]' : 'bg-white border-slate-200'} space-y-6 max-w-2xl mx-auto`}>
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200/10">
                  <KeyRound className="w-5 h-5 text-indigo-500" />
                  <h4 className={`text-xs font-extrabold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    Cadastro de preparação futura
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Apelido / Razão */}
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Apelido identificador do cadastro</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Preparação futura - Filial Bebidas"
                      value={certAlias}
                      onChange={(e) => setCertAlias(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-[#f4f4f7]' : 'bg-white border text-slate-850'
                      }`}
                      required
                    />
                  </div>

                  {/* Empresa Beneficiária */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Empresa para dados internos</label>
                    <select
                      value={certCompanyName}
                      onChange={(e) => setCertCompanyName(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-[#f4f4f7]' : 'bg-white border text-slate-850'
                      }`}
                    >
                      <option value="EMPRESA FICTÍCIA LOCAL LTDA">EMPRESA FICTÍCIA LOCAL LTDA (Matriz fictícia)</option>
                      <option value="Empresa Fictícia de Apoio Local">Empresa Fictícia de Apoio Local (Filial fictícia)</option>
                      <option value="Empresa Fictícia de Controle Local">Empresa Fictícia de Controle Local</option>
                    </select>
                  </div>

                  {/* CNPJ */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">CNPJ de referência</label>
                    <input 
                      type="text"
                      placeholder="CNPJ fictício para simulação local"
                      value={certCnpjForm}
                      onChange={(e) => setCertCnpjForm(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-[#f4f4f7]' : 'bg-white border text-slate-850'
                      }`}
                      required
                    />
                  </div>

                  {/* Modelo do Certificado */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Modelo de referência futura</label>
                    <div className="flex gap-4 p-2">
                      <label className="flex items-center gap-2 text-xs">
                        <input 
                          type="radio" 
                          name="form_cert_model" 
                          checked={certTypeForm === 'A1'} 
                          onChange={() => setCertTypeForm('A1')}
                          className="text-indigo-600"
                        />
                        Modelo A1 (referência em arquivo)
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input 
                          type="radio" 
                          name="form_cert_model" 
                          checked={certTypeForm === 'A3'} 
                          onChange={() => setCertTypeForm('A3')}
                          className="text-indigo-600"
                        />
                        Modelo A3 (referência externa)
                      </label>
                    </div>
                  </div>

                  {/* Senha do contêiner */}
                  <div className="space-y-1.5 font-mono">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Observação restrita</label>
                    <input 
                      type="password"
                      placeholder="••••••••••••••"
                      value={certPasswordForm}
                      onChange={(e) => setCertPasswordForm(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-[#f4f4f7]' : 'bg-white border text-slate-850'
                      }`}
                    />
                  </div>

                  {/* Validade do Certificado */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Data de revisão</label>
                    <input 
                      type="date" 
                      value={certValidForm}
                      onChange={(e) => setCertValidForm(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-[#f4f4f7]' : 'bg-white border text-slate-850'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Seleção de usos internos */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase block">
                    Usos internos do cadastro
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Pré-nota interna', 'Pacote do contador', 'Dados internos', 'Preparação futura', 'Rascunho sem valor fiscal', 'Organização visual'].map((scope) => {
                      const isChecked = certScopesForm.includes(scope);
                      return (
                        <label key={scope} className={`flex items-center gap-2 p-2 rounded border cursor-pointer text-[11px] font-bold ${
                          isChecked 
                            ? 'border-indigo-500/40 bg-indigo-500/5 text-indigo-400' 
                            : 'border-slate-800/40 bg-slate-900/10 text-gray-400'
                        }`}>
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCertScopesForm(prev => [...prev, scope]);
                              } else {
                                setCertScopesForm(prev => prev.filter(s => s !== scope));
                              }
                            }}
                            className="hidden"
                          />
                          <span className={`w-3.5 h-3.5 rounded border border-indigo-400 flex items-center justify-center text-[9px] ${
                            isChecked ? 'bg-indigo-600 text-white' : 'bg-transparent'
                          }`}>
                            {isChecked && '✓'}
                          </span>
                          {scope}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Área Criptografada Drag and Drop (Para A1) */}
                {certTypeForm === 'A1' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Arquivo de referência (.pfx ou .p12)</label>
                    <div className="border border-dashed border-indigo-500/20 bg-indigo-500/5 rounded-xl p-6 text-center space-y-3">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-indigo-500 animate-bounce" />
                        <div className="text-xs">
                          <span className="font-bold text-indigo-400">Arraste um arquivo de referência</span> ou clique aqui para selecionar
                        </div>
                        <p className="text-[9px] text-gray-500">Uso demonstrativo para preparação futura. Não disponível no MVP para transmissão fiscal.</p>
                        <p className="text-[9px] text-amber-500">Não envie certificado real no MVP. Use apenas arquivo fictício ou referência local demonstrativa, sem uso operacional e sem uso real.</p>
                      </div>

                      {/* File select handler simulated */}
                      <input 
                        type="file" 
                        accept=".pfx,.p12"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCertFileName(file.name);
                          }
                        }}
                        className="hidden"
                        id="input_cert_file"
                      />
                      <label 
                        htmlFor="input_cert_file"
                        className="inline-block px-4 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg cursor-pointer transition-all"
                      >
                        Registrar referência
                      </label>

                      {certFileName && (
                        <div className="text-xs font-mono text-emerald-400 font-bold bg-[#111115] border border-emerald-500/20 p-2 rounded inline-block">
                          ✓ File: {certFileName}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/10">
                  <button
                    type="button"
                    onClick={() => setIsAddingCert(false)}
                    className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-indigo-600 rounded-lg hover:bg-indigo-500 text-white shadow-sm transition-all cursor-pointer"
                  >
                    Salvar referência local
                  </button>
                </div>
              </form>
            )}
          </div>
        )}


        {/* SUBTAB 4: REGRAS DE NEGÓCIO */}
        {activeSubTab === 'regra' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/10">
              <Sliders className="w-4.5 h-4.5 text-indigo-500" />
              <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Parâmetros e Gatilhos de Alerta Automático
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Gatilho de Validade Crítica (Dias)</label>
                <input
                  type="number"
                  value={expiringWarningDays}
                  onChange={(e) => setExpiringWarningDays(Number(e.target.value))}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono font-semibold ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
                <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                  Dias anteriores ao vencimento para ativar o marcador amarelo de alerta de expiração no painel principal.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase block">Estoque Crítico de Segurança (Unidades)</label>
                <input
                  type="number"
                  value={minStockLimit}
                  onChange={(e) => setMinStockLimit(Number(e.target.value))}
                  className={`w-full text-xs p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono font-semibold ${
                    theme === 'dark' ? 'bg-[#16161a] border-[#222228] text-slate-200' : 'bg-white border text-slate-850'
                  }`}
                />
                <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                  A quantidade mínima de segurança armazenada em prateleiras. Abaixo deste nível, é sugerido reposição autônoma.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: SOCIETÁRIO */}
        {activeSubTab === 'societario' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/10">
              <div className="flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-indigo-500" />
                <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  Quadro de Sócios e Administradores (QSA)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/15 text-indigo-400">
                Capital Integralizado: R$ {totalCapitalInjected.toLocaleString('pt-BR')} &bull; Participação: {totalEquityCalculated}%
              </span>
            </div>
            <p className="text-[10px] text-gray-500">
              Informações societárias e valores são apenas referência local demonstrativa no MVP.
            </p>

            {/* TABELA DE SÓCIOS */}
            <div className="border border-slate-200/10 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`text-[9.5px] uppercase tracking-wider font-semibold border-b ${
                    theme === 'dark' ? 'bg-slate-500/5 text-gray-400 border-slate-500/10' : 'bg-slate-50 text-slate-500'
                  }`}>
                    <th className="py-2.5 px-3">Sócio / Acionista</th>
                    <th className="py-2.5 px-3">Cargo / Enquadramento</th>
                    <th className="py-2.5 px-3 text-right">Porcentagem (%)</th>
                    <th className="py-2.5 px-3 text-right">Capital Subscrito (R$)</th>
                    <th className="py-2.5 px-2 text-center w-14">Remover</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/10">
                  {partners.map(p => (
                    <tr key={p.id} className="hover:bg-slate-500/5 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-350">{p.name}</td>
                      <td className="py-3 px-3 text-gray-400">{p.role}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-indigo-505">{p.equity}%</td>
                      <td className="py-3 px-3 text-right font-mono text-gray-400">
                        R$ {p.capital.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => handleRemovePartner(p.id)}
                          className="text-red-500 hover:text-red-650 hover:bg-red-500/5 p-1 rounded-lg cursor-pointer transition-colors"
                          title="Remover Registro de Sócio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FORMULÁRIO COMPLEMENTAR ADICIONAR NOVO SÓCIO */}
            <div className={`p-4 rounded-xl border border-dashed flex flex-wrap gap-3 items-center ${
              theme === 'dark' ? 'bg-[#18181c] border-slate-[#2d2d35]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-full flex justify-between items-center pl-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Adicionar Sócio / Declaração Própria:
                </p>
                {partnerError && (
                  <span className="text-[10px] bg-red-500/10 text-red-500 font-bold px-2 py-0.5 rounded border border-red-500/20 animate-pulse">
                    {partnerError}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Nome fictício do sócio"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                  className={`w-full text-xs p-2 rounded-lg focus:outline-none ${
                    theme === 'dark' ? 'bg-[#1e1e24] border-[#2c2c35] text-slate-200' : 'bg-white border text-slate-800'
                  }`}
                />
              </div>

              <div className="w-48">
                <select
                  value={newPartnerRole}
                  onChange={(e) => setNewPartnerRole(e.target.value)}
                  className={`w-full text-xs p-2 rounded-lg focus:outline-none ${
                    theme === 'dark' ? 'bg-[#1e1e24] border-[#2c2c35] text-slate-200' : 'bg-white border text-slate-800'
                  }`}
                >
                  <option value="Sócio-Administrador">Sócio-Administrador</option>
                  <option value="Sócio Investidor">Sócio Investidor</option>
                  <option value="Sócio Operacional">Sócio Operacional</option>
                  <option value="Conselheiro Consultivo">Conselheiro Consultivo</option>
                </select>
              </div>

              <div className="w-24">
                <input
                  type="number"
                  placeholder="Participação fictícia %"
                  value={newPartnerEquity}
                  onChange={(e) => setNewPartnerEquity(Number(e.target.value))}
                  className={`w-full text-xs p-2 rounded-lg focus:outline-none font-mono ${
                    theme === 'dark' ? 'bg-[#1e1e24] border-[#2c2c35] text-slate-200' : 'bg-white border text-slate-800'
                  }`}
                  min="1"
                  max="100"
                />
              </div>

              <div className="w-32">
                <input
                  type="number"
                  placeholder="Capital fictício R$"
                  value={newPartnerCapital}
                  onChange={(e) => setNewPartnerCapital(Number(e.target.value))}
                  className={`w-full text-xs p-2 rounded-lg focus:outline-none font-mono ${
                    theme === 'dark' ? 'bg-[#1e1e24] border-[#2c2c35] text-slate-200' : 'bg-white border text-slate-800'
                  }`}
                />
              </div>

              <button
                onClick={handleAddPartner}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Registrar Sócio
              </button>
            </div>
          </div>
        )}

        {/* SUBTAB: GESTÃO DE USUÁRIOS E PERMISSÕES */}
        {activeSubTab === 'usuarios' && selectedPlan === 'micro' && (
          <div className="p-8 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto text-xl animate-pulse">
              🔒
            </div>
            <div className="space-y-2">
              <h3 className={`text-sm font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Módulo Indisponível no Plano Básico
              </h3>
              <p className="text-xs text-slate-400">
                Os usuários locais são perfis demonstrativos do MVP para controlar navegação local. Não substitui autenticação real, gestão corporativa de identidade ou segurança de produção.
              </p>
            </div>
            
            <div className="p-4 bg-slate-500/5 rounded-2xl border border-slate-200/10 text-left space-y-3">
              <span className="text-[10px] font-black uppercase text-indigo-400 block tracking-wider">Recursos Inclusos no Upgrade:</span>
              <ul className="text-xs space-y-1.5 text-slate-300 list-none font-medium">
                <li>✅ <strong>Plano Médio:</strong> Até 4 perfis locais de funcionários além do principal</li>
                <li>✅ <strong>Plano Premium:</strong> Perfis locais ilimitados com senhas locais demonstrativas</li>
                <li>✅ <strong>Controle demonstrativo:</strong> Defina permissões locais de navegação para a simulação interna</li>
              </ul>
            </div>

            <p className="text-[10px] text-indigo-405 uppercase font-black tracking-widest animate-bounce">
              Disponível para portadores do Plano Médio ou Superior!
            </p>
          </div>
        )}

        {activeSubTab === 'usuarios' && selectedPlan !== 'micro' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/5">
              <div>
                <h3 className={`text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-805'}`}>
                  <span>Usuários locais e permissões demonstrativas</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                    selectedPlan === 'media' 
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                      : 'bg-indigo-600/10 text-indigo-455 border border-indigo-455/20'
                  }`}>
                    {selectedPlan === 'media' ? 'Plano Premium (Ilimitado)' : 'Plano Médio (Max 4 Contas)'}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Crie perfis locais para demonstração usando o e-mail unificado <strong>{parentEmail}</strong>. Os dados são salvos neste navegador, não substituem autenticação real e as permissões locais apenas limitam a navegação visual do MVP.
                </p>
              </div>

              <button
                onClick={() => {
                  const companySubUsers = subUsers.filter((u: any) => u.login && u.login.toLowerCase() === parentEmail.toLowerCase());
                  if (selectedPlan === 'pequena' && companySubUsers.length >= 4) {
                    setUserAdminError('⚠️ Limite atingido! Seu Plano Médio permite o cadastro de no máximo 4 funcionários além do administrador.');
                    setTimeout(() => setUserAdminError(null), 6000);
                    return;
                  }
                  setIsAddingUser(true);
                  setNewUserName('');
                  setNewUserPass('');
                  setNewUserAllowedTabs(['dashboard', 'invoice']);
                  setUserAdminError(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                Adicionar usuário local
              </button>
            </div>

            {userAdminError && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-bold uppercase tracking-wider">
                {userAdminError}
              </div>
            )}

            {userAdminSuccess && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs font-bold uppercase tracking-wider">
                {userAdminSuccess}
              </div>
            )}

            {/* FORMULÁRIO DE CADASTRO EXPANDIDO */}
            {isAddingUser && (
              <div className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-[#18181c] border-slate-800' : 'bg-slate-50 border-slate-200'
              } space-y-4 animate-fade-in`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100/5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                    Perfil local e permissões de navegação
                  </h4>
                  <button onClick={() => setIsAddingUser(false)} className="text-gray-400 hover:text-white text-xs font-bold cursor-pointer">
                    Fechar &times;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Nome do Colaborador</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Supervisor"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className={`w-full text-xs p-3 rounded-lg focus:outline-none ${
                        theme === 'dark' ? 'bg-[#111114] border-slate-800 text-white' : 'bg-white border text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Senha local demonstrativa</label>
                    <input
                      type="password"
                      required
                      placeholder="Senha fictícia para simulação local"
                      value={newUserPass}
                      onChange={(e) => setNewUserPass(e.target.value)}
                      className={`w-full text-xs p-3 rounded-lg focus:outline-none font-mono ${
                        theme === 'dark' ? 'bg-[#111114] border-slate-800 text-white' : 'bg-white border text-slate-800'
                      }`}
                    />
                    <span className="text-[9px] text-slate-400 block">Use apenas para simulação interna: não usar senhas reais. Este controle local não é segurança de produção.</span>
                  </div>
                </div>

                {/* ABA DE SELEÇÃO DE MAIOR DESIGN */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-450 block">Permissões locais de navegação</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* DASHBOARD */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                        newUserAllowedTabs.includes('dashboard')
                          ? 'border-indigo-500/40 bg-indigo-500/5'
                          : 'border-slate-200/5 hover:border-slate-200/15'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newUserAllowedTabs.includes('dashboard')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'dashboard']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'dashboard'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block">Painel de Controle</span>
                        <span className="text-[9px] text-gray-400 block">Visão geral do caixa, alertas e trilhas locais demonstrativas</span>
                      </div>
                    </label>

                    {/* ORGANIZAÇÃO LOCAL */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                        newUserAllowedTabs.includes('finance')
                          ? 'border-indigo-500/40 bg-indigo-500/5'
                          : 'border-slate-200/5 hover:border-slate-200/15'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newUserAllowedTabs.includes('finance')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'finance']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'finance'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block">Organização local</span>
                        <span className="text-[9px] text-gray-400 block">Lançamento de transações, gráficos financeiros e conciliação</span>
                      </div>
                    </label>

                    {/* APOIO DE ESTOQUE */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 select-none transition-all ${
                        newUserAllowedTabs.includes('logistics')
                          ? 'border-indigo-500/40 bg-indigo-500/5 cursor-pointer'
                          : 'border-slate-200/5 hover:border-slate-200/15 cursor-pointer'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newUserAllowedTabs.includes('logistics')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'logistics']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'logistics'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block flex items-center gap-1">Apoio de estoque</span>
                        <span className="text-[9px] text-gray-400 block">Gestão de produtos, movimentações e avarias de lotes</span>
                      </div>
                    </label>

                    {/* PRÉ-NOTA INTERNA */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                        newUserAllowedTabs.includes('invoice')
                          ? 'border-indigo-500/40 bg-indigo-500/5'
                          : 'border-slate-200/5 hover:border-slate-200/15'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newUserAllowedTabs.includes('invoice')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'invoice']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'invoice'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block">Pré-notas locais</span>
                        <span className="text-[9px] text-gray-400 block font-sans">Rascunho interno sem valor fiscal e preparação local para contador</span>
                      </div>
                    </label>

                    {/* APOIO AVANÇADO */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                        newUserAllowedTabs.includes('hierarchy')
                          ? 'border-indigo-500/40 bg-indigo-500/5'
                          : 'border-slate-200/5 hover:border-slate-200/15'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newUserAllowedTabs.includes('hierarchy')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'hierarchy']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'hierarchy'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block">Apoio avançado</span>
                        <span className="text-[9px] text-gray-400 block">Distribuição de afazeres, organogramas corporativos e status</span>
                      </div>
                    </label>

                    {/* ORIENTAÇÃO LOCAL */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 select-none transition-all ${
                        selectedPlan === 'pequena' 
                          ? 'opacity-40 cursor-not-allowed border-dashed border-slate-800' 
                          : newUserAllowedTabs.includes('advisor')
                          ? 'border-indigo-500/40 bg-indigo-500/5 cursor-pointer'
                          : 'border-slate-200/5 hover:border-slate-200/15 cursor-pointer'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={selectedPlan === 'pequena'}
                        checked={selectedPlan !== 'pequena' && newUserAllowedTabs.includes('advisor')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'advisor']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'advisor'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block flex items-center gap-1">Orientação local {selectedPlan === 'pequena' && <span>🔒</span>}</span>
                        <span className="text-[9px] text-gray-400 block">{selectedPlan === 'pequena' ? 'Inclusão requer Plano Premium' : 'Consultoria estatística e análises de mercado guiadas por IA'}</span>
                      </div>
                    </label>

                    {/* AJUSTES LOCAIS */}
                    <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                        newUserAllowedTabs.includes('settings')
                          ? 'border-indigo-500/40 bg-indigo-500/5'
                          : 'border-slate-200/5 hover:border-slate-200/15'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newUserAllowedTabs.includes('settings')}
                        onChange={(e) => {
                          if (e.target.checked) setNewUserAllowedTabs([...newUserAllowedTabs, 'settings']);
                          else setNewUserAllowedTabs(newUserAllowedTabs.filter(t => t !== 'settings'));
                        }}
                        className="rounded mt-0.5 accent-indigo-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold block">Ajustes locais</span>
                        <span className="text-[9px] text-gray-400 block">Acesso ao painel tributário, mudança cadastral exceto usuários</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newUserName.trim() || !newUserPass.trim()) {
                        setUserAdminError('⚠️ Por favor, assinale o Nome e a senha local demonstrativa para o funcionário.');
                        return;
                      }
                      
                      // Check password uniqueness across this company's subusers
                      const companySubUsers = subUsers.filter((u: any) => u.login && u.login.toLowerCase() === parentEmail.toLowerCase());
                      const isUniquePassword = !companySubUsers.some(
                        (u: any) => u.password.toLowerCase() === newUserPass.trim().toLowerCase()
                      );
                      
                      if (!isUniquePassword) {
                        setUserAdminError('⚠️ Esta senha local demonstrativa já está em uso por outro colaborador desta empresa. Atribua uma senha exclusiva para a simulação.');
                        return;
                      }

                      if (newUserAllowedTabs.length === 0) {
                        setUserAdminError('⚠️ Você deve selecionar ao menos uma permissão local de navegação para este usuário.');
                        return;
                      }

                      const newUserRecord = {
                        id: 'sub_' + Math.random().toString(36).substr(2, 9),
                        name: newUserName.trim(),
                        password: newUserPass.trim(),
                        login: parentEmail,
                        allowedTabs: newUserAllowedTabs,
                      };

                      const newList = [...subUsers, newUserRecord];
                      setSubUsers(newList);
                      localStorage.setItem('biz_sub_users', JSON.stringify(newList));

                      setIsAddingUser(false);
                      setNewUserName('');
                      setNewUserPass('');
                      setUserAdminSuccess('Perfil local de funcionário adicionado para demonstração neste navegador.');
                      setTimeout(() => setUserAdminSuccess(null), 5000);
                    }}
                    className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md"
                  >
                    Salvar perfil local
                  </button>
                </div>
              </div>
            )}

            {/* TABELA DE REGISTROS DE USUÁRIOS */}
            <div className={`border rounded-2xl overflow-hidden ${theme === 'dark' ? 'border-[#222228] bg-[#111114]' : 'border-slate-200 bg-white'}`}>
              <div className={`p-4 font-extrabold text-[10px] uppercase tracking-wider ${
                theme === 'dark' ? 'bg-[#18181c] text-indigo-400 border-b border-[#222228]' : 'bg-slate-50 text-indigo-700 border-b border-slate-100'
              }`}>
                Usuários locais salvos neste navegador ({subUsers.filter((u: any) => u.login && u.login.toLowerCase() === parentEmail.toLowerCase()).length})
              </div>

              {subUsers.filter((u: any) => u.login && u.login.toLowerCase() === parentEmail.toLowerCase()).length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-medium">
                  Nenhum perfil local adicionado ainda. Utilize o botão "Adicionar usuário local" e defina permissões locais de navegação.
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b border-slate-200/5 ${theme === 'dark' ? 'bg-black/10' : 'bg-slate-50'}`}>
                      <th className="p-3.5 text-[10px] font-black uppercase text-slate-400">Nome do Funcionário</th>
                      <th className="p-3.5 text-[10px] font-black uppercase text-slate-400">Login (E-mail Core)</th>
                      <th className="p-3.5 text-[10px] font-black uppercase text-slate-400">Senha local demonstrativa</th>
                      <th className="p-3.5 text-[10px] font-black uppercase text-slate-400">Permissões locais</th>
                      <th className="p-3.5 text-[10px] font-black uppercase text-slate-400 text-right">Desconectar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subUsers
                      .filter((u: any) => u.login && u.login.toLowerCase() === parentEmail.toLowerCase())
                      .map((user: any) => (
                        <tr key={user.id} className="border-b last:border-0 border-slate-200/5 hover:bg-slate-50/5">
                          <td className="p-3.5 font-bold text-slate-200">{user.name}</td>
                          <td className="p-3.5 text-slate-400 font-mono text-[11px]">{user.login}</td>
                          <td className="p-3.5 text-slate-400 font-mono font-extrabold text-[11px]">
                            <span aria-label="Senha local demonstrativa ocultada visualmente">••••••••</span>
                            <span className="block text-[9px] font-medium normal-case text-slate-500">Dado local demonstrativo ocultado na tela</span>
                          </td>
                          <td className="p-3.5">
                            <div className="flex flex-wrap gap-1 max-w-md">
                              {user.allowedTabs.map((tab: string) => {
                                let tabLabel = tab;
                                if (tab === 'dashboard') tabLabel = 'Painel de Controle';
                                else if (tab === 'finance') tabLabel = 'Organização local';
                                else if (tab === 'logistics') tabLabel = 'Apoio de estoque';
                                else if (tab === 'invoice') tabLabel = 'Pré-notas';
                                else if (tab === 'hierarchy') tabLabel = 'Apoio avançado';
                                else if (tab === 'advisor') tabLabel = 'Orientação local';
                                else if (tab === 'settings') tabLabel = 'Ajustes locais';
                                return (
                                  <span key={tab} className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                                    {tabLabel}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => {
                                const updated = subUsers.filter((u: any) => u.id !== user.id);
                                setSubUsers(updated);
                                localStorage.setItem('biz_sub_users', JSON.stringify(updated));
                                setUserAdminSuccess('Perfil local removido deste navegador.');
                                setTimeout(() => setUserAdminSuccess(null), 4000);
                              }}
                              className="text-rose-500 hover:text-rose-650 cursor-pointer p-1"
                              title="Remover Login Subordinado"
                            >
                              <Trash2 className="w-4 h-4 ml-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* SUBTAB 5.5: BACKUP E RESTAURAÇÃO */}
        {activeSubTab === 'backup' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/10">
              <Database className="w-4.5 h-4.5 text-indigo-505" />
              <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Backup local e restauração de dados deste navegador
              </h3>
            </div>

            {/* FEEDBACKS */}
            {backupSuccess && (
              <div className="p-4 bg-emerald-550/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl flex items-start gap-2.5 animate-fade-in">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <p>{backupSuccess}</p>
              </div>
            )}

            {backupError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-405 text-xs font-semibold rounded-xl flex items-start gap-2.5 animate-fade-in">
                <AlertTriangle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
                <p>{backupError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EXPORT SNAPSHOT CARD */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                theme === 'dark' ? 'bg-[#151518] border-[#222228]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-gray-150' : 'text-slate-900'}`}>
                      Exportar backup local
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Gera um arquivo local .json com dados demonstrativos salvos neste navegador. Não é backup em nuvem e não sincroniza com servidor.
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-gray-500 pt-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span>Configurações fiscais e dados cadastrais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span>Histórico completo de receitas e despesas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span>Lista de funcionários, salários e organograma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span>Estoque de produtos e lotes ativos</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleExportBackup}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] text-white font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Exportar backup local (.json)
                  </button>
                </div>
              </div>

              {/* IMPORT SNAPSHOT CARD */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                theme === 'dark' ? 'bg-[#151518] border-[#222228]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-gray-150' : 'text-slate-900'}`}>
                      Importação local sensível
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Envie um arquivo local .json previamente exportado. A restauração local substitui dados locais atuais antes de recarregar a página.
                    </p>
                  </div>

                  {/* DROP ZONE */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files?.length) {
                        handleImportBackup(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`mt-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-500/5'
                        : theme === 'dark'
                        ? 'border-[#2c2c35] hover:border-slate-600 bg-[#121215]'
                        : 'border-slate-300 hover:border-indigo-400 bg-white'
                    }`}
                  >
                    <input
                      type="file"
                      id="backup-file-upload"
                      accept=".json"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          handleImportBackup(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="backup-file-upload" className="cursor-pointer space-y-2 block">
                      <div className="mx-auto w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center text-gray-500">
                        <Upload className="w-4 h-4 text-slate-400" />
                      </div>
                      <p className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                        {isDragging ? 'Solte o arquivo de backup local aqui' : 'Arraste ou clique para importar backup local .json'}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        A importação local pode apagar dados locais atuais. Use com cuidado.
                      </p>
                    </label>
                  </div>
                </div>

                <div className={`mt-2.5 p-3 rounded-lg border text-[10px] leading-relaxed flex gap-2 ${
                  theme === 'dark' ? 'bg-amber-500/5 border-amber-500/15 text-amber-200/70' : 'bg-amber-50 border-amber-200 text-amber-955'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ação sensível:</strong> a importação local substitui dados locais atuais de forma irreversível antes de carregar o snapshot.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 6: REINICIALIZAÇÃO DE DADOS */}
        {activeSubTab === 'reset' && (
          <PermissionGate permission={MODULE_PERMISSIONS.system.factoryReset} fallback={<AccessDenied />}>
            <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-rose-500/10">
              <ShieldAlert className="w-4.5 h-4.5 text-rose-500" />
              <h3 className={`text-xs font-extrabold tracking-wider uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Zona de perigo - reset local destrutivo
              </h3>
            </div>

            {resetConfirmState === 'idle' && (
              <>
                <div className={`p-5 rounded-2xl border ${
                  theme === 'dark' ? 'bg-rose-500/5 border-rose-500/20 text-rose-250' : 'bg-red-50 border-red-150 text-red-900'
                } flex items-start gap-4`}>
                  <AlertTriangle className="w-8 h-8 shrink-0 text-rose-500 animate-pulse mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-sm font-extrabold block">Ação destrutiva sobre dados locais</strong>
                    <p className="text-xs leading-relaxed max-w-2xl opacity-90">
                      Esta operação apaga dados locais armazenados no seu navegador (<strong className="font-mono">localStorage</strong>). Antes de resetar, exporte um backup local; dados apagados por reset local não são recuperados pelo servidor.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                    O que será reinicializado:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <li className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#151518] border-[#222228] text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span><strong>Configurações Cadastrais:</strong> Razão Social, Nome Fantasia, CNAE, Endereços e Dados fiscais.</span>
                    </li>
                    <li className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#151518] border-[#222228] text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span><strong>Lançamentos Financeiros:</strong> Todos os registros e fluxo de caixa de receitas extras ou baixas.</span>
                    </li>
                    <li className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#151518] border-[#222228] text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span><strong>Estoque & Lotes de Alimentos:</strong> O inventário, lotes escaneados e limites de estoque mínimo.</span>
                    </li>
                    <li className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#151518] border-[#222228] text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span><strong>Equipe, Organograma & Tarefas:</strong> Novas tarefas pendentes e canais de chat internos.</span>
                    </li>
                  </ul>
                </div>

                <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                  theme === 'dark' ? 'bg-[#16161a] border-rose-500/10' : 'bg-slate-50 border-rose-300'
                }`}>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-450' : 'text-slate-600'}`}>
                    Deseja prosseguir com esta ação sensível e destrutiva no ambiente local de demonstração?
                  </p>
                  <button
                    onClick={handleSystemResetStep1}
                    className="mx-auto bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                    Iniciar reset local
                  </button>
                </div>
              </>
            )}

            {resetConfirmState === 'warning' && (
              <div className={`p-6 rounded-2xl border text-center space-y-6 ${
                theme === 'dark' ? 'bg-amber-950/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex flex-col items-center gap-2 max-w-lg mx-auto">
                  <AlertTriangle className="w-12 h-12 text-amber-500 animate-bounce" />
                  <h4 className={`text-sm font-extrabold tracking-wide uppercase ${theme === 'dark' ? 'text-amber-400' : 'text-amber-900'}`}>
                    CONFIRMAÇÃO EXTREMA REQUERIDA!
                  </h4>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800'}`}>
                    Você está prestes a limpar todos os registros locais deste navegador. Esta ação apaga dados locais, pré-notas, rascunhos e configurações de referência cadastradas.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSystemResetStep2Execute}
                    className="w-full sm:w-auto bg-red-650 hover:bg-red-750 text-white font-black text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Sim, apagar dados locais agora
                  </button>
                  <button
                    onClick={handleCancelReset}
                    className={`w-full sm:w-auto font-bold text-xs px-6 py-3 rounded-xl border cursor-pointer transition-all ${
                      theme === 'dark' 
                        ? 'border-gray-750 text-gray-300 hover:bg-[#1a1a20]' 
                        : 'border-slate-300 text-slate-755 hover:bg-slate-100'
                    }`}
                  >
                    Cancelar e Voltar
                  </button>
                </div>
              </div>
            )}

            {resetConfirmState === 'success' && (
              <div className={`p-8 rounded-2xl border text-center space-y-4 ${
                theme === 'dark' ? 'bg-emerald-950/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-250'
              }`}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className={`text-base font-extrabold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`}>
                    MEIO LIMPO COM SUCESSO!
                  </h4>
                  <p className={`text-xs ${theme === 'dark' ? 'text-emerald-200/80' : 'text-emerald-800'}`}>
                    Todos os parâmetros customizados e layouts foram destruídos. Restaurando o fluxo de dados do zero.
                  </p>
                  <div className={`mt-2 py-1.5 px-4 rounded-full font-mono text-xs font-bold ${
                    theme === 'dark' ? 'bg-[#18181c] text-emerald-400' : 'bg-white shadow-xs text-emerald-700'
                  }`}>
                    Reiniciando em {resetCountdown} segundos...
                  </div>
                </div>
              </div>
            )}
            </div>
          </PermissionGate>
        )}

      </div>
      
    </div>
  );
}
