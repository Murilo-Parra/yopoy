export class FiscalProductionEvidenceAccessNoReadMatrix {
  public static getMatrix() {
    return {
      evidenceAccessNoReadMatrixGenerated: true,
      realPayloadRead: false,
      realXmlRead: false,
      realPdfRead: false,
      description: 'Modelar matriz de acesso sem leitura real. Não ler payload, XML, PDF, PFX, certificado, segredo ou token.'
    };
  }
}
