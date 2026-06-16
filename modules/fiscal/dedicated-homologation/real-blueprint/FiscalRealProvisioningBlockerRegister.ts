export class FiscalRealProvisioningBlockerRegister {
  public static getBlockers() {
    return [
      {
        id: 'B-RP-01',
        severity: 'CRITICAL',
        description: 'Provisionamento real não autorizado nesta fase.',
        mitigation: 'O blueprint foi finalizado documentalmente. O Módulo 12.2 tratará o provisionamento efetivo.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-02',
        severity: 'CRITICAL',
        description: 'Banco dedicado real ainda não pode ser criado.',
        mitigation: 'Aguardar infra as code na próxima fase.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-03',
        severity: 'CRITICAL',
        description: 'Secret vault real ainda não pode ser criado.',
        mitigation: 'Aprovador de segurança precisa dar o GO na próxima fase.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-04',
        severity: 'CRITICAL',
        description: 'Certificado A1 real ainda não pode ser carregado.',
        mitigation: 'Requer cofre instanciado no domínio real.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-05',
        severity: 'CRITICAL',
        description: 'SEFAZ homologação real ainda não pode ser chamada.',
        mitigation: 'A comunicação com SEFAZ Real está bloqueada neste blueprint.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-06',
        severity: 'CRITICAL',
        description: 'XML signer real ainda não pode assinar.',
        mitigation: 'Requer biblioteca e certificado em mãos no domínio real.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-07',
        severity: 'HIGH',
        description: 'DANFE/PDF real ainda não pode ser gerado.',
        mitigation: 'Serviço de renderização dependente de provisionamento real.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-08',
        severity: 'HIGH',
        description: 'Observabilidade persistente real ainda não pode ser ativada.',
        mitigation: 'Requer infra de logs via agente configurado (ex: Datadog agent).',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-09',
        severity: 'HIGH',
        description: 'Rollback/circuit breaker/kill switch real ainda não pode ser instalado.',
        mitigation: 'Aplicar nas rotas pós-provisionamento real.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-10',
        severity: 'CRITICAL',
        description: 'Janela operacional real ainda não foi aprovada.',
        mitigation: 'Aprovação C-Level pendente.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: true,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-11',
        severity: 'CRITICAL',
        description: 'Aprovação fiscal/jurídica ainda não foi registrada.',
        mitigation: 'Setor de compliance ainda precisa validar carga de teste na SEFAZ Homologação.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      },
      {
        id: 'B-RP-12',
        severity: 'MEDIUM',
        description: 'Load test real de ambiente dedicado ainda não foi autorizado.',
        mitigation: 'Stress test não pode rodar até o banco estar ativo.',
        blockerForBlueprintClosure: false,
        blockerForInfrastructureProvisioning: false,
        blockerForRealHomologation: true
      }
    ];
  }
}
