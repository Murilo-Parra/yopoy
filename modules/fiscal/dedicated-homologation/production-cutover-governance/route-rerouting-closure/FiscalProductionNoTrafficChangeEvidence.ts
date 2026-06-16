export class FiscalProductionNoTrafficChangeEvidence {
  public static getEvidence() {
    return {
      noTrafficChangeEvidenceGenerated: true,
      trafficChanged: false,
      requestCaptured: false,
      responseCaptured: false,
      payloadCaptured: false,
      requestDuplicated: false,
      realTrafficMirrored: false,
      shadowTrafficEnabled: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Evidência de ausência de alteração de tráfego. Não captura request/payload. Não duplica request. Não espelha tráfego.'
    };
  }
}
