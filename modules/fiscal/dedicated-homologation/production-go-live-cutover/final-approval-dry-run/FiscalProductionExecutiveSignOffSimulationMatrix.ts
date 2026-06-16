export class FiscalProductionExecutiveSignOffSimulationMatrix {
  public static getMatrix() {
    return {
      executiveSignOffSimulationMatrixGenerated: true,
      realExecutiveSignOffConcluded: false,
      realSignatureCollected: false,
      description: 'Modelar sign-off executivo como simulação. Não concluir sign-off real. Não coletar assinatura real.'
    };
  }
}
