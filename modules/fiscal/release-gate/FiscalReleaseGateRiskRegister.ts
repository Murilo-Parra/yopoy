export class FiscalReleaseGateRiskRegister {
  public static getRisks(): any[] {
    return [
      { id: 'R-RG-01', severity: 'CRITICAL', description: 'Interpretação indevida do Release Gate como aprovação de produção', mitigation: 'Strict flagging and hardcoded NO_GO enforcement in code.', blockerForRelease: true },
      { id: 'R-RG-02', severity: 'CRITICAL', description: 'Ausência de tráfego real validado', mitigation: 'Load tests and active shadow proxy to be run.', blockerForRelease: true },
      { id: 'R-RG-03', severity: 'CRITICAL', description: 'Ausência de load test real', mitigation: 'Load tests to be planned and executed before release.', blockerForRelease: true },
      { id: 'R-RG-04', severity: 'CRITICAL', description: 'Ausência de SEFAZ real na V2', mitigation: 'Homologation phase against SEFAZ Sandbox must be executed.', blockerForRelease: true },
      { id: 'R-RG-05', severity: 'CRITICAL', description: 'Ausência de assinatura XML real na V2', mitigation: 'XML tests with mock certificates to be run prior to production certificates.', blockerForRelease: true },
      { id: 'R-RG-06', severity: 'CRITICAL', description: 'Ausência de PDF real na V2', mitigation: 'PDF testing in sandbox required.', blockerForRelease: true },
      { id: 'R-RG-07', severity: 'HIGH', description: 'Risco de latência futura em middleware/tap real', mitigation: 'Strict latency budget enforcement.', blockerForRelease: true },
      { id: 'R-RG-08', severity: 'HIGH', description: 'Risco de divergência entre sandbox/shadow e produção', mitigation: 'Continuous shadow telemetry monitoring.', blockerForRelease: true },
      { id: 'R-RG-09', severity: 'HIGH', description: 'Necessidade futura de rollback operacional real', mitigation: 'Automated rollback via Canary Control Plane.', blockerForRelease: true },
      { id: 'R-RG-10', severity: 'HIGH', description: 'Necessidade futura de circuit breaker e kill switch produtivo', mitigation: 'Mandatory before productive release.', blockerForRelease: true },
      { id: 'R-RG-11', severity: 'MEDIUM', description: 'Necessidade futura de observabilidade persistente', mitigation: 'Export telemetry to external observability tools.', blockerForRelease: false },
      { id: 'R-RG-12', severity: 'MEDIUM', description: 'Necessidade futura de janela controlada de homologação', mitigation: 'Release procedure documentation.', blockerForRelease: false }
    ];
  }
}
