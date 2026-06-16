export class FiscalHomologationRiskRegister {
  public static getRisks(): any[] {
    return [
      { id: 'R-HB-01', severity: 'CRITICAL', description: 'Interpretação indevida do blueprint como autorização de homologação real.', mitigation: 'Inert logic and simulation-only flags.', blockerForHomologationExecution: true },
      { id: 'R-HB-02', severity: 'CRITICAL', description: 'Ausência de SEFAZ real validado na V2.', mitigation: 'Needs actual execution in Phase 10.2+.', blockerForHomologationExecution: true },
      { id: 'R-HB-03', severity: 'CRITICAL', description: 'Ausência de certificado A1 real validado em ambiente seguro.', mitigation: 'Will be validated later with vault.', blockerForHomologationExecution: true },
      { id: 'R-HB-04', severity: 'CRITICAL', description: 'Ausência de XML signer real homologado.', mitigation: 'Needs real execution later.', blockerForHomologationExecution: true },
      { id: 'R-HB-05', severity: 'CRITICAL', description: 'Ausência de PDF/DANFE real homologado.', mitigation: 'Needs sandbox rendering test later.', blockerForHomologationExecution: true },
      { id: 'R-HB-06', severity: 'HIGH', description: 'Necessidade futura de isolamento de rede.', mitigation: 'Infrastructure setup required.', blockerForHomologationExecution: true },
      { id: 'R-HB-07', severity: 'HIGH', description: 'Necessidade futura de banco dedicado de homologação.', mitigation: 'Dedicated Postgres required.', blockerForHomologationExecution: true },
      { id: 'R-HB-08', severity: 'HIGH', description: 'Necessidade futura de rate limit para SEFAZ.', mitigation: 'Implement rate limiter for SEFAZ calls.', blockerForHomologationExecution: true },
      { id: 'R-HB-09', severity: 'HIGH', description: 'Necessidade futura de logs persistentes de auditoria.', mitigation: 'Setup ELK/Datadog for audit.', blockerForHomologationExecution: false },
      { id: 'R-HB-10', severity: 'HIGH', description: 'Necessidade futura de plano de rollback testado.', mitigation: 'Execute simulation first.', blockerForHomologationExecution: true },
      { id: 'R-HB-11', severity: 'MEDIUM', description: 'Necessidade futura de janela formal de homologação.', mitigation: 'Schedule change window.', blockerForHomologationExecution: false },
      { id: 'R-HB-12', severity: 'CRITICAL', description: 'Risco futuro de divergência entre mock e SEFAZ real.', mitigation: 'Compare mock schemas with SEFAZ actual WSDL.', blockerForHomologationExecution: true }
    ];
  }
}
