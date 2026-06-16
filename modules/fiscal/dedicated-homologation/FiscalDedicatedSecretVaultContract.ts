export class FiscalDedicatedSecretVaultContract {
  public static getContract() {
    return {
      description: 'Futuro cofre de secrets',
      policiesPlanned: true as true,
      rotationPlanned: true as true,
      secretLoaded: false as false,
      credentialMaterialized: false as false
    };
  }
}
