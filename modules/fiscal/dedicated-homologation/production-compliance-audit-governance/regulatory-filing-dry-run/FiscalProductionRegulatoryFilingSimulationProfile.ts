export class FiscalProductionRegulatoryFilingSimulationProfile {
  public static getProfile() {
    return {
      filingSimulationProfileGenerated: true,
      realRegulatoryFilingSubmitted: false,
      realFilingRecordPersisted: false,
      description: 'Modelar perfil simulado de filing regulatório. Não submeter filing real. Não criar registro real.'
    };
  }
}
