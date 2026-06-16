export class FiscalShadowMirrorTelemetryGuardrails {
  public static getChecklist(): string[] {
    return [
      '1. app.use legado não pode ser alterado.',
      '2. middleware produtivo não pode ser criado.',
      '3. tap real não pode ser instalado.',
      '4. request real não pode ser capturado.',
      '5. response real não pode ser capturado.',
      '6. body real não pode ser lido.',
      '7. response real não pode ser lida.',
      '8. handler legado não pode ser chamado.',
      '9. handler V2 operacional não pode ser chamado.',
      '10. SEFAZ não pode ser acionado.',
      '11. XML não pode ser assinado.',
      '12. PDF não pode ser gerado.',
      '13. worker não pode ser criado.',
      '14. cron/setInterval/queue.process não pode existir.',
      '15. telemetryPersisted deve permanecer false.',
      '16. telemetryInMemoryOnly deve permanecer true.',
      '17. telemetryFromRealTraffic deve permanecer false.',
      '18. routeToV2 deve permanecer false.',
      '19. routeToLegacy deve permanecer true.',
      '20. approvedForRealCanary deve permanecer false.',
      '21. approvedForProductionV2 deve permanecer false.'
    ];
  }
}
