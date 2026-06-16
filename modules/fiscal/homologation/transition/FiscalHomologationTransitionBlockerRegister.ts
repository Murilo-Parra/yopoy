export class FiscalHomologationTransitionBlockerRegister {
  public static getBlockers() {
    return [
      { id: 'B-HT-01', severity: 'CRITICAL', description: 'Ambiente dedicado de homologação ainda não existe.', mitigation: 'Build environment in next modules.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-02', severity: 'CRITICAL', description: 'Cofre de certificado real ainda não aprovado.', mitigation: 'Setup secure vault.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-03', severity: 'CRITICAL', description: 'SEFAZ homologação real ainda não autorizada.', mitigation: 'Authorize connection.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-04', severity: 'CRITICAL', description: 'XML signer real ainda não homologado.', mitigation: 'Validate signatures.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-05', severity: 'CRITICAL', description: 'DANFE/PDF real ainda não homologado.', mitigation: 'Validate PDFs.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-06', severity: 'HIGH', description: 'Rate limit para SEFAZ homologação ainda não definido.', mitigation: 'Configure limiters.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-07', severity: 'HIGH', description: 'Observabilidade persistente ainda não desenhada.', mitigation: 'Define tracing.', blockerForTransitionExecution: false, blockerForRealHomologation: true },
      { id: 'B-HT-08', severity: 'HIGH', description: 'Rollback operacional real ainda não testado.', mitigation: 'Test rollback.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-09', severity: 'HIGH', description: 'Kill switch operacional real ainda não ativável.', mitigation: 'Test kill switch.', blockerForTransitionExecution: true, blockerForRealHomologation: true },
      { id: 'B-HT-10', severity: 'MEDIUM', description: 'Janela formal de homologação ainda não aprovada.', mitigation: 'Schedule window.', blockerForTransitionExecution: false, blockerForRealHomologation: true }
    ];
  }
}
