export class FiscalProductionEvidenceSourceAuthenticityNoVerifyPlan {
  public static getPlan() {
    return {
      sourceAuthenticityNoVerifyPlanGenerated: true,
      realSourceAuthenticityVerified: false,
      description: 'Modelar autenticidade de origem sem verificação real. Não consultar fonte externa. Não assinar/verificar criptograficamente.'
    };
  }
}
