export class FiscalProductionSnapshotNoRealHashPlan {
  public static getPlan() {
    return {
      snapshotNoRealHashPlanGenerated: true,
      noRealHashOnly: true,
      realHashGenerated: false,
      description: 'Impedir hash real.'
    };
  }
}
