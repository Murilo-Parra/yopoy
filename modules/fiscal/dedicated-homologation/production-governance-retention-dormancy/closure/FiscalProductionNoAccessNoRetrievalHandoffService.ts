export class FiscalProductionNoAccessNoRetrievalHandoffService {
  public static simulateHandoff() {
    return {
      noAccessNoRetrievalHandoffGenerated: true,
      realAccessGranted: false,
      realRecordRetrieved: false,
      realArchiveRead: false,
      description: 'Simular handoff de ausência de acesso/retrieval real.'
    };
  }
}
