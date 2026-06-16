export class FiscalProductionComplianceAuditGovernanceRiskRegister {
  public static getRisks() {
    return [
      'R-PCAG-01: Risco de compliance blueprint ser interpretado como auditoria real.',
      'R-PCAG-02: Risco de no-submission boundary ser confundido com submissão regulatória feita.',
      'R-PCAG-03: Risco de audit dossier no-file ser tratado como dossiê real.',
      'R-PCAG-04: Risco de requirement metadata matrix ser lida como checklist legal persistido.',
      'R-PCAG-05: Risco de evidence reference no-read ser confundido com validação de evidência real.',
      'R-PCAG-06: Risco de external submission no-op ser entendido como comunicação externa efetiva.',
      'R-PCAG-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PCAG-08: Risco de testes temporários permanecerem no repositório.',
      'R-PCAG-09: Risco de namespace/export colidir com Domains 32, 33, 34 ou 35.',
      'R-PCAG-10: Risco de automação externa tratar a governança de auditoria como filing legal real.'
    ];
  }
}
