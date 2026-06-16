export class FiscalRealSecurityRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-RS-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Blockers fixos nas policies. Sem infraestrutura real habilitada.', blockerForRealApproval: true },
      { id: 'R-RS-02', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy bloqueia flags de apply e pipelines reais não conectados.', blockerForRealApproval: true },
      { id: 'R-RS-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Scanners em validadores (fase 12.2) barram commits e logs com secrets.', blockerForRealApproval: true },
      { id: 'R-RS-04', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Filtros em validators impedem payloads longos (strings de base64 de pfx).', blockerForRealApproval: true },
      { id: 'R-RS-05', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Filtros em validators detectam URI strings.', blockerForRealApproval: true },
      { id: 'R-RS-06', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Matriz de Segregação (SoD) força checagem mútua de papeis antes de execução real.', blockerForRealApproval: true },
      { id: 'R-RS-07', severity: 'CRITICAL', probability: 'MEDIUM', impact: 'HIGH', mitigation: 'Approval matrix requer check-in do departamento jurídico e fiscal.', blockerForRealApproval: true },
      { id: 'R-RS-08', severity: 'MEDIUM', probability: 'MEDIUM', impact: 'HIGH', mitigation: 'Blueprint (fase 12.1) desenhou gateways, retry, e fallback constraints.', blockerForRealApproval: true },
      { id: 'R-RS-09', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Blueprint garante slot do xml-signer rodando atrelado a um vault real criptografado.', blockerForRealApproval: true },
      { id: 'R-RS-10', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Blueprint especificou kill switch obrigatório atrelado ao traffic shaping V1/V2.', blockerForRealApproval: true }
    ];
  }
}
