export class FiscalRealApprovalSignatureRiskRegister {
  public static getRisks() {
    return [
      'R-AMS-01: Risco de assinatura mock ser interpretada como assinatura legal.',
      'R-AMS-02: Risco de fingerprint fake ser confundido com certificado real.',
      'R-AMS-03: Risco de endpoint externo ser chamado por integração não autorizada.',
      'R-AMS-04: Risco de segredo real inserido em metadata.',
      'R-AMS-05: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
