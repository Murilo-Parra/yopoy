export class FiscalProductionDnsReadOnlyMappingBlueprint {
  public static getBlueprint() {
    return {
      dnsReadOnlyMappingBlueprintGenerated: true,
      realDnsChanged: false,
      description: 'Mapeamento administrativo read-only do DNS. Nenhuma alteração real de rede executada.'
    };
  }
}
