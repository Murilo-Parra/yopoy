export class FiscalProductionAuthorizationDeliberationCharter {
  public static getCharter() {
    return {
      deliberationCharterGenerated: true,
      realDeliberationCompleted: false,
      realAuthorizationGranted: false,
      description: 'Modelagem do charter administrativo da deliberação. Não conclui deliberação real.'
    };
  }
}
