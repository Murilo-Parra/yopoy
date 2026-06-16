export class FiscalProductionExecutiveSignOffSimulationMatrix {
  public static getMatrix() {
    return {
      executiveSignOffSimulationMatrixGenerated: true,
      realSignatureCollected: false,
      realExecutiveApprovalConcluded: false,
      description: 'Modelar sign-off executivo simulado. Não coletar assinatura real. Não concluir aprovação real.'
    };
  }
}
