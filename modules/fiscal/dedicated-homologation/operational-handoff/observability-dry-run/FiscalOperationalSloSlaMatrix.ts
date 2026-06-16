export class FiscalOperationalSloSlaMatrix {
  public static generateMatrix() {
    return {
      sloSlaMatrixGenerated: true,
      productionAlertCreated: false,
      realIncidentResponseTriggered: false,
      description: 'Map of future SLO/SLA in documental mode. No production alerts created. No real incident response triggered.'
    };
  }
}
