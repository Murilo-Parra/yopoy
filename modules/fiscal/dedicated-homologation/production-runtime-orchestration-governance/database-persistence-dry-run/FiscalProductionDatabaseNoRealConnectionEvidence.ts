export class FiscalProductionDatabaseNoRealConnectionEvidence {
  public static getEvidence() {
    return {
      databaseNoRealConnectionEvidenceGenerated: true,
      realDatabaseConnected: false,
      realConnectionPoolCreated: false,
      description: 'Evidenciar ausência de conexão real com banco.'
    };
  }
}
