export class FiscalRollbackRiskRegister {
  public static getRisks(): any[] {
    return [
      { id: 'R-RB-01', severity: 'CRITICAL', description: 'Interpretação indevida do plano como autorização de rollback real.', mitigation: 'Inert models and logic safeguards.', blockerForExecution: true },
      { id: 'R-RB-02', severity: 'CRITICAL', description: 'Ausência de circuit breaker produtivo instalado.', mitigation: 'Must be installed before release.', blockerForExecution: true },
      { id: 'R-RB-03', severity: 'CRITICAL', description: 'Ausência de kill switch produtivo ativo.', mitigation: 'Must be active before release.', blockerForExecution: true },
      { id: 'R-RB-04', severity: 'CRITICAL', description: 'Ausência de homologação SEFAZ real.', mitigation: 'Environment must be built and validated.', blockerForExecution: true },
      { id: 'R-RB-05', severity: 'HIGH', description: 'Ausência de XML signer real validado em V2.', mitigation: 'Mock testing and homologation needed.', blockerForExecution: true },
      { id: 'R-RB-06', severity: 'HIGH', description: 'Ausência de PDF real validado em V2.', mitigation: 'Sandbox validation needed.', blockerForExecution: true },
      { id: 'R-RB-07', severity: 'HIGH', description: 'Necessidade futura de teste de rollback sob carga.', mitigation: 'Include in load planning testing.', blockerForExecution: false },
      { id: 'R-RB-08', severity: 'MEDIUM', description: 'Necessidade futura de rollback por tenant.', mitigation: 'Feature flags specific per tenant.', blockerForExecution: false },
      { id: 'R-RB-09', severity: 'MEDIUM', description: 'Necessidade futura de circuit breaker por UF/SEFAZ.', mitigation: 'Regional resilience rules.', blockerForExecution: false },
      { id: 'R-RB-10', severity: 'HIGH', description: 'Necessidade futura de painel operacional de emergência.', mitigation: 'Implement central emergency dashboard.', blockerForExecution: true },
      { id: 'R-RB-11', severity: 'MEDIUM', description: 'Necessidade futura de trilha persistente de decisões críticas.', mitigation: 'Store evaluations in persistent logs.', blockerForExecution: false },
      { id: 'R-RB-12', severity: 'CRITICAL', description: 'Risco de configuração incorreta de kill switch quando for implementado.', mitigation: 'Multi-stage validation of kill switch configs.', blockerForExecution: true }
    ];
  }
}
