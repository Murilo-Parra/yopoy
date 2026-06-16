export class FiscalRealExecutionGateRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-EG-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy bloqueia flags forces.', blockerForRealExecution: true },
      { id: 'R-EG-02', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'O gate está rigidamente fechado e reporta explicitly false para o unlock.', blockerForRealExecution: true },
      { id: 'R-EG-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Nenhum script produtivo é acionado.', blockerForRealExecution: true },
      { id: 'R-EG-04', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Módulo de handoff garante o limite de controle.', blockerForRealExecution: true },
      { id: 'R-EG-05', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Validação no nível de authorization wrapper reflete bloqueios aqui.', blockerForRealExecution: true }
    ];
  }
}
