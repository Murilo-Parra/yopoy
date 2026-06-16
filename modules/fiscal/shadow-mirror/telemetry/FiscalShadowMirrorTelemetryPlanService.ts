export class FiscalShadowMirrorTelemetryPlanService {
  public static getPlan() {
    return {
      generatedAt: new Date().toISOString(),
      requiredBeforeTelemetryReal: [
        'definição de TTL (retenção).',
        'pipeline de data lake configurado.',
        'políticas de PII/LGPD para payload scraping.',
        'desenho de mensageria de telemetria sem interrupção.'
      ],
      forbiddenActions: [
        'instalar tap.',
        'instalar middleware.',
        'alterar app.use.',
        'capturar request/response real.',
        'persistir payload bruto.',
        'criar worker de fila.',
        'chamar SEFAZ/XML/PDF.'
      ],
      telemetryPersisted: false,
      telemetryInMemoryOnly: true,
      telemetryFromRealTraffic: false,
      designOnly: true,
      telemetryDesignOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }
}
