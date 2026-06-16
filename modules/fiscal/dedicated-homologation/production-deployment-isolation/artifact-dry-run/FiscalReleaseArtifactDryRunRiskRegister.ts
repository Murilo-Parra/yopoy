export class FiscalReleaseArtifactDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-RAD-01: Risco de manifesto administrativo ser interpretado como pacote executável.',
      'R-RAD-02: Risco de deployment package dry-run ser confundido com pacote publicado.',
      'R-RAD-03: Risco de integrity plan ser tratado como assinatura criptográfica real.',
      'R-RAD-04: Risco de non-executable contract ser ignorado por automações externas.',
      'R-RAD-05: Risco de dependency matrix ser usada como aprovação de release real.',
      'R-RAD-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
