import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  LayoutDashboard, 
  DollarSign, 
  Scan, 
  FileText, 
  Users, 
  Sparkles, 
  X,
  Play,
  TrendingUp,
  Package,
  Clock,
  ShieldCheck,
  Building
} from 'lucide-react';

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

interface TutorialStep {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  highlights: { title: string; desc: string; icon: React.ReactNode }[];
}

export default function OnboardingTutorial({ isOpen, onClose, theme }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps: TutorialStep[] = [
    {
      title: 'Bem-vindo ao Auxiliar Biz',
      badge: 'Visão Geral',
      badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      description: 'Uma consola avançada e totalmente integrada que unifica a saúde contábil, financeira e logística do seu negócio sob um único local de trabalho de alta densidade.',
      icon: <Building className="w-10 h-10 text-emerald-400" />,
      colorClass: 'from-emerald-600 to-teal-400',
      highlights: [
        { 
          title: 'Caixa & Estoque Unificados', 
          desc: 'Veja o saldo real integrado com as notas emitidas e as baixas de salários.', 
          icon: <LayoutDashboard className="w-4 h-4 text-emerald-500" /> 
        },
        { 
          title: 'Design Responsivo e Clean', 
          desc: 'Layout polido com alto contraste visual e suporte integrado a Modo Claro e Escuro.', 
          icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
        },
        { 
          title: 'Zero Latência Local', 
          desc: 'Funcionamento instantâneo operando com persistência total em sua memória local.', 
          icon: <Clock className="w-4 h-4 text-emerald-500" /> 
        }
      ]
    },
    {
      title: 'Módulo Contábil & Fluxo de Caixa',
      badge: 'Contabilidade Ativa',
      badgeColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      description: 'Tenha o controle estratégico imediato de faturamento corrente, caixa livre projetado, receitas extraordinárias e pagamentos programados.',
      icon: <DollarSign className="w-10 h-10 text-emerald-500" />,
      colorClass: 'from-indigo-600 to-purple-500',
      highlights: [
        { 
          title: 'Relatório DRE Detalhado', 
          desc: 'Acompanhamento automático das receitas e margens de despesas mensais em gráficos reais.', 
          icon: <TrendingUp className="w-4 h-4 text-indigo-500" /> 
        },
        { 
          title: 'Faturamento de Salários', 
          desc: 'Registre ou altere colaboradores ativos e fature salários diretamente no livro financeiro.', 
          icon: <Users className="w-4 h-4 text-indigo-500" /> 
        },
        { 
          title: 'Guarda das Movimentações', 
          desc: 'Adicione transações manuais categorizadas para suprimentos, impostos, tecnologia ou outras contas.', 
          icon: <DollarSign className="w-4 h-4 text-indigo-505" /> 
        }
      ]
    },
    {
      title: 'Logística de Lotes & Alertas de Estoque',
      badge: 'Prevenção de Perdas',
      badgeColor: 'bg-amber-500/10 text-amber-505 border-amber-500/20',
      description: 'Monitore o estoque físico de alimentos por lotes, datas de fabricação / vencimento e evite perda de mercadorias no almoxarifado.',
      icon: <Scan className="w-10 h-10 text-amber-500" />,
      colorClass: 'from-amber-500 to-amber-600',
      highlights: [
        { 
          title: 'Endereçamento de Prateleiras', 
          desc: 'Simule o endereço físico exato de cada lote dentro de corredores organizados.', 
          icon: <Package className="w-4 h-4 text-amber-550" /> 
        },
        { 
          title: 'Alarmes de Validade Crítica', 
          desc: 'Indicadores automatizados para lotes vencidos ou que expiram em até 7 dias.', 
          icon: <Clock className="w-4 h-4 text-amber-550" /> 
        },
        { 
          title: 'Dar Baixas Rápidas', 
          desc: 'Registre novas mercadorias ou dê baixa total rápida com atualizações instantâneas de quantidade.', 
          icon: <Scan className="w-4 h-4 text-amber-550" /> 
        }
      ]
    },
    {
      title: 'Emissão de Notas Fiscais (SEFAZ)',
      badge: 'Faturamento Fiscal',
      badgeColor: 'bg-indigo-555 bg-indigo-500/10 text-indigo-450 border-indigo-500/20',
      description: 'Um painel de faturamento completo para rascunhos, emissão de NF-e e NFS-e totalmente compatível com o ambiente do SEFAZ / Sebrae.',
      icon: <FileText className="w-10 h-10 text-indigo-400" />,
      colorClass: 'from-indigo-600 to-blue-500',
      highlights: [
        { 
          title: 'Formatação de DANFE Real', 
          desc: 'Gere rascunhos de faturamento e visualize a representação gráfica real da nota emitida.', 
          icon: <FileText className="w-4 h-4 text-indigo-500" /> 
        },
        { 
          title: 'Certificado Digital A1', 
          desc: 'Controle de validade e transmissão criptografada com certificado corporativo ativo.', 
          icon: <ShieldCheck className="w-4 h-4 text-indigo-500" /> 
        },
        { 
          title: 'Canais de Eventos de Log', 
          desc: 'Logs fiscais em tempo real monitorando chave de acesso de 44 dígitos geradas e status da SEFAZ.', 
          icon: <LayoutDashboard className="w-4 h-4 text-indigo-500" /> 
        }
      ]
    },
    {
      title: 'Gestão Inteligente & Orientação IA',
      badge: 'Mentoria Avançada',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: 'Tenha assessoria contínua para sua PME e organize as responsabilidades de sua equipe interna de forma clara.',
      icon: <Sparkles className="w-10 h-10 text-emerald-400 animate-pulse" />,
      colorClass: 'from-emerald-600 to-indigo-650',
      highlights: [
        { 
          title: 'Consultoria Integrada com IA', 
          desc: 'Converse com o Gemini 3.5 Flash para obter diagnósticos, cálculos de impostos DRE e margens de vendas.', 
          icon: <Sparkles className="w-4 h-4 text-emerald-500" /> 
        },
        { 
          title: 'Grade de Hierarquia (QSA)', 
          desc: 'Quadro de Sócios e Organograma de equipe transparente detalhando cada função.', 
          icon: <Users className="w-4 h-4 text-indigo-500" /> 
        },
        { 
          title: 'Gestão de Quadros de Tarefas', 
          desc: 'Atribua deveres de logística ou fiscal diretamente aos colaboradores e acompanhe a execução.', 
          icon: <LayoutDashboard className="w-4 h-4 text-indigo-500" /> 
        }
      ]
    }
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('biz_onboarding_tutorial_viewed', 'true');
    onClose();
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#070709]/80 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={handleComplete}
      />
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 ${
        isDark 
          ? 'bg-[#0f0f12] border-[#22222a] text-[#f8fafc]' 
          : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Top Header Grid decoration */}
        <div className={`h-2 bg-gradient-to-r ${step.colorClass}`} />

        {/* Close Button */}
        <button 
          onClick={handleComplete}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
            isDark ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-slate-100 text-slate-550'
          }`}
          title="Pular Tutorial"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Badge & Icon Area */}
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${step.colorClass}/15 flex items-center justify-center shrink-0 border border-emerald-500/10`}>
              {step.icon}
            </div>
            <div>
              <span className={`inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${step.badgeColor} mb-1.5`}>
                {step.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {step.title}
              </h2>
            </div>
          </div>

          <p className={`text-xs leading-relaxed ${isDark ? 'text-[#94a3b8]' : 'text-slate-655'}`}>
            {step.description}
          </p>

          {/* Highlights Section */}
          <div className="space-y-3">
            <h3 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Principais Destaques do Recurso:
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {step.highlights.map((h, i) => (
                <div 
                  key={i} 
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                    isDark 
                      ? 'bg-[#15151a] border-[#202028] hover:border-gray-800' 
                      : 'bg-slate-50 border-slate-205 hover:bg-slate-100/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-[#e2e8f0]/40'}`}>
                    {h.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold leading-normal">{h.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#7e8e9f]' : 'text-slate-550'}`}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Indicators & Footer Action Bar */}
          <div className={`pt-5 border-t flex flex-col sm:flex-row gap-4 items-center justify-between ${
            isDark ? 'border-gray-850' : 'border-slate-100'
          }`}>
            {/* Carousel dots */}
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentStep 
                      ? `w-6 bg-gradient-to-r ${step.colorClass}` 
                      : `w-1.5 ${isDark ? 'bg-gray-800' : 'bg-slate-200'}`
                  }`}
                  title={`Ir para etapa ${i + 1}`}
                />
              ))}
            </div>

            {/* Back & Next Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all flex items-center gap-1.5 ${
                    isDark 
                      ? 'border-slate-800 text-gray-300 hover:bg-[#1a1a20]' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-550 hover:opacity-90 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/20"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Começar Exploração
                    <Check className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Avançar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
