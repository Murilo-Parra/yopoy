export class FiscalDedicatedBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-DH-01', severity: 'CRITICAL', description: 'Ambiente dedicado ainda não foi provisionado.', mitigation: 'Provision infrastructure.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-02', severity: 'CRITICAL', description: 'Rede isolada ainda não foi aplicada.', mitigation: 'Apply network segments.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-03', severity: 'CRITICAL', description: 'Banco dedicado ainda não foi provisionado.', mitigation: 'Provide connection details.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-04', severity: 'CRITICAL', description: 'Cofre de certificado real ainda não existe.', mitigation: 'Setup vault infrastructure.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-05', severity: 'CRITICAL', description: 'SEFAZ homologação real ainda não autorizada.', mitigation: 'Request authorization.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-06', severity: 'CRITICAL', description: 'XML signer real ainda não homologado.', mitigation: 'Validate signing component.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-07', severity: 'CRITICAL', description: 'DANFE/PDF real ainda não homologado.', mitigation: 'Validate generation component.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-08', severity: 'HIGH', description: 'Observabilidade persistente ainda não existe.', mitigation: 'Connect APM/Kibana.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-09', severity: 'HIGH', description: 'Rollback/circuit breaker/kill switch ainda não instalados.', mitigation: 'Install components.', blockerForEnvironmentActivation: true, blockerForRealHomologation: true },
      { id: 'B-DH-10', severity: 'MEDIUM', description: 'Janela formal de homologação ainda não aprovada.', mitigation: 'Schedule change request.', blockerForEnvironmentActivation: false, blockerForRealHomologation: true }
    ];
  }
}
