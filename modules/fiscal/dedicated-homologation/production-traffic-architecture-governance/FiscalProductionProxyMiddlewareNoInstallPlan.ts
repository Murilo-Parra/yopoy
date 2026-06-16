export class FiscalProductionProxyMiddlewareNoInstallPlan {
  public static getPlan() {
    return {
      proxyMiddlewareNoInstallPlanGenerated: true,
      realProxyInstalled: false,
      realMiddlewareInstalled: false,
      realTapInstalled: false,
      description: 'Modelar proxy, middleware e tap sem instalação.'
    };
  }
}
