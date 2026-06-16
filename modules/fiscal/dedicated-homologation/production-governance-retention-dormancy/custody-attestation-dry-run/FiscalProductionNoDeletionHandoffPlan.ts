export class FiscalProductionNoDeletionHandoffPlan {
  public static getPlan() {
    return {
      noDeletionHandoffPlanGenerated: true,
      realDataExpired: false,
      realDataDeleted: false,
      description: 'Simular handoff sem expiração, deleção ou alteração real de lifecycle.'
    };
  }
}
