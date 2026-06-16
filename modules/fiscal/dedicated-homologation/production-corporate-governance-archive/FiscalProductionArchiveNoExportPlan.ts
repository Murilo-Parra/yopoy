export class FiscalProductionArchiveNoExportPlan {
  public static getPlan() {
    return {
      archiveNoExportPlanGenerated: true,
      realArchiveExported: false,
      realArchivePackageSent: false,
      description: 'Impedir exportação real.'
    };
  }
}
