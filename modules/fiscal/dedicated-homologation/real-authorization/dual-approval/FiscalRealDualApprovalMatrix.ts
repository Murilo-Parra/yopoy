export class FiscalRealAuthorizationDualApprovalMatrix {
  public static getMatrix() {
    return {
      requiredRoles: ['Proprietário', 'Administrador'],
      declarations: {
        realApprovalGranted: false,
        dualApprovalCompleted: false,
        approvalRecordPersisted: false,
        approverANotifiedExternally: false,
        approverBNotifiedExternally: false,
        sameUserApprovalBlocked: true,
        realDualApprovalRequiresExplicitModule: true
      },
      rules: [
        'requester não pode ser approverA.',
        'requester não pode ser approverB.',
        'approverA não pode ser approverB.',
        'approverA e approverB devem ser papéis distintos.',
        'Master Admin pode simular revisão, mas não conclui aprovação real.'
      ]
    };
  }
}
