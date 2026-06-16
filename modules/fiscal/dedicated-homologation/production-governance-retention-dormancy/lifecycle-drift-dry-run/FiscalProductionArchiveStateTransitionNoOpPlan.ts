export class FiscalProductionArchiveStateTransitionNoOpPlan {
  public static getPlan() {
    return {
      archiveStateTransitionNoOpPlanGenerated: true,
      realArchiveStateTransitioned: false,
      realArchiveMoved: false,
      realArchiveCompacted: false,
      realArchiveReclassified: false,
      description: 'Bloquear transição real de estado do archive.'
    };
  }
}
