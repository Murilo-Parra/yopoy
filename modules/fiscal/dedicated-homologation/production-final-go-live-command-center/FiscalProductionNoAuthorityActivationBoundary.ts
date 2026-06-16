export class FiscalProductionNoAuthorityActivationBoundary {
  public static getBoundary() {
    return {
      noAuthorityActivationBoundaryGenerated: true,
      realActivationAuthorityGranted: false,
      description: 'Delimitar que nenhum usuário, rota, controller ou service recebe autoridade de ativação real.'
    };
  }
}
