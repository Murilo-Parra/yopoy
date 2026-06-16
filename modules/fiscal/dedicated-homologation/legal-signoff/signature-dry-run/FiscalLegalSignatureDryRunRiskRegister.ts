export class FiscalLegalSignatureDryRunRiskRegister {
  public static getRisks() {
    return [
      'R-LSD-01: Risco de mock signature ser interpretada como assinatura legal real.',
      'R-LSD-02: Risco de signature intent envelope ser confundido com documento assinado.',
      'R-LSD-03: Risco de quorum simulation ser tratado como quórum jurídico definitivo.',
      'R-LSD-04: Risco de SoD review documental ser tratado como validação legal final.',
      'R-LSD-05: Risco de signatário externo ser acionado sem novo gate.',
      'R-LSD-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
