export class FiscalProductionFirewallApprovalScopeNoOpPlan {
  public static getPlan() {
    return {
      approvalScopeNoOpPlanGenerated: true,
      activationBlocked: true,
      approvedForRealExecutiveApproval: false,
      description: 'Delimitar o escopo de aprovação como no-op. Manter activationBlocked: true. Manter approvedForRealExecutiveApproval: false.'
    };
  }
}
