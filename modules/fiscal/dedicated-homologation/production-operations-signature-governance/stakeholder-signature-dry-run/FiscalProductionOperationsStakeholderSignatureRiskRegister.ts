export class FiscalProductionOperationsStakeholderSignatureRiskRegister {
  public static getRisks() {
    return [
      'R-POSS-01: Risco de signature evidence collection ser interpretada como coleta real.',
      'R-POSS-02: Risco de mock attestation envelope ser confundido com atestado real.',
      'R-POSS-03: Risco de stakeholder quorum simulation ser lida como aprovação real.',
      'R-POSS-04: Risco de signer eligibility review ser usado por automação externa como permissão de assinatura.',
      'R-POSS-05: Risco de no-real-signature-persistence evidence ser confundida com registro oficial.',
      'R-POSS-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POSS-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
