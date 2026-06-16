export class FiscalHomologationClosureRiskRegister {
  public static getRisks(): any[] {
    return [
      { id: 'R-HC-01', severity: 'CRITICAL', description: 'Interpretação indevida do Closure como aprovação de homologação real.', mitigation: 'Documentation strictly labeling it as administrative mock.', blockerForRealHomologation: true },
      { id: 'R-HC-02', severity: 'CRITICAL', description: 'Ausência de homologação real validada.', mitigation: 'Dedicated physical execution required in future.', blockerForRealHomologation: true },
      { id: 'R-HC-03', severity: 'CRITICAL', description: 'Ausência de SEFAZ real validada na V2.', mitigation: 'Execute in dedicated homologation with true certificates.', blockerForRealHomologation: true },
      { id: 'R-HC-04', severity: 'CRITICAL', description: 'Ausência de certificado real validado em ambiente seguro.', mitigation: 'Test PFX keys directly before production.', blockerForRealHomologation: true },
      { id: 'R-HC-05', severity: 'CRITICAL', description: 'Ausência de XML signer real homologado.', mitigation: 'Verify node-forge/xml-crypto implementation logic.', blockerForRealHomologation: true },
      { id: 'R-HC-06', severity: 'CRITICAL', description: 'Ausência de PDF/DANFE real homologado.', mitigation: 'Visually verify emitted PDFs via puppeteer/pdfkit configs.', blockerForRealHomologation: true },
      { id: 'R-HC-07', severity: 'CRITICAL', description: 'Ausência de tráfego real validado.', mitigation: 'Traffic capture passive required.', blockerForRealHomologation: true },
      { id: 'R-HC-08', severity: 'CRITICAL', description: 'Ausência de ambiente dedicado real de homologação.', mitigation: 'DevOps to spin up exact reproduction.', blockerForRealHomologation: true },
      { id: 'R-HC-09', severity: 'HIGH', description: 'Necessidade futura de testes por UF.', mitigation: 'UF-specific routing verifications.', blockerForRealHomologation: true },
      { id: 'R-HC-10', severity: 'HIGH', description: 'Necessidade futura de testes por regime tributário.', mitigation: 'CRT-specific payload generation tests.', blockerForRealHomologation: true },
      { id: 'R-HC-11', severity: 'HIGH', description: 'Necessidade futura de observabilidade persistente.', mitigation: 'Configure APM traces for homologation paths.', blockerForRealHomologation: false },
      { id: 'R-HC-12', severity: 'MEDIUM', description: 'Necessidade futura de janela formal de homologação.', mitigation: 'Align change schedule.', blockerForRealHomologation: false }
    ];
  }
}
