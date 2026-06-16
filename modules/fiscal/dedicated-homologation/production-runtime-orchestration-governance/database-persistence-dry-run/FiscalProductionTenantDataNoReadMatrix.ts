export class FiscalProductionTenantDataNoReadMatrix {
  public static getMatrix() {
    return {
      tenantDataNoReadMatrixGenerated: true,
      realTenantDataRead: false,
      sensitiveDataIncluded: false,
      description: 'Bloquear leitura de dados reais de tenant.'
    };
  }
}
