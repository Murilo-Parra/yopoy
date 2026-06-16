export class FiscalProductionEvidenceNonCryptographicFingerprintPlan {
  public static getPlan() {
    return {
      nonCryptographicFingerprintPlanGenerated: true,
      realHashCalculated: false,
      realCryptoUsed: false,
      description: 'Modelar fingerprint não criptográfico apenas como metadado. Não calcular hash real. Não usar crypto.'
    };
  }
}
