export class FiscalRealProvisioningFinalRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-RC-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Mensagens declaram status de fechamento apenas documental.', blockerForRealExecution: true },
      { id: 'R-RC-02', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Bloqueio administrativo nas policies.', blockerForRealExecution: true },
      { id: 'R-RC-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Bloqueio forçado (IaC applied remains false).', blockerForRealExecution: true },
      { id: 'R-RC-04', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Validators impedem push de credenciais não criptografadas.', blockerForRealExecution: true },
      { id: 'R-RC-05', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Acesso bloqueado na fase 12.2.', blockerForRealExecution: true },
      { id: 'R-RC-06', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Mock SEFAZ usado no proxy em sandbox.', blockerForRealExecution: true },
      { id: 'R-RC-07', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Nenhuma assinatura fora do signer seguro aprovado.', blockerForRealExecution: true },
      { id: 'R-RC-08', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Flags hardcoded false pre-authorization.', blockerForRealExecution: true },
      { id: 'R-RC-09', severity: 'MEDIUM', probability: 'LOW', impact: 'HIGH', mitigation: 'Dry-run do rollback documentado na blueprint.', blockerForRealExecution: true },
      { id: 'R-RC-10', severity: 'LOW', probability: 'LOW', impact: 'LOW', mitigation: 'Audit records em memória testados.', blockerForRealExecution: true }
    ];
  }
}
