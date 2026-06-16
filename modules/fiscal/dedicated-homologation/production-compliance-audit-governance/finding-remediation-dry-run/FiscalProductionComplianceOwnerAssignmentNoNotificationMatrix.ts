export class FiscalProductionComplianceOwnerAssignmentNoNotificationMatrix {
  public static getMatrix() {
    return {
      ownerAssignmentNoNotificationMatrixGenerated: true,
      realOwnerAssigned: false,
      realNotificationSent: false,
      description: 'Modelar owner assignment sem notificação. Não notificar owner, auditor, regulador ou stakeholder.'
    };
  }
}
