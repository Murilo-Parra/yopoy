export class FiscalProductionAuthorizationTokenIssueDenialPlan {
  public static getPlan() {
    return {
      authorizationTokenIssueDenialPlanGenerated: true,
      realAuthorizationTokenIssued: false,
      realActivationAuthorityGranted: false,
      description: 'Negar emissão de token/autorização real.'
    };
  }
}
