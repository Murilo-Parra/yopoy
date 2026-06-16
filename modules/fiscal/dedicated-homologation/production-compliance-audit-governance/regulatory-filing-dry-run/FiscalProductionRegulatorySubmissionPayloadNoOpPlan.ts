export class FiscalProductionRegulatorySubmissionPayloadNoOpPlan {
  public static getPlan() {
    return {
      submissionPayloadNoOpPlanGenerated: true,
      realSubmissionPayloadSent: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelar payload de submissão como no-op e metadata-only. Não enviar payload real a órgão regulador. Não incluir XML/PDF/PFX/certificado/senhas/tokens.'
    };
  }
}
