export class FiscalProductionEvidenceNoPersistenceHandoffService {
  public static getHandoff() {
    return {
      noPersistenceHandoffGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      description: 'Modelar handoff final sem persistência e sem ativação. Não conceder autorização real. Não destravar gate real. Não ativar Produção V2.'
    };
  }
}
