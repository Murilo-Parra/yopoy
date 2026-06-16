export class FiscalProductionArchiveMovementNoOpPlan {
  public static getPlan() {
    return {
      archiveMovementNoOpPlanGenerated: true,
      realArchiveMoved: false,
      realArchiveCompacted: false,
      description: 'Bloquear movimentação, compactação ou reclassificação real de archive.'
    };
  }
}
