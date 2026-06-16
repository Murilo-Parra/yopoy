export class FiscalLegalSignOffRiskRegister {
  public static getRisks() {
    return [
      'R-LSO-01: Risco de blueprint ser interpretado como assinatura legal real.',
      'R-LSO-02: Risco de envelope não executável ser confundido com documento assinado.',
      'R-LSO-03: Risco de evidence dependency ser tratado como autorização jurídica.',
      'R-LSO-04: Risco de readiness checklist ser tratado como go-live legal.',
      'R-LSO-05: Risco de signatário externo ser acionado sem novo gate.',
      'R-LSO-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
