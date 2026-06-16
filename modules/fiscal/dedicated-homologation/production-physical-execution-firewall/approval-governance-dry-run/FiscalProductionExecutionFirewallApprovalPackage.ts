export class FiscalProductionExecutionFirewallApprovalPackage {
  public static getPackage() {
    return {
      approvalPackageGenerated: true,
      realExecutiveApprovalConcluded: false,
      realApprovalRecordPersisted: false,
      description: 'Modelar pacote administrativo de aprovação do firewall. Não aprovar execução real. Não persistir approval record real.'
    };
  }
}
