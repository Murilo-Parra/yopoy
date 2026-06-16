export class FiscalRealChangeWindowRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-CW-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy bloqueia flags forces. Janela logicamente restrita.', blockerForRealExecution: true },
      { id: 'R-CW-02', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Execução só pode ocorrer por CI restrito, bloqueado neste estágio.', blockerForRealExecution: true },
      { id: 'R-CW-03', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Plano de rollback incluso na blueprint documental.', blockerForRealExecution: true },
      { id: 'R-CW-04', severity: 'MEDIUM', probability: 'LOW', impact: 'LOW', mitigation: 'Plano de comunicação estruturado.', blockerForRealExecution: true },
      { id: 'R-CW-05', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Dry-run no 12.2 impede vars incorretos.', blockerForRealExecution: true },
      { id: 'R-CW-06', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Contract de Vault foi revisado.', blockerForRealExecution: true },
      { id: 'R-CW-07', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Acesso A1 bloqueado na etapa 12.2.', blockerForRealExecution: true },
      { id: 'R-CW-08', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Blueprint 12.1 tem regras de rate limit desenhadas.', blockerForRealExecution: true },
      { id: 'R-CW-09', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Signer não provisonado.', blockerForRealExecution: true },
      { id: 'R-CW-10', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Kill switches inativos/bloqueados.', blockerForRealExecution: true }
    ];
  }
}
