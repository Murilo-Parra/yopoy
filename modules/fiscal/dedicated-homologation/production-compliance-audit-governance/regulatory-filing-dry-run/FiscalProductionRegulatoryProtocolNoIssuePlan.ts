export class FiscalProductionRegulatoryProtocolNoIssuePlan {
  public static getPlan() {
    return {
      protocolNoIssuePlanGenerated: true,
      realProtocolNumberGenerated: false,
      realProtocolRecordPersisted: false,
      description: 'Modelar protocolo regulatório sem emissão real. Não gerar protocolo. Não persistir protocol record.'
    };
  }
}
