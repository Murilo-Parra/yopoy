export class FiscalProductionBaselineEvidenceGovernancePlan {
  public static getPlan() {
    return {
      evidenceGovernancePlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realAuthorizationGranted: false,
      description: 'Modelagem governança documental das evidências. Não persiste evidência real com payload bruto nem concede autorização real.'
    };
  }
}
