export class FiscalHomologationRiskReviewService {
  public static getRisks(): any[] {
    return [
      { id: 'R-HR-01', severity: 'CRITICAL', description: 'Métricas mock não equivalem à homologação SEFAZ real.', mitigation: 'Do not extrapolate mock success to real success.', blockerForRealHomologation: true },
      { id: 'R-HR-02', severity: 'CRITICAL', description: 'Ausência de certificado real validado em cofre seguro.', mitigation: 'Validate PFX with Vault in next phase.', blockerForRealHomologation: true },
      { id: 'R-HR-03', severity: 'CRITICAL', description: 'Ausência de assinatura XML real.', mitigation: 'Test crypto algorithms against schemas.', blockerForRealHomologation: true },
      { id: 'R-HR-04', severity: 'CRITICAL', description: 'Ausência de PDF/DANFE real.', mitigation: 'Visual inspection needed.', blockerForRealHomologation: true },
      { id: 'R-HR-05', severity: 'HIGH', description: 'Ausência de ambiente dedicado de homologação.', mitigation: 'Infrastructure planning.', blockerForRealHomologation: true },
      { id: 'R-HR-06', severity: 'MEDIUM', description: 'Necessidade futura de testes por UF.', mitigation: 'Mock regional SEFAZ endpoints.', blockerForRealHomologation: false },
      { id: 'R-HR-07', severity: 'MEDIUM', description: 'Necessidade futura de testes por regime tributário.', mitigation: 'Create specific payload scenarios.', blockerForRealHomologation: false },
      { id: 'R-HR-08', severity: 'HIGH', description: 'Necessidade futura de volume mínimo por cenário.', mitigation: 'Stress the mock harness.', blockerForRealHomologation: true },
      { id: 'R-HR-09', severity: 'HIGH', description: 'Necessidade futura de observabilidade persistente.', mitigation: 'Forward metrics to Datadog/ELK.', blockerForRealHomologation: true },
      { id: 'R-HR-10', severity: 'HIGH', description: 'Risco de falso positivo em mocks.', mitigation: 'Keep mock schemas updated with SEFAZ spec.', blockerForRealHomologation: true }
    ];
  }
}
