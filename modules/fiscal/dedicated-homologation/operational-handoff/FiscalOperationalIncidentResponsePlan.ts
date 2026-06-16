export class FiscalOperationalIncidentResponsePlan {
  public static generatePlan() {
    return {
      incidentResponseGenerated: true,
      realIncidentOpened: false,
      realTicketCreated: false,
      externalEndpointCalled: false,
      description: 'Model of future incident response. Real incident not opened. Real ticket not created.'
    };
  }
}
