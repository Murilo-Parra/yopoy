export class FiscalProductionEvidenceDisclosureRiskRegister {
  public static getRisks() {
    return [
      'R-PED-01: Risco de disclosure dry-run ser interpretado como exportação real.',
      'R-PED-02: Risco de pacote sanitizado ser confundido com pacote legal de auditoria.',
      'R-PED-03: Risco de recipient eligibility ser tratado como notificação real.',
      'R-PED-04: Risco de redaction no-read ser interpretada como redaction aplicada sobre payload real.',
      'R-PED-05: Risco de legal hold no-persistence ser confundido com legal hold jurídico persistido.',
      'R-PED-06: Risco de no-external-export evidence ser lido como comprovante de exportação.',
      'R-PED-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PED-08: Risco de testes temporários permanecerem no repositório.',
      'R-PED-09: Risco de namespace/export colidir com Domain 32, 33, 34, 35.1, 35.2 ou 35.3.',
      'R-PED-10: Risco de automação externa tratar disclosure no-op como pacote real para auditoria externa.'
    ];
  }
}
