export class FiscalProductionEvidenceIntegrityCustodyRiskRegister {
  public static getRisks() {
    return [
      'R-PEIC-01: Risco de integrity review dry-run ser interpretado como validação criptográfica real.',
      'R-PEIC-02: Risco de fingerprint não criptográfico ser confundido com hash legal real.',
      'R-PEIC-03: Risco de chain-of-custody no-persistence ser confundida com trilha jurídica persistida.',
      'R-PEIC-04: Risco de source lineage no-verify ser interpretado como verificação real de origem.',
      'R-PEIC-05: Risco de tamper-check no-read/no-crypto ser lido como inspeção real de payload.',
      'R-PEIC-06: Risco de completeness metadata matrix ser tratada como prova legal completa.',
      'R-PEIC-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEIC-08: Risco de testes temporários permanecerem no repositório.',
      'R-PEIC-09: Risco de namespace/export colidir com Domain 32, 33, 34, 35.1 ou 35.2.',
      'R-PEIC-10: Risco de automação externa tratar atestação no-op como evidência legal imutável real.'
    ];
  }
}
