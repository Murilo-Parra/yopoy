export class FiscalProductionNoDisclosureNoExportHandoffService {
  public static simulateHandoff() {
    return {
      noDisclosureNoExportHandoffGenerated: true,
      realDisclosureApproved: false,
      realExportPackageCreated: false,
      realDisclosurePackageSent: false,
      description: 'Simular handoff de ausência de disclosure/export real.'
    };
  }
}
