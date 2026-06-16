export class FiscalProductionTrafficTopologyInventory {
  public static getInventory() {
    return {
      trafficTopologyInventoryGenerated: true,
      realRequestCaptured: false,
      realPayloadCaptured: false,
      description: 'Inventariar topologia futura apenas como metadados administrativos. Não ler tráfego, request, response ou payload real.'
    };
  }
}
