export class FiscalRealCertificateBlueprint {
  public static getBlueprint() {
    return {
      futureA1Storage: 'Vault Criptográfico de Certificados Fiscais',
      rotationAndExpiration: 'Monitoramento via cron',
      accessPolicy: 'Apenas container de assinatura tem permissão IAM de leitura',
      futureManualValidation: 'Obrigatória na carga inicial do A1',
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false
    };
  }
}
