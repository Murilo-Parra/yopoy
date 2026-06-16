export class FiscalProductionComplianceEvidenceToFindingNoReadMatrix {
  public static getMatrix() {
    return {
      evidenceToFindingNoReadMatrixGenerated: true,
      realPayloadRead: false,
      realXmlRead: false,
      realPdfRead: false,
      description: 'Referenciar evidências para findings sem leitura real. Não ler payload, XML, PDF, PFX, certificado, segredo ou token.'
    };
  }
}
