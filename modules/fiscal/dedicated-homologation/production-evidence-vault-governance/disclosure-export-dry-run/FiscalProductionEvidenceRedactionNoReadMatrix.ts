export class FiscalProductionEvidenceRedactionNoReadMatrix {
  public static getMatrix() {
    return {
      redactionNoReadMatrixGenerated: true,
      realPayloadRead: false,
      realXmlRead: false,
      realPdfRead: false,
      description: 'Modelar redaction sem ler payload real. Não acessar XML/PDF/PFX/certificado/segredo/token.'
    };
  }
}
