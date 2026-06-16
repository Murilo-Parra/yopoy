export class FiscalProductionEvidenceIntakeRiskRegister {
  public static getRisks() {
    return [
      'R-PEI-01: Risco de intake dry-run ser interpretado como ingestão real.',
      'R-PEI-02: Risco de metadados sanitizados serem confundidos com payload validado.',
      'R-PEI-03: Risco de classification dry-run ser tratada como classificação legal persistida.',
      'R-PEI-04: Risco de source authenticity no-verify ser confundido com verificação criptográfica real.',
      'R-PEI-05: Risco de deduplication no-hash ser interpretada como hash real.',
      'R-PEI-06: Risco de chain-of-custody no-persistence ser confundida com trilha jurídica real.',
      'R-PEI-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEI-08: Risco de testes temporários permanecerem no repositório.',
      'R-PEI-09: Risco de namespace/export colidir com Domain 32, 33, 34 ou 35.1.',
      'R-PEI-10: Risco de automação externa tratar intake no-op como evidência legal imutável real.'
    ];
  }
}
