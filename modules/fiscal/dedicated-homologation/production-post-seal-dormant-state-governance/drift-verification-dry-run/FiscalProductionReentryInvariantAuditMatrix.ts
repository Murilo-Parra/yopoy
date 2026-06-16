export class FiscalProductionReentryInvariantAuditMatrix {
  public static getMatrix() {
    return {
      reentryInvariantAuditMatrixGenerated: true,
      realReentryPathCreated: false,
      description: 'Auditoria de invariantes de não reentrada.'
    };
  }
}
