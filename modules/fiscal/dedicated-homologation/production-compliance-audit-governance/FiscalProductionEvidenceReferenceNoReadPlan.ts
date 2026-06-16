export class FiscalProductionEvidenceReferenceNoReadPlan {
  public static getPlan() {
    return {
      evidenceReferenceNoReadPlanGenerated: true,
      realPayloadRead: false,
      realXmlRead: false,
      realPdfRead: false,
      description: 'Referenciar evidências sem leitura real. Não ler payload, XML, PDF, PFX, certificado ou segredo.'
    };
  }
}
