export class FiscalProductionEvidenceVaultGovernanceRiskRegister {
  public static getRisks() {
    return [
      'R-PEVG-01: Risco de blueprint de vault ser interpretado como vault real.',
      'R-PEVG-02: Risco de audit trail in-memory ser confundido com trilha legal persistida.',
      'R-PEVG-03: Risco de hashing no-crypto ser interpretado como hash criptográfico real.',
      'R-PEVG-04: Risco de retention no-op ser usado como política real de retenção.',
      'R-PEVG-05: Risco de export no-op ser confundido com exportação real.',
      'R-PEVG-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEVG-07: Risco de testes temporários permanecerem no repositório.',
      'R-PEVG-08: Risco de namespace/export colidir com Domain 32, 33 ou 34.x.',
      'R-PEVG-09: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo .address().',
      'R-PEVG-10: Risco de automação externa ler o blueprint como sinal de evidência legal imutável real.'
    ];
  }
}
