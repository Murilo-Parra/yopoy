export class FiscalProductionNoLegalEffectReviewNotice {
  public static getNotice() {
    return {
      noLegalEffectReviewNoticeGenerated: true,
      realLegalEffectCreated: false,
      description: 'Aviso de ausência de efeito legal na revisão.'
    };
  }
}
