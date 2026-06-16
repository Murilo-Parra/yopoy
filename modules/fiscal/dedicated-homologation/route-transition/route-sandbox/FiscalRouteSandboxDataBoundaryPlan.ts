export class FiscalRouteSandboxDataBoundaryPlan {
  public static generatePlan() {
    return {
      dataBoundaryPlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Allowed data boundary for future sandbox. Synthetic safe-shapes only.'
    };
  }
}
