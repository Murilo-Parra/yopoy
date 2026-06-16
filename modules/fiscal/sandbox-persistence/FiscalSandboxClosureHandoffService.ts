import { FiscalSandboxClosureHandoff } from './FiscalSandboxClosureTypes';

export class FiscalSandboxClosureHandoffService {
  public static getHandoff(): FiscalSandboxClosureHandoff {
    return {
      generatedAt: new Date().toISOString(),
      currentModule: 'Módulo 6 - Sandbox & Replay',
      nextRecommendedDomain: 'Módulo 7 - Traffic Interception / Homologation SEFAZ',
      allowedNextActions: [
        'planejamento do próximo domínio',
        'auditoria de outro módulo',
        'integração visual administrativa',
        'desenho de testes de carga inertes',
        'preparação documental',
        'preparação de plano formal de ativação futura sem execução'
      ],
      forbiddenNextActions: [
        'ativar Canary real',
        'alterar app.use legado',
        'interceptar tráfego',
        'rotear para V2 de forma oficial',
        'chamar SEFAZ pela V2',
        'assinar XML pela V2',
        'gerar PDF pela V2',
        'criar worker de emissão V2',
        'escrever em tabelas fiscais reais'
      ],
      blockersBeforeRealActivation: [
        'Aprovação explícita e manual de segurança do módulo de interceptação de tráfego',
        'Certificação de assinatura XML e comunicação SEFAZ homologada',
        'Garantia de fallback/kill-switch V1 <-> V2 instantâneo'
      ],
      readOnly: true,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}
