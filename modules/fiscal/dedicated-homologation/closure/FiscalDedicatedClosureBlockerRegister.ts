export class FiscalDedicatedClosureBlockerRegister {
  public static getBlockers() {
    return [
      {
        id: 'B-DC-01',
        severity: 'CRITICAL',
        description: 'Ambiente dedicado real ainda não foi provisionado.',
        mitigation: 'Aguardar infraestrutura formal no próximo domínio.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-02',
        severity: 'CRITICAL',
        description: 'Banco dedicado real ainda não foi criado.',
        mitigation: 'Será provisionado por step seguro futuramente.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-03',
        severity: 'CRITICAL',
        description: 'Secret vault real ainda não foi criado.',
        mitigation: 'Implementar cofre na fase de provisionamento.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-04',
        severity: 'CRITICAL',
        description: 'Cofre de certificado real ainda não foi ativado.',
        mitigation: 'Implementar cofre KMS específico.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-05',
        severity: 'CRITICAL',
        description: 'Certificado A1 real ainda não foi carregado.',
        mitigation: 'Aguardar upload formal de cliente ou de teste.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-06',
        severity: 'CRITICAL',
        description: 'SEFAZ homologação real ainda não foi chamada.',
        mitigation: 'Aguardar janela de teste controlada.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-07',
        severity: 'CRITICAL',
        description: 'XML signer real ainda não foi validado.',
        mitigation: 'Pendente biblioteca configurada.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-08',
        severity: 'HIGH',
        description: 'DANFE/PDF real ainda não foi validado.',
        mitigation: 'Pendente biblioteca de renderização.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-09',
        severity: 'HIGH',
        description: 'Observabilidade persistente real ainda não foi ativada.',
        mitigation: 'Conectar logs em provedor externo.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-10',
        severity: 'CRITICAL',
        description: 'Rollback/circuit breaker/kill switch real ainda não foi instalado.',
        mitigation: 'Instalar middlewares de proteção.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-11',
        severity: 'MEDIUM',
        description: 'Load test real de ambiente dedicado ainda não foi executado.',
        mitigation: 'Executar pipeline stress.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-DC-12',
        severity: 'CRITICAL',
        description: 'Janela formal de homologação real ainda não foi aprovada.',
        mitigation: 'C-Level approval pendente.',
        blockerForEngineeringClosure: false,
        blockerForEnvironmentActivation: true,
        blockerForRealHomologation: true
      }
    ];
  }
}
