export class FiscalProductionEvidenceVaultFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PEVC-01: Risco de closure do Domínio 35 ser interpretado como vault real criado.',
      'R-PEVC-02: Risco de final evidence package ser confundido com evidência legal persistida.',
      'R-PEVC-03: Risco de handoff sem persistência ser confundido com autorização operacional real.',
      'R-PEVC-04: Risco de roadmap pós-closure ser lido como aprovação para Produção V2.',
      'R-PEVC-05: Risco de inventário final ser tratado como trilha legal auditável persistida.',
      'R-PEVC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEVC-07: Risco de testes temporários permanecerem no repositório.',
      'R-PEVC-08: Risco de namespace/export colidir com Domain 32, 33, 34, 35.1, 35.2, 35.3 ou 35.4.',
      'R-PEVC-09: Risco de automação externa tratar closure no-op como evidência imutável real.',
      'R-PEVC-10: Risco de auditoria externa interpretar pacote final como pacote juridicamente persistido.'
    ];
  }
}
