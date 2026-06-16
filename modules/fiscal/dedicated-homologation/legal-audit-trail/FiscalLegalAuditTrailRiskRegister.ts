export class FiscalLegalAuditTrailRiskRegister {
  public static getRisks() {
    return [
      'R-LAT-01: Risco de blueprint ser interpretado como ledger real.',
      'R-LAT-02: Risco de contrato de isolamento ser interpretado como autorização de persistência.',
      'R-LAT-03: Risco de pacote de evidência conter payload sensível.',
      'R-LAT-04: Risco de política de retenção ser aplicada como exclusão real.',
      'R-LAT-05: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
