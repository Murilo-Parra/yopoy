export class FiscalProductionOperationsNoRealAlertEvidence {
  public static getEvidence() {
    return {
      noRealAlertEvidenceGenerated: true,
      productionAlertCreated: false,
      realAlertRuleActivated: false,
      pagerDutySent: false,
      opsgenieSent: false,
      description: 'Evidenciar ausência de alerta produtivo real.'
    };
  }
}
