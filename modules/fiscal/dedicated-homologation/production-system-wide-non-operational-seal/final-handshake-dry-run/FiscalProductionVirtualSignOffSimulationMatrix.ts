export class FiscalProductionVirtualSignOffSimulationMatrix {
  public static getMatrix() {
    return {
      virtualSignOffSimulationMatrixGenerated: true,
      realSignOffConcluded: false,
      realSignatureCollected: false,
      description: 'Simular sign-off virtual. Não concluir sign-off real. Não coletar assinatura real.'
    };
  }
}
