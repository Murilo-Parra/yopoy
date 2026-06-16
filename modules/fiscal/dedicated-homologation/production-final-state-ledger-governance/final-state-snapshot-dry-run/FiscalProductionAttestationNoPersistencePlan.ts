export class FiscalProductionAttestationNoPersistencePlan {
  public static getPlan() {
    return {
      attestationNoPersistencePlanGenerated: true,
      realAttestationPersisted: false,
      realDatabaseWritten: false,
      description: 'Bloquear persistência real de atestado.'
    };
  }
}
