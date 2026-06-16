export class FiscalProductionObservabilityToolNoConnectionMatrix {
  public static getMatrix() {
    return {
      observabilityToolNoConnectionMatrixGenerated: true,
      prometheusConnected: false,
      grafanaConnected: false,
      datadogConnected: false,
      newRelicConnected: false,
      description: 'Documentar ferramentas não conectadas.'
    };
  }
}
