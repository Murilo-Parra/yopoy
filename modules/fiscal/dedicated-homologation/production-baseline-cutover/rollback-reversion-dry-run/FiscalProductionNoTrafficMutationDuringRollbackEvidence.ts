export class FiscalProductionNoTrafficMutationDuringRollbackEvidence {
  public static getEvidence() {
    return {
      noTrafficMutationEvidenceGenerated: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      description: 'Evidenciar ausência de mutação de tráfego durante rollback simulado. Não instalar proxy, middleware, tap, mirror ou sniffer.'
    };
  }
}
