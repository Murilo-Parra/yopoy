export class FiscalRealActionPlanRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-AP-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Flags explicitamente indicam não execução.', blockerForRealExecution: true },
      { id: 'R-AP-02', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Assinatura digital de payload desabilitada.', blockerForRealExecution: true },
      { id: 'R-AP-03', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Persistência não ativada, bypass de state management evitado.', blockerForRealExecution: true },
      { id: 'R-AP-04', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Validator escaneia por strings problemáticas como terraform e cloudformation.', blockerForRealExecution: true },
      { id: 'R-AP-05', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Campos textuais sanitizados e secrets bloqueados pelo builder.', blockerForRealExecution: true },
      { id: 'R-AP-06', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'DATABASE_URL filtrada do payload via whitelist negativa.', blockerForRealExecution: true },
      { id: 'R-AP-07', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Gate impõe fallback antes de qualquer chamada remota.', blockerForRealExecution: true },
      { id: 'R-AP-08', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Produção V2 flag explícita travada em false no plan handler.', blockerForRealExecution: true }
    ];
  }
}
