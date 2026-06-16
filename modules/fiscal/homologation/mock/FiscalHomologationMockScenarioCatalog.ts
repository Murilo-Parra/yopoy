export class FiscalHomologationMockScenarioCatalog {
  public static getScenarios(): any[] {
    const defaultFlags = {
      usesRealSefaz: false as false,
      usesRealCertificate: false as false,
      usesRealXmlSigning: false as false,
      usesRealPdfGeneration: false as false,
      mockOnly: true as true,
      dryRunOnly: true as true,
      activationBlocked: true as true
    };

    return [
      { id: 'MOCK_NFE_AUTHORIZATION', name: 'NFe Authorization Mock', ...defaultFlags },
      { id: 'MOCK_NFCE_AUTHORIZATION', name: 'NFCe Authorization Mock', ...defaultFlags },
      { id: 'MOCK_CANCEL', name: 'Cancellation Mock', ...defaultFlags },
      { id: 'MOCK_INUTILIZATION', name: 'Inutilization Mock', ...defaultFlags },
      { id: 'MOCK_CONTINGENCY', name: 'Contingency Switch Mock', ...defaultFlags },
      { id: 'MOCK_CCE', name: 'Carta de Correção Mock', ...defaultFlags },
      { id: 'MOCK_DANFE_PREVIEW', name: 'DANFE Preview Mock', ...defaultFlags }
    ];
  }

  public static isValidScenario(scenarioId: string): boolean {
    return this.getScenarios().some(s => s.id === scenarioId);
  }
}
