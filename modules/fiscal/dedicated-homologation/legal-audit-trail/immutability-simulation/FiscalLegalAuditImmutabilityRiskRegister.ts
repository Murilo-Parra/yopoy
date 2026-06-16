export class FiscalLegalAuditImmutabilityRiskRegister {
  public static getRisks() {
    return [
      'R-LAI-01: Risco de hash mock ser interpretado como prova legal definitiva.',
      'R-LAI-02: Risco de envelope mock ser interpretado como assinatura real.',
      'R-LAI-03: Risco de digest incluir payload sensível.',
      'R-LAI-04: Risco de certificado real ser inserido em metadata.',
      'R-LAI-05: Risco de verificação mock ser confundida com validação criptográfica real.',
      'R-LAI-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
