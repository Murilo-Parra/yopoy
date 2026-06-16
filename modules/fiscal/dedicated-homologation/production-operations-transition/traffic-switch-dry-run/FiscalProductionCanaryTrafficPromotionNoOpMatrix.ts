export class FiscalProductionCanaryTrafficPromotionNoOpMatrix {
  public static getMatrix() {
    return {
      canaryTrafficPromotionNoOpMatrixGenerated: true,
      canaryActivated: false,
      realTrafficMirrored: false,
      description: 'Modelagem de promoção canary como no-op. Não ativa canary real nem espelha tráfego real.'
    };
  }
}
