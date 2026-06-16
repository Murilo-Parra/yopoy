export class FiscalProductionEvidenceTamperCheckNoReadNoCryptoPlan {
  public static getPlan() {
    return {
      tamperCheckNoReadNoCryptoPlanGenerated: true,
      realPayloadRead: false,
      realCryptoUsed: false,
      tamperCheckPersisted: false,
      description: 'Modelar tamper-check documental. Não ler payload real. Não usar crypto real. Não persistir tamper-check real.'
    };
  }
}
