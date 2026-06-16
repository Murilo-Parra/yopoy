export class FiscalProductionFilingStatusNoSubmitReviewMatrix {
  public static getMatrix() {
    return {
      filingStatusNoSubmitReviewMatrixGenerated: true,
      realRegulatoryFilingSubmitted: false,
      realProtocolNumberGenerated: false,
      description: 'Modelar status de filing sem submissão. Não submeter filing real. Não gerar protocolo real.'
    };
  }
}
