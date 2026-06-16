import { FiscalReleaseReadinessClosureRisk } from './FiscalReleaseReadinessClosureTypes';

export class FiscalReleaseReadinessClosureRiskRegister {
  public static getRisks(): FiscalReleaseReadinessClosureRisk[] {
    return [
      { id: 'R-FRC-01', severity: 'CRITICAL', description: 'Interpretação indevida do Closure como aprovação de release real.', mitigation: 'Documentation strictly labeling it as simulated phase.', blockerForRealRelease: true },
      { id: 'R-FRC-02', severity: 'CRITICAL', description: 'Ausência de release real validado.', mitigation: 'Dedicated physical release needed.', blockerForRealRelease: true },
      { id: 'R-FRC-03', severity: 'CRITICAL', description: 'Ausência de Canary real validado.', mitigation: 'Canary activation necessary before production.', blockerForRealRelease: true },
      { id: 'R-FRC-04', severity: 'CRITICAL', description: 'Ausência de SEFAZ real homologado na V2.', mitigation: 'Dedicated SEFAZ Homologation required.', blockerForRealRelease: true },
      { id: 'R-FRC-05', severity: 'CRITICAL', description: 'Ausência de XML signer real homologado na V2.', mitigation: 'Cert validations against SEFAZ required.', blockerForRealRelease: true },
      { id: 'R-FRC-06', severity: 'CRITICAL', description: 'Ausência de PDF/DANFE real homologado na V2.', mitigation: 'Visual checks missing.', blockerForRealRelease: true },
      { id: 'R-FRC-07', severity: 'CRITICAL', description: 'Ausência de rollback real testado sob carga.', mitigation: 'Load testing with rollback maneuvers.', blockerForRealRelease: true },
      { id: 'R-FRC-08', severity: 'CRITICAL', description: 'Ausência de circuit breaker produtivo instalado.', mitigation: 'Wait for operational implementation.', blockerForRealRelease: true },
      { id: 'R-FRC-09', severity: 'CRITICAL', description: 'Ausência de kill switch produtivo instalado.', mitigation: 'Wait for operational implementation.', blockerForRealRelease: true },
      { id: 'R-FRC-10', severity: 'HIGH', description: 'Necessidade futura de homologação com certificados reais em ambiente seguro.', mitigation: 'Isolated environment for PFX testing.', blockerForRealRelease: true },
      { id: 'R-FRC-11', severity: 'HIGH', description: 'Necessidade futura de observabilidade persistente operacional.', mitigation: 'Full metrics backends configuration.', blockerForRealRelease: true },
      { id: 'R-FRC-12', severity: 'MEDIUM', description: 'Necessidade futura de janela formal de release controlado.', mitigation: 'Runbook creation.', blockerForRealRelease: false }
    ];
  }
}
