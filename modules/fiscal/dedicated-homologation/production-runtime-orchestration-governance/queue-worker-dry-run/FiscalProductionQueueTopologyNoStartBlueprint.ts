export class FiscalProductionQueueTopologyNoStartBlueprint {
  public static getBlueprint() {
    return {
      queueTopologyNoStartBlueprintGenerated: true,
      realQueueStarted: false,
      realConsumerStarted: false,
      realProducerStarted: false,
      description: 'Modelar topologia futura de filas produtivas. Não iniciar queue real. Não criar consumer/producer real.'
    };
  }
}
