export class FiscalProductionCommitteeDeliberationTrail {
  public static generateTrail() {
    return {
      deliberationTrailGenerated: true,
      realDeliberationPersisted: false,
      externalStakeholderNotified: false,
      description: 'In-memory deliberation trail. Does not persist a real trail or send real notifications.'
    };
  }
}
