export class FiscalProductionNoTrafficPromotionEvidence {
  public static getEvidence() {
    return {
      noTrafficPromotionEvidenceGenerated: true,
      realTrafficPromoted: false,
      trafficChanged: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      requestDuplicated: false,
      realTrafficMirrored: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Evidência de ausência de promoção real de tráfego. Não captura request/payload. Não duplica request. Não espelha tráfego.'
    };
  }
}
