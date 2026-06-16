export class FiscalProductionCanaryScopeCatalog {
  public static generateCatalog(input?: any) {
    return {
      scopeCatalogGenerated: true,
      canaryActivated: false,
      companiesIncludedInRealCanary: [],
      description: 'Model of future canary scopes per tenant/company/CNPJ. No company was included in a real canary.'
    };
  }
}
