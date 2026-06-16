export class FiscalDedicatedNetworkContract {
  public static getContract() {
    return {
      description: 'Futura segmentação de rede isolada',
      productionBlocked: true as true,
      egressControlPlanned: true as true,
      networkApplied: false as false,
      productionTrafficAttached: false as false
    };
  }
}
