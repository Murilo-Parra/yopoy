export class FiscalProductionComplianceAuditFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PCAC-01: Risco de closure ser interpretado como encerramento operacional real.',
      'R-PCAC-02: Risco de evidence package ser confundido com dossiê real.',
      'R-PCAC-03: Risco de no-submission handoff ser interpretado como autorização real.',
      'R-PCAC-04: Risco de roadmap pós-closure ser tratado como plano executável.',
      'R-PCAC-05: Risco de UI ocultar estado simulation-only.',
      'R-PCAC-06: Risco de automação externa tratar closure como filing legal real.',
      'R-PCAC-07: Risco de auditoria externa confundir metadados com evidência persistida.',
      'R-PCAC-08: Risco de testes temporários permanecerem no repositório.',
      'R-PCAC-09: Risco de namespace/export colidir com domínios anteriores.',
      'R-PCAC-10: Risco de diretoria entender “GO documental” como autorização técnica real.'
    ];
  }
}
